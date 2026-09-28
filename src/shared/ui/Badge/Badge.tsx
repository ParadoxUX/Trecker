import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={[styles.badge, styles[tone]].join(' ')}>{children}</span>;
}
