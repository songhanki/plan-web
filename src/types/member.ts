export interface Member {
  roleId: string;
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string; // e.g., "admin" | "manager" | "employee" | "role-admin" | ...
  status: string; // e.g., "active" | "inactive" | "ACTIVE" | "INACTIVE"
  joinDate: string; // YYYY-MM-DD
  totalVacationDays: number;
  usedVacationDays: number;
}


