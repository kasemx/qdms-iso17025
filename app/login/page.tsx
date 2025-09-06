"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Lock, Mail, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // API çağrısı burada yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simülasyon
      // Başarılı giriş sonrası yönlendirme
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Giriş bilgileri hatalı. Lütfen tekrar deneyin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo ve Başlık */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">QDMS</h1>
            <p className="text-muted-foreground">Kalite Doküman Yönetim Sistemi</p>
          </div>

          {/* ISO Badges */}
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
              ISO 9001
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
              ISO 17025
            </Badge>
            <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
              ISO 14001
            </Badge>
          </div>
        </div>

        {/* Giriş Formu */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sisteme Giriş</CardTitle>
            <CardDescription className="text-center">Hesabınızla giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@sirket.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Şifrenizi mi unuttunuz? <button className="text-primary hover:underline">Şifre sıfırlama</button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Bilgileri */}
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Demo Giriş Bilgileri</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>
                  <strong>E-posta:</strong> admin@company.com
                </p>
                <p>
                  <strong>Şifre:</strong> admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 QDMS. Tüm hakları saklıdır.</p>
          <p>ISO standartlarına uyumlu doküman yönetim çözümü</p>
        </div>
      </div>
    </div>
  )
}
