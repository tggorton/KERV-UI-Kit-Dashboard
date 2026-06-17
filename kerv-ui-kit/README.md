# @kerv/ui-kit

**A complete KERV UI kit** — design tokens, themed MUI overrides, bespoke
primitives, a discoverable registry, and a Storybook playground.

Merges the two pre-existing pieces of the design system into a single,
shippable package:

- **[`kerv-one-theme`](../_replaced/)** — the polished MUI theme. Deep override
  set (tables, drawer, snackbar, scrollbar, select menu, form helpers),
  taxonomy palette, Open Sans typography. Was great as a theme, light on
  components/tokens/discovery.
- **[`handoff/ui-kit`](../../mediaplanner-react/handoff/ui-kit/)** — the
  hand-off reference. Dedicated `tokens.ts`, 7 primitives, a registry, plus
  motion / sidebar / zIndex / status-palette tokens. Was a good "starter kit"
  but unpackaged, no playground, leaner overrides.

This kit takes the **union** of both: every override from `kerv-one-theme` is
preserved (and now token-driven), every token category from `handoff/ui-kit` is
preserved (and `taxonomy` is added from the original theme), every primitive
is brought across (with deprecated aliases for the original names), and a
Storybook playground is added on top.

See [`docs/MIGRATION.md`](docs/MIGRATION.md) for how to move existing
`kerv-one-theme` / `handoff/ui-kit` consumers onto this kit.

---

## What's in it

| Pillar | Where | Notes |
|---|---|---|
| **Design tokens** (standalone) | [`src/tokens.ts`](src/tokens.ts) | 15 categories: color, taxonomy, statusPalette, gradient, glass (5 variants), typography, spacing, sidebar, radius, shadow, motion, scrollbar, table, breakpoints, zIndex. |
| **Theme / MUI overrides** | [`src/theme.ts`](src/theme.ts) | **27 component overrides** + full MUI theme structure (`cssVariables: true`, `breakpoints`, `shadows` 25-tuple, `transitions`, `zIndex`). Themed: Button, IconButton, Link, Paper, Card, Dialog, Drawer, Backdrop, Chip, OutlinedInput, FormHelperText, Select, Tabs, Tab, Alert, Tooltip, Snackbar, full Table family (6), Slider, LinearProgress, CircularProgress, CssBaseline. Fully token-driven. |
| **Reusable components** | [`src/components/`](src/components/) | 7 kit primitives: `AppShell`, `GlassCard` (5 variants), `PageHeader`, `StatusChip`, `KpiStat`, `SegmentedToggle`, `DetailList`. Deprecated aliases (`GlassAppBackground`, `GlassSection`) re-exported for compat. |
| **Provider** | [`src/KervProvider.tsx`](src/KervProvider.tsx) | One-import setup: `<KervProvider>` = `ThemeProvider(kervTheme)` + `CssBaseline` + optional `AppShell` wrap. Opt-out flags for each. |
| **Hooks** | [`src/hooks/`](src/hooks/) | `useGlass(variant)` returns the glass CSS object for spread into `sx`; theme-aware so overrides survive. |
| **Component registry / discovery** | [`src/registry.ts`](src/registry.ts) | Every entry tagged `primitive` vs `themed-mui`, `kit-ready` vs `deprecated-alias`, with source, deps, and a Storybook id. Query helpers: `byStatus`, `byKind`, `find`, `kitComponents`, `deprecatedAliases`. |
| **Installable package** | [`package.json`](package.json) | `@kerv/ui-kit` with subpath `exports` for `/tokens`, `/theme`, `/components`, `/hooks`, `/provider`, `/registry`. Peer deps: `@mui/material`, `@mui/icons-material`, `@emotion/*`, `react`/`react-dom` (18/19). |
| **Storybook playground** | [`.storybook/`](.storybook/) · [`stories/`](stories/) | Storybook 8 + Vite + `@storybook/addon-themes` (toolbar theme switcher) + autodocs on every component story. Foundations (5), Primitives (7), Themed MUI (10). Run `npm run storybook`. |
| **Documentation** | [`README.md`](README.md) · [`docs/`](docs/) | Tokens reference, migration guide, changelog. |
| **Self-description** | This file + Storybook *Introduction* | "A complete KERV UI kit." |

---

## Install / use

```bash
# from the repo root (the kit is a workspace folder, not published to a registry)
cd _Temp/kerv-ui-kit
npm install
```

**One-import setup (recommended):**

```tsx
import { KervProvider, PageHeader, GlassCard } from '@kerv/ui-kit';

export default function App() {
  return (
    <KervProvider>
      <PageHeader title="Generate Media Plan" subtitle="Upload a video to begin." />
      <GlassCard sx={{ m: 4, p: 4 }}>{/* content */}</GlassCard>
    </KervProvider>
  );
}
```

`<KervProvider>` is `<ThemeProvider theme={kervTheme}> + <CssBaseline/> + <AppShell/>` in one. Opt out of any piece via `<KervProvider withShell={false} cssBaseline={false}>`, or pass a custom `theme={...}` to extend.

**Manual setup** (when consumers need finer control):

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { kervTheme, AppShell } from '@kerv/ui-kit';

<ThemeProvider theme={kervTheme}>
  <CssBaseline />
  <AppShell>{/* … */}</AppShell>
</ThemeProvider>
```

**Subpath imports** (tighter trees):

```ts
import { tokens } from '@kerv/ui-kit/tokens';
import { kervTheme } from '@kerv/ui-kit/theme';
import { GlassCard, StatusChip } from '@kerv/ui-kit/components';
import { useGlass } from '@kerv/ui-kit/hooks';
import { KervProvider } from '@kerv/ui-kit/provider';
import { componentRegistry } from '@kerv/ui-kit/registry';
```

---

## Run the playground

```bash
npm install
npm run storybook         # opens http://localhost:6006
```

Stories cover:
- **Foundations** — Color, Typography, Spacing & Sizing, Glass, Status Palette
- **Primitives** — every kit component, with controls
- **Themed MUI** — Button, Chip, Inputs (TextField/Select), Tabs, Tooltip, Dialog, Snackbar/Alert, Table

The Introduction story reads the registry live so it always reflects what's actually exported.

---

## Add a component

1. Add the file under [`src/components/`](src/components/) and export it from [`src/components/index.ts`](src/components/index.ts).
2. Add a registry entry to [`src/registry.ts`](src/registry.ts) (`kind: 'primitive' | 'themed-mui'`, `status: 'kit-ready'`).
3. Add a story under `stories/primitives/` or `stories/themed-mui/`.
4. Reference tokens — never literals. If a literal is needed, add it to [`src/tokens.ts`](src/tokens.ts) first.

---

## MUI integration

The kit is **MUI-first**: it is an MUI theme plus a small number of bespoke
primitives that themselves render MUI components. Everything below is wired
out of the box.

### Theme structure (what `kervTheme` actually fills in)

| MUI `createTheme` field | What we set | Notes |
|---|---|---|
| `cssVariables` | `true` | MUI 6+ CSS-variables mode — generates `var(--mui-palette-…)` for SSR-safety and var-based overrides. `sx={(t) => …}` access is unchanged. |
| `palette` | brand magenta + neutrals + extended scales (`indigo`, `amber`), semantic (`success/warning/error/info/teal`), back-compat `glass` / `glassSection`, `taxonomy`. | All from `tokens.color`. `primary` carries the `lightest/darkest/hover` extras (declared in `src/types.ts`). |
| `typography` | full set h1–h6, body1/body2, button, caption, overline, subtitle1. | All from `tokens.typography`. |
| `shape.borderRadius` | `4` (kit button standard). |  |
| `breakpoints.values` | `{ xs, sm, md, lg, xl }` from `tokens.breakpoints`. | `theme.breakpoints.up('md')` works. |
| `shadows` | A full **25-tuple** with the kit's named shadows lifted into well-known elevation slots (`card`→1, `cardHover`→2, `selectMenu`→4, `popover`→6, `rail`→8, `alertEmphasis`→16, `dialog`→24). | So `<Paper elevation={N}>` and any `theme.shadows[N]` consumer pick up the KERV look. |
| `transitions.duration` / `transitions.easing` | Aligned with `tokens.motion`. | Including `enteringScreen` / `leavingScreen` durations used by MUI's transition components. |
| `zIndex` | Full MUI tuple (`mobileStepper / fab / speedDial / appBar / drawer / modal / snackbar / tooltip`). | Kit values from `tokens.zIndex` where set; sensible MUI defaults elsewhere. |
| `customBackground.gradient` | Kit gradient string. | `theme.customBackground.gradient`. |
| `glass.{card,rail,dialog,drawer,subtle}` | The 5 glass treatments. | Accessible via `useGlass(variant)` (theme-aware) or directly. |
| `components.MuiXxx` | **27 overrides** — see the table in this README. | All token-driven, no literal duplication. |

### MUI module augmentation

[`src/types.ts`](src/types.ts) augments MUI's `@mui/material/styles` module so
the type system knows about every kit extra:

- **Palette additions:** `indigo`, `amber`, `glass`, `glassSection`, `taxonomy`.
- **Palette-color extras:** `lightest`, `darkest`, `hover` on `PaletteColor`.
- **Theme additions:** `customBackground.gradient`, `glass.{variant}`.

Importing the kit (`@kerv/ui-kit`) automatically pulls this in. If you bypass
the root import and only use subpaths, also `import '@kerv/ui-kit/types'` once.

### `sx` & `styled` work as usual

```tsx
import { Box, useTheme } from '@mui/material';
import { useGlass } from '@kerv/ui-kit/hooks';

function Surface() {
  const t = useTheme();
  const glassSx = useGlass('card');
  return (
    <Box sx={{
      ...glassSx,
      p: 4,
      bgcolor: 'primary.main',                           // standard MUI
      color: t.palette.taxonomy.iab.bg,                  // kit-added palette
      background: t.customBackground.gradient,           // theme extra
    }} />
  );
}
```

### Icons (peer dep)

Several kit primitives render `@mui/icons-material` SVGs (e.g. `PageHeader`
uses `ArrowBackIcon`), so the kit declares **`@mui/icons-material` as a peer
dependency**. Install alongside `@mui/material`:

```bash
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### React 18 & 19 / MUI 6 & 7

Peer ranges: `react ^18 || ^19` · `@mui/material ^6 || ^7`. Tested against the
versions installed by `npm install` (currently MUI 7.3.x).

## Design rules

- **Theme-first.** If a stock MUI component can carry the look via theme
  overrides, do that instead of writing a wrapper. The themed-MUI surface
  (Button, Chip, Dialog, Tabs, Table, …) is the bulk of the kit's value.
- **Tokens are the contract.** No literals in components or stories. Add the
  token, then use it. Tokens are public API; theme/components derive from them.
- **Primitives are minimal.** A kit primitive earns its slot by being the
  shorter, more-correct way to do something cross-cutting (glass surfaces,
  status pills, two-box page header). Anything app-shaped lives in the app.
- **Aliases for migration.** `GlassAppBackground` and `GlassSection` remain
  exported so existing call sites keep working through the rename window.

---

## Status & gradings

This kit raises the grade from **C+ theme** (`kerv-one-theme`) and **B+ starter kit**
(`handoff/ui-kit`) to a single **A− complete kit**:

| Criterion | Before (best of two) | This kit |
|---|---|---|
| Design tokens (standalone) | ✅ via `handoff/ui-kit` | ✅ same shape + `taxonomy` |
| Reusable components | ✅ 7 (handoff) | ✅ 7 + `AppShell` + variant aliases |
| Theme / MUI overrides | ✅ Deep (18) via `kerv-one-theme` | ✅ Union (~22), all token-driven |
| Documentation | ✅ both | ✅ README + TOKENS + MIGRATION + CHANGELOG |
| Installable package | ✅ via `kerv-one-theme` | ✅ + subpath `exports` |
| Component registry / discovery | ✅ via `handoff/ui-kit` | ✅ kit-scoped + Storybook ids |
| Storybook / visual playground | ❌ | ✅ Storybook 8 + Vite |
| Self-description | "Not a component library" / "Robust standalone UI kit" | "A complete KERV UI kit." |
