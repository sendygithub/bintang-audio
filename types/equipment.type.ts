// src/types/equipment.type.ts

export type Equipment = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string | null;
  status: string;
};