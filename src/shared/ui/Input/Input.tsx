import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...rest }: InputProps) {
  const cls = [styles.input, error ? styles.invalid : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={cls} {...rest} />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}
