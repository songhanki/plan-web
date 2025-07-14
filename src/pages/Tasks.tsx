import { useState } from "react"
import { Plus, Check, X, Clock, Filter, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  
  // 샘플 할 일 데이터
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "웹사이트 디자인 완성하기",
      description: "메인 페이지와 서브 페이지 디자인 마무리",
      completed: false,
      priority: "high",
      dueDate: "2024-01-20",
      category: "업무"
    },
    {
      id: 2,
      title: "월간 보고서 작성",
      description: "12월 실적 정리 및 1월 계획 수립",
      completed: false,
      priority: "medium",
      dueDate: "2024-01-18",
      category: "업무"
    },
    {
      id: 3,
      title: "운동하기",
      description: "헬스장에서 1시간 운동",
      completed: true,
      priority: "low",
      dueDate: "2024-01-15",
      category: "개인"
    },
    {
      id: 4,
      title: "팀 미팅 준비",
      description: "발표 자료 및 진행 상황 정리",
      completed: false,
      priority: "high",
      dueDate: "2024-01-16",
      category: "업무"
    },
    {
      id: 5,
      title: "독서",
      description: "자기계발서 30페이지 읽기",
      completed: false,
      priority: "low",
      dueDate: "2024-01-25",
      category: "개인"
    }
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive"
      case "medium": return "bg-warning"
      case "low": return "bg-success"
      default: return "bg-muted"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "높음"
      case "medium": return "보통"
      case "low": return "낮음"
      default: return "없음"
    }
  }

  const filteredTasks = tasks
    .filter(task => {
      if (selectedFilter === "completed") return task.completed
      if (selectedFilter === "pending") return !task.completed
      return true
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const completedCount = tasks.filter(task => task.completed).length
  const pendingCount = tasks.filter(task => !task.completed).length
  const highPriorityCount = tasks.filter(task => task.priority === "high" && !task.completed).length

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">할 일 관리</h1>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            할 일 추가
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">전체</p>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>
                <div className="p-2 rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">완료</p>
                  <p className="text-2xl font-bold text-success">{completedCount}</p>
                </div>
                <div className="p-2 rounded-full bg-success/10">
                  <Check className="h-4 w-4 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">진행중</p>
                  <p className="text-2xl font-bold text-accent">{pendingCount}</p>
                </div>
                <div className="p-2 rounded-full bg-accent/10">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">긴급</p>
                  <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
                </div>
                <div className="p-2 rounded-full bg-destructive/10">
                  <X className="h-4 w-4 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 및 검색 */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="할 일 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className={selectedFilter === "all" ? "bg-primary" : ""}
                >
                  전체
                </Button>
                <Button
                  variant={selectedFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("pending")}
                  className={selectedFilter === "pending" ? "bg-accent" : ""}
                >
                  진행중
                </Button>
                <Button
                  variant={selectedFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("completed")}
                  className={selectedFilter === "completed" ? "bg-success" : ""}
                >
                  완료
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 할 일 목록 */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>할 일 목록 ({filteredTasks.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>표시할 할 일이 없습니다</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${
                      task.completed 
                        ? "bg-muted/30 border-success/20" 
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${
                            task.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}>
                            {task.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={`${getPriorityColor(task.priority)} text-white`}
                            >
                              {getPriorityText(task.priority)}
                            </Badge>
                            <Badge variant="outline">
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${
                          task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                        }`}>
                          {task.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          마감: {new Date(task.dueDate).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Tasks