import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { LogWorkoutPage } from '@/pages/logWorkout';
import { EditWorkoutPage } from '@/pages/editWorkout';
import { ROUTES } from '@/shared/config/routes';
import { Header } from '@/widgets/header';

export function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.logWorkout} element={<LogWorkoutPage />} />
        <Route path={ROUTES.editWorkout} element={<EditWorkoutPage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </>
  );
}
