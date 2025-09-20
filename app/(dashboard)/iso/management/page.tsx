"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { ManagementHeader } from "@/components/management/management-header"
import { ManagementStats } from "@/components/management/management-stats"
import { ManagementTabs } from "@/components/management/management-tabs"
import { ManagementContent } from "@/components/management/management-content"
import { ManagementDialogs } from "@/components/management/management-dialogs"

// Lazy load mock data for better performance
const getMockData = () => import("@/lib/mock-data").then(module => module.mockData)

interface OrganizationStructure {
  id: string
  positionTitle: string
  department: string
  reportingTo: string
  responsibilities: string
  qualifications: string
  currentHolder: string
  status: string
  lastUpdated: string
}

interface ImpartialityRecord {
  id: string
  declarationType: string
  title: string
  description: string
  declaredBy: string
  riskLevel: string
  status: string
  createdAt: string
  reviewDate: string
}

interface ConfidentialityAgreement {
  id: string
  agreementType: string
  title: string
  signedBy: string
  signedDate: string
  expiryDate: string
  status: string
  department: string
  description: string
}

interface ManagementReview {
  id: string
  reviewDate: string
  reviewType: string
  chairperson: string
  attendees: string[]
  agenda: string
  decisions: string
  actionItems: string
  nextReviewDate: string
  status: string
}

export default function ManagementPage() {
  const [positions, setPositions] = useState<OrganizationStructure[]>([])
  const [impartialityRecords, setImpartialityRecords] = useState<ImpartialityRecord[]>([])
  const [confidentialityAgreements, setConfidentialityAgreements] = useState<ConfidentialityAgreement[]>([])
  const [managementReviews, setManagementReviews] = useState<ManagementReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("organization")

  // Dialog states
  const [isOrgDialogOpen, setIsOrgDialogOpen] = useState(false)
  const [isImpartialityDialogOpen, setIsImpartialityDialogOpen] = useState(false)
  const [isConfidentialityDialogOpen, setIsConfidentialityDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  // Form data states
  const [orgFormData, setOrgFormData] = useState({
    positionTitle: "",
    department: "",
    reportingTo: "",
    responsibilities: "",
    qualifications: "",
    currentHolder: "",
  })

  const [impartialityFormData, setImpartialityFormData] = useState({
    declarationType: "",
    title: "",
    description: "",
    riskLevel: "low",
    mitigationActions: "",
    reviewDate: "",
  })

  const [confidentialityFormData, setConfidentialityFormData] = useState({
    agreementType: "",
    title: "",
    signedBy: "",
    department: "",
    description: "",
    expiryDate: "",
  })

  const [reviewFormData, setReviewFormData] = useState({
    reviewDate: "",
    reviewType: "",
    chairperson: "",
    agenda: "",
    decisions: "",
    actionItems: "",
    nextReviewDate: "",
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setIsLoading(true)
      await Promise.all([
        fetchPositions(),
        fetchImpartialityRecords(),
        fetchConfidentialityAgreements(),
        fetchManagementReviews(),
      ])
    } catch (error) {
      console.error("Veri yükleme hatası:", error)
      toast.error("Veriler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPositions = async () => {
    try {
      const mockData = await getMockData()
      const positions = mockData.organizationStructure?.positions || []
      setPositions(
        positions.map((item: any) => ({
          id: item.id,
          positionTitle: item.title,
          department: item.department,
          reportingTo: "Üst Yönetim",
          responsibilities: item.responsibilities?.join(", ") || "",
          qualifications: item.requirements || "",
          currentHolder: "Boş",
          status: "filled",
          lastUpdated: new Date().toISOString().split('T')[0],
        })),
      )
    } catch (error) {
      console.error("Organization fetch error:", error)
    }
  }

  const fetchImpartialityRecords = async () => {
    try {
      const mockData = await getMockData()
      const impartialityRecords = mockData.impartialityRecords || []
      setImpartialityRecords(
        impartialityRecords.map((item: any) => ({
          id: item.id,
          declarationType: item.type,
          title: item.title,
          description: item.description,
          declaredBy: item.reportedBy,
          riskLevel: item.riskLevel,
          status: item.status,
          createdAt: item.reportedDate,
          reviewDate: item.dueDate,
        })),
      )
    } catch (error) {
      console.error("Impartiality fetch error:", error)
    }
  }

  const fetchConfidentialityAgreements = async () => {
    try {
      const mockData = await getMockData()
      const confidentialityAgreements = mockData.confidentialityAgreements || []
      setConfidentialityAgreements(
        confidentialityAgreements.map((item: any) => ({
          id: item.id,
          agreementType: "employee_nda",
          title: `${item.employeeName} - Gizlilik Anlaşması`,
          signedBy: item.employeeName,
          signedDate: item.agreementDate || new Date().toISOString().split('T')[0],
          expiryDate: item.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: item.status || "active",
          department: item.department,
          description: item.scope || "Personel gizlilik anlaşması",
        })),
      )
    } catch (error) {
      console.error("Confidentiality fetch error:", error)
    }
  }

  const fetchManagementReviews = async () => {
    try {
      const mockData = await getMockData()
      const managementReviews = mockData.managementReviews || []
      setManagementReviews(
        managementReviews.map((item: any) => ({
          id: item.id,
          reviewDate: item.reviewDate,
          reviewType: item.type || "annual",
          chairperson: item.participants?.[0]?.name || "Dr. Mehmet Özkan",
          attendees: item.participants?.map((p: any) => p.name) || [],
          agenda: item.agenda?.map((a: any) => a.topic).join(", ") || "",
          decisions: item.decisions?.map((d: any) => d.decision).join(", ") || "",
          actionItems: item.actionItems?.map((ai: any) => ai.item).join(", ") || "",
          nextReviewDate: item.nextReviewDate,
          status: item.status || "completed",
        })),
      )
    } catch (error) {
      console.error("Management review fetch error:", error)
    }
  }

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Pozisyon başarıyla oluşturuldu")
      setIsOrgDialogOpen(false)
      setOrgFormData({
        positionTitle: "",
        department: "",
        reportingTo: "",
        responsibilities: "",
        qualifications: "",
        currentHolder: "",
      })
      fetchPositions()
    } catch (error) {
      toast.error("Pozisyon oluşturulurken hata oluştu")
    }
  }

  const handleImpartialitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Tarafsızlık kaydı başarıyla oluşturuldu")
      setIsImpartialityDialogOpen(false)
      setImpartialityFormData({
        declarationType: "",
        title: "",
        description: "",
        riskLevel: "low",
        mitigationActions: "",
        reviewDate: "",
      })
      fetchImpartialityRecords()
    } catch (error) {
      toast.error("Kayıt oluşturulurken hata oluştu")
    }
  }

  const handleConfidentialitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Gizlilik anlaşması başarıyla oluşturuldu")
      setIsConfidentialityDialogOpen(false)
      setConfidentialityFormData({
        agreementType: "",
        title: "",
        signedBy: "",
        department: "",
        description: "",
        expiryDate: "",
      })
      fetchConfidentialityAgreements()
    } catch (error) {
      toast.error("Anlaşma oluşturulurken hata oluştu")
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Yönetim gözden geçirmesi başarıyla oluşturuldu")
      setIsReviewDialogOpen(false)
      setReviewFormData({
        reviewDate: "",
        reviewType: "",
        chairperson: "",
        agenda: "",
        decisions: "",
        actionItems: "",
        nextReviewDate: "",
      })
      fetchManagementReviews()
    } catch (error) {
      toast.error("Gözden geçirme oluşturulurken hata oluştu")
    }
  }

  const handleRefresh = () => {
    fetchAllData()
  }

  const handleExport = () => {
    toast.success("Veri dışa aktarılıyor...")
  }

  const handleSettings = () => {
    toast.info("Ayarlar açılıyor...")
  }

  const handleNewRecord = () => {
    // Open the appropriate dialog based on current tab
    switch (activeTab) {
      case "organization":
        setIsOrgDialogOpen(true)
        break
      case "impartiality":
        setIsImpartialityDialogOpen(true)
        break
      case "confidentiality":
        setIsConfidentialityDialogOpen(true)
        break
      case "reviews":
        setIsReviewDialogOpen(true)
        break
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ManagementHeader
        onRefresh={handleRefresh}
        onExport={handleExport}
        onSettings={handleSettings}
        onNewRecord={handleNewRecord}
      />

      <ManagementStats
        positionsCount={positions.length}
        impartialityRecordsCount={impartialityRecords.length}
        confidentialityAgreementsCount={confidentialityAgreements.length}
        managementReviewsCount={managementReviews.length}
      />

      <ManagementTabs activeTab={activeTab} onTabChange={setActiveTab}>
        <ManagementContent
          positions={positions}
          impartialityRecords={impartialityRecords}
          confidentialityAgreements={confidentialityAgreements}
          managementReviews={managementReviews}
          onNewPosition={() => setIsOrgDialogOpen(true)}
          onNewImpartiality={() => setIsImpartialityDialogOpen(true)}
          onNewConfidentiality={() => setIsConfidentialityDialogOpen(true)}
          onNewReview={() => setIsReviewDialogOpen(true)}
        />
      </ManagementTabs>

      <ManagementDialogs
        isOrgDialogOpen={isOrgDialogOpen}
        setIsOrgDialogOpen={setIsOrgDialogOpen}
        orgFormData={orgFormData}
        setOrgFormData={setOrgFormData}
        onOrgSubmit={handleOrgSubmit}
        isImpartialityDialogOpen={isImpartialityDialogOpen}
        setIsImpartialityDialogOpen={setIsImpartialityDialogOpen}
        impartialityFormData={impartialityFormData}
        setImpartialityFormData={setImpartialityFormData}
        onImpartialitySubmit={handleImpartialitySubmit}
        isConfidentialityDialogOpen={isConfidentialityDialogOpen}
        setIsConfidentialityDialogOpen={setIsConfidentialityDialogOpen}
        confidentialityFormData={confidentialityFormData}
        setConfidentialityFormData={setConfidentialityFormData}
        onConfidentialitySubmit={handleConfidentialitySubmit}
        isReviewDialogOpen={isReviewDialogOpen}
        setIsReviewDialogOpen={setIsReviewDialogOpen}
        reviewFormData={reviewFormData}
        setReviewFormData={setReviewFormData}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  )
}
