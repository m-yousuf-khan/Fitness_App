import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock, Tag } from "lucide-react";
import { useExercises } from "@/hooks/useExercises";
import { Button } from "@/components/ui/button";

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { exercises, isCompleted, toggleCompleted } = useExercises();
  const exercise = exercises.find((e) => e.id === id);

  useEffect(() => {
    if (exercise) document.title = `${exercise.name} — Kinetix Labs`;
  }, [exercise]);

  if (!exercise) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <h2 className="font-heading text-4xl italic mb-4">EXERCISE NOT FOUND</h2>
        <Button asChild variant="secondary"><Link to="/">Back to Training</Link></Button>
      </div>
    );
  }

  const done = isCompleted(exercise.id);

  return (
    <article className="animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors mb-6 text-sm uppercase tracking-widest font-bold">
        <ArrowLeft className="size-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative rounded-3xl overflow-hidden glass-card aspect-[4/5] md:aspect-square">
          {exercise.image ? (
            <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-heading text-8xl italic text-neon/30">
              {exercise.name.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-neon/30 bg-neon/10 text-neon">
              {exercise.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <header>
            <h1 className="text-5xl md:text-7xl font-heading italic uppercase leading-[0.9] tracking-tight mb-4">
              {exercise.name}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2"><Clock className="size-4 text-neon" /><span className="font-heading text-xl italic">{exercise.duration} MIN</span></span>
              <span className="flex items-center gap-2"><Tag className="size-4 text-neon" /><span className="font-heading text-xl italic">{exercise.category}</span></span>
            </div>
          </header>

          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Protocol Brief</h2>
            <p className="text-lg leading-relaxed text-foreground/90">{exercise.description}</p>
          </div>

          <Button
            size="lg"
            onClick={() => toggleCompleted(exercise.id)}
            className={`h-16 text-lg font-heading italic tracking-widest rounded-2xl transition-all ${
              done
                ? "bg-neon text-primary-foreground hover:bg-neon/90 neon-glow animate-pulse-glow"
                : "bg-secondary text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            <Check className="size-5 mr-2" />
            {done ? "COMPLETED — TAP TO UNDO" : "MARK AS COMPLETED"}
          </Button>
        </div>
      </div>
    </article>
  );
}
