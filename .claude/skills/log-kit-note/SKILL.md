---
name: log-kit-note
description: Log a KERV UI kit modification/issue (discovered while dogfooding the kerv-dashboard app) into the kit backlog so it can be batched into kit-source changes later. Use when the user wants to note/log/capture/track an issue or improvement to push to the UI kit at the theme/component/token level — e.g. "log this for the kit", "add a kit note", "note this for the UI kit backlog", "log that element". Also use to mark a logged item resolved.
---

# Log a KERV UI kit modification note

The **kerv-dashboard** app is used to dogfood and harden `@kerv/ui-kit` (copied
under [`kerv-ui-kit/src/`](../../kerv-ui-kit/src/)). As issues/improvements
surface, capture them in the kit backlog so they can be batched into kit-source
changes (theme overrides, components, tokens) instead of one-off app fixes.

**Backlog file:** `kerv-ui-kit/KIT-BACKLOG.md` (relative to the project root).

## Adding a new entry

1. **Read** `kerv-ui-kit/KIT-BACKLOG.md`.
2. **Next ID:** find the highest `KIT-NNN` and increment; zero-pad to 3 digits.
3. **Fill the fields** below. Infer as much as possible from the conversation
   and the code (open the referenced component to root-cause the issue). Only
   ask the user if something material is genuinely unclear — don't interrogate.
   - **Title** — short imperative summary of the desired end state.
   - **Area** — kit layer + specific target: `theme override | component | token`
     and the symbol (e.g. `MuiOutlinedInput`, `MuiChip`, `tokens.radius`).
   - **Observed in** — file(s) + the UI location where it showed up (use a
     relative markdown link to the file).
   - **Problem** — what's wrong and *why*; include the root cause if you can
     determine it (don't just restate the symptom).
   - **Proposed kit change** — what should change at the kit/theme/token level
     so consumers get it for free.
   - **App-side workaround** — what (if anything) was done in the app meanwhile,
     or `None yet`.
   - **Status** — default `open`.
   - **Logged** — today's date as `YYYY-MM-DD`.
4. **Append** the entry directly above the `---` that precedes the
   "Entry template" section (newest seeded entries stay grouped at the top of
   the list; do not renumber or edit existing entries unless asked).
5. **Confirm** to the user with the new ID and one-line title.

## Entry format

```md
## KIT-NNN — <short imperative title>

- **Status:** open
- **Logged:** <YYYY-MM-DD>
- **Area:** <theme override | component | token> — <specific symbol>
- **Observed in:** <relative link + UI location>
- **Problem:** <what's wrong + root cause>
- **Proposed kit change:** <kit/theme/token-level change>
- **App-side workaround:** <what was done, or "None yet">
```

## Resolving an item

When the user says an item is done (or you just pushed the kit change):
- Set its **Status** to `resolved`.
- Add a **Resolution:** line citing the kit file(s) changed and/or commit/PR,
  and note any app call sites that were cleaned up.
- Leave the entry in place (don't delete) so the backlog is a durable record.

## Notes

- Keep entries concise but root-caused — this backlog drives real kit edits.
- This skill only logs/updates the backlog. It does **not** modify kit source;
  kit changes happen in a separate, deliberate pass.
