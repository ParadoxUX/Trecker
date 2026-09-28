import { Button, Card, Input, Select } from '@/shared/ui';
import { WORKOUT_TYPE_OPTIONS } from '@/entities/workout';
import { SORT_OPTIONS, type FilterState, type SortMode } from '../model/types';
import type { WorkoutType } from '@/entities/workout';
import styles from './WorkoutFilters.module.css';

interface WorkoutFiltersProps {
  filter: FilterState;
  isDirty: boolean;
  resultCount: number;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
}

const TYPE_OPTIONS = [
  { label: 'Все типы', value: 'all' },
  ...WORKOUT_TYPE_OPTIONS,
] as { label: string; value: WorkoutType | 'all' }[];

export function WorkoutFilters({
  filter,
  isDirty,
  resultCount,
  onChange,
  onReset,
}: WorkoutFiltersProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.grid}>
        <Select
          label="Тип"
          options={TYPE_OPTIONS}
          value={filter.type}
          onChange={(e) => onChange('type', e.target.value as WorkoutType | 'all')}
        />
        <Input
          label="Поиск"
          placeholder="Упражнение или заметка"
          value={filter.query}
          onChange={(e) => onChange('query', e.target.value)}
        />
        <Input
          label="С"
          type="date"
          value={filter.dateFrom}
          onChange={(e) => onChange('dateFrom', e.target.value)}
        />
        <Input
          label="По"
          type="date"
          value={filter.dateTo}
          onChange={(e) => onChange('dateTo', e.target.value)}
        />
        <Select
          label="Сортировка"
          options={SORT_OPTIONS}
          value={filter.sort}
          onChange={(e) => onChange('sort', e.target.value as SortMode)}
        />
      </div>

      <div className={styles.footer}>
        <span className={styles.count}>
          Найдено: <strong>{resultCount}</strong>
        </span>
        <Button variant="secondary" size="sm" onClick={onReset} disabled={!isDirty}>
          Сбросить
        </Button>
      </div>
    </Card>
  );
}
