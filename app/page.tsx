"use client";

import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import { motion } from "framer-motion";
import { Speaker, Mic2, Settings2, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Peralatan Berkualitas",
      description: "Kami hanya menyewakan peralatan audio berkualitas tinggi dari merek ternama untuk menjamin kejernihan suara.",
      icon: <Speaker size={32} />
    },
    {
      title: "Teknisi Profesional",
      description: "Tim teknisi kami siap membantu setup dan standby selama acara Anda berlangsung.",
      icon: <Settings2 size={32} />
    },
    {
      title: "Layanan Tepercaya",
      description: "Ketepatan waktu dan keandalan adalah prioritas kami agar acara Anda berjalan lancar tanpa kendala.",
      icon: <ShieldCheck size={32} />
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen font-sans selection:bg-emerald-500/30">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_50%)]"></div>
          {/* Fallback pattern if video is missing */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 tracking-widest uppercase">
              #1 Rental Sound System
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
              Bintang Audio <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Sound System Rental
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
              Solusi penyewaan sound system premium untuk event, hajatan, dan pesta. Kualitas audio jernih dengan teknisi berpengalaman.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/checkout" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-black font-black text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Zap size={20} /> Booking Sekarang
                </span>
              </a>
              <a 
                href="/equipment" 
                className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-white font-bold text-lg rounded-2xl transition-all hover:bg-zinc-800"
              >
                Lihat Katalog
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="services" className="py-24 bg-zinc-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Kami memberikan pelayanan terbaik untuk memastikan setiap detail suara di acara Anda terdengar sempurna.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/80 backdrop-blur-xl border border-emerald-500/30 p-12 rounded-3xl shadow-2xl"
          >
            <Mic2 size={48} className="text-emerald-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">Siap dukung acara anda dengan kualitas audio terpercaya</h2>
            <p className="text-xl text-zinc-300 mb-8">
              Reservasi sekarang untuk konsultasi gratis mengenai kebutuhan audio Anda.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg px-10 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 mx-auto">
              <Headphones /> Hubungi- Heru purwanto
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}