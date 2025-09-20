/**
 * Dashboard Constants
 * @description Dashboard sayfası için sabit değerler - Magic number kuralına uygun
 */

// Notification settings
export const NOTIFICATION_CONSTANTS = {
  DEFAULT_COUNT: 5,
  MAX_DISPLAY_COUNT: 99,
  REFRESH_INTERVAL: 30000, // 30 saniye
} as const

// Dashboard refresh intervals (milliseconds)
export const REFRESH_INTERVALS = {
  DASHBOARD_DATA: 60000, // 1 dakika
  LIVE_MONITORING: 30000, // 30 saniye
  NOTIFICATIONS: 15000, // 15 saniye
} as const

// Dashboard tab values
export const DASHBOARD_TABS = {
  OVERVIEW: "overview",
  ISO_MAPPING: "iso-mapping", 
  QUALITY: "quality",
  OPERATIONS: "operations",
  COMPLIANCE: "compliance",
} as const

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  COMPLIANCE_SCORE: 90, // %90 ISO uyumluluk hedefi
  TEST_SUCCESS_RATE: 95, // %95 test başarı oranı
  CUSTOMER_SATISFACTION: 80, // %80 müşteri memnuniyeti
  EQUIPMENT_ACTIVE_RATE: 85, // %85 ekipman aktif oranı
} as const

// Date ranges for analytics
export const DATE_RANGES = {
  DAILY: 1,
  WEEKLY: 7,
  MONTHLY: 30,
  QUARTERLY: 90,
  YEARLY: 365,
} as const

// Chart colors for consistency
export const CHART_COLORS = {
  PRIMARY: "#3b82f6",
  SUCCESS: "#10b981", 
  WARNING: "#f59e0b",
  DANGER: "#ef4444",
  INFO: "#6366f1",
  SECONDARY: "#6b7280",
} as const

// Component size limits for rule compliance
export const COMPONENT_LIMITS = {
  MAX_LINES: 300,
  MAX_FUNCTION_LINES: 50,
  MAX_COMPLEXITY: 10,
} as const

// Document List Constants
export const DOCUMENT_CONSTANTS = {
  PAGINATION: {
    DEFAULT_ITEMS_PER_PAGE: 10,
    OPTIONS: [5, 10, 20, 50] as const,
    MAX_PAGES_SHOWN: 3,
  },
  GRID: {
    MOBILE_COLS: 1,
    TABLET_COLS: 2,
    DESKTOP_COLS: 3,
  },
  SEARCH: {
    MIN_LENGTH: 2,
    SUGGESTIONS_LIMIT: 5,
    HISTORY_LIMIT: 10,
  },
  FILE_SIZE: {
    UNITS: ['B', 'KB', 'MB', 'GB'] as const,
    CONVERSION_FACTOR: 1024,
  },
} as const