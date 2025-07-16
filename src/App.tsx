import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import ProfileDialog from "@/components/ProfileDialog";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Vacation from "./pages/Vacation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { LogOut, User } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateProfile = (newUsername: string) => {
    setUser(newUsername);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Login onLogin={handleLogin} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
                      <span className="text-sm font-medium">{user}</span>
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
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
            <ProfileDialog
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              currentUsername={user}
              onUpdateProfile={handleUpdateProfile}
            />
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
