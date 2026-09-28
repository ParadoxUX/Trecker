import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/shared/ui';
import { ThemeProvider } from '@/shared/lib';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
