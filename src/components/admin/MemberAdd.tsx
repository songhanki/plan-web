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

export type NewMemberInput = {
  name: string;
  email: string;
  department: string;
  position: string;
  role: "role-admin" | "role-manager" | "role-user";
};

type MemberAddProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newMember: NewMemberInput;
  setNewMember: Dispatch<SetStateAction<NewMemberInput>>;
  onSubmit: () => void;
};

const MemberAdd = ({ open, onOpenChange, newMember, setNewMember, onSubmit }: MemberAddProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 회원 추가</DialogTitle>
          <DialogDescription>새로운 회원의 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={newMember.name}
              onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="department">부서</Label>
            <Input
              id="department"
              value={newMember.department}
              onChange={(e) => setNewMember((prev) => ({ ...prev, department: e.target.value }))}
              placeholder="부서를 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="position">직급</Label>
            <Input
              id="position"
              value={newMember.position}
              onChange={(e) => setNewMember((prev) => ({ ...prev, position: e.target.value }))}
              placeholder="직급을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="role">권한</Label>
            <Select
              value={newMember.role}
              onValueChange={(value: "role-admin" | "role-manager" | "role-user") =>
                setNewMember((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">직원</SelectItem>
                <SelectItem value="manager">매니저</SelectItem>
                <SelectItem value="admin">관리자</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={onSubmit}>추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberAdd;


