import { useNavigate } from 'react-router-dom';
import { LogWorkoutForm } from '@/features/logWorkout';
import { ROUTES } from '@/shared/config/routes';
import styles from './LogWorkoutPage.module.css';

export function LogWorkoutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Записать тренировку</h1>
        <p className={styles.subtitle}>
          Заполни форму — после сохранения вернёшься на главную.
        </p>
      </header>

      <LogWorkoutForm onSuccess={() => navigate(ROUTES.home)} />
    </div>
  );
}
