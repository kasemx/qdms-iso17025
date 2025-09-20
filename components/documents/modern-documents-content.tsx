/**
 * Advanced Modern Documents Content Component
 * @description Modern UI/UX tasarımı ile gelişmiş doküman yönetim sistemi
 * 
 * 🚀 ADVANCED FEATURES:
 * 📋 Document workflow management
 * 🔍 AI-powered search with suggestions
 * 📊 Real-time analytics dashboard
 * ⚡ Bulk operations with progress tracking
 * 🔄 Version control and history
 * 👥 Collaboration features
 * 📱 QR code generation
 * 🔒 Advanced permissions
 * 📈 Compliance tracking
 * 💬 Document comments
 * 📧 Automated notifications
 * 🔐 Digital signatures
 */

"use client"

import { useState, useEffect, memo, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Archive,
  Grid3X3,
  List,
  Calendar,
  Users,
  Activity,
  Sparkles,
  Zap,
  Heart,
  Bookmark,
  Share2,
  ArrowRight,
  ChevronDown,
  X,
  SlidersHorizontal,
  BarChart3,
  PieChart,
  Layers,
  Lightbulb,
  Workflow,
  Shield,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { mockApi } from "@/lib/mock-data"
import { toast } from "sonner"
import { DOCUMENT_CONSTANTS } from "@/lib/constants/dashboard"
import { 
  Document, 
  getStatusIcon, 
  getStatusVariant, 
  getStatusText, 
  formatFileSize, 
  formatDate,
} from "@/lib/document-utils"
import {
  AdvancedSearchBox,
  BulkOperationsPanel,
  DocumentWorkflowPanel,
  CollaborationPanel,
  AnalyticsDashboard,
  QRCodeGenerator,
  ComplianceTracker,
} from "./advanced-features"

// Modern UI Components
const GlassCard = ({ children, className, ...props }: any) => (
  <div 
    className={cn(
      "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-gray-900/80",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const ModernButton = ({ children, variant = "primary", className, ...props }: any) => (
  <Button
    className={cn(
      "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
      variant === "primary" && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0",
      variant === "secondary" && "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0",
      variant === "accent" && "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0",
      variant === "glass" && "backdrop-blur-md bg-white/60 hover:bg-blue-500 dark:bg-gray-800/70 dark:hover:bg-blue-600 border border-gray-300/40 dark:border-gray-600/40 hover:text-white hover:border-blue-500 shadow-md hover:shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </Button>
)

const ModernBadge = ({ children, variant = "default", size = "default", className, ...props }: any) => (
  <Badge
    className={cn(
      "rounded-full px-3 py-1",
      variant === "success" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      variant === "warning" && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      variant === "danger" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      variant === "info" && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      size === "sm" && "text-xs px-2 py-1",
      className
    )}
    {...props}
  >
    {children}
  </Badge>
)

const MetricCard = ({ icon: Icon, title, value, change, color = "blue" }: any) => (
  <GlassCard className="p-6 group hover:transform hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <div className="flex items-center space-x-1">
            <TrendingUp className={cn("h-4 w-4", `text-${color}-500`)} />
            <span className={cn("text-sm font-medium", `text-${color}-600`)}>{change}</span>
          </div>
        )}
      </div>
      <div className={cn(
        "p-3 rounded-full transition-all duration-300 group-hover:scale-110",
        color === "blue" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        color === "green" && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        color === "purple" && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        color === "orange" && "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
      )}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </GlassCard>
)

const ModernDocumentCard = ({ document, onSelect, isSelected, onQuickView }: any) => (
  <GlassCard className="p-6 group hover:transform hover:scale-102 transition-all duration-300 relative overflow-hidden">
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Quick Actions Overlay - Always visible with better contrast */}
    <div className="absolute top-4 right-4 opacity-75 group-hover:opacity-100 transition-all duration-300 z-30">
      <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg p-1.5 shadow-lg border border-gray-200/50 dark:border-gray-600/50">
        <QRCodeGenerator document={document} />
        <ModernButton
          variant="glass"
          size="sm"
          onClick={() => onQuickView && onQuickView(document)}
          className="h-8 w-8 p-0 rounded-full hover:bg-blue-500 hover:text-white shadow-sm z-10 relative"
        >
          <Eye className="h-4 w-4" />
        </ModernButton>
      </div>
    </div>
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(document.id)}
            className="rounded-md"
          />
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusVariant(document.status) as any} className="rounded-full px-3 py-1">
            {getStatusText(document.status)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 z-20 relative"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                <Eye className="mr-2 h-4 w-4" />
                Görüntüle
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                <Download className="mr-2 h-4 w-4" />
                İndir
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                <Edit className="mr-2 h-4 w-4" />
                Düzenle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {document.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{document.code}</p>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {document.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {document.author.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 dark:text-gray-400">{document.author}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(document.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  </GlassCard>
)

const FilterSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <div className={cn(
    "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-in-out",
    isOpen ? "translate-x-0" : "translate-x-full"
  )}>
    <GlassCard className="h-full rounded-none rounded-l-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtreler</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Filter content would go here */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Durum</label>
          <div className="mt-2 space-y-2">
            {['Tümü', 'Taslak', 'İnceleme', 'Onaylandı', 'Yayınlandı'].map((status) => (
              <label key={status} className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm text-gray-600 dark:text-gray-400">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  </div>
)

/**
 * Modern Documents Content Component
 */
export const ModernDocumentsContent = memo(function ModernDocumentsContent() {
  // States
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [workflowView, setWorkflowView] = useState(false)

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const docsData = await mockApi.getDocuments()
        setDocuments(docsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast.error("Veriler yüklenirken hata oluştu")
      }
    }
    
    loadData()
  }, [])

  // Memoized filtered documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents
    
    if (searchTerm) {
      filtered = documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(doc => doc.status === activeTab)
    }
    
    return filtered
  }, [documents, searchTerm, activeTab])

  // Event handlers
  const handleSelectDocument = useCallback((documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }, [])
  
  const handleDocumentCardSelect = useCallback((document: Document) => {
    setSelectedDocument(document)
    setShowAdvancedFeatures(true)
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id))
    }
  }, [selectedDocuments.length, filteredDocuments])

  const handleBulkOperation = useCallback(async (operation: string) => {
    try {
      await mockApi.bulkOperation(operation, selectedDocuments)
      setSelectedDocuments([])
      toast.success(`${operation} işlemi başarıyla tamamlandı`)
      
      // Refresh data
      const updatedDocs = await mockApi.getDocuments()
      setDocuments(updatedDocs)
    } catch (error) {
      toast.error("İşlem sırasında hata oluştu")
    }
  }, [selectedDocuments])

  const handleAdvancedSearch = useCallback((searchValue: string) => {
    setSearchTerm(searchValue)
  }, [])

  const handleDocumentSelect = useCallback((document: Document) => {
    setSelectedDocument(document)
    setShowAdvancedFeatures(true)
  }, [])

  // Calculate metrics
  const metrics = useMemo(() => ({
    total: documents.length,
    published: documents.filter(d => d.status === "published").length,
    review: documents.filter(d => d.status === "review").length,
    draft: documents.filter(d => d.status === "draft").length,
  }), [documents])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Removed duplicate header - now handled by EnhancedDocumentsPage */}
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={FileText}
            title="Toplam Doküman"
            value={metrics.total}
            change="+12%"
            color="blue"
          />
          <MetricCard
            icon={CheckCircle}
            title="Yayınlanan"
            value={metrics.published}
            change="+8%"
            color="green"
          />
          <MetricCard
            icon={Clock}
            title="İncelemede"
            value={metrics.review}
            change="+5%"
            color="orange"
          />
          <MetricCard
            icon={Edit}
            title="Taslak"
            value={metrics.draft}
            change="-3%"
            color="purple"
          />
        </div>

        {/* Search and Controls */}
        <GlassCard className="p-6 mb-8">
          {/* Bulk Operations Panel */}
          <BulkOperationsPanel 
            selectedCount={selectedDocuments.length}
            onOperation={handleBulkOperation}
          />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Enhanced Search */}
            <div className="flex-1 max-w-2xl">
              <AdvancedSearchBox 
                onSearch={handleAdvancedSearch}
                className=""
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Advanced Features Toggle */}
              <ModernButton
                variant={showAdvancedFeatures ? "primary" : "secondary"}
                onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                className="flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Gelişmiş Özellikler</span>
              </ModernButton>
              
              {/* Workflow View Toggle */}
              <ModernButton
                variant={workflowView ? "primary" : "secondary"}
                onClick={() => setWorkflowView(!workflowView)}
                className="flex items-center space-x-2"
              >
                <Workflow className="h-4 w-4" />
                <span>İş Akışı</span>
              </ModernButton>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1.5 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-xl transition-all duration-200",
                    viewMode === "grid" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-xl transition-all duration-200",
                    viewMode === "list" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <ModernButton
                variant="secondary"
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filtreler</span>
              </ModernButton>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <TabsTrigger value="all" className="rounded-xl">Tümü ({metrics.total})</TabsTrigger>
                <TabsTrigger value="published" className="rounded-xl">Yayınlanan ({metrics.published})</TabsTrigger>
                <TabsTrigger value="review" className="rounded-xl">İnceleme ({metrics.review})</TabsTrigger>
                <TabsTrigger value="draft" className="rounded-xl">Taslak ({metrics.draft})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </GlassCard>

        {/* Documents Grid/List */}
        <div className="mb-8">
          {workflowView ? (
            /* Workflow View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Workflow Steps */}
              <div className="lg:col-span-2">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Doküman İş Akışı</h3>
                  <div className="space-y-4">
                    {filteredDocuments.slice(0, 3).map((document) => (
                      <div key={document.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{document.title}</h4>
                          <Badge variant={getStatusVariant(document.status) as any}>
                            {getStatusText(document.status)}
                          </Badge>
                        </div>
                        <DocumentWorkflowPanel document={document} />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
              
              {/* Workflow Stats */}
              <div className="space-y-6">
                <ComplianceTracker document={selectedDocument} />
                <AnalyticsDashboard document={selectedDocument} />
              </div>
            </div>
          ) : (
            /* Regular Grid/List View */
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((document) => (
                  <ModernDocumentCard
                    key={document.id}
                    document={document}
                    onSelect={handleSelectDocument}
                    onQuickView={handleDocumentCardSelect}
                    isSelected={selectedDocuments.includes(document.id)}
                  />
                ))}
              </div>
            ) : (
              <GlassCard className="overflow-hidden">
                {/* Enhanced List View */}
                <div className="divide-y">
                  {filteredDocuments.map((document) => (
                    <div key={document.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={() => handleSelectDocument(document.id)}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{document.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{document.code}</p>
                            <p className="text-sm text-gray-500 mt-1">{document.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={getStatusVariant(document.status) as any} className="shadow-sm">
                            {getStatusText(document.status)}
                          </Badge>
                          <QRCodeGenerator document={document} />
                          <ModernButton
                            variant="glass"
                            size="sm"
                            onClick={() => handleDocumentCardSelect(document)}
                            className="shadow-sm hover:shadow-md z-10 relative"
                          >
                            <Eye className="h-4 w-4" />
                          </ModernButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )
          )}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <GlassCard className="p-12 text-center">
            <div className="space-y-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 w-fit mx-auto">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Doküman bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Arama kriterlerinizi değiştirmeyi deneyin veya yeni bir doküman ekleyin.
              </p>
              <ModernButton variant="primary" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Doküman Ekle
              </ModernButton>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar isOpen={showFilters} onClose={() => setShowFilters(false)} />
      
      {/* Advanced Features Panel */}
      {showAdvancedFeatures && selectedDocument && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 transform transition-transform duration-300">
          <GlassCard className="h-full rounded-none rounded-l-2xl p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gelişmiş Özellikler
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAdvancedFeatures(false)} 
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Document Info */}
            <div className="space-y-2">
              <h3 className="font-medium">{selectedDocument.title}</h3>
              <p className="text-sm text-gray-500">{selectedDocument.code}</p>
            </div>
            
            {/* Advanced Feature Components */}
            <div className="space-y-6">
              <DocumentWorkflowPanel document={selectedDocument} />
              <CollaborationPanel document={selectedDocument} />
              <ComplianceTracker document={selectedDocument} />
              <AnalyticsDashboard document={selectedDocument} />
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  Hızlı İşlemler
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <QRCodeGenerator document={selectedDocument} />
                  <ModernButton variant="glass" size="sm" className="shadow-sm hover:shadow-md">
                    <Share2 className="h-4 w-4" />
                    Paylaş
                  </ModernButton>
                  <ModernButton variant="glass" size="sm" className="shadow-sm hover:shadow-md">
                    <Download className="h-4 w-4" />
                    İndir
                  </ModernButton>
                  <ModernButton variant="glass" size="sm" className="shadow-sm hover:shadow-md">
                    <Edit className="h-4 w-4" />
                    Düzenle
                  </ModernButton>
                </div>
              </div>
              
              {/* Digital Signature */}
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Dijital İmza</span>
                  </div>
                  <ModernBadge variant="success" size="sm">
                    Doğrulandı
                  </ModernBadge>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Son güncelleme: 15 Mart 2024
                </p>
              </GlassCard>
              
              {/* Comments Section */}
              <GlassCard className="p-4">
                <h4 className="font-medium text-sm mb-3">Son Yorumlar</h4>
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="font-medium">Ahmet Y.</span>
                    <span className="text-gray-500 ml-2">Doküman güncel ve uygun</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Fatma K.</span>
                    <span className="text-gray-500 ml-2">Teknik inceleme tamamlandı</span>
                  </div>
                </div>
                <ModernButton variant="glass" size="sm" className="w-full mt-3 shadow-sm hover:shadow-md">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Yorum Ekle
                </ModernButton>
              </GlassCard>
            </div>
          </GlassCard>
        </div>
      )}
      
      {/* Backdrop */}
      {(showFilters || showAdvancedFeatures) && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-45"
          onClick={() => {
            setShowFilters(false)
            setShowAdvancedFeatures(false)
          }}
        />
      )}
    </div>
  )
})