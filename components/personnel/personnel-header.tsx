"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, FileDown, Upload, MoreVertical, Users, Settings } from "lucide-react"

interface PersonnelHeaderProps {
  onNewPersonnel: () => void
  onNewTraining: () => void
  selectedCount: number
  onBulkAction: (action: string) => void
}

export function PersonnelHeader({ 
  onNewPersonnel, 
  onNewTraining, 
  selectedCount, 
  onBulkAction 
}: PersonnelHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Personel Yönetimi</h1>
        <p className="text-muted-foreground">
          Personel yetkinliklerini ve eğitim planlarını yönetin
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedCount} seçili
                <MoreVertical className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkAction('update')}>
                <Settings className="mr-2 h-4 w-4" />
                Toplu Güncelle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction('export')}>
                <FileDown className="mr-2 h-4 w-4" />
                Dışa Aktar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onBulkAction('delete')}
                className="text-destructive"
              >
                Toplu Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          İçe Aktar
        </Button>
        
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Rapor
        </Button>
        
        <Button variant="outline" size="sm" onClick={onNewTraining}>
          <Users className="mr-2 h-4 w-4" />
          Yeni Eğitim
        </Button>
        
        <Button onClick={onNewPersonnel}>
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Personel
        </Button>
      </div>
    </div>
  )
}