import { Badge } from "@/components/ui/badge";
import NoticeManagementComponent from "@/components/admin/NoticeManagement";

const NoticeManagement = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">공지사항 관리</h1>
        <Badge variant="outline" className="text-sm">
          관리자 전용
        </Badge>
      </div> */}

      <NoticeManagementComponent />
    </div>
  );
};

export default NoticeManagement;