import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import type { Member } from '@/types/member';

export interface NewMemberInput {
  name: string;
  email: string;
  nickname: string;
  department: string;
  position: string;
  roleName: string;
}

export interface EditMember extends Member {}

interface MemberState {
  // 상태
  members: Member[];
  loading: boolean;
  error: string | null;
  
  // 다이얼로그 상태
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editingMember: EditMember | null;
  newMember: NewMemberInput;

  // 액션
  fetchMembers: () => Promise<void>;
  addMember: (member: NewMemberInput) => Promise<void>;
  updateMember: (member: EditMember) => Promise<void>;
  deleteMember: (memberId: string) => Promise<void>;
  
  // 다이얼로그 액션
  setIsAddDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setEditingMember: (member: EditMember | null) => void;
  setNewMember: (member: NewMemberInput) => void;
  resetNewMember: () => void;
  
  // 계산된 값들
  getStatistics: () => {
    totalMembers: number;
    activeCount: number;
    adminCount: number;
    managerCount: number;
    employeeCount: number;
    totalAvailableVacation: number;
    totalUsedVacation: number;
  };
}

const defaultNewMember: NewMemberInput = {
  name: "",
  email: "",
  nickname: "",
  department: "",
  position: "",
  roleName: "일반사용자"
};

// 개발용 임시 데이터
const sampleMembers: Member[] = [
  {
    id: "1",
    name: "김철수",
    email: "kim@example.com",
    nickname: "철수",
    department: "개발팀",
    position: "시니어 개발자",
    roleName: "일반사용자",
    status: "ACTIVE",
    joinDate: "2023-01-15",
    totalVacationDays: 15,
    usedVacationDays: 3,
  },
  {
    id: "2",
    name: "이영희",
    email: "lee@example.com",
    nickname: "영희",
    department: "마케팅팀",
    position: "팀장",
    roleName: "팀장",
    status: "ACTIVE",
    joinDate: "2022-03-10",
    totalVacationDays: 20,
    usedVacationDays: 8,
  },
  {
    id: "3",
    name: "박관리",
    email: "park@example.com",
    nickname: "관리자",
    department: "경영지원팀",
    position: "부장",
    roleName: "관리자",
    status: "ACTIVE",
    joinDate: "2020-05-01",
    totalVacationDays: 25,
    usedVacationDays: 12,
  },
];

export const useMemberStore = create<MemberState>()(
  devtools(
    (set, get) => ({
      // 초기 상태 (개발용 샘플 데이터 포함)
      members: sampleMembers,
      loading: false,
      error: null,
      
      // 다이얼로그 상태
      isAddDialogOpen: false,
      isEditDialogOpen: false,
      editingMember: null,
      newMember: defaultNewMember,

      // 회원 목록 조회
      fetchMembers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get('/api/members');
          set({ members: response.data, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : '데이터를 불러오는데 실패했습니다.';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // 회원 추가
      addMember: async (memberInput: NewMemberInput) => {
        try {
          // 실제 API 호출 시 아래 코드를 사용
          // const response = await axios.post('/api/members', memberInput);
          // const newMember = response.data;
          
          // 임시 로컬 데이터 생성 (API 연동 전까지)
          const newMember: Member = {
            id: Date.now().toString(),
            ...memberInput,
            status: "ACTIVE",
            joinDate: new Date().toISOString().split('T')[0],
            totalVacationDays: 15,
            usedVacationDays: 0,
          };

          set(state => ({
            members: [...state.members, newMember],
            newMember: defaultNewMember,
            isAddDialogOpen: false
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : '회원 추가에 실패했습니다.';
          set({ error: errorMessage });
          throw error;
        }
      },

      // 회원 수정
      updateMember: async (updatedMember: EditMember) => {
        try {
          // 실제 API 호출 시 아래 코드를 사용
          // await axios.put(`/api/members/${updatedMember.id}`, updatedMember);
          
          set(state => ({
            members: state.members.map(member =>
              member.id === updatedMember.id ? updatedMember : member
            ),
            editingMember: null,
            isEditDialogOpen: false
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : '회원 수정에 실패했습니다.';
          set({ error: errorMessage });
          throw error;
        }
      },

      // 회원 삭제
      deleteMember: async (memberId: string) => {
        try {
          // 실제 API 호출 시 아래 코드를 사용
          // await axios.delete(`/api/members/${memberId}`);
          
          set(state => ({
            members: state.members.filter(member => member.id !== memberId)
          }));
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : '회원 삭제에 실패했습니다.';
          set({ error: errorMessage });
          throw error;
        }
      },

      // 다이얼로그 상태 관리
      setIsAddDialogOpen: (open: boolean) => set({ isAddDialogOpen: open }),
      setIsEditDialogOpen: (open: boolean) => set({ isEditDialogOpen: open }),
      setEditingMember: (member: EditMember | null) => set({ editingMember: member }),
      setNewMember: (member: NewMemberInput) => set({ newMember: member }),
      resetNewMember: () => set({ newMember: defaultNewMember }),

      // 통계 계산
      getStatistics: () => {
        const { members } = get();
        return {
          totalMembers: members.length,
          activeCount: members.filter(m => m.status === "활성" || m.status === "ACTIVE").length,
          adminCount: members.filter(m => m.roleName === "관리자").length,
          managerCount: members.filter(m => m.roleName === "팀장").length,
          employeeCount: members.filter(m => m.roleName === "일반사용자").length,
          totalAvailableVacation: members.reduce((sum, m) => sum + (m.totalVacationDays - m.usedVacationDays), 0),
          totalUsedVacation: members.reduce((sum, m) => sum + m.usedVacationDays, 0),
        };
      },
    }),
    {
      name: 'member-store',
    }
  )
);
