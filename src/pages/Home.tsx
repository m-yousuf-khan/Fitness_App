import { useEffect } from "react";
import QuoteBanner from "@/components/QuoteBanner";
import ExerciseCard from "@/components/ExerciseCard";
import { useExercises } from "@/hooks/useExercises";
import { Flame } from "lucide-react";

export default function Home() {
  const { exercises, completed, isCompleted } = useExercises();

  useEffect(() => {
    document.title = "Kinetix Labs — Train Like You Mean It";
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Track your daily workouts, log custom exercises and stay motivated with Kinetix Labs fitness tracker.");
  }, []);

  return (
    <>
      <QuoteBanner />

      <section className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]">Today's Protocol</h2>
        <div className="flex items-center gap-2 text-hot hot-text-glow">
          <Flame className="size-4" />
          <span className="text-sm font-heading italic tracking-widest">
            {completed.length} / {exercises.length} CRUSHED
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} completed={isCompleted(ex.id)} />
        ))}
      </section>
    </>
  );
}
