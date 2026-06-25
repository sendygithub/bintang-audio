"use server";

import {
  getEquipment,
  addEquipment,
  editEquipment,
  removeEquipment,
} from "@/services";
import type { CreateEquipmentDTO, UpdateEquipmentDTO } from "@/types";
import { revalidatePath } from "next/cache";

// ============================================
// Equipment Server Actions
// These are the entry points for mutations from the UI
// ============================================

export async function getEquipmentAction() {
  return getEquipment();
}

export async function addEquipmentAction(data: CreateEquipmentDTO) {
  const result = await addEquipment(data);

  if (result.success) {
    revalidatePath("/admin");
  }

  return result;
}

export async function updateEquipmentAction(
  id: string,
  data: UpdateEquipmentDTO,
) {
  const result = await editEquipment(id, data);

  if (result.success) {
    revalidatePath("/admin");
  }

  return result;
}

export async function deleteEquipmentAction(id: string) {
  const result = await removeEquipment(id);

  if (result.success) {
    revalidatePath("/admin");
  }

  return result;
}
