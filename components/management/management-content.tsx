"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { Plus, Edit, Eye } from "lucide-react"
import { useCallback } from "react"

interface OrganizationStructure {
  id: string
  positionTitle: string
  department: string
  reportingTo: string
  responsibilities: string
  qualifications: string
  currentHolder: string
  status: string
  lastUpdated: string
}

interface ImpartialityRecord {
  id: string
  declarationType: string
  title: string
  description: string
  declaredBy: string
  riskLevel: string
  status: string
  createdAt: string
  reviewDate: string
}

interface ConfidentialityAgreement {
  id: string
  agreementType: string
  title: string
  signedBy: string
  signedDate: string
  expiryDate: string
  status: string
  department: string
  description: string
}

interface ManagementReview {
  id: string
  reviewDate: string
  reviewType: string
  chairperson: string
  attendees: string[]
  agenda: string
  decisions: string
  actionItems: string
  nextReviewDate: string
  status: string
}

interface ManagementContentProps {
  positions: OrganizationStructure[]
  impartialityRecords: ImpartialityRecord[]
  confidentialityAgreements: ConfidentialityAgreement[]
  managementReviews: ManagementReview[]
  onNewPosition: () => void
  onNewImpartiality: () => void
  onNewConfidentiality: () => void
  onNewReview: () => void
}

export function ManagementContent({
  positions,
  impartialityRecords,
  confidentialityAgreements,
  managementReviews,
  onNewPosition,
  onNewImpartiality,
  onNewConfidentiality,
  onNewReview
}: ManagementContentProps) {
  const getStatusBadge = useCallback((status: string, type = "default") => {
    const variants: Record<string, Record<string, string>> = {
      organization: {
        filled: "bg-green-100 text-green-800",
        vacant: "bg-red-100 text-red-800",
        temporary: "bg-yellow-100 text-yellow-800",
      },
      impartiality: {
        active: "bg-blue-100 text-blue-800",
        monitoring: "bg-yellow-100 text-yellow-800",
        resolved: "bg-green-100 text-green-800",
      },
      confidentiality: {
        active: "bg-green-100 text-green-800",
        expired: "bg-red-100 text-red-800",
        pending: "bg-yellow-100 text-yellow-800",
      },
      review: {
        completed: "bg-green-100 text-green-800",
        scheduled: "bg-blue-100 text-blue-800",
        cancelled: "bg-red-100 text-red-800",
      },
    }

    const variant = variants[type]?.[status] || "bg-gray-100 text-gray-800"
    return <Badge className={variant}>{status.toUpperCase()}</Badge>
  }, [])

  const getRiskLevelBadge = useCallback((level: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
    }
    return <Badge className={variants[level as keyof typeof variants]}>{level.toUpperCase()}</Badge>
  }, [])

  return (
    <>
      <TabsContent value="organization" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Organizasyon Yapısı</h2>
          <Button onClick={onNewPosition}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Pozisyon
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organizasyon Pozisyonları</CardTitle>
            <CardDescription>Tüm organizasyon pozisyonları ve sorumlulukları</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pozisyon</TableHead>
                  <TableHead>Departman</TableHead>
                  <TableHead>Bağlı Olduğu Pozisyon</TableHead>
                  <TableHead>Mevcut Görevli</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell className="font-medium">{position.positionTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{position.department}</Badge>
                    </TableCell>
                    <TableCell>{position.reportingTo}</TableCell>
                    <TableCell>{position.currentHolder || "Boş"}</TableCell>
                    <TableCell>{getStatusBadge(position.status, "organization")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="impartiality" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tarafsızlık Yönetimi</h2>
          <Button onClick={onNewImpartiality}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kayıt
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tarafsızlık Kayıtları</CardTitle>
            <CardDescription>Tüm tarafsızlık beyanları ve risk değerlendirmeleri</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Risk Seviyesi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Beyan Eden</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {impartialityRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.declarationType.replace("_", " ").toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{getRiskLevelBadge(record.riskLevel)}</TableCell>
                    <TableCell>{getStatusBadge(record.status, "impartiality")}</TableCell>
                    <TableCell>{record.declaredBy}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="confidentiality" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Gizlilik Anlaşmaları</h2>
          <Button onClick={onNewConfidentiality}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Anlaşma
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gizlilik Anlaşmaları Listesi</CardTitle>
            <CardDescription>Tüm gizlilik anlaşmaları ve durumları</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anlaşma Başlığı</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>İmzalayan</TableHead>
                  <TableHead>Departman</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {confidentialityAgreements.map((agreement) => (
                  <TableRow key={agreement.id}>
                    <TableCell className="font-medium">{agreement.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{agreement.agreementType.replace("_", " ").toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{agreement.signedBy}</TableCell>
                    <TableCell>{agreement.department}</TableCell>
                    <TableCell>{getStatusBadge(agreement.status, "confidentiality")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Yönetim Gözden Geçirme</h2>
          <Button onClick={onNewReview}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Toplantı
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Yönetim Gözden Geçirme Toplantıları</CardTitle>
            <CardDescription>Tüm yönetim gözden geçirme toplantıları ve kararları</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Toplantı Tarihi</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Başkan</TableHead>
                  <TableHead>Sonraki Toplantı</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managementReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {new Date(review.reviewDate).toLocaleDateString("tr-TR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{review.reviewType.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{review.chairperson}</TableCell>
                    <TableCell>{new Date(review.nextReviewDate).toLocaleDateString("tr-TR")}</TableCell>
                    <TableCell>{getStatusBadge(review.status, "review")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  )
}