"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, File, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onFileSelect?: (files: File[]) => void
  onFileRemove?: (index: number) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  maxFiles?: number
  className?: string
  disabled?: boolean
}

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "success" | "error"
  error?: string
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
  multiple = true,
  maxSize = 10,
  maxFiles = 5,
  className,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = []
    const fileArray = Array.from(selectedFiles)

    for (const file of fileArray) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newFiles.push({
          file,
          progress: 0,
          status: "error",
          error: `Dosya boyutu ${maxSize}MB'dan büyük olamaz`,
        })
        continue
      }

      // Check file count
      if (files.length + newFiles.length >= maxFiles) {
        break
      }

      newFiles.push({
        file,
        progress: 0,
        status: "uploading",
      })
    }

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      if (uploadFile.status === "uploading") {
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f, i) => {
              if (f.file === uploadFile.file) {
                const newProgress = Math.min(f.progress + 10, 100)
                return {
                  ...f,
                  progress: newProgress,
                  status: newProgress === 100 ? "success" : "uploading",
                }
              }
              return f
            }),
          )
        }, 200)

        setTimeout(() => clearInterval(interval), 2000)
      }
    })

    onFileSelect?.(fileArray)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    onFileRemove?.(index)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver && !disabled
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Dosyaları buraya sürükleyin veya{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              seçin
            </Button>
          </p>
          <p className="text-xs text-muted-foreground">
            Maksimum {maxFiles} dosya, her biri {maxSize}MB'dan küçük olmalı
          </p>
          <p className="text-xs text-muted-foreground">Desteklenen formatlar: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Yüklenen Dosyalar</h4>
          <div className="space-y-2">
            {files.map((uploadFile, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(uploadFile.file.size)}</p>
                  {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="mt-1 h-1" />}
                  {uploadFile.status === "error" && uploadFile.error && (
                    <p className="text-xs text-destructive mt-1">{uploadFile.error}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {uploadFile.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {uploadFile.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
