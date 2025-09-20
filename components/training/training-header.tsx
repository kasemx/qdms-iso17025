"use client"

interface TrainingHeaderProps {
  // Header için gerekli prop'lar
}

export function TrainingHeader({}: TrainingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Eğitim Takibi</h1>
        <p className="text-muted-foreground">Eğitim atamaları, tamamlama durumu ve raporlar</p>
      </div>
    </div>
  )
}