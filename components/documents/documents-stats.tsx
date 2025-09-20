import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  FileText,
  CheckCircle,
  Clock,
  Archive,
  Shield,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle
} from "lucide-react"

interface DocumentStats {
  totalDocuments: number
  activeDocuments: number
  draftDocuments: number
  reviewDocuments: number
  approvedDocuments: number
  obsoleteDocuments: number
  externalDocuments: number
  totalCategories: number
  totalVersions: number
  averageReviewTime: string
  complianceRate: number
  workflowStats: {
    pendingReview: number
    pendingApproval: number
    published: number
    obsolete: number
    external: number
  }
  retentionStats: {
    expiringSoon: number
    expired: number
    archived: number
  }
  securityStats: {
    confidential: number
    internal: number
    public: number
  }
}

interface CategoryStats {
  category: string
  count: number
  percentage: number
  trend: string
  color: string
}

interface DocumentsStatsProps {
  documentStats: DocumentStats | null
  categoryStats: CategoryStats[]
  isLoading?: boolean
}

export function DocumentsStats({ documentStats, categoryStats, isLoading = false }: DocumentsStatsProps) {
  if (isLoading || !documentStats) {
    return (
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-3 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Toplam Doküman */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Doküman</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              {documentStats.activeDocuments} aktif doküman
            </p>
            <div className="mt-2">
              <Progress 
                value={(documentStats.activeDocuments / documentStats.totalDocuments) * 100} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((documentStats.activeDocuments / documentStats.totalDocuments) * 100)}% aktif
              </p>
            </div>
          </CardContent>
        </Card>

        {/* İnceleme Bekleyen */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {documentStats.workflowStats.pendingReview}
            </div>
            <p className="text-xs text-muted-foreground">
              Ortalama süre: {documentStats.averageReviewTime}
            </p>
            <div className="mt-2">
              <Progress 
                value={(documentStats.workflowStats.pendingReview / documentStats.totalDocuments) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Onaylanmış Dokümanlar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onaylanmış</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documentStats.approvedDocuments}
            </div>
            <p className="text-xs text-muted-foreground">
              Yayınlanmış dokümanlar
            </p>
            <div className="mt-2">
              <Progress 
                value={(documentStats.approvedDocuments / documentStats.totalDocuments) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Uyumluluk Oranı */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uyumluluk Oranı</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {documentStats.complianceRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              ISO 17025 uyumluluğu
            </p>
            <div className="mt-2">
              <Progress value={documentStats.complianceRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Workflow Durumu */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Workflow Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">İnceleme</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.workflowStats.pendingReview / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium">{documentStats.workflowStats.pendingReview}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Onay</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.workflowStats.pendingApproval / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium">{documentStats.workflowStats.pendingApproval}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Yayınlandı</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.workflowStats.published / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium">{documentStats.workflowStats.published}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Seviyeleri */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Güvenlik Seviyeleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Gizli</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.securityStats.confidential / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium text-red-600">{documentStats.securityStats.confidential}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">İç Kullanım</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.securityStats.internal / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium text-yellow-600">{documentStats.securityStats.internal}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Genel</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(documentStats.securityStats.public / documentStats.totalDocuments) * 100} 
                    className="h-1 w-12" 
                  />
                  <span className="text-xs font-medium text-green-600">{documentStats.securityStats.public}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saklama Durumu */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Saklama Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Süresi Dolacak</span>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium text-yellow-600">{documentStats.retentionStats.expiringSoon}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Süresi Dolmuş</span>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  <span className="text-xs font-medium text-red-600">{documentStats.retentionStats.expired}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Arşivlenmiş</span>
                <div className="flex items-center gap-2">
                  <Archive className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">{documentStats.retentionStats.archived}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kategori Dağılımı */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Kategori Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryStats.slice(0, 3).map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <span className="text-xs truncate">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={category.percentage} 
                      className="h-1 w-12" 
                      style={{ backgroundColor: category.color + '20' }}
                    />
                    <span className="text-xs font-medium">{category.count}</span>
                    {category.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : category.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}