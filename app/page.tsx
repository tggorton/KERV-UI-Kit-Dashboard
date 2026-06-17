"use client"

import { KervProvider } from "@kerv/ui-kit"
import KervDashboard from "@/components/kerv-dashboard"

export default function Home() {
  // KervProvider = ThemeProvider(kervTheme) + CssBaseline + <AppShell/> gradient background.
  return (
    <KervProvider>
      <KervDashboard />
    </KervProvider>
  )
}

