"use client";

import { motion } from "framer-motion";

const footerLinks = {
  "Kolleksiya": ["İmza Buketləri", "Toy Kolleksiyası", "Lüks Hədiyyə Qutuları", "Mövsümi Xüsusilər"],
  "Haqqımızda": ["Bizim Haqqımızda", "Prosesimiz", "Davamlılıq", "Karyera"],
  "Dəstək": ["Sifariş İzləmə", "Çatdırma Məlumatı", "Qılınma Təlimatları", "Bizimlə Əlaqə"],
};

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/zanbagh.az",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/994XXXXXXXXX",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@zanbagh.az",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-24 pb-10 px-6 overflow-hidden"
      style={{ background: "#f5e0e7" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #c94060, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              className="font-serif text-3xl font-bold text-[#6b3a4a] mb-4 tracking-widest uppercase"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Zanbagh
            </motion.div>
            <p className="text-[#6b3a4a] text-sm leading-relaxed mb-6 max-w-xs">
              Bakının mərkəzində 2019-dan bəri unudulmaz
              çiçək təcrübələri yaradır.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#6b3a4a] hover:text-[#c94060] transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                  data-cursor="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#6b3a4a] mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-xs font-medium tracking-[0.2em] uppercase text-[#6b3a4a] hover:text-[#c94060] transition-colors duration-300 flex items-center gap-2 group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.preventDefault()}
                      data-cursor="hover"
                    >
                      <span className="w-0 h-px bg-[#c94060] group-hover:w-3 transition-all duration-300" />
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="py-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(201,64,96,0.15)" }}
        >
          <p className="text-xs text-[#6b3a4a]/40 tracking-wider">
            © {new Date().getFullYear()} Zanbagh. Bütün hüquqlar qorunur. · Bakı, Azərbaycan
          </p>
          <div className="flex items-center gap-6">
            {["Məxfilik Siyasi", "İstifadə Şərtləri"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-xs text-[#6b3a4a]/40 hover:text-[#c94060] transition-colors duration-300"
                onClick={(e) => e.preventDefault()}
                data-cursor="hover"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
