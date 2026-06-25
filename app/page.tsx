"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import { motion } from "framer-motion";
import {
  Speaker,
  Mic2,
  Settings2,
  ShieldCheck,
  Zap,
  Headphones,
  Music,
  Volume2,
  Star,
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [activePackage, setActivePackage] = useState(0);

  const features = [
    {
      title: "Peralatan Premium",
      description:
        "Sound system dari merek ternama — JBL, Yamaha, Shure, Pioneer. Setiap unit diinspeksi sebelum disewa.",
      icon: <Speaker size={28} />,
    },
    {
      title: "Teknisi Berpengalaman",
      description:
        "Tim teknisi kami siap setup, soundcheck, dan standby selama acara. Pengalaman 10+ tahun di industri audio.",
      icon: <Settings2 size={28} />,
    },
    {
      title: "Tepat Waktu & Andal",
      description:
        "Ketepatan waktu adalah prioritas. Peralatan tiba H-1, diuji di lokasi, dan siap dipakai tepat jadwal.",
      icon: <ShieldCheck size={28} />,
    },
  ];

  const packages = [
    {
      name: "PAKET BRONZE",
      tagline: "Cocok untuk acara kecil",
      price: "1.500.000",
      items: [
        "2x Speaker Aktif 12 inch",
        "1x Mixer 8 Channel",
        "2x Wireless Mic",
        "1x Teknisi Standby",
      ],
      suitable: "Meeting, karaoke, acara keluarga",
    },
    {
      name: "PAKET SILVER",
      tagline: "Pilihan populer",
      price: "3.500.000",
      items: [
        "4x Speaker Aktif 15 inch",
        "2x Subwoofer 18 inch",
        "1x Mixer 16 Channel",
        "4x Wireless Mic",
        "1x Teknisi + Operator",
      ],
      suitable: "Pernikahan, acara sekolah, gathering",
      popular: true,
    },
    {
      name: "PAKET GOLD",
      tagline: "Untuk event besar",
      price: "7.000.000",
      items: [
        "6x Line Array Speaker",
        "4x Subwoofer 18 inch",
        "1x Mixer Digital 32 Ch",
        "6x Wireless Mic + 2x Wired",
        "1x Lighting Package",
        "2x Teknisi + Operator",
      ],
      suitable: "Konser, corporate event, festival",
    },
  ];

  const testimonials = [
    {
      name: "Rina Wijaya",
      role: "Wedding Organizer",
      text: "Suaranya jernih banget, tamu undangan sampai komentar. Teknisinya datang tepat waktu dan setup rapi. Highly recommended!",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Event Coordinator — PT. Maju Bersama",
      text: "Udah 3 kali pake Bintang Audio untuk company event. Never disappointed. Peralatannya terawat, soundnya bersih.",
      rating: 5,
    },
    {
      name: "Asep Nugraha",
      role: "Ketua Panitia — Festival Musik Cikupa",
      text: "Paket Gold-nya mantap! Line array-nya bisa ngisi lapangan sampe ujung. Tim teknisinya profesional banget.",
      rating: 5,
    },
  ];

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen selection:bg-amber-500/30">
      <Navbar />

      {/* ============================================
          HERO — Stage Light Aesthetic
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background — deep stage darkness with warm light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#111111] z-0"></div>

        {/* Warm stage spotlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-amber-500/8 via-amber-500/3 to-transparent rounded-full blur-[80px] pointer-events-none z-0"></div>

        {/* Subtle amber glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none z-0"></div>

        {/* Waveform texture */}
        <div className="absolute inset-0 opacity-[0.03] z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M10,50 Q20,30 30,50 T50,50 T70,50 T90,50' fill='none' stroke='%23F59E0B' stroke-width='2'/%3E%3C/svg%3E\")",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-8 tracking-[0.15em] uppercase">
              <Volume2 size={14} />
              Rental Sound System Premium — Tangerang
            </div>

            {/* Main headline — Bebas Neue, all-caps, tight tracking */}
            <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight text-white mb-6">
              SUARA YANG
              <br />
              <span className="text-amber-500">MENGGETARKAN</span>
            </h1>

            <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Peralatan yang tepat waktu. Sound system premium untuk wedding,
              konser, dan corporate event. Dengan teknisi berpengalaman yang
              memastikan setiap frekuensi terdengar sempurna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/equipment"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-black font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] amber-glow-hover"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Zap size={20} /> CEK KETERSEDIAAN
                </span>
              </Link>
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#181818] border border-[#1F1F1F] hover:border-amber-500/40 text-white font-bold text-lg transition-all hover:bg-[#1F1F1F]"
              >
                PESAN SEKARANG
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-xs text-[#52525B]">
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-amber-500/60" /> 50+
                Event Sukses
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-amber-500/60" /> Teknisi
                Profesional
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-amber-500/60" /> Tepat
                Waktu Terjamin
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#52525B]"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-4 h-6 border border-[#52525B] rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-1.5 bg-amber-500/60 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Waveform Divider */}
      <div className="waveform-divider"></div>

      {/* ============================================
          WHY CHOOSE US — Technical & Confident
          ============================================ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div>
              <span className="spec-label mb-4 block">Mengapa Kami</span>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-6">
                BUKAN SEKEDAR
                <br />
                <span className="text-amber-500">NYEWAIN ALAT</span>
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-8">
                Kami paham — satu feedback yang nge-*blarr* bisa merusak acara.
                Makanya setiap unit kami cek satu per satu sebelum dikirim.
                Bukan cuma sound system, kami kasih tenaga ahli yang ngerti
                akustik ruangan.
              </p>

              <div className="space-y-5">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start group cursor-default"
                  >
                    <div className="w-12 h-12 shrink-0 bg-[#181818] border border-[#1F1F1F] flex items-center justify-center text-amber-500 group-hover:border-amber-500/30 transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm tracking-[0.1em] uppercase mb-1">
                        {f.title}
                      </h3>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Visual */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#181818] to-[#0A0A0A] border border-[#1F1F1F] relative overflow-hidden">
                {/* Decorative waveform */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg
                    viewBox="0 0 400 500"
                    className="w-full h-full"
                    fill="none"
                  >
                    <path
                      d="M50,250 Q100,150 150,250 T250,250 T350,250"
                      stroke="#F59E0B"
                      strokeWidth="2"
                    />
                    <path
                      d="M50,300 Q100,200 150,300 T250,300 T350,300"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    <path
                      d="M50,200 Q100,100 150,200 T250,200 T350,200"
                      stroke="#F59E0B"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* Stats */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A0A0A]/80 border border-[#1F1F1F] p-5 backdrop-blur">
                      <p className="font-display text-4xl text-amber-500">
                        50+
                      </p>
                      <p className="text-xs text-[#52525B] tracking-wider uppercase mt-1">
                        Event Sukses
                      </p>
                    </div>
                    <div className="bg-[#0A0A0A]/80 border border-[#1F1F1F] p-5 backdrop-blur">
                      <p className="font-display text-4xl text-amber-500">
                        10+
                      </p>
                      <p className="text-xs text-[#52525B] tracking-wider uppercase mt-1">
                        Tahun Pengalaman
                      </p>
                    </div>
                    <div className="bg-[#0A0A0A]/80 border border-[#1F1F1F] p-5 backdrop-blur">
                      <p className="font-display text-4xl text-amber-500">
                        100%
                      </p>
                      <p className="text-xs text-[#52525B] tracking-wider uppercase mt-1">
                        Tepat Waktu
                      </p>
                    </div>
                    <div className="bg-[#0A0A0A]/80 border border-[#1F1F1F] p-5 backdrop-blur">
                      <p className="font-display text-4xl text-amber-500">
                        24/7
                      </p>
                      <p className="text-xs text-[#52525B] tracking-wider uppercase mt-1">
                        Support Teknis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waveform Divider */}
      <div className="waveform-divider"></div>

      {/* ============================================
          PACKAGES — Like concert lineup
          ============================================ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="spec-label block mb-4">Paket Sewa</span>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-4">
              PILIH PAKET
              <br />
              <span className="text-amber-500">SESUAI KEBUTUHAN</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-xl mx-auto">
              Dari meeting kecil sampai festival besar — kami punya konfigurasi
              yang pas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative border ${
                  pkg.popular
                    ? "border-amber-500/40 bg-[#181818]"
                    : "border-[#1F1F1F] bg-[#111111]"
                } p-8 flex flex-col`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-4 py-1 tracking-[0.15em] uppercase">
                    Paling Populer
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl tracking-wider text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#52525B] tracking-wider uppercase">
                    {pkg.tagline}
                  </p>
                </div>

                <p className="text-3xl font-bold text-amber-500 mb-6">
                  Rp {pkg.price}
                  <span className="text-sm text-[#52525B] font-normal">
                    /paket
                  </span>
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <span className="text-[#A1A1AA]">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <span className="spec-label">Cocok Untuk</span>
                  <p className="text-xs text-[#A1A1AA] mt-1">{pkg.suitable}</p>
                </div>

                <Link
                  href="/checkout"
                  className={`w-full py-3.5 text-center font-bold text-sm tracking-wider uppercase transition-all ${
                    pkg.popular
                      ? "bg-amber-500 text-black hover:bg-amber-400"
                      : "bg-[#1F1F1F] text-white hover:bg-[#2A2A2A]"
                  }`}
                >
                  Pesan Paket Ini
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waveform Divider */}
      <div className="waveform-divider"></div>

      {/* ============================================
          HOW TO RENT — Simple, 3 steps
          ============================================ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="spec-label block mb-4">Cara Sewa</span>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-4">
              3 LANGKAH MUDAH
            </h2>
            <p className="text-[#A1A1AA] max-w-xl mx-auto">
              Gak pake ribet. Pilih alat, tentuin tanggal, tinggal tunggu
              teknisinya datang.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Pilih Peralatan",
                desc: "Cek ketersediaan sound system, mic, mixer, dan lighting yang sesuai dengan kebutuhan acara kamu.",
                icon: <Headphones size={24} />,
              },
              {
                step: "02",
                title: "Tentukan Jadwal",
                desc: "Pilih tanggal sewa dan durasi. Kami siap antar H-1 biar soundcheck gak buru-buru.",
                icon: <Clock size={24} />,
              },
              {
                step: "03",
                title: "Tinggal Terima Jadi",
                desc: "Teknisi kami datang, setup, soundcheck, dan standby. Acara jalan, kamu tinggal nikmatin.",
                icon: <Music size={24} />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#181818] border border-[#1F1F1F] flex items-center justify-center text-amber-500">
                  {step.icon}
                </div>
                <p className="font-display text-5xl text-amber-500/20 mb-2">
                  {step.step}
                </p>
                <h3 className="font-bold text-sm tracking-[0.1em] uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waveform Divider */}
      <div className="waveform-divider"></div>

      {/* ============================================
          TESTIMONIALS
          ============================================ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="spec-label block mb-4">Testimoni</span>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-4">
              KATA MEREKA
              <br />
              <span className="text-amber-500">YANG UDAH PAKE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[#1F1F1F] bg-[#111111] p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-[#52525B]">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waveform Divider */}
      <div className="waveform-divider"></div>

      {/* ============================================
          CTA — Final push
          ============================================ */}
      <section className="py-28 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-amber-500/20 bg-[#111111] p-12 md:p-16"
          >
            <Mic2 size={40} className="text-amber-500 mx-auto mb-6" />
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-6">
              SIAP DUKUNG
              <br />
              <span className="text-amber-500">ACARA KAMU?</span>
            </h2>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
              Konsultasi gratis. Tim kami siap bantu pilih konfigurasi sound
              system yang pas buat acara kamu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/6281281916880"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:bg-amber-400 transition-all amber-glow-hover"
              >
                <Zap size={18} /> Hubungi — Heru Purwanto
              </a>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#1F1F1F] text-white font-bold text-sm tracking-wider uppercase hover:border-amber-500/40 transition-all"
              >
                Lihat Katalog <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
