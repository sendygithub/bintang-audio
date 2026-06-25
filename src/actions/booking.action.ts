"use server";

import {
  getBookings,
  createNewBooking,
  changeBookingStatus,
  removeBooking,
} from "@/services";
import type { CreateBookingDTO } from "@/types";
import { revalidatePath } from "next/cache";

// ============================================
// Booking Server Actions
// These are the entry points for mutations from the UI
// ============================================

export async function createBookingAction(data: CreateBookingDTO) {
  const result = await createNewBooking(data);

  if (result.success) {
    revalidatePath("/checkout");
    revalidatePath("/payment");
    revalidatePath("/admin");
    revalidatePath("/transaksi");
  }

  return result;
}

export async function updateBookingStatusAction(id: string, status: string) {
  const result = await changeBookingStatus(id, status);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath("/transaksi");
  }

  return result;
}

export async function deleteBookingAction(id: string) {
  const result = await removeBooking(id);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath("/transaksi");
  }

  return result;
}
