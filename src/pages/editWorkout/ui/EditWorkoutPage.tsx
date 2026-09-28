import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, useToast } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';
import { workoutApi } from '@/entities/workout';
import { LogWorkoutForm } from '@/features/logWorkout';
import styles from './EditWorkoutPage.module.css';

export function EditWorkoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notify } = useToast();

  const workout = id ? workoutApi.getById(id) : undefined;

  if (!workout) {
    return (
      <div className={styles.page}>
        <Card className={styles.notFound}>
          <h2>Тренировка не найдена</h2>
          <p>Возможно, она была удалена.</p>
          <Button onClick={() => navigate(ROUTES.home)}>На главную</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Редактирование тренировки</h1>
        <p className={styles.subtitle}>
          Измени поля и сохрани — запись обновится в журнале.
        </p>
      </header>

      <LogWorkoutForm
        initial={workout}
        onSuccess={() => {
          notify('Изменения сохранены', 'success');
          navigate(ROUTES.home);
        }}
        onCancel={() => navigate(ROUTES.home)}
      />
    </div>
  );
}
