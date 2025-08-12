import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "@/hooks/use-toast";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  onUpdateProfile: (newNickname: string) => Promise<void>;
}

const ProfileDialog = ({ isOpen, onClose, currentNickname, onUpdateProfile }: ProfileDialogProps) => {
  const { toast } = useToast();
  const { userProfile } = useUserStore();
  
  const [nickname, setNickname] = useState(userProfile?.nickname || currentNickname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (!nickname.trim()) {
      toast({
        title: "입력 오류",
        description: "닉네임을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 닉네임이 변경된 경우에만 업데이트
    if (nickname.trim() !== userProfile?.nickname) {
      setIsUpdating(true);
      try {
        await onUpdateProfile(nickname.trim());
        toast({
          title: "프로필 업데이트 완료",
          description: "닉네임이 성공적으로 변경되었습니다.",
        });
      } catch (error) {
        toast({
          title: "업데이트 실패",
          description: "프로필 업데이트 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
      }
    }
    
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setNickname(userProfile?.nickname || currentNickname);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            프로필 설정
          </DialogTitle>
          <DialogDescription>
            사용자 정보를 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {userProfile && (
            <div className="space-y-2">
              <Label>사용자명</Label>
              <Input
                value={userProfile.username}
                disabled
                className="bg-muted"
              />
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">비밀번호 변경</h4>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="현재 비밀번호"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호 확인"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUpdating}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? "저장 중..." : "저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;