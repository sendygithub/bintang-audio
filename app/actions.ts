"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- EQUIPMENT ACTIONS ---
export async function getEquipment() {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: equipment };
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    return { success: false, error: "Gagal mengambil data peralatan" };
  }
}

export async function addEquipment(data: {
  name: string;
  category: string;
  price: number;
  status: string;
}) {
  try {
    const newItem = await prisma.equipment.create({
      data: {
        name: data.name,
        category: data.category,
        price: data.price,
        status: data.status as any,
      },
    });
    return { success: true, data: newItem };
  } catch (error) {
    console.error("Failed to add equipment:", error);
    return { success: false, error: "Gagal menambahkan peralatan" };
  }
}

export async function updateEquipment(id: string, data: {
  name?: string;
  category?: string;
  price?: number;
  status?: string;
}) {
  try {
    const updatedItem = await prisma.equipment.update({
      where: { id },
      data: {
        ...data,
        status: data.status as any,
      },
    });
    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Failed to update equipment:", error);
    return { success: false, error: "Gagal memperbarui peralatan" };
  }
}

export async function deleteEquipment(id: string) {
  try {
    await prisma.equipment.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete equipment:", error);
    return { success: false, error: "Gagal menghapus peralatan" };
  }
}

// --- CHECKOUT ACTIONS ---
export async function createBooking(data: {
  customerName: string;
  customerPhone: string;
  rentalDate: string;
  address: string;
  cartItemIds: string[];
  totalPrice: number;
}) {
  try {
    // 1. Create or Find Customer
    // Since we don't have full auth, we use phone number as pseudo-identifier
    const customerEmail = `${data.customerPhone.replace(/\\D/g, "")}@guest.com`;
    
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: { name: data.customerName, phone: data.customerPhone },
      create: {
        name: data.customerName,
        email: customerEmail,
        phone: data.customerPhone,
        role: "CUSTOMER",
      },
    });

    // 2. Create Booking
    const returnDate = new Date(data.rentalDate);
    returnDate.setDate(returnDate.getDate() + 1); // Default 1 day rent

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        rentalDate: new Date(data.rentalDate),
        returnDate: returnDate,
        totalAmount: data.totalPrice,
        status: "PENDING",
      },
    });

    // 3. Create BookingItems & update equipment status
    for (const eqId of data.cartItemIds) {
      const eq = await prisma.equipment.findUnique({ where: { id: eqId } });
      if (eq) {
        // Link to booking
        await prisma.bookingItem.create({
          data: {
            bookingId: booking.id,
            equipmentId: eq.id,
            priceAtRent: eq.price,
          },
        });
        
        // Mark as rented temporarily
        await prisma.equipment.update({
          where: { id: eq.id },
          data: { status: "RENTED" },
        });
      }
    }

    return { success: true, data: booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Gagal memproses pesanan" };
  }
}
