"use client"

import { KervProvider } from "@kerv/ui-kit"
import Box from "@mui/material/Box"
import Sidebar from "@/components/sidebar"
import KitGallery from "@/components/kit-gallery"

export default function UiKitPage() {
  return (
    <KervProvider>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, height: "100vh", overflowY: "auto", minWidth: 0 }}>
          <KitGallery />
        </Box>
      </Box>
    </KervProvider>
  )
}
