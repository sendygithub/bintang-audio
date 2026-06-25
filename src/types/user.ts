// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "ADMIN" | "CUSTOMER";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}
