import { storage } from '@/shared/api/storage';
import { generateId } from '@/shared/lib';
import type { Workout } from '../model/types';

const STORAGE_KEY = 'workout-tracker:workouts';

export const workoutApi = {
  getAll(): Workout[] {
    return storage.get<Workout[]>(STORAGE_KEY, []);
  },

  getById(id: string): Workout | undefined {
    return workoutApi.getAll().find((w) => w.id === id);
  },

  saveAll(workouts: Workout[]): void {
    storage.set(STORAGE_KEY, workouts);
  },

  create(workout: Omit<Workout, 'id'>): Workout {
    const all = workoutApi.getAll();
    const created: Workout = { ...workout, id: generateId() };
    workoutApi.saveAll([created, ...all]);
    return created;
  },

  update(id: string, patch: Omit<Workout, 'id'>): Workout | undefined {
    const all = workoutApi.getAll();
    const idx = all.findIndex((w) => w.id === id);
    if (idx === -1) return undefined;
    const updated: Workout = { ...patch, id };
    const next = [...all];
    next[idx] = updated;
    workoutApi.saveAll(next);
    return updated;
  },

  remove(id: string): void {
    const all = workoutApi.getAll();
    workoutApi.saveAll(all.filter((w) => w.id !== id));
  },
};
