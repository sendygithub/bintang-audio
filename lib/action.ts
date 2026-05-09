"use server";

import { prisma } from "@/lib/prisma";

export async function getEquipment() {
  try {
    const equipments = await prisma.equipment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: equipments,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Gagal mengambil data equipment",
    };
  }
}