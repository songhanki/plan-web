import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

// 사용자 정보 타입 정의
export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  email: string;
  department?: string;
  position?: string;
  profileImage?: string;
  roleName: string;
}

// 인증 상태 타입 정의
export type AuthStatus = 'IDLE' | 'LOADING' | 'AUTHENTICATED' | 'UNAUTHENTICATED';

interface UserState {
  // 상태
  authStatus: AuthStatus;
  userProfile: UserProfile | null;
  isProfileDialogOpen: boolean;
  
  // 액션
  setAuthStatus: (status: AuthStatus) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  validateToken: () => Promise<void>;
  logout: () => void;
  
  // 프로필 다이얼로그 액션
  setIsProfileDialogOpen: (open: boolean) => void;
  
  // 계산된 값들
  getDisplayName: () => string;
  isAuthenticated: () => boolean;
}

// 기본값 상수 정의
const DEFAULT_AUTH_STATUS: AuthStatus = 'IDLE';
const DEFAULT_DISPLAY_NAME = '사용자';

// 개발용 샘플 사용자 데이터
const sampleUser: UserProfile = {
  id: "sample-user-1",
  username: "testuser",
  nickname: "테스트닉네임",
  email: "test@example.com",
  department: "개발팀",
  position: "시니어 개발자",
  profileImage: undefined,
  roleName: "일반사용자",
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        authStatus: DEFAULT_AUTH_STATUS,
        userProfile: null,
        isProfileDialogOpen: false,

        // 인증 상태 설정
        setAuthStatus: (status: AuthStatus) => {
          set({ authStatus: status });
        },

        // 사용자 프로필 설정
        setUserProfile: (profile: UserProfile | null) => {
          set({ 
            userProfile: profile,
            authStatus: profile ? 'AUTHENTICATED' : 'UNAUTHENTICATED'
          });
        },

        // 사용자 프로필 업데이트 (API 호출 포함)
        updateUserProfile: async (updates: Partial<UserProfile>) => {
          const { userProfile } = get();
          if (!userProfile) return;

          try {
            // 실제 API 호출 시 아래 코드를 사용
            // await axios.put('/api/v1/user/profile', updates);
            
            // 로컬 상태 업데이트
            const updatedProfile = { ...userProfile, ...updates };
            set({ userProfile: updatedProfile });
          } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            throw error;
          }
        },

        // 토큰 검증 및 사용자 정보 조회
        validateToken: async () => {
          const accessToken = localStorage.getItem("accessToken");
          
          if (!accessToken) {
            set({ 
              authStatus: 'UNAUTHENTICATED',
              userProfile: null 
            });
            return;
          }

          set({ authStatus: 'LOADING' });

          try {
            // 실제 API 호출 대신 개발용 샘플 데이터 사용
            // const response = await axios.post("/api/v1/tokens/validate", {}, {
            //   headers: {
            //     Authorization: `Bearer ${accessToken}`,
            //   },
            // });

            // 개발용: 샘플 사용자 데이터 사용
            const userProfile: UserProfile = sampleUser;

            // 실제 API 연동 시에는 아래 코드를 사용:
            // const userProfile: UserProfile = {
            //   id: response.data.id || 'temp-id',
            //   username: response.data.username || '사용자',
            //   nickname: response.data.nickname || response.data.username || '사용자',
            //   email: response.data.email || '',
            //   department: response.data.department,
            //   position: response.data.position,
            //   profileImage: response.data.profileImage,
            //   roleName: response.data.roleName || '일반사용자',
            // };

            set({ 
              authStatus: 'AUTHENTICATED',
              userProfile 
            });
          } catch (error) {
            console.error("토큰 검증 실패:", error);
            // 토큰이 유효하지 않은 경우 로그아웃 처리
            get().logout();
            throw error;
          }
        },

        // 로그아웃
        logout: () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({ 
            authStatus: 'UNAUTHENTICATED',
            userProfile: null,
            isProfileDialogOpen: false
          });
        },

        // 프로필 다이얼로그 상태 관리
        setIsProfileDialogOpen: (open: boolean) => {
          set({ isProfileDialogOpen: open });
        },

        // 표시할 이름 반환 (닉네임 우선, 없으면 사용자명)
        getDisplayName: () => {
          const { userProfile } = get();
          if (!userProfile) return DEFAULT_DISPLAY_NAME;
          
          // 닉네임이 있으면 닉네임, 없으면 사용자명 사용
          return userProfile.nickname || userProfile.username || DEFAULT_DISPLAY_NAME;
        },

        // 인증 상태 확인
        isAuthenticated: () => {
          const { authStatus } = get();
          return authStatus === 'AUTHENTICATED';
        },
      }),
      {
        name: 'user-store',
        // 민감한 정보는 persist에서 제외
        partialize: (state) => ({
          userProfile: state.userProfile,
          authStatus: state.authStatus,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);
