# KERV UI Kit Dashboard

A Next.js + MUI dashboard that **applies and dogfoods [`@kerv/ui-kit`](kerv-ui-kit/)** — the KERV design system (design tokens, a themed-MUI theme, bespoke glass primitives, and a component registry). The app doubles as a testbed for hardening the kit: as issues surface they're logged to a backlog and batched into kit-source changes.

- **Dashboard** (`/`) — the line-item / creatives management screen, themed entirely by the kit (light "glass" look, gradient background, MUI glass rail sidebar).
- **UI Kit gallery** (`/ui-kit`) — a live kitchen-sink of everything the kit exports: tokens, primitives, themed-MUI surface, and the component registry. Reach it from the **donut icon** in the sidebar; click the KERV logo to return to the dashboard.

## Tech stack

- [Next.js](https://nextjs.org/) 14 (App Router) · React 19
- [MUI](https://mui.com/) 7 + Emotion
- `@kerv/ui-kit` — vendored under [`kerv-ui-kit/`](kerv-ui-kit/) and aliased to `@kerv/ui-kit` via `tsconfig.json` paths

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts: `npm run build` · `npm run start` · `npm run lint`.

## Project structure

```
app/                     Next.js App Router
  page.tsx               Dashboard (wrapped in <KervProvider>)
  ui-kit/page.tsx        Live UI-kit gallery
  layout.tsx             Root layout + Open Sans (the kit font)
components/
  kerv-dashboard.tsx     Main dashboard screen
  sidebar.tsx            Glass rail, MUI icons, routes to /ui-kit
  kit-gallery.tsx        The gallery (renders from the kit's exports)
  add-creative-dialog.tsx, line-item-details.tsx, …  feature dialogs
kerv-ui-kit/             Vendored @kerv/ui-kit
  src/                   tokens · theme · components · hooks · provider · registry
  KIT-BACKLOG.md         Tracked kit-level changes discovered while dogfooding
.claude/skills/          /log-kit-note skill for logging kit issues
```

## Using the kit

The app is wrapped once in the kit provider (theme + `CssBaseline` + gradient `AppShell`):

```tsx
import { KervProvider } from "@kerv/ui-kit";

export default function Page() {
  return <KervProvider>{/* app */}</KervProvider>;
}
```

Stock MUI components (`Button`, `Chip`, `Table`, `Dialog`, …) pick up the KERV look automatically through the theme. Bespoke primitives — `GlassCard`, `PageHeader`, `StatusChip`, `KpiStat`, `SegmentedToggle`, `DetailList` — and the `useGlass` hook are imported from `@kerv/ui-kit`. See [`kerv-ui-kit/README.md`](kerv-ui-kit/README.md) for the full surface.

> The kit here is vendored from a canonical source. Kit changes should be made there and re-synced; the [`KIT-BACKLOG.md`](kerv-ui-kit/KIT-BACKLOG.md) lists the pending kit-level fixes (e.g. input notch defaults, neutral chip color/sizing, bare-X delete icon).

## Logging kit issues

While building, when a component reveals something that should change at the kit/theme/token level, log it with the **`/log-kit-note`** skill — it appends a root-caused entry (problem · proposed kit change · app-side workaround) to [`kerv-ui-kit/KIT-BACKLOG.md`](kerv-ui-kit/KIT-BACKLOG.md) so fixes can be batched.
