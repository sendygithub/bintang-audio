// ============================================
// Cart Utility
// ============================================

import type { Equipment } from "@/src/types";

export function addEquipmentToCart(item: Equipment) {
  const existingCart = localStorage.getItem("bintang_audio_cart");

  let cart: Equipment[] = [];

  if (existingCart) {
    try {
      cart = JSON.parse(existingCart);
    } catch (error) {
      console.error(error);
    }
  }

  cart.push(item);

  localStorage.setItem("bintang_audio_cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));
}
