import { useState } from "react"
import { Plus, Calendar, Clock, MapPin, Check, X, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const Vacation = () => {
  // 샘플 휴가 데이터
  const [vacations, setVacations] = useState([
    {
      id: 1,
      type: "연차",
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      days: 2,
      reason: "개인 용무",
      status: "승인",
      appliedDate: "2024-01-10"
    },
    {
      id: 2,
      type: "반차",
      startDate: "2024-01-25",
      endDate: "2024-01-25",
      days: 0.5,
      reason: "병원 진료",
      status: "대기",
      appliedDate: "2024-01-15"
    },
    {
      id: 3,
      type: "연차",
      startDate: "2024-03-10",
      endDate: "2024-03-14",
      days: 5,
      reason: "가족 여행",
      status: "대기",
      appliedDate: "2024-01-16"
    },
    {
      id: 4,
      type: "병가",
      startDate: "2024-01-05",
      endDate: "2024-01-05",
      days: 1,
      reason: "몸살감기",
      status: "승인",
      appliedDate: "2024-01-04"
    }
  ])

  const totalVacationDays = 25
  const usedVacationDays = 8.5
  const remainingVacationDays = totalVacationDays - usedVacationDays
  const pendingDays = vacations
    .filter(v => v.status === "대기")
    .reduce((sum, v) => sum + v.days, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "승인": return "bg-success text-success-foreground"
      case "대기": return "bg-warning text-warning-foreground"
      case "거절": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "승인": return <Check className="h-3 w-3" />
      case "대기": return <Clock className="h-3 w-3" />
      case "거절": return <X className="h-3 w-3" />
      default: return <AlertCircle className="h-3 w-3" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "연차": return "bg-primary text-primary-foreground"
      case "반차": return "bg-accent text-accent-foreground"
      case "병가": return "bg-destructive text-destructive-foreground"
      case "특별휴가": return "bg-muted text-muted-foreground"
      default: return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-accent">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">휴가 관리</h1>
          </div>
          <Button className="bg-gradient-accent hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            휴가 신청
          </Button>
        </div>

        {/* 휴가 현황 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">총 휴가일</p>
                <p className="text-3xl font-bold text-primary">{totalVacationDays}일</p>
                <p className="text-xs text-muted-foreground">연간 배정</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">사용한 휴가</p>
                <p className="text-3xl font-bold text-destructive">{usedVacationDays}일</p>
                <p className="text-xs text-muted-foreground">
                  {((usedVacationDays / totalVacationDays) * 100).toFixed(1)}% 사용
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">남은 휴가</p>
                <p className="text-3xl font-bold text-success">{remainingVacationDays}일</p>
                <p className="text-xs text-muted-foreground">사용 가능</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">승인 대기</p>
                <p className="text-3xl font-bold text-warning">{pendingDays}일</p>
                <p className="text-xs text-muted-foreground">검토 중</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 휴가 사용률 */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>휴가 사용 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>사용률</span>
                <span>{((usedVacationDays / totalVacationDays) * 100).toFixed(1)}%</span>
              </div>
              <Progress 
                value={(usedVacationDays / totalVacationDays) * 100} 
                className="h-3"
              />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-4 h-4 bg-success rounded-full mx-auto mb-1"></div>
                  <p className="text-muted-foreground">남은 휴가</p>
                  <p className="font-semibold">{remainingVacationDays}일</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-destructive rounded-full mx-auto mb-1"></div>
                  <p className="text-muted-foreground">사용한 휴가</p>
                  <p className="font-semibold">{usedVacationDays}일</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-warning rounded-full mx-auto mb-1"></div>
                  <p className="text-muted-foreground">승인 대기</p>
                  <p className="font-semibold">{pendingDays}일</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 휴가 신청 내역 */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>휴가 신청 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vacations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>신청한 휴가가 없습니다</p>
                </div>
              ) : (
                vacations.map((vacation) => (
                  <div
                    key={vacation.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-soft"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getTypeColor(vacation.type)}>
                          {vacation.type}
                        </Badge>
                        <Badge className={getStatusColor(vacation.status)}>
                          {getStatusIcon(vacation.status)}
                          <span className="ml-1">{vacation.status}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {vacation.days}일
                        </p>
                        <p className="text-xs text-muted-foreground">
                          신청일: {new Date(vacation.appliedDate).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">
                      {vacation.reason}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        시작일: {new Date(vacation.startDate).toLocaleDateString('ko-KR')}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        종료일: {new Date(vacation.endDate).toLocaleDateString('ko-KR')}
                      </div>
                    </div>

                    {vacation.status === "대기" && (
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          수정
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          취소
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* 휴가 유형별 통계 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>월별 휴가 사용</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "1월", days: 2.5, percentage: 60 },
                  { month: "2월", days: 2, percentage: 45 },
                  { month: "3월", days: 5, percentage: 90 },
                  { month: "4월", days: 0, percentage: 0 },
                ].map((item) => (
                  <div key={item.month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.month}</span>
                      <span>{item.days}일</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>휴가 유형별 사용</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "연차", count: 3, days: 7, color: "bg-primary" },
                  { type: "반차", count: 1, days: 0.5, color: "bg-accent" },
                  { type: "병가", count: 1, days: 1, color: "bg-destructive" },
                  { type: "특별휴가", count: 0, days: 0, color: "bg-muted" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.days}일</p>
                      <p className="text-xs text-muted-foreground">{item.count}회 신청</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Vacation