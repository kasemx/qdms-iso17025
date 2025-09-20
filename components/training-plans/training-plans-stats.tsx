import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  CheckCircle, 
  Star, 
  TrendingUp,
  Users,
  Clock,
  Target,
  Award
} from "lucide-react"

interface TrainingPlan {
  id: string
  title: string
  status: string
  completionRate: number
  satisfactionScore: number
  effectivenessScore: number
  currentParticipants: number
  maxParticipants: number
  cost: number
}

interface TrainingPlansStatsProps {
  plans: TrainingPlan[]
}

export function TrainingPlansStats({ plans }: TrainingPlansStatsProps) {
  const completedPlans = plans.filter(p => p.status === "completed").length
  const ongoingPlans = plans.filter(p => p.status === "ongoing").length
  const averageSatisfaction = plans.length > 0 
    ? plans.reduce((sum, p) => sum + p.satisfactionScore, 0) / plans.length 
    : 0
  const averageEffectiveness = plans.length > 0 
    ? plans.reduce((sum, p) => sum + p.effectivenessScore, 0) / plans.length 
    : 0
  const totalParticipants = plans.reduce((sum, p) => sum + p.currentParticipants, 0)
  const averageCompletion = plans.length > 0 
    ? plans.reduce((sum, p) => sum + p.completionRate, 0) / plans.length 
    : 0
  const totalCost = plans.reduce((sum, p) => sum + p.cost, 0)
  const plansByCategory = plans.reduce((acc, plan) => {
    acc[plan.status] = (acc[plan.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {/* Toplam Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Plan</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{plans.length}</div>
          <p className="text-xs text-muted-foreground">
            {ongoingPlans} devam ediyor
          </p>
          <Progress value={(ongoingPlans / plans.length) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Tamamlanan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {completedPlans}
          </div>
          <p className="text-xs text-muted-foreground">
            Bu ay tamamlanan
          </p>
          <Progress value={(completedPlans / plans.length) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Ortalama Memnuniyet */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ortalama Memnuniyet</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {averageSatisfaction.toFixed(1)}/5
          </div>
          <p className="text-xs text-muted-foreground">
            Katılımcı değerlendirmesi
          </p>
          <Progress value={(averageSatisfaction / 5) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Etkinlik Skoru */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Etkinlik Skoru</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {averageEffectiveness.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Öğrenme hedeflerine ulaşım
          </p>
          <Progress value={averageEffectiveness} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Toplam Katılımcı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Katılımcı</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {totalParticipants}
          </div>
          <p className="text-xs text-muted-foreground">
            Aktif eğitim alan personel
          </p>
        </CardContent>
      </Card>

      {/* Ortalama Tamamlanma */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ortalama Tamamlanma</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {averageCompletion.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Plan tamamlanma oranı
          </p>
          <Progress value={averageCompletion} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Toplam Bütçe */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Bütçe</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(totalCost)}
          </div>
          <p className="text-xs text-muted-foreground">
            Bu yıl harcanan toplam
          </p>
        </CardContent>
      </Card>

      {/* Bu Ay Durumu */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bu Ay Durumu</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Planlandı</span>
              <span className="font-medium">{plansByCategory.planned || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Devam Ediyor</span>
              <span className="font-medium text-blue-600">{plansByCategory.ongoing || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tamamlandı</span>
              <span className="font-medium text-green-600">{plansByCategory.completed || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}