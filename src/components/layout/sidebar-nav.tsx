'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/icons"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Settings } from "lucide-react"

const menuItems = [
  {
    href: "/dashboard",
    label: "Búsqueda",
    icon: Search,
  },
  {
    href: "/dashboard/settings",
    label: "Configuración",
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold">FileParser Pro</span>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter className="mt-auto text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} FileParser Pro
      </SidebarFooter>
    </Sidebar>
  )
}
