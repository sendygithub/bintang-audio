/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
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
    address: ""
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

    const cartItemIds = cart.map(item => item.id);

    const result = await createBooking({
      customerName: formData.name,
      customerPhone: formData.phone,
      rentalDate: formData.date,
      address: formData.address,
      cartItemIds: cartItemIds,
      totalPrice: totalPrice
    });

    if (result.success && result.data) {
       // Save basic order details to localstorage for Payment page Simulation
       const orderDetails = {
        orderId: result.data.id,
        items: cart,
        total: totalPrice,
        customer: formData
      };
      
      localStorage.setItem("bintang_audio_last_order", JSON.stringify(orderDetails));
      
      // Clear cart
      localStorage.removeItem("bintang_audio_cart");
      window.dispatchEvent(new Event("cart-updated"));

      // Redirect to payment
      router.push("/payment");
    } else {
      alert("Terjadi kesalahan: " + result.error);
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">Memuat Keranjang...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30 pb-24">
      <Navbar />
      
      <main className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-6">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <ShoppingCart size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black">Checkout</h1>
            <p className="text-zinc-400">Tinjau pesanan Anda dan konfirmasi booking</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* CART ITEMS */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-bold">Keranjang Anda</h2>
            
            {cart.length === 0 ? (
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-12 text-center">
                <ShoppingCart size={48} className="mx-auto text-zinc-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Keranjang Anda masih kosong</h3>
                <p className="text-zinc-400 mb-6">Telusuri galeri peralatan kami untuk menemukan apa yang Anda butuhkan.</p>
                <button onClick={() => router.push("/equipment")} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors">
                  Pergi ke Galeri
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={`${item.id}-${index}`}
                    className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl"
                  >
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-zinc-400">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="font-mono text-emerald-400 font-bold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* CHECKOUT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Detail Booking</h2>
              
              <form onSubmit={handleCheckout} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nomor Telepon</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="08123456789"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Tanggal Sewa</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Alamat Acara</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Jl. Sudirman No. 1..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                  />
                </div>

                <div className="border-t border-zinc-800 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="font-mono">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400">Pajak & Biaya</span>
                    <span className="font-mono text-emerald-400">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-black">
                    <span>Total</span>
                    <span className="text-emerald-500">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={cart.length === 0 || isSubmitting}
                  className="w-full py-4 bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed hover:bg-emerald-400 text-black font-black text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" size={20} /> Memproses...</>
                  ) : (
                    <>Lanjut ke Pembayaran <ArrowRight size={20} /></>
                  )}
                </button>
                
                <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1 mt-4">
                  <ShieldCheck size={14} /> Proses Booking Aman
                </p>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

