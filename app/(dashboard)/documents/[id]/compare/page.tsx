"use client"

import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, GitCompare, Calendar, User, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data - gerçek uygulamada API'den gelecek
const documentVersions = [
  {
    version: 2,
    createdBy: "Sistem Yöneticisi",
    createdAt: "2024-01-15",
    changesSummary: "Revizyon süreçleri güncellendi, yeni onay akışı eklendi",
    status: "published",
    content: `# Doküman Kontrol Prosedürü

## 1. Amaç
Bu prosedür, şirket içi dokümanların oluşturulması, onaylanması ve kontrolü için gerekli adımları tanımlar.

## 2. Kapsam
Bu prosedür tüm kalite dokümanları için geçerlidir.

## 3. Sorumluluklar
- Doküman sahibi: Dokümanın hazırlanması ve güncellenmesi
- Kalite sorumlusu: Dokümanın onaylanması
- Sistem yöneticisi: Dokümanın yayınlanması

## 4. Prosedür Adımları
### 4.1 Doküman Hazırlama
Doküman sahibi, gerekli dokümanı hazırlar ve revizyon için gönderir.

### 4.2 İnceleme ve Onay
Kalite sorumlusu dokümanı inceler ve onaylar veya revizyon için geri gönderir.

### 4.3 Yayınlama
Onaylanan doküman sistem yöneticisi tarafından yayınlanır.

## 5. Kayıtlar
Tüm doküman işlemleri sistem tarafından otomatik olarak kaydedilir.`,
  },
  {
    version: 1,
    createdBy: "Sistem Yöneticisi",
    createdAt: "2024-01-10",
    changesSummary: "İlk versiyon oluşturuldu",
    status: "archived",
    content: `# Doküman Kontrol Prosedürü

## 1. Amaç
Bu prosedür, şirket içi dokümanların oluşturulması ve kontrolü için gerekli adımları tanımlar.

## 2. Kapsam
Bu prosedür kalite dokümanları için geçerlidir.

## 3. Sorumluluklar
- Doküman sahibi: Dokümanın hazırlanması
- Kalite sorumlusu: Dokümanın onaylanması

## 4. Prosedür Adımları
### 4.1 Doküman Hazırlama
Doküman sahibi, gerekli dokümanı hazırlar.

### 4.2 İnceleme ve Onay
Kalite sorumlusu dokümanı inceler ve onaylar.

## 5. Kayıtlar
Doküman işlemleri kaydedilir.`,
  },
]

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

// Simple diff algorithm for text comparison
function generateDiff(oldText: string, newText: string) {
  const oldLines = oldText.split("\n")
  const newLines = newText.split("\n")
  const diff = []

  const maxLines = Math.max(oldLines.length, newLines.length)

  for (let i = 0; i < maxLines; i++) {
    const oldLine = oldLines[i] || ""
    const newLine = newLines[i] || ""

    if (oldLine === newLine) {
      diff.push({ type: "unchanged", oldLine, newLine, lineNumber: i + 1 })
    } else if (!oldLine) {
      diff.push({ type: "added", oldLine: "", newLine, lineNumber: i + 1 })
    } else if (!newLine) {
      diff.push({ type: "removed", oldLine, newLine: "", lineNumber: i + 1 })
    } else {
      diff.push({ type: "modified", oldLine, newLine, lineNumber: i + 1 })
    }
  }

  return diff
}

export default function DocumentComparePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [leftVersion, setLeftVersion] = useState(searchParams.get("left") || "1")
  const [rightVersion, setRightVersion] = useState(searchParams.get("right") || "2")
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">("side-by-side")

  const leftVersionData = documentVersions.find((v) => v.version.toString() === leftVersion)
  const rightVersionData = documentVersions.find((v) => v.version.toString() === rightVersion)

  const diff =
    leftVersionData && rightVersionData ? generateDiff(leftVersionData.content, rightVersionData.content) : []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getChangeStats = () => {
    const added = diff.filter((d) => d.type === "added").length
    const removed = diff.filter((d) => d.type === "removed").length
    const modified = diff.filter((d) => d.type === "modified").length

    return { added, removed, modified }
  }

  const stats = getChangeStats()

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/documents" className="hover:text-foreground">
          Dokümanlar
        </Link>
        <span>/</span>
        <Link href={`/documents/${params.id}`} className="hover:text-foreground">
          PR-KG-001
        </Link>
        <span>/</span>
        <span className="text-foreground">Versiyon Karşılaştırma</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <GitCompare className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Versiyon Karşılaştırma</h1>
              <p className="text-xl text-muted-foreground">Doküman Kontrol Prosedürü</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/documents/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      {/* Version Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Karşılaştırılacak Versiyonları Seçin</CardTitle>
          <CardDescription>İki farklı versiyon seçerek aralarındaki farkları görüntüleyebilirsiniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sol Versiyon (Eski)</label>
              <Select value={leftVersion} onValueChange={setLeftVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentVersions.map((version) => (
                    <SelectItem key={version.version} value={version.version.toString()}>
                      v{version.version} - {formatDate(version.createdAt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="h-px w-8 bg-border"></div>
                <GitCompare className="h-4 w-4" />
                <div className="h-px w-8 bg-border"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sağ Versiyon (Yeni)</label>
              <Select value={rightVersion} onValueChange={setRightVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentVersions.map((version) => (
                    <SelectItem key={version.version} value={version.version.toString()}>
                      v{version.version} - {formatDate(version.createdAt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Stats */}
      {leftVersionData && rightVersionData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.added}</p>
                  <p className="text-sm text-muted-foreground">Eklenen Satır</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.removed}</p>
                  <p className="text-sm text-muted-foreground">Silinen Satır</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.modified}</p>
                  <p className="text-sm text-muted-foreground">Değiştirilen Satır</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <GitCompare className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.added + stats.removed + stats.modified}</p>
                  <p className="text-sm text-muted-foreground">Toplam Değişiklik</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Version Info */}
      {leftVersionData && rightVersionData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Versiyon {leftVersionData.version}</span>
                <Badge variant="outline" className={statusColors[leftVersionData.status as keyof typeof statusColors]}>
                  {statusLabels[leftVersionData.status as keyof typeof statusLabels]}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(leftVersionData.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{leftVersionData.createdBy}</span>
              </div>
              <p className="text-sm text-muted-foreground">{leftVersionData.changesSummary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Versiyon {rightVersionData.version}</span>
                <Badge variant="outline" className={statusColors[rightVersionData.status as keyof typeof statusColors]}>
                  {statusLabels[rightVersionData.status as keyof typeof statusLabels]}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(rightVersionData.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{rightVersionData.createdBy}</span>
              </div>
              <p className="text-sm text-muted-foreground">{rightVersionData.changesSummary}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comparison View */}
      {leftVersionData && rightVersionData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Karşılaştırma Görünümü</CardTitle>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                <TabsList>
                  <TabsTrigger value="side-by-side">Yan Yana</TabsTrigger>
                  <TabsTrigger value="unified">Birleşik</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "side-by-side" ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Left Version */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <FileText className="h-4 w-4" />
                    <span>Versiyon {leftVersionData.version}</span>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-3 py-2 text-sm font-medium">{leftVersionData.changesSummary}</div>
                    <div className="max-h-96 overflow-y-auto">
                      {diff.map((line, index) => (
                        <div
                          key={index}
                          className={`px-3 py-1 text-sm font-mono border-l-2 ${
                            line.type === "removed"
                              ? "bg-red-50 border-red-500 text-red-800"
                              : line.type === "modified"
                                ? "bg-yellow-50 border-yellow-500 text-yellow-800"
                                : line.type === "unchanged"
                                  ? "bg-background border-transparent"
                                  : "bg-background border-transparent opacity-50"
                          }`}
                        >
                          <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                          {line.oldLine || "\u00A0"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Version */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <FileText className="h-4 w-4" />
                    <span>Versiyon {rightVersionData.version}</span>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-3 py-2 text-sm font-medium">{rightVersionData.changesSummary}</div>
                    <div className="max-h-96 overflow-y-auto">
                      {diff.map((line, index) => (
                        <div
                          key={index}
                          className={`px-3 py-1 text-sm font-mono border-l-2 ${
                            line.type === "added"
                              ? "bg-green-50 border-green-500 text-green-800"
                              : line.type === "modified"
                                ? "bg-blue-50 border-blue-500 text-blue-800"
                                : line.type === "unchanged"
                                  ? "bg-background border-transparent"
                                  : "bg-background border-transparent opacity-50"
                          }`}
                        >
                          <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                          {line.newLine || "\u00A0"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Unified View */
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-3 py-2 text-sm font-medium flex items-center space-x-2">
                  <GitCompare className="h-4 w-4" />
                  <span>Birleşik Karşılaştırma Görünümü</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {diff.map((line, index) => (
                    <div key={index}>
                      {line.type === "removed" && (
                        <div className="px-3 py-1 text-sm font-mono bg-red-50 border-l-2 border-red-500 text-red-800">
                          <span className="text-red-500 mr-2 select-none">-</span>
                          <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                          {line.oldLine}
                        </div>
                      )}
                      {line.type === "added" && (
                        <div className="px-3 py-1 text-sm font-mono bg-green-50 border-l-2 border-green-500 text-green-800">
                          <span className="text-green-500 mr-2 select-none">+</span>
                          <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                          {line.newLine}
                        </div>
                      )}
                      {line.type === "modified" && (
                        <>
                          <div className="px-3 py-1 text-sm font-mono bg-red-50 border-l-2 border-red-500 text-red-800">
                            <span className="text-red-500 mr-2 select-none">-</span>
                            <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                            {line.oldLine}
                          </div>
                          <div className="px-3 py-1 text-sm font-mono bg-green-50 border-l-2 border-green-500 text-green-800">
                            <span className="text-green-500 mr-2 select-none">+</span>
                            <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                            {line.newLine}
                          </div>
                        </>
                      )}
                      {line.type === "unchanged" && (
                        <div className="px-3 py-1 text-sm font-mono bg-background">
                          <span className="text-muted-foreground mr-2 select-none"> </span>
                          <span className="text-muted-foreground mr-4 select-none">{line.lineNumber}</span>
                          {line.oldLine}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* No differences message */}
      {leftVersionData && rightVersionData && diff.every((d) => d.type === "unchanged") && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Fark Bulunamadı</h3>
            <p className="text-muted-foreground">Seçilen versiyonlar arasında herhangi bir fark bulunmamaktadır.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
