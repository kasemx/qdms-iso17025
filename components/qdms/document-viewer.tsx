"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download, Eye, ZoomIn, ZoomOut, RotateCw, Maximize, Share, Printer as Print } from "lucide-react"

interface DocumentViewerProps {
  documentId: string
  documentCode: string
  title: string
  version: number
  status: string
  fileType: string
  filePath: string
  className?: string
}

export function DocumentViewer({
  documentId,
  documentCode,
  title,
  version,
  status,
  fileType,
  filePath,
  className,
}: DocumentViewerProps) {
  const [zoom, setZoom] = React.useState(100)
  const [rotation, setRotation] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)
  const handleReset = () => {
    setZoom(100)
    setRotation(0)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-yellow-100 text-yellow-800",
      obsolete: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: "Taslak",
      review: "İncelemede",
      approved: "Onaylandı",
      published: "Yayınlandı",
      archived: "Arşivlendi",
      obsolete: "Geçersiz",
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-lg">{documentCode}</CardTitle>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor(status)}>
              {getStatusLabel(status)}
            </Badge>
            <Badge variant="outline">v{version}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Viewer Controls */}
        <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Sıfırla
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle>
                    {documentCode} - {title}
                  </DialogTitle>
                  <DialogDescription>Tam ekran görünüm</DialogDescription>
                </DialogHeader>
                <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div
                    className="bg-white shadow-lg"
                    style={{
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {fileType === "pdf" ? (
                      <div className="w-[600px] h-[800px] bg-white border flex items-center justify-center">
                        <div className="text-center">
                          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium">PDF Görüntüleyici</p>
                          <p className="text-sm text-muted-foreground">
                            {documentCode} - Versiyon {version}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-[600px] h-[800px] bg-white border flex items-center justify-center">
                        <div className="text-center">
                          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium">Doküman Önizleme</p>
                          <p className="text-sm text-muted-foreground">
                            {fileType.toUpperCase()} formatı destekleniyor
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm">
              <Print className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <div
            className="bg-white shadow-lg transition-transform duration-200 ease-in-out"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            }}
          >
            {fileType === "pdf" ? (
              <div className="w-[400px] h-[500px] bg-white border flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium">PDF Dokümanı</p>
                  <p className="text-sm text-muted-foreground">{documentCode}</p>
                  <p className="text-xs text-muted-foreground mt-2">Tam görünüm için büyütme butonunu kullanın</p>
                </div>
              </div>
            ) : (
              <div className="w-[400px] h-[500px] bg-white border flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium">Doküman Önizleme</p>
                  <p className="text-sm text-muted-foreground">{fileType.toUpperCase()} formatı</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Detayları Görüntüle
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Paylaş
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              İndir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
