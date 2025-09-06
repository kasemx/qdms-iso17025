"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Upload,
  ArrowLeft,
  Save,
  Send,
  AlertCircle,
  Plus,
  X,
  User,
  BookOpen,
  Settings,
  Users,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "1", name: "Prosedür", code: "PR" },
  { id: "2", name: "Talimat", code: "TL" },
  { id: "3", name: "Form", code: "FR" },
  { id: "4", name: "El Kitabı", code: "EK" },
  { id: "5", name: "Kayıt", code: "KY" },
  { id: "6", name: "Politika", code: "PL" },
]

const departments = [
  { id: "1", name: "Kalite Güvence" },
  { id: "2", name: "İnsan Kaynakları" },
  { id: "3", name: "Üretim" },
  { id: "4", name: "Laboratuvar" },
  { id: "5", name: "Satış ve Pazarlama" },
  { id: "6", name: "Bilgi İşlem" },
]

const isoStandards = [
  { id: "1", code: "ISO9001", name: "ISO 9001:2015", clauses: ["4.2.3", "4.2.4", "7.5.3"] },
  { id: "2", code: "ISO17025", name: "ISO 17025:2017", clauses: ["8.2", "8.3", "8.4", "8.5"] },
  { id: "3", code: "ISO14001", name: "ISO 14001:2015", clauses: ["7.5", "9.1"] },
]

const users = [
  { id: "1", name: "Ahmet Yılmaz", role: "Kalite Müdürü" },
  { id: "2", name: "Fatma Demir", role: "Laboratuvar Şefi" },
  { id: "3", name: "Mehmet Kaya", role: "Üretim Müdürü" },
  { id: "4", name: "Ayşe Öz", role: "İK Uzmanı" },
]

export default function CreateDocumentPage() {
  const [activeTab, setActiveTab] = useState("general")

  const [formData, setFormData] = useState({
    documentCode: "",
    title: "",
    description: "",
    categoryId: "",
    departmentId: "",
    language: "tr",
    isControlled: true,
    isConfidential: false,
    retentionPeriod: 60,
    nextReviewDate: "",
    isoMappings: [] as string[],

    // İçerik alanları
    content: "",
    purpose: "",
    scope: "",
    responsibilities: "",
    procedure: "",
    references: [] as string[],
    keywords: [] as string[],

    // Onay bilgileri
    preparedBy: "",
    reviewedBy: "",
    approvedBy: "",
    effectiveDate: "",

    // Dağıtım
    distributionList: [] as string[],
    trainingRequired: false,
    trainingDescription: "",

    // ISO 17025 özel alanları
    relatedStandardClauses: [] as string[],
    measurementUncertainty: "",
    validationMethod: "",
    equipmentRequirements: "",
    environmentalConditions: "",
    competencyRequirements: "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newKeyword, setNewKeyword] = useState("")
  const [newReference, setNewReference] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      handleInputChange("keywords", [...formData.keywords, newKeyword.trim()])
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    handleInputChange(
      "keywords",
      formData.keywords.filter((k) => k !== keyword),
    )
  }

  const addReference = () => {
    if (newReference.trim() && !formData.references.includes(newReference.trim())) {
      handleInputChange("references", [...formData.references, newReference.trim()])
      setNewReference("")
    }
  }

  const removeReference = (reference: string) => {
    handleInputChange(
      "references",
      formData.references.filter((r) => r !== reference),
    )
  }

  const generateDocumentCode = () => {
    const category = categories.find((c) => c.id === formData.categoryId)
    const department = departments.find((d) => d.id === formData.departmentId)

    if (category && department) {
      const deptCode = department.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
      const timestamp = Date.now().toString().slice(-3)
      const code = `${category.code}-${deptCode}-${timestamp}`
      handleInputChange("documentCode", code)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: "Dosya boyutu 50MB'dan büyük olamaz" }))
        return
      }

      const allowedTypes = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        setErrors((prev) => ({ ...prev, file: "Desteklenmeyen dosya türü" }))
        return
      }

      setFile(selectedFile)
      setErrors((prev) => ({ ...prev, file: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.documentCode.trim()) {
      newErrors.documentCode = "Doküman kodu gereklidir"
    }
    if (!formData.title.trim()) {
      newErrors.title = "Başlık gereklidir"
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Kategori seçimi gereklidir"
    }
    if (!formData.departmentId) {
      newErrors.departmentId = "Departman seçimi gereklidir"
    }
    if (!formData.content.trim()) {
      newErrors.content = "Doküman içeriği gereklidir"
    }
    if (!formData.preparedBy) {
      newErrors.preparedBy = "Hazırlayan kişi seçimi gereklidir"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (action: "save" | "submit") => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value))
        } else {
          formDataToSend.append(key, value.toString())
        }
      })

      if (file) {
        formDataToSend.append("file", file)
      }

      formDataToSend.append("action", action)

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        const result = await response.json()

        if (action === "save") {
          alert("Doküman taslak olarak kaydedildi")
        } else {
          alert("Doküman incelemeye gönderildi")
        }

        window.location.href = `/documents/${result.id}`
      } else {
        const error = await response.json()
        alert(`Hata: ${error.message || "Doküman oluşturulamadı"}`)
      }
    } catch (error) {
      console.error("Doküman oluşturma hatası:", error)
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = categories.find((c) => c.id === formData.categoryId)
  const selectedDepartment = departments.find((d) => d.id === formData.departmentId)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/documents" className="hover:text-foreground flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Dokümanlar</span>
        </Link>
        <span>/</span>
        <span className="text-foreground">Yeni Doküman</span>
      </div>

      {/* Header */}
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Yeni Doküman Oluştur</h1>
          <p className="text-muted-foreground">ISO 17025 standartlarına uygun doküman oluşturun</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Genel Bilgiler</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>İçerik</span>
              </TabsTrigger>
              <TabsTrigger value="approval" className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4" />
                <span>Onay Bilgileri</span>
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Dağıtım</span>
              </TabsTrigger>
              <TabsTrigger value="iso" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>ISO 17025</span>
              </TabsTrigger>
            </TabsList>

            {/* Genel Bilgiler Sekmesi */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temel Bilgiler</CardTitle>
                  <CardDescription>Dokümanın temel bilgilerini girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentCode">Doküman Kodu *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="documentCode"
                          placeholder="PR-KG-001"
                          value={formData.documentCode}
                          onChange={(e) => handleInputChange("documentCode", e.target.value)}
                          className={errors.documentCode ? "border-destructive" : ""}
                        />
                        <Button type="button" variant="outline" onClick={generateDocumentCode}>
                          Otomatik
                        </Button>
                      </div>
                      {errors.documentCode && <p className="text-sm text-destructive">{errors.documentCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori *</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => handleInputChange("categoryId", value)}
                      >
                        <SelectTrigger className={errors.categoryId ? "border-destructive" : ""}>
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {category.code}
                                </Badge>
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departman *</Label>
                      <Select
                        value={formData.departmentId}
                        onValueChange={(value) => handleInputChange("departmentId", value)}
                      >
                        <SelectTrigger className={errors.departmentId ? "border-destructive" : ""}>
                          <SelectValue placeholder="Departman seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.departmentId && <p className="text-sm text-destructive">{errors.departmentId}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      placeholder="Doküman başlığını girin"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="Dokümanın kısa açıklaması"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Dil</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retentionPeriod">Saklama Süresi (Ay)</Label>
                      <Input
                        id="retentionPeriod"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.retentionPeriod}
                        onChange={(e) => handleInputChange("retentionPeriod", Number.parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isControlled"
                        checked={formData.isControlled}
                        onCheckedChange={(checked) => handleInputChange("isControlled", checked)}
                      />
                      <Label htmlFor="isControlled" className="cursor-pointer">
                        Kontrollü Doküman
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isConfidential"
                        checked={formData.isConfidential}
                        onCheckedChange={(checked) => handleInputChange("isConfidential", checked)}
                      />
                      <Label htmlFor="isConfidential" className="cursor-pointer">
                        Gizli Doküman
                      </Label>
                    </div>
                  </div>

                  {/* Anahtar Kelimeler */}
                  <div className="space-y-2">
                    <Label>Anahtar Kelimeler</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Anahtar kelime ekle"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                      />
                      <Button type="button" variant="outline" onClick={addKeyword}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{keyword}</span>
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* İçerik Sekmesi */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Doküman İçeriği</CardTitle>
                  <CardDescription>Dokümanın detaylı içeriğini girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Amaç</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Bu dokümanın amacını açıklayın"
                      rows={3}
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scope">Kapsam</Label>
                    <Textarea
                      id="scope"
                      placeholder="Bu dokümanın kapsamını belirtin"
                      rows={3}
                      value={formData.scope}
                      onChange={(e) => handleInputChange("scope", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Ana İçerik *</Label>
                    <Textarea
                      id="content"
                      placeholder="Dokümanın ana içeriğini detaylı olarak yazın..."
                      rows={10}
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className={errors.content ? "border-destructive" : ""}
                    />
                    {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Sorumluluklar</Label>
                    <Textarea
                      id="responsibilities"
                      placeholder="Roller ve sorumlulukları tanımlayın"
                      rows={4}
                      value={formData.responsibilities}
                      onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="procedure">Prosedür/Talimat</Label>
                    <Textarea
                      id="procedure"
                      placeholder="Adım adım prosedür veya talimatları yazın"
                      rows={6}
                      value={formData.procedure}
                      onChange={(e) => handleInputChange("procedure", e.target.value)}
                    />
                  </div>

                  {/* Referanslar */}
                  <div className="space-y-2">
                    <Label>Referans Dokümanlar</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Referans doküman ekle"
                        value={newReference}
                        onChange={(e) => setNewReference(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addReference())}
                      />
                      <Button type="button" variant="outline" onClick={addReference}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.references.map((reference, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{reference}</span>
                          <button
                            type="button"
                            onClick={() => removeReference(reference)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ek Dosya Yükleme */}
                  <Separator />
                  <div className="space-y-4">
                    <Label>Ek Dosyalar (İsteğe bağlı)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <div>
                          <Label htmlFor="file" className="cursor-pointer text-primary hover:text-primary/80">
                            Dosya seçin veya sürükleyip bırakın
                          </Label>
                          <Input
                            id="file"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            onChange={handleFileChange}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Maksimum dosya boyutu: 50MB</p>
                      </div>
                    </div>

                    {file && (
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                          Kaldır
                        </Button>
                      </div>
                    )}

                    {errors.file && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.file}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onay Bilgileri Sekmesi */}
            <TabsContent value="approval" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Onay Süreci</CardTitle>
                  <CardDescription>Dokümanın hazırlama, inceleme ve onay bilgileri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preparedBy">Hazırlayan *</Label>
                      <Select
                        value={formData.preparedBy}
                        onValueChange={(value) => handleInputChange("preparedBy", value)}
                      >
                        <SelectTrigger className={errors.preparedBy ? "border-destructive" : ""}>
                          <SelectValue placeholder="Hazırlayan seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.role}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.preparedBy && <p className="text-sm text-destructive">{errors.preparedBy}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reviewedBy">İnceleyen</Label>
                      <Select
                        value={formData.reviewedBy}
                        onValueChange={(value) => handleInputChange("reviewedBy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="İnceleyen seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.role}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="approvedBy">Onaylayan</Label>
                      <Select
                        value={formData.approvedBy}
                        onValueChange={(value) => handleInputChange("approvedBy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Onaylayan seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.role}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Yürürlük Tarihi</Label>
                      <Input
                        id="effectiveDate"
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextReviewDate">Sonraki Revizyon Tarihi</Label>
                      <Input
                        id="nextReviewDate"
                        type="date"
                        value={formData.nextReviewDate}
                        onChange={(e) => handleInputChange("nextReviewDate", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dağıtım Sekmesi */}
            <TabsContent value="distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dağıtım Listesi</CardTitle>
                  <CardDescription>Dokümanın kimler tarafından kullanılacağını belirtin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Dağıtım Listesi</Label>
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dist-${user.id}`}
                          checked={formData.distributionList.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange("distributionList", [...formData.distributionList, user.id])
                            } else {
                              handleInputChange(
                                "distributionList",
                                formData.distributionList.filter((id) => id !== user.id),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`dist-${user.id}`} className="flex items-center space-x-2 cursor-pointer">
                          <User className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.role}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trainingRequired"
                        checked={formData.trainingRequired}
                        onCheckedChange={(checked) => handleInputChange("trainingRequired", checked)}
                      />
                      <Label htmlFor="trainingRequired" className="cursor-pointer">
                        Eğitim Gereksinimi Var
                      </Label>
                    </div>

                    {formData.trainingRequired && (
                      <div className="space-y-2">
                        <Label htmlFor="trainingDescription">Eğitim Açıklaması</Label>
                        <Textarea
                          id="trainingDescription"
                          placeholder="Gerekli eğitim türü ve içeriğini açıklayın"
                          rows={3}
                          value={formData.trainingDescription}
                          onChange={(e) => handleInputChange("trainingDescription", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ISO 17025 Sekmesi */}
            <TabsContent value="iso" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>ISO 17025 Uyumluluk</CardTitle>
                  <CardDescription>ISO 17025 standardı ile ilgili özel gereksinimler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>İlgili ISO Standartları</Label>
                    {isoStandards.map((standard) => (
                      <div key={standard.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={standard.id}
                            checked={formData.isoMappings.includes(standard.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("isoMappings", [...formData.isoMappings, standard.id])
                              } else {
                                handleInputChange(
                                  "isoMappings",
                                  formData.isoMappings.filter((id) => id !== standard.id),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={standard.id} className="flex items-center space-x-2 cursor-pointer">
                            <Badge variant="outline" className="font-mono">
                              {standard.code}
                            </Badge>
                            <span>{standard.name}</span>
                          </Label>
                        </div>
                        {formData.isoMappings.includes(standard.id) && (
                          <div className="ml-6 space-y-2">
                            <Label className="text-sm">İlgili Maddeler</Label>
                            <div className="flex flex-wrap gap-2">
                              {standard.clauses.map((clause) => (
                                <div key={clause} className="flex items-center space-x-1">
                                  <Checkbox
                                    id={`${standard.id}-${clause}`}
                                    checked={formData.relatedStandardClauses.includes(`${standard.code}-${clause}`)}
                                    onCheckedChange={(checked) => {
                                      const clauseId = `${standard.code}-${clause}`
                                      if (checked) {
                                        handleInputChange("relatedStandardClauses", [
                                          ...formData.relatedStandardClauses,
                                          clauseId,
                                        ])
                                      } else {
                                        handleInputChange(
                                          "relatedStandardClauses",
                                          formData.relatedStandardClauses.filter((id) => id !== clauseId),
                                        )
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`${standard.id}-${clause}`} className="text-sm cursor-pointer">
                                    {clause}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* ISO 17025 Özel Alanları */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="measurementUncertainty">Ölçüm Belirsizliği</Label>
                      <Textarea
                        id="measurementUncertainty"
                        placeholder="Ölçüm belirsizliği ile ilgili bilgiler"
                        rows={3}
                        value={formData.measurementUncertainty}
                        onChange={(e) => handleInputChange("measurementUncertainty", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validationMethod">Doğrulama Yöntemi</Label>
                      <Textarea
                        id="validationMethod"
                        placeholder="Yöntem doğrulama prosedürleri"
                        rows={3}
                        value={formData.validationMethod}
                        onChange={(e) => handleInputChange("validationMethod", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="equipmentRequirements">Ekipman Gereksinimleri</Label>
                      <Textarea
                        id="equipmentRequirements"
                        placeholder="Gerekli ekipman ve kalibrasyonlar"
                        rows={3}
                        value={formData.equipmentRequirements}
                        onChange={(e) => handleInputChange("equipmentRequirements", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="environmentalConditions">Çevresel Koşullar</Label>
                      <Textarea
                        id="environmentalConditions"
                        placeholder="Sıcaklık, nem, basınç vb. gereksinimler"
                        rows={3}
                        value={formData.environmentalConditions}
                        onChange={(e) => handleInputChange("environmentalConditions", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="competencyRequirements">Yetkinlik Gereksinimleri</Label>
                      <Textarea
                        id="competencyRequirements"
                        placeholder="Personel yetkinlik ve eğitim gereksinimleri"
                        rows={3}
                        value={formData.competencyRequirements}
                        onChange={(e) => handleInputChange("competencyRequirements", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Kod</span>
                  <span className="text-sm font-mono">{formData.documentCode || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Kategori</span>
                  {selectedCategory ? (
                    <Badge variant="outline" className="font-mono text-xs">
                      {selectedCategory.code}
                    </Badge>
                  ) : (
                    <span className="text-sm">—</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Departman</span>
                  <span className="text-sm">{selectedDepartment?.name || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Durum</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                    Taslak
                  </Badge>
                </div>
                {formData.keywords.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Anahtar Kelimeler</span>
                    <div className="flex flex-wrap gap-1">
                      {formData.keywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {formData.keywords.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{formData.keywords.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" onClick={() => handleSubmit("submit")} disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Gönderiliyor..." : "İncelemeye Gönder"}
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleSubmit("save")}
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                Taslak Olarak Kaydet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
