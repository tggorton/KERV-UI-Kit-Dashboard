/**
 * KERV UI Kit — Component Registry
 * ----------------------------------------------------------------------------
 * The kit's discoverable index. Programmatic surface for tooling, Storybook
 * sidebars, hand-off docs, and any "what's in the kit?" check.
 *
 * Two kinds of entries:
 *  - **primitive**   — a bespoke kit component (e.g. `GlassCard`, `StatusChip`).
 *  - **themed-mui**  — a stock MUI component that the kit's theme overrides
 *                      give a KERV-specific look (e.g. `Button`, `Tabs`).
 *
 * Status:
 *  - **kit-ready** — fully part of the kit; safe to import/use.
 *  - **deprecated-alias** — kept exported for back-compat with the original
 *    `kerv-one-theme` (e.g. `GlassSection` aliases `GlassCard`).
 */

export type ComponentKind = 'primitive' | 'themed-mui';
export type ComponentStatus = 'kit-ready' | 'deprecated-alias';

export interface ComponentEntry {
  /** Name as exported from the kit. */
  name: string;
  kind: ComponentKind;
  status: ComponentStatus;
  /** Path within the kit (or `@mui/material/<X>` for themed-MUI entries). */
  source: string;
  /** One-line purpose. */
  description: string;
  /** Tokens / other components this entry depends on. */
  uses?: string[];
  /** Optional pointer to the spec doc anchor. */
  spec?: string;
  /** Optional Storybook story id (kind/title). */
  storybook?: string;
}

export const componentRegistry: ComponentEntry[] = [
  // ── Foundations ────────────────────────────────────────────────────────────
  {
    name: 'tokens',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/tokens.ts',
    description: 'Single source of truth: color, gradient, glass, typography, spacing, sidebar, radius, shadow, motion, scrollbar, table, breakpoints, zIndex, taxonomy, statusPalette.',
    spec: 'docs/TOKENS.md',
    storybook: 'foundations/tokens',
  },
  {
    name: 'kervTheme',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/theme.ts',
    description: 'MUI theme assembled from tokens. Includes overrides for Button, Paper, Card, Dialog, Drawer, Backdrop, Chip, OutlinedInput, FormHelperText, Select, Tabs, Tab, Alert, Tooltip, Snackbar, Table family, CssBaseline (~22 targets).',
    uses: ['tokens'],
    spec: 'README.md#theme',
    storybook: 'foundations/theme',
  },

  // ── Setup / DX ─────────────────────────────────────────────────────────────
  {
    name: 'KervProvider',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/KervProvider.tsx',
    description: 'One-import setup: ThemeProvider(kervTheme) + CssBaseline + optional AppShell wrap. Configurable.',
    uses: ['kervTheme', 'AppShell'],
    spec: 'README.md#install--use',
  },
  {
    name: 'useGlass',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/hooks/useGlass.ts',
    description: 'Hook returning the glass CSS object for a given variant; reads `theme.glass[variant]` so theme overrides win, falls back to tokens.',
    uses: ['glass'],
  },

  // ── Bespoke primitives ─────────────────────────────────────────────────────
  {
    name: 'AppShell',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/AppShell.tsx',
    description: 'Full-viewport gradient wrapper (fixed). Wrap the whole app.',
    uses: ['gradient'],
    storybook: 'primitives/AppShell',
  },
  {
    name: 'GlassAppBackground',
    kind: 'primitive',
    status: 'deprecated-alias',
    source: 'src/components/AppShell.tsx',
    description: 'Alias of AppShell. Kept for back-compat with handoff/ui-kit.',
    uses: ['AppShell'],
  },
  {
    name: 'GlassCard',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/GlassCard.tsx',
    description: 'The KERV glass container, with 5 variants: card · rail · dialog · drawer · subtle.',
    uses: ['glass'],
    storybook: 'primitives/GlassCard',
  },
  {
    name: 'GlassSection',
    kind: 'primitive',
    status: 'deprecated-alias',
    source: 'src/components/GlassCard.tsx',
    description: 'Alias of <GlassCard variant="card" />. Kept for back-compat with kerv-one-theme.',
    uses: ['GlassCard'],
  },
  {
    name: 'PageHeader',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/PageHeader.tsx',
    description: 'Two-box header card: optional back link + title + subtitle.',
    uses: ['GlassCard', 'color', 'spacing', 'typography'],
    storybook: 'primitives/PageHeader',
  },
  {
    name: 'StatusChip',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/StatusChip.tsx',
    description: 'Status pill: vod / live / organic / high / standard / refined (live has a glowing dot).',
    uses: ['statusPalette'],
    storybook: 'primitives/StatusChip',
  },
  {
    name: 'KpiStat',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/KpiStat.tsx',
    description: 'Eyebrow label over a bold value (optionally magenta-accented).',
    uses: ['color', 'typography'],
    storybook: 'primitives/KpiStat',
  },
  {
    name: 'SegmentedToggle',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/SegmentedToggle.tsx',
    description: 'Segmented control with active white pill; magenta active text.',
    uses: ['color'],
    storybook: 'primitives/SegmentedToggle',
  },
  {
    name: 'DetailList',
    kind: 'primitive',
    status: 'kit-ready',
    source: 'src/components/DetailList.tsx',
    description: 'Compact key/value list with hairline rows (label faint, value primary, right-aligned).',
    uses: ['color'],
    storybook: 'primitives/DetailList',
  },

  // ── Themed-MUI surface ─────────────────────────────────────────────────────
  // Stock MUI components that pick up the kit's look automatically through the
  // theme. Listed here for discoverability; import them from @mui/material as
  // usual.
  {
    name: 'Button',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Button',
    description: 'Themed: 4px radius, flat (no elevation), sentence-case; sizeLarge → 42px upper.',
    uses: ['radius.button', 'typography.button'],
    storybook: 'themed-mui/Button',
  },
  {
    name: 'Chip',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Chip',
    description: 'Themed: fully-rounded pill (20px), 10px/700; status-active / -inactive / -unverified class shortcuts.',
    uses: ['radius.pill'],
    storybook: 'themed-mui/Chip',
  },
  {
    name: 'Card',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Card',
    description: 'Themed with glass.card. Prefer <GlassCard/> for explicit variant control.',
    uses: ['glass.card'],
    storybook: 'themed-mui/Card',
  },
  {
    name: 'Dialog',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Dialog',
    description: 'Themed with glass.dialog + transparent Backdrop.',
    uses: ['glass.dialog'],
    storybook: 'themed-mui/Dialog',
  },
  {
    name: 'Drawer',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Drawer',
    description: 'Themed with glass.drawer (mirror of dialog, anchored right).',
    uses: ['glass.drawer'],
    storybook: 'themed-mui/Drawer',
  },
  {
    name: 'OutlinedInput',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/OutlinedInput',
    description: 'Themed: 8px radius, white fill, magenta focus ring; small-size 36px.',
    uses: ['radius.input'],
    storybook: 'themed-mui/Inputs',
  },
  {
    name: 'Select',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Select',
    description: 'Themed menu: hairline border + soft shadow; disableScrollLock; small-size padding 8/14.',
    uses: ['color.border.control', 'shadow.selectMenu'],
    storybook: 'themed-mui/Inputs',
  },
  {
    name: 'Tabs',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Tabs',
    description: 'Themed: magenta 2px indicator; sentence-case 14/500 tabs; magenta active.',
    uses: ['color.primary.main'],
    storybook: 'themed-mui/Tabs',
  },
  {
    name: 'Tooltip',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Tooltip',
    description: 'Themed: dark pill (rgba(60,60,60,.94)), 11/500, 6px radius, 6×10 padding.',
    storybook: 'themed-mui/Tooltip',
  },
  {
    name: 'Alert',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Alert',
    description: 'Themed: 8px radius, 12/20 padding, 14/500, snackbar-grade emphasis shadow.',
    uses: ['radius.alert', 'shadow.alertEmphasis'],
    storybook: 'themed-mui/Snackbar',
  },
  {
    name: 'Snackbar',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Snackbar',
    description: 'Themed: slide-in pop animation (snackbarSlideIn keyframe).',
    uses: ['motion.snackbarSlideIn'],
    storybook: 'themed-mui/Snackbar',
  },
  {
    name: 'Table',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Table',
    description: 'Themed table family (TableContainer/Head/Body/Row/Cell): transparent bg, 52px rows, hairline divider, 14px head, hover tint.',
    uses: ['table.rowHeight', 'color.border.control'],
    storybook: 'themed-mui/Table',
  },
  {
    name: 'Slider',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Slider',
    description: 'Themed: magenta track/thumb (14px), kit focus ring, dark value-label pill. Single and range.',
    uses: ['color.primary.main', 'motion.focusRing'],
    storybook: 'themed-mui/Slider',
  },
  {
    name: 'LinearProgress',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/LinearProgress',
    description: 'Themed: 6px height, 3px radius, magenta bar over action.hover track. Matches the scan-progress treatment.',
    uses: ['color.primary.main'],
    storybook: 'themed-mui/Progress',
  },
  {
    name: 'CircularProgress',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/CircularProgress',
    description: 'Themed: magenta by default.',
    uses: ['color.primary.main'],
    storybook: 'themed-mui/Progress',
  },
  {
    name: 'IconButton',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/IconButton',
    description: 'Themed: 4px radius to match the kit button.',
    uses: ['radius.button'],
  },
  {
    name: 'Link',
    kind: 'themed-mui',
    status: 'kit-ready',
    source: '@mui/material/Link',
    description: 'Themed: primary color, current-color underline on hover, dark on hover state.',
    uses: ['color.primary'],
  },
];

// ─── Query helpers ───────────────────────────────────────────────────────────

export const byStatus = (s: ComponentStatus) =>
  componentRegistry.filter((e) => e.status === s);

export const byKind = (k: ComponentKind) =>
  componentRegistry.filter((e) => e.kind === k);

export const find = (name: string) =>
  componentRegistry.find((e) => e.name === name);

/** All kit-ready entries (primitive + themed-mui). */
export const kitComponents = () => byStatus('kit-ready');

/** All deprecated-alias entries — call out at upgrade time. */
export const deprecatedAliases = () => byStatus('deprecated-alias');
