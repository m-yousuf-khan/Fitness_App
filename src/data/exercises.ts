import squat from "@/assets/ex-squat.jpg";
import sprint from "@/assets/ex-sprint.jpg";
import yoga from "@/assets/ex-yoga.jpg";
import pushup from "@/assets/ex-pushup.jpg";
import kettlebell from "@/assets/ex-kettlebell.jpg";
import plank from "@/assets/ex-plank.jpg";

export type ExerciseCategory = "Hypertrophy" | "Endurance" | "Mobility" | "HIIT" | "Strength" | "Custom";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  duration: number; // minutes
  description: string;
  image?: string;
  custom?: boolean;
}

export const seedExercises: Exercise[] = [
  {
    id: "back-squat",
    name: "Back Squat",
    category: "Strength",
    duration: 22,
    image: squat,
    description:
      "The king of lower-body lifts. Bar across upper traps, brace hard, descend to depth, drive through mid-foot. Builds raw posterior-chain power and bulletproof legs.",
  },
  {
    id: "sprint-intervals",
    name: "Sprint Intervals",
    category: "HIIT",
    duration: 18,
    image: sprint,
    description:
      "10 rounds of 30s all-out sprints with 90s recovery. Ignites VO2 max, torches fat, and forges the kind of conditioning that makes everything else feel easy.",
  },
  {
    id: "warrior-flow",
    name: "Warrior Flow",
    category: "Mobility",
    duration: 25,
    image: yoga,
    description:
      "Slow, controlled flow through warrior poses. Restores hip mobility, decompresses the spine, and rebuilds the breath you spent in the last set.",
  },
  {
    id: "push-up-ladder",
    name: "Push-Up Ladder",
    category: "Hypertrophy",
    duration: 15,
    image: pushup,
    description:
      "Climb 1-2-3-4-5 reps, then back down. Pure bodyweight density work. Hits chest, shoulders, triceps, and core in one tight, breathless package.",
  },
  {
    id: "kettlebell-swing",
    name: "Kettlebell Swing",
    category: "Endurance",
    duration: 20,
    image: kettlebell,
    description:
      "Hip hinge, explosive snap, controlled return. The single best ballistic for posterior chain power and conditioning. 10 sets of 20 — go.",
  },
  {
    id: "plank-protocol",
    name: "Plank Protocol",
    category: "Mobility",
    duration: 12,
    image: plank,
    description:
      "Front plank, side plank left, side plank right. 60 seconds each, three rounds. Builds the iron core that protects every other lift you do.",
  },
];
