import { useCallback, useState } from 'react';
import { generateId, todayISO } from '@/shared/lib';
import type { Exercise } from '@/entities/exercise';
import { workoutApi } from '../@x/workout';
import type { Workout, WorkoutType } from '../@x/workout';
import {
  validateLogWorkout,
  type LogWorkoutErrors,
  type LogWorkoutFormValues,
} from './validation';

function createInitialValues(initial?: Workout): LogWorkoutFormValues {
  if (!initial) {
    return {
      type: 'strength',
      duration: '',
      date: todayISO(),
      notes: '',
      exercises: [],
    };
  }
  return {
    type: initial.type,
    duration: String(initial.duration),
    date: initial.date,
    notes: initial.notes,
    exercises: initial.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      sets: String(ex.sets),
      reps: String(ex.reps),
      weight: String(ex.weight),
    })),
  };
}

function createEmptyExerciseRow() {
  return {
    id: generateId(),
    name: '',
    sets: '3',
    reps: '10',
    weight: '0',
  };
}

export function useLogWorkout(initial?: Workout, onSuccess?: () => void) {
  const [values, setValues] = useState<LogWorkoutFormValues>(() =>
    createInitialValues(initial),
  );
  const [errors, setErrors] = useState<LogWorkoutErrors>({});

  const setField = useCallback(
    <K extends keyof LogWorkoutFormValues>(field: K, value: LogWorkoutFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const addExercise = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      exercises: [...prev.exercises, createEmptyExerciseRow()],
    }));
    setErrors((prev) => ({ ...prev, exercises: undefined }));
  }, []);

  const removeExercise = useCallback((id: string) => {
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((e) => e.id !== id),
    }));
  }, []);

  const updateExercise = useCallback(
    (
      id: string,
      field: keyof Omit<LogWorkoutFormValues['exercises'][number], 'id'>,
      value: string,
    ) => {
      setValues((prev) => ({
        ...prev,
        exercises: prev.exercises.map((e) =>
          e.id === id ? { ...e, [field]: value } : e,
        ),
      }));
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(createInitialValues(initial));
    setErrors({});
  }, [initial]);

  const submit = useCallback(() => {
    const nextErrors = validateLogWorkout(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    const exercises: Exercise[] = values.exercises.map((e) => ({
      id: e.id,
      name: e.name.trim(),
      sets: Number(e.sets) || 0,
      reps: Number(e.reps) || 0,
      weight: Number(e.weight) || 0,
    }));

    const payload = {
      type: values.type as WorkoutType,
      duration: Number(values.duration),
      date: values.date,
      notes: values.notes.trim(),
      exercises,
    };

    if (initial?.id) {
      workoutApi.update(initial.id, payload);
    } else {
      workoutApi.create(payload);
      reset();
    }

    onSuccess?.();
    return true;
  }, [values, reset, onSuccess, initial]);

  return {
    values,
    errors,
    mode: initial?.id ? ('edit' as const) : ('create' as const),
    setField,
    addExercise,
    removeExercise,
    updateExercise,
    submit,
    reset,
  };
}
