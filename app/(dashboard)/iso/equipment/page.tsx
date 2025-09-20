"use client"

import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/ui/page-header"
import { PageSearch } from "@/components/ui/page-search"
import { EquipmentHeader } from "@/components/equipment/equipment-header"
import { EquipmentStats } from "@/components/equipment/equipment-stats"
import { EquipmentFilters } from "@/components/equipment/equipment-filters"
import { EquipmentList } from "@/components/equipment/equipment-list"
import { CalibrationRecords } from "@/components/equipment/calibration-records"

// Lazy load mock data for better performance
const getMockData = () => import("@/lib/mock-data").then(module => module.mockData)

interface Equipment {
  id: string
  name: string
  model: string
  serialNumber: string
  manufacturer: string
  location: string
  status: string
  lastCalibration: string
  nextCalibration: string
  calibrationInterval: string
  responsible: string
  category: string
  purchaseDate?: string
  specifications?: string
  operatingConditions?: string
  measurementUncertainty?: string
  referenceStandards?: string
  maintenanceSchedule?: string
  operatorAuthorizations?: string
  environmentalRequirements?: string
  validationStatus?: string
  softwareVersion?: string
  maintenanceHistory: MaintenanceRecord[]
  utilizationRate: number
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  maintenanceStatus: 'current' | 'due' | 'overdue'
  costCenter: string
  assetValue: number
  depreciation: number
  warrantyCoverage: {
    isActive: boolean
    expiryDate: string
    provider: string
  }
  performanceMetrics: {
    uptime: number
    reliability: number
    efficiency: number
  }
  compliance: {
    iso17025: boolean
    gmp: boolean
    fda: boolean
    lastAuditDate: string
  }
}

interface MaintenanceRecord {
  id: string
  equipmentId: string
  maintenanceDate: string
  maintenanceType: 'preventive' | 'corrective' | 'calibration' | 'validation'
  description: string
  performedBy: string
  duration: number
  cost: number
  partsReplaced: string[]
  nextMaintenanceDate: string
  status: 'completed' | 'in_progress' | 'scheduled' | 'cancelled'
  notes: string
}

interface CalibrationRecord {
  id: string
  equipmentId: string
  equipmentName: string
  calibrationDate: string
  calibratedBy: string
  certificateNumber: string
  nextDueDate: string
  status: string
  results: string
  notes: string
  calibrationType: 'internal' | 'external' | 'self'
  uncertainty: string
  traceability: string
  cost: number
  accreditationBody: string
  environmentalConditions: {
    temperature: string
    humidity: string
    pressure: string
  }
}

type SortField = 'name' | 'status' | 'nextCalibration' | 'nextMaintenance' | 'utilizationRate' | 'location'
type SortDirection = 'asc' | 'desc'

export default function EquipmentPage() {
  // Core state
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [calibrationRecords, setCalibrationRecords] = useState<CalibrationRecord[]>([])
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("inventory")

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [utilizationFilter, setUtilizationFilter] = useState("all")
  const [maintenanceFilter, setMaintenanceFilter] = useState("all")
  const [warrantyFilter, setWarrantyFilter] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Selection and sorting state
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // UI state
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)

  // User state (mock for now)
  const [currentUser] = useState({
    id: "user-1",
    name: "Admin User",
    role: "admin",
    permissions: ["read", "write", "delete", "export"]
  })

  // Data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const mockData = await getMockData()
        
        // Set equipment data with defaults for missing properties
        const equipmentData = mockData.equipmentInventory?.map((item: any) => ({
          ...item,
          // Map missing properties
          nextCalibration: item.nextCalibration || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
          lastCalibration: item.lastCalibration || new Date().toISOString(),
          maintenanceHistory: item.history || [],
          utilizationRate: item.utilizationRate || Math.floor(Math.random() * 100),
          lastMaintenanceDate: item.maintenance?.lastMaintenance || new Date().toISOString(),
          nextMaintenanceDate: item.maintenance?.nextMaintenance || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          maintenanceStatus: item.maintenanceStatus || 'current',
          costCenter: item.costCenter || 'CC001',
          assetValue: item.cost || 50000,
          depreciation: item.depreciation || 10,
          warrantyCoverage: {
            isActive: item.warrantyExpiry ? new Date(item.warrantyExpiry) > new Date() : true,
            expiryDate: item.warrantyExpiry || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            provider: item.supplier || 'Manufacturer'
          },
          performanceMetrics: item.performanceMetrics || {
            uptime: Math.floor(Math.random() * 100),
            reliability: Math.floor(Math.random() * 100),
            efficiency: Math.floor(Math.random() * 100)
          },
          compliance: item.compliance || {
            iso17025: true,
            gmp: false,
            fda: false,
            lastAuditDate: new Date().toISOString()
          }
        })) || []
        
        setEquipment(equipmentData)
        // Set calibration records with defaults for missing properties
        const calibrationData = mockData.calibrationRecords?.map((item: any) => ({
          ...item,
          notes: item.notes || "",
          calibrationType: item.calibrationType || 'external',
          traceability: item.traceability || "NIST",
          accreditationBody: item.accreditationBody || "TÜRKAK"
        })) || []
        
        setCalibrationRecords(calibrationData)
        // Create maintenance records from equipment history
        const maintenanceData = equipmentData.flatMap((eq: any) => 
          (eq.history || []).map((hist: any, index: number) => ({
            id: `maint-${eq.id}-${index}`,
            equipmentId: eq.id,
            maintenanceDate: hist.date,
            maintenanceType: hist.action === 'Kalibrasyon' ? 'calibration' : 'preventive',
            description: hist.description,
            performedBy: hist.performedBy,
            duration: 2, // hours
            cost: Math.floor(Math.random() * 1000) + 500,
            partsReplaced: [],
            nextMaintenanceDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed' as const,
            notes: hist.description || ""
          }))
        )
        
        setMaintenanceRecords(maintenanceData)
      } catch (error) {
        console.error("Error loading equipment data:", error)
        toast.error("Veriler yüklenirken hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtered equipment calculation
  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesLocation = locationFilter === "all" || item.location === locationFilter
      
      const matchesUtilization = utilizationFilter === "all" || (() => {
        switch (utilizationFilter) {
          case "90-100": return item.utilizationRate >= 90
          case "80-89": return item.utilizationRate >= 80 && item.utilizationRate < 90
          case "70-79": return item.utilizationRate >= 70 && item.utilizationRate < 80
          case "0-69": return item.utilizationRate < 70
          default: return true
        }
      })()
      
      const matchesMaintenance = maintenanceFilter === "all" || item.maintenanceStatus === maintenanceFilter
      
      const matchesWarranty = warrantyFilter === "all" || (() => {
        switch (warrantyFilter) {
          case "active": return item.warrantyCoverage.isActive
          case "expired": return !item.warrantyCoverage.isActive
          default: return true
        }
      })()

      return matchesSearch && matchesStatus && matchesCategory && 
             matchesLocation && matchesUtilization && matchesMaintenance && matchesWarranty
    }).sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortField) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'nextCalibration':
          aValue = new Date(a.nextCalibration)
          bValue = new Date(b.nextCalibration)
          break
        case 'nextMaintenance':
          aValue = new Date(a.nextMaintenanceDate)
          bValue = new Date(b.nextMaintenanceDate)
          break
        case 'utilizationRate':
          aValue = a.utilizationRate
          bValue = b.utilizationRate
          break
        case 'location':
          aValue = a.location
          bValue = b.location
          break
        default:
          aValue = a.name
          bValue = b.name
      }
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1)
    })
  }, [equipment, searchTerm, statusFilter, categoryFilter, locationFilter, utilizationFilter, maintenanceFilter, warrantyFilter, sortField, sortDirection])

  // Event handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipment(filteredEquipment.map((item) => item.id))
    } else {
      setSelectedEquipment([])
    }
  }

  const handleSelectEquipment = (equipmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipmentId])
    } else {
      setSelectedEquipment(selectedEquipment.filter((id) => id !== equipmentId))
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setLocationFilter("all")
    setUtilizationFilter("all")
    setMaintenanceFilter("all")
    setWarrantyFilter("all")
  }

  const handleSearch = (searchData: any) => {
    setSearchTerm(searchData.query || "")
    if (searchData.filters) {
      setStatusFilter(searchData.filters.status || "all")
      setCategoryFilter(searchData.filters.category || "all")
      setLocationFilter(searchData.filters.location || "all")
    }
  }

  // Permission check helper
  const hasPermission = (permission: string): boolean => {
    return currentUser.permissions.includes(permission)
  }

  // Action handlers (placeholder implementations)
  const handleNewEquipment = () => {
    toast.info("Yeni ekipman ekleme formu açılacak")
  }

  const handleBulkCalibration = () => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman için kalibrasyon planlandı`)
  }

  const handleBulkMaintenance = () => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman için bakım planlandı`)
  }

  const handleBulkDelete = () => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman silindi`)
    setSelectedEquipment([])
  }

  const handleExport = () => {
    toast.success("Ekipman verileri dışa aktarıldı")
  }

  const handleImport = () => {
    toast.info("İçe aktarma formu açılacak")
  }

  const handleQRGenerate = () => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman için QR kod oluşturuldu`)
  }

  const handleRefreshData = async () => {
    toast.info("Veriler yenileniyor...")
    // Reload data logic here
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <EquipmentHeader
        selectedEquipment={selectedEquipment}
        onNewEquipment={handleNewEquipment}
        onBulkCalibration={handleBulkCalibration}
        onBulkMaintenance={handleBulkMaintenance}
        onBulkDelete={handleBulkDelete}
        onExport={handleExport}
        onImport={handleImport}
        onQRGenerate={handleQRGenerate}
        onRefreshData={handleRefreshData}
        hasPermission={hasPermission}
        isRealTimeEnabled={isRealTimeEnabled}
        onRealTimeToggle={setIsRealTimeEnabled}
      />

      <EquipmentStats
        equipment={equipment}
        maintenanceRecords={maintenanceRecords}
      />

      <EquipmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        utilizationFilter={utilizationFilter}
        setUtilizationFilter={setUtilizationFilter}
        maintenanceFilter={maintenanceFilter}
        setMaintenanceFilter={setMaintenanceFilter}
        warrantyFilter={warrantyFilter}
        setWarrantyFilter={setWarrantyFilter}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        equipment={equipment}
        onClearFilters={handleClearFilters}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Ekipman Envanteri</TabsTrigger>
          <TabsTrigger value="calibration">Kalibrasyon Kayıtları</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Search Component */}
          <PageSearch
            items={equipment.map(item => ({
              id: item.id,
              title: item.name,
              description: `${item.model} - ${item.serialNumber}`,
              status: item.status,
              date: item.purchaseDate,
              metadata: {
                manufacturer: item.manufacturer,
                location: item.location,
                category: item.category,
                responsible: item.responsible
              }
            }))}
            onSearch={handleSearch}
            onItemSelect={(item) => {
              const equipmentItem = equipment.find(e => e.id === item.id)
              if (equipmentItem) {
                toast.info(`${equipmentItem.name} düzenleme formu açılacak`)
              }
            }}
            filters={[
              {
                id: "status",
                label: "Durum",
                type: "select",
                options: [
                  { value: "active", label: "Aktif" },
                  { value: "inactive", label: "Pasif" },
                  { value: "maintenance", label: "Bakımda" },
                  { value: "calibration", label: "Kalibrasyonda" }
                ]
              },
              {
                id: "category",
                label: "Kategori",
                type: "select",
                options: [
                  { value: "measurement", label: "Ölçüm" },
                  { value: "test", label: "Test" },
                  { value: "calibration", label: "Kalibrasyon" }
                ]
              },
              {
                id: "location",
                label: "Konum",
                type: "select",
                options: [
                  { value: "Laboratuvar A", label: "Laboratuvar A" },
                  { value: "Laboratuvar B", label: "Laboratuvar B" },
                  { value: "Depo", label: "Depo" }
                ]
              }
            ]}
            placeholder="Ekipman ara... (Ctrl+F)"
            className="mb-4"
          />

          <EquipmentList
            equipment={filteredEquipment}
            selectedEquipment={selectedEquipment}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onSelectEquipment={handleSelectEquipment}
            onSelectAll={handleSelectAll}
            onViewDetails={(equipment) => toast.info(`${equipment.name} detayları gösterilecek`)}
            onEdit={(equipment) => toast.info(`${equipment.name} düzenlenecek`)}
            onDelete={(equipment) => toast.info(`${equipment.name} silinecek`)}
            onScheduleCalibration={(equipment) => toast.info(`${equipment.name} için kalibrasyon planlanacak`)}
            onScheduleMaintenance={(equipment) => toast.info(`${equipment.name} için bakım planlanacak`)}
            onGenerateQR={(equipment) => toast.info(`${equipment.name} için QR kod oluşturulacak`)}
            hasPermission={hasPermission}
          />
        </TabsContent>

        <TabsContent value="calibration" className="space-y-4">
          <CalibrationRecords
            calibrationRecords={calibrationRecords}
            onViewDetails={(record) => toast.info(`${record.equipmentName} kalibrasyon detayları gösterilecek`)}
            onEdit={(record) => toast.info(`${record.equipmentName} kalibrasyon kaydı düzenlenecek`)}
            onGenerateReport={(record) => toast.info(`${record.equipmentName} kalibrasyon raporu oluşturulacak`)}
            onScheduleNext={(record) => toast.info(`${record.equipmentName} sonraki kalibrasyon planlanacak`)}
            onDownloadCertificate={(record) => toast.info(`${record.certificateNumber} sertifikası indirilecek`)}
            onNewCalibration={() => toast.info("Yeni kalibrasyon kaydı eklenecek")}
            hasPermission={hasPermission}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}