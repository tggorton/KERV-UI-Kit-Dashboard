"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { useGlass } from "@kerv/ui-kit"

// MUI icons mapped to each nav destination
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined"
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined"
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined"
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import type { SvgIconComponent } from "@mui/icons-material"

interface NavItem {
  id: string
  tooltip: string
  Icon: SvgIconComponent
  /** If set, clicking the icon navigates here. Otherwise it just toggles active state. */
  route?: string
}

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeIcon, setActiveIcon] = useState<string | null>("creatives")
  const rail = useGlass("rail")

  // Navigation items with MUI icons and tooltips
  const navItems: NavItem[] = [
    { id: "advertisers", tooltip: "Advertisers", Icon: BusinessOutlinedIcon },
    { id: "creatives", tooltip: "Creatives", Icon: MovieOutlinedIcon },
    { id: "io-tool", tooltip: "IO Tool", Icon: ReceiptLongOutlinedIcon },
    { id: "pixels", tooltip: "Pixels", Icon: TrackChangesOutlinedIcon },
    // Repurposed: this icon now opens the live UI-kit gallery.
    { id: "ui-kit", tooltip: "UI Kit", Icon: DonutLargeOutlinedIcon, route: "/ui-kit" },
    { id: "products", tooltip: "Products", Icon: CategoryOutlinedIcon },
    { id: "reporting", tooltip: "Reporting", Icon: AssessmentOutlinedIcon },
    { id: "admin", tooltip: "Admin", Icon: AdminPanelSettingsOutlinedIcon },
    { id: "support", tooltip: "Support", Icon: SupportAgentOutlinedIcon },
    { id: "logout", tooltip: "Logout", Icon: LogoutOutlinedIcon },
  ]

  return (
    <Box
      sx={{
        ...rail,
        width: 80,
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden", // Prevent content from overflowing
        minWidth: 60, // Set minimum width
        flexShrink: 0, // Prevent sidebar from shrinking too much
      }}
    >
      {/* KERV Logo — click to return to the dashboard */}
      <Tooltip title="Dashboard" placement="right" arrow>
      <Box
        role="button"
        aria-label="Go to dashboard"
        onClick={() => router.push("/")}
        sx={{
          position: "absolute",
          top: 42,
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center horizontally
          width: 44,
          height: 44,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <svg
          viewBox="0 0 664.11 662.9"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio
          aria-label="KERV Logo"
          style={{
            maxWidth: "44px", // Maximum width
            maxHeight: "44px", // Maximum height
          }}
        >
          <polygon fill="#e64d9b" points="331.42 0 0 331.46 0 0 331.42 0" />
          <polyline fill="#d82388" points="331.42 331.46 0 331.46 331.42 0" />
          <polygon fill="#b91d7e" points="1.19 331.48 332.65 662.9 1.19 662.9 1.19 331.48" />
          <polyline fill="#e03694" points="332.65 331.48 332.65 662.9 1.19 331.48" />
          <polygon fill="#e44c9b" points="332.65 331.48 664.11 662.9 332.65 662.9 332.65 331.48" />
          <polygon fill="#e64d9b" points="662.87 0 331.45 331.46 331.45 0 662.87 0" />
        </svg>
      </Box>
      </Tooltip>

      {/* Navigation Icons Container */}
      <Box
        sx={{
          position: "absolute",
          top: 120, // Fixed position below the logo
          bottom: 20, // Fixed margin from bottom
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto", // Enable vertical scrolling
          // Add custom scrollbar styling (kit-style hairline thumb)
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 0, 0, 0.18)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(0, 0, 0, 0.28)",
          },
          // Add padding to ensure icons aren't clipped
          padding: "10px 10px 20px 10px",
        }}
      >
        {/* Navigation Icons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
            width: "100%",
          }}
        >
          {navItems.map(({ id, tooltip, Icon, route }) => {
            const isActive = route ? pathname === route : pathname === "/" && activeIcon === id
            return (
              <Tooltip key={id} title={tooltip} placement="right" arrow>
                <IconButton
                  aria-label={tooltip}
                  onClick={() => (route ? router.push(route) : setActiveIcon(id))}
                  sx={{
                    width: 44,
                    height: 44,
                    color: isActive ? "primary.main" : "text.secondary",
                    backgroundColor: isActive ? "primary.hover" : "transparent",
                    transition: "color 0.2s ease, background-color 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "primary.hover",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
