import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Download, 
  Upload, 
  Settings, 
  X, 
  Activity, 
  Bell
} from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  permissions: string[]
}

interface TrainingPlansHeaderProps {
  currentUser: User
  setCurrentUser: (user: User) => void
  selectedPlans: string[]
  updateNotifications: Array<{
    id: string
    type: 'created' | 'updated' | 'deleted' | 'status_changed'
    message: string
    timestamp: Date
    planId: string
  }>
  isRealTimeEnabled: boolean
  setIsRealTimeEnabled: (enabled: boolean) => void
  showUpdateNotification: boolean
  setShowUpdateNotification: (show: boolean) => void
  onNewPlan: () => void
  onBulkStatusChange: () => void
  onBulkDelete: () => void
  onExport: () => void
  onImport: () => void
}

export function TrainingPlansHeader({
  currentUser,
  setCurrentUser,
  selectedPlans,
  updateNotifications,
  isRealTimeEnabled,
  setIsRealTimeEnabled,
  showUpdateNotification,
  setShowUpdateNotification,
  onNewPlan,
  onBulkStatusChange,
  onBulkDelete,
  onExport,
  onImport
}: TrainingPlansHeaderProps) {
  const hasPermission = (permission: string) => {
    return currentUser.permissions.includes(permission)
  }

  const canExport = () => {
    return hasPermission("export") || hasPermission("read")
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      admin: "Yönetici - Tüm yetkiler",
      instructor: "Eğitmen - Okuma/Yazma",
      participant: "Katılımcı - Sadece okuma",
      viewer: "Görüntüleyici - Sadece okuma"
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Eğitim Planları</h1>
        <p className="text-muted-foreground">Personel eğitim planlaması ve takibi</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="userRole">Kullanıcı Rolü:</Label>
          <Select 
            value={currentUser.role} 
            onValueChange={(role) => {
              const rolePermissions = {
                admin: ["read", "write", "delete", "export", "email"],
                instructor: ["read", "write", "email"],
                participant: ["read"],
                viewer: ["read"]
              }
              setCurrentUser({
                ...currentUser,
                role,
                permissions: rolePermissions[role as keyof typeof rolePermissions] || []
              })
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Yönetici</SelectItem>
              <SelectItem value="instructor">Eğitmen</SelectItem>
              <SelectItem value="participant">Katılımcı</SelectItem>
              <SelectItem value="viewer">Görüntüleyici</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {getRoleDisplayName(currentUser.role)}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
            className={isRealTimeEnabled ? "bg-green-100 text-green-800" : ""}
          >
            <Activity className="h-4 w-4 mr-2" />
            {isRealTimeEnabled ? "Gerçek Zamanlı Açık" : "Gerçek Zamanlı Kapalı"}
          </Button>
          
          {updateNotifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUpdateNotification(!showUpdateNotification)}
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Güncellemeler ({updateNotifications.length})
              {updateNotifications.length > 0 && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">{updateNotifications.length}</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        {selectedPlans.length > 0 && hasPermission("delete") && (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBulkStatusChange}
            >
              <Settings className="h-4 w-4 mr-2" />
              Durum Değiştir ({selectedPlans.length})
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onBulkDelete}
            >
              <X className="h-4 w-4 mr-2" />
              Seçilenleri Sil ({selectedPlans.length})
            </Button>
          </>
        )}
        
        {canExport() && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
        )}
        
        {hasPermission("write") && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onImport}
          >
            <Upload className="h-4 w-4 mr-2" />
            İçe Aktar
          </Button>
        )}
        
        {hasPermission("write") && (
          <Button size="sm" onClick={onNewPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Plan
          </Button>
        )}
      </div>
    </div>
  )
}