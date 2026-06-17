import { type ReactNode } from 'react';
import { ThemeProvider, CssBaseline, type Theme } from '@mui/material';
import { kervTheme } from './theme';
import { AppShell } from './components/AppShell';

export interface KervProviderProps {
  children: ReactNode;
  /**
   * Provide a theme to override the kit default. Useful when consumers need
   * to extend the theme (e.g. add custom variants) — pass the result of
   * `createTheme({...kervTheme, ...overrides})`.
   */
  theme?: Theme;
  /**
   * If `true` (default), wrap children in `<AppShell/>` so the gradient
   * background is painted. Set `false` when consumers manage their own shell.
   */
  withShell?: boolean;
  /**
   * If `true` (default), render `<CssBaseline/>`. Set `false` if the host app
   * already mounts one (avoids double-resets).
   */
  cssBaseline?: boolean;
}

/**
 * One-import setup for the KERV UI kit — wraps the tree with the kit theme,
 * CssBaseline, and the gradient `<AppShell/>`. Most apps can use this verbatim:
 *
 * @example
 * import { KervProvider } from '@kerv/ui-kit';
 * createRoot(el).render(<KervProvider><App/></KervProvider>);
 *
 * For more control, opt out of the shell or the baseline:
 *
 * @example <KervProvider withShell={false} cssBaseline={false}>…</KervProvider>
 */
export function KervProvider({
  children,
  theme = kervTheme,
  withShell = true,
  cssBaseline = true,
}: KervProviderProps) {
  const body = withShell ? <AppShell>{children}</AppShell> : children;
  return (
    <ThemeProvider theme={theme}>
      {cssBaseline && <CssBaseline />}
      {body}
    </ThemeProvider>
  );
}
