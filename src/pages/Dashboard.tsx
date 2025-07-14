import { Calendar, Clock, CheckSquare, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const today = new Date()
  const todayStr = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            안녕하세요! 👋
          </h1>
          <p className="text-lg text-muted-foreground">{todayStr}</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">오늘 할 일</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">5</div>
              <p className="text-xs text-muted-foreground">
                +2 어제보다
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">이번 주 일정</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12</div>
              <p className="text-xs text-muted-foreground">
                3개 중요 일정
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">남은 휴가</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">15일</div>
              <p className="text-xs text-muted-foreground">
                총 25일 중
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">생산성</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">85%</div>
              <p className="text-xs text-muted-foreground">
                +5% 지난 주 대비
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 액션 */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>빠른 액션</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 bg-gradient-primary hover:opacity-90 transition-opacity">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <span>일정 추가</span>
                </div>
              </Button>
              <Button className="h-20 bg-gradient-accent hover:opacity-90 transition-opacity">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <span>휴가 신청</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20 hover:bg-muted transition-colors">
                <div className="text-center">
                  <CheckSquare className="h-6 w-6 mx-auto mb-2" />
                  <span>할 일 추가</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>최근 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "팀 미팅", time: "오후 2:00", type: "회의" },
                  { title: "프로젝트 마감", time: "오후 6:00", type: "마감" },
                  { title: "점심 약속", time: "오후 12:30", type: "개인" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <span className="text-sm font-medium text-primary">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>진행 중인 작업</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "웹사이트 리뉴얼", progress: 75, status: "진행중" },
                  { title: "월간 보고서 작성", progress: 40, status: "진행중" },
                  { title: "신규 기능 기획", progress: 90, status: "거의 완료" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.status}</p>
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

export default Dashboard