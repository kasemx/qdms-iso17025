"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { CAPAHeader } from "@/components/capa-system/capa-header"
import { CAPAStats } from "@/components/capa-system/capa-stats"
import { CAPAFilters } from "@/components/capa-system/capa-filters"
import { CAPAList } from "@/components/capa-system/capa-list"
import { CAPADialogs } from "@/components/capa-system/capa-dialogs"

interface CAPA {
  id: string
  capaNumber: string
  title: string
  description: string
  type: string
  source: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  completionDate: string
  rootCause?: {
    analysis: string
    causes: Array<{
      cause: string
      category: string
      impact: string
    }>
    method: string
    analyst: string
    date: string
  }
  correctiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  preventiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  verification?: {
    method: string
    criteria: string
    results: string
    verifier: string
    date: string
    status: string
  }
  effectiveness?: {
    method: string
    criteria: string
    results: string
    evaluator: string
    date: string
    status: string
  }
  cost?: {
    estimated: number
    actual: number
    variance: number
  }
  attachments?: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function CAPASystemPage() {
  const [capas, setCapas] = useState<CAPA[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("capas")

  // Dialog states
  const [isCAPADialogOpen, setIsCAPADialogOpen] = useState(false)
  const [editingCAPA, setEditingCAPA] = useState<CAPA | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingCAPA, setViewingCAPA] = useState<CAPA | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCAPAs, setSelectedCAPAs] = useState<string[]>([])

  // Form data
  const [capaFormData, setCapaFormData] = useState({
    capaNumber: "",
    title: "",
    description: "",
    type: "",
    source: "",
    priority: "",
    status: "open",
    owner: "",
    identifiedDate: "",
    dueDate: "",
    completionDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchCAPAs()
  }, [])

  const fetchCAPAs = async () => {
    try {
      setIsLoading(true)
      // Mock data for CAPAs
      const mockData: CAPA[] = [
        {
          id: "capa-001",
          capaNumber: "CAPA-2024-001",
          title: "Ekipman Kalibrasyon Gecikmesi",
          description: "Kritik ekipmanların kalibrasyon sürelerinin aşılması durumunda analiz sonuçlarının güvenilirliğinin azalması",
          type: "Düzeltici",
          source: "İç Denetim",
          priority: "Yüksek",
          status: "Uygulanıyor",
          owner: "Dr. Mehmet Kaya",
          identifiedDate: "2024-01-15",
          dueDate: "2024-04-15",
          completionDate: "",
          correctiveActions: [
            { action: "Otomatik hatırlatma sistemi kurulumu", responsible: "IT Müdürü", dueDate: "2024-02-28", status: "Tamamlandı", effectiveness: "Yüksek" },
            { action: "Kalibrasyon takip tablosu oluşturma", responsible: "Kalite Müdürü", dueDate: "2024-02-15", status: "Tamamlandı", effectiveness: "Orta" },
          ],
          preventiveActions: [
            { action: "Kalibrasyon prosedürü güncelleme", responsible: "Kalite Müdürü", dueDate: "2024-03-31", status: "Planlandı", effectiveness: "Yüksek" },
          ],
          notes: "CAPA başarıyla uygulanıyor. Düzenli takip yapılıyor.",
          createdAt: "2024-01-10",
          updatedAt: "2024-03-01",
        },
      ]
      setCapas(mockData)
    } catch (error) {
      console.error("CAPAs fetch error:", error)
      toast.error("CAPA verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCAPASubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!capaFormData.capaNumber || !capaFormData.title || !capaFormData.description) {
      toast.error("Lütfen tüm zorunlu alanları doldurun")
      return
    }

    try {
      if (editingCAPA) {
        const updatedCAPA = {
          ...editingCAPA,
          ...capaFormData,
          updatedAt: new Date().toISOString()
        }
        setCapas(prev => prev.map(capa => capa.id === editingCAPA.id ? updatedCAPA : capa))
        toast.success("CAPA başarıyla güncellendi")
      } else {
        const newCAPA: CAPA = {
          id: `capa-${Date.now()}`,
          ...capaFormData,
          correctiveActions: [],
          preventiveActions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setCapas(prev => [...prev, newCAPA])
        toast.success("CAPA başarıyla oluşturuldu")
      }
      
      setIsCAPADialogOpen(false)
      setEditingCAPA(null)
    } catch (error) {
      console.error("CAPA save error:", error)
      toast.error("CAPA kaydedilirken hata oluştu")
    }
  }

  const handleViewCAPA = (capa: CAPA) => {
    setViewingCAPA(capa)
    setIsViewDialogOpen(true)
  }

  const handleEditCAPA = (capa: CAPA) => {
    setEditingCAPA(capa)
    setCapaFormData({
      capaNumber: capa.capaNumber,
      title: capa.title,
      description: capa.description,
      type: capa.type,
      source: capa.source,
      priority: capa.priority,
      status: capa.status,
      owner: capa.owner,
      identifiedDate: capa.identifiedDate,
      dueDate: capa.dueDate,
      completionDate: capa.completionDate,
      notes: capa.notes || "",
    })
    setIsCAPADialogOpen(true)
  }

  const handleDeleteCAPA = async (capaId: string) => {
    if (window.confirm("Bu CAPA kaydını silmek istediğinizden emin misiniz?")) {
      try {
        setCapas(prev => prev.filter(capa => capa.id !== capaId))
        toast.success("CAPA başarıyla silindi")
      } catch (error) {
        console.error("CAPA delete error:", error)
        toast.error("CAPA silinirken hata oluştu")
      }
    }
  }

  const handleCompleteCAPA = (capaId: string) => {
    setCapas(prev => prev.map(c => 
      c.id === capaId 
        ? { 
            ...c, 
            status: 'completed',
            completionDate: new Date().toLocaleDateString('tr-TR')
          }
        : c
    ))
    toast.success("CAPA tamamlandı olarak işaretlendi")
  }

  const handleSelectCAPA = (capaId: string, checked: boolean) => {
    if (checked) {
      setSelectedCAPAs(prev => [...prev, capaId])
    } else {
      setSelectedCAPAs(prev => prev.filter(id => id !== capaId))
    }
  }

  const handleSelectAllCAPAs = (checked: boolean) => {
    if (checked) {
      setSelectedCAPAs(filteredCAPAs.map(capa => capa.id))
    } else {
      setSelectedCAPAs([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedCAPAs.length === 0) {
      toast.error("Lütfen silinecek CAPA'ları seçin")
      return
    }
    
    if (window.confirm(`${selectedCAPAs.length} CAPA kaydını silmek istediğinizden emin misiniz?`)) {
      try {
        setCapas(prev => prev.filter(capa => !selectedCAPAs.includes(capa.id)))
        setSelectedCAPAs([])
        toast.success(`${selectedCAPAs.length} CAPA başarıyla silindi`)
      } catch (error) {
        console.error("Bulk delete error:", error)
        toast.error("CAPA'lar silinirken hata oluştu")
      }
    }
  }

  const handleNewCAPA = () => {
    setEditingCAPA(null)
    setCapaFormData({
      capaNumber: "",
      title: "",
      description: "",
      type: "",
      source: "",
      priority: "",
      status: "open",
      owner: "",
      identifiedDate: "",
      dueDate: "",
      completionDate: "",
      notes: "",
    })
    setIsCAPADialogOpen(true)
  }

  const handleDownloadReport = () => {
    toast.success("Rapor indirme işlemi başlatıldı")
  }

  const filteredCAPAs = capas.filter((capa) => {
    const matchesSearch = 
      capa.capaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.owner.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || capa.status === statusFilter
    const matchesType = typeFilter === "all" || capa.type === typeFilter
    const matchesPriority = priorityFilter === "all" || capa.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CAPAHeader
        onNewCAPA={handleNewCAPA}
        onDownloadReport={handleDownloadReport}
      />

      <CAPAStats capas={capas} isLoading={isLoading} />

      <CAPAFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        priorityFilter={priorityFilter}
        selectedCAPAs={selectedCAPAs}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onTypeFilterChange={setTypeFilter}
        onPriorityFilterChange={setPriorityFilter}
        onBulkDelete={handleBulkDelete}
      />

      <CAPAList
        capas={capas}
        filteredCAPAs={filteredCAPAs}
        selectedCAPAs={selectedCAPAs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSelectCAPA={handleSelectCAPA}
        onSelectAllCAPAs={handleSelectAllCAPAs}
        onViewCAPA={handleViewCAPA}
        onEditCAPA={handleEditCAPA}
        onDeleteCAPA={handleDeleteCAPA}
        onCompleteCAPA={handleCompleteCAPA}
      />

      <CAPADialogs
        isCAPADialogOpen={isCAPADialogOpen}
        isViewDialogOpen={isViewDialogOpen}
        editingCAPA={editingCAPA}
        viewingCAPA={viewingCAPA}
        capaFormData={capaFormData}
        onCAPADialogChange={setIsCAPADialogOpen}
        onViewDialogChange={setIsViewDialogOpen}
        onFormDataChange={setCapaFormData}
        onSubmit={handleCAPASubmit}
        onEdit={handleEditCAPA}
      />
    </div>
  )
}
