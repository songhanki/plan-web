import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, Evan</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentDate}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 신청 진행 현황 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">신청 진행 현황</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
              </Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "휴가 (연차)",
                  type: "휴가",
                  duration: "3 days",
                  startDate: "Sep 13, 2020",
                  endDate: "Sep 16, 2020",
                  status: "승인",
                  statusColor: "bg-yellow-100 text-yellow-800"
                },
                {
                  id: "휴가 (공가)",
                  type: "휴가",
                  duration: "3 days",
                  startDate: "Sep 13, 2020",
                  endDate: "Sep 16, 2020",
                  status: "대기",
                  statusColor: "bg-green-100 text-green-800"
                },
                {
                  id: "휴가(복귀예정)",
                  type: "휴가",
                  duration: "3 days",
                  startDate: "Sep 13, 2020",
                  endDate: "Sep 16, 2020",
                  status: "반려",
                  statusColor: "bg-red-100 text-red-800"
                }
              ].map((item, index) => (
                <Card key={index} className="p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-8 bg-primary rounded-full" />
                      <div>
                        <h3 className="font-medium text-foreground">{item.id}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{item.type}</span>
                          <span>{item.duration}</span>
                          <span>{item.startDate}</span>
                          <span>{item.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}>
                        {item.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">공지사항</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </div>
              <Card className="p-6 min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">공지사항이 없습니다.</p>
              </Card>
            </div>
          </div>

          {/* 오른쪽: 일일업무 일정 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">일일업무 일정</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "스프린트 계획 (외부 개발자)",
                  time: "09:00 AM",
                  type: "meeting"
                },
                {
                  title: "차세대 UX",
                  time: "03:00 PM",
                  type: "design"
                },
                {
                  title: "개발 기반 보고 및 체크리스트",
                  time: "06:20 PM",
                  type: "review"
                }
              ].map((task, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm">{task.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full py-6 border-dashed border-2 hover:bg-muted/50"
            >
              <Plus className="h-4 w-4 mr-2" />
              일정 추가하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard