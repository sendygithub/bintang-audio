// ============================================
// Utility Functions
// ============================================

/**
 * Format a number to Indonesian Rupiah format
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Format a date to Indonesian locale format
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  });
}

/**
 * Format a date with time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a guest email from phone number
 */
export function generateGuestEmail(phone: string): string {
  return `${phone.replace(/\D/g, "")}@guest.com`;
}

/**
 * Calculate return date (default: +1 day from rental date)
 */
export function calculateReturnDate(rentalDate: Date): Date {
  const returnDate = new Date(rentalDate);
  returnDate.setDate(returnDate.getDate() + 1);
  return returnDate;
}
