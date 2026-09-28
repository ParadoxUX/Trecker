import type { ID } from '@/shared/types/common';

export interface Exercise {
  id: ID;
  name: string;
  sets: number;
  reps: number;
  weight: number; // кг
}

export function createEmptyExercise(id: ID): Exercise {
  return { id, name: '', sets: 3, reps: 10, weight: 0 };
}
