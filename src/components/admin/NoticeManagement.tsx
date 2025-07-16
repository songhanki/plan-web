import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Pin, Users, Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  category: "general" | "urgent" | "event";
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const NoticeManagement = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "시스템 정기 점검 안내",
      content: "다음 주 토요일 오전 2시부터 4시까지 시스템 정기 점검이 있을 예정입니다. 해당 시간 동안 서비스 이용이 제한될 수 있습니다.",
      author: "관리자",
      category: "urgent",
      isPinned: true,
      createdAt: "2024-07-15",
      updatedAt: "2024-07-15",
      views: 145
    },
    {
      id: "2",
      title: "휴가 신청 시스템 업데이트",
      content: "휴가 신청 시스템이 업데이트되어 더욱 편리하게 이용하실 수 있습니다. 새로운 기능들을 확인해보세요.",
      author: "인사팀",
      category: "general",
      isPinned: false,
      createdAt: "2024-07-10",
      updatedAt: "2024-07-10",
      views: 89
    },
    {
      id: "3",
      title: "회사 창립 기념일 행사 안내",
      content: "다음 달 회사 창립 기념일을 맞아 특별 행사를 개최합니다. 많은 참여 바랍니다.",
      author: "총무팀",
      category: "event",
      isPinned: false,
      createdAt: "2024-07-08",
      updatedAt: "2024-07-08",
      views: 234
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: "general" | "urgent" | "event";
    isPinned: boolean;
  }>({
    title: "",
    content: "",
    category: "general",
    isPinned: false
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "event":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "general":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "urgent":
        return "긴급";
      case "event":
        return "행사";
      case "general":
        return "일반";
      default:
        return category;
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      isPinned: false
    });
  };

  const handleCreate = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const newNotice: Notice = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      author: "관리자",
      category: formData.category,
      isPinned: formData.isPinned,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0
    };

    setNotices(prev => [newNotice, ...prev]);
    resetForm();
    setIsCreateDialogOpen(false);
    
    toast({
      title: "공지사항 작성 완료",
      description: "새로운 공지사항이 등록되었습니다.",
    });
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      isPinned: notice.isPinned
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!editingNotice) return;

    setNotices(prev => 
      prev.map(notice => 
        notice.id === editingNotice.id 
          ? {
              ...notice,
              title: formData.title,
              content: formData.content,
              category: formData.category,
              isPinned: formData.isPinned,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : notice
      )
    );

    resetForm();
    setEditingNotice(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "공지사항 수정 완료",
      description: "공지사항이 성공적으로 수정되었습니다.",
    });
  };

  const handleDelete = (id: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== id));
    toast({
      title: "공지사항 삭제",
      description: "공지사항이 삭제되었습니다.",
    });
  };

  const togglePin = (id: string) => {
    setNotices(prev => 
      prev.map(notice => 
        notice.id === id 
          ? { ...notice, isPinned: !notice.isPinned }
          : notice
      )
    );
  };

  const urgentCount = notices.filter(notice => notice.category === "urgent").length;
  const pinnedCount = notices.filter(notice => notice.isPinned).length;
  const totalViews = notices.reduce((sum, notice) => sum + notice.views, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">공지사항 관리</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              공지사항 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>새 공지사항 작성</DialogTitle>
              <DialogDescription>
                새로운 공지사항을 작성하고 게시하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">카테고리</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "general" | "urgent" | "event") => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">일반</SelectItem>
                    <SelectItem value="urgent">긴급</SelectItem>
                    <SelectItem value="event">행사</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="공지사항 내용을 입력하세요"
                  rows={8}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="pinned">상단 고정</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleCreate}>
                작성 완료
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 공지</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notices.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">긴급 공지</CardTitle>
            <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">긴급</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">고정 공지</CardTitle>
            <Pin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pinnedCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalViews}</div>
          </CardContent>
        </Card>
      </div>

      {/* 공지사항 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            공지사항 목록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices
                .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                .map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {notice.isPinned && <Pin className="h-3 w-3 text-blue-600" />}
                      <span className="font-medium">{notice.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(notice.category)}>
                      {getCategoryText(notice.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>{notice.author}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {notice.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {notice.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    {notice.isPinned ? (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        고정
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        일반
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePin(notice.id)}
                        className="h-8 px-2"
                        title={notice.isPinned ? "고정 해제" : "상단 고정"}
                      >
                        <Pin className={`h-3 w-3 ${notice.isPinned ? 'text-blue-600' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(notice)}
                        className="h-8 px-2"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(notice.id)}
                        className="h-8 px-2"
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

      {/* 수정 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공지사항 수정</DialogTitle>
            <DialogDescription>
              공지사항 내용을 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">제목</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="공지사항 제목을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(value: "general" | "urgent" | "event") => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반</SelectItem>
                  <SelectItem value="urgent">긴급</SelectItem>
                  <SelectItem value="event">행사</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">내용</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="공지사항 내용을 입력하세요"
                rows={8}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-pinned"
                checked={formData.isPinned}
                onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="edit-pinned">상단 고정</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleUpdate}>
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoticeManagement;