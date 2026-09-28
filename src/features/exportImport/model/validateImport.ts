import type { Workout, WorkoutType } from '../@x/workout';

const ALLOWED_TYPES: WorkoutType[] = ['strength', 'cardio', 'flexibility', 'other'];

export interface ImportResult {
  ok: boolean;
  error?: string;
  workouts?: Workout[];
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function validateWorkout(raw: unknown, idx: number): string | null {
  if (!isObject(raw)) return `Элемент #${idx + 1}: не объект`;
  if (typeof raw.id !== 'string' || !raw.id) return `Элемент #${idx + 1}: нет id`;
  if (typeof raw.type !== 'string' || !ALLOWED_TYPES.includes(raw.type as WorkoutType)) {
    return `Элемент #${idx + 1}: некорректный тип тренировки`;
  }
  if (typeof raw.duration !== 'number' || raw.duration <= 0) {
    return `Элемент #${idx + 1}: некорректная длительность`;
  }
  if (typeof raw.date !== 'string') return `Элемент #${idx + 1}: нет даты`;
  if (typeof raw.notes !== 'string') return `Элемент #${idx + 1}: нет поля notes`;
  if (!Array.isArray(raw.exercises)) return `Элемент #${idx + 1}: exercises не массив`;
  return null;
}

export function parseImport(raw: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Файл не является корректным JSON' };
  }

  // поддерживаем и массив тренировок, и объект-обёртку { workouts: [...] }
  let list: unknown;
  if (Array.isArray(data)) {
    list = data;
  } else if (isObject(data) && Array.isArray(data.workouts)) {
    list = data.workouts;
  } else {
    return { ok: false, error: 'Ожидался массив тренировок или { workouts: [...] }' };
  }

  const arr = list as unknown[];
  for (let i = 0; i < arr.length; i += 1) {
    const err = validateWorkout(arr[i], i);
    if (err) return { ok: false, error: err };
  }

  return { ok: true, workouts: arr as Workout[] };
}
