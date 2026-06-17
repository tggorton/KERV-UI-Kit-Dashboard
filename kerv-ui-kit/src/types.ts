/**
 * KERV UI Kit — MUI module augmentation.
 *
 * Unions the palette/theme augmentations from the original `kerv-one-theme`
 * (indigo, amber, glass, glassSection, taxonomy, palette-color extras) and
 * `handoff/ui-kit` (glass variants, customBackground). Import once anywhere
 * that consumes the theme to teach TS about the kit's extras.
 */
import type {} from '@mui/material/styles';

declare module '@mui/material/styles' {
  // ── Custom palette additions ────────────────────────────────────────────────
  interface Palette {
    indigo: { lightest: string; light: string; main: string; dark: string; darkest: string };
    amber:  { lightest: string; light: string; main: string; dark: string; darkest: string };
    /** Subtle overlay glass (kept for back-compat with kerv-one-theme). */
    glass: { background: string; backdropFilter: string; border: string };
    /** Content/header glass card (kept for back-compat with kerv-one-theme). */
    glassSection: {
      background: string;
      backdropFilter: string;
      borderRadius: string;
      border: string;
      boxShadow: string;
    };
    taxonomy: {
      object:      { bg: string };
      location:    { bg: string };
      sentiment:   { bg: string };
      brandSafety: { bg: string };
      celebrity:   { bg: string };
      logo:        { bg: string };
      iab:         { bg: string };
      emotion:     { bg: string };
      semanticTag: { bg: string };
    };
  }
  interface PaletteOptions {
    indigo?: Partial<Palette['indigo']>;
    amber?:  Partial<Palette['amber']>;
    glass?:  Partial<Palette['glass']>;
    glassSection?: Partial<Palette['glassSection']>;
    taxonomy?: {
      object?:      { bg?: string };
      location?:    { bg?: string };
      sentiment?:   { bg?: string };
      brandSafety?: { bg?: string };
      celebrity?:   { bg?: string };
      logo?:        { bg?: string };
      iab?:         { bg?: string };
      emotion?:     { bg?: string };
      semanticTag?: { bg?: string };
    };
  }

  // ── Palette-color extras (used on primary/error) ────────────────────────────
  interface PaletteColor {
    lightest?: string;
    darkest?: string;
    hover?: string;
  }
  interface SimplePaletteColorOptions {
    lightest?: string;
    darkest?: string;
    hover?: string;
  }

  // ── Theme additions ─────────────────────────────────────────────────────────
  interface Theme {
    customBackground: { gradient: string };
    glass: {
      card: Record<string, unknown>;
      rail: Record<string, unknown>;
      dialog: Record<string, unknown>;
      drawer: Record<string, unknown>;
      subtle: Record<string, unknown>;
    };
  }
  interface ThemeOptions {
    customBackground?: { gradient?: string };
    glass?: {
      card?: Record<string, unknown>;
      rail?: Record<string, unknown>;
      dialog?: Record<string, unknown>;
      drawer?: Record<string, unknown>;
      subtle?: Record<string, unknown>;
    };
  }
}
