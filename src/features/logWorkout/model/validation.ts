import type { WorkoutType } from '../@x/workout';

export interface LogWorkoutFormValues {
  type: WorkoutType;
  duration: string;   // как строка — так удобнее для <input>
  date: string;
  notes: string;
  exercises: {
    id: string;
    name: string;
    sets: string;
    reps: string;
    weight: string;
  }[];
}

export type LogWorkoutErrors = Partial<Record<keyof LogWorkoutFormValues, string>>;

export function validateLogWorkout(values: LogWorkoutFormValues): LogWorkoutErrors {
  const errors: LogWorkoutErrors = {};

  const duration = Number(values.duration);
  if (!values.duration.trim()) {
    errors.duration = 'Укажите длительность';
  } else if (!Number.isFinite(duration) || duration <= 0) {
    errors.duration = 'Длительность должна быть больше 0';
  } else if (duration > 24 * 60) {
    errors.duration = 'Слишком долго для одной тренировки';
  }

  if (!values.date) {
    errors.date = 'Укажите дату';
  }

  if (values.exercises.length === 0) {
    errors.exercises = 'Добавьте хотя бы одно упражнение';
  }

  return errors;
}
