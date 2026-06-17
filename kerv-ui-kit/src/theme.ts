/**
 * KERV UI Kit — MUI Theme
 * ----------------------------------------------------------------------------
 * Derived entirely from `tokens.ts`. Unions every component override from the
 * original `kerv-one-theme` (tables, drawer, snackbar, scrollbar, select menu,
 * form-helper) with the leaner token-driven overrides from `handoff/ui-kit`
 * (tabs, tooltip, card, button shapes), so nothing is lost in the merge.
 *
 * Usage:
 *   import { ThemeProvider, CssBaseline } from '@mui/material';
 *   import { kervTheme } from '@kerv/ui-kit';
 *   <ThemeProvider theme={kervTheme}><CssBaseline/>…</ThemeProvider>
 */
import { createTheme, type Theme } from '@mui/material/styles';
import './types';
import {
  color, gradient, glass, taxonomy, typography,
  radius, shadow, scrollbar, table as tableTok, motion,
  breakpoints as bp, zIndex,
} from './tokens';

// MUI's `shadows` field expects a 25-tuple: ['none', e1, …, e24]. We keep the
// canonical MUI ramp at low elevations and lift the kit's named shadows into
// the well-known mid/high slots so `<Paper elevation={2|4|6|8|16|24}>` and any
// `theme.shadows[N]` consumer pick up the KERV look without surprises.
const muiShadows = [
  'none',
  shadow.card,                                     // 1
  shadow.cardHover,                                // 2
  '0 1px 3px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.04)',  // 3
  shadow.selectMenu,                               // 4
  '0 2px 6px rgba(0,0,0,.08)',                     // 5
  shadow.popover,                                  // 6
  '0 8px 16px rgba(0,0,0,.10)',                    // 7
  shadow.rail,                                     // 8
  '0 10px 20px rgba(0,0,0,.10)',                   // 9
  '0 12px 22px rgba(0,0,0,.12)',                   // 10
  '0 14px 26px rgba(0,0,0,.12)',                   // 11
  '0 16px 28px rgba(0,0,0,.12)',                   // 12
  '0 18px 30px rgba(0,0,0,.14)',                   // 13
  '0 20px 32px rgba(0,0,0,.14)',                   // 14
  '0 22px 34px rgba(0,0,0,.14)',                   // 15
  shadow.alertEmphasis,                            // 16
  '0 26px 38px rgba(0,0,0,.16)',                   // 17
  '0 28px 40px rgba(0,0,0,.16)',                   // 18
  '0 30px 42px rgba(0,0,0,.16)',                   // 19
  '0 32px 44px rgba(0,0,0,.18)',                   // 20
  '0 34px 46px rgba(0,0,0,.18)',                   // 21
  '0 36px 48px rgba(0,0,0,.18)',                   // 22
  '0 38px 50px rgba(0,0,0,.20)',                   // 23
  shadow.dialog,                                   // 24
] as Theme['shadows'];

export const kervTheme: Theme = createTheme({
  // ── MUI 6+ CSS variables mode ──────────────────────────────────────────────
  // Generates CSS custom properties from the palette (`var(--mui-palette-…)`),
  // which makes the theme SSR-safe, lets stylesheets override tokens without
  // remounting, and keeps `sx={(t) => …}` access working unchanged.
  cssVariables: true,

  // ── Custom theme extras ────────────────────────────────────────────────────
  customBackground: { gradient },
  glass: {
    card: glass.card,
    rail: glass.rail,
    dialog: glass.dialog,
    drawer: glass.drawer,
    subtle: glass.subtle,
  },

  // ── Breakpoints (wire the token into MUI so theme.breakpoints.up('md') works) ──
  breakpoints: { values: { xs: bp.xs, sm: bp.sm, md: bp.md, lg: bp.lg, xl: bp.xl } },

  // ── Z-index (fill the full MUI tuple, keep the kit values for the ones we set) ──
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: zIndex.appBar,
    drawer: zIndex.drawer,
    modal: zIndex.dialog,
    snackbar: 1400,
    tooltip: zIndex.tooltip,
  },

  // ── Shadows (the MUI 25-tuple, with kit shadows lifted into known slots) ───
  shadows: muiShadows,

  // ── Transitions (align MUI's transitions tokens with the kit's motion tokens) ─
  transitions: {
    duration: { shortest: 120, shorter: 150, short: 200, standard: 220, complex: 300, enteringScreen: 220, leavingScreen: 180 },
    easing:   { easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)', easeIn: 'cubic-bezier(0.4, 0, 1, 1)', sharp: 'cubic-bezier(0.4, 0, 0.6, 1)' },
  },

  // ── Palette ────────────────────────────────────────────────────────────────
  palette: {
    primary: {
      light: color.primary.light,
      main: color.primary.main,
      dark: color.primary.dark,
      darkest: color.primary.darkest,
      hover: color.primary.hover,
      contrastText: '#fff',
    },
    secondary: { main: color.primary.main },
    success: { main: color.success.main, light: color.success.light },
    warning: { main: color.warning.main },
    error: {
      lightest: color.error.lightest,
      light: color.error.light,
      main: color.error.main,
      dark: color.error.dark,
      darkest: color.error.darkest,
    },
    info: { main: color.info.main },
    indigo: color.indigo,
    amber: color.amber,
    grey: color.grey,
    text: {
      primary: color.text.primary,
      secondary: color.text.secondary,
      disabled: color.text.faint,
    },
    background: { default: color.bg, paper: color.surface },
    divider: color.border.control,
    action: { selected: color.actionSelected, hover: color.primary.hover },

    // Glass (subtle overlay) and glassSection — back-compat with kerv-one-theme.
    glass: {
      background: glass.subtle.background,
      backdropFilter: glass.subtle.backdropFilter,
      border: glass.subtle.border,
    },
    glassSection: {
      background: glass.card.background,
      backdropFilter: glass.card.backdropFilter,
      borderRadius: glass.card.borderRadius,
      border: glass.card.border,
      boxShadow: glass.card.boxShadow,
    },

    taxonomy,
  },

  shape: { borderRadius: radius.button }, // 4px kit default

  // ── Typography (full set from tokens) ──────────────────────────────────────
  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.h1, h2: typography.h2, h3: typography.h3,
    h4: typography.h4, h5: typography.h5, h6: typography.h6,
    body1: typography.body1, body2: typography.body2,
    button: typography.button,
    caption: typography.caption,
    overline: typography.overline,
    subtitle1: typography.subtitle,
  },

  // ── Component overrides (union of both kits, token-driven) ─────────────────
  components: {
    // 1 — CssBaseline: scrollbar + body smoothing
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: color.text.primary, WebkitFontSmoothing: 'antialiased' },
        '*': {
          '&::-webkit-scrollbar':        { width: scrollbar.size, height: scrollbar.size },
          '&::-webkit-scrollbar-track':  { backgroundColor: scrollbar.trackBg },
          '&::-webkit-scrollbar-thumb':  {
            backgroundColor: scrollbar.thumbBg,
            borderRadius: scrollbar.thumbRadius,
            '&:hover': { backgroundColor: scrollbar.thumbBgHover },
          },
        },
      },
    },

    // 2 — Buttons
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: radius.button, textTransform: 'none', '&:hover': { boxShadow: 'none' } },
        contained: { boxShadow: 'none' },
        outlined: ({ theme }) => ({
          boxShadow: 'none',
          '&:hover': { backgroundColor: theme.palette.primary.hover },
        }),
        text: ({ theme }) => ({
          boxShadow: 'none',
          fontWeight: 600,
          '&:hover':  { backgroundColor: theme.palette.primary.hover, boxShadow: 'none' },
          '&:focus':  { backgroundColor: theme.palette.primary.hover },
          '&:active': { backgroundColor: 'rgba(237, 0, 94, 0.12)' },
        }),
        sizeLarge: { height: 42, textTransform: 'uppercase', letterSpacing: '0.0286em' },
      },
    },

    // 3 — Paper (flat by default)
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { boxShadow: 'none' } } },

    // 4 — Card → glass.card
    MuiCard: { styleOverrides: { root: { ...glass.card } } },

    // 5 — Dialog → glass.dialog
    MuiDialog: { styleOverrides: { paper: { ...glass.dialog } } },

    // 6 — Backdrop transparent (so glass dialogs read against the gradient)
    MuiBackdrop: { styleOverrides: { root: { backgroundColor: 'transparent' } } },

    // 7 — Drawer → glass.drawer (mirrors dialog, anchored right by default)
    MuiDrawer: { styleOverrides: { paper: { ...glass.drawer } } },

    // 8 — Chip: status-* class shortcuts + fully-rounded pill default
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.pill,
          fontWeight: 700,
          fontSize: 10,
          '&.status-active': {
            backgroundColor: color.success.light,
            color: theme.palette.text.primary,
            fontWeight: 500,
          },
          '&.status-inactive': {
            backgroundColor: theme.palette.amber.light,
            color: theme.palette.text.primary,
            fontWeight: 500,
          },
          '&.status-unverified': {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.text.primary,
            fontWeight: 500,
          },
        }),
        sizeSmall: { height: 18 },
      },
    },

    // 9 — Inputs: rounded, white fill, magenta focus ring
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.input,
          backgroundColor: color.surface,
          '&.MuiInputBase-sizeSmall:not(.MuiInputBase-multiline)': { height: 36 },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
        }),
      },
    },

    // 10 — Form helper-text consistent gutters
    MuiFormHelperText: { styleOverrides: { root: { marginLeft: 16, marginRight: 16 } } },

    // 11 — Select: tidy menu + small-size padding
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disableScrollLock: true,
          PaperProps: {
            sx: { border: `1px solid ${color.border.control}`, boxShadow: shadow.selectMenu },
          },
        },
      },
      styleOverrides: {
        select: { '&.MuiInputBase-inputSizeSmall': { padding: '8px 14px' } },
      },
    },

    // 12/13 — Tabs / Tab: magenta indicator, sentence-case labels
    MuiTabs: { styleOverrides: { indicator: { backgroundColor: color.primary.main, height: 2 } } },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 14,
          minHeight: 44,
          '&.Mui-selected': { color: color.primary.main },
        },
      },
    },

    // 14 — Alert: 8px radius + 12/20 padding (snackbar gets deeper shadow)
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius.alert,
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 500,
          boxShadow: shadow.alertEmphasis,
        },
      },
    },

    // 15 — Tooltip: dark pill, kit standard
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(60,60,60,0.94)',
          fontSize: 11,
          fontWeight: 500,
          borderRadius: 6,
          padding: '6px 10px',
        },
      },
    },

    // 16 — Snackbar: subtle pop-in animation
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': { animation: `snackbarSlideIn ${motion.snackbarSlideIn}` },
          '@keyframes snackbarSlideIn': {
            '0%':   { opacity: 0, transform: 'translateY(20px) scale(0.9)' },
            '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
          },
        },
      },
    },

    // 17 — Table family (kept from kerv-one-theme): 52px row height, transparent bg
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiPaper-root': { backgroundColor: 'transparent' },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiTableRow-root': {
            height: `${tableTok.rowHeight}px !important`,
            minHeight: `${tableTok.rowHeight}px !important`,
            maxHeight: `${tableTok.rowHeight}px !important`,
          },
          '& .MuiTableCell-root': {
            height: `${tableTok.rowHeight}px !important`,
            maxHeight: `${tableTok.rowHeight}px !important`,
            padding: `${tableTok.cellPadding} !important`,
            verticalAlign: 'middle !important',
            boxSizing: 'border-box !important',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          '& .MuiTableCell-head': {
            fontWeight: tableTok.headFontWeight,
            fontSize: tableTok.headFontSize,
            color: theme.palette.text.primary,
            backgroundColor: 'transparent !important',
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: `${tableTok.rowHeight}px !important`,
            maxHeight: `${tableTok.rowHeight}px !important`,
          },
        }),
      },
    },
    MuiTableBody: { styleOverrides: { root: { backgroundColor: 'transparent' } } },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          minHeight: `${tableTok.rowHeight}px !important`,
          height: `${tableTok.rowHeight}px !important`,
          '&:hover': { backgroundColor: theme.palette.action.hover },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          padding: `${tableTok.cellPadding} !important`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: `${tableTok.rowHeight}px !important`,
          maxHeight: `${tableTok.rowHeight}px !important`,
          verticalAlign: 'middle !important',
          boxSizing: 'border-box',
        }),
        body: ({ theme }) => ({
          fontSize: `${tableTok.bodyFontSize}px !important`,
          color: theme.palette.text.primary,
        }),
      },
    },

    // 18 — Slider: magenta track + thumb, kit height. Single and range both.
    MuiSlider: {
      styleOverrides: {
        root: { color: color.primary.main, height: 4, padding: '13px 0' },
        rail: { opacity: 0.18, backgroundColor: color.primary.main },
        track: { border: 'none' },
        thumb: {
          width: 14,
          height: 14,
          backgroundColor: color.primary.main,
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': { boxShadow: motion.focusRing },
        },
        valueLabel: {
          backgroundColor: 'rgba(60,60,60,0.94)',
          fontSize: 11,
          fontWeight: 500,
          padding: '2px 6px',
          borderRadius: 4,
        },
      },
    },

    // 19 — LinearProgress: 6px / 3px radius (matches the analysis-progress sx).
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 6,
          borderRadius: 3,
          backgroundColor: theme.palette.action.hover,
        }),
        bar: { borderRadius: 3, backgroundColor: color.primary.main },
      },
    },

    // 20 — CircularProgress: magenta by default (matches the scan spinner).
    MuiCircularProgress: {
      defaultProps: { color: 'primary' },
      styleOverrides: { root: { color: color.primary.main } },
    },

    // 21 — IconButton: align with the kit's 4px radius on small surfaces.
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: radius.button } },
    },

    // 22 — Link: brand color on inline links; underline on hover only.
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          textDecorationColor: 'currentColor',
          '&:hover': { color: theme.palette.primary.dark },
        }),
      },
    },
  },
});

/** Convenience: the shadows token bag, exposed for component-level styling. */
export const shadows = shadow;

/** Alias matching the original `kerv-one-theme` package's export name. */
export const theme = kervTheme;

export type KervTheme = Theme;
export default kervTheme;
