"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Grid3X3,
  List,
  Search,
  Settings
} from "lucide-react"

interface FilterOption {
  id: string
  name: string
  count: number
  color?: string
}

interface CalibrationFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  selectedPriority: string
  setSelectedPriority: (priority: string) => void
  selectedRiskLevel: string
  setSelectedRiskLevel: (risk: string) => void
  selectedWorkflowStage: string
  setSelectedWorkflowStage: (stage: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  selectedPrograms: string[]
  filteredCount: number
  onBulkAction: () => void
  statusFilters: FilterOption[]
  priorityFilters: FilterOption[]
  riskLevelFilters: FilterOption[]
  workflowStageFilters: FilterOption[]
}

export function CalibrationFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedRiskLevel,
  setSelectedRiskLevel,
  selectedWorkflowStage,
  setSelectedWorkflowStage,
  viewMode,
  setViewMode,
  showAdvancedFilters,
  setShowAdvancedFilters,
  selectedPrograms,
  filteredCount,
  onBulkAction,
  statusFilters,
  priorityFilters,
  riskLevelFilters,
  workflowStageFilters
}: CalibrationFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kalibrasyon Filtreleme</CardTitle>
        <CardDescription>Kalibrasyon programlarını durum, öncelik ve ekipman bazında filtreleyin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Arama</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ekipman ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Durum</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    <div className="flex items-center gap-2">
                      {status.color && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: status.color }}
                        />
                      )}
                      {status.name} ({status.count})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Öncelik</label>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik seçin" />
              </SelectTrigger>
              <SelectContent>
                {priorityFilters.map((priority) => (
                  <SelectItem key={priority.id} value={priority.id}>
                    <div className="flex items-center gap-2">
                      {priority.color && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: priority.color }}
                        />
                      )}
                      {priority.name} ({priority.count})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Risk Seviyesi</label>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Risk seçin" />
              </SelectTrigger>
              <SelectContent>
                {riskLevelFilters.map((risk) => (
                  <SelectItem key={risk.id} value={risk.id}>
                    <div className="flex items-center gap-2">
                      {risk.color && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: risk.color }}
                        />
                      )}
                      {risk.name} ({risk.count})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {showAdvancedFilters && (
          <div className="grid gap-4 md:grid-cols-4 border-t pt-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">İş Akışı Aşaması</label>
              <Select value={selectedWorkflowStage} onValueChange={setSelectedWorkflowStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Aşama seçin" />
                </SelectTrigger>
                <SelectContent>
                  {workflowStageFilters.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      <div className="flex items-center gap-2">
                        {stage.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: stage.color }}
                          />
                        )}
                        {stage.name} ({stage.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Otomasyon Durumu</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Otomasyon seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="enabled">Otomatik</SelectItem>
                  <SelectItem value="disabled">Manuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Uygunluk Durumu</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Uygunluk seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="compliant">Uygun</SelectItem>
                  <SelectItem value="non-compliant">Uygunsuz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Görünüm</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Gelişmiş Filtreler
              {showAdvancedFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>
            {selectedPrograms.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBulkAction}
              >
                <Settings className="h-4 w-4 mr-2" />
                Toplu İşlem ({selectedPrograms.length})
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredCount} sonuç listeleniyor
          </div>
        </div>
      </CardContent>
    </Card>
  )
}