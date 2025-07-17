import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, Settings, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const adminCards = [
    {
      title: "회원 관리",
      description: "사용자 계정 및 권한 관리",
      icon: Users,
      path: "/member-management",
      color: "text-blue-600"
    },
    {
      title: "휴가승인 관리", 
      description: "휴가 신청 승인 및 일정 관리",
      icon: Calendar,
      path: "/vacation-approval",
      color: "text-green-600"
    },
    {
      title: "공지사항 관리",
      description: "공지사항 작성 및 게시 관리",
      icon: FileText,
      path: "/notice-management", 
      color: "text-purple-600"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">관리자 대시보드</h1>
        <Badge variant="outline" className="text-sm">
          관리자 모드
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.path} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-muted ${card.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
                <Link to={card.path}>
                  <Button className="w-full">
                    관리하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            관리자 안내
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">권한 관리</h4>
              <p className="text-xs text-muted-foreground">사용자의 권한과 역할을 체계적으로 관리할 수 있습니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">일정 승인</h4>
              <p className="text-xs text-muted-foreground">직원들의 휴가 신청을 검토하고 승인/반려 처리를 할 수 있습니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="h-4 w-4 text-purple-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">정보 전달</h4>
              <p className="text-xs text-muted-foreground">중요한 공지사항을 작성하고 직원들에게 전달할 수 있습니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;