"use client"

import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { mockApi } from "@/lib/mock-data"
import { DepartmentsHeader } from "@/components/departments/departments-header"
import { DepartmentsStats } from "@/components/departments/departments-stats"
import { DepartmentsFilters } from "@/components/departments/departments-filters"
import { DepartmentsList } from "@/components/departments/departments-list"
import { DepartmentsDialogs } from "@/components/departments/departments-dialogs"
import { PageLayout, LoadingState } from "@/components/common"

interface Department {
  id: string
  name: string
  description: string
  managerName: string
  managerId?: string
  userCount: number
  documentCount: number
  createdAt: string
  updatedAt?: string
  status: 'active' | 'inactive' | 'archived'
  parentId?: string | null
  children?: Department[]
  level: number
  budget?: number
  costCenter?: string
  location?: string
  phone?: string
  email?: string
  headCount: {
    current: number
    approved: number
    variance: number
  }
  performance: {
    efficiency: number
    satisfaction: number
    compliance: number
  }
  projects: {
    active: number
    completed: number
    pending: number
  }
  isExpanded?: boolean
}

interface DepartmentStats {
  totalDepartments: number
  activeDepartments: number
  inactiveDepartments: number
  totalUsers: number
  totalBudget: number
  averageEfficiency: number
  complianceRate: number
  departmentGrowth: number
}

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    managerId: "",
    budget: "",
    location: "",
    phone: "",
    email: "",
  })

  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [stats, setStats] = useState<DepartmentStats>({
    totalDepartments: 0,
    activeDepartments: 0,
    inactiveDepartments: 0,
    totalUsers: 0,
    totalBudget: 0,
    averageEfficiency: 0,
    complianceRate: 0,
    departmentGrowth: 0
  })

  // Transform mock data to enhanced Department structure
  const transformDepartmentData = (mockDept: any): Department => ({
    id: mockDept.id,
    name: mockDept.name,
    description: mockDept.description,
    managerName: mockDept.manager,
    managerId: mockDept.managerId,
    userCount: mockDept.employees,
    documentCount: Math.floor(Math.random() * 20) + 5,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    status: Math.random() > 0.1 ? 'active' as const : 'inactive' as const,
    parentId: mockDept.parentId,
    level: mockDept.level,
    budget: mockDept.budget,
    costCenter: mockDept.code,
    location: `Bina ${mockDept.level}`,
    phone: `+90 212 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
    email: `${mockDept.code.toLowerCase()}@company.com`,
    headCount: {
      current: mockDept.employees,
      approved: mockDept.employees + Math.floor(Math.random() * 5),
      variance: Math.floor(Math.random() * 10) - 5
    },
    performance: {
      efficiency: Math.floor(Math.random() * 30) + 70,
      satisfaction: Math.floor(Math.random() * 20) + 75,
      compliance: Math.floor(Math.random() * 15) + 85
    },
    projects: {
      active: Math.floor(Math.random() * 5) + 1,
      completed: Math.floor(Math.random() * 10) + 5,
      pending: Math.floor(Math.random() * 3)
    }
  })

  const fetchDepartments = async () => {
    try {
      setIsLoadingData(true)
      const data = await mockApi.getDepartments()
      const transformedData = data.map(transformDepartmentData)
      setDepartments(transformedData)
      
      // Calculate stats
      const newStats: DepartmentStats = {
        totalDepartments: transformedData.length,
        activeDepartments: transformedData.filter(d => d.status === 'active').length,
        inactiveDepartments: transformedData.filter(d => d.status === 'inactive').length,
        totalUsers: transformedData.reduce((sum, dept) => sum + dept.userCount, 0),
        totalBudget: transformedData.reduce((sum, dept) => sum + (dept.budget || 0), 0),
        averageEfficiency: Math.round(transformedData.reduce((sum, dept) => sum + dept.performance.efficiency, 0) / transformedData.length),
        complianceRate: Math.round(transformedData.reduce((sum, dept) => sum + dept.performance.compliance, 0) / transformedData.length),
        departmentGrowth: Math.floor(Math.random() * 20) + 5
      }
      setStats(newStats)
    } catch (error) {
      console.error("API hatası:", error)
      toast.error("Departmanlar yüklenirken bir hata oluştu")
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dept.managerName.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [departments, searchTerm])

  const handleBulkDelete = async () => {
    if (selectedDepartments.length === 0) return
    
    if (!confirm(`${selectedDepartments.length} departmanı silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      await Promise.all(selectedDepartments.map(id => mockApi.deleteDepartment(id)))
      toast.success(`${selectedDepartments.length} departman başarıyla silindi`)
      setSelectedDepartments([])
      fetchDepartments()
    } catch (error) {
      console.error("Toplu silme hatası:", error)
      toast.error("Toplu silme sırasında bir hata oluştu")
    }
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Departman Adı,Açıklama,Müdür,Personel Sayısı,Bütçe,Verimlilik\n" +
      filteredDepartments.map(dept => 
        `${dept.name},${dept.description},${dept.managerName},${dept.userCount},${dept.budget || 0},${dept.performance.efficiency}%`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "departmanlar.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Departman listesi başarıyla dışa aktarıldı")
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)

      const saveData = {
        ...formData,
        budget: parseFloat(formData.budget) || 0
      }

      if (editingDepartment) {
        await mockApi.updateDepartment(editingDepartment.id, saveData)
        toast.success("Departman başarıyla güncellendi")
      } else {
        await mockApi.createDepartment(saveData)
        toast.success("Yeni departman başarıyla eklendi")
      }

      setIsDialogOpen(false)
      fetchDepartments()
    } catch (error) {
      console.error("Kaydetme hatası:", error)
      toast.error("Kaydetme sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartmentToDelete(departmentId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!departmentToDelete) return

    try {
      await mockApi.deleteDepartment(departmentToDelete)
      toast.success("Departman başarıyla silindi")
      fetchDepartments()
    } catch (error) {
      console.error("Silme hatası:", error)
      toast.error("Silme sırasında bir hata oluştu")
    } finally {
      setIsDeleteDialogOpen(false)
      setDepartmentToDelete(null)
    }
  }

  const handleAddDepartment = () => {
    setEditingDepartment(null)
    setFormData({ 
      name: "", 
      description: "", 
      managerId: "",
      budget: "",
      location: "",
      phone: "",
      email: ""
    })
    setIsDialogOpen(true)
  }

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      description: department.description,
      managerId: department.managerId || "",
      budget: department.budget?.toString() || "",
      location: department.location || "",
      phone: department.phone || "",
      email: department.email || ""
    })
    setIsDialogOpen(true)
  }

  if (isLoadingData) {
    return (
      <PageLayout
        title="Departman Yönetimi"
        description="Organizasyon departmanlarını yönetin"
      >
        <LoadingState type="page" />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Departman Yönetimi"
      description="Organizasyon departmanlarını yönetin"
      actions={
        <DepartmentsHeader
          selectedCount={selectedDepartments.length}
          onExport={handleExport}
          onBulkDelete={handleBulkDelete}
          onAddDepartment={handleAddDepartment}
        />
      }
    >
      <DepartmentsStats stats={stats} />

      <DepartmentsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <DepartmentsList
        departments={filteredDepartments}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
      />

      <DepartmentsDialogs
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingDepartment={editingDepartment}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        isLoading={isLoading}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />
    </PageLayout>
  )
}
