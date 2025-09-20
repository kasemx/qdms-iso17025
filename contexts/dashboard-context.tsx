"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'sonner'
import { mockApi } from '@/lib/mock-data'
import { DASHBOARD_TABS } from '@/lib/constants/dashboard'

/**
 * Dashboard Context - Dashboard sayfa durumu yönetimi
 * @description ISO 17025 kurallarına uygun merkezi state yönetimi
 */

// Types
interface DashboardData {
  documents: { total: number; pending: number; approved: number; revisions: number }
  equipment: { total: number; calibrated: number; due: number; critical: number }
  personnel: { total: number; trained: number; certified: number; expired: number }
  samples: { total: number; pending: number; completed: number; rejected: number }
  tests: { total: number; running: number; completed: number; failed: number }
  risks: { total: number; high: number; medium: number; low: number }
  capas: { total: number; open: number; closed: number; overdue: number }
  audits: { total: number; planned: number; completed: number; findings: number }
  proficiency: { total: number; passed: number; failed: number; pending: number }
  complaints: { total: number; open: number; resolved: number; satisfaction: number }
}

interface DashboardState {
  dashboardData: DashboardData
  isLoading: boolean
  error: string | null
  activeTab: string
  notifications: number
  lastUpdated: string | null
}

// Actions
type DashboardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: DashboardData }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: number }
  | { type: 'SET_LAST_UPDATED'; payload: string }
  | { type: 'RESET_STATE' }

// Initial State
const initialState: DashboardState = {
  dashboardData: {
    documents: { total: 0, pending: 0, approved: 0, revisions: 0 },
    equipment: { total: 0, calibrated: 0, due: 0, critical: 0 },
    personnel: { total: 0, trained: 0, certified: 0, expired: 0 },
    samples: { total: 0, pending: 0, completed: 0, rejected: 0 },
    tests: { total: 0, running: 0, completed: 0, failed: 0 },
    risks: { total: 0, high: 0, medium: 0, low: 0 },
    capas: { total: 0, open: 0, closed: 0, overdue: 0 },
    audits: { total: 0, planned: 0, completed: 0, findings: 0 },
    proficiency: { total: 0, passed: 0, failed: 0, pending: 0 },
    complaints: { total: 0, open: 0, resolved: 0, satisfaction: 0 }
  },
  isLoading: true,
  error: null,
  activeTab: DASHBOARD_TABS.OVERVIEW,
  notifications: 0,
  lastUpdated: null
}

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_DATA':
      return { 
        ...state, 
        dashboardData: action.payload, 
        isLoading: false, 
        error: null,
        lastUpdated: new Date().toISOString()
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload }
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload }
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload }
    case 'RESET_STATE':
      return { ...initialState, isLoading: false }
    default:
      return state
  }
}

// Context
interface DashboardContextType {
  state: DashboardState
  actions: {
    fetchDashboardData: () => Promise<void>
    setActiveTab: (tab: string) => void
    setNotifications: (count: number) => void
    refreshData: () => Promise<void>
    resetState: () => void
  }
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

/**
 * Dashboard Provider Component
 * @description Dashboard sayfa context sağlayıcısı
 */
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  // Dashboard verilerini fetch etme
  const fetchDashboardData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      // Tüm modüllerden veri çek
      const [
        documents,
        equipment,
        personnel,
        samples,
        testMethods,
        testJobs,
        risks,
        opportunities,
        capas,
        audits,
        proficiencyTests,
        complaints
      ] = await Promise.all([
        mockApi.getDocuments(),
        mockApi.getEquipmentInventory(),
        mockApi.getPersonnel(),
        mockApi.getSamples(),
        mockApi.getTestMethods(),
        mockApi.getTestJobs(),
        mockApi.getRisks(),
        mockApi.getOpportunities(),
        mockApi.getCAPAs(),
        mockApi.getInternalAudits(),
        mockApi.getProficiencyTests(),
        mockApi.getCustomerComplaints()
      ])

      // Dashboard verilerini hesapla
      const dashboardData: DashboardData = {
        documents: {
          total: documents.length,
          pending: documents.filter(d => d.status === "İncelemede").length,
          approved: documents.filter(d => d.status === "Yayınlanan").length,
          revisions: documents.filter(d => d.status === "Revizyon Gerekli").length
        },
        equipment: {
          total: equipment.length,
          calibrated: equipment.filter(e => e.status === "Aktif").length,
          due: equipment.filter(e => e.nextCalibration && new Date(e.nextCalibration) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length,
          critical: equipment.filter(e => e.isCritical).length
        },
        personnel: {
          total: personnel.length,
          trained: personnel.filter(p => p.competencyLevel !== "Başlangıç").length,
          certified: personnel.filter(p => p.certifications && p.certifications.length > 0).length,
          expired: personnel.filter(p => p.certifications?.some((cert: any) => new Date(cert.expiryDate) < new Date())).length
        },
        samples: {
          total: samples.length,
          pending: samples.filter(s => s.status === "Kabul Edildi").length,
          completed: samples.filter(s => s.status === "Analiz Tamamlandı").length,
          rejected: samples.filter(s => s.status === "Reddedildi").length
        },
        tests: {
          total: testJobs.length,
          running: testJobs.filter(t => t.status === "Devam Ediyor").length,
          completed: testJobs.filter(t => t.status === "Tamamlandı").length,
          failed: testJobs.filter(t => t.status === "Başarısız").length
        },
        risks: {
          total: risks.length,
          high: risks.filter(r => r.level === "Yüksek").length,
          medium: risks.filter(r => r.level === "Orta").length,
          low: risks.filter(r => r.level === "Düşük").length
        },
        capas: {
          total: capas.length,
          open: capas.filter(c => c.status === "Uygulanıyor").length,
          closed: capas.filter(c => c.status === "Tamamlandı").length,
          overdue: capas.filter(c => c.dueDate && new Date(c.dueDate) < new Date()).length
        },
        audits: {
          total: audits.length,
          planned: audits.filter(a => a.status === "Planlandı").length,
          completed: audits.filter(a => a.status === "Tamamlandı").length,
          findings: audits.reduce((sum, a) => sum + a.findings.length, 0)
        },
        proficiency: {
          total: proficiencyTests.length,
          passed: proficiencyTests.filter(p => p.status === "Başarılı" || p.status === "Tamamlandı").length,
          failed: proficiencyTests.filter(p => p.status === "Başarısız").length,
          pending: proficiencyTests.filter(p => p.status === "Devam Ediyor").length
        },
        complaints: {
          total: complaints.length,
          open: complaints.filter(c => c.status === "İnceleniyor").length,
          resolved: complaints.filter(c => c.status === "Çözüldü").length,
          satisfaction: complaints.filter(c => c.customerSatisfaction.rating > 0).length
        }
      }

      dispatch({ type: 'SET_DATA', payload: dashboardData })
      
    } catch (error) {
      console.error("Dashboard data fetch error:", error)
      const errorMessage = error instanceof Error ? error.message : "Dashboard verileri yüklenirken hata oluştu"
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      toast.error("Dashboard verileri yüklenirken hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  // Actions
  const actions = {
    fetchDashboardData,
    setActiveTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
    setNotifications: (count: number) => dispatch({ type: 'SET_NOTIFICATIONS', payload: count }),
    refreshData: async () => {
      await fetchDashboardData()
      toast.success("Dashboard verileri güncellendi")
    },
    resetState: () => dispatch({ type: 'RESET_STATE' })
  }

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <DashboardContext.Provider value={{ state, actions }}>
      {children}
    </DashboardContext.Provider>
  )
}

/**
 * Dashboard Context Hook
 * @description Dashboard context'ini kullanmak için hook
 */
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

/**
 * Dashboard Data Hook - Sadece veri için
 */
export function useDashboardData() {
  const { state } = useDashboard()
  return {
    data: state.dashboardData,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated
  }
}

/**
 * Dashboard Actions Hook - Sadece action'lar için
 */
export function useDashboardActions() {
  const { actions } = useDashboard()
  return actions
}