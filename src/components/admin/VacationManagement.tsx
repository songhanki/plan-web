import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Calendar, FileText, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VacationRequest {
  id: string;
  employeeName: string;
  department: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

const VacationManagement = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<VacationRequest[]>([
    {
      id: "1",
      employeeName: "김철수",
      department: "개발팀",
      type: "연차",
      startDate: "2024-08-15",
      endDate: "2024-08-17",
      days: 3,
      reason: "가족여행",
      status: "pending",
      appliedDate: "2024-07-20"
    },
    {
      id: "2",
      employeeName: "이영희",
      department: "마케팅팀",
      type: "반차",
      startDate: "2024-08-10",
      endDate: "2024-08-10",
      days: 0.5,
      reason: "개인용무",
      status: "pending",
      appliedDate: "2024-07-18"
    },
    {
      id: "3",
      employeeName: "박민수",
      department: "영업팀",
      type: "연차",
      startDate: "2024-08-20",
      endDate: "2024-08-25",
      days: 6,
      reason: "여름휴가",
      status: "approved",
      appliedDate: "2024-07-15"
    },
    {
      id: "4",
      employeeName: "정수진",
      department: "인사팀",
      type: "병가",
      startDate: "2024-08-05",
      endDate: "2024-08-07",
      days: 3,
      reason: "몸살감기",
      status: "rejected",
      appliedDate: "2024-07-25"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "대기중";
      case "approved":
        return "승인";
      case "rejected":
        return "반려";
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "연차":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "반차":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "병가":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleApprove = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "approved" as const } : req
      )
    );
    toast({
      title: "휴가신청 승인",
      description: "휴가신청이 승인되었습니다.",
    });
  };

  const handleReject = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "rejected" as const } : req
      )
    );
    toast({
      title: "휴가신청 반려",
      description: "휴가신청이 반려되었습니다.",
      variant: "destructive",
    });
  };

  const pendingCount = requests.filter(req => req.status === "pending").length;
  const approvedCount = requests.filter(req => req.status === "approved").length;
  const rejectedCount = requests.filter(req => req.status === "rejected").length;

  const VacationCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const approvedRequests = requests.filter(req => req.status === "approved");

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];
      
      // 이전 달의 빈 날짜들
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // 현재 달의 날짜들
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      return days;
    };

    const getVacationForDate = (date: Date | null) => {
      if (!date) return [];
      
      const dateStr = date.toISOString().split('T')[0];
      return approvedRequests.filter(req => {
        const startDate = new Date(req.startDate);
        const endDate = new Date(req.endDate);
        const currentDate = new Date(dateStr);
        
        return currentDate >= startDate && currentDate <= endDate;
      });
    };

    const navigateMonth = (direction: number) => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(prev.getMonth() + direction);
        return newMonth;
      });
    };

    const formatMonth = (date: Date) => {
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long' 
      });
    };

    const days = getDaysInMonth(currentMonth);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              승인된 휴가 일정
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth(-1)}
              >
                ←
              </Button>
              <span className="font-medium min-w-32 text-center">
                {formatMonth(currentMonth)}
              </span>
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
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const vacations = getVacationForDate(date);
              const isToday = date && 
                date.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-20 p-1 border rounded-md ${
                    date ? 'bg-background' : 'bg-muted/30'
                  } ${isToday ? 'bg-primary/5 border-primary' : 'border-border'}`}
                >
                  {date && (
                    <>
                      <div className={`text-sm mb-1 ${
                        isToday ? 'font-bold text-primary' : 'text-foreground'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {vacations.map((vacation, vIndex) => (
                          <div
                            key={vIndex}
                            className="text-xs p-1 rounded text-white truncate"
                            style={{ 
                              backgroundColor: vacation.type === '연차' ? '#3b82f6' : 
                                             vacation.type === '반차' ? '#8b5cf6' : '#f97316'
                            }}
                            title={`${vacation.employeeName} (${vacation.department}) - ${vacation.type}`}
                          >
                            {vacation.employeeName}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* 범례 */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              <span className="text-sm text-muted-foreground">연차</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
              <span className="text-sm text-muted-foreground">반차</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f97316' }}></div>
              <span className="text-sm text-muted-foreground">병가</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">휴가승인 관리</h2>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            신청 목록
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            캘린더 뷰
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6 space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">전체 신청</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{requests.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">대기중</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">승인</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">반려</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              </CardContent>
            </Card>
          </div>

          {/* 휴가신청 목록 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                휴가신청 내역
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>신청자</TableHead>
                    <TableHead>부서</TableHead>
                    <TableHead>휴가종류</TableHead>
                    <TableHead>기간</TableHead>
                    <TableHead>일수</TableHead>
                    <TableHead>사유</TableHead>
                    <TableHead>신청일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employeeName}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(request.type)}>
                          {request.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {request.startDate}
                          {request.startDate !== request.endDate && (
                            <> ~ {request.endDate}</>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{request.days}일</TableCell>
                      <TableCell className="max-w-32 truncate" title={request.reason}>
                        {request.reason}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.appliedDate}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="h-8 px-3"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              승인
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(request.id)}
                              className="h-8 px-3"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              반려
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <VacationCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VacationManagement;