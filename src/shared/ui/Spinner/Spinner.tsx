import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Spinner({ size = 'md', label }: SpinnerProps) {
  return (
    <div className={styles.wrapper}>
      <span className={[styles.spinner, styles[size]].join(' ')} aria-hidden />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
