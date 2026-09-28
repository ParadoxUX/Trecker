import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { ThemeToggle } from '@/features/toggleTheme';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to={ROUTES.home} className={styles.logo}>
        🏋️ Workout Tracker
      </Link>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES.home}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          end
        >
          Главная
        </NavLink>
        <NavLink
          to={ROUTES.logWorkout}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Записать тренировку
        </NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}
