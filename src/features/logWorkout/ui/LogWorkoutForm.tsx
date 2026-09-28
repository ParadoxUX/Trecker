import { Button, Card, Input, Select } from '@/shared/ui';
import { POPULAR_EXERCISES } from '@/entities/exercise';
import { WORKOUT_TYPE_OPTIONS } from '../@x/workout';
import type { Workout } from '../@x/workout';
import { useLogWorkout } from '../model/useLogWorkout';
import styles from './LogWorkoutForm.module.css';

interface LogWorkoutFormProps {
  initial?: Workout;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const DATALIST_ID = 'popular-exercises';

export function LogWorkoutForm({ initial, onSuccess, onCancel }: LogWorkoutFormProps) {
  const {
    values,
    errors,
    mode,
    setField,
    addExercise,
    removeExercise,
    updateExercise,
    submit,
    reset,
  } = useLogWorkout(initial, onSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const isEdit = mode === 'edit';

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Единый источник подсказок для всех строк упражнений */}
      <datalist id={DATALIST_ID}>
        {POPULAR_EXERCISES.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      <Card>
        <div className={styles.grid}>
          <Select
            label="Тип тренировки"
            options={WORKOUT_TYPE_OPTIONS}
            value={values.type}
            onChange={(e) => setField('type', e.target.value as typeof values.type)}
          />
          <Input
            label="Дата"
            type="date"
            value={values.date}
            error={errors.date}
            onChange={(e) => setField('date', e.target.value)}
          />
          <Input
            label="Длительность (мин)"
            type="number"
            min={1}
            value={values.duration}
            error={errors.duration}
            onChange={(e) => setField('duration', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Упражнения</span>
          <Button type="button" variant="secondary" size="sm" onClick={addExercise}>
            + Добавить
          </Button>
        </div>

        {errors.exercises && <div className={styles.errorText}>{errors.exercises}</div>}

        {values.exercises.length === 0 ? (
          <div className={styles.empty}>Пока ни одного упражнения</div>
        ) : (
          <div className={styles.exerciseList}>
            {values.exercises.map((ex) => (
              <div key={ex.id} className={styles.exerciseRow}>
                <div className={styles.field}>
                  <Input
                    label="Упражнение"
                    placeholder="Начни вводить или выбери из списка"
                    list={DATALIST_ID}
                    value={ex.name}
                    onChange={(e) => updateExercise(ex.id, 'name', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <Input
                    label="Подходы"
                    type="number"
                    min={1}
                    value={ex.sets}
                    onChange={(e) => updateExercise(ex.id, 'sets', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <Input
                    label="Повторы"
                    type="number"
                    min={1}
                    value={ex.reps}
                    onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <Input
                    label="Вес, кг"
                    type="number"
                    min={0}
                    value={ex.weight}
                    onChange={(e) => updateExercise(ex.id, 'weight', e.target.value)}
                  />
                </div>
                <div className={styles.removeField}>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeExercise(ex.id)}
                    aria-label="Удалить упражнение"
                    title="Удалить упражнение"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <label className={styles.notesLabel}>
          <span className={styles.sectionTitle}>Заметки</span>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Как прошло?"
            value={values.notes}
            onChange={(e) => setField('notes', e.target.value)}
          />
        </label>
      </Card>

      <div className={styles.footer}>
        {isEdit ? (
          <>
            <Button type="button" variant="secondary" onClick={reset}>
              Вернуть как было
            </Button>
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Отмена
              </Button>
            )}
            <Button type="submit" size="lg">
              Сохранить изменения
            </Button>
          </>
        ) : (
          <Button type="submit" size="lg">
            Сохранить тренировку
          </Button>
        )}
      </div>
    </form>
  );
}
