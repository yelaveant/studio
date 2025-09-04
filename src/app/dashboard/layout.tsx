import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
        <SidebarNav />
        <SidebarInset>
            <Header />
            <main className="flex-1">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
