"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const deliveryZones = [
  { zone: "Zona 1", area: "Nəsimi, Səbail, Binəqədi", time: "1–2 saat", price: "Pulsuz", color: "#e8a4b0" },
  { zone: "Zona 2", area: "Yasamal, Nizam, Nərimanov", time: "2–3 saat", price: "₼ 5", color: "#c9a96e" },
  { zone: "Zona 3", area: "Xəzər, Suraxanı, Abşeron", time: "3–4 saat", price: "₼ 10", color: "#e8d5b7" },
];

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Ünvan",
    value: "Vaqif prospekti 105C, Baku",
    href: "https://maps.google.com/?q=40.4093,49.8671",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.69 3.41 2 2 0 0 1 3.67 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
      </svg>
    ),
    label: "Telefon / WhatsApp",
    value: "+994 XX XXX XX XX",
    href: "https://wa.me/994XXXXXXXXX",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="m22 3-10 9L2 3" />
      </svg>
    ),
    label: "E-poçt",
    value: "hello@zanbagh.az",
    href: "mailto:hello@zanbagh.az",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "İş Saatları",
    value: "Hər gün: 09:00 – 22:00",
    href: null,
  },
];

function MapPlaceholder() {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ background: "#f0d8e0", minHeight: 320 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)
          `,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,164,176,0.06) 0%, transparent 70%)",
        }}
      />

      {[
        { x: "30%", y: "40%", opacity: 0.3, size: 60 },
        { x: "60%", y: "30%", opacity: 0.2, size: 40 },
        { x: "70%", y: "65%", opacity: 0.15, size: 50 },
        { x: "20%", y: "65%", opacity: 0.2, size: 35 },
        { x: "50%", y: "55%", opacity: 0.1, size: 80 },
      ].map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.size,
            height: circle.size,
            background: "var(--dark-4)",
            opacity: circle.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex flex-col items-center gap-3"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--rose-dark), var(--gold))",
                boxShadow: "0 0 30px rgba(232,164,176,0.5)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.9)" />
              </svg>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                style={{ border: "2px solid #6b3a4a" }}
              />
            </div>
          </motion.div>
          <div className="glass px-4 py-2 rounded-full">
              <span className="text-xs text-[#6b3a4a]/45 font-medium tracking-wider">Vaqif pr. 105C, Bakı</span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="https://maps.google.com/?q=Vaqif+prospekti+105C+Baku"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase glass flex items-center gap-2"
        style={{ color: "#6b3a4a" }}
        whileHover={{ scale: 1.05 }}
        data-cursor="hover"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Xəritədə Aç
      </motion.a>
    </div>
  );
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#f7f7f7" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background: "linear-gradient(to top, transparent, #6b3a4a)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.4em] uppercase text-[#6b3a4a] mb-4">
            Bizi Tapın
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
            <span className="text-gradient-champagne">Studiyamıza</span>
            <br />
            <span className="text-gradient-rose italic">Xoş Gəldiniz</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[420px]"
          >
            <MapPlaceholder />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-5 rounded-xl glass hover:border-[#6b3a4a] transition-all duration-300 group-hover:-translate-y-1"
                      data-cursor="hover"
                    >
                      <span className="text-[#6b3a4a] mt-0.5 flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b3a4a]/30 mb-1">{item.label}</div>
                        <div className="text-sm text-[#6b3a4a]/70 font-medium">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-5 rounded-xl glass">
                      <span className="text-[#6b3a4a] mt-0.5 flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b3a4a]/30 mb-1">{item.label}</div>
                        <div className="text-sm text-[#6b3a4a]/70 font-medium">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-[#6b3a4a] mb-4">
                Çatdırılma Zonaları
              </h3>
              <div className="space-y-3">
                {deliveryZones.map((zone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                    className="flex items-center justify-between p-4 rounded-xl glass group hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: zone.color }}
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#6b3a4a]/70 tracking-wider">{zone.zone}</span>
                        <span className="text-xs text-[#6b3a4a]/40">{zone.area}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right flex-shrink-0">
                      <span className="text-xs text-[#6b3a4a]/40">{zone.time}</span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: zone.color }}
                      >
                        {zone.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.a
              href="https://wa.me/994XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-semibold tracking-[0.15em] uppercase"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "white",
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(37,211,102,0.3)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              data-cursor="hover"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ilə Sifariş Et
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
