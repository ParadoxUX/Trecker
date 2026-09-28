import { Card } from '@/shared/ui';
import { formatDate, formatDuration } from '@/shared/lib';
import { useStats } from '../model/useStats';
import type { Workout } from '@/entities/workout';
import styles from './Stats.module.css';

interface StatsProps {
  workouts: Workout[];
}

export function Stats({ workouts }: StatsProps) {
  const stats = useStats(workouts);

  if (stats.total === 0) {
    return null; // нечего показывать — виджет просто не рендерится
  }

  return (
    <div className={styles.grid}>
      <Card className={styles.metric}>
        <span className={styles.metricLabel}>Тренировок</span>
        <span className={styles.metricValue}>{stats.total}</span>
      </Card>

      <Card className={styles.metric}>
        <span className={styles.metricLabel}>Всего времени</span>
        <span className={styles.metricValue}>{formatDuration(stats.totalMinutes)}</span>
      </Card>

      <Card className={styles.metric}>
        <span className={styles.metricLabel}>Средняя</span>
        <span className={styles.metricValue}>{formatDuration(stats.avgMinutes)}</span>
      </Card>

      <Card className={styles.metric}>
        <span className={styles.metricLabel}>Последняя</span>
        <span className={styles.metricValue}>
          {stats.lastWorkoutDate ? formatDate(stats.lastWorkoutDate) : '—'}
        </span>
      </Card>

      <Card className={styles.wide}>
        <h3 className={styles.title}>По типам</h3>
        <div className={styles.bars}>
          {stats.byType.map((row) => (
            <div key={row.type} className={styles.barRow}>
              <span className={styles.barLabel}>{row.label}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${row.percent}%` }} />
              </div>
              <span className={styles.barValue}>
                {row.count} · {row.percent}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {stats.topExercises.length > 0 && (
        <Card className={styles.wide}>
          <h3 className={styles.title}>Топ упражнений</h3>
          <ol className={styles.topList}>
            {stats.topExercises.map((ex, idx) => (
              <li key={ex.name} className={styles.topItem}>
                <span className={styles.topRank}>#{idx + 1}</span>
                <span className={styles.topName}>{ex.name}</span>
                <span className={styles.topMeta}>
                  {ex.sets} подх. · {ex.workouts} трен.
                </span>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}
