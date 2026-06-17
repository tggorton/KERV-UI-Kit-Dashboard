# KERV UI Kit — Modification Backlog

This file tracks issues and improvements for `@kerv/ui-kit` discovered while
dogfooding it inside the **kerv-dashboard** app. The kit source lives under
[`kerv-ui-kit/src/`](src/) (copied from `../_Assets-Themes-etc/kerv-ui-kit`).

The goal is to **batch these into kit-source changes** (theme overrides,
components, tokens) so consumers don't need per-call-site workarounds. Log
freely as things surface; resolve in groups.

Add entries with the **`/log-kit-note`** skill (or by hand using the template
at the bottom). Newest-relevant first; don't renumber.

**Status legend:** `open` · `in-progress` · `resolved` · `wontfix`

---

## KIT-001 — Outlined inputs need a proper label/notch out of the box

- **Status:** open
- **Logged:** 2026-06-17
- **Area:** theme override — `MuiOutlinedInput` + `MuiInputLabel` (notched outline)
- **Observed in:** [`components/add-creative-dialog.tsx`](../components/add-creative-dialog.tsx) — "Add Creatives" modal, the "Creative" Autocomplete field.
- **Problem:** Inputs ported from the old dark theme faked the floating label with a hack — force `.MuiOutlinedInput-notchedOutline legend { width: 0 }` so the border never cuts a gap, then absolutely position the label over the border with a solid background to *mask* it. On the light glass theme the mask color is wrong, so the outline border draws a line straight through the "Creative" label text. The kit theme currently has **no `MuiInputLabel` override and doesn't guarantee correct notch behavior**, so every consumer reinvents (often badly) the floating-label treatment.
- **Proposed kit change:** Standardize outlined-input labels in the theme so a plain `<TextField label="…" />` (and Autocomplete `renderInput`) renders a correct floating label + properly cut notch with kit colors automatically: label `text.secondary`, focused `primary.main`, notch sized from the label by MUI. Document the `shrink: true` + persistent-placeholder pattern (label stays up, placeholder visible) as the supported recipe. Verify no call site needs legend/label hacks afterward.
- **App-side workaround (done):** Removed all hacks; rely on `InputLabelProps={{ shrink: true }}` and MUI's native notch; dropped the redundant `FormControl` wrapper and duplicate `InputProps` spread.

## KIT-002 — Selection Chip uses a 4px button radius instead of the MUI pill shape

- **Status:** open
- **Logged:** 2026-06-17
- **Area:** component/theme — `MuiChip` (chip shape / token `radius.pill`)
- **Observed in:** [`components/add-creative-dialog.tsx`](../components/add-creative-dialog.tsx) — `renderTags` chips in the "Add Creatives" selection bar (e.g. the "Creative 1" tag).
- **Problem:** The selected-creative chips render with `borderRadius: "4px"` (a button-like, lightly-rounded rectangle) instead of the fully-rounded MUI **pill**. The kit theme *does* set `MuiChip` root `borderRadius: radius.pill` (20px), but legacy call sites override it inline with `borderRadius: "4px"`, so the intended pill shape never shows. Selection tokens like these should read as proper pills.
- **Proposed kit change:** Confirm the fully-rounded pill (`radius.pill`) as the canonical Chip shape (already in the theme). If a squared "tag" chip is genuinely wanted somewhere, add it as an **explicit kit variant** (e.g. a `tag`/`token` Chip variant or a kit `Tag` primitive) rather than ad-hoc `borderRadius` overrides. Then sweep the app to remove inline radius overrides so the theme/variant governs shape.
- **App-side workaround (done):** Removed the inline `borderRadius: "4px"` on the `renderTags` Chip so the kit theme's pill shape applies. The kit-level decision (canonical pill vs. an explicit squared-tag variant) is still **open**.
- **Related:** [[KIT-003]] (chip color/sizing for selection tokens).

## KIT-003 — No clean neutral "selection token" Chip; base Chip font is too small/bold

- **Status:** open
- **Logged:** 2026-06-17
- **Area:** theme override / component — `MuiChip` (default sizing + a neutral/selection variant); tokens `color.actionSelected`
- **Observed in:** [`components/add-creative-dialog.tsx`](../components/add-creative-dialog.tsx) — multi-select input-bar pills. Reference design (taxonomy explorer) shows **grey, fully-rounded pills with dark text and a grey delete X**.
- **Problem:** Multi-select input chips should be a neutral **grey** pill, but the kit gives no first-class way to get one. The grey exists (`action.selected` = `#E7E7E7`) only via the `.status-unverified` class — semantically wrong for a generic selection token. Worse, the base `MuiChip` root forces `fontSize: 10` + `fontWeight: 700`, so a plain `<Chip>` renders tiny/bold; input-bar pills need ~13px / 500. So every consumer hand-rolls bg + font overrides.
- **Proposed kit change:** (1) Reconsider the base `MuiChip` defaults — 10px/700 is an overline-style size that shouldn't be the global chip default; pick a sensible default (~13px/500) and reserve tiny/bold for an explicit small/eyebrow use. (2) Add a first-class **neutral/selection** chip (a `variant`/`color` or a kit `Tag` primitive) backed by `action.selected` with `text.primary` text and a muted delete icon, matching the reference grey pill. (3) Keep the color-coded taxonomy pills (e.g. `taxonomy.sentiment`) as a separate concern — see note below.
- **App-side workaround (done):** Styled the `renderTags` chips explicitly — `bgcolor: action.selected`, `color: text.primary`, `fontSize: 13`, `fontWeight: 500`, muted delete icon; pill shape from the theme.
- **Deferred (per user):** Color-coded category pills in the *selection area* (e.g. taxonomy-colored chips) are a separate, later item — focus for now is the neutral grey multi-select input-bar pills.

## KIT-004 — Deletable Chips should use a plain "X" delete icon, not the circle-X

- **Status:** open
- **Logged:** 2026-06-17
- **Area:** theme override — `MuiChip.defaultProps.deleteIcon`
- **Observed in:** [`components/add-creative-dialog.tsx`](../components/add-creative-dialog.tsx) — multi-select input-bar pills. Reference design shows a **bare X** for removing a pill; MUI default renders `CancelIcon` (a filled circle with an X knocked out).
- **Problem:** The kit defines no `deleteIcon`, so every deletable Chip falls back to MUI's `CancelIcon` (circle + X). The intended treatment is a plain X (`CloseIcon`/`ClearIcon`), so consumers have to set `deleteIcon` per call site.
- **Proposed kit change:** Set `MuiChip.defaultProps.deleteIcon = <CloseIcon />` (or `ClearIcon`) in the kit theme so all deletable chips get the bare X by default, with a sensible muted color + hover (e.g. `text.secondary` → `text.primary`) and size. Fold this in alongside the neutral-chip work in [[KIT-003]].
- **App-side workaround:** (applying now) pass `deleteIcon={<CloseIcon />}` to the selection chips and size/color it via `& .MuiChip-deleteIcon`.
- **Related:** [[KIT-003]] (neutral selection-token chip color/sizing).

---

## Entry template

```md
## KIT-NNN — <short imperative title>

- **Status:** open
- **Logged:** <YYYY-MM-DD>
- **Area:** <theme override | component | token> — <specific symbol, e.g. MuiChip>
- **Observed in:** <file(s) + UI location>
- **Problem:** <what's wrong + root cause if known>
- **Proposed kit change:** <what should change at the kit/theme/token level>
- **App-side workaround:** <what was done in the app meanwhile, or "None yet">
```
