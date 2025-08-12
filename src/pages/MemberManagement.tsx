import { Badge } from "@/components/ui/badge";
import MemberManagementComponent from "@/components/admin/MemberManagement";

const MemberManagement = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">회원 관리</h1>
        <Badge variant="outline" className="text-sm">
          관리자 전용
        </Badge>
      </div>

      <MemberManagementComponent />
    </div>
  );
};

export default MemberManagement;