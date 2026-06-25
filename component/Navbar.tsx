/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mic2,
  Music,
  Headphones,
  Radio,
  Speaker,
  Settings2,
  Activity,
  UserCircle,
  LogIn,
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  LogOut,
  ClipboardList,
  Volume2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Beranda", href: "/", icon: <Music size={18} /> },
    { name: "Peralatan", href: "/equipment", icon: <Speaker size={18} /> },
  ];

  // Add admin link only for admin users
  if (session?.user?.role === "ADMIN") {
    links.push({
      name: "Admin",
      href: "/admin",
      icon: <LayoutDashboard size={18} />,
    });
  }

  // Add transaksi link for logged in users
  if (session?.user) {
    links.push({
      name: "Transaksi",
      href: "/transaksi",
      icon: <ClipboardList size={18} />,
    });
  }

  return (
    <>
      <nav
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0A0A0A]/90 backdrop-blur-2xl border-b border-[#1F1F1F]"
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
                <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative p-2 bg-[#111111] border border-[#1F1F1F] text-amber-500">
                  <Volume2 size={24} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-wider text-white leading-none">
                  BINTANG
                  <span className="text-amber-500">AUDIO</span>
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-[#111111] p-1 border border-[#1F1F1F]">
            {links.map((link, i) => (
              <Link key={i} href={link.href}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#52525B] hover:text-amber-500 transition-all flex items-center gap-2"
                >
                  {link.icon}
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 bg-[#111111] hover:bg-[#1F1F1F] transition-colors border border-[#1F1F1F] text-white"
              >
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-black w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#52525B] tracking-wider uppercase">
                  {session.user?.name}
                </span>
                <motion.button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#111111] hover:bg-red-500/10 hover:text-red-500 transition-colors border border-[#1F1F1F]"
                >
                  <LogOut size={16} />
                  Keluar
                </motion.button>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#111111] hover:bg-[#1F1F1F] transition-colors border border-[#1F1F1F]"
                >
                  <UserCircle size={16} className="text-amber-500" />
                  Masuk
                </motion.button>
              </Link>
            )}

            <Link href="/equipment">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-5 py-2.5 bg-amber-500 text-black font-bold text-xs tracking-wider uppercase overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Zap size={16} /> Sewa Sekarang
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/checkout"
              className="relative p-2.5 bg-[#111111] text-amber-500 border border-[#1F1F1F]"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-black w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </div>
              )}
            </Link>
            {status === "authenticated" ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2.5 bg-[#111111] text-red-500 border border-[#1F1F1F]"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link href="/login">
                <button className="p-2.5 bg-[#111111] text-amber-500 border border-[#1F1F1F]">
                  <UserCircle size={20} />
                </button>
              </Link>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 bg-[#111111] text-amber-500 border border-[#1F1F1F]"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
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
              className="fixed inset-0 top-[72px] bg-[#0A0A0A] z-40 md:hidden px-6 pt-10"
            >
              <div className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <Link key={i} href={link.href} onClick={() => setOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 border border-[#1F1F1F] bg-[#111111] text-sm font-bold tracking-wider uppercase text-[#A1A1AA] active:bg-amber-500/10 active:text-amber-500"
                    >
                      <span className="p-2 bg-[#0A0A0A] border border-[#1F1F1F] text-amber-500">
                        {link.icon}
                      </span>
                      {link.name}
                    </motion.div>
                  </Link>
                ))}

                {status === "authenticated" && (
                  <div className="px-4 py-3 text-xs text-[#52525B] border-t border-[#1F1F1F]">
                    Masuk sebagai:{" "}
                    <span className="text-amber-500 font-medium">
                      {session.user?.name}
                    </span>
                  </div>
                )}

                <Link href="/equipment" onClick={() => setOpen(false)}>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 w-full bg-amber-500 py-5 text-black font-bold text-sm tracking-wider uppercase flex justify-center items-center gap-3"
                  >
                    <Zap size={20} /> Mulai Booking
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
