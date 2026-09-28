import { useCallback, useMemo, useState } from 'react';
import type { Workout } from '@/entities/workout';
import { applyFilter } from './applyFilter';
import { DEFAULT_FILTER, type FilterState } from './types';

export function useWorkoutFilter(workouts: Workout[]) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const setField = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilter((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => setFilter(DEFAULT_FILTER), []);

  const isDirty = useMemo(() => {
    return (
      filter.type !== DEFAULT_FILTER.type ||
      filter.query !== DEFAULT_FILTER.query ||
      filter.dateFrom !== DEFAULT_FILTER.dateFrom ||
      filter.dateTo !== DEFAULT_FILTER.dateTo ||
      filter.sort !== DEFAULT_FILTER.sort
    );
  }, [filter]);

  const filtered = useMemo(() => applyFilter(workouts, filter), [workouts, filter]);

  return { filter, setField, reset, isDirty, filtered };
}
