import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { getBookings } from "@/src/services/booking.service";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await getBookings(session.user.id, session.user.role);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data booking" },
      { status: 500 },
    );
  }
}
