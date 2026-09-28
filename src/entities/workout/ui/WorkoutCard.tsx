import type { ReactNode } from 'react';
import { Card } from '@/shared/ui';
import { formatDate, formatDuration } from '@/shared/lib';
import { ExerciseRow } from '../@x/exercise';
import { WORKOUT_TYPE_LABELS } from '../model/types';
import type { Workout } from '../model/types';
import styles from './WorkoutCard.module.css';

interface WorkoutCardProps {
  workout: Workout;
  actions?: ReactNode;
}

export function WorkoutCard({ workout, actions }: WorkoutCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.type}>{WORKOUT_TYPE_LABELS[workout.type]}</div>
          <div className={styles.date}>
            {formatDate(workout.date)} · {formatDuration(workout.duration)}
          </div>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {workout.exercises.length > 0 && (
        <div className={styles.exercises}>
          {workout.exercises.map((ex) => (
            <ExerciseRow key={ex.id} exercise={ex} />
          ))}
        </div>
      )}

      {workout.notes && <div className={styles.notes}>{workout.notes}</div>}
    </Card>
  );
}
