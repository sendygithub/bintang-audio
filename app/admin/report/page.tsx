"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Package,
  Headphones,
  DollarSign,
  Activity,
} from "lucide-react";
import { getEquipment } from "@/app/actions";

type Equipment = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: string;
};

export default function ReportPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await getEquipment();
      if (result.success && result.data) {
        setItems(result.data as Equipment[]);
      }
      setIsLoaded(true);
    }
    loadData();
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">
        Memuat Data...
      </div>
    );
  }

  // Statistics
  const totalItems = items.length;

  const availableItems = items.filter((i) => i.status === "AVAILABLE").length;
  const rentedItems = items.filter((i) => i.status === "RENTED").length;

  const totalValue = items.reduce((acc, curr) => acc + curr.price, 0);

  const potentialRevenue = items
    .filter((i) => i.status === "AVAILABLE")
    .reduce((acc, curr) => acc + curr.price, 0);

  const activeRevenue = items
    .filter((i) => i.status === "RENTED")
    .reduce((acc, curr) => acc + curr.price, 0);

  // Category breakdown
  const categories = items.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30">
      <Navbar />

      <main className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <BarChart3 size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-black">
              Dashboard & Laporan
            </h1>

            <p className="text-zinc-400">
              Ringkasan bisnis rental sound system Anda
            </p>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Peralatan"
            value={totalItems}
            icon={<Package size={24} />}
            color="emerald"
            delay={0.1}
          />

          <StatCard
            title="Sedang Disewa"
            value={rentedItems}
            icon={<Activity size={24} />}
            color="blue"
            delay={0.2}
          />

          <StatCard
            title="Pendapatan Aktif / Hari"
            value={`Rp ${activeRevenue.toLocaleString("id-ID")}`}
            icon={<TrendingUp size={24} />}
            color="emerald"
            delay={0.3}
          />

          <StatCard
            title="Total Nilai Aset"
            value={`Rp ${totalValue.toLocaleString("id-ID")}`}
            icon={<DollarSign size={24} />}
            color="purple"
            delay={0.4}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CATEGORY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Headphones
                size={20}
                className="text-emerald-500"
              />
              Peralatan Berdasarkan Kategori
            </h2>

            <div className="space-y-4">
              {Object.keys(categories).length === 0 ? (
                <p className="text-zinc-500">
                  Tidak ada data tersedia.
                </p>
              ) : (
                Object.entries(categories).map(
                  ([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800"
                    >
                      <span className="font-medium">
                        {category}
                      </span>

                      <span className="px-3 py-1 bg-zinc-800 rounded-lg text-emerald-400 font-bold">
                        {count} barang
                      </span>
                    </div>
                  )
                )
              )}
            </div>
          </motion.div>

          {/* STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity
                size={20}
                className="text-emerald-500"
              />
              Ringkasan Utilisasi
            </h2>

            {/* Progress */}
            <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden flex mb-8">
              <div
                style={{
                  width:
                    totalItems > 0
                      ? `${(rentedItems / totalItems) * 100}%`
                      : "0%",
                }}
                className="bg-red-500 transition-all duration-1000"
              />

              <div
                style={{
                  width:
                    totalItems > 0
                      ? `${(availableItems / totalItems) * 100}%`
                      : "100%",
                }}
                className="bg-emerald-500 transition-all duration-1000"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Rented */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>

                  <span className="text-zinc-400 font-medium">
                    Disewa
                  </span>
                </div>

                <p className="text-3xl font-black">
                  {rentedItems}
                </p>

                <p className="text-sm text-zinc-500 mt-2">
                  Sedang disewa oleh klien
                </p>
              </div>

              {/* Available */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

                  <span className="text-zinc-400 font-medium">
                    Tersedia
                  </span>
                </div>

                <p className="text-3xl font-black">
                  {availableItems}
                </p>

                <p className="text-sm text-zinc-500 mt-2">
                  Siap untuk disewakan (Potensi: Rp{" "}
                  {potentialRevenue.toLocaleString("id-ID")})
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "emerald" | "blue" | "purple" | "red";
  delay: number;
};

function StatCard({
  title,
  value,
  icon,
  color,
  delay,
}: StatCardProps) {
  const colorMap = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    red: "text-red-500 bg-red-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-zinc-400 font-medium">
          {title}
        </p>

        <div
          className={`p-2 rounded-lg ${colorMap[color]}`}
        >
          {icon}
        </div>
      </div>

      <p className="text-3xl font-black">{value}</p>
    </motion.div>
  );
}
