import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Activity,
  Bell,
  Settings
} from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  permissions: string[]
}

interface DocumentsHeaderProps {
  selectedDocuments: string[]
  currentUser: User
  onNewDocument: () => void
  onBulkDownload: () => void
  onBulkApprove: () => void
  onBulkReject: () => void
  onBulkArchive: () => void
  onBulkDelete: () => void
  onImport: () => void
  onExport: () => void
  canPerformBulkOperation: (operation: string) => boolean
  isRealTimeEnabled: boolean
  onRealTimeToggle: (enabled: boolean) => void
  updateNotifications: any[]
  onClearNotifications: () => void
}

export function DocumentsHeader({
  selectedDocuments,
  currentUser,
  onNewDocument,
  onBulkDownload,
  onBulkApprove,
  onBulkReject,
  onBulkArchive,
  onBulkDelete,
  onImport,
  onExport,
  canPerformBulkOperation,
  isRealTimeEnabled,
  onRealTimeToggle,
  updateNotifications,
  onClearNotifications
}: DocumentsHeaderProps) {
  
  const hasPermission = (permission: string): boolean => {
    return currentUser.permissions.includes(permission)
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dokümanlar</h1>
        <p className="text-muted-foreground">ISO 17025 uyumlu doküman yönetim sistemi</p>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Real-time monitoring toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRealTimeToggle(!isRealTimeEnabled)}
          className={isRealTimeEnabled ? "bg-green-100 text-green-800" : ""}
        >
          <Activity className="h-4 w-4 mr-2" />
          {isRealTimeEnabled ? "Gerçek Zamanlı Açık" : "Gerçek Zamanlı Kapalı"}
        </Button>

        {/* Notifications */}
        {updateNotifications.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearNotifications}
            className="relative"
          >
            <Bell className="h-4 w-4 mr-2" />
            Güncellemeler ({updateNotifications.length})
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
          </Button>
        )}

        {/* Bulk Operations */}
        {selectedDocuments.length > 0 && (
          <>
            <Badge variant="secondary" className="px-3 py-1">
              {selectedDocuments.length} seçili
            </Badge>
            
            <Button variant="outline" onClick={onBulkDownload}>
              <Download className="mr-2 h-4 w-4" />
              Toplu İndir ({selectedDocuments.length})
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Toplu İşlemler ({selectedDocuments.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toplu İşlemler</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {hasPermission("approve") && (
                  <DropdownMenuItem 
                    onClick={onBulkApprove} 
                    disabled={!canPerformBulkOperation("approve")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Toplu Onayla
                  </DropdownMenuItem>
                )}

                {hasPermission("approve") && (
                  <DropdownMenuItem 
                    onClick={onBulkReject} 
                    disabled={!canPerformBulkOperation("reject")}
                  >
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    Toplu Reddet
                  </DropdownMenuItem>
                )}

                {hasPermission("write") && (
                  <DropdownMenuItem 
                    onClick={onBulkArchive} 
                    disabled={!canPerformBulkOperation("archive")}
                  >
                    <Archive className="mr-2 h-4 w-4 text-yellow-600" />
                    Toplu Arşivle
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {hasPermission("delete") && (
                  <DropdownMenuItem
                    onClick={onBulkDelete}
                    disabled={!canPerformBulkOperation("delete")}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Toplu Sil
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2">
          {hasPermission("export") && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          )}
          
          {hasPermission("write") && (
            <>
              <Button variant="outline" size="sm" onClick={onImport}>
                <Upload className="h-4 w-4 mr-2" />
                İçe Aktar
              </Button>
              
              <Button size="sm" onClick={onNewDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Doküman
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}