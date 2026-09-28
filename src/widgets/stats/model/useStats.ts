import { useMemo } from 'react';
import type { Workout, WorkoutType } from '@/entities/workout';

export interface Stats {
  total: number;
  totalMinutes: number;
  avgMinutes: number;
  byType: { type: WorkoutType; label: string; count: number; minutes: number; percent: number }[];
  topExercises: { name: string; sets: number; workouts: number }[];
  lastWorkoutDate: string | null;
}

export function useStats(workouts: Workout[]): Stats {
  return useMemo<Stats>(() => {
    const total = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
    const avgMinutes = total > 0 ? Math.round(totalMinutes / total) : 0;

    // по типам
    const typeMap = new Map<WorkoutType, { count: number; minutes: number }>();
    for (const w of workouts) {
      const cur = typeMap.get(w.type) ?? { count: 0, minutes: 0 };
      cur.count += 1;
      cur.minutes += w.duration;
      typeMap.set(w.type, cur);
    }

    const typeLabels: Record<WorkoutType, string> = {
      strength: 'Силовая',
      cardio: 'Кардио',
      flexibility: 'Растяжка',
      other: 'Другое',
    };

    const byType = Array.from(typeMap.entries())
      .map(([type, { count, minutes }]) => ({
        type,
        label: typeLabels[type],
        count,
        minutes,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // топ упражнений
    const exMap = new Map<string, { sets: number; workouts: number }>();
    for (const w of workouts) {
      const seenInWorkout = new Set<string>();
      for (const ex of w.exercises) {
        const name = ex.name.trim();
        if (!name) continue;
        const cur = exMap.get(name) ?? { sets: 0, workouts: 0 };
        cur.sets += ex.sets;
        if (!seenInWorkout.has(name)) {
          cur.workouts += 1;
          seenInWorkout.add(name);
        }
        exMap.set(name, cur);
      }
    }

    const topExercises = Array.from(exMap.entries())
      .map(([name, { sets, workouts }]) => ({ name, sets, workouts }))
      .sort((a, b) => b.sets - a.sets)
      .slice(0, 3);

    const lastWorkoutDate =
      workouts.length > 0
        ? workouts
            .map((w) => w.date)
            .sort((a, b) => (a < b ? 1 : -1))[0]
        : null;

    return { total, totalMinutes, avgMinutes, byType, topExercises, lastWorkoutDate };
  }, [workouts]);
}
