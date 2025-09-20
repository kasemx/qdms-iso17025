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
  title: string
  icon: string
  items: MenuItem[]
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

// Initial menu data
const initialMenuSections: MenuSection[] = [
  // 1. Ana Bölüm - Operasyonel
  {
    title: "Operasyonel",
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
      },
      {
        id: "documents",
        name: "Dokümanlar",
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
      }
    ]
  },
  
  // 2. ISO 17025 Kalite Sistemi - A) Organizasyon & İnsan Kaynakları
  {
    title: "ISO 17025 Kalite Sistemi",
    icon: "🏗️",
    items: [
      {
        id: "organization",
        name: "Organizasyon Yönetimi",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 22v-5l5-5 5 5v5"/>
            <path d="M9 15l1-1"/>
            <path d="M12 12l2-2"/>
            <path d="M15 9l3-3"/>
            <path d="M9 9l-3-3"/>
            <path d="M12 6l-2-2"/>
            <path d="M15 15l1-1"/>
          </svg>
        ),
        children: [
          { id: "management", name: "Yönetim ve Organizasyon", href: "/iso/management" },
          { id: "org-chart", name: "Organizasyon Şeması", href: "/iso/organization" },
          { id: "departments", name: "Departmanlar", href: "/departments" },
          { id: "users", name: "Kullanıcılar", href: "/users" }
        ]
      },
      {
        id: "compliance",
        name: "Uygunluk & Gizlilik",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        children: [
          { id: "impartiality", name: "Tarafsızlık Yönetimi", href: "/iso/impartiality" },
          { id: "confidentiality", name: "Gizlilik Anlaşmaları", href: "/iso/confidentiality" },
          { id: "risk-management", name: "Risk Yönetimi", href: "/iso/risk-management" },
          { id: "capa-system", name: "CAPA Sistemi", href: "/iso/capa-system" }
        ]
      }
    ]
  }
  // Additional sections would be added here following the same pattern
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