"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface ApprovalStep {
  id: string
  title: string
  approver: {
    name: string
    email: string
    role: string
  }
  status: "pending" | "approved" | "rejected" | "skipped"
  comment?: string
  approvedAt?: string
  order: number
}

interface ApprovalWorkflowProps {
  documentId: string
  documentTitle: string
  steps: ApprovalStep[]
  currentStep: number
  onApprove?: (stepId: string, comment?: string) => void
  onReject?: (stepId: string, comment: string) => void
  canApprove?: boolean
  className?: string
}

export function ApprovalWorkflow({
  documentId,
  documentTitle,
  steps,
  currentStep,
  onApprove,
  onReject,
  canApprove = false,
  className,
}: ApprovalWorkflowProps) {
  const [selectedStep, setSelectedStep] = React.useState<ApprovalStep | null>(null)
  const [action, setAction] = React.useState<"approve" | "reject" | null>(null)
  const [comment, setComment] = React.useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Onaylandı"
      case "rejected":
        return "Reddedildi"
      case "pending":
        return "Beklemede"
      case "skipped":
        return "Atlandı"
      default:
        return "Bilinmiyor"
    }
  }

  const handleAction = () => {
    if (!selectedStep || !action) return

    if (action === "approve") {
      onApprove?.(selectedStep.id, comment)
    } else {
      onReject?.(selectedStep.id, comment)
    }

    setSelectedStep(null)
    setAction(null)
    setComment("")
  }

  const currentStepData = steps.find((step) => step.order === currentStep)
  const isCurrentUserApprover = currentStepData && canApprove

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span>Onay Süreci</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{documentTitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mevcut Durum</p>
              <p className="text-xs text-muted-foreground">
                Adım {currentStep} / {steps.length}
              </p>
            </div>
            <div className="text-right">
              {currentStepData && (
                <Badge variant="outline" className={getStatusColor(currentStepData.status)}>
                  {getStatusLabel(currentStepData.status)}
                </Badge>
              )}
            </div>
          </div>
          {currentStepData && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm font-medium">{currentStepData.title}</p>
              <p className="text-xs text-muted-foreground">
                Onaylayan: {currentStepData.approver.name} ({currentStepData.approver.role})
              </p>
            </div>
          )}
        </div>

        {/* Approval Steps */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Onay Adımları</h4>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted bg-background">
                    {getStatusIcon(step.status)}
                  </div>
                  {index < steps.length - 1 && <div className="w-px h-8 bg-muted mt-2" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{step.title}</p>
                      <Badge variant="outline" className={getStatusColor(step.status)}>
                        {getStatusLabel(step.status)}
                      </Badge>
                    </div>
                    {step.order === currentStep && isCurrentUserApprover && (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setSelectedStep(step)
                            setAction("approve")
                          }}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Onayla
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          onClick={() => {
                            setSelectedStep(step)
                            setAction("reject")
                          }}
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Reddet
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs">
                        {step.approver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">
                      {step.approver.name} - {step.approver.role}
                    </p>
                  </div>
                  {step.comment && (
                    <div className="mt-2 p-2 bg-muted/30 rounded text-xs">
                      <p className="font-medium">Yorum:</p>
                      <p>{step.comment}</p>
                    </div>
                  )}
                  {step.approvedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(step.approvedAt).toLocaleString("tr-TR")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>İlerleme</span>
            <span>
              {steps.filter((s) => s.status === "approved").length} / {steps.length} tamamlandı
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(steps.filter((s) => s.status === "approved").length / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </CardContent>

      {/* Approval Dialog */}
      <Dialog
        open={!!selectedStep}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedStep(null)
            setAction(null)
            setComment("")
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "approve" ? "Dokümanı Onayla" : "Dokümanı Reddet"}</DialogTitle>
            <DialogDescription>
              {selectedStep?.title} adımı için {action === "approve" ? "onay" : "red"} işlemi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment">{action === "approve" ? "Onay Notu (İsteğe bağlı)" : "Red Sebebi *"}</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  action === "approve"
                    ? "Onay ile ilgili notlarınızı yazın..."
                    : "Dokümanı neden reddettiğinizi açıklayın..."
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedStep(null)
                setAction(null)
                setComment("")
              }}
            >
              İptal
            </Button>
            <Button
              onClick={handleAction}
              className={action === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
              variant={action === "reject" ? "destructive" : "default"}
              disabled={action === "reject" && !comment.trim()}
            >
              {action === "approve" ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Onayla
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reddet
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
