import type React from "react"
import { ModernSidebar } from "@/components/layout/modern-sidebar"
import { ModernHeader } from "@/components/layout/modern-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <ModernSidebar />
      <div className="lg:pl-64">
        <ModernHeader />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}