/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Package, Search, Edit, X } from "lucide-react";
import { getEquipment, addEquipment, deleteEquipment, updateEquipment } from "@/app/actions";

type Equipment = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: string;
};

export default function AdminPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Speaker",
    price: "",
    status: "AVAILABLE"
  });

  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: "",
    status: ""
  });

  const loadData = async () => {
    const result = await getEquipment();
    if (result.success && result.data) {
      setItems(result.data as Equipment[]);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    setIsSubmitting(true);
    
    const result = await addEquipment({
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      status: formData.status
    });

    if (result.success) {
      setFormData({ ...formData, name: "", price: "" }); // Reset text fields
      loadData(); // reload
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
      status: item.status
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
      status: editFormData.status
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

  if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">Memuat...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black">Inventaris Peralatan</h1>
            <p className="text-zinc-400">Kelola penyewaan sound system Anda</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* FORM SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 h-fit"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus size={20} className="text-emerald-500" /> Tambah Barang Baru
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Nama Barang</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Misal: Yamaha Montage 8"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Kategori</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none appearance-none"
                >
                  <option value="Speaker">Speaker</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Mixer">Mixer</option>
                  <option value="Microphone">Microphone</option>
                  <option value="Cables">Kabel / Aksesoris</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Harga per Hari (Rp)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Misal: 500000"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="AVAILABLE"
                      checked={formData.status === "AVAILABLE"}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="accent-emerald-500"
                    />
                    <span className="text-sm">Tersedia</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="RENTED"
                      checked={formData.status === "RENTED"}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="accent-red-500"
                    />
                    <span className="text-sm">Disewa</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-500 disabled:bg-zinc-800 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-4"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Peralatan"}
              </button>
            </form>
          </motion.div>

          {/* TABLE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80">
              <h2 className="text-xl font-bold">Daftar Inventaris</h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Cari..." 
                  className="pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-1 p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p>Tidak ada peralatan ditemukan. Tambahkan beberapa barang menggunakan form.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                      <th className="pb-4 font-medium">Nama Barang</th>
                      <th className="pb-4 font-medium">Kategori</th>
                      <th className="pb-4 font-medium">Harga/Hari</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                        <td className="py-4 font-medium">{item.name}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-emerald-400">
                          Rp {item.price.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'AVAILABLE' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {item.status === 'AVAILABLE' ? 'Tersedia' : 'Disewa'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors mr-2"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
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
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              
              <button 
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Edit size={24} className="text-blue-500" /> Edit Barang
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nama Barang</label>
                  <input 
                    type="text" 
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Kategori</label>
                  <select 
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none"
                  >
                    <option value="Speaker">Speaker</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Microphone">Microphone</option>
                    <option value="Cables">Kabel / Aksesoris</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Harga per Hari (Rp)</label>
                  <input 
                    type="number" 
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edit-status" 
                        value="AVAILABLE"
                        checked={editFormData.status === "AVAILABLE"}
                        onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                        className="accent-blue-500"
                      />
                      <span className="text-sm">Tersedia</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edit-status" 
                        value="RENTED"
                        checked={editFormData.status === "RENTED"}
                        onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                        className="accent-red-500"
                      />
                      <span className="text-sm">Disewa</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-blue-500 disabled:bg-zinc-800 hover:bg-blue-400 text-white font-bold rounded-xl transition-all"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
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

