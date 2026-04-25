import { useCallback, useEffect, useState } from "react";
import type { Exercise } from "@/data/exercises";
import { seedExercises } from "@/data/exercises";

const STORAGE_EX = "kinetix.exercises.v1";
const STORAGE_DONE = "kinetix.completed.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(() => read(STORAGE_EX, seedExercises));
  const [completed, setCompleted] = useState<string[]>(() => read(STORAGE_DONE, []));

  useEffect(() => {
    localStorage.setItem(STORAGE_EX, JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem(STORAGE_DONE, JSON.stringify(completed));
  }, [completed]);

  const addExercise = useCallback((ex: Exercise) => {
    setExercises((prev) => [ex, ...prev]);
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isCompleted = useCallback((id: string) => completed.includes(id), [completed]);

  return { exercises, completed, addExercise, toggleCompleted, isCompleted };
}
