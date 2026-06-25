import { Volume2, MapPin, Phone, Mail, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#111111] border border-[#1F1F1F] text-amber-500">
                <Volume2 size={24} />
              </div>
              <span className="font-display text-xl tracking-wider text-white">
                BINTANG<span className="text-amber-500">AUDIO</span>
              </span>
            </div>
            <p className="text-xs text-[#52525B] leading-relaxed max-w-xs">
              Rental sound system premium untuk wedding, konser, dan corporate
              event. Suara yang menggetarkan, peralatan yang tepat waktu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-white mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Beranda", href: "/" },
                { name: "Peralatan", href: "/equipment" },
                { name: "Booking", href: "/checkout" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#52525B] hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-white mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/6281281916880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#52525B] hover:text-amber-500 transition-colors"
                >
                  +62 812-8191-6880
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs text-[#52525B]">
                  Tangerang, Banten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs text-[#52525B]">
                  Senin - Sabtu: 08:00 - 20:00
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-white mb-4">
              Sewa Sekarang
            </h3>
            <p className="text-xs text-[#52525B] mb-4 leading-relaxed">
              Konsultasi gratis. Tim kami siap bantu pilih konfigurasi sound
              system yang pas.
            </p>
            <a
              href="https://wa.me/6281281916880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 text-black font-bold text-xs tracking-wider uppercase hover:bg-amber-400 transition-all"
            >
              <Zap size={16} /> Hubungi Kami
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1F1F1F] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#52525B]">
            &copy; {new Date().getFullYear()} Bintang Audio. All rights
            reserved.
          </p>
          <p className="text-xs text-[#52525B]">
            Didesain dengan <span className="text-amber-500">&hearts;</span>{" "}
            untuk suara terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
}
