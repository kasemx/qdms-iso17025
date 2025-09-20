"use client"

import { useState, useEffect, useRef } from "react"
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
  BookOpen,
  UserCog,
  Building2,
  Wrench,
  FlaskConical,
  ShieldCheck,
  Workflow,
  BarChart3,
  Database,
  Cog,
  Search,
  X,
  Award,
} from "lucide-react"

const navigation = [
  // 1. Ana Bölüm - Operasyonel
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
  
  // 2. ISO 17025 Kalite Sistemi - A) Organizasyon & İnsan Kaynakları
  {
    name: "Organizasyon Yönetimi",
    icon: Building2,
    status: "active",
    children: [
      { name: "Yönetim ve Organizasyon", href: "/iso/management", status: "active" },
      { name: "Organizasyon Şeması", href: "/iso/organization", status: "active" },
      { name: "Departmanlar", href: "/departments", status: "active" },
      { name: "Kullanıcılar", href: "/users", status: "active" },
    ],
  },
  {
    name: "Uygunluk & Gizlilik",
    icon: ShieldCheck,
    status: "active",
    children: [
      { name: "Tarafsızlık Yönetimi", href: "/iso/impartiality", status: "active" },
      { name: "Gizlilik Anlaşmaları", href: "/iso/confidentiality", status: "active" },
      { name: "Risk Yönetimi", href: "/iso/risk-management", status: "active" },
      { name: "CAPA Sistemi", href: "/iso/capa-system", status: "active" },
    ],
  },
  {
    name: "Personel & Eğitim",
    icon: UserCog,
    status: "active",
    children: [
      { name: "Personel ve Eğitim", href: "/iso/personnel", status: "active" },
      { name: "Personel Yetkinlik", href: "/iso/personnel-competency", status: "active" },
      { name: "Eğitim Planları", href: "/iso/training-plans", status: "active" },
      { name: "Eğitim Takibi", href: "/training", status: "active" },
    ],
  },
  
  // 2. ISO 17025 Kalite Sistemi - B) Laboratuvar Operasyonları
  {
    name: "Ekipman & Kalibrasyon",
    icon: Wrench,
    status: "active",
    children: [
      { name: "Ekipman Yönetimi", href: "/iso/equipment", status: "active" },
      { name: "Kalibrasyon Programı", href: "/iso/calibration-program", status: "active" },
      { name: "Kalibrasyon Kayıtları", href: "/iso/calibration-records", status: "active" },
    ],
  },
  {
    name: "Test & Numune",
    icon: FlaskConical,
    status: "active",
    children: [
      { name: "Numune Yönetimi", href: "/iso/sample-management", status: "active" },
      { name: "Test Metotları", href: "/iso/test-methods", status: "active" },
      { name: "Test İşleri", href: "/iso/test-jobs", status: "active" },
      { name: "Yeterlilik Testleri", href: "/iso/proficiency-tests", status: "active" },
    ],
  },
  
  // 2. ISO 17025 Kalite Sistemi - C) Kalite Güvence & İyileştirme
  {
    name: "Kalite Güvence",
    icon: Award,
    status: "active",
    children: [
      { name: "İç Denetim", href: "/iso/internal-audit", status: "active" },
      { name: "Müşteri Şikayetleri", href: "/iso/customer-complaints", status: "active" },
    ],
  },
  
  // 3. İş Akışları & Operasyonel Takip
  {
    name: "İş Akışları",
    href: "/workflows",
    icon: Workflow,
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
    name: "Audit Trail",
    href: "/audit",
    icon: Shield,
  },
  
  // 4. Sistem Yönetimi
  {
    name: "Raporlar",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Entegrasyonlar",
    href: "/integrations",
    icon: Database,
  },
  {
    name: "Sistem Sağlığı",
    href: "/system-health",
    icon: Activity,
  },
  {
    name: "Ayarlar",
    href: "/settings",
    icon: Cog,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Organizasyon Yönetimi"])
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Klavye kısayolları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K veya Cmd+K ile arama odaklanma
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
        setIsSearchActive(true)
      }
      // Escape ile arama temizleme
      if (e.key === 'Escape' && isSearchActive) {
        clearSearch()
        searchInputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchActive])

  // Arama fonksiyonları
  const searchInNavigation = () => {
    if (!searchTerm) return getNavigationSections()
    
    const filtered = getNavigationSections().map(section => ({
      ...section,
      items: section.items.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const childrenMatch = item.children?.some(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return nameMatch || childrenMatch
      })
    })).filter(section => section.items.length > 0)
    
    return filtered
  }

  const clearSearch = () => {
    setSearchTerm("")
    setIsSearchActive(false)
  }
  const getNavigationSections = () => {
    return [
      {
        title: "Operasyonel",
        items: navigation.slice(0, 2), // Dashboard, Dokümanlar
        icon: "📊"
      },
      {
        title: "ISO 17025 Kalite Sistemi", 
        items: navigation.slice(2, 8), // ISO grupları (6 grup)
        icon: "🏗️"
      },
      {
        title: "İş Akışları & Takip",
        items: navigation.slice(8, 12), // İş akışları, onaylar, hatırlatıcılar, audit
        icon: "⚡"
      },
      {
        title: "Sistem Yönetimi",
        items: navigation.slice(12), // Raporlar, entegrasyonlar, sistem, ayarlar
        icon: "⚙️"
      }
    ]
  }

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

      {/* Search Bar */}
      <div className="px-3 py-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Menü ara... (Ctrl+K)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsSearchActive(e.target.value.length > 0)
            }}
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {isSearchActive && searchTerm && (
          <p className="text-xs text-gray-500 mt-2">
            "{searchTerm}" için {searchInNavigation().reduce((acc, section) => acc + section.items.length, 0)} sonuç bulundu
          </p>
        )}
        {!searchTerm && (
          <p className="text-xs text-gray-400 mt-2">
            <kbd className="px-1 py-0.5 text-xs bg-gray-100 border rounded">Ctrl</kbd> + 
            <kbd className="px-1 py-0.5 text-xs bg-gray-100 border rounded ml-1">K</kbd> ile hızlı arama
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-3 py-4">
          <nav className="space-y-4">
            {searchInNavigation().map((section, sectionIndex) => (
              <div key={section.title} className="space-y-2">
                {/* Section Header */}
                {!isSearchActive && (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <span className="text-lg">{section.icon}</span>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                )}
                
                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const isExpanded = expandedItems.includes(item.name) || isSearchActive

                    if (item.children) {
                      return (
                        <div key={item.name}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-between text-left font-normal rounded-lg",
                              "hover:bg-gray-100 hover:text-gray-900 transition-colors",
                              isActive && "bg-blue-50 text-blue-700 border border-blue-200",
                              isSearchActive && "bg-yellow-50"
                            )}
                            onClick={() => !isSearchActive && toggleExpanded(item.name)}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="h-4 w-4" />
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {!isSearchActive && (
                              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                            )}
                          </Button>
                          {isExpanded && (
                            <div className="ml-6 mt-2 space-y-1">
                              {item.children
                                .filter(child => !searchTerm || child.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((child) => (
                                <Button
                                  key={child.href}
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "w-full justify-start font-normal rounded-md",
                                    "hover:bg-gray-50 hover:text-gray-900 transition-colors",
                                    "text-gray-600 text-sm",
                                    pathname === child.href && "bg-blue-50 text-blue-700 border-l-2 border-blue-500",
                                    isSearchActive && searchTerm && child.name.toLowerCase().includes(searchTerm.toLowerCase()) && "bg-yellow-100"
                                  )}
                                  asChild
                                >
                                  <Link href={child.href} className="flex items-center justify-between w-full pl-4">
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
                          "w-full justify-start font-normal rounded-lg",
                          "hover:bg-gray-100 hover:text-gray-900 transition-colors",
                          isActive && "bg-blue-50 text-blue-700 border border-blue-200",
                          isSearchActive && "bg-yellow-50"
                        )}
                        asChild
                      >
                        <Link href={item.href} className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <item.icon className="mr-3 h-4 w-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.status && getStatusIcon(item.status)}
                            {item.badge && (
                              <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white shadow-sm">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      </Button>
                    )
                  })}
                </div>
                
                {/* Section Divider */}
                {!isSearchActive && sectionIndex < searchInNavigation().length - 1 && (
                  <div className="border-t border-gray-100 my-4"></div>
                )}
              </div>
            ))}
            
            {/* No Results Message */}
            {isSearchActive && searchInNavigation().length === 0 && (
              <div className="text-center py-8">
                <Search className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">"<span className="font-medium">{searchTerm}</span>" için sonuç bulunamadı</p>
                <p className="text-xs text-gray-400 mt-1">Farklı anahtar kelimeler deneyin</p>
              </div>
            )}
          </nav>
        </ScrollArea>
      </div>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-gray-50">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg shadow-sm border">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-white">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Sistem Yöneticisi</p>
            <p className="text-xs text-gray-500 truncate">admin@company.com</p>
            <div className="flex items-center mt-1">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-600 font-medium">Aktif</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
            onClick={() => {
              // Reset onboarding to show wizard again
              localStorage.removeItem("qdms-onboarding-completed")
              localStorage.setItem("qdms-onboarding-show-again", "true")
              window.location.reload()
            }}
          >
            <BookOpen className="mr-3 h-4 w-4" />
            <span className="text-sm">Sistem Rehberi</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="text-sm">Çıkış Yap</span>
          </Button>
        </div>
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
