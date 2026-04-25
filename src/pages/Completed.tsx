import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useExercises } from "@/hooks/useExercises";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trophy } from "lucide-react";

export default function Completed() {
  const { exercises, completed, toggleCompleted } = useExercises();
  const done = exercises.filter((e) => completed.includes(e.id));
  const pct = exercises.length ? Math.round((done.length / exercises.length) * 100) : 0;

  useEffect(() => {
    document.title = "Completed — Kinetix Labs";
  }, []);

  return (
    <article className="animate-fade-in">
      <header className="mb-10">
        <span className="text-neon font-heading tracking-[0.25em] text-xs">SESSION LOG</span>
        <h1 className="text-5xl md:text-6xl font-heading italic uppercase leading-none tracking-tight mt-2">
          Work <span className="text-neon">Banked</span>
        </h1>
      </header>

      <div className="glass-card rounded-3xl p-8 mb-10 flex items-center gap-6">
        <Trophy className="size-12 text-neon shrink-0" />
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Today's Completion</p>
          <p className="font-heading italic text-5xl tabular-nums">{pct}<span className="text-2xl">%</span></p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="font-heading italic text-3xl tabular-nums text-hot hot-text-glow">{done.length}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Exercises</p>
        </div>
      </div>

      {done.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <CheckCircle2 className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-heading italic text-3xl uppercase mb-2">Nothing logged yet</p>
          <p className="text-muted-foreground mb-6">Crush a protocol, then mark it done.</p>
          <Button asChild className="bg-neon text-primary-foreground hover:bg-neon/90 font-heading italic tracking-widest">
            <Link to="/">START TRAINING</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {done.map((ex, i) => (
            <li key={ex.id} className="glass-card rounded-2xl p-5 flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="size-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-6 text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading italic text-xl uppercase truncate">{ex.name}</h3>
                <p className="text-muted-foreground text-sm">{ex.category} · {ex.duration} min</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toggleCompleted(ex.id)} className="text-muted-foreground hover:text-hot uppercase tracking-widest text-xs">
                Undo
              </Button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
