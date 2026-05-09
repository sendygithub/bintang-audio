/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Music2, 
  Speaker,
  Disc3
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-emerald-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500">
                <Music2 size={24} />
              </div>
              <span className="text-white font-black text-2xl tracking-tighter">
                BINTANG<span className="text-emerald-500">AUDIO</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Solusi penyewaan sound system premium untuk event, konser, dan pesta. Kualitas audio jernih dengan teknisi berpengalaman.
            </p>
           
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Speaker size={16} className="text-emerald-500" /> Layanan
            </h4>
            <ul className="space-y-4">
              {["Paket Pernikahan", "Sound Konser", "Acara Perusahaan", "Sewa Studio"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Disc3 size={16} className="text-emerald-500" /> Eksplorasi
            </h4>
            <ul className="space-y-4">
              {["Tentang Kami", "Peralatan Kami", "Paket Harga", "Testimoni"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500 text-sm">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>Area Curug,Tangerang, Banten, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>0812-8191-6880</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>hello@bintang-audio.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs text-center md:text-left">
            © {currentYear} Bintang Audio Rental. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs">Kebijakan Privasi</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
