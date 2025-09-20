"use client"

import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { UsersHeader } from "@/components/users/users-header"
import { UsersStats } from "@/components/users/users-stats"
import { UsersFilters } from "@/components/users/users-filters"
import { UsersList } from "@/components/users/users-list"
import { UsersDialogs } from "@/components/users/users-dialogs"
import { PageLayout, LoadingState } from "@/components/common"

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

interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  pendingUsers: number
  adminUsers: number
  averageProductivity: number
  loginRate: number
  userGrowth: number
}

type SortField = 'name' | 'email' | 'department' | 'lastLogin' | 'performance' | 'joinDate'
type SortDirection = 'asc' | 'desc'

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    roles: [] as string[],
    isActive: true,
    twoFactorEnabled: false
  })

  // Enhanced mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@sirket.com",
      phone: "+90 532 123 4567",
      role: "Kalite Müdürü",
      department: "Kalite Güvence",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      avatar: null,
      roles: ["Kalite Sorumlusu", "Onaylayan"],
      isActive: true,
      joinDate: "2020-03-15",
      lastActivity: "2024-01-15 14:30",
      permissions: ["documents.create", "documents.approve", "users.view"],
      twoFactorEnabled: true,
      loginAttempts: 0,
      sessionCount: 5,
      documentsCreated: 45,
      documentsApproved: 120,
      performance: {
        productivity: 92,
        compliance: 98,
        training: 85
      },
      workload: {
        active: 8,
        pending: 3,
        completed: 45
      }
    },
    {
      id: 2,
      name: "Fatma Demir",
      email: "fatma.demir@sirket.com",
      phone: "+90 533 987 6543",
      role: "Doküman Uzmanı",
      department: "Kalite Güvence",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      avatar: null,
      roles: ["Doküman Sahibi", "İnceleyen"],
      isActive: true,
      joinDate: "2021-06-20",
      lastActivity: "2024-01-15 09:15",
      permissions: ["documents.create", "documents.edit", "documents.review"],
      twoFactorEnabled: false,
      loginAttempts: 0,
      sessionCount: 3,
      documentsCreated: 67,
      documentsApproved: 0,
      performance: {
        productivity: 88,
        compliance: 95,
        training: 92
      },
      workload: {
        active: 12,
        pending: 5,
        completed: 67
      }
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet.kaya@sirket.com",
      phone: "+90 534 456 7890",
      role: "Operasyon Müdürü",
      department: "Üretim",
      status: "inactive",
      lastLogin: "2024-01-10 16:45",
      avatar: null,
      roles: ["Okuyucu"],
      isActive: false,
      joinDate: "2019-11-10",
      lastActivity: "2024-01-10 16:45",
      permissions: ["documents.view"],
      twoFactorEnabled: false,
      loginAttempts: 3,
      sessionCount: 1,
      documentsCreated: 12,
      documentsApproved: 0,
      performance: {
        productivity: 65,
        compliance: 78,
        training: 60
      },
      workload: {
        active: 2,
        pending: 1,
        completed: 12
      }
    },
  ])

  // Calculate stats
  const stats = useMemo((): UserStats => {
    const activeUsers = users.filter(u => u.status === 'active').length
    const adminUsers = users.filter(u => u.roles.some(r => r.includes('Yönetici') || r.includes('Müdür'))).length
    const avgProductivity = Math.round(users.reduce((sum, u) => sum + u.performance.productivity, 0) / users.length)
    const loginRate = Math.round((users.filter(u => u.lastLogin.includes('2024-01-15')).length / users.length) * 100)
    
    return {
      totalUsers: users.length,
      activeUsers,
      inactiveUsers: users.filter(u => u.status === 'inactive').length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      adminUsers,
      averageProductivity: avgProductivity,
      loginRate,
      userGrowth: Math.floor(Math.random() * 15) + 5 // Mock growth
    }
  }, [users])

  // Enhanced filtering and sorting
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.role.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
      const matchesRole = selectedRole === 'all' || user.roles.some(role => role === selectedRole)
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesRole
    })

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any
      
      switch (sortField) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'email':
          aValue = a.email
          bValue = b.email
          break
        case 'department':
          aValue = a.department
          bValue = b.department
          break
        case 'lastLogin':
          aValue = new Date(a.lastLogin)
          bValue = new Date(b.lastLogin)
          break
        case 'performance':
          aValue = a.performance.productivity
          bValue = b.performance.productivity
          break
        case 'joinDate':
          aValue = new Date(a.joinDate)
          bValue = new Date(b.joinDate)
          break
        default:
          aValue = a.name
          bValue = b.name
      }
      
      if (typeof aValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortDirection === 'asc' ? comparison : -comparison
      } else {
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        return sortDirection === 'asc' ? comparison : -comparison
      }
    })

    return filtered
  }, [users, searchTerm, selectedDepartment, selectedStatus, selectedRole, sortField, sortDirection])

  const uniqueRoles = useMemo(() => {
    const allRoles = users.flatMap(u => u.roles)
    return Array.from(new Set(allRoles))
  }, [users])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredAndSortedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredAndSortedUsers.map(u => u.id))
    }
  }

  const handleSelectUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedUsers.length === 0) return
    
    const actionText = action === 'activate' ? 'aktif etmek' : action === 'deactivate' ? 'pasif etmek' : 'silmek'
    if (!confirm(`${selectedUsers.length} kullanıcıyı ${actionText} istediğinizden emin misiniz?`)) {
      return
    }

    try {
      setIsLoading(true)
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (action === 'delete') {
        setUsers(prev => prev.filter(u => !selectedUsers.includes(u.id)))
        toast.success(`${selectedUsers.length} kullanıcı başarıyla silindi`)
      } else {
        const newStatus = action === 'activate'
        setUsers(prev => prev.map(u => 
          selectedUsers.includes(u.id) 
            ? { ...u, isActive: newStatus, status: newStatus ? 'active' as const : 'inactive' as const }
            : u
        ))
        toast.success(`${selectedUsers.length} kullanıcı başarıyla ${actionText}di`)
      }
      
      setSelectedUsers([])
    } catch (error) {
      toast.error(`Toplu işlem sırasında hata oluştu`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Ad,E-posta,Departman,Rol,Durum,Son Giriş,Verimlilik\n" +
      filteredAndSortedUsers.map(user => 
        `${user.name},${user.email},${user.department},${user.role},${user.status},${user.lastLogin},${user.performance.productivity}%`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "kullanicilar.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Kullanıcı listesi başarıyla dışa aktarıldı")
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      roles: [],
      isActive: true,
      twoFactorEnabled: false
    })
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    const [firstName, ...lastNameParts] = user.name.split(" ")
    setFormData({
      firstName,
      lastName: lastNameParts.join(" "),
      email: user.email,
      phone: user.phone,
      department: user.department,
      position: user.role,
      roles: user.roles,
      isActive: user.isActive,
      twoFactorEnabled: user.twoFactorEnabled
    })
    setIsEditUserOpen(true)
  }

  const handleSaveUser = () => {
    // API çağrısı burada yapılacak
    console.log("Kullanıcı kaydedildi:", formData)
    setIsAddUserOpen(false)
    setIsEditUserOpen(false)
    toast.success("Kullanıcı başarıyla kaydedildi")
  }

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, isActive: !user.isActive, status: user.isActive ? "inactive" : "active" }
          : user,
      ),
    )
    toast.success("Kullanıcı durumu güncellendi")
  }

  const handleViewPermissions = async (userId: number) => {
    try {
      // Mock API call
      toast.success("Kullanıcı yetkileri görüntülendi")
      console.log("Kullanıcı yetkileri:", userId)
    } catch (error) {
      toast.error("Yetkiler yüklenirken hata oluştu")
    }
  }

  const handleResetPassword = async (userId: number) => {
    try {
      // Mock API call
      toast.success("Şifre sıfırlama e-postası gönderildi")
    } catch (error) {
      toast.error("Şifre sıfırlanırken hata oluştu")
    }
  }

  return (
    <PageLayout
      title="Kullanıcı Yönetimi"
      description="Sistem kullanıcılarını ve rollerini yönetin"
      actions={
        <UsersHeader
          selectedUsers={selectedUsers}
          onAddUser={handleAddUser}
          onExport={handleExport}
          onBulkAction={handleBulkAction}
        />
      }
    >
      <UsersStats stats={stats} isLoading={isLoading} />

      <UsersFilters
        searchTerm={searchTerm}
        selectedDepartment={selectedDepartment}
        selectedStatus={selectedStatus}
        selectedRole={selectedRole}
        activeTab={activeTab}
        showAdvancedFilters={showAdvancedFilters}
        uniqueRoles={uniqueRoles}
        onSearchChange={setSearchTerm}
        onDepartmentChange={setSelectedDepartment}
        onStatusChange={setSelectedStatus}
        onRoleChange={setSelectedRole}
        onTabChange={setActiveTab}
        onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
      />

      <UsersList
        users={users}
        filteredAndSortedUsers={filteredAndSortedUsers}
        selectedUsers={selectedUsers}
        activeTab={activeTab}
        sortField={sortField}
        sortDirection={sortDirection}
        onTabChange={setActiveTab}
        onSelectAll={handleSelectAll}
        onSelectUser={handleSelectUser}
        onSort={handleSort}
        onEditUser={handleEditUser}
        onToggleUserStatus={handleToggleUserStatus}
        onViewPermissions={handleViewPermissions}
        onResetPassword={handleResetPassword}
      />

      <UsersDialogs
        isAddUserOpen={isAddUserOpen}
        isEditUserOpen={isEditUserOpen}
        editingUser={editingUser}
        formData={formData}
        onAddUserOpenChange={setIsAddUserOpen}
        onEditUserOpenChange={setIsEditUserOpen}
        onFormDataChange={setFormData}
        onSaveUser={handleSaveUser}
      />
    </PageLayout>
  )
}
