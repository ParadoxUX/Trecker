import { useCallback, useRef, useState } from 'react';
import { generateId } from '@/shared/lib';
import { workoutApi } from '../@x/workout';
import type { Workout } from '../@x/workout';
import { parseImport } from './validateImport';

export type ImportMode = 'replace' | 'merge';

export interface PendingImport {
  fileName: string;
  workouts: Workout[];
}

export function useExportImport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingImport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---------- Экспорт ----------
  const exportAll = useCallback(() => {
    const workouts = workoutApi.getAll();
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      workouts,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 10);
    a.download = `workout-tracker-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return workouts.length;
  }, []);

  // ---------- Импорт ----------
  const openFileDialog = useCallback(() => {
    setError(null);
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    const text = await file.text();
    const result = parseImport(text);
    if (!result.ok || !result.workouts) {
      setError(result.error ?? 'Не удалось прочитать файл');
      return;
    }
    setPending({ fileName: file.name, workouts: result.workouts });
  }, []);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void handleFile(file);
      // сбрасываем value, чтобы повторный выбор того же файла срабатывал
      e.target.value = '';
    },
    [handleFile],
  );

  const cancelPending = useCallback(() => {
    setPending(null);
    setError(null);
  }, []);

  const confirmImport = useCallback(
    (mode: ImportMode) => {
      if (!pending) return 0;

      // Нормализуем: если id совпадает с существующим или пуст — пересоздаём
      const existing = workoutApi.getAll();
      const existingIds = new Set(existing.map((w) => w.id));
      const normalized: Workout[] = pending.workouts.map((w) => ({
        ...w,
        id: w.id && !existingIds.has(w.id) ? w.id : generateId(),
      }));

      const next = mode === 'replace' ? normalized : [...normalized, ...existing];
      workoutApi.saveAll(next);
      setPending(null);
      return normalized.length;
    },
    [pending],
  );

  return {
    fileInputRef,
    onFileInputChange,
    exportAll,
    openFileDialog,
    pending,
    error,
    cancelPending,
    confirmImport,
    hasError: !!error,
  };
}
