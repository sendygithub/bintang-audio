import { findUserByEmail, createUser } from "@/repositories";
import { registerSchema } from "@/validators";
import type { ApiResponse } from "@/types";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

// ============================================
// Auth Service
// Handles authentication business logic
// ============================================

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<
  ApiResponse<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>
> {
  try {
    // 1. Validate input
    const validated = registerSchema.parse(data);

    // 2. Check if user already exists
    const existingUser = await findUserByEmail(validated.email);

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // 4. Create user
    const user = await createUser({
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      phone: validated.phone ?? null,
      role: "CUSTOMER",
    });

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return { success: false, error: messages };
    }

    console.error("Registration error:", error);
    return { success: false, error: "Terjadi kesalahan saat mendaftar" };
  }
}
