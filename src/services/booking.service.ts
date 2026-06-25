import {
  findAllBookings,
  findBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  deleteBookingItems,
  createBookingItem,
} from "@/repositories";
import { findEquipmentById, updateEquipmentStatus } from "@/repositories";
import { upsertUser } from "@/repositories";
import { createBookingSchema } from "@/validators";
import type { Booking, CreateBookingDTO, ApiResponse } from "@/types";
import { ZodError } from "zod";

// ============================================
// Booking Service
// Handles business logic, validation, and orchestration
// ============================================

export async function getBookings(
  userId?: string,
  userRole?: string,
): Promise<ApiResponse<Booking[]>> {
  try {
    const bookings = await findAllBookings(userId, userRole);
    return { success: true, data: bookings };
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, error: "Gagal mengambil data booking" };
  }
}

export async function getBookingById(
  id: string,
): Promise<ApiResponse<Booking>> {
  try {
    const booking = await findBookingById(id);

    if (!booking) {
      return { success: false, error: "Booking tidak ditemukan" };
    }

    return { success: true, data: booking };
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    return { success: false, error: "Gagal mengambil data booking" };
  }
}

export async function createNewBooking(
  data: CreateBookingDTO,
): Promise<ApiResponse<Booking>> {
  try {
    // 1. Validate input
    const validated = createBookingSchema.parse(data);

    // 2. Create or find customer by phone number
    const customerEmail = `${validated.customerPhone.replace(/\D/g, "")}@guest.com`;

    const user = await upsertUser({
      where: { email: customerEmail },
      update: {
        name: validated.customerName,
        phone: validated.customerPhone,
      },
      create: {
        name: validated.customerName,
        email: customerEmail,
        phone: validated.customerPhone,
        role: "CUSTOMER",
      },
    });

    // 3. Calculate return date (default 1 day)
    const rentalDate = new Date(validated.rentalDate);
    const returnDate = new Date(rentalDate);
    returnDate.setDate(returnDate.getDate() + 1);

    // 4. Create booking
    const booking = await createBooking({
      userId: user.id,
      rentalDate,
      returnDate,
      totalAmount: validated.totalPrice,
      status: "PENDING",
    });

    // 5. Create booking items and update equipment status
    for (const eqId of validated.cartItemIds) {
      const equipment = await findEquipmentById(eqId);

      if (equipment) {
        await createBookingItem({
          bookingId: booking.id,
          equipmentId: equipment.id,
          priceAtRent: equipment.price,
        });

        await updateEquipmentStatus(eqId, "RENTED");
      }
    }

    return { success: true, data: booking };
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return { success: false, error: messages };
    }

    console.error("Failed to create booking:", error);
    return { success: false, error: "Gagal memproses pesanan" };
  }
}

export async function changeBookingStatus(
  id: string,
  status: string,
): Promise<ApiResponse<Booking>> {
  try {
    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      return { success: false, error: "Status tidak valid" };
    }

    // Check if booking exists
    const existing = await findBookingById(id);
    if (!existing) {
      return { success: false, error: "Booking tidak ditemukan" };
    }

    const booking = await updateBookingStatus(id, status);

    // Handle equipment status changes based on booking status
    if (status === "CANCELLED" || status === "COMPLETED") {
      for (const item of booking.items ?? []) {
        await updateEquipmentStatus(
          (item as unknown as { equipmentId: string }).equipmentId,
          "AVAILABLE",
        );
      }
    }

    if (status === "CONFIRMED") {
      for (const item of booking.items ?? []) {
        await updateEquipmentStatus(
          (item as unknown as { equipmentId: string }).equipmentId,
          "RENTED",
        );
      }
    }

    return { success: true, data: booking };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Gagal memperbarui booking" };
  }
}

export async function removeBooking(id: string): Promise<ApiResponse<void>> {
  try {
    // Check if booking exists
    const existing = await findBookingById(id);
    if (!existing) {
      return { success: false, error: "Booking tidak ditemukan" };
    }

    // Restore equipment status
    for (const item of existing.items ?? []) {
      await updateEquipmentStatus(
        (item as unknown as { equipmentId: string }).equipmentId,
        "AVAILABLE",
      );
    }

    // Delete booking items first, then booking
    await deleteBookingItems(id);
    await deleteBooking(id);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { success: false, error: "Gagal menghapus booking" };
  }
}
