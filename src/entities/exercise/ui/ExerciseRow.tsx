import type { Exercise } from '../model/types';
import styles from './ExerciseRow.module.css';

interface ExerciseRowProps {
  exercise: Exercise;
}

export function ExerciseRow({ exercise }: ExerciseRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.name}>{exercise.name || 'Без названия'}</span>
      <span className={styles.meta}>
        {exercise.sets} × {exercise.reps}
        {exercise.weight > 0 ? ` × ${exercise.weight} кг` : ''}
      </span>
    </div>
  );
}
