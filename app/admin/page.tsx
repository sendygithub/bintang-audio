/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Package,
  Search,
  Edit,
  X,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Volume2,
  SlidersHorizontal,
  Mic2,
  Radio,
  Disc3,
  Headphones,
  Zap,
  ChevronDown,
} from "lucide-react";
import {
  getEquipment,
  addEquipment,
  deleteEquipment,
  updateEquipment,
} from "@/app/actions";

type Equipment = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: string;
};

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
  user: { name: string; email: string; phone: string | null };
  items: BookingItem[];
};

const categoryIcons: Record<string, React.ReactNode> = {
  Speaker: <Volume2 size={16} />,
  Mixer: <SlidersHorizontal size={16} />,
  Microphone: <Mic2 size={16} />,
  Amplifier: <Radio size={16} />,
  Lighting: <Disc3 size={16} />,
  Effect: <Disc3 size={16} />,
  DJ: <Headphones size={16} />,
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"equipment" | "bookings">(
    "equipment",
  );

  // Equipment state
  const [items, setItems] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Speaker",
    price: "",
    status: "AVAILABLE",
  });
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: "",
    status: "",
  });

  // Booking state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingsLoaded, setIsBookingsLoaded] = useState(false);

  const loadData = async () => {
    const result = await getEquipment();
    if (result.success && result.data) {
      setItems(result.data as Equipment[]);
    }
    setIsLoaded(true);
  };

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
      setIsBookingsLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
    loadBookings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setIsSubmitting(true);

    const result = await addEquipment({
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      status: formData.status,
    });

    if (result.success) {
      setFormData({ ...formData, name: "", price: "" });
      loadData();
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  };

  const handleEditClick = (item: Equipment) => {
    setEditingItem(item);
    setEditFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      status: item.status,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editFormData.name || !editFormData.price) return;

    setIsSubmitting(true);
    const result = await updateEquipment(editingItem.id, {
      name: editFormData.name,
      category: editFormData.category,
      price: parseInt(editFormData.price),
      status: editFormData.status,
    });

    if (result.success) {
      setEditingItem(null);
      loadData();
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      const result = await deleteEquipment(id);
      if (result.success) {
        loadData();
      } else {
        alert(result.error);
      }
    }
  };

  const handleUpdateBookingStatus = async (
    bookingId: string,
    newStatus: string,
  ) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        loadBookings();
        loadData();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          loadBookings();
          loadData();
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return {
          icon: <CheckCircle2 size={14} />,
          text: "Dikonfirmasi",
          class: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        };
      case "PENDING":
        return {
          icon: <AlertCircle size={14} />,
          text: "Menunggu",
          class: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        };
      case "CANCELLED":
        return {
          icon: <XCircle size={14} />,
          text: "Dibatalkan",
          class: "bg-red-500/10 text-red-500 border-red-500/20",
        };
      case "COMPLETED":
        return {
          icon: <CheckCircle2 size={14} />,
          text: "Selesai",
          class: "bg-green-500/10 text-green-500 border-green-500/20",
        };
      default:
        return {
          icon: <Package size={14} />,
          text: status,
          class: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
        };
    }
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#52525B] tracking-wider uppercase">
            Memuat Dashboard...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-amber-500/30">
      <Navbar />

      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="spec-label block mb-4">Dashboard</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.85] text-white mb-2">
            ADMIN
            <br />
            <span className="text-amber-500">PANEL</span>
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            Kelola inventaris dan transaksi penyewaan
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-[#111111] p-1.5 border border-[#1F1F1F] w-fit">
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-all ${
              activeTab === "equipment"
                ? "bg-amber-500 text-black"
                : "text-[#52525B] hover:text-white"
            }`}
          >
            <Package size={16} className="inline mr-2" />
            Inventaris
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-all ${
              activeTab === "bookings"
                ? "bg-amber-500 text-black"
                : "text-[#52525B] hover:text-white"
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Transaksi ({bookings.length})
          </button>
        </div>

        {activeTab === "equipment" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* FORM SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 border border-[#1F1F1F] bg-[#111111] p-6 h-fit"
            >
              <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA] mb-6 flex items-center gap-2">
                <Plus size={16} className="text-amber-500" /> Tambah Barang
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="spec-label block mb-2">Nama Barang</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Misal: Yamaha Montage 8"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="spec-label block mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors appearance-none"
                  >
                    <option value="Speaker">Speaker</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Microphone">Microphone</option>
                    <option value="Amplifier">Amplifier</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Effect">Effect</option>
                    <option value="DJ">DJ</option>
                  </select>
                </div>

                <div>
                  <label className="spec-label block mb-2">
                    Harga per Hari (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Misal: 500000"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="spec-label block mb-2">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="AVAILABLE"
                        checked={formData.status === "AVAILABLE"}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="accent-amber-500"
                      />
                      <span className="text-xs text-[#A1A1AA]">Tersedia</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="RENTED"
                        checked={formData.status === "RENTED"}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="accent-red-500"
                      />
                      <span className="text-xs text-[#A1A1AA]">Disewa</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-500 disabled:bg-[#1F1F1F] disabled:text-[#52525B] hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Peralatan"}
                </button>
              </form>
            </motion.div>

            {/* TABLE SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 border border-[#1F1F1F] bg-[#111111] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-[#1F1F1F] flex justify-between items-center bg-[#0A0A0A]/80">
                <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA]">
                  Daftar Inventaris
                </h2>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]"
                  />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="pl-9 pr-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 w-48"
                  />
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#52525B] py-16">
                    <Package size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">
                      Tidak ada peralatan. Tambahkan menggunakan form.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[#52525B] text-xs border-b border-[#1F1F1F]">
                        <th className="pb-4 pl-6 pt-4 font-medium tracking-wider uppercase">
                          Nama Barang
                        </th>
                        <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                          Kategori
                        </th>
                        <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                          Harga/Hari
                        </th>
                        <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                          Status
                        </th>
                        <th className="pb-4 pr-6 pt-4 font-medium tracking-wider uppercase text-right">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 pl-6 font-medium text-sm">
                            {item.name}
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-[#A1A1AA]">
                              {categoryIcons[item.category] || null}
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 text-mono text-sm text-amber-500">
                            Rp {item.price.toLocaleString("id-ID")}
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2.5 py-1 text-xs font-bold ${
                                item.status === "AVAILABLE"
                                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                  : "bg-red-500/10 text-red-500 border border-red-500/20"
                              }`}
                            >
                              {item.status === "AVAILABLE"
                                ? "Tersedia"
                                : "Disewa"}
                            </span>
                          </td>
                          <td className="py-4 pr-6 text-right">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="p-1.5 text-[#52525B] hover:text-amber-500 hover:bg-amber-500/10 transition-colors mr-1"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-[#52525B] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          /* BOOKINGS TAB */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-[#1F1F1F] bg-[#111111] overflow-hidden"
          >
            <div className="p-6 border-b border-[#1F1F1F] bg-[#0A0A0A]/80">
              <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA] flex items-center gap-2">
                <Calendar size={16} className="text-amber-500" /> Data Booking &
                Transaksi
              </h2>
            </div>

            <div className="overflow-x-auto">
              {!isBookingsLoaded ? (
                <div className="text-center py-16 text-[#52525B] text-sm">
                  Memuat data booking...
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-16 text-[#52525B]">
                  <Package size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">Belum ada transaksi booking.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[#52525B] text-xs border-b border-[#1F1F1F]">
                      <th className="pb-4 pl-6 pt-4 font-medium tracking-wider uppercase">
                        ID Booking
                      </th>
                      <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                        Pelanggan
                      </th>
                      <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                        Tanggal Sewa
                      </th>
                      <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                        Peralatan
                      </th>
                      <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                        Total
                      </th>
                      <th className="pb-4 pt-4 font-medium tracking-wider uppercase">
                        Status
                      </th>
                      <th className="pb-4 pr-6 pt-4 font-medium tracking-wider uppercase text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => {
                      const badge = getStatusBadge(booking.status);
                      return (
                        <tr
                          key={booking.id}
                          className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 pl-6">
                            <span className="text-mono text-xs text-[#52525B]">
                              #{booking.id.slice(0, 8)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-sm">
                                {booking.user.name}
                              </p>
                              <p className="text-xs text-[#52525B]">
                                {booking.user.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 text-sm">
                            {new Date(booking.rentalDate).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="py-4">
                            <div className="flex flex-wrap gap-1">
                              {booking.items.map((item) => (
                                <span
                                  key={item.id}
                                  className="px-2 py-0.5 bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-[#A1A1AA]"
                                >
                                  {item.equipment.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 text-mono text-sm text-amber-500 font-bold">
                            Rp {booking.totalAmount.toLocaleString("id-ID")}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border ${badge.class}`}
                            >
                              {badge.icon}
                              {badge.text}
                            </span>
                          </td>
                          <td className="py-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {booking.status === "PENDING" && (
                                <button
                                  onClick={() =>
                                    handleUpdateBookingStatus(
                                      booking.id,
                                      "CONFIRMED",
                                    )
                                  }
                                  className="p-1.5 text-amber-500 hover:bg-amber-500/10 transition-colors"
                                  title="Konfirmasi"
                                >
                                  <CheckCircle2 size={16} />
                                </button>
                              )}
                              {booking.status === "PENDING" && (
                                <button
                                  onClick={() =>
                                    handleUpdateBookingStatus(
                                      booking.id,
                                      "CANCELLED",
                                    )
                                  }
                                  className="p-1.5 text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Batalkan"
                                >
                                  <XCircle size={16} />
                                </button>
                              )}
                              {booking.status === "CONFIRMED" && (
                                <button
                                  onClick={() =>
                                    handleUpdateBookingStatus(
                                      booking.id,
                                      "COMPLETED",
                                    )
                                  }
                                  className="p-1.5 text-green-500 hover:bg-green-500/10 transition-colors"
                                  title="Selesaikan"
                                >
                                  <CheckCircle2 size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="p-1.5 text-[#52525B] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Hapus"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111111] border border-[#1F1F1F] p-8 shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-amber-300"></div>

              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 text-[#52525B] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="font-display text-3xl text-white mb-6 flex items-center gap-2">
                <Edit size={24} className="text-amber-500" /> EDIT BARANG
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="spec-label block mb-2">Nama Barang</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="spec-label block mb-2">Kategori</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors appearance-none"
                  >
                    <option value="Speaker">Speaker</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Microphone">Microphone</option>
                    <option value="Amplifier">Amplifier</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Effect">Effect</option>
                    <option value="DJ">DJ</option>
                  </select>
                </div>

                <div>
                  <label className="spec-label block mb-2">
                    Harga per Hari (Rp)
                  </label>
                  <input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        price: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="spec-label block mb-2">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="edit-status"
                        value="AVAILABLE"
                        checked={editFormData.status === "AVAILABLE"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value,
                          })
                        }
                        className="accent-amber-500"
                      />
                      <span className="text-xs text-[#A1A1AA]">Tersedia</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="edit-status"
                        value="RENTED"
                        checked={editFormData.status === "RENTED"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value,
                          })
                        }
                        className="accent-red-500"
                      />
                      <span className="text-xs text-[#A1A1AA]">Disewa</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 py-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white font-bold text-sm tracking-wider uppercase transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-amber-500 disabled:bg-[#1F1F1F] disabled:text-[#52525B] hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
