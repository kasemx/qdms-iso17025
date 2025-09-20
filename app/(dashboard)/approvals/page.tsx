"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, FileText, Calendar, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { mockApi } from "@/lib/mock-data"
import { getPriorityBadge } from "@/lib/priority-utils"

export default function ApprovalsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([])
  const [approvalComment, setApprovalComment] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [processingId, setProcessingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setIsLoading(true)
        const data = await mockApi.getApprovals()
        setPendingApprovals(data || [])
      } catch (error) {
        console.error("Approvals fetch error:", error)
        toast({
          title: "Hata",
          description: "Onay bekleyen dokümanlar yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
        setPendingApprovals([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchApprovals()
  }, [toast])

  const handleApproval = async (approvalId: number, action: "approve" | "reject") => {
    if (action === "reject" && !rejectionReason.trim()) {
      toast({
        title: "Hata",
        description: "Red sebebi zorunludur.",
        variant: "destructive",
      })
      return
    }

    setProcessingId(approvalId)
    try {
      const response = await fetch(`/api/approvals/${approvalId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: action === "approve" ? approvalComment : rejectionReason,
        }),
      })

      if (!response.ok) {
        throw new Error(`Doküman ${action === "approve" ? "onaylanamadı" : "reddedilemedi"}`)
      }

      toast({
        title: "Başarılı",
        description: `Doküman başarıyla ${action === "approve" ? "onaylandı" : "reddedildi"}.`,
      })

      // Remove from pending list
      setPendingApprovals((prev) => prev.filter((approval: any) => approval.id !== approvalId))
      setApprovalComment("")
      setRejectionReason("")
    } catch (error) {
      console.error("Approval action error:", error)
      toast({
        title: "Hata",
        description: `Doküman ${action === "approve" ? "onaylanırken" : "reddedilirken"} bir hata oluştu.`,
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
    }
  }


  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onay Bekleyen Dokümanlar</h1>
          <p className="text-gray-600 mt-1">Yükleniyor...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Onay Bekleyen Dokümanlar</h1>
        <p className="text-gray-600 mt-1">Size atanan onay bekleyen dokümanları görüntüleyin ve işlem yapın</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bekleyen Onaylar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <p className="text-xs text-yellow-600 mt-1">
              <Clock className="w-3 h-3 inline mr-1" />2 acil
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bu Hafta Onaylanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-green-600 mt-1">+3 dün</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ortalama Yanıt Süresi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1.8</div>
            <p className="text-xs text-gray-500 mt-1">gün</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        {pendingApprovals.map((approval) => (
          <Card key={approval.id} className="border-l-4 border-l-yellow-400">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{approval.documentTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      Kod: {approval.documentCode} • Gönderen: {approval.initiator}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Gönderilme: {approval.submittedAt}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Son Tarih: {approval.dueDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getPriorityBadge(approval.priority)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Açıklama</h4>
                  <p className="text-gray-600 text-sm">{approval.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Yapılan Değişiklikler</h4>
                  <p className="text-gray-600 text-sm">{approval.changes}</p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Dokümanı Görüntüle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{approval.documentTitle}</DialogTitle>
                        <DialogDescription>Doküman önizlemesi - {approval.documentCode}</DialogDescription>
                      </DialogHeader>
                      <div className="bg-gray-50 p-4 rounded-lg min-h-96">
                        <p className="text-gray-600">Doküman içeriği burada görüntülenecek...</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                        disabled={processingId === approval.id}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {processingId === approval.id ? "İşleniyor..." : "Onayla"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dokümanı Onayla</DialogTitle>
                        <DialogDescription>
                          {approval.documentTitle} dokümanını onaylamak istediğinizden emin misiniz?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="approval-comment">Onay Notu (İsteğe bağlı)</Label>
                          <Textarea
                            id="approval-comment"
                            placeholder="Onay ile ilgili notlarınızı yazın..."
                            className="mt-1"
                            value={approvalComment}
                            onChange={(e) => setApprovalComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">İptal</Button>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproval(approval.id, "approve")}
                          disabled={processingId === approval.id}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {processingId === approval.id ? "İşleniyor..." : "Onayla"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        size="sm"
                        disabled={processingId === approval.id}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reddet
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dokümanı Reddet</DialogTitle>
                        <DialogDescription>
                          {approval.documentTitle} dokümanını reddetmek istediğinizden emin misiniz?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rejection-reason">Red Sebebi *</Label>
                          <Textarea
                            id="rejection-reason"
                            placeholder="Dokümanı neden reddettiğinizi açıklayın..."
                            className="mt-1"
                            required
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">İptal</Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleApproval(approval.id, "reject")}
                          disabled={processingId === approval.id}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {processingId === approval.id ? "İşleniyor..." : "Reddet"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Yorum Yap
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingApprovals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tüm onaylar tamamlandı!</h3>
            <p className="text-gray-600">Şu anda onayınızı bekleyen doküman bulunmuyor.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
