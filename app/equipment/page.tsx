/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check, Speaker } from "lucide-react";
import { Equipment } from "@/types/equipment.type";
import { categoryImages } from "@/constants/equipment.constant";
import { getAvailableEquipment } from "@/services/equipment.services";
import { getEquipment } from "@/app/actions";
export default function EquipmentPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  function addEquipmentToCart(item: Equipment) {
    if (typeof window === "undefined") return;

    try {
      const storedCart = window.localStorage.getItem("bintang-audio-cart");
      const cart: Equipment[] = storedCart ? JSON.parse(storedCart) : [];

      if (!cart.some((cartItem) => cartItem.id === item.id)) {
        cart.push(item);
        window.localStorage.setItem("bintang-audio-cart", JSON.stringify(cart));
      }
    } catch {
      // ignore localStorage errors
    }
  }

  useEffect(() => {
  async function loadData() {
    try {
      const result = await getEquipment();

      if (result.success && result.data) {
        setItems(
          result.data.filter(
            (item: any) => item.status === "AVAILABLE"
          )
        );
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("LOAD ERROR:", error);
    } finally {
      setIsLoaded(true);
    }
  }

  loadData();
}, []);

  function addToCart(item: Equipment) {
    addEquipmentToCart(item);
    setAddedItems((prev) => new Set(prev).add(item.id));
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">
        Memuat Galeri...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30 pb-24">
      <Navbar />

      <main className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Galeri <span className="text-emerald-500">Peralatan</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Telusuri pilihan sound system premium dan instrumen yang tersedia untuk disewa.
            </p>
          </motion.div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800">
            <Speaker size={48} className="mx-auto text-zinc-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Tidak Ada Peralatan Tersedia</h2>
            <p className="text-zinc-400">
              Semua peralatan kami sedang disewa atau belum ditambahkan oleh admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item, index) => {
              // Priority: Database Image URL -> Map Category Fallback -> Default
              const fallbackImageId = categoryImages[item.category] || categoryImages.Default;
              const imageUrl = item.imageUrl || `https://images.unsplash.com/photo-${fallbackImageId}?q=80&w=600&auto=format&fit=crop`;
              const isAdded = addedItems.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-emerald-500/50 transition-colors flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-emerald-400">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2" title={item.name}>
                        {item.name}
                      </h3>
                      <p className="text-2xl font-black text-white mb-6">
                        Rp {item.price.toLocaleString("id-ID")}
                        <span className="text-sm font-normal text-zinc-500"> / hari</span>
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      disabled={isAdded}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isAdded
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                        : "bg-zinc-800 hover:bg-emerald-500 text-white hover:text-black border border-zinc-700 hover:border-emerald-500"
                        }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={18} /> Sewa Alat Ini
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} /> Sewa Alat Ini
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

