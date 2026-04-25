import { Link } from "react-router-dom";
import type { Exercise } from "@/data/exercises";
import { Check, Clock } from "lucide-react";

interface Props {
  exercise: Exercise;
  index: number;
  completed: boolean;
}

const categoryClass: Record<string, string> = {
  Hypertrophy: "bg-neon/10 text-neon border-neon/30",
  Endurance: "bg-hot/10 text-hot border-hot/30",
  Mobility: "bg-neon/10 text-neon border-neon/30",
  HIIT: "bg-hot/10 text-hot border-hot/30",
  Strength: "bg-neon/10 text-neon border-neon/30",
  Custom: "bg-foreground/10 text-foreground border-foreground/20",
};

export default function ExerciseCard({ exercise, index, completed }: Props) {
  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="group glass-card rounded-3xl p-6 flex flex-col gap-6 hover:-translate-y-2 hover:neon-glow transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex justify-between items-start">
        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border ${categoryClass[exercise.category] ?? categoryClass.Custom}`}>
          {exercise.category}
        </span>
        <span className="text-muted-foreground/50 font-heading text-2xl tracking-tighter italic tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {exercise.image && (
        <div className="relative h-32 -mx-2 rounded-2xl overflow-hidden">
          <img
            src={exercise.image}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>
      )}

      <div>
        <h3 className="text-3xl md:text-4xl font-heading italic leading-none mb-3 group-hover:text-neon transition-colors uppercase">
          {exercise.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm font-medium uppercase tracking-widest tabular-nums">
              {exercise.duration} MIN
            </span>
          </div>
          {completed && (
            <span className="flex items-center gap-1.5 text-neon text-xs font-bold uppercase tracking-widest neon-text-glow">
              <Check className="size-4" /> Done
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
