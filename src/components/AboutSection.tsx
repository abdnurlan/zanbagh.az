"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "Sənətkar İşi",
    description: "Hər bəzək illərlə təcrübəli usta çiçəkçilərimiz tərəfindən əl ilə hazırlanır.",
    color: "var(--rose-light)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Premium Seçim",
    description: "Yalnız ən gözəl çiçəklər — hər gün yerli və beynəlxalq becericilərdən təmin edilir.",
    color: "var(--gold)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Eyni Günü Çatdırma",
    description: "Təzə buketlər saatlar ərzində iqlim nəzarətli qablama ilə Bakıya çatdırılır.",
    color: "var(--champagne)",
  },
];

function MarqueeTrack() {
  const items = [
    "Lüks Çiçəklər",
    "·",
    "Bakının Ən Yaxşısı",
    "·",
    "2019-dan Bəri",
    "·",
    "Premium Buketlər",
    "·",
    "Toy Bəzəkləri",
    "·",
    "Eyni Günü Çatdırma",
    "·",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-6 border-y" style={{ borderColor: "rgba(201,64,96,0.15)" }}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`text-sm font-medium tracking-[0.2em] uppercase flex-shrink-0 ${
              item === "·"
                ? "text-[#c94060]"
                : "text-[#6b3a4a]/40"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--rose) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <MarqueeTrack />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={headingRef}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--gold)] mb-6"
            >
              Haqqımızda
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight"
              >
                <span className="text-gradient-champagne">Sadəcə Çiçək Deyil.</span>
                <br />
                <span className="text-gradient-rose italic">Bir Təcrübə.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#6b3a4a]/75 text-lg leading-relaxed mb-6"
            >
              2019-cu ildə Bakının mərkəzində qurulan Zanbagh sadə bir inancdan doğdu:
              həyatdakı hər an yüksəldilməyi haqq edir. Biz sadəcə bir çiçəkçi yox —
              hisslərin kuratorlarıyıq.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-[#6b3a4a]/60 text-base leading-relaxed mb-12"
            >
              Kiçik ad günü sürprizlərindən böyük toy qurğularına qədər usta çiçəkçilərimiz
              hər bəzəyi tək nüsxəli sənət əsəri kimi yaradır. Yalnız ən gözəl çiçəklər —
              Ekvador gülündən Hollandiya qövşəyinə — hər səhər studiyomuza təzə çatdırılır.
            </motion.p>

            <motion.a
              href="https://wa.me/994XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-[0.15em] uppercase"
              style={{
                background: "linear-gradient(135deg, var(--rose-dark) 0%, var(--gold) 100%)",
                color: "var(--ivory)",
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(232,164,176,0.3)" }}
              whileTap={{ scale: 0.97 }}
              data-cursor="hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Bizimlə Əlaqə
            </motion.a>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-md mx-auto"
                style={{ background: "var(--background)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at 30% 30%, rgba(232,164,176,0.2) 0%, rgba(201,169,110,0.1) 50%, transparent 80%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-10">
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="select-none"
                  >
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#e8a4b0" strokeWidth="0.6">
                      <path d="M12 2C8 2 5 5 5 8c0 4 7 14 7 14s7-10 7-14c0-3-3-6-7-6z"/>
                      <circle cx="12" cy="8" r="3" fill="#e8a4b0" opacity="0.25"/>
                      <path d="M7 6c0-2 2-4 3-4M14 6c0-2 1-3 3-3" strokeLinecap="round" stroke="#c97a8a" strokeWidth="0.8"/>
                      <path d="M9 5c-.5-1.5 0-3 1.5-3.5M12 4.5C12 3 13 2 14.5 2" strokeLinecap="round" stroke="#f2c4ce" strokeWidth="0.6"/>
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <div className="font-serif text-5xl font-bold text-gradient-rose mb-2">
                      Zanbagh
                    </div>
                    <div className="text-xs tracking-[0.4em] uppercase text-[#6b3a4a]/40">
                      Lüks Çiçəklər · Bakı
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full mt-4">
                    {[
                      { v: "2019", l: "Qurulub" },
                      { v: "50+", l: "Növ" },
                      { v: "3 saat", l: "Çatdırma" },
                      { v: "4.9", l: "Reytinq" },
                    ].map((s, i) => (
                      <div key={i} className="glass rounded-xl p-4 text-center">
                        <div className="font-serif text-2xl font-bold text-gradient-champagne">
                          {s.v}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-[#6b3a4a]/40 mt-1">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(circle, var(--rose-light), transparent)",
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-10"
                  style={{
                    background: "radial-gradient(circle, var(--gold), transparent)",
                  }}
                />
              </div>

              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl glass flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f2c4ce" strokeWidth="0.8">
                  <circle cx="12" cy="12" r="3" fill="#f2c4ce" opacity="0.2"/>
                  <path d="M12 5c0-2 1.5-3.5 3-3.5s2 1.5 1 3c-1 1.5-4 2-4 2s-3-.5-4-2c-1-1.5 0-3 1.5-3s3 1.5 3 3.5z" fill="#e8a4b0" opacity="0.4"/>
                  <path d="M12 5v14M9 19h6" strokeLinecap="round" stroke="#e8a4b0"/>
                  <ellipse cx="12" cy="8" rx="4" ry="3" fill="#f2c4ce" opacity="0.15"/>
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl glass"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-xs text-[#6b3a4a]/70">★ 4.9 · 500+ rəy</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-8 rounded-2xl glass group"
              whileHover={{ y: -6 }}
            >
              <div
                className="text-3xl mb-5 font-bold"
                style={{ color: value.color }}
              >
                {value.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2a1a1f] mb-3">
                {value.title}
              </h3>
              <p className="text-[#6b3a4a]/60 text-sm flex items-center gap-3">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
