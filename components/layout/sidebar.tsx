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
  AlertTriangle,
  AlertCircle,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    status: "active",
  },
  {
    name: "Dokümanlar",
    icon: FileText,
    status: "active",
    children: [
      { name: "Doküman Listesi", href: "/documents", status: "active" },
      { name: "Doküman Şeması", href: "/documents/schema", status: "active" },
      { name: "Yeni Doküman", href: "/documents/create", status: "active" },
    ],
  },
  {
    name: "ISO Yönetim Sistemi",
    icon: Scale,
    status: "active",
    children: [
      { name: "Yönetim ve Organizasyon", href: "/iso/management", status: "active" },
      { name: "Personel ve Eğitim", href: "/iso/personnel", status: "active" },
      { name: "Ekipman ve Kalibrasyon", href: "/iso/equipment", status: "active" },
      { name: "Kalibrasyon Programı", href: "/iso/calibration-program", status: "active" },
      { name: "Kalibrasyon Kayıtları", href: "/iso/calibration-records", status: "active" },
      { name: "Tarafsızlık Yönetimi", href: "/iso/impartiality", status: "active" },
      { name: "Gizlilik Anlaşmaları", href: "/iso/confidentiality", status: "active" },
      { name: "Organizasyon Şeması", href: "/iso/organization", status: "active" },
      { name: "Personel Yetkinlik", href: "/iso/personnel-competency", status: "active" },
      { name: "Eğitim Planları", href: "/iso/training-plans", status: "active" },
      { name: "Numune Yönetimi", href: "/iso/sample-management", status: "active" },
      { name: "Test Metotları", href: "/iso/test-methods", status: "active" },
      { name: "Test İşleri", href: "/iso/test-jobs", status: "active" },
      { name: "Risk Yönetimi", href: "/iso/risk-management", status: "active" },
      { name: "CAPA Sistemi", href: "/iso/capa-system", status: "active" },
      { name: "İç Denetim", href: "/iso/internal-audit", status: "active" },
      { name: "Yeterlilik Testleri", href: "/iso/proficiency-tests", status: "active" },
      { name: "Müşteri Şikayetleri", href: "/iso/customer-complaints", status: "active" },
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      case "pending":
        return "text-blue-600"
      default:
        return "text-gray-400"
    }
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
                            <Link href={child.href} className="flex items-center justify-between w-full">
                              <span>{child.name}</span>
                              {child.status && (
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(child.status)}
                                </div>
                              )}
                            </Link>
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
                  <Link href={item.href} className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status && getStatusIcon(item.status)}
                      {item.badge && (
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
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
