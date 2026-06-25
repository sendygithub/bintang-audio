/* eslint-disable */
"use client";

import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  QrCode,
  Copy,
  ShieldCheck,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [order, setOrder] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedOrder = localStorage.getItem("bintang_audio_last_order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      // Trigger confetti-like pulse
      setTimeout(() => setShowConfetti(true), 300);
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

  if (!isLoaded || !order)
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#52525B] tracking-wider uppercase">
            Memproses...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-amber-500/30 pb-24">
      <Navbar />

      <main className="pt-28 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#1F1F1F] bg-[#111111] p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Pulse animation on confirmation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={showConfetti ? { scale: [0, 1.2, 1] } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"
          ></motion.div>

          {/* Success icon with pulse */}
          <motion.div
            initial={{ scale: 0 }}
            animate={showConfetti ? { scale: [0, 1.1, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 relative z-10"
          >
            <CheckCircle2 size={40} className="text-amber-500" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl leading-[0.85] text-white mb-2 relative z-10">
            BOOKING
            <br />
            <span className="text-amber-500">DIKONFIRMASI!</span>
          </h1>
          <p className="text-[#A1A1AA] mb-8 relative z-10">
            ID Pesanan:{" "}
            <span className="text-mono text-amber-500 font-bold">
              #{order.orderId.slice(0, 8)}
            </span>
          </p>

          {/* Payment Details */}
          <div className="border border-[#1F1F1F] bg-[#0A0A0A] p-6 mb-8 text-left relative z-10">
            <h2 className="font-bold text-sm tracking-[0.1em] uppercase text-[#A1A1AA] mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-amber-500" /> Instruksi
              Pembayaran
            </h2>

            <p className="text-xs text-[#52525B] mb-6 leading-relaxed">
              Silakan transfer sesuai jumlah di bawah untuk menyelesaikan
              reservasi. Peralatan akan dipesan setelah pembayaran diverifikasi.
            </p>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="spec-label block mb-1">
                  Total yang Harus Dibayar
                </span>
                <p className="font-display text-4xl text-amber-500 mb-6">
                  Rp {order.total.toLocaleString("id-ID")}
                </p>

                <span className="spec-label block mb-1">
                  Virtual Account BCA
                </span>
                <div className="flex items-center gap-3">
                  <p className="text-mono text-xl tracking-wider font-bold">
                    880123456789
                  </p>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] transition-colors text-[#A1A1AA]"
                    title="Salin"
                  >
                    {copied ? (
                      <CheckCircle2 size={16} className="text-amber-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="p-4 bg-white rounded-sm">
                  <QrCode size={120} className="text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 relative z-10">
            <button
              onClick={handleComplete}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <Zap size={18} /> Saya Telah Membayar
            </button>
            <Link
              href="/"
              className="inline-block w-full py-4 border border-[#1F1F1F] text-white font-bold text-sm tracking-wider uppercase hover:border-amber-500/40 transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>

          <p className="text-center text-xs text-[#52525B] flex items-center justify-center gap-1 mt-8 relative z-10">
            <ShieldCheck size={14} /> Dilindungi Enkripsi SSL
          </p>
        </motion.div>
      </main>
    </div>
  );
}
