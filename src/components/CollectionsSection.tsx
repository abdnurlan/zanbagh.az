"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "İmza Buketləri",
    subtitle: "Sevgi ilə əl ilə hazırlanmış",
    description: "Hər hiss üçün fərdi bəzəklər. Hər buket bir sənət əsəridir.",
    price: "₼ 45-dən",
    tag: "Ən Populyar",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2C8 2 5 5 5 8c0 4 7 14 7 14s7-10 7-14c0-3-3-6-7-6z"/>
        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.4"/>
        <path d="M8 6c0-1 1-2 2-2M14 6c0-1 1-2 2-2" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#c97a8a] to-[#e8a4b0]",
    bg: "rgba(232,164,176,0.06)",
    border: "rgba(232,164,176,0.2)",
    petalCount: 8,
    petalColor: "#e8a4b0",
  },
  {
    id: 2,
    title: "Toəy Kolleksiyası",
    subtitle: "Mərasimini unudulmaz et",
    description: "Gəlin buketləri, masa bəzəkləri və salon tərtibatı. Unudulmaz toy anları.",
    price: "₼ 180-dən",
    tag: "Premium",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 21.7C5.4 15.5 2 11.3 2 8a6 6 0 0 1 10-4.5A6 6 0 0 1 22 8c0 3.3-3.4 7.5-10 13.7z"/>
        <path d="M12 8v4M10 10h4" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#e8d5b7] to-[#f5ead6]",
    bg: "rgba(232,213,183,0.06)",
    border: "rgba(232,213,183,0.2)",
    petalCount: 6,
    petalColor: "#e8d5b7",
  },
  {
    id: 3,
    title: "Lüks Hədiyyə Qutuları",
    subtitle: "Zərifləyin özü",
    description: "Premium çiçək qutuları, şokolad və ətirlərlə birgə. Misilsiz bir hədiyyə.",
    price: "₼ 95-dən",
    tag: "Çox Satılan",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="8" width="18" height="13" rx="2"/>
        <path d="M21 8H3M12 8V21M8 8c0-2.5 4-5 4-5s4 2.5 4 5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#c9a96e] to-[#e0c48a]",
    bg: "rgba(201,169,110,0.06)",
    border: "rgba(201,169,110,0.2)",
    petalCount: 5,
    petalColor: "#c9a96e",
  },
  {
    id: 4,
    title: "Mövsümi Xüsusilər",
    subtitle: "Novruz · Səvgililər Günü · Analar Günü",
    description: "Azərbaycanın ən qədim anlarını məxlək mövsümi kolleksiyalarla qeyd edin.",
    price: "₼ 60-dan",
    tag: "Məhdud Say",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round"/>
        <path d="M12 6c0-2 1.5-4 3-4s2 1.5 1 3" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#f2c4ce] to-[#c97a8a]",
    bg: "rgba(242,196,206,0.06)",
    border: "rgba(242,196,206,0.2)",
    petalCount: 7,
    petalColor: "#f2c4ce",
  },
];

function BloomPetals({
  petalCount,
  petalColor,
  isHovered,
}: {
  petalCount: number;
  petalColor: string;
  isHovered: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360;
        const delay = i * 0.06;
        return (
          <motion.div
            key={i}
            className="absolute w-8 h-12 rounded-full opacity-0"
            style={{
              background: petalColor,
              top: "50%",
              left: "50%",
              transformOrigin: "center bottom",
              rotate: angle,
            }}
            animate={
              isHovered
                ? {
                    opacity: [0, 0.15, 0],
                    scale: [0.3, 1.4, 0.8],
                    x: Math.cos((angle * Math.PI) / 180) * 80 - 16,
                    y: Math.sin((angle * Math.PI) / 180) * 80 - 24,
                  }
                : {
                    opacity: 0,
                    scale: 0.3,
                    x: 0,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.8,
              delay: isHovered ? delay : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        );
      })}
    </div>
  );
}

function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="hover"
    >
      <motion.div
        className="relative rounded-2xl p-8 overflow-hidden h-full"
        style={{
          background: collection.bg,
          border: `1px solid ${collection.border}`,
          backdropFilter: "blur(20px)",
        }}
        animate={{
          borderColor: isHovered ? collection.petalColor : collection.border,
          boxShadow: isHovered
            ? `0 24px 80px rgba(0,0,0,0.5), 0 0 40px ${collection.petalColor}22`
            : "0 8px 40px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -8 }}
      >
        <BloomPetals
          petalCount={collection.petalCount}
          petalColor={collection.petalColor}
          isHovered={isHovered}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${collection.petalColor}, transparent)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ color: collection.petalColor, background: `${collection.petalColor}15` }}
              animate={{
                rotate: isHovered ? [0, -8, 8, 0] : 0,
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {collection.icon}
            </motion.div>
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                background: `${collection.petalColor}20`,
                color: collection.petalColor,
                border: `1px solid ${collection.petalColor}40`,
              }}
            >
              {collection.tag}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2a1a1f] mb-1">
            {collection.title}
          </h3>
          <p
            className="text-xs font-medium tracking-[0.15em] uppercase mb-4"
            style={{ color: collection.petalColor }}
          >
            {collection.subtitle}
          </p>
          <p className="text-sm text-[#6b3a4a]/70 leading-relaxed mb-8">
            {collection.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-semibold text-[#c94060]">
              {collection.price}
            </span>
            <motion.button
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase group/btn"
              style={{ color: collection.petalColor }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Kəşf Et
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: isHovered
              ? `radial-gradient(ellipse at center, ${collection.petalColor}08 0%, transparent 70%)`
              : "none",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--rose-dark))",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            Kolleksiyalarımız
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
            <span className="text-gradient-champagne">Hər Hiss Üçün</span>
            <br />
            <span className="text-gradient-rose italic">Xüsusi Yaradılmış</span>
          </h2>
          <p className="text-[#6b3a4a]/60 text-base max-w-lg mx-auto leading-relaxed">
            Kiçik anlardan böyük mərasimlərə qədər, sənətkarlıqla hazırlanmış
            çiçək kolleksiyalarımızı kəşf edin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
