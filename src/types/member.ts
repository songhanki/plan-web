export interface Member {
  id: string;
  name: string;
  email: string;
  nickname: string;
  department: string;
  position: string;
  roleName: string; // e.g., "관리자" | "팀장" | "일반사용자" | ...
  status: string; // e.g., "활성" | "비활성" | "정지" | "탈퇴"
  joinDate: string; // YYYY-MM-DD
  totalVacationDays: number;
  usedVacationDays: number;
}


