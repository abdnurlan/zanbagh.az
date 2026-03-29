"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--dark-1)]" />,
});

const words = ["Hər", "An", "Bir", "Çiçəyi", "Haqq Edir"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToCollections = () => {
    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
      style={{ background: "var(--dark-1)" }}
    >
      <div className="noise-overlay absolute inset-0 z-[1]" />

      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,164,176,0.12) 0%, rgba(201,169,110,0.06) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(245,234,214,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,122,138,0.06) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {mounted && (
        <motion.div
          className="absolute inset-0 z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <HeroScene />
        </motion.div>
      )}

      <motion.div
        style={{ y, opacity }}
        className="relative z-[10] flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs font-medium uppercase tracking-[0.4em] text-[var(--gold)] mb-8"
        >
          Lüks Çiçək Butiqi · Bakı
        </motion.p>

        <div className="overflow-hidden mb-4 pb-[0.2em]">
          <h1 className="font-serif text-[clamp(3rem,9vw,8rem)] font-bold leading-[1.05] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em]"
                initial={{ y: "110%", opacity: 0, rotateX: -20 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  background:
                    i === 4
                      ? "linear-gradient(135deg, var(--rose-light) 0%, var(--gold) 100%)"
                      : "linear-gradient(180deg, var(--ivory) 0%, rgba(245,237,232,0.7) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  fontStyle: i === 3 ? "italic" : "normal",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-[var(--champagne)] text-base md:text-lg font-light leading-relaxed max-w-lg mb-12 opacity-70"
        >
          Həyatın ən gözəl anları üçün əl ilə hazırlanmış buketlər.
          Kiçik hisslərdən böyük bayramlara qədər.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={handleScrollToProducts}
            className="relative group px-10 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--rose-dark) 0%, var(--gold) 100%)",
              color: "var(--ivory)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">İndi Sifariş Et</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, var(--gold) 0%, var(--rose-dark) 100%)",
              }}
            />
          </motion.button>

          <motion.button
            onClick={handleScrollToCollections}
            className="px-10 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase glass border-[var(--glass-border)] text-[var(--champagne-light)] hover:text-white hover:border-[var(--rose-light)] transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Kolleksiyaya Bax
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">Aşağı</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[var(--rose-light)] to-transparent"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
        style={{
          background: "linear-gradient(to top, var(--dark-1) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
