/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Loader2,
  CheckCircle,
  Clock,
  User,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/actions";

type Equipment = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string | null;
  status: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    address: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("bintang_audio_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const removeFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
    localStorage.setItem("bintang_audio_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const cartItemIds = cart.map((item) => item.id);

    const result = await createBooking({
      customerName: formData.name,
      customerPhone: formData.phone,
      rentalDate: formData.date,
      address: formData.address,
      cartItemIds: cartItemIds,
      totalPrice: totalPrice,
    });

    if (result.success && result.data) {
      const orderDetails = {
        orderId: result.data.id,
        items: cart,
        total: totalPrice,
        customer: formData,
      };

      localStorage.setItem(
        "bintang_audio_last_order",
        JSON.stringify(orderDetails),
      );

      localStorage.removeItem("bintang_audio_cart");
      window.dispatchEvent(new Event("cart-updated"));

      router.push("/payment");
    } else {
      alert("Terjadi kesalahan: " + result.error);
      setIsSubmitting(false);
    }
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#52525B] tracking-wider uppercase">
            Memuat Keranjang...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-amber-500/30 pb-24">
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="spec-label block mb-4">Checkout</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.85] text-white mb-2">
            KONFIRMASI
            <br />
            <span className="text-amber-500">PESANAN</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA] mb-4">
              Keranjang ({cart.length} item)
            </h2>

            {cart.length === 0 ? (
              <div className="border border-[#1F1F1F] bg-[#111111] p-12 text-center">
                <ShoppingCart
                  size={48}
                  className="mx-auto text-[#52525B] mb-4"
                />
                <h3 className="font-display text-2xl text-white mb-2">
                  KERANJANG KOSONG
                </h3>
                <p className="text-[#52525B] text-sm mb-6">
                  Belum ada peralatan dipilih. Mulai dengan memilih paket sound
                  system.
                </p>
                <button
                  onClick={() => router.push("/equipment")}
                  className="px-6 py-3 bg-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:bg-amber-400 transition-all"
                >
                  Lihat Peralatan
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={`${item.id}-${index}`}
                    className="flex items-center justify-between border border-[#1F1F1F] bg-[#111111] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center text-amber-500">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm tracking-wider text-white">
                          {item.name.toUpperCase()}
                        </h4>
                        <p className="text-xs text-[#52525B]">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-mono text-sm text-amber-500 font-bold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-[#52525B] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* CHECKOUT FORM */}
          <div className="lg:col-span-2">
            <div className="border border-[#1F1F1F] bg-[#111111] p-8 sticky top-28">
              <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA] mb-6">
                Detail Booking
              </h2>

              <form onSubmit={handleCheckout} className="space-y-5">
                <div>
                  <label className="spec-label block mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                    />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Budi Santoso"
                      className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="spec-label block mb-2">Nomor Telepon</label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                    />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="08123456789"
                      className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="spec-label block mb-2">Tanggal Sewa</label>
                  <div className="relative">
                    <Calendar
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                    />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="spec-label block mb-2">Alamat Acara</label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-3 text-[#52525B]"
                    />
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Jl. Sudirman No. 1..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-[#1F1F1F] pt-6 mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#52525B]">Subtotal</span>
                    <span className="text-mono text-sm">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#52525B]">
                      Pajak & Biaya
                    </span>
                    <span className="text-mono text-sm text-amber-500">
                      Gratis
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#1F1F1F]">
                    <span className="font-bold text-sm tracking-wider uppercase">
                      Total
                    </span>
                    <span className="font-display text-2xl text-amber-500">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || isSubmitting}
                  className="w-full py-4 bg-amber-500 disabled:bg-[#1F1F1F] disabled:text-[#52525B] disabled:cursor-not-allowed hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />{" "}
                      Memproses...
                    </>
                  ) : (
                    <>
                      Lanjut ke Pembayaran <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#52525B] flex items-center justify-center gap-1">
                  <ShieldCheck size={14} /> Proses Booking Aman & Terenkripsi
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
