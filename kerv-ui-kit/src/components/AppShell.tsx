import { Box, type BoxProps } from '@mui/material';
import { gradient } from '../tokens';

/**
 * Paints the branded KERV gradient across the full viewport, fixed while content
 * scrolls. Wrap the whole app. This is the ⚠️ prod-parity background.
 *
 * Merges `kerv-one-theme`'s `AppShell` (which read the gradient from the theme)
 * and `handoff/ui-kit`'s `GlassAppBackground` (which read it from tokens). Both
 * original names are still exported as aliases for back-compat.
 *
 * @example
 * <AppShell>
 *   <AppHeader />
 *   <GlassCard sx={{ m: 4 }}>…</GlassCard>
 * </AppShell>
 */
export function AppShell({ children, sx = [], ...props }: BoxProps) {
  return (
    <Box
      sx={[
        {
          minHeight: '100vh',
          background: gradient,
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

/** @deprecated Use `AppShell`. Kept for back-compat with `handoff/ui-kit`. */
export const GlassAppBackground = AppShell;
