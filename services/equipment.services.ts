// src/services/equipment.service.ts

import { getEquipment } from "@/app/actions";

export async function getAvailableEquipment() {
  const result = await getEquipment();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Gagal mengambil data");
  }

  return result.data.filter(
    (item: any) => item.status === "AVAILABLE"
  );
}