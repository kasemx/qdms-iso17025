"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Mail, 
  Phone, 
  Edit, 
  Trash2, 
  Key, 
  UserCheck, 
  Shield,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Clock
} from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: "active" | "inactive" | "pending" | "suspended"
  lastLogin: string
  avatar: string | null
  roles: string[]
  isActive: boolean
  joinDate: string
  lastActivity: string
  permissions: string[]
  twoFactorEnabled: boolean
  loginAttempts: number
  sessionCount: number
  documentsCreated: number
  documentsApproved: number
  performance: {
    productivity: number
    compliance: number
    training: number
  }
  workload: {
    active: number
    pending: number
    completed: number
  }
}

type SortField = 'name' | 'email' | 'department' | 'lastLogin' | 'performance' | 'joinDate'
type SortDirection = 'asc' | 'desc'

interface UsersListProps {
  users: User[]
  filteredAndSortedUsers: User[]
  selectedUsers: number[]
  activeTab: string
  sortField: SortField
  sortDirection: SortDirection
  onTabChange: (value: string) => void
  onSelectAll: () => void
  onSelectUser: (id: number) => void
  onSort: (field: SortField) => void
  onEditUser: (user: User) => void
  onToggleUserStatus: (userId: number) => void
  onViewPermissions: (userId: number) => void
  onResetPassword: (userId: number) => void
}

export function UsersList({
  users,
  filteredAndSortedUsers,
  selectedUsers,
  activeTab,
  sortField,
  sortDirection,
  onTabChange,
  onSelectAll,
  onSelectUser,
  onSort,
  onEditUser,
  onToggleUserStatus,
  onViewPermissions,
  onResetPassword,
}: UsersListProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
        <TabsTrigger value="performance">Performans</TabsTrigger>
        <TabsTrigger value="security">Güvenlik</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Kullanıcılar</CardTitle>
                <CardDescription>
                  {filteredAndSortedUsers.length} kullanıcı listeleniyor
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0}
                  onCheckedChange={onSelectAll}
                />
                <Label className="text-sm">Tümünü Seç</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0}
                      onCheckedChange={onSelectAll}
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => onSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Kullanıcı</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Roller</TableHead>
                  <TableHead>Departman</TableHead>
                  <TableHead>Verimlilik</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Son Giriş</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.map((user: User) => (
                  <TableRow key={user.id} className={selectedUsers.includes(user.id) ? "bg-muted/50" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => onSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            ID: {user.id}
                            {user.twoFactorEnabled && (
                              <Shield className="w-3 h-3 ml-2 text-green-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.slice(0, 2).map((role: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        {user.roles.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.roles.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{user.department}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={user.performance.productivity} className="w-16 h-2" />
                        <span className="text-sm font-medium">{user.performance.productivity}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={
                          user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          'bg-gray-100 text-gray-600'
                        }
                      >
                        {user.status === 'active' ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        <div>{user.lastLogin}</div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {user.sessionCount} oturum
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onViewPermissions(user.id)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Yetkileri Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onResetPassword(user.id)}>
                            <Key className="w-4 h-4 mr-2" />
                            Şifre Sıfırla
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onToggleUserStatus(user.id)}
                            className={user.isActive ? "text-red-600" : "text-green-600"}
                          >
                            {user.isActive ? (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Devre Dışı Bırak
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Aktif Et
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="performance">
        <Card>
          <CardHeader>
            <CardTitle>Performans Metrikleri</CardTitle>
            <CardDescription>Kullanıcı performans ve verimlilik analizi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedUsers.map((user: User) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.department}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verimlilik</span>
                      <span className="text-sm font-medium">{user.performance.productivity}%</span>
                    </div>
                    <Progress value={user.performance.productivity} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Uyumluluk</span>
                      <span className="text-sm font-medium">{user.performance.compliance}%</span>
                    </div>
                    <Progress value={user.performance.compliance} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Eğitim</span>
                      <span className="text-sm font-medium">{user.performance.training}%</span>
                    </div>
                    <Progress value={user.performance.training} className="h-2" />
                  </div>
                  <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                    Doküman: {user.documentsCreated} oluşturdu, {user.documentsApproved} onayladı
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Güvenlik Durumu</CardTitle>
            <CardDescription>Kullanıcı güvenlik ayarları ve oturum bilgileri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAndSortedUsers.map((user: User) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{user.twoFactorEnabled ? '✓' : '✗'}</div>
                        <div className="text-xs text-muted-foreground">2FA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{user.sessionCount}</div>
                        <div className="text-xs text-muted-foreground">Oturum</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{user.loginAttempts}</div>
                        <div className="text-xs text-muted-foreground">Hatalı Giriş</div>
                      </div>
                      <Badge 
                        variant={user.loginAttempts === 0 ? 'default' : user.loginAttempts < 3 ? 'secondary' : 'destructive'}
                      >
                        {user.loginAttempts === 0 ? 'Güvenli' : user.loginAttempts < 3 ? 'Uyarı' : 'Risk'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}