/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Mic2, Music, 
  Headphones, Radio, Speaker, 
  Settings2, Activity, UserCircle, LogIn, LayoutDashboard, BarChart3, ShoppingCart
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = () => {
    const cart = localStorage.getItem("bintang_audio_cart");

    if (cart) {
      try {
        const parsed = JSON.parse(cart);
        setCartCount(parsed.length);
      } catch {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

useEffect(() => {
  loadCartCount();

  window.addEventListener("cart-updated", loadCartCount);

  return () => {
    window.removeEventListener("cart-updated", loadCartCount);
  };
}, []);

const links = [
  { name: "Beranda", href: "/", icon: <Music size={18} /> },
  { name: "Peralatan", href: "/equipment", icon: <Speaker size={18} /> },
  { name: "Admin", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { name: "Laporan", href: "/admin/report", icon: <BarChart3 size={18} /> },
];
  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-emerald-400">
                  <Activity size={24} className="animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-tight leading-none">
                  <span className="text-emerald-500">Bintang</span>-AUDIO
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
            {links.map((link, i) => (
              <Link key={i} href={link.href}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-all flex items-center gap-2"
                >
                  {link.icon}
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 text-white"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-emerald-500 text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            <motion.button
              onClick={() => setLoginModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              <UserCircle size={18} className="text-emerald-400" />
              Masuk
            </motion.button>
            
            <Link href="/equipment">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Headphones size={18} /> SEWA SEKARANG
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/checkout" className="relative p-2.5 bg-zinc-900 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </div>
              )}
            </Link>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="p-2.5 bg-zinc-900 text-emerald-400 rounded-xl border border-emerald-500/20"
            >
              <UserCircle size={24} />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 bg-zinc-900 text-emerald-400 rounded-xl border border-emerald-500/20"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 top-[72px] bg-black z-40 md:hidden px-6 pt-10"
            >
              <div className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <Link key={i} href={link.href} onClick={() => setOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-xl font-bold text-zinc-300 active:bg-emerald-500/10 active:text-emerald-400"
                    >
                      <span className="p-2 bg-zinc-800 rounded-lg text-emerald-500">
                        {link.icon}
                      </span>
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                
                <Link href="/equipment" onClick={() => setOpen(false)}>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 w-full bg-emerald-500 py-5 rounded-2xl text-black font-black text-lg flex justify-center items-center gap-3 shadow-[0_10px_40px_rgba(16,185,129,0.2)]"
                  >
                    <Radio className="animate-bounce" /> Mulai Booking
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              
              <button 
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
                  <LogIn size={32} className="text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang</h2>
                <p className="text-zinc-400">Masuk ke akun dashboard Anda</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setLoginModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Alamat Email</label>
                  <input 
                    type="email" 
                    placeholder="admin@bintang-audio.com" 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-300">Kata Sandi</label>
                    <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400">Lupa kata sandi?</a>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  Masuk
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
