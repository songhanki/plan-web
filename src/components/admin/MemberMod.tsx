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
import { EditMember } from "@/stores/memberStore";

type MemberModProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: EditMember | null;
  setMember: (member: EditMember | null) => void;
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
                onChange={(e) => setMember(member ? { ...member, name: e.target.value } : member)}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">이메일</Label>
              <Input
                id="edit-email"
                type="email"
                value={member.email}
                onChange={(e) => setMember(member ? { ...member, email: e.target.value } : member)}
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-nickname">닉네임</Label>
              <Input
                id="edit-nickname"
                value={member.nickname}
                onChange={(e) => setMember(member ? { ...member, nickname: e.target.value } : member)}
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-department">부서</Label>
              <Input
                id="edit-department"
                value={member.department}
                onChange={(e) => setMember(member ? { ...member, department: e.target.value } : member)}
                placeholder="부서를 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-position">직급</Label>
              <Input
                id="edit-position"
                value={member.position}
                onChange={(e) => setMember(member ? { ...member, position: e.target.value } : member)}
                placeholder="직급을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">권한</Label>
              <Select
                value={member.roleName}
                onValueChange={(value: "관리자" | "팀장" | "일반사용자") =>
                  setMember(member ? { ...member, roleName: value } : member)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="일반사용자">일반사용자</SelectItem>
                  <SelectItem value="팀장">팀장</SelectItem>
                  <SelectItem value="관리자">관리자</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-status">상태</Label>
              <Select
                value={member.status}
                onValueChange={(value: "ACTIVE" | "INACTIVE") =>
                  setMember(member ? { ...member, status: value } : member)
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
                onChange={(e) => setMember(member ? { ...member, joinDate: e.target.value } : member)}
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


