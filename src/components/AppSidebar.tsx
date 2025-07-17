import { Calendar, Home, Clock, Settings, BarChart3, CheckSquare, Users, ClipboardCheck, FileText } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "대시보드", url: "/", icon: Home },
  { title: "캘린더", url: "/calendar", icon: Calendar },
  { title: "할 일", url: "/tasks", icon: CheckSquare },
  { title: "휴가 관리", url: "/vacation", icon: Clock },
  { title: "회원 관리", url: "/member-management", icon: Users },
  { title: "휴가승인 관리", url: "/vacation-approval", icon: ClipboardCheck },
  { title: "공지사항 관리", url: "/notice-management", icon: FileText },
  { title: "리포트", url: "/reports", icon: BarChart3 },
  { title: "설정", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted transition-colors"
  }

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r">
        <div className="p-4">
          <h2 className={`font-bold text-lg ${isCollapsed ? "hidden" : "block"}`}>
            📅 일정관리
          </h2>
          {isCollapsed && <span className="text-xl">📅</span>}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : "block"}>
            메뉴
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}