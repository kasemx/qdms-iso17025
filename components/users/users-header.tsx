"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  UserPlus, 
  Download, 
  Users, 
  ChevronDown, 
  CheckCircle2, 
  UserMinus, 
  Trash2, 
  Shield 
} from "lucide-react"

interface UsersHeaderProps {
  selectedUsers: number[]
  onAddUser: () => void
  onExport: () => void
  onBulkAction: (action: 'activate' | 'deactivate' | 'delete') => void
}

export function UsersHeader({ 
  selectedUsers, 
  onAddUser, 
  onExport, 
  onBulkAction 
}: UsersHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Kullanıcı Yönetimi</h1>
        <p className="text-muted-foreground mt-1">Sistem kullanıcılarını ve rollerini yönetin</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Dışa Aktar
        </Button>
        {selectedUsers.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="destructive">
                <Users className="w-4 h-4 mr-2" />
                Seçilenler ({selectedUsers.length})
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkAction('activate')}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Aktif Et
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction('deactivate')}>
                <UserMinus className="w-4 h-4 mr-2" />
                Pasif Et
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction('delete')} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="outline" asChild>
          <a href="/roles">
            <Shield className="w-4 h-4 mr-2" />
            Rol Yönetimi
          </a>
        </Button>
        <Button onClick={onAddUser} className="bg-primary hover:bg-primary/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Yeni Kullanıcı
        </Button>
      </div>
    </div>
  )
}