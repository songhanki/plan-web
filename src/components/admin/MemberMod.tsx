import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type EditMember = {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string; // accept API variations e.g., "admin" | "role-admin"
  status: string; // accept API variations e.g., "active" | "ACTIVE"
  joinDate: string;
  totalVacationDays: number;
  usedVacationDays: number;
};

type MemberModProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: EditMember | null;
  setMember: Dispatch<SetStateAction<EditMember | null>>;
  onSubmit: () => void;
};

const MemberMod = ({ open, onOpenChange, member, setMember, onSubmit }: MemberModProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 정보 수정</DialogTitle>
          <DialogDescription>회원의 정보를 수정해주세요.</DialogDescription>
        </DialogHeader>
        {member && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">이름</Label>
              <Input
                id="edit-name"
                value={member.name}
                onChange={(e) => setMember((prev) => (prev ? { ...prev, name: e.target.value } : prev))}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">이메일</Label>
              <Input
                id="edit-email"
                type="email"
                value={member.email}
                onChange={(e) => setMember((prev) => (prev ? { ...prev, email: e.target.value } : prev))}
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-department">부서</Label>
              <Input
                id="edit-department"
                value={member.department}
                onChange={(e) => setMember((prev) => (prev ? { ...prev, department: e.target.value } : prev))}
                placeholder="부서를 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-position">직급</Label>
              <Input
                id="edit-position"
                value={member.position}
                onChange={(e) => setMember((prev) => (prev ? { ...prev, position: e.target.value } : prev))}
                placeholder="직급을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">권한</Label>
              <Select
                value={member.role}
                onValueChange={(value: "role-admin" | "role-manager" | "role-user") =>
                  setMember((prev) => (prev ? { ...prev, role: value } : prev))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="role-user">직원</SelectItem>
                  <SelectItem value="role-manager">매니저</SelectItem>
                  <SelectItem value="role-admin">관리자</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-status">상태</Label>
              <Select
                value={member.status}
                onValueChange={(value: "ACTIVE" | "INACTIVE") =>
                  setMember((prev) => (prev ? { ...prev, status: value } : prev))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">활성</SelectItem>
                  <SelectItem value="INACTIVE">비활성</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-joinDate">입사일</Label>
              <Input
                id="edit-joinDate"
                type="date"
                value={member.joinDate}
                onChange={(e) => setMember((prev) => (prev ? { ...prev, joinDate: e.target.value } : prev))}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setMember(null);
            }}
          >
            취소
          </Button>
          <Button onClick={onSubmit}>수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberMod;


