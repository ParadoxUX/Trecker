import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  applyThemeToDOM,
  getInitialTheme,
  persistTheme,
  type Theme,
} from './theme';
import { ThemeContext } from './context';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyThemeToDOM(theme);
    persistTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
