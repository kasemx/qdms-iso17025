"use client"

import { useState, useRef, useEffect } from "react"
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
  Star,
  StarOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useMenu } from "@/contexts/menu-context"
import { Input } from "@/components/ui/input"

// Modern UI Components
const GlassCard = ({ children, className, ...props }: any) => (
  <div 
    className={cn(
      "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-2xl shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const ModernButton = ({ children, variant = "primary", size = "default", className, ...props }: any) => (
  <Button
    className={cn(
      "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-2xl",
      variant === "primary" && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0",
      variant === "secondary" && "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0",
      variant === "accent" && "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0",
      variant === "glass" && "backdrop-blur-md bg-white/60 hover:bg-blue-500 dark:bg-gray-800/70 dark:hover:bg-blue-600 border border-gray-300/40 dark:border-gray-600/40 hover:text-white hover:border-blue-500 shadow-md hover:shadow-lg",
      size === "sm" && "px-3 py-1.5 text-sm",
      size === "lg" && "px-6 py-3 text-lg",
      className
    )}
    {...props}
  >
    {children}
  </Button>
)

interface ModernSidebarProps {
  className?: string
}

export function ModernSidebar({ className }: ModernSidebarProps) {
  const { state, actions } = useMenu()
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
        actions.toggleSearch()
      }
      // Escape to clear search
      if (e.key === 'Escape') {
        actions.clearSearch()
        searchInputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [actions])

  const filteredSections = state.menuSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!state.searchTerm) return true
      
      const nameMatch = item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      const childrenMatch = item.children?.some(child => 
        child.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
      return nameMatch || childrenMatch
    })
  })).filter(section => section.items.length > 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IconWrapper icon={CheckCircle} className="h-3 w-3 text-green-600" />
      case "warning":
        return <IconWrapper icon={AlertTriangle} className="h-3 w-3 text-yellow-600" />
      case "error":
        return <IconWrapper icon={AlertCircle} className="h-3 w-3 text-red-600" />
      case "pending":
        return <IconWrapper icon={Clock} className="h-3 w-3 text-blue-600" />
      default:
        return null
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <IconWrapper icon={FileText} className="h-6 w-6 text-white" />
          </div>
          {!state.isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                QDMS
              </h1>
              <p className="text-xs text-gray-500">Kalite Doküman Sistemi</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-full"
          onClick={actions.toggleCollapse}
        >
          {state.isCollapsed ? (
            <IconWrapper icon={ChevronRight} className="h-5 w-5" />
          ) : (
            <IconWrapper icon={ChevronLeft} className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-4 border-b border-gray-100">
        <div className="relative">
          <IconWrapper icon={Search} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Menü ara... (Ctrl+K)"
            value={state.searchTerm}
            onChange={(e) => actions.setSearchTerm(e.target.value)}
            onFocus={() => actions.setSearchTerm("")}
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {state.searchTerm && (
            <button
              onClick={actions.clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <IconWrapper icon={X} className="h-4 w-4" />
            </button>
          )}
        </div>
        {!state.searchTerm && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded-lg">Ctrl</kbd> + 
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded-lg ml-1">K</kbd>
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-3 py-4">
          <nav className="space-y-4">
            {filteredSections.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-2">
                {/* Section Header */}
                {!state.isCollapsed && (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    {section.icon && <IconWrapper icon={section.icon} className="text-lg" />}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                )}
                
                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = state.activeItem === item.id || 
                      (item.href && pathname === item.href) || 
                      (item.href && pathname?.startsWith(item.href + "/"))
                    const isExpanded = state.expandedItems.includes(item.id)
                    const isFavorite = state.favoriteItems.includes(item.id)

                    if (item.children) {
                      return (
                        <div key={item.id}>
                          <div
                            className={cn(
                              "w-full justify-between text-left font-normal rounded-2xl cursor-pointer transition-colors",
                              "hover:bg-gray-100 hover:text-gray-900",
                              isActive && "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border border-blue-200",
                              "group flex items-center px-3 py-2"
                            )}
                            onClick={() => actions.toggleExpand(item.id)}
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon ? (
                                <IconWrapper icon={item.icon} className="h-4 w-4" />
                              ) : (
                                <IconWrapper icon={FolderOpen} className="h-4 w-4" />
                              )}
                              {!state.isCollapsed && (
                                <span className="text-sm font-medium truncate">{item.name}</span>
                              )}
                            </div>
                            {!state.isCollapsed && (
                              <div className="flex items-center space-x-1">
                                <button
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-gray-200 flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    actions.toggleFavorite(item.id)
                                  }}
                                >
                                  {isFavorite ? (
                                    <IconWrapper icon={Star} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  ) : (
                                    <IconWrapper icon={StarOff} className="h-3 w-3 text-gray-400" />
                                  )}
                                </button>
                                <IconWrapper icon={ChevronDown} className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                              </div>
                            )}
                          </div>
                          {isExpanded && !state.isCollapsed && (
                            <div className="ml-8 mt-2 space-y-1">
                              {item.children
                                .filter(child => !state.searchTerm || child.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
                                .map((child) => (
                                <div
                                  key={child.id}
                                  className={cn(
                                    "w-full justify-start font-normal rounded-xl cursor-pointer transition-colors",
                                    "hover:bg-gray-50 hover:text-gray-900",
                                    "text-gray-600 text-sm px-4 py-2 flex items-center justify-between",
                                    (state.activeItem === child.id || pathname === child.href) && 
                                    "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border-l-2 border-blue-500"
                                  )}
                                  onClick={() => {
                                    // Handle navigation here if needed
                                    if (child.href) {
                                      window.location.href = child.href;
                                    }
                                  }}
                                >
                                  <span>{child.name}</span>
                                  {child.status && (
                                    <div className="flex items-center space-x-1">
                                      {getStatusIcon(child.status)}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "w-full justify-start font-normal rounded-2xl cursor-pointer transition-colors",
                          "hover:bg-gray-100 hover:text-gray-900",
                          isActive && "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border border-blue-200",
                          "group flex items-center justify-between px-3 py-2"
                        )}
                        onClick={() => {
                          // Handle navigation here
                          if (item.href) {
                            window.location.href = item.href;
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon ? (
                            <IconWrapper icon={item.icon} className="h-4 w-4" />
                          ) : (
                            <IconWrapper icon={FileText} className="h-4 w-4" />
                          )}
                          {!state.isCollapsed && (
                            <span className="text-sm font-medium truncate">{item.name}</span>
                          )}
                        </div>
                        {!state.isCollapsed && (
                          <div className="flex items-center space-x-2">
                            <button
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-gray-200 flex items-center justify-center"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                actions.toggleFavorite(item.id)
                              }}
                            >
                              {isFavorite ? (
                                <IconWrapper icon={Star} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              ) : (
                                <IconWrapper icon={StarOff} className="h-3 w-3 text-gray-400" />
                              )}
                            </button>
                            {item.status && getStatusIcon(item.status)}
                            {item.badge && (
                              <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 text-xs font-medium text-white shadow-sm">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                
                {/* Section Divider */}
                {!state.isCollapsed && sectionIndex < filteredSections.length - 1 && (
                  <div className="border-t border-gray-100 my-4"></div>
                )}
              </div>
            ))}
            
            {/* No Results Message */}
            {state.searchTerm && filteredSections.length === 0 && (
              <div className="text-center py-8">
                <IconWrapper icon={Search} className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">"<span className="font-medium">{state.searchTerm}</span>" için sonuç bulunamadı</p>
                <p className="text-xs text-gray-400 mt-1">Farklı anahtar kelimeler deneyin</p>
              </div>
            )}
          </nav>
        </ScrollArea>
      </div>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-white">SA</span>
          </div>
          {!state.isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Sistem Yöneticisi</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@company.com</p>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">Aktif</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <ModernButton
            variant="glass"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => {
              // Reset onboarding to show wizard again
              localStorage.removeItem("qdms-onboarding-completed")
              localStorage.setItem("qdms-onboarding-show-again", "true")
              window.location.reload()
            }}
          >
            <IconWrapper icon={BookOpen} className="mr-3 h-4 w-4" />
            {!state.isCollapsed && <span className="text-sm">Sistem Rehberi</span>}
          </ModernButton>
          
          <ModernButton
            variant="glass"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
          >
            <IconWrapper icon={LogOut} className="mr-3 h-4 w-4" />
            {!state.isCollapsed && <span className="text-sm">Çıkış Yap</span>}
          </ModernButton>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300",
        state.isCollapsed ? "lg:w-20" : "lg:w-64",
        className
      )}>
        <div className={cn(
          "flex flex-col flex-grow bg-white border-r border-gray-200 h-full transition-all duration-300",
          state.isCollapsed ? "lg:w-20" : "lg:w-64"
        )}>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          {/* Changed Button to button element to avoid nesting issues */}
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
            <IconWrapper icon={Menu} className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white h-full">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

// Icon wrapper component to ensure consistent rendering
const IconWrapper = ({ icon: Icon, className, width = "16", height = "16", ...props }: any) => (
  <Icon 
    className={cn(className, "flex-shrink-0")} 
    width={width} 
    height={height} 
    {...props} 
  />
)
