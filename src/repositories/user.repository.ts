import { prisma } from "@/lib/prisma";
import type { User } from "@/types";

// ============================================
// User Repository
// Only handles CRUD operations — NO business logic
// ============================================

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  }) as unknown as User | null;
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  }) as unknown as User | null;
}

export async function upsertUser(data: {
  where: { email: string };
  update: { name: string; phone: string };
  create: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}): Promise<User> {
  return prisma.user.upsert(data) as unknown as User;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role?: string;
}): Promise<User> {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone ?? null,
      role: data.role ?? "CUSTOMER",
    },
  }) as unknown as User;
}
