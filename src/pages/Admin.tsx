import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, User, Calendar, FileText } from "lucide-react";
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

const Admin = () => {
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">휴가승인 관리</h1>
        <Badge variant="outline" className="text-sm">
          관리자 모드
        </Badge>
      </div>

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
            <User className="h-5 w-5" />
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
    </div>
  );
};

export default Admin;