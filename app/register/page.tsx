/* eslint-disable */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Zap,
  UserPlus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mendaftar.");
        setIsLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-amber-500/30">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Link href="/">
          <div className="flex items-center gap-3 w-fit">
            <div className="p-2 bg-[#111111] border border-[#1F1F1F] text-amber-500">
              <Volume2 size={24} />
            </div>
            <span className="font-display text-xl tracking-wider text-white">
              BINTANG<span className="text-amber-500">AUDIO</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="border border-[#1F1F1F] bg-[#111111] p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center text-amber-500">
                <UserPlus size={28} />
              </div>
              <h1 className="font-display text-4xl text-white mb-1">DAFTAR</h1>
              <p className="text-xs text-[#52525B]">
                Buat akun untuk mulai booking
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="spec-label block mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Budi Santoso"
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="spec-label block mb-2">Email</label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="spec-label block mb-2">Password</label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 karakter"
                    className="w-full pl-10 pr-10 py-3 bg-[#0A0A0A] border border-[#1F1F1F] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-amber-500/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-amber-500 disabled:bg-[#1F1F1F] disabled:text-[#52525B] hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Memproses...
                  </>
                ) : (
                  <>
                    <Zap size={18} /> Daftar
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-[#52525B] mt-6">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-amber-500 hover:text-amber-400 transition-colors font-bold"
              >
                Masuk
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
