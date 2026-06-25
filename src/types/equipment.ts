// ============================================
// Equipment Types
// ============================================

export interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string | null;
  status: EquipmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type EquipmentStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";

export interface CreateEquipmentDTO {
  name: string;
  category: string;
  price: number;
  status?: EquipmentStatus;
}

export interface UpdateEquipmentDTO {
  name?: string;
  category?: string;
  price?: number;
  status?: EquipmentStatus;
}

export interface EquipmentResponse {
  success: boolean;
  data?: Equipment[];
  error?: string;
}

export interface SingleEquipmentResponse {
  success: boolean;
  data?: Equipment;
  error?: string;
}
