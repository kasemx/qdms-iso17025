/**
 * Modern Design Utilities
 * @description Modern tasarım sistemi için utility fonksiyonlar ve helpers
 * Bu dosya .qoder/rules/modern-design-standardi.md kurallarına uygun olarak oluşturulmuştur
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind class'larını merge eden utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Modern Design System Color Palette
 */
export const modernColors = {
  primary: "from-blue-500 to-purple-600",
  secondary: "from-gray-100 to-gray-200", 
  accent: "from-emerald-500 to-teal-600",
  success: "from-green-500 to-emerald-600",
  warning: "from-yellow-500 to-orange-600",
  danger: "from-red-500 to-pink-600",
  glass: {
    light: "backdrop-blur-xl bg-white/70 border border-white/20",
    dark: "backdrop-blur-xl bg-gray-900/70 border border-white/20"
  }
} as const

/**
 * Modern Button Variants
 */
export const modernButtonVariants = {
  primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl",
  secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0 shadow-lg hover:shadow-xl",
  accent: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl",
  glass: "backdrop-blur-xl bg-white/70 hover:bg-white/90 border border-white/20 shadow-lg hover:shadow-xl",
  danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl"
} as const

/**
 * Modern Card Variants
 */
export const modernCardVariants = {
  glass: "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-gray-900/80",
  gradient: "bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl",
  elevated: "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl hover:transform hover:scale-105"
} as const

/**
 * Modern Animation Classes
 */
export const modernAnimations = {
  transition: "transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)",
  hover: {
    scale: "hover:transform hover:scale-105",
    lift: "hover:transform hover:translateY(-4px)",
    glow: "hover:shadow-2xl hover:glow-blue"
  },
  loading: "animate-pulse",
  shimmer: "loading-shimmer",
  float: "float-animation",
  reveal: "reveal-animation"
} as const

/**
 * Modern Spacing System (8pt grid)
 */
export const modernSpacing = {
  xs: "0.5rem", // 8px
  sm: "1rem",   // 16px
  md: "1.5rem", // 24px
  lg: "2rem",   // 32px
  xl: "3rem",   // 48px
  "2xl": "4rem" // 64px
} as const

/**
 * Modern Typography Scale
 */
export const modernTypography = {
  hero: "text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:to-gray-300",
  title: "text-2xl font-semibold text-gray-900 dark:text-white",
  subtitle: "text-lg font-medium text-gray-700 dark:text-gray-300",
  body: "text-base font-normal text-gray-600 dark:text-gray-400",
  caption: "text-sm font-normal text-gray-500 dark:text-gray-500",
  gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
} as const

/**
 * Glass Morphism Component Creator
 */
export const createGlassCard = (className?: string) => {
  return cn(modernCardVariants.glass, className)
}

/**
 * Modern Button Component Creator
 */
export const createModernButton = (variant: keyof typeof modernButtonVariants = "primary", className?: string) => {
  const baseClasses = "transition-all duration-300 transform hover:scale-105 rounded-2xl font-medium px-6 py-3"
  return cn(baseClasses, modernButtonVariants[variant], modernAnimations.transition, className)
}

/**
 * Modern Input Component Creator
 */
export const createModernInput = (className?: string) => {
  const baseClasses = "border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 px-4 py-3"
  return cn(baseClasses, modernAnimations.transition, className)
}

/**
 * Metric Card Color Variants
 */
export const metricCardColors = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800"
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800"
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800"
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800"
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800"
  }
} as const

/**
 * Modern Page Layout Background
 */
export const modernPageBackground = "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"

/**
 * Modern Page Header
 */
export const modernPageHeader = "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20"

/**
 * Focus Ring Utility
 */
export const modernFocusRing = "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"

/**
 * Modern Scrollbar
 */
export const modernScrollbar = "custom-scrollbar"

/**
 * Status Badge Variants
 */
export const statusBadgeVariants = {
  success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
  warning: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
  danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white",
  info: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
  neutral: "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
} as const

/**
 * Modern Grid Layout
 */
export const modernGrid = {
  responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  autoFit: "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6",
  masonry: "columns-1 md:columns-2 lg:columns-3 gap-6"
} as const

/**
 * Responsive Typography Utilities
 */
export const responsiveText = {
  hero: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold",
  title: "text-xl md:text-2xl lg:text-3xl font-semibold",
  subtitle: "text-lg md:text-xl font-medium",
  body: "text-sm md:text-base",
  caption: "text-xs md:text-sm"
} as const

/**
 * Modern Form Layout
 */
export const modernForm = {
  container: "space-y-6 p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/20",
  group: "space-y-2",
  label: "text-sm font-medium text-gray-700 dark:text-gray-300",
  input: createModernInput(),
  button: createModernButton("primary", "w-full")
} as const

/**
 * Loading State Utilities
 */
export const loadingStates = {
  shimmer: "animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
  spinner: "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
  dots: "flex space-x-1 animate-pulse"
} as const

/**
 * Modern Table Styles (when cards are not suitable)
 */
export const modernTable = {
  container: "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-2xl overflow-hidden",
  header: "bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur",
  row: "border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors",
  cell: "px-6 py-4 text-sm"
} as const

/**
 * Helper function to create modern component classes
 */
export function createModernComponent(baseClasses: string, variant?: string, className?: string) {
  return cn(
    baseClasses,
    modernAnimations.transition,
    variant,
    className
  )
}

/**
 * Responsive breakpoint helper
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)", 
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)"
} as const

/**
 * Modern shadow system
 */
export const modernShadows = {
  sm: "shadow-lg",
  md: "shadow-xl", 
  lg: "shadow-2xl",
  glow: "shadow-2xl drop-shadow-lg",
  colored: {
    blue: "shadow-blue-500/25",
    purple: "shadow-purple-500/25",
    green: "shadow-green-500/25"
  }
} as const