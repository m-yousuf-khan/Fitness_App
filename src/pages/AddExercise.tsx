import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExercises } from "@/hooks/useExercises";
import type { Exercise, ExerciseCategory } from "@/data/exercises";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const CATS: ExerciseCategory[] = ["Hypertrophy", "Endurance", "Mobility", "HIIT", "Strength", "Custom"];

export default function AddExercise() {
  const nav = useNavigate();
  const { addExercise } = useExercises();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ExerciseCategory>("Custom");
  const [duration, setDuration] = useState("20");
  const [description, setDescription] = useState("");

  useEffect(() => {
    document.title = "Create Exercise — Kinetix Labs";
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Name and description are required.");
      return;
    }
    const ex: Exercise = {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: name.trim(),
      category,
      duration: Math.max(1, Number(duration) || 1),
      description: description.trim(),
      custom: true,
    };
    addExercise(ex);
    toast.success(`${ex.name.toUpperCase()} added to your protocol.`);
    nav("/");
  };

  return (
    <article className="animate-fade-in max-w-2xl mx-auto">
      <header className="mb-10">
        <span className="text-neon font-heading tracking-[0.25em] text-xs">NEW PROTOCOL</span>
        <h1 className="text-5xl md:text-6xl font-heading italic uppercase leading-none tracking-tight mt-2">
          Forge Your <span className="text-neon">Own</span>
        </h1>
        <p className="text-muted-foreground mt-3">Build a custom exercise. It saves to your local protocol library.</p>
      </header>

      <form onSubmit={submit} className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="uppercase tracking-widest text-xs font-bold">Exercise Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bulgarian Split Squat" className="h-12 bg-background/60 border-border" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="uppercase tracking-widest text-xs font-bold">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ExerciseCategory)}>
              <SelectTrigger className="h-12 bg-background/60"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="uppercase tracking-widest text-xs font-bold">Duration (min)</Label>
            <Input id="duration" type="number" min={1} value={duration} onChange={(e) => setDuration(e.target.value)} className="h-12 bg-background/60" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc" className="uppercase tracking-widest text-xs font-bold">Description</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="How is it performed? What does it train?" className="bg-background/60 resize-none" />
        </div>

        <Button type="submit" size="lg" className="w-full h-14 bg-neon text-primary-foreground hover:bg-neon/90 font-heading italic tracking-widest text-lg rounded-2xl neon-glow">
          <Plus className="size-5 mr-2" /> ADD TO PROTOCOL
        </Button>
      </form>
    </article>
  );
}
