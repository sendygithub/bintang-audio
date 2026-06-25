import { prisma } from "@/lib/prisma";
import type {
  Equipment,
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from "@/types";

// ============================================
// Equipment Repository
// Only handles CRUD operations — NO business logic
// ============================================

export async function findAllEquipment(): Promise<Equipment[]> {
  return prisma.equipment.findMany({
    orderBy: { createdAt: "desc" },
  }) as unknown as Equipment[];
}

export async function findEquipmentById(id: string): Promise<Equipment | null> {
  return prisma.equipment.findUnique({
    where: { id },
  }) as unknown as Equipment | null;
}

export async function findAvailableEquipment(): Promise<Equipment[]> {
  return prisma.equipment.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { createdAt: "desc" },
  }) as unknown as Equipment[];
}

export async function createEquipment(
  data: CreateEquipmentDTO,
): Promise<Equipment> {
  return prisma.equipment.create({
    data: {
      name: data.name,
      category: data.category,
      price: data.price,
      status: data.status ?? "AVAILABLE",
    },
  }) as unknown as Equipment;
}

export async function updateEquipment(
  id: string,
  data: UpdateEquipmentDTO,
): Promise<Equipment> {
  return prisma.equipment.update({
    where: { id },
    data,
  }) as unknown as Equipment;
}

export async function deleteEquipment(id: string): Promise<void> {
  await prisma.equipment.delete({
    where: { id },
  });
}

export async function updateEquipmentStatus(
  id: string,
  status: string,
): Promise<Equipment> {
  return prisma.equipment.update({
    where: { id },
    data: { status },
  }) as unknown as Equipment;
}
