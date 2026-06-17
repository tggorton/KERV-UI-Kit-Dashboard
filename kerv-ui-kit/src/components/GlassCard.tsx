import { Box, type BoxProps } from '@mui/material';
import { glass } from '../tokens';

export type GlassVariant = 'card' | 'rail' | 'dialog' | 'drawer' | 'subtle';

/**
 * The KERV glass container — semi-transparent white + backdrop blur + white
 * "glass edge" + rounded corners + soft shadow. The ⚠️ prod-parity surface used
 * for every content/header box. Five variants cover every glass surface in the
 * design (cards, the sidebar rail, dialogs, drawers, and subtle overlays).
 *
 * Supersedes `kerv-one-theme`'s `GlassSection` (which only had the card +
 * subtle variants). `GlassSection` is re-exported as a deprecated alias.
 *
 * @example <GlassCard sx={{ p: 4 }}>…</GlassCard>            // content card
 * @example <GlassCard variant="dialog">…</GlassCard>
 * @example <GlassCard variant="rail" />                       // sidebar rail
 */
export function GlassCard({
  variant = 'card',
  sx = [],
  children,
  ...props
}: BoxProps & { variant?: GlassVariant }) {
  return (
    <Box sx={[glass[variant] as object, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {children}
    </Box>
  );
}

/** @deprecated Use `<GlassCard variant="card" />`. Kept for back-compat with `kerv-one-theme`. */
export const GlassSection = (props: BoxProps) => <GlassCard variant="card" {...props} />;
