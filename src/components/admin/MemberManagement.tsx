import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Users, Edit, Trash2, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: "admin" | "manager" | "employee";
  status: "active" | "inactive";
  joinDate: string;
}

const MemberManagement = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "김철수",
      email: "kim.cs@company.com",
      department: "개발팀",
      position: "시니어 개발자",
      role: "manager",
      status: "active",
      joinDate: "2023-03-15"
    },
    {
      id: "2",
      name: "이영희",
      email: "lee.yh@company.com",
      department: "마케팅팀",
      position: "마케팅 매니저",
      role: "manager",
      status: "active",
      joinDate: "2023-01-20"
    },
    {
      id: "3",
      name: "박민수",
      email: "park.ms@company.com",
      department: "영업팀",
      position: "영업 사원",
      role: "employee",
      status: "active",
      joinDate: "2023-06-10"
    },
    {
      id: "4",
      name: "정수진",
      email: "jung.sj@company.com",
      department: "인사팀",
      position: "인사 담당자",
      role: "admin",
      status: "active",
      joinDate: "2022-11-05"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<{
    name: string;
    email: string;
    department: string;
    position: string;
    role: "admin" | "manager" | "employee";
  }>({
    name: "",
    email: "",
    department: "",
    position: "",
    role: "employee"
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "employee":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "관리자";
      case "manager":
        return "매니저";
      case "employee":
        return "직원";
      default:
        return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "활성";
      case "inactive":
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
      status: "active",
      joinDate: new Date().toISOString().split('T')[0]
    };

    setMembers(prev => [...prev, member]);
    setNewMember({
      name: "",
      email: "",
      department: "",
      position: "",
      role: "employee"
    });
    setIsAddDialogOpen(false);

    toast({
      title: "회원 추가 완료",
      description: `${member.name}님이 추가되었습니다.`,
    });
  };

  const handleRoleChange = (memberId: string, newRole: "admin" | "manager" | "employee") => {
    setMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );

    toast({
      title: "권한 변경 완료",
      description: "회원 권한이 변경되었습니다.",
    });
  };

  const handleStatusToggle = (memberId: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? { ...member, status: member.status === "active" ? "inactive" : "active" }
          : member
      )
    );

    toast({
      title: "상태 변경 완료",
      description: "회원 상태가 변경되었습니다.",
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

  const adminCount = members.filter(m => m.role === "admin").length;
  const managerCount = members.filter(m => m.role === "manager").length;
  const employeeCount = members.filter(m => m.role === "employee").length;
  const activeCount = members.filter(m => m.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">회원 관리</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              회원 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 회원 추가</DialogTitle>
              <DialogDescription>
                새로운 회원의 정보를 입력해주세요.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="department">부서</Label>
                <Input
                  id="department"
                  value={newMember.department}
                  onChange={(e) => setNewMember(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="부서를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="position">직급</Label>
                <Input
                  id="position"
                  value={newMember.position}
                  onChange={(e) => setNewMember(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="직급을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="role">권한</Label>
                <Select value={newMember.role} onValueChange={(value: "admin" | "manager" | "employee") => 
                  setNewMember(prev => ({ ...prev, role: value }))
                }>
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
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleAddMember}>추가</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <Select 
                      value={member.role} 
                      onValueChange={(value: "admin" | "manager" | "employee") => 
                        handleRoleChange(member.id, value)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <Badge className={getRoleColor(member.role)}>
                          {getRoleText(member.role)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">직원</SelectItem>
                        <SelectItem value="manager">매니저</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusToggle(member.id)}
                    >
                      <Badge className={getStatusColor(member.status)}>
                        {getStatusText(member.status)}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.joinDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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
    </div>
  );
};

export default MemberManagement;