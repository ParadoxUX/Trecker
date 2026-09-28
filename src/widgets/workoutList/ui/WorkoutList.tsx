import { Button, Card } from '@/shared/ui';
import { WorkoutCard } from '@/entities/workout';
import type { Workout } from '@/entities/workout';
import styles from './WorkoutList.module.css';

interface WorkoutListProps {
  workouts: Workout[];
  onRemove: (id: string) => void;
  onEdit?: (id: string) => void;
  emptyText?: string;
}

export function WorkoutList({
  workouts,
  onRemove,
  onEdit,
  emptyText = 'Пока пусто — добавь первую тренировку',
}: WorkoutListProps) {
  if (workouts.length === 0) {
    return <Card className={styles.placeholder}>{emptyText}</Card>;
  }

  return (
    <div className={styles.list}>
      {workouts.map((w) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          actions={
            <>
              {onEdit && (
                <Button variant="secondary" size="sm" onClick={() => onEdit(w.id)}>
                  Редактировать
                </Button>
              )}
              <Button variant="danger" size="sm" onClick={() => onRemove(w.id)}>
                Удалить
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
}
