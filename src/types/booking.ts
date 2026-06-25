// ============================================
// Booking Types
// ============================================

export interface Booking {
  id: string;
  userId: string;
  totalAmount: number;
  rentalDate: Date;
  returnDate: Date | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: BookingUser;
  items?: BookingItem[];
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface BookingUser {
  name: string;
  email: string;
  phone: string | null;
}

export interface BookingItem {
  id: string;
  bookingId: string;
  equipmentId: string;
  priceAtRent: number;
  equipment: {
    name: string;
    category: string;
  };
}

export interface CreateBookingDTO {
  customerName: string;
  customerPhone: string;
  rentalDate: string;
  address: string;
  cartItemIds: string[];
  totalPrice: number;
}

export interface BookingResponse {
  success: boolean;
  data?: Booking;
  error?: string;
}

export interface BookingsResponse {
  success: boolean;
  data?: Booking[];
  error?: string;
}
