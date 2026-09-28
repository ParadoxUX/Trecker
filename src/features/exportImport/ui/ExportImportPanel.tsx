import { Button, Card, Modal, useToast } from '@/shared/ui';
import { useExportImport } from '../model/useExportImport';
import styles from './ExportImportPanel.module.css';

interface ExportImportPanelProps {
  onChange?: () => void;
}

export function ExportImportPanel({ onChange }: ExportImportPanelProps) {
  const {
    fileInputRef,
    onFileInputChange,
    exportAll,
    openFileDialog,
    pending,
    error,
    cancelPending,
    confirmImport,
  } = useExportImport();

  const { notify } = useToast();

  const handleExport = () => {
    const count = exportAll();
    if (count === 0) {
      notify('Пока нечего экспортировать', 'info');
      return;
    }
    notify(`Экспортировано тренировок: ${count}`, 'success');
  };

  const handleConfirm = (mode: 'replace' | 'merge') => {
    const count = confirmImport(mode);
    notify(
      mode === 'replace'
        ? `Импортировано (замена): ${count}`
        : `Импортировано (добавлено): ${count}`,
      'success',
    );
    onChange?.();
  };

  return (
    <Card className={styles.panel}>
      <div className={styles.text}>
        <h3 className={styles.title}>Резервная копия</h3>
        <p className={styles.subtitle}>
          Сохрани тренировки в JSON или восстанови из файла.
        </p>
      </div>

      <div className={styles.buttons}>
        <Button variant="secondary" onClick={handleExport}>
          ⬇ Экспорт в JSON
        </Button>
        <Button variant="secondary" onClick={openFileDialog}>
          ⬆ Импорт из файла
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={onFileInputChange}
        style={{ display: 'none' }}
      />

      <Modal
        open={!!pending}
        onClose={cancelPending}
        title="Импорт тренировок"
        footer={
          <>
            <Button variant="secondary" onClick={cancelPending}>
              Отмена
            </Button>
            <Button variant="secondary" onClick={() => handleConfirm('merge')}>
              Добавить к текущим
            </Button>
            <Button variant="danger" onClick={() => handleConfirm('replace')}>
              Заменить всё
            </Button>
          </>
        }
      >
        {pending && (
          <>
            <p>
              Файл: <strong>{pending.fileName}</strong>
            </p>
            <p>
              Найдено тренировок: <strong>{pending.workouts.length}</strong>
            </p>
            <p className={styles.hint}>
              «Добавить к текущим» — сохранит существующие записи и добавит новые.
              <br />
              «Заменить всё» — удалит текущие и оставит только то, что в файле.
            </p>
          </>
        )}
      </Modal>

      {error && <div className={styles.error}>{error}</div>}
    </Card>
  );
}
