/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Speaker,
  Search,
  SlidersHorizontal,
  X,
  Volume2,
  Mic2,
  Disc3,
  Radio,
  Headphones,
} from "lucide-react";
import { Equipment } from "@/types/equipment.type";
import { categoryImages } from "@/constants/equipment.constant";
import { getEquipment } from "@/app/actions";

const categoryIcons: Record<string, React.ReactNode> = {
  Speaker: <Volume2 size={16} />,
  Mixer: <SlidersHorizontal size={16} />,
  Microphone: <Mic2 size={16} />,
  Amplifier: <Radio size={16} />,
  Lighting: <Disc3 size={16} />,
  Effect: <Disc3 size={16} />,
  DJ: <Headphones size={16} />,
};

const categories = [
  "Semua",
  "Speaker",
  "Mixer",
  "Microphone",
  "Amplifier",
  "Lighting",
  "Effect",
  "DJ",
];

export default function EquipmentPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getEquipment();
        if (result.success && result.data) {
          setItems(
            result.data.filter((item: any) => item.status === "AVAILABLE"),
          );
        }
      } catch (error) {
        console.error("LOAD ERROR:", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  // Intersection Observer for power-on animation
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    // Observe all equipment cards
    document.querySelectorAll("[data-equipment-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaded, activeCategory, searchQuery]);

  const addToCart = (item: Equipment) => {
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

    setAddedItems((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured items (first 2 for visual prominence)
  const featuredItems = filteredItems.slice(0, 2);
  const regularItems = filteredItems.slice(2);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#52525B] tracking-wider uppercase">
            Memuat Peralatan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-amber-500/30 pb-24">
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="spec-label block mb-4">Katalog</span>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.85] text-white mb-4">
            PERALATAN
            <br />
            <span className="text-amber-500">KAMI</span>
          </h1>
          <p className="text-[#A1A1AA] max-w-xl">
            Dari speaker line array sampai wireless mic — semua siap pakai,
            terawat, dan diinspeksi sebelum dikirim.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari peralatan..."
              className="w-full pl-10 pr-10 py-3 bg-[#111111] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-black"
                    : "bg-[#111111] border border-[#1F1F1F] text-[#52525B] hover:text-white hover:border-amber-500/30"
                }`}
              >
                {cat === "Semua" ? "Semua" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="border border-[#1F1F1F] bg-[#111111] p-16 text-center">
            <Speaker size={48} className="mx-auto text-[#52525B] mb-4" />
            <h2 className="font-display text-3xl text-white mb-2">
              TIDAK DITEMUKAN
            </h2>
            <p className="text-[#52525B] text-sm mb-6">
              {searchQuery
                ? `Tidak ada hasil untuk "${searchQuery}"`
                : "Semua peralatan sedang disewa. Cek lagi nanti atau hubungi kami."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 bg-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:bg-amber-400 transition-all"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Featured Items — larger, prominent */}
            {featuredItems.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {featuredItems.map((item, index) => {
                  const fallbackImageId =
                    categoryImages[item.category] || categoryImages.Default;
                  const imageUrl =
                    item.imageUrl ||
                    `https://images.unsplash.com/photo-${fallbackImageId}?q=80&w=800&auto=format&fit=crop`;

                  return (
                    <div
                      key={item.id}
                      id={`equipment-${item.id}`}
                      data-equipment-id={item.id}
                      className="relative border border-[#1F1F1F] bg-[#111111] overflow-hidden group"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-[#0A0A0A] relative">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className={`w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ${
                            visibleItems.has(`equipment-${item.id}`)
                              ? "power-on"
                              : ""
                          }`}
                        />
                        {/* Scan line overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none"></div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 border border-[#1F1F1F] px-3 py-1 flex items-center gap-2">
                          <span className="text-amber-500">
                            {categoryIcons[item.category] || (
                              <Volume2 size={14} />
                            )}
                          </span>
                          <span className="text-xs text-[#A1A1AA] tracking-wider uppercase">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-display text-2xl tracking-wider text-white mb-2 group-hover:text-amber-500 transition-colors">
                          {item.name.toUpperCase()}
                        </h3>
                        <p className="text-2xl font-bold text-amber-500 mb-4">
                          Rp {item.price.toLocaleString("id-ID")}
                          <span className="text-sm text-[#52525B] font-normal">
                            /hari
                          </span>
                        </p>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-3 bg-[#1F1F1F] hover:bg-amber-500 hover:text-black text-white font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                        >
                          {addedItems.has(item.id) ? (
                            <>
                              <Check size={16} /> Ditambahkan
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={16} /> Tambah ke Pesanan
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Regular Items — grid */}
            {regularItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {regularItems.map((item, index) => {
                  const fallbackImageId =
                    categoryImages[item.category] || categoryImages.Default;
                  const imageUrl =
                    item.imageUrl ||
                    `https://images.unsplash.com/photo-${fallbackImageId}?q=80&w=600&auto=format&fit=crop`;

                  return (
                    <div
                      key={item.id}
                      id={`equipment-${item.id}`}
                      data-equipment-id={item.id}
                      className="relative border border-[#1F1F1F] bg-[#111111] overflow-hidden group"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#0A0A0A] relative">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className={`w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ${
                            visibleItems.has(`equipment-${item.id}`)
                              ? "power-on"
                              : ""
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none"></div>

                        <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 border border-[#1F1F1F] px-2 py-0.5 flex items-center gap-1.5">
                          <span className="text-amber-500">
                            {categoryIcons[item.category] || (
                              <Volume2 size={12} />
                            )}
                          </span>
                          <span className="text-[10px] text-[#A1A1AA] tracking-wider uppercase">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-display text-sm tracking-wider text-white mb-1 truncate">
                          {item.name.toUpperCase()}
                        </h3>
                        <p className="text-base font-bold text-amber-500 mb-3">
                          Rp {item.price.toLocaleString("id-ID")}
                          <span className="text-[10px] text-[#52525B] font-normal">
                            /hari
                          </span>
                        </p>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-2 bg-[#1F1F1F] hover:bg-amber-500 hover:text-black text-white font-bold text-[11px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                        >
                          {addedItems.has(item.id) ? (
                            <>
                              <Check size={12} /> Ditambahkan
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={12} /> Tambah
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
