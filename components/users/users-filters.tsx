"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"

interface UsersFiltersProps {
  searchTerm: string
  selectedDepartment: string
  selectedStatus: string
  selectedRole: string
  activeTab: string
  showAdvancedFilters: boolean
  uniqueRoles: string[]
  onSearchChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onStatusChange: (value: string) => void
  onRoleChange: (value: string) => void
  onTabChange: (value: string) => void
  onToggleAdvancedFilters: () => void
}

export function UsersFilters({
  searchTerm,
  selectedDepartment,
  selectedStatus,
  selectedRole,
  activeTab,
  showAdvancedFilters,
  uniqueRoles,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onRoleChange,
  onTabChange,
  onToggleAdvancedFilters,
}: UsersFiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Kullanıcı, e-posta veya role göre ara..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={onToggleAdvancedFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtreler
              {showAdvancedFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Departman</Label>
                <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Departmanlar</SelectItem>
                    <SelectItem value="Kalite Güvence">Kalite Güvence</SelectItem>
                    <SelectItem value="Üretim">Üretim</SelectItem>
                    <SelectItem value="Laboratuvar">Laboratuvar</SelectItem>
                    <SelectItem value="Bilgi İşlem">Bilgi İşlem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Durum</Label>
                <Select value={selectedStatus} onValueChange={onStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="suspended">Askıya Alınmış</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={selectedRole} onValueChange={onRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Roller</SelectItem>
                    {uniqueRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Görünüm</Label>
                <Select value={activeTab} onValueChange={onTabChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Genel Bakış</SelectItem>
                    <SelectItem value="performance">Performans</SelectItem>
                    <SelectItem value="security">Güvenlik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}