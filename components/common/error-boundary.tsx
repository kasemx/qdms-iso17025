"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component - React hatalarını yakalar ve fallback UI gösterir
 * @description ISO 17025 uyumlu hata yönetimi için Error Boundary
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Error logging service'e gönder (production'da)
    if (process.env.NODE_ENV === 'production') {
      // Error tracking service'e gönder
      this.logErrorToService(error, errorInfo)
    }
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // Production'da error tracking service kullan
    console.error('Error logged:', { error, errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error!} 
          resetError={this.handleReset} 
        />
      )
    }

    return this.props.children
  }
}

/**
 * Default Error Fallback Component
 * @description Varsayılan hata görüntüleme bileşeni
 */
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-red-600">Bir Hata Oluştu</CardTitle>
          <CardDescription>
            Sayfa yüklenirken beklenmeyen bir hata oluştu. 
            Tekrar denemek için aşağıdaki butona tıklayabilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-50 p-3 rounded border">
              <summary className="cursor-pointer text-sm font-medium">
                Hata Detayları (Geliştirici Modu)
              </summary>
              <pre className="mt-2 text-xs overflow-auto">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
          
          <div className="flex gap-2 justify-center">
            <Button onClick={resetError} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Tekrar Dene
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Error Boundary Hook - Functional component'lerde hata yakalamak için
 */
export function useErrorHandler() {
  return (error: Error, errorInfo?: any) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    if (process.env.NODE_ENV === 'production') {
      // Error tracking service'e gönder
    }
  }
}

/**
 * Async Error Handler - Promise hataları için
 */
export function handleAsyncError(error: Error, context?: string) {
  console.error(`Async error ${context ? `in ${context}` : ''}:`, error)
  
  if (process.env.NODE_ENV === 'production') {
    // Error tracking service'e gönder
  }
}