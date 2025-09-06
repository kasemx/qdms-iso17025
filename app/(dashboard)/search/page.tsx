"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Users, Building, Calendar } from "lucide-react"
import Link from "next/link"

// Mock search results - gerçek uygulamada API'den gelecek
const mockResults = {
  documents: [
    {
      id: "1",
      type: "document",
      title: "Doküman Kontrol Prosedürü",
      code: "PR-KG-001",
      description: "Şirket içi dokümanların oluşturulması, onaylanması ve kontrolü için prosedür",
      department: "Kalite Güvence",
      status: "published",
      updatedAt: "2024-01-15",
      url: "/documents/1",
    },
    {
      id: "2",
      type: "document",
      title: "Laboratuvar Cihaz Kalibrasyonu Talimatı",
      code: "TL-LAB-001",
      description: "Laboratuvar cihazlarının kalibrasyon işlemleri için detaylı talimat",
      department: "Laboratuvar",
      status: "review",
      updatedAt: "2024-01-12",
      url: "/documents/2",
    },
  ],
  users: [
    {
      id: "3",
      type: "user",
      title: "Ahmet Yılmaz",
      code: "Kalite Uzmanı",
      description: "Kalite Güvence Departmanı",
      department: "Kalite Güvence",
      email: "ahmet.yilmaz@company.com",
      url: "/users/3",
    },
  ],
  departments: [
    {
      id: "1",
      type: "department",
      title: "Kalite Güvence",
      code: "KG",
      description: "Kalite yönetim sistemi departmanı",
      documentCount: 15,
      userCount: 8,
      url: "/departments/1",
    },
  ],
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800 border-gray-300",
  review: "bg-blue-100 text-blue-800 border-blue-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  published: "bg-green-100 text-green-800 border-green-300",
  archived: "bg-yellow-100 text-yellow-800 border-yellow-300",
  obsolete: "bg-red-100 text-red-800 border-red-300",
}

const statusLabels = {
  draft: "Taslak",
  review: "İncelemede",
  approved: "Onaylandı",
  published: "Yayınlandı",
  archived: "Arşivlendi",
  obsolete: "Geçersiz",
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [filterBy, setFilterBy] = useState("all")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getTotalResults = () => {
    return mockResults.documents.length + mockResults.users.length + mockResults.departments.length
  }

  const getTabCount = (type: string) => {
    switch (type) {
      case "documents":
        return mockResults.documents.length
      case "users":
        return mockResults.users.length
      case "departments":
        return mockResults.departments.length
      default:
        return getTotalResults()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>Arama Sonuçları</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">"{searchQuery}" için sonuçlar</h1>
            <p className="text-muted-foreground">{getTotalResults()} sonuç bulundu</p>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">İlgililik</SelectItem>
                <SelectItem value="date">Tarih (Yeni)</SelectItem>
                <SelectItem value="date-old">Tarih (Eski)</SelectItem>
                <SelectItem value="title">Başlık (A-Z)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Sonuçlar</SelectItem>
                <SelectItem value="published">Yayınlanan</SelectItem>
                <SelectItem value="review">İncelemede</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Yeni arama yapın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tümü ({getTotalResults()})</TabsTrigger>
          <TabsTrigger value="documents">Dokümanlar ({getTabCount("documents")})</TabsTrigger>
          <TabsTrigger value="users">Kullanıcılar ({getTabCount("users")})</TabsTrigger>
          <TabsTrigger value="departments">Departmanlar ({getTabCount("departments")})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* All Results */}
          <div className="space-y-4">
            {/* Documents */}
            {mockResults.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Dokümanlar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockResults.documents.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={doc.url}
                              className="font-medium text-foreground hover:text-primary hover:underline"
                            >
                              {doc.title}
                            </Link>
                            <Badge variant="outline" className="font-mono text-xs">
                              {doc.code}
                            </Badge>
                            <Badge variant="outline" className={statusColors[doc.status as keyof typeof statusColors]}>
                              {statusLabels[doc.status as keyof typeof statusLabels]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>{doc.department}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(doc.updatedAt)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Users */}
            {mockResults.users.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Kullanıcılar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockResults.users.map((user) => (
                    <div key={user.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.title
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={user.url}
                              className="font-medium text-foreground hover:text-primary hover:underline"
                            >
                              {user.title}
                            </Link>
                            <Badge variant="outline" className="text-xs">
                              {user.code}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user.description}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Departments */}
            {mockResults.departments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Departmanlar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockResults.departments.map((dept) => (
                    <div key={dept.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={dept.url}
                              className="font-medium text-foreground hover:text-primary hover:underline"
                            >
                              {dept.title}
                            </Link>
                            <Badge variant="outline" className="font-mono text-xs">
                              {dept.code}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{dept.description}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{dept.documentCount} doküman</p>
                          <p>{dept.userCount} kullanıcı</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockResults.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={doc.url}
                            className="font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {doc.title}
                          </Link>
                          <Badge variant="outline" className="font-mono text-xs">
                            {doc.code}
                          </Badge>
                          <Badge variant="outline" className={statusColors[doc.status as keyof typeof statusColors]}>
                            {statusLabels[doc.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Building className="h-3 w-3" />
                            <span>{doc.department}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(doc.updatedAt)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockResults.users.map((user) => (
                  <div key={user.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.title
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={user.url}
                            className="font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {user.title}
                          </Link>
                          <Badge variant="outline" className="text-xs">
                            {user.code}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.description}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockResults.departments.map((dept) => (
                  <div key={dept.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={dept.url}
                            className="font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {dept.title}
                          </Link>
                          <Badge variant="outline" className="font-mono text-xs">
                            {dept.code}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{dept.description}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{dept.documentCount} doküman</p>
                        <p>{dept.userCount} kullanıcı</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
