import { useTheme } from '@mui/material/styles';
import { glass as glassTokens } from '../tokens';

export type GlassVariant = keyof typeof glassTokens; // 'card' | 'rail' | 'dialog' | 'drawer' | 'subtle'

/**
 * Returns the glass treatment for a given variant, ready to spread into an
 * `sx` prop or a styled component. Prefers `theme.glass[variant]` (so a
 * theme override survives) and falls back to the kit tokens.
 *
 * @example
 * const glassSx = useGlass('card');
 * <Box sx={{ ...glassSx, p: 4 }}>…</Box>
 */
export function useGlass(variant: GlassVariant = 'card'): Record<string, unknown> {
  const theme = useTheme();
  return (theme.glass?.[variant] as Record<string, unknown>) ?? (glassTokens[variant] as Record<string, unknown>);
}
