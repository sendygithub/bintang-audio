import {
  findAllEquipment,
  findEquipmentById,
  findAvailableEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "@/repositories";
import { createEquipmentSchema, updateEquipmentSchema } from "@/validators";
import type {
  Equipment,
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
  ApiResponse,
} from "@/types";
import { ZodError } from "zod";

// ============================================
// Equipment Service
// Handles business logic, validation, and orchestration
// ============================================

export async function getEquipment(): Promise<ApiResponse<Equipment[]>> {
  try {
    const equipment = await findAllEquipment();
    return { success: true, data: equipment };
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    return { success: false, error: "Gagal mengambil data peralatan" };
  }
}

export async function getAvailableEquipment(): Promise<
  ApiResponse<Equipment[]>
> {
  try {
    const equipment = await findAvailableEquipment();
    return { success: true, data: equipment };
  } catch (error) {
    console.error("Failed to fetch available equipment:", error);
    return { success: false, error: "Gagal mengambil data peralatan" };
  }
}

export async function getEquipmentById(
  id: string,
): Promise<ApiResponse<Equipment>> {
  try {
    const equipment = await findEquipmentById(id);

    if (!equipment) {
      return { success: false, error: "Peralatan tidak ditemukan" };
    }

    return { success: true, data: equipment };
  } catch (error) {
    console.error("Failed to fetch equipment by id:", error);
    return { success: false, error: "Gagal mengambil data peralatan" };
  }
}

export async function addEquipment(
  data: CreateEquipmentDTO,
): Promise<ApiResponse<Equipment>> {
  try {
    // Validate input
    const validated = createEquipmentSchema.parse(data);

    const equipment = await createEquipment(validated);
    return { success: true, data: equipment };
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return { success: false, error: messages };
    }

    console.error("Failed to add equipment:", error);
    return { success: false, error: "Gagal menambahkan peralatan" };
  }
}

export async function editEquipment(
  id: string,
  data: UpdateEquipmentDTO,
): Promise<ApiResponse<Equipment>> {
  try {
    // Validate input
    const validated = updateEquipmentSchema.parse(data);

    // Check if equipment exists
    const existing = await findEquipmentById(id);
    if (!existing) {
      return { success: false, error: "Peralatan tidak ditemukan" };
    }

    const equipment = await updateEquipment(id, validated);
    return { success: true, data: equipment };
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return { success: false, error: messages };
    }

    console.error("Failed to update equipment:", error);
    return { success: false, error: "Gagal memperbarui peralatan" };
  }
}

export async function removeEquipment(id: string): Promise<ApiResponse<void>> {
  try {
    // Check if equipment exists
    const existing = await findEquipmentById(id);
    if (!existing) {
      return { success: false, error: "Peralatan tidak ditemukan" };
    }

    await deleteEquipment(id);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete equipment:", error);
    return { success: false, error: "Gagal menghapus peralatan" };
  }
}
