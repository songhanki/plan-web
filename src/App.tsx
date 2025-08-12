import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import ProfileDialog from "@/components/ProfileDialog";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Vacation from "./pages/Vacation";
import Admin from "./pages/Admin";
import MemberManagement from "./pages/MemberManagement";
import VacationApproval from "./pages/VacationApproval";
import NoticeManagement from "./pages/NoticeManagement";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { LogOut, User } from "lucide-react";
import { useUserStore } from "@/stores/userStore";

const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();
  
  // Zustand 사용자 스토어에서 상태와 액션 가져오기
  const {
    authStatus,
    userProfile,
    isProfileDialogOpen,
    validateToken,
    logout,
    setIsProfileDialogOpen,
    updateUserProfile,
    getDisplayName,
    isAuthenticated
  } = useUserStore();

  // 토큰 검증 및 주기적 갱신
  useEffect(() => {
    const performTokenValidation = async () => {
      try {
        await validateToken();
      } catch (error) {
        console.error("토큰 검증 실패:", error);
        navigate("/login");
      }
    };

    // 초기 토큰 검증
    performTokenValidation();

    // 5분마다 토큰 검증
    const TOKEN_VALIDATION_INTERVAL_MS = 5 * 60 * 1000;
    const intervalId = setInterval(performTokenValidation, TOKEN_VALIDATION_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [validateToken, navigate]);


  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 프로필 업데이트 처리 (닉네임 변경)
  const handleUpdateProfile = async (newNickname: string) => {
    if (!userProfile) return;
    
    try {
      await updateUserProfile({ nickname: newNickname });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };

  // 로딩 상태 처리
  if (authStatus === 'LOADING') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          isAuthenticated() ? (
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <header className="h-16 flex items-center justify-between border-b bg-card px-6">
                    <div className="flex items-center">
                      <SidebarTrigger />
                      <h2 className="ml-4 text-lg font-semibold text-foreground">
                        일정 관리 시스템
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setIsProfileDialogOpen(true)}
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{getDisplayName()}</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-1" />
                        로그아웃
                      </Button>
                    </div>
                  </header>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/vacation" element={<Vacation />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/member-management" element={<MemberManagement />} />
                      <Route path="/vacation-approval" element={<VacationApproval />} />
                      <Route path="/notice-management" element={<NoticeManagement />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
              <ProfileDialog
                isOpen={isProfileDialogOpen}
                onClose={() => setIsProfileDialogOpen(false)}
                currentNickname={getDisplayName()}
                onUpdateProfile={handleUpdateProfile}
              />
            </SidebarProvider>
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
};

const WrappedApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default WrappedApp;
