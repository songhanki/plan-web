import { useState, useEffect } from "react";
import axios from "axios";
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
import MemberAdd, { NewMemberInput } from "./MemberAdd";
import MemberMod, { EditMember } from "./MemberMod";
import type { Member } from "@/types/member";

// Member type moved to src/types/member.ts

const MemberManagement = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
        toast({
          title: "에러",
          description: err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.',
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [toast]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<NewMemberInput>({
    name: "",
    email: "",
    department: "",
    position: "",
    role: "role-user"
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<EditMember | null>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "role-admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "role-manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "role-user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "role-admin":
        return "관리자";
      case "role-manager":
        return "팀장";
      case "role-user":
        return "일반사용자";
      default:
        return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "활성";
      case "INACTIVE":
        return "비활성";
      default:
        return status;
    }
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.department || !newMember.position) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const member: Member = {
      id: Date.now().toString(),
      ...newMember,
      status: "ACTIVE",
      joinDate: new Date().toISOString().split('T')[0],
      totalVacationDays: 15, // 기본 연차 15일
      usedVacationDays: 0,
      roleId: "role-user"
    };

    setMembers(prev => [...prev, member]);
    setNewMember({
      name: "",
      email: "",
      department: "",
      position: "",
      role: "role-user"
    });
    setIsAddDialogOpen(false);

    toast({
      title: "회원 추가 완료",
      description: `${member.name}님이 추가되었습니다.`,
    });
  };

  
  const handleDeleteMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
    toast({
      title: "회원 삭제 완료",
      description: "회원이 삭제되었습니다.",
      variant: "destructive",
    });
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;

    if (!editingMember.name || !editingMember.email || !editingMember.department || !editingMember.position) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setMembers(prev =>
      prev.map(member =>
        member.id === editingMember.id ? {
          ...editingMember,
          roleId: member.roleId // 기존 roleId 유지
        } : member
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingMember(null);

    toast({
      title: "회원 수정 완료",
      description: `${editingMember.name}님의 정보가 수정되었습니다.`,
    });
  };

  const adminCount = members.filter(m => m.role === "role-admin").length;
  const managerCount = members.filter(m => m.role === "role-manager").length;
  const employeeCount = members.filter(m => m.role === "role-user").length;
  const activeCount = members.filter(m => m.status === "ACTIVE").length;
  const totalAvailableVacation = members.reduce((sum, m) => sum + (m.totalVacationDays - m.usedVacationDays), 0);
  const totalUsedVacation = members.reduce((sum, m) => sum + m.usedVacationDays, 0);

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
            <div className="text-2xl font-bold">{members.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 회원</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">매니저</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{managerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">관리자</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{adminCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사용 가능 연차</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalAvailableVacation}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사용된 연차</CardTitle>
            <CalendarDays className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalUsedVacation}</div>
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
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>
                    <span className={getRoleColor(member.role)}>{getRoleText(member.roleId)}</span>
                  </TableCell>
                  <TableCell>
                    <span className={getStatusColor(member.status)}>{getStatusText(member.status)}</span>
                  </TableCell>
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