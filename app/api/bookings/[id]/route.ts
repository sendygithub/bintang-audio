import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            equipment: true,
          },
        },
      },
    });

    // If cancelled or completed, set equipment back to AVAILABLE
    if (status === "CANCELLED" || status === "COMPLETED") {
      for (const item of booking.items) {
        await prisma.equipment.update({
          where: { id: item.equipmentId },
          data: { status: "AVAILABLE" },
        });
      }
    }

    // If confirmed, set equipment to RENTED
    if (status === "CONFIRMED") {
      for (const item of booking.items) {
        await prisma.equipment.update({
          where: { id: item.equipmentId },
          data: { status: "RENTED" },
        });
      }
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui booking" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get booking items first to restore equipment status
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 },
      );
    }

    // Restore equipment status
    for (const item of booking.items) {
      await prisma.equipment.update({
        where: { id: item.equipmentId },
        data: { status: "AVAILABLE" },
      });
    }

    // Delete booking items first, then booking
    await prisma.bookingItem.deleteMany({
      where: { bookingId: id },
    });

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json(
      { error: "Gagal menghapus booking" },
      { status: 500 },
    );
  }
}
