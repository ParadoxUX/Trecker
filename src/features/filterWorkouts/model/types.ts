import type { WorkoutType } from '@/entities/workout';

export type SortMode = 'date-desc' | 'date-asc' | 'duration-desc' | 'duration-asc';

export interface FilterState {
  type: WorkoutType | 'all';
  query: string;
  dateFrom: string;
  dateTo: string;
  sort: SortMode;
}

export const DEFAULT_FILTER: FilterState = {
  type: 'all',
  query: '',
  dateFrom: '',
  dateTo: '',
  sort: 'date-desc',
};

export const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: 'Сначала новые', value: 'date-desc' },
  { label: 'Сначала старые', value: 'date-asc' },
  { label: 'Долгие сверху', value: 'duration-desc' },
  { label: 'Короткие сверху', value: 'duration-asc' },
];
