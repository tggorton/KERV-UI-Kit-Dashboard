"use client"

import { useState, type ReactNode } from "react"
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  Slider,
  LinearProgress,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import {
  tokens,
  GlassCard,
  PageHeader,
  StatusChip,
  KpiStat,
  SegmentedToggle,
  DetailList,
  componentRegistry,
  type StatusKind,
} from "@kerv/ui-kit"

const { color, taxonomy, statusPalette, typography, spacing, radius, shadow } = tokens

// ── Small layout helpers ─────────────────────────────────────────────────────

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <GlassCard variant="card" sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: description ? 0.5 : 2.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          {description}
        </Typography>
      )}
      {children}
    </GlassCard>
  )
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{ ...typography.overline, color: "text.secondary", display: "block", mt: 3, mb: 1.5 }}
    >
      {children}
    </Typography>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Box sx={{ width: 104 }}>
      <Box
        sx={{
          height: 56,
          borderRadius: "8px",
          bgcolor: value,
          border: "1px solid",
          borderColor: "divider",
        }}
      />
      <Typography sx={{ fontSize: 11, mt: 0.5, fontWeight: 600 }}>{name}</Typography>
      <Typography sx={{ fontSize: 10, color: "text.secondary" }}>{value}</Typography>
    </Box>
  )
}

// ── Token data ───────────────────────────────────────────────────────────────

const brandSwatches: [string, string][] = [
  ["primary.light", color.primary.light],
  ["primary.main", color.primary.main],
  ["primary.dark", color.primary.dark],
  ["primary.darkest", color.primary.darkest],
]
const semanticSwatches: [string, string][] = [
  ["success", color.success.main],
  ["warning", color.warning.main],
  ["error", color.error.main],
  ["info", color.info.main],
]
const extendedSwatches: [string, string][] = [
  ["indigo", color.indigo.main],
  ["amber", color.amber.main],
]
const greySwatches: [string, string][] = Object.entries(color.grey).map(([k, v]) => [
  `grey.${k}`,
  v as string,
])
const neutralSwatches: [string, string][] = [
  ["surface", color.surface],
  ["bg", color.bg],
  ["text.primary", color.text.primary],
  ["border.control", color.border.control],
  ["actionSelected", color.actionSelected],
]

const typeVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
] as const

const spacingTokens: [string, number][] = [
  ["base", spacing.base],
  ["contentGutterY", spacing.contentGutterY],
  ["twoBoxGap", spacing.twoBoxGap],
  ["headerPad", spacing.headerPad],
  ["cardPad", spacing.cardPad],
  ["contentGutterX", spacing.contentGutterX],
]
const radiusTokens: [string, number][] = Object.entries(radius).map(([k, v]) => [k, v as number])
const shadowTokens: [string, string][] = Object.entries(shadow).map(([k, v]) => [k, v as string])
const glassVariants = ["card", "dialog", "drawer", "subtle", "rail"] as const
const statusKinds: StatusKind[] = ["vod", "live", "organic", "high", "standard", "refined"]

// ── Gallery ──────────────────────────────────────────────────────────────────

export default function KitGallery() {
  const [segment, setSegment] = useState("video")
  const [tab, setTab] = useState(0)
  const [slider, setSlider] = useState(40)
  const [range, setRange] = useState<number[]>([20, 70])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [select, setSelect] = useState("ctv")

  return (
    <Box sx={{ p: 4, pr: 6, maxWidth: 1200, mx: "auto" }}>
      <PageHeader
        title="KERV UI Kit"
        subtitle="Live gallery of every token, primitive, and themed-MUI surface in @kerv/ui-kit."
      />

      {/* ── FOUNDATIONS ─────────────────────────────────────────────── */}
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Foundations
      </Typography>

      <Section title="Color" description="Brand, semantic, extended, grey, and neutral tokens.">
        <SubLabel>Brand</SubLabel>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {brandSwatches.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </Stack>
        <SubLabel>Semantic</SubLabel>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {semanticSwatches.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </Stack>
        <SubLabel>Extended &amp; grey</SubLabel>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {[...extendedSwatches, ...greySwatches].map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </Stack>
        <SubLabel>Neutral</SubLabel>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {neutralSwatches.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </Stack>
      </Section>

      <Section title="Taxonomy & status palette" description="Category chip backgrounds and status pills.">
        <SubLabel>Taxonomy</SubLabel>
        <Stack direction="row" gap={1.5} flexWrap="wrap">
          {Object.entries(taxonomy).map(([name, t]) => (
            <Chip key={name} label={name} sx={{ bgcolor: (t as { bg: string }).bg, color: "text.primary" }} />
          ))}
        </Stack>
        <SubLabel>Status palette (raw tokens)</SubLabel>
        <Stack direction="row" gap={1.5} flexWrap="wrap">
          {Object.entries(statusPalette).map(([name, p]) => {
            const pal = p as { text: string; bg: string; border: string }
            return (
              <Chip
                key={name}
                label={name}
                sx={{ bgcolor: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}
              />
            )
          })}
        </Stack>
      </Section>

      <Section title="Typography" description="The full type scale from the theme.">
        <Stack divider={<Divider flexItem />} gap={1.5}>
          {typeVariants.map((v) => (
            <Box key={v} sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              <Typography sx={{ ...typography.overline, color: "text.secondary", width: 88, flexShrink: 0 }}>
                {v}
              </Typography>
              <Typography variant={v} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                The quick brown fox
              </Typography>
            </Box>
          ))}
        </Stack>
      </Section>

      <Section title="Spacing, radius & shadow">
        <SubLabel>Spacing (px)</SubLabel>
        <Stack gap={1}>
          {spacingTokens.map(([n, v]) => (
            <Box key={n} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ fontSize: 11, width: 120, color: "text.secondary" }}>{`${n} · ${v}`}</Typography>
              <Box sx={{ height: 12, width: v, bgcolor: "primary.main", borderRadius: "2px" }} />
            </Box>
          ))}
        </Stack>
        <SubLabel>Radius</SubLabel>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {radiusTokens.map(([n, v]) => (
            <Box key={n} sx={{ textAlign: "center" }}>
              <Box
                sx={{ width: 64, height: 48, bgcolor: "primary.main", borderRadius: `${v}px`, mb: 0.5 }}
              />
              <Typography sx={{ fontSize: 10, color: "text.secondary" }}>{`${n} (${v})`}</Typography>
            </Box>
          ))}
        </Stack>
        <SubLabel>Shadow</SubLabel>
        <Stack direction="row" gap={3} flexWrap="wrap">
          {shadowTokens.map(([n, v]) => (
            <Box key={n} sx={{ textAlign: "center" }}>
              <Box sx={{ width: 96, height: 56, bgcolor: "#fff", borderRadius: "8px", boxShadow: v, mb: 1 }} />
              <Typography sx={{ fontSize: 10, color: "text.secondary" }}>{n}</Typography>
            </Box>
          ))}
        </Stack>
      </Section>

      <Section title="Glass surfaces" description="The five glass treatments (rendered over the app gradient).">
        <Stack direction="row" gap={3} flexWrap="wrap">
          {glassVariants.map((v) => (
            <GlassCard
              key={v}
              variant={v}
              sx={{ width: 180, height: 110, p: 2, display: "flex", alignItems: "flex-end", borderRadius: "12px" }}
            >
              <Typography sx={{ ...typography.overline }}>{v}</Typography>
            </GlassCard>
          ))}
        </Stack>
      </Section>

      {/* ── PRIMITIVES ──────────────────────────────────────────────── */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Primitives
      </Typography>

      <Section title="StatusChip" description="Palette-driven status pills (live has a glowing dot).">
        <Stack direction="row" gap={1.5} flexWrap="wrap">
          {statusKinds.map((k) => (
            <StatusChip key={k} kind={k} />
          ))}
        </Stack>
      </Section>

      <Section title="KpiStat, SegmentedToggle & DetailList">
        <SubLabel>KpiStat</SubLabel>
        <Stack direction="row" gap={5}>
          <KpiStat label="Moments" value="128" />
          <KpiStat label="Est. Impressions" value="2.4M" />
          <KpiStat label="Avg CPM" value="$25" accent />
        </Stack>
        <SubLabel>SegmentedToggle</SubLabel>
        <Box sx={{ maxWidth: 320 }}>
          <SegmentedToggle
            value={segment}
            onChange={setSegment}
            options={[
              { value: "video", label: "Video" },
              { value: "brief", label: "Brief" },
              { value: "vast", label: "VAST Tag" },
            ]}
          />
        </Box>
        <SubLabel>DetailList</SubLabel>
        <Box sx={{ maxWidth: 320 }}>
          <DetailList
            rows={[
              { label: "Advertiser", value: "Kroger" },
              { label: "Domain", value: "kroger.com" },
              { label: "Duration", value: "30s" },
              { label: "Lookback", value: "30 days" },
            ]}
          />
        </Box>
      </Section>

      {/* ── THEMED MUI ──────────────────────────────────────────────── */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Themed MUI
      </Typography>

      <Section title="Buttons & icon buttons">
        <Stack direction="row" gap={2} flexWrap="wrap" alignItems="center">
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Section>

      <Section title="Chips" description="Pill shape, status classes, and a deletable chip with the bare-X delete icon.">
        <Stack direction="row" gap={1.5} flexWrap="wrap" alignItems="center">
          <Chip label="Default" />
          <Chip label="Active" className="status-active" size="small" />
          <Chip label="Inactive" className="status-inactive" size="small" />
          <Chip label="Unverified" className="status-unverified" size="small" />
          <Chip
            label="Removable"
            onDelete={() => {}}
            deleteIcon={<CloseIcon />}
            sx={{ bgcolor: "action.selected", color: "text.primary" }}
          />
        </Stack>
      </Section>

      <Section title="Inputs">
        <Stack direction="row" gap={2} flexWrap="wrap">
          <TextField label="Text field" placeholder="Type here" sx={{ minWidth: 220 }} />
          <TextField label="With helper" helperText="Helper text" sx={{ minWidth: 220 }} />
          <TextField
            select
            label="Playback mode"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="ctv">CTV</MenuItem>
            <MenuItem value="web">Web</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
          </TextField>
        </Stack>
      </Section>

      <Section title="Tabs">
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Creatives" />
          <Tab label="Distributions" />
          <Tab label="Pixels" />
        </Tabs>
      </Section>

      <Section title="Sliders & progress">
        <SubLabel>Slider</SubLabel>
        <Box sx={{ maxWidth: 360 }}>
          <Slider value={slider} onChange={(_, v) => setSlider(v as number)} valueLabelDisplay="auto" />
          <Slider value={range} onChange={(_, v) => setRange(v as number[])} valueLabelDisplay="auto" />
        </Box>
        <SubLabel>Progress</SubLabel>
        <Stack direction="row" gap={4} alignItems="center" sx={{ maxWidth: 360 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress variant="determinate" value={slider} />
          </Box>
          <CircularProgress size={28} />
        </Stack>
      </Section>

      <Section title="Feedback" description="Alerts, dialog (glass), and snackbar.">
        <Stack gap={1.5} sx={{ mb: 3 }}>
          <Alert severity="success">Saved successfully.</Alert>
          <Alert severity="warning">Heads up — check your weights.</Alert>
          <Alert severity="error">Something went wrong.</Alert>
          <Alert severity="info">Informational message.</Alert>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Button variant="outlined" onClick={() => setSnackOpen(true)}>
            Open snackbar
          </Button>
        </Stack>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: { width: 420 } }}>
          <DialogTitle>Glass dialog</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "text.secondary" }}>
              Dialogs pick up the kit&apos;s glass treatment and a transparent backdrop automatically.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setDialogOpen(false)}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="This is a themed snackbar"
        />
      </Section>

      <Section title="Table" description="Transparent bg, 52px rows, hairline dividers, styled head.">
        <TableContainer component={Paper} sx={{ boxShadow: "none", background: "transparent" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Creative ID</TableCell>
                <TableCell>Playback Mode</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["Stratos Q1", 10290, "CTV", "Active"],
                ["Stratos Q2", 10291, "Web", "Active"],
                ["Awareness", 10292, "Mobile", "Inactive"],
              ].map((r) => (
                <TableRow key={r[1] as number}>
                  <TableCell>{r[0]}</TableCell>
                  <TableCell sx={{ color: "primary.main" }}>{r[1]}</TableCell>
                  <TableCell>{r[2]}</TableCell>
                  <TableCell>
                    <Chip
                      label={r[3]}
                      className={r[3] === "Active" ? "status-active" : "status-inactive"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      {/* ── REGISTRY ────────────────────────────────────────────────── */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Component registry
      </Typography>
      <Section
        title="What's in the kit"
        description={`${componentRegistry.length} entries, read live from componentRegistry.`}
      >
        <TableContainer component={Paper} sx={{ boxShadow: "none", background: "transparent" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Kind</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {componentRegistry.map((e) => (
                <TableRow key={e.name}>
                  <TableCell sx={{ fontWeight: 600 }}>{e.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={e.kind}
                      size="small"
                      className={e.kind === "primitive" ? "status-active" : "status-unverified"}
                    />
                  </TableCell>
                  <TableCell sx={{ color: e.status === "kit-ready" ? "text.primary" : "text.secondary" }}>
                    {e.status}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontSize: 12 }}>{e.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>
    </Box>
  )
}
