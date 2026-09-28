import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/ui';
import { editWorkoutPath } from '@/shared/config/routes';
import { LogWorkoutForm } from '@/features/logWorkout';
import { WorkoutList } from '@/widgets/workoutList';
import { Stats } from '@/widgets/stats';
import { workoutApi } from '@/entities/workout';
import type { Workout } from '@/entities/workout';
import { WorkoutFilters, useWorkoutFilter } from '@/features/filterWorkouts';
import { ExportImportPanel } from '@/features/exportImport';
import styles from './HomePage.module.css';

export function HomePage() {
  const [version, setVersion] = useState(0);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { notify } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setWorkouts(workoutApi.getAll());
  }, [version]);

  const filterApi = useWorkoutFilter(workouts);
  const { filtered } = filterApi;

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const handleRemove = useCallback(
    (id: string) => {
      workoutApi.remove(id);
      refresh();
      notify('Тренировка удалена', 'info');
    },
    [notify, refresh],
  );

  const handleEdit = useCallback(
    (id: string) => {
      navigate(editWorkoutPath(id));
    },
    [navigate],
  );

  const showFilter = useMemo(() => workouts.length > 0, [workouts.length]);

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Журнал тренировок</h1>
        <p className={styles.subtitle}>
          Записывай тренировки, отслеживай прогресс и держи форму под контролем.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Статистика</h2>
        <Stats workouts={workouts} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Новая тренировка</h2>
        <LogWorkoutForm
          onSuccess={() => {
            refresh();
            notify('Тренировка сохранена', 'success');
          }}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>История</h2>

        {showFilter && (
          <WorkoutFilters
            filter={filterApi.filter}
            isDirty={filterApi.isDirty}
            resultCount={filtered.length}
            onChange={filterApi.setField}
            onReset={filterApi.reset}
          />
        )}

        <WorkoutList
          workouts={filtered}
          onRemove={handleRemove}
          onEdit={handleEdit}
          emptyText={
            showFilter
              ? 'Ничего не найдено по текущим фильтрам'
              : 'Пока пусто — добавь первую тренировку'
          }
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Данные</h2>
        <ExportImportPanel onChange={refresh} />
      </section>
    </div>
  );
}
