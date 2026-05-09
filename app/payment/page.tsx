/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, QrCode, Copy, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [order, setOrder] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedOrder = localStorage.getItem("bintang_audio_last_order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      router.push("/");
    }
    setIsLoaded(true);
  }, [router]);

  const handleCopy = () => {
    navigator.clipboard.writeText("880123456789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    localStorage.removeItem("bintang_audio_last_order");
    router.push("/");
  };

  if (!isLoaded || !order) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">Memproses...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30 pb-24">
      <Navbar />
      
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-emerald-500/20 blur-[100px] pointer-events-none"></div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-6 relative z-10">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          
          <h1 className="text-3xl font-black mb-2 relative z-10">Booking Dikonfirmasi!</h1>
          <p className="text-zinc-400 mb-8 relative z-10">
            ID Pesanan Anda adalah <span className="font-mono text-emerald-400 font-bold">{order.orderId}</span>
          </p>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8 text-left relative z-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-emerald-500" /> Instruksi Pembayaran
            </h2>
            
            <p className="text-zinc-400 text-sm mb-6">
              Silakan transfer sesuai jumlah di bawah ini untuk menyelesaikan reservasi Anda. Peralatan akan dipesan setelah pembayaran diverifikasi.
            </p>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Total yang Harus Dibayar</p>
                <p className="text-4xl font-black text-emerald-500 mb-6 font-mono">
                  Rp {order.total.toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-zinc-500 mb-1">Virtual Account Bank BCA</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-mono tracking-wider font-bold">880123456789</p>
                  <button 
                    onClick={handleCopy}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-300"
                    title="Salin ke clipboard"
                  >
                    {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-end">
                <div className="p-4 bg-white rounded-2xl">
                  <QrCode size={120} className="text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <button 
              onClick={handleComplete}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Saya Telah Menyelesaikan Pembayaran
            </button>
            <Link href="/" className="inline-block w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all border border-zinc-800">
              Kembali ke Beranda
            </Link>
          </div>
          
          <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1 mt-8 relative z-10">
            <ShieldCheck size={14} /> Dilindungi oleh Enkripsi SSL
          </p>
        </motion.div>
      </main>
    </div>
  );
}

