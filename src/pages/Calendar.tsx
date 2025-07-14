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
    {
      id: 1,
      title: "팀 미팅",
      date: "2024-01-15",
      time: "14:00",
      type: "회의",
      location: "회의실 A",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "프로젝트 마감",
      date: "2024-01-15",
      time: "18:00",
      type: "마감",
      location: "온라인",
      color: "bg-destructive"
    },
    {
      id: 3,
      title: "점심 약속",
      date: "2024-01-16",
      time: "12:30",
      type: "개인",
      location: "강남역",
      color: "bg-accent"
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