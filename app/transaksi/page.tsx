/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Calendar,
  Package,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Volume2,
  SlidersHorizontal,
  Mic2,
  Radio,
  Disc3,
  Headphones,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type BookingItem = {
  id: string;
  equipment: { name: string; category: string };
  priceAtRent: number;
};

type Booking = {
  id: string;
  totalAmount: number;
  rentalDate: string;
  returnDate: string | null;
  status: string;
  createdAt: string;
  items: BookingItem[];
};

const categoryIcons: Record<string, React.ReactNode> = {
  Speaker: <Volume2 size={14} />,
  Mixer: <SlidersHorizontal size={14} />,
  Microphone: <Mic2 size={14} />,
  Amplifier: <Radio size={14} />,
  Lighting: <Disc3 size={14} />,
  Effect: <Disc3 size={14} />,
  DJ: <Headphones size={14} />,
};

const statusConfig: Record<
  string,
  { icon: React.ReactNode; text: string; class: string }
> = {
  PENDING: {
    icon: <AlertCircle size={16} />,
    text: "Menunggu Konfirmasi",
    class: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  CONFIRMED: {
    icon: <CheckCircle2 size={16} />,
    text: "Dikonfirmasi",
    class: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  COMPLETED: {
    icon: <CheckCircle2 size={16} />,
    text: "Selesai",
    class: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  CANCELLED: {
    icon: <XCircle size={16} />,
    text: "Dibatalkan",
    class: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

export default function TransaksiPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (authStatus !== "authenticated") return;

    const loadBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadBookings();
  }, [authStatus, router]);

  if (authStatus === "loading" || !isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#52525B] tracking-wider uppercase">
            Memuat Transaksi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-amber-500/30 pb-24">
      <Navbar />

      <main className="pt-28 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="spec-label block mb-4">Riwayat</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.85] text-white mb-2">
            TRANSAKSI
            <br />
            <span className="text-amber-500">SAYA</span>
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            Daftar booking sound system yang pernah kamu lakukan.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-[#1F1F1F] bg-[#111111] p-16 text-center">
            <ClipboardList size={48} className="mx-auto text-[#52525B] mb-4" />
            <h2 className="font-display text-3xl text-white mb-2">
              BELUM ADA TRANSAKSI
            </h2>
            <p className="text-[#52525B] text-sm mb-6">
              Kamu belum melakukan booking. Mulai dengan memilih peralatan sound
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
          <div className="space-y-4">
            {bookings.map((booking, index) => {
              const status =
                statusConfig[booking.status] || statusConfig.PENDING;
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-[#1F1F1F] bg-[#111111] p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center text-amber-500">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-mono text-xs text-[#52525B]">
                          ID: #{booking.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-[#A1A1AA] flex items-center gap-2 mt-1">
                          <Calendar size={14} className="text-amber-500" />
                          {new Date(booking.rentalDate).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border w-fit ${status.class}`}
                    >
                      {status.icon}
                      {status.text}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {booking.items.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-[#A1A1AA]"
                      >
                        {categoryIcons[item.equipment.category] || null}
                        {item.equipment.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F1F1F]">
                    <span className="text-xs text-[#52525B]">
                      Dibuat:{" "}
                      {new Date(booking.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="font-display text-2xl text-amber-500">
                      Rp {booking.totalAmount.toLocaleString("id-ID")}
                    </span>
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
