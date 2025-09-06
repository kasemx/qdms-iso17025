"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  LogOut,
  ChevronDown,
  FolderOpen,
  CheckCircle,
  Clock,
  Bell,
  GraduationCap,
  Shield,
  Building,
  Scale,
  Zap,
  Activity,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Dokümanlar",
    icon: FileText,
    children: [
      { name: "Doküman Listesi", href: "/documents" },
      { name: "Doküman Şeması", href: "/documents/schema" },
      { name: "Yeni Doküman", href: "/documents/create" },
    ],
  },
  {
    name: "ISO Yönetim Sistemi",
    icon: Scale,
    children: [
      { name: "Yönetim ve Organizasyon", href: "/iso/management" },
      { name: "Personel ve Eğitim", href: "/iso/personnel" },
      { name: "Ekipman ve Kalibrasyon", href: "/iso/equipment" },
    ],
  },
  {
    name: "İş Akışları",
    href: "/workflows",
    icon: CheckCircle,
  },
  {
    name: "Onay Bekleyenler",
    href: "/approvals",
    icon: Clock,
    badge: "5",
  },
  {
    name: "Hatırlatıcılar",
    href: "/reminders",
    icon: Bell,
    badge: "3",
  },
  {
    name: "Eğitim Takibi",
    href: "/training",
    icon: GraduationCap,
  },
  {
    name: "Audit Trail",
    href: "/audit",
    icon: Shield,
  },
  {
    name: "Raporlar",
    href: "/reports",
    icon: FolderOpen,
  },
  {
    name: "Entegrasyonlar",
    href: "/integrations",
    icon: Zap,
  },
  {
    name: "Sistem Sağlığı",
    href: "/system-health",
    icon: Activity,
  },
  {
    name: "Departmanlar",
    href: "/departments",
    icon: Building,
  },
  {
    name: "Kullanıcılar",
    href: "/users",
    icon: Users,
  },
  {
    name: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["ISO Yönetim Sistemi"])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">QDMS</h1>
            <p className="text-xs text-gray-500">Kalite Doküman Sistemi</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              const isExpanded = expandedItems.includes(item.name)

              if (item.children) {
                return (
                  <div key={item.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        "hover:bg-gray-100 hover:text-gray-900",
                        isActive && "bg-blue-50 text-blue-700",
                      )}
                      onClick={() => toggleExpanded(item.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Button
                            key={child.href}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start font-normal",
                              "hover:bg-gray-100 hover:text-gray-900",
                              pathname === child.href && "bg-blue-50 text-blue-700",
                            )}
                            asChild
                          >
                            <Link href={child.href}>{child.name}</Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal",
                    "hover:bg-gray-100 hover:text-gray-900",
                    isActive && "bg-blue-50 text-blue-700",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </Button>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Sistem Yöneticisi</p>
            <p className="text-xs text-gray-500 truncate">admin@company.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0", className)}>
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white h-full">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
