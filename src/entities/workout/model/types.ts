import type { ID } from '@/shared/types/common';
import type { Exercise } from '../@x/exercise';

export type WorkoutType = 'strength' | 'cardio' | 'flexibility' | 'other';

export interface Workout {
  id: ID;
  type: WorkoutType;
  duration: number; // минуты
  date: string;     // ISO yyyy-mm-dd
  exercises: Exercise[];
  notes: string;
}

export const WORKOUT_TYPE_OPTIONS: { label: string; value: WorkoutType }[] = [
  { label: 'Силовая', value: 'strength' },
  { label: 'Кардио', value: 'cardio' },
  { label: 'Растяжка', value: 'flexibility' },
  { label: 'Другое', value: 'other' },
];

export const WORKOUT_TYPE_LABELS: Record<WorkoutType, string> = {
  strength: 'Силовая',
  cardio: 'Кардио',
  flexibility: 'Растяжка',
  other: 'Другое',
};
