"use client"

import { useState, useEffect } from "react"
import { mockApi } from "@/lib/mock-data"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrainingPlansHeader } from "@/components/training-plans/training-plans-header"
import { TrainingPlansStats } from "@/components/training-plans/training-plans-stats"
import { TrainingPlansFilters } from "@/components/training-plans/training-plans-filters"
import { TrainingPlansList } from "@/components/training-plans/training-plans-list"

export interface TrainingPlan {
  id: string
  title: string
  description: string
  category: string
  type: string
  level: string
  duration: number
  startDate: string
  endDate: string
  status: string
  instructor: string
  location: string
  maxParticipants: number
  currentParticipants: number
  objectives: string[]
  prerequisites: string
  materials: string[]
  assessmentMethod: string
  passingScore: number
  certificateIssued: boolean
  cost: number
  budget: number
  department: string
  priority: string
  createdBy: string
  createdDate: string
  lastModified: string
  completionRate: number
  satisfactionScore: number
  effectivenessScore: number
  notes: string
}

export default function TrainingPlansPage() {
  // Core state
  const [plans, setPlans] = useState<TrainingPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<TrainingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("startDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [costRange, setCostRange] = useState({ min: "", max: "" })
  const [participantRange, setParticipantRange] = useState({ min: "", max: "" })
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [instructorFilter, setInstructorFilter] = useState("")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  
  // Notification state
  const [updateNotifications, setUpdateNotifications] = useState<Array<{
    id: string
    type: 'created' | 'updated' | 'deleted' | 'status_changed'
    message: string
    timestamp: Date
    planId: string
  }>>([])
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  
  // User state
  const [currentUser, setCurrentUser] = useState({
    id: "user-1",
    name: "Admin User",
    role: "admin",
    permissions: ["read", "write", "delete", "export", "email"]
  })

  // Data fetching
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterPlans()
  }, [plans, searchTerm, selectedStatus, selectedCategory, sortBy, sortOrder, dateRange, costRange, participantRange, priorityFilter, instructorFilter])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getTrainingPlans()
      // Ensure all plans have required properties with default values
      const plansWithDefaults = data.map((plan: any) => ({
        ...plan,
        notes: plan.notes || "",
        objectives: plan.objectives || [],
        materials: plan.materials || [],
        prerequisites: plan.prerequisites || "",
        assessmentMethod: plan.assessmentMethod || "",
        passingScore: plan.passingScore || 0,
        certificateIssued: plan.certificateIssued || false,
        completionRate: plan.completionRate || 0,
        satisfactionScore: plan.satisfactionScore || 0,
        effectivenessScore: plan.effectivenessScore || 0
      }))
      setPlans(plansWithDefaults)
    } catch (error) {
      console.error("Error fetching training plans:", error)
      toast.error("Veriler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const filterPlans = () => {
    let filtered = [...plans]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(plan =>
        plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(plan => plan.status === selectedStatus)
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(plan => plan.category === selectedCategory)
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(plan => new Date(plan.startDate) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      filtered = filtered.filter(plan => new Date(plan.startDate) <= new Date(dateRange.end))
    }

    // Cost range filter
    if (costRange.min) {
      filtered = filtered.filter(plan => plan.cost >= parseFloat(costRange.min))
    }
    if (costRange.max) {
      filtered = filtered.filter(plan => plan.cost <= parseFloat(costRange.max))
    }

    // Participant range filter
    if (participantRange.min) {
      filtered = filtered.filter(plan => plan.maxParticipants >= parseInt(participantRange.min))
    }
    if (participantRange.max) {
      filtered = filtered.filter(plan => plan.maxParticipants <= parseInt(participantRange.max))
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(plan => plan.priority === priorityFilter)
    }

    // Instructor filter
    if (instructorFilter) {
      filtered = filtered.filter(plan => 
        plan.instructor.toLowerCase().includes(instructorFilter.toLowerCase())
      )
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "startDate":
          aValue = new Date(a.startDate)
          bValue = new Date(b.startDate)
          break
        case "endDate":
          aValue = new Date(a.endDate)
          bValue = new Date(b.endDate)
          break
        case "cost":
          aValue = a.cost
          bValue = b.cost
          break
        case "participants":
          aValue = a.currentParticipants
          bValue = b.currentParticipants
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        case "priority":
          aValue = a.priority
          bValue = b.priority
          break
        default:
          aValue = a.title
          bValue = b.title
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    setFilteredPlans(filtered)
  }

  // Event handlers
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
  }

  const handlePlanSelection = (planId: string, selected: boolean) => {
    if (selected) {
      setSelectedPlans([...selectedPlans, planId])
    } else {
      setSelectedPlans(selectedPlans.filter(id => id !== planId))
    }
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const currentPagePlans = filteredPlans.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
      setSelectedPlans(currentPagePlans.map(plan => plan.id))
    } else {
      setSelectedPlans([])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedPlans([])
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
    setSelectedPlans([])
  }

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    setDateRange(range)
    setCurrentPage(1)
  }

  const handleCostRangeChange = (range: { min: string; max: string }) => {
    setCostRange(range)
    setCurrentPage(1)
  }

  const handleParticipantRangeChange = (range: { min: string; max: string }) => {
    setParticipantRange(range)
    setCurrentPage(1)
  }

  const handlePriorityFilter = (priority: string) => {
    setPriorityFilter(priority)
    setCurrentPage(1)
  }

  const handleInstructorFilter = (instructor: string) => {
    setInstructorFilter(instructor)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedStatus("all")
    setSelectedCategory("all")
    setDateRange({ start: "", end: "" })
    setCostRange({ min: "", max: "" })
    setParticipantRange({ min: "", max: "" })
    setPriorityFilter("all")
    setInstructorFilter("")
    setCurrentPage(1)
  }

  const handleToggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleRealTimeToggle = (enabled: boolean) => {
    setIsRealTimeEnabled(enabled)
  }

  const handleRoleChange = (role: string) => {
    setCurrentUser(prev => ({
      ...prev,
      role
    }))
  }

  const addUpdateNotification = (notification: {
    type: 'created' | 'updated' | 'deleted' | 'status_changed'
    message: string
    planId: string
  }) => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      ...notification,
      timestamp: new Date()
    }
    setUpdateNotifications(prev => [newNotification, ...prev.slice(0, 9)])
    setShowUpdateNotification(true)
    setTimeout(() => setShowUpdateNotification(false), 3000)
  }

  const clearUpdateNotifications = () => {
    setUpdateNotifications([])
  }

  // Permission check helper
  const hasPermission = (permission: string): boolean => {
    return currentUser.permissions.includes(permission)
  }

  // Calculate statistics
  const stats = {
    total: plans.length,
    completed: plans.filter(p => p.status === "completed").length,
    inProgress: plans.filter(p => p.status === "in-progress").length,
    planned: plans.filter(p => p.status === "planned").length,
    cancelled: plans.filter(p => p.status === "cancelled").length,
    averageCost: plans.length > 0 ? plans.reduce((sum, p) => sum + p.cost, 0) / plans.length : 0,
    totalBudget: plans.reduce((sum, p) => sum + p.budget, 0),
    totalParticipants: plans.reduce((sum, p) => sum + p.currentParticipants, 0),
    averageSatisfaction: plans.length > 0 ? plans.reduce((sum, p) => sum + p.satisfactionScore, 0) / plans.length : 0,
    completionRate: plans.length > 0 ? plans.reduce((sum, p) => sum + p.completionRate, 0) / plans.length : 0
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <TrainingPlansHeader
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        selectedPlans={selectedPlans}
        updateNotifications={updateNotifications}
        isRealTimeEnabled={isRealTimeEnabled}
        setIsRealTimeEnabled={setIsRealTimeEnabled}
        showUpdateNotification={showUpdateNotification}
        setShowUpdateNotification={setShowUpdateNotification}
        onNewPlan={() => {}}
        onBulkStatusChange={() => {}}
        onBulkDelete={() => {}}
        onExport={() => {}}
        onImport={() => {}}
      />

      <TrainingPlansStats
        plans={plans}
      />

      <TrainingPlansFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        dateRange={dateRange}
        setDateRange={setDateRange}
        costRange={costRange}
        setCostRange={setCostRange}
        participantRange={participantRange}
        setParticipantRange={setParticipantRange}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        instructorFilter={instructorFilter}
        setInstructorFilter={setInstructorFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredCount={filteredPlans.length}
        totalCount={plans.length}
        onClearFilters={handleClearFilters}
      />

      <TrainingPlansList
        plans={filteredPlans}
        selectedPlans={selectedPlans}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSelectPlan={handlePlanSelection}
        onSelectAllPlans={handleSelectAll}
        onViewDetails={() => {}}
        onEditPlan={() => {}}
        onDeletePlan={() => {}}
        hasPermission={hasPermission}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  )
}