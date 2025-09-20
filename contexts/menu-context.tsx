"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Menu Context - Modern menu state management
 * @description Advanced menu system with search, favorites, and modern UI
 */

// Types
interface MenuItem {
  id: string
  name: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
  badge?: string
  status?: 'active' | 'warning' | 'error' | 'pending'
  isFavorite?: boolean
}

interface MenuSection {
  title: string;
  icon: string; // Emojis or other string icons
  items: MenuItem[];
}

interface MenuState {
  isCollapsed: boolean
  isSearchActive: boolean
  searchTerm: string
  expandedItems: string[]
  favoriteItems: string[]
  activeItem: string | null
  menuSections: MenuSection[]
}

// Initial menu data - ISO 17025:2017 compliant structure
const initialMenuSections: MenuSection[] = [
  // 1. Dashboard
  {
    title: "Ana Sayfa",
    icon: "📊",
    items: [
      {
        id: "dashboard",
        name: "Dashboard",
        href: "/dashboard",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
        )
      }
    ]
  },
  
  // 2. ISO 17025:2017 Structure - Clause 4: General Requirements
  {
    title: "Genel Gereksinimler",
    icon: "🏛️",
    items: [
      {
        id: "organization",
        name: "Kuruluş ve Yönetim",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        children: [
          { id: "org-chart", name: "Organizasyon Şeması", href: "/iso/organization" },
          { id: "management", name: "Yönetim ve Yönetim Gözden Geçirmeleri", href: "/iso/management" },
          { id: "impartiality", name: "Tarafsızlık Yönetimi", href: "/iso/impartiality" },
          { id: "confidentiality", name: "Gizlilik Yönetimi", href: "/iso/confidentiality" }
        ]
      },
      {
        id: "personnel",
        name: "Personel",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
        children: [
          { id: "personnel-main", name: "Personel ve Eğitim", href: "/iso/personnel" },
          { id: "personnel-competency", name: "Personel Yetkinlik", href: "/iso/personnel-competency" },
          { id: "training-plans", name: "Eğitim Planları", href: "/iso/training-plans" },
          { id: "training", name: "Eğitim Takibi", href: "/training", status: "active" }
        ]
      }
    ]
  },
  
  // 3. ISO 17025:2017 Structure - Clause 5: Structural Requirements
  {
    title: "Yapısal Gereksinimler",
    icon: "🏗️",
    items: [
      {
        id: "risk",
        name: "Risk ve Fırsat Yönetimi",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        ),
        children: [
          { id: "risk-management", name: "Risk Yönetimi", href: "/iso/risk-management" },
          { id: "opportunity", name: "Fırsat Yönetimi", href: "/iso/opportunity-management" }
        ]
      },
      {
        id: "improvement",
        name: "İyileştirme",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        ),
        children: [
          { id: "capa-system", name: "CAPA Sistemi", href: "/iso/capa-system" },
          { id: "customer-complaints", name: "Müşteri Şikayetleri", href: "/iso/customer-complaints" },
          { id: "non-conformities", name: "Uygunsuzluklar", href: "/iso/non-conformities" }
        ]
      }
    ]
  },
  
  // 4. ISO 17025:2017 Structure - Clause 6: Resource Requirements
  {
    title: "Kaynak Gereksinimleri",
    icon: "🔧",
    items: [
      {
        id: "equipment",
        name: "Ekipman",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h18v18H3zM12 3v18"/>
            <path d="M3 12h18"/>
          </svg>
        ),
        children: [
          { id: "equipment-main", name: "Ekipman Yönetimi", href: "/iso/equipment", status: "active" },
          { id: "equipment-inventory", name: "Ekipman Envanteri", href: "/iso/equipment-inventory" },
          { id: "calibration-program", name: "Kalibrasyon Programı", href: "/iso/calibration-program", status: "active" },
          { id: "calibration-records", name: "Kalibrasyon Kayıtları", href: "/iso/calibration-records", status: "active" }
        ]
      },
      {
        id: "facilities",
        name: "Tesisler ve Çevre Koşulları",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
            <path d="M10 6h4"/>
            <path d="M10 10h4"/>
            <path d="M10 14h4"/>
            <path d="M10 18h4"/>
          </svg>
        ),
        children: [
          { id: "environmental-conditions", name: "Çevre Koşulları", href: "/iso/environmental-conditions" },
          { id: "facility-monitoring", name: "Tesis İzleme", href: "/iso/facility-monitoring" }
        ]
      }
    ]
  },
  
  // 5. ISO 17025:2017 Structure - Clause 7: Process Requirements
  {
    title: "Süreç Gereksinimleri",
    icon: "⚙️",
    items: [
      {
        id: "methods",
        name: "Test ve Kalibrasyon Metotları",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        children: [
          { id: "test-methods", name: "Test Metotları", href: "/iso/test-methods", status: "active" },
          { id: "method-validation", name: "Metot Validasyonu", href: "/iso/method-validation" },
          { id: "method-verification", name: "Metot Doğrulama", href: "/iso/method-verification" },
          { id: "proficiency-tests", name: "Yeterlilik Testleri", href: "/iso/proficiency-tests", status: "active" }
        ]
      },
      {
        id: "sampling",
        name: "Numune Alma",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        children: [
          { id: "sample-management", name: "Numune Yönetimi", href: "/iso/sample-management", status: "active" },
          { id: "sampling-procedures", name: "Numune Alma Prosedürleri", href: "/iso/sampling-procedures" }
        ]
      },
      {
        id: "test-jobs",
        name: "Test İşleri",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        ),
        children: [
          { id: "test-job-management", name: "Test İşleri Yönetimi", href: "/iso/test-jobs", status: "active" },
          { id: "test-reports", name: "Test Raporları", href: "/iso/test-reports" },
          { id: "uncertainty", name: "Belirsizlik Analizi", href: "/iso/uncertainty-analysis" }
        ]
      }
    ]
  },
  
  // 6. ISO 17025:2017 Structure - Clause 8: Management System Requirements
  {
    title: "Yönetim Sistemi",
    icon: "📋",
    items: [
      {
        id: "documents",
        name: "Dokümantasyon",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        ),
        children: [
          { id: "doc-list", name: "Doküman Listesi", href: "/documents" },
          { id: "doc-schema", name: "Doküman Şeması", href: "/documents/schema" },
          { id: "new-doc", name: "Yeni Doküman", href: "/documents/create" }
        ]
      },
      {
        id: "quality",
        name: "Kalite Güvence",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        ),
        children: [
          { id: "internal-audit", name: "İç Denetim", href: "/iso/internal-audit", status: "active" },
          { id: "management-review", name: "Yönetim Gözden Geçirmeleri", href: "/iso/management-review" },
          { id: "control-documents", name: "Kontrol Belgeleri", href: "/iso/control-documents" }
        ]
      },
      {
        id: "evaluation",
        name: "Performans Değerlendirme",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        ),
        children: [
          { id: "monitoring", name: "Performans İzleme", href: "/iso/performance-monitoring" },
          { id: "customer-satisfaction", name: "Müşteri Memnuniyeti", href: "/iso/customer-satisfaction" },
          { id: "complaints", name: "Şikayet Yönetimi", href: "/iso/complaints" }
        ]
      }
    ]
  },
  
  // 7. Workflows & Tracking
  {
    title: "İş Akışları & Takip",
    icon: "⚡",
    items: [
      {
        id: "workflows",
        name: "İş Akışları",
        href: "/workflows",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20"/>
            <path d="M2 12h20"/>
            <path d="M8 8l8 8"/>
            <path d="M16 8l-8 8"/>
          </svg>
        )
      },
      {
        id: "approvals",
        name: "Onay Bekleyenler",
        href: "/approvals",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        badge: "5"
      },
      {
        id: "reminders",
        name: "Hatırlatıcılar",
        href: "/reminders",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        ),
        badge: "3"
      },
      {
        id: "audit",
        name: "Audit Trail",
        href: "/audit",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h20"/>
            <path d="M6 7v14"/>
            <path d="M18 7v14"/>
            <path d="M2 7h20"/>
            <path d="M2 15h20"/>
          </svg>
        )
      }
    ]
  },
  
  // 8. System Management
  {
    title: "Sistem Yönetimi",
    icon: "⚙️",
    items: [
      {
        id: "reports",
        name: "Raporlar",
        href: "/reports",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20"/>
            <path d="M2 12h20"/>
            <path d="M8 8l8 8"/>
            <path d="M16 8l-8 8"/>
          </svg>
        )
      },
      {
        id: "integrations",
        name: "Entegrasyonlar",
        href: "/integrations",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20"/>
            <path d="M2 12h20"/>
            <path d="M8 8l8 8"/>
            <path d="M16 8l-8 8"/>
          </svg>
        )
      },
      {
        id: "system-health",
        name: "Sistem Sağlığı",
        href: "/system-health",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        )
      },
      {
        id: "settings",
        name: "Ayarlar",
        href: "/settings",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6"/>
            <path d="M12 17v6"/>
            <path d="M5 5l4 4"/>
            <path d="M15 15l4 4"/>
            <path d="M19 5l-4 4"/>
            <path d="M5 19l4-4"/>
          </svg>
        )
      }
    ]
  }
]

// Initial State
const initialState: MenuState = {
  isCollapsed: false,
  isSearchActive: false,
  searchTerm: "",
  expandedItems: ["documents", "organization"],
  favoriteItems: [],
  activeItem: null,
  menuSections: initialMenuSections
}

// Context
interface MenuContextType {
  state: MenuState
  actions: {
    toggleCollapse: () => void
    toggleSearch: () => void
    setSearchTerm: (term: string) => void
    toggleExpand: (itemId: string) => void
    toggleFavorite: (itemId: string) => void
    setActiveItem: (itemId: string | null) => void
    clearSearch: () => void
  }
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

/**
 * Menu Provider Component
 * @description Modern menu context provider with advanced features
 */
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MenuState>(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('menu-state')
      return savedState ? JSON.parse(savedState) : initialState
    }
    return initialState
  })
  
  const pathname = usePathname()

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menu-state', JSON.stringify(state))
  }, [state])

  // Set active item based on current path
  useEffect(() => {
    if (pathname) {
      // Find the item that matches the current path
      let activeId: string | null = null
      
      for (const section of state.menuSections) {
        for (const item of section.items) {
          if (item.href === pathname) {
            activeId = item.id
            break
          }
          if (item.children) {
            for (const child of item.children) {
              if (child.href === pathname) {
                activeId = child.id
                break
              }
            }
          }
          if (activeId) break
        }
        if (activeId) break
      }
      
      if (activeId && activeId !== state.activeItem) {
        setState(prev => ({
          ...prev,
          activeItem: activeId
        }))
      }
    }
  }, [pathname, state.activeItem, state.menuSections])

  // Actions
  const toggleCollapse = useCallback(() => {
    setState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }))
  }, [])

  const toggleSearch = useCallback(() => {
    setState(prev => ({ ...prev, isSearchActive: !prev.isSearchActive }))
  }, [])

  const setSearchTerm = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }))
  }, [])

  const toggleExpand = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      expandedItems: prev.expandedItems.includes(itemId)
        ? prev.expandedItems.filter(id => id !== itemId)
        : [...prev.expandedItems, itemId]
    }))
  }, [])

  const toggleFavorite = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      favoriteItems: prev.favoriteItems.includes(itemId)
        ? prev.favoriteItems.filter(id => id !== itemId)
        : [...prev.favoriteItems, itemId]
    }))
  }, [])

  const setActiveItem = useCallback((itemId: string | null) => {
    setState(prev => ({ ...prev, activeItem: itemId }))
  }, [])

  const clearSearch = useCallback(() => {
    setState(prev => ({ ...prev, searchTerm: "", isSearchActive: false }))
  }, [])

  const actions = {
    toggleCollapse,
    toggleSearch,
    setSearchTerm,
    toggleExpand,
    toggleFavorite,
    setActiveItem,
    clearSearch
  }

  return (
    <MenuContext.Provider value={{ state, actions }}>
      {children}
    </MenuContext.Provider>
  )
}

/**
 * Menu Context Hook
 * @description Hook to use menu context in components
 */
export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}