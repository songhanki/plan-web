import { Badge } from "@/components/ui/badge";
import VacationManagementComponent from "@/components/admin/VacationManagement";

const VacationApproval = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">휴가승인 관리</h1>
        <Badge variant="outline" className="text-sm">
          관리자 전용
        </Badge>
      </div>

      <VacationManagementComponent />
    </div>
  );
};

export default VacationApproval;