import { useEffect, useState } from "react";

interface Quote {
  content: string;
  author: string;
}

const FALLBACKS: Quote[] = [
  { content: "VICTORY IS EARNED IN THE DARK", author: "Kinetix" },
  { content: "Suffer now. Live forever.", author: "Muhammad Ali" },
  { content: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { content: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { content: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
];

export function useMotivationalQuote() {
  const [quote, setQuote] = useState<Quote>(() => FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://api.quotable.io/random?tags=inspirational|motivational&maxLength=90", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.content) setQuote({ content: data.content, author: data.author ?? "Unknown" });
      })
      .catch(() => { /* keep fallback */ })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return { quote, loading };
}
