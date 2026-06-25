import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    // If admin, return all bookings. If customer, return only their bookings.
    const whereClause = userRole === "ADMIN" ? {} : { userId };

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            equipment: {
              select: {
                name: true,
                category: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data booking" },
      { status: 500 },
    );
  }
}
