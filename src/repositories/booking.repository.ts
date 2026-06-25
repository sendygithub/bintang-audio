import { prisma } from "@/lib/prisma";
import type { Booking } from "@/types";

// ============================================
// Booking Repository
// Only handles CRUD operations — NO business logic
// ============================================

export async function findAllBookings(
  userId?: string,
  userRole?: string,
): Promise<Booking[]> {
  const whereClause = userRole === "ADMIN" || !userId ? {} : { userId };

  return prisma.booking.findMany({
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
    orderBy: { createdAt: "desc" },
  }) as unknown as Booking[];
}

export async function findBookingById(id: string): Promise<Booking | null> {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          equipment: true,
        },
      },
    },
  }) as unknown as Booking | null;
}

export async function createBooking(data: {
  userId: string;
  totalAmount: number;
  rentalDate: Date;
  returnDate: Date;
  status: string;
}): Promise<Booking> {
  return prisma.booking.create({
    data,
  }) as unknown as Booking;
}

export async function updateBookingStatus(
  id: string,
  status: string,
): Promise<Booking> {
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          equipment: true,
        },
      },
    },
  }) as unknown as Booking;
}

export async function deleteBooking(id: string): Promise<void> {
  await prisma.booking.delete({
    where: { id },
  });
}

export async function deleteBookingItems(bookingId: string): Promise<void> {
  await prisma.bookingItem.deleteMany({
    where: { bookingId },
  });
}

export async function createBookingItem(data: {
  bookingId: string;
  equipmentId: string;
  priceAtRent: number;
}) {
  return prisma.bookingItem.create({ data });
}
