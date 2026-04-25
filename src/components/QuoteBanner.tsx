import { useMotivationalQuote } from "@/hooks/useMotivationalQuote";
import { Quote } from "lucide-react";

export default function QuoteBanner() {
  const { quote, loading } = useMotivationalQuote();
  return (
    <section className="relative overflow-hidden rounded-3xl glass-card p-8 md:p-12 mb-10 animate-slide-up">
      <div className="absolute -top-24 -right-24 size-72 rounded-full opacity-60 pointer-events-none"
           style={{ background: "var(--gradient-glow-neon)" }} />
      <div className="absolute -bottom-24 -left-24 size-72 rounded-full opacity-40 pointer-events-none"
           style={{ background: "var(--gradient-glow-hot)" }} />
      <div className="relative z-10 flex flex-col gap-4">
        <Quote className="size-6 text-neon" />
        <h2 className={`text-3xl md:text-5xl font-heading italic leading-[0.95] tracking-tight max-w-3xl ${loading ? "opacity-70" : ""}`}>
          {quote.content.toUpperCase()}
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-neon" />
          <span className="text-xs tracking-[0.25em] text-muted-foreground uppercase font-semibold">
            {quote.author}
          </span>
        </div>
      </div>
    </section>
  );
}
