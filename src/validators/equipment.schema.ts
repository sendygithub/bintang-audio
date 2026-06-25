import { z } from "zod";

export const createEquipmentSchema = z.object({
  name: z
    .string()
    .min(1, "Nama barang wajib diisi")
    .max(100, "Nama barang maksimal 100 karakter"),
  category: z.enum(
    ["Speaker", "Mixer", "Microphone", "Amplifier", "Lighting", "Effect", "DJ"],
    { message: "Kategori tidak valid" },
  ),
  price: z
    .number()
    .int("Harga harus berupa angka bulat")
    .positive("Harga harus lebih dari 0"),
  status: z
    .enum(["AVAILABLE", "RENTED", "MAINTENANCE"])
    .optional()
    .default("AVAILABLE"),
});

export const updateEquipmentSchema = z.object({
  name: z
    .string()
    .min(1, "Nama barang wajib diisi")
    .max(100, "Nama barang maksimal 100 karakter")
    .optional(),
  category: z
    .enum(
      [
        "Speaker",
        "Mixer",
        "Microphone",
        "Amplifier",
        "Lighting",
        "Effect",
        "DJ",
      ],
      { message: "Kategori tidak valid" },
    )
    .optional(),
  price: z
    .number()
    .int("Harga harus berupa angka bulat")
    .positive("Harga harus lebih dari 0")
    .optional(),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"]).optional(),
});

export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
