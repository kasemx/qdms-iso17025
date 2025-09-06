"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"

export default function EditDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    documentCode: "PR-KG-001",
    title: "Doküman Kontrol Prosedürü",
    description: "Şirket içi dokümanların oluşturulması, onaylanması ve kontrolü için prosedür",
    category: "PR",
    department: "kalite-guvence",
    purpose:
      "Bu prosedür, organizasyondaki tüm dokümanların kontrollü bir şekilde oluşturulması, gözden geçirilmesi, onaylanması, dağıtılması ve güncellenmesi için gerekli süreçleri tanımlar.",
    scope:
      "Bu prosedür, kalite yönetim sistemi kapsamındaki tüm dokümanlar için geçerlidir. Buna prosedürler, talimatlar, formlar, kayıtlar ve dış kaynaklı dokümanlar dahildir.",
    procedure: "Doküman oluşturma ve kontrol süreçleri...",
    references: ["ISO 9001:2015 - Kalite Yönetim Sistemleri", "ISO 17025:2017 - Test ve Kalibrasyon Laboratuvarları"],
    keywords: ["doküman kontrol", "prosedür", "kalite", "onay", "versiyon"],
    preparedBy: "ahmet-yilmaz",
    reviewedBy: "fatma-demir",
    approvedBy: "mehmet-kaya",
    distribution: ["tum-departmanlar", "kalite-ekibi"],
    standardClauses: ["4.3 - Doküman Kontrolü", "4.13 - Kayıtların Kontrolü"],
    measurementUncertainty: "Uygulanamaz",
    validationMethod: "Doküman içeriğinin teknik inceleme ile doğrulanması",
    competencyRequirements: "Doküman hazırlayıcıları ilgili konuda yetkin olmalıdır",
  })

  const [newKeyword, setNewKeyword] = useState("")
  const [newReference, setNewReference] = useState("")
  const [newStandardClause, setNewStandardClause] = useState("")

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // API call to save document
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push(`/documents/${params.id}`)
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const addReference = () => {
    if (newReference.trim() && !formData.references.includes(newReference.trim())) {
      setFormData((prev) => ({
        ...prev,
        references: [...prev.references, newReference.trim()],
      }))
      setNewReference("")
    }
  }

  const removeReference = (reference: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((r) => r !== reference),
    }))
  }

  const addStandardClause = () => {
    if (newStandardClause.trim() && !formData.standardClauses.includes(newStandardClause.trim())) {
      setFormData((prev) => ({
        ...prev,
        standardClauses: [...prev.standardClauses, newStandardClause.trim()],
      }))
      setNewStandardClause("")
    }
  }

  const removeStandardClause = (clause: string) => {
    setFormData((prev) => ({
      ...prev,
      standardClauses: prev.standardClauses.filter((c) => c !== clause),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/documents/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Doküman Düzenle</h1>
            <p className="text-muted-foreground">
              {formData.documentCode} - {formData.title}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/documents/${params.id}`}>İptal</Link>
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="approval">Onay Bilgileri</TabsTrigger>
          <TabsTrigger value="distribution">Dağıtım</TabsTrigger>
          <TabsTrigger value="iso17025">ISO 17025</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentCode">Doküman Kodu</Label>
                  <Input
                    id="documentCode"
                    value={formData.documentCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, documentCode: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PR">Prosedür</SelectItem>
                      <SelectItem value="TL">Talimat</SelectItem>
                      <SelectItem value="FR">Form</SelectItem>
                      <SelectItem value="EK">El Kitabı</SelectItem>
                      <SelectItem value="KY">Kayıt</SelectItem>
                      <SelectItem value="PL">Politika</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kalite-guvence">Kalite Güvence</SelectItem>
                    <SelectItem value="laboratuvar">Laboratuvar</SelectItem>
                    <SelectItem value="insan-kaynaklari">İnsan Kaynakları</SelectItem>
                    <SelectItem value="uretim">Üretim</SelectItem>
                    <SelectItem value="satis">Satış</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Anahtar Kelimeler</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{keyword}</span>
                      <button onClick={() => removeKeyword(keyword)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Yeni anahtar kelime"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button type="button" variant="outline" onClick={addKeyword}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doküman İçeriği</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purpose">Amaç</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData((prev) => ({ ...prev, purpose: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">Kapsam</Label>
                <Textarea
                  id="scope"
                  value={formData.scope}
                  onChange={(e) => setFormData((prev) => ({ ...prev, scope: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedure">Prosedür</Label>
                <Textarea
                  id="procedure"
                  value={formData.procedure}
                  onChange={(e) => setFormData((prev) => ({ ...prev, procedure: e.target.value }))}
                  rows={10}
                  placeholder="Detaylı prosedür adımlarını yazın..."
                />
              </div>

              <div className="space-y-2">
                <Label>Referanslar</Label>
                <div className="space-y-2 mb-2">
                  {formData.references.map((reference, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{reference}</span>
                      <button
                        onClick={() => removeReference(reference)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Yeni referans"
                    value={newReference}
                    onChange={(e) => setNewReference(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addReference()}
                  />
                  <Button type="button" variant="outline" onClick={addReference}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onay Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preparedBy">Hazırlayan</Label>
                  <Select
                    value={formData.preparedBy}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, preparedBy: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmet-yilmaz">Ahmet Yılmaz</SelectItem>
                      <SelectItem value="fatma-demir">Fatma Demir</SelectItem>
                      <SelectItem value="mehmet-kaya">Mehmet Kaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewedBy">İnceleyen</Label>
                  <Select
                    value={formData.reviewedBy}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, reviewedBy: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmet-yilmaz">Ahmet Yılmaz</SelectItem>
                      <SelectItem value="fatma-demir">Fatma Demir</SelectItem>
                      <SelectItem value="mehmet-kaya">Mehmet Kaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approvedBy">Onaylayan</Label>
                  <Select
                    value={formData.approvedBy}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, approvedBy: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmet-yilmaz">Ahmet Yılmaz</SelectItem>
                      <SelectItem value="fatma-demir">Fatma Demir</SelectItem>
                      <SelectItem value="mehmet-kaya">Mehmet Kaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dağıtım Listesi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Dağıtım Yapılacak Birimler</Label>
                <div className="space-y-2">
                  {[
                    { id: "tum-departmanlar", label: "Tüm Departmanlar" },
                    { id: "kalite-ekibi", label: "Kalite Ekibi" },
                    { id: "yonetim", label: "Yönetim" },
                    { id: "laboratuvar", label: "Laboratuvar" },
                    { id: "uretim", label: "Üretim" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={formData.distribution.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              distribution: [...prev.distribution, item.id],
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              distribution: prev.distribution.filter((d) => d !== item.id),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iso17025" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ISO 17025 Gereksinimleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>İlgili Standart Maddeleri</Label>
                <div className="space-y-2 mb-2">
                  {formData.standardClauses.map((clause, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{clause}</span>
                      <button
                        onClick={() => removeStandardClause(clause)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Yeni standart maddesi"
                    value={newStandardClause}
                    onChange={(e) => setNewStandardClause(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addStandardClause()}
                  />
                  <Button type="button" variant="outline" onClick={addStandardClause}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurementUncertainty">Ölçüm Belirsizliği</Label>
                <Input
                  id="measurementUncertainty"
                  value={formData.measurementUncertainty}
                  onChange={(e) => setFormData((prev) => ({ ...prev, measurementUncertainty: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validationMethod">Doğrulama Yöntemi</Label>
                <Textarea
                  id="validationMethod"
                  value={formData.validationMethod}
                  onChange={(e) => setFormData((prev) => ({ ...prev, validationMethod: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competencyRequirements">Yetkinlik Gereksinimleri</Label>
                <Textarea
                  id="competencyRequirements"
                  value={formData.competencyRequirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, competencyRequirements: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
