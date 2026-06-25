import { NextResponse } from "next/server";
import { registerUser } from "@/src/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, user: result.data },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 },
    );
  }
}
