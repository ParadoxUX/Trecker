import { createContext } from 'react';
import type { Theme } from './theme';

export interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
