import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, FileText } from "lucide-react";
import MemberManagement from "@/components/admin/MemberManagement";
import VacationManagement from "@/components/admin/VacationManagement";
import NoticeManagement from "@/components/admin/NoticeManagement";

const Admin = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">관리자 페이지</h1>
        <Badge variant="outline" className="text-sm">
          관리자 모드
        </Badge>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            회원 관리
          </TabsTrigger>
          <TabsTrigger value="vacation" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            휴가승인 관리
          </TabsTrigger>
          <TabsTrigger value="notice" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            공지사항 관리
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-6">
          <MemberManagement />
        </TabsContent>
        
        <TabsContent value="vacation" className="mt-6">
          <VacationManagement />
        </TabsContent>
        
        <TabsContent value="notice" className="mt-6">
          <NoticeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;