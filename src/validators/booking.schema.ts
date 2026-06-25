import { z } from "zod";

export const createBookingSchema = z.object({
  customerName: z
    .string()
    .min(1, "Nama lengkap wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),
  customerPhone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh angka"),
  rentalDate: z
    .string()
    .min(1, "Tanggal sewa wajib diisi")
    .refine(
      (date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime()) && parsed >= new Date();
      },
      { message: "Tanggal sewa harus hari ini atau setelahnya" },
    ),
  address: z
    .string()
    .min(5, "Alamat wajib diisi minimal 5 karakter")
    .max(500, "Alamat maksimal 500 karakter"),
  cartItemIds: z
    .array(z.string().min(1, "ID item tidak valid"))
    .min(1, "Minimal harus memilih 1 peralatan"),
  totalPrice: z
    .number()
    .int("Harga harus berupa angka bulat")
    .positive("Total harga harus lebih dari 0"),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"], {
    message: "Status tidak valid",
  }),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<
  typeof updateBookingStatusSchema
>;
