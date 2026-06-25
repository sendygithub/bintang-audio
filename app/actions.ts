// ============================================
// Backward Compatibility Layer
// Re-exports from new src/actions structure
// ============================================

export {
  getEquipmentAction as getEquipment,
  addEquipmentAction as addEquipment,
  updateEquipmentAction as updateEquipment,
  deleteEquipmentAction as deleteEquipment,
} from "@/src/actions";

export {
  createBookingAction as createBooking,
  updateBookingStatusAction as updateBookingStatus,
  deleteBookingAction as deleteBooking,
} from "@/src/actions";
