"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonialIcons = [
  <svg key="1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8a4b0" strokeWidth="1.2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>,
  <svg key="2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8d5b7" strokeWidth="1.2">
    <path d="M12 2C8 2 5 5 5 8c0 4 7 14 7 14s7-10 7-14c0-3-3-6-7-6z"/>
    <circle cx="12" cy="8" r="2" fill="#e8d5b7" opacity="0.4"/>
  </svg>,
  <svg key="3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>,
  <svg key="4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8a4b0" strokeWidth="1.2">
    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>,
  <svg key="5" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8d5b7" strokeWidth="1.2">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>,
];

const testimonials = [
  {
    id: 1,
    name: "Leyla Həsənova",
    role: "Gəlin",
    text: "Zanbagh toyumuzu nağıla çevirdi. Hər bəzək xəyalımın ötəsindəydi. Komanda vizyonumuzu mükəmməl anladı.",
    rating: 5,
    iconIndex: 0,
    color: "var(--rose-light)",
  },
  {
    id: 2,
    name: "Anar Məmmədov",
    role: "Daimi Müştəri",
    text: "Hər ay həyat yoldaşım üçün çiçək sifariş edirəm. Keyfiyyət heç vaxt düşmür — həmişə təzə, həmişə möhtəşəm. Qablaşdırma özü lüks hədiyyə kimi görünür.",
    rating: 5,
    iconIndex: 1,
    color: "var(--champagne)",
  },
  {
    id: 3,
    name: "Nigar Əliyeva",
    role: "Tədbir Planlaşdırıcısı",
    text: "Tədbir planlaşdırıcısı kimi çox çiçəkçi ilə işləmişəm. Zanbagh tamamilə fərqli bir sinifdədir. Peşəkar, yaradıcı və həmişə vaxtında.",
    rating: 5,
    iconIndex: 2,
    color: "var(--gold)",
  },
  {
    id: 4,
    name: "Rəşad Babayev",
    role: "Ad Günü Sürprizi",
    text: "Anamın ad günü üçün sürpriz çatdırma sifariş etdim. Sevincdən ağladı. Hər qəpiyə dəydi — təcrübə sehrli idi.",
    rating: 5,
    iconIndex: 3,
    color: "var(--rose-light)",
  },
  {
    id: 5,
    name: "Gülnar İsmayılova",
    role: "Korporativ Müştəri",
    text: "Bütün ofis tədbirlərimiz və müştəri hədiyyələri üçün Zanbagh-dan istifadə edirik. Bu ilin Novruz bəzəkləri tərəfdaşlarımızdan çoxlu təriflər aldı.",
    rating: 5,
    iconIndex: 4,
    color: "var(--champagne)",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#c9a96e">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#faeef2" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,164,176,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="text-xs text-[#6b3a4a]/50 tracking-[0.4em] uppercase mb-4">
            Rəylər
          </p>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-tight">
            <span className="text-gradient-champagne">Bakı</span>{" "}
            <span className="text-gradient-rose italic">Sevir</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative p-10 md:p-14 rounded-3xl glass-strong text-center"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{
                  background: `linear-gradient(90deg, transparent, ${testimonials[activeIndex].color}, transparent)`,
                }}
              />

              <div className="mb-6 flex justify-center opacity-70">{testimonialIcons[testimonials[activeIndex].iconIndex]}</div>

              <StarRating count={testimonials[activeIndex].rating} />

              <blockquote className="font-serif text-xl md:text-2xl font-light text-[#2a1a1f] leading-relaxed mt-6 mb-8 italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </blockquote>

              <div>
                <div className="font-semibold text-[#2a1a1f] tracking-wide">
                  {testimonials[activeIndex].name}
                </div>
                <div
                  className="text-xs tracking-[0.2em] uppercase mt-1"
                  style={{ color: testimonials[activeIndex].color }}
                >
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-400"
                data-cursor="hover"
              >
                <motion.div
                  animate={{
                    width: i === activeIndex ? 32 : 8,
                    background:
                      i === activeIndex
                        ? "var(--rose-light)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { value: "4.9/5", label: "Google Reytinqi" },
            { value: "500+", label: "Xoşbəxt Rəy" },
            { value: "85%", label: "Təkrar Müştəri" },
            { value: "5,000+", label: "Çatdırılan Sifariş" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1 text-center"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mb-1" />
              <div className="font-serif text-2xl font-bold text-gradient-rose">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
