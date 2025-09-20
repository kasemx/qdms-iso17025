/**
 * Modern Dashboard Tab Layout
 * @description Alternative tab design with better spacing and mobile responsiveness
 */

import { memo } from "react"
import { cn } from "@/lib/utils"

interface ModernTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: Array<{
    id: string
    label: string
    icon?: React.ReactNode
    badge?: number
  }>
}

/**
 * Modern Tabs with Pill Design
 */
export const ModernTabs = memo<ModernTabsProps>(function ModernTabs({ 
  activeTab, 
  onTabChange, 
  tabs 
}) {
  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center justify-start space-x-1 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
              "hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && tab.badge > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
              {tab.badge && tab.badge > 0 ? ` (${tab.badge})` : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
})

/**
 * Segmented Control Style Tabs
 */
export const SegmentedTabs = memo<ModernTabsProps>(function SegmentedTabs({ 
  activeTab, 
  onTabChange, 
  tabs 
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
              "hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            {tab.badge && tab.badge > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
})

/**
 * Sidebar Style Tabs (Vertical)
 */
export const SidebarTabs = memo<ModernTabsProps>(function SidebarTabs({ 
  activeTab, 
  onTabChange, 
  tabs 
}) {
  return (
    <div className="flex flex-col space-y-1 w-64">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left",
            "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {tab.icon}
          <span className="flex-1">{tab.label}</span>
          {tab.badge && tab.badge > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
})