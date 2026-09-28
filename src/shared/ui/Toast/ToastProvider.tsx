import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { generateId } from '@/shared/lib';
import { ToastContext, type ToastTone } from './context';
import styles from './Toast.module.css';

interface ToastItem {
  id: string;
  message: string;
  tone: ToastTone;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const notify = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = generateId();
    setItems((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.stack} role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={[styles.toast, styles[t.tone]].join(' ')}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
