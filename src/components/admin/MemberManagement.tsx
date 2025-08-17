import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Users, Edit, Trash2, Shield, User, Calendar, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMemberStore } from "@/stores/memberStore";
import MemberAdd from "./MemberAdd";
import MemberMod from "./MemberMod";

const MemberManagement = () => {
  const { toast } = useToast();
  
  // Zustand 스토어에서 상태와 액션 가져오기
  const {
    members,
    loading,
    error,
    isAddDialogOpen,
    isEditDialogOpen,
    editingMember,
    newMember,
    fetchMembers,
    addMember,
    updateMember,
    deleteMember,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setEditingMember,
    setNewMember,
    resetNewMember,
    getStatistics
  } = useMemberStore();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        await fetchMembers();
      } catch (err) {
        toast({
          title: "에러",
          description: error || '데이터를 불러오는데 실패했습니다.',
          variant: "destructive",
        });
      }
    };

    loadMembers();
  }, [fetchMembers, toast, error]);

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email || !newMember.department || !newMember.position) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addMember(newMember);
      toast({
        title: "회원 추가 완료",
        description: `${newMember.name}님이 추가되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "회원 추가 실패",
        description: "회원 추가 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      await deleteMember(memberId);
      toast({
        title: "회원 삭제 완료",
        description: "회원이 삭제되었습니다.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "회원 삭제 실패",
        description: "회원 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = async () => {
    if (!editingMember) return;

    if (!editingMember.name || !editingMember.email || !editingMember.department || !editingMember.position) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateMember(editingMember);
      toast({
        title: "회원 수정 완료",
        description: `${editingMember.name}님의 정보가 수정되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "회원 수정 실패",
        description: "회원 수정 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // 통계 데이터 가져오기
  const statistics = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">회원 관리</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          회원 추가
        </Button>
      </div>

      <MemberAdd
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newMember={newMember}
        setNewMember={setNewMember}
        onSubmit={handleAddMember}
      />

      <MemberMod
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        member={editingMember}
        setMember={setEditingMember}
        onSubmit={handleUpdateMember}
      />

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg text-muted-foreground">데이터를 불러오는 중입니다...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg text-red-600">데이터를 불러오는데 실패했습니다: {error}</div>
        </div>
      ) : (
        <>
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 회원</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 회원</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">매니저</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statistics.managerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">관리자</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statistics.adminCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사용 가능 연차</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.totalAvailableVacation}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사용된 연차</CardTitle>
            <CalendarDays className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{statistics.totalUsedVacation}</div>
          </CardContent>
        </Card>
      </div>

      {/* 회원 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            회원 목록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>닉네임</TableHead>
                <TableHead>부서</TableHead>
                <TableHead>직급</TableHead>
                <TableHead>권한</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>연차 현황</TableHead>
                <TableHead>입사일</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.email}> {/* 이메일로 키 설정 -- fixme 추후 다른 키값으로 변경 */}
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.nickname}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.roleName}</TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">
                        <span className="text-green-600">사용가능: {member.totalVacationDays - member.usedVacationDays}일</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-orange-600">사용: {member.usedVacationDays}일</span> / 
                        <span className="text-gray-600"> 총 {member.totalVacationDays}일</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.joinDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditMember(member)}
                        className="h-8 px-3"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteMember(member.id)}
                        className="h-8 px-3"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </>
      )}
    </div>
  );
};

export default MemberManagement;