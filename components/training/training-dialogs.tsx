"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface TrainingAssignment {
  id: string
  documentCode: string
  documentTitle: string
  categoryName: string
  assignmentType: "read_acknowledge" | "quiz" | "training_session"
  assignedByName: string
  assignedAt: string
  dueDate?: string
  completedAt?: string
  status: "assigned" | "in_progress" | "completed" | "overdue" | "skipped"
  score?: number
  passingScore: number
  attemptsCount: number
  maxAttempts: number
}

interface TrainingDialogsProps {
  showCompleteDialog: boolean
  onCloseCompleteDialog: () => void
  selectedAssignment: TrainingAssignment | null
}

export function TrainingDialogs({
  showCompleteDialog,
  onCloseCompleteDialog,
  selectedAssignment,
}: TrainingDialogsProps) {
  return (
    <Dialog open={showCompleteDialog} onOpenChange={onCloseCompleteDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Eğitimi Tamamla</DialogTitle>
          <DialogDescription>
            {selectedAssignment?.documentTitle} eğitimini tamamlamak için aşağıdaki formu doldurun
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="acknowledgment">Onay Metni</Label>
            <Textarea
              id="acknowledgment"
              defaultValue="Bu dokümanı okudum, anladım ve uygulamaya hazırım."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notlar (İsteğe bağlı)</Label>
            <Textarea id="notes" placeholder="Eğitim hakkında notlarınız..." rows={2} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCloseCompleteDialog}>
              İptal
            </Button>
            <Button onClick={onCloseCompleteDialog}>Eğitimi Tamamla</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}