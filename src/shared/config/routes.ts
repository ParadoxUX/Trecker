export const ROUTES = {
  home: '/',
  workouts: '/workouts',
  logWorkout: '/workouts/new',
  editWorkout: '/workouts/:id/edit',
} as const;

export const editWorkoutPath = (id: string) => `/workouts/${id}/edit`;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
