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
import axios from "axios";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null); // 사용자 이름 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLoggedIn(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post("/api/v1/tokens/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // 사용자 이름 설정 (API 응답에 사용자 정보가 있다고 가정)
        setUsername(response.data.username); 
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        handleLogout();
      }
    };

    validateToken();

    const intervalId = setInterval(validateToken, 5 * 60 * 1000); // 5분마다 실행

    return () => clearInterval(intervalId);
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/login");
  };

  const handleUpdateProfile = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <Routes>
      <Route
        path="/*"
        element={
          isLoggedIn ? (
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
                        onClick={() => setIsProfileOpen(true)}
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{username}</span>
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
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                currentUsername={username || ""}
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
