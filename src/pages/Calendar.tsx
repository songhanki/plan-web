import { useState } from "react"
import { Calendar as CalendarIcon, Plus, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // 샘플 이벤트 데이터
  const events = [
    // 오늘 일정들
    {
      id: 1,
      title: "일일 스탠드업 미팅",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      type: "회의",
      location: "회의실 A",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "점심식사",
      date: new Date().toISOString().split('T')[0],
      time: "12:00",
      type: "개인",
      location: "사내 카페테리아",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "프로젝트 마감",
      date: new Date().toISOString().split('T')[0],
      time: "18:00",
      type: "마감",
      location: "온라인",
      color: "bg-destructive"
    },
    
    // 내일 일정들
    {
      id: 4,
      title: "클라이언트 미팅",
      date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      time: "10:30",
      type: "회의",
      location: "강남 오피스",
      color: "bg-primary"
    },
    {
      id: 5,
      title: "개발팀 회식",
      date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      time: "19:00",
      type: "회식",
      location: "홍대 맛집",
      color: "bg-orange-500"
    },
    
    // 이번 주 일정들
    {
      id: 6,
      title: "월간 성과 발표",
      date: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0],
      time: "14:00",
      type: "발표",
      location: "대회의실",
      color: "bg-blue-500"
    },
    {
      id: 7,
      title: "병원 예약",
      date: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
      time: "15:30",
      type: "개인",
      location: "서울대병원",
      color: "bg-pink-500"
    },
    {
      id: 8,
      title: "코드 리뷰",
      date: new Date(Date.now() + 4*24*60*60*1000).toISOString().split('T')[0],
      time: "11:00",
      type: "회의",
      location: "개발실",
      color: "bg-primary"
    },
    {
      id: 9,
      title: "주간 팀 빌딩",
      date: new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0],
      time: "16:00",
      type: "활동",
      location: "한강공원",
      color: "bg-green-500"
    },
    {
      id: 10,
      title: "가족 모임",
      date: new Date(Date.now() + 6*24*60*60*1000).toISOString().split('T')[0],
      time: "12:00",
      type: "개인",
      location: "집",
      color: "bg-purple-500"
    },
    
    // 다음 주 일정들
    {
      id: 11,
      title: "신입사원 교육",
      date: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      time: "09:30",
      type: "교육",
      location: "교육실",
      color: "bg-yellow-500"
    },
    {
      id: 12,
      title: "분기별 보고",
      date: new Date(Date.now() + 8*24*60*60*1000).toISOString().split('T')[0],
      time: "13:00",
      type: "보고",
      location: "임원실",
      color: "bg-red-500"
    },
    {
      id: 13,
      title: "UX 워크샵",
      date: new Date(Date.now() + 9*24*60*60*1000).toISOString().split('T')[0],
      time: "10:00",
      type: "워크샵",
      location: "디자인센터",
      color: "bg-indigo-500"
    },
    {
      id: 14,
      title: "휴가",
      date: new Date(Date.now() + 10*24*60*60*1000).toISOString().split('T')[0],
      time: "종일",
      type: "휴가",
      location: "부산",
      color: "bg-cyan-500"
    },
    {
      id: 15,
      title: "휴가",
      date: new Date(Date.now() + 11*24*60*60*1000).toISOString().split('T')[0],
      time: "종일",
      type: "휴가",
      location: "부산",
      color: "bg-cyan-500"
    },
    {
      id: 16,
      title: "프로젝트 킥오프",
      date: new Date(Date.now() + 12*24*60*60*1000).toISOString().split('T')[0],
      time: "15:00",
      type: "킥오프",
      location: "프로젝트룸",
      color: "bg-emerald-500"
    },
    {
      id: 17,
      title: "기술 컨퍼런스",
      date: new Date(Date.now() + 13*24*60*60*1000).toISOString().split('T')[0],
      time: "09:00",
      type: "컨퍼런스",
      location: "코엑스",
      color: "bg-violet-500"
    }
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ]
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">캘린더</h1>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            일정 추가
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 캘린더 */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth(-1)}
                  >
                    ←
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth(1)}
                  >
                    →
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  const dayEvents = getEventsForDate(date)
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all duration-200
                        ${date ? 'hover:bg-muted/50' : ''}
                        ${isToday(date) ? 'bg-primary/10 border-primary' : 'border-border'}
                        ${isSelected(date) ? 'bg-accent/20 border-accent' : ''}
                      `}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-medium ${isToday(date) ? 'text-primary' : 'text-foreground'}`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1 mt-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayEvents.length - 2}개 더
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 선택된 날짜의 일정 */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>
                {selectedDate.toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>예정된 일정이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <Badge variant="secondary">{event.type}</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar