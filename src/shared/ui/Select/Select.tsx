import type { SelectHTMLAttributes } from 'react';
import type { SelectOption } from '@/shared/types/common';
import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({ label, options, className, ...rest }: SelectProps) {
  const cls = [styles.select, className].filter(Boolean).join(' ');

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <select className={cls} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
