import type { Workout } from '@/entities/workout';
import type { FilterState } from './types';

export function applyFilter(workouts: Workout[], filter: FilterState): Workout[] {
  const query = filter.query.trim().toLowerCase();

  const filtered = workouts.filter((w) => {
    if (filter.type !== 'all' && w.type !== filter.type) return false;

    if (filter.dateFrom && w.date < filter.dateFrom) return false;
    if (filter.dateTo && w.date > filter.dateTo) return false;

    if (query) {
      const haystack = [
        ...w.exercises.map((e) => e.name),
        w.notes,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filter.sort) {
      case 'date-desc':
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      case 'date-asc':
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      case 'duration-desc':
        return b.duration - a.duration;
      case 'duration-asc':
        return a.duration - b.duration;
    }
  });

  return sorted;
}
