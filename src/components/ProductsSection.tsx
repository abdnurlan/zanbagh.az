"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const productIcons = [
  <svg key="1" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e8a4b0" strokeWidth="1">
    <path d="M12 2C8 2 5 5 5 8c0 4 7 14 7 14s7-10 7-14c0-3-3-6-7-6z"/>
    <circle cx="12" cy="8" r="2.5" fill="#e8a4b0" opacity="0.3"/>
    <path d="M8 7c0-1.5 1-3 2-3M14 7c0-1.5 1-3 2-3" strokeLinecap="round" stroke="#c97a8a"/>
  </svg>,
  <svg key="2" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e0c48a" strokeWidth="1">
    <rect x="3" y="8" width="18" height="13" rx="2"/>
    <path d="M21 8H3M12 8V21M8 8c0-2.5 4-5 4-5s4 2.5 4 5" strokeLinecap="round"/>
    <circle cx="12" cy="5" r="1.5" fill="#e0c48a" opacity="0.5"/>
  </svg>,
  <svg key="3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e8d5b7" strokeWidth="1">
    <path d="M12 21.7C5.4 15.5 2 11.3 2 8a6 6 0 0 1 10-4.5A6 6 0 0 1 22 8c0 3.3-3.4 7.5-10 13.7z"/>
    <path d="M9 8a3 3 0 0 1 6 0" stroke="#f5ead6" strokeLinecap="round"/>
  </svg>,
  <svg key="4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f2c4ce" strokeWidth="1">
    <path d="M12 3c1.5-1.5 4-1.5 4 1s-1.5 3-4 5c-2.5-2-4-3.5-4-5s2.5-2.5 4-1z"/>
    <path d="M12 9v12M8 21h8" strokeLinecap="round"/>
    <circle cx="12" cy="6" r="1" fill="#f2c4ce"/>
  </svg>,
  <svg key="5" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c97a8a" strokeWidth="1">
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 4c0 0 3 3 3 8s-3 8-3 8M12 4c0 0-3 3-3 8s3 8 3 8" strokeLinecap="round"/>
    <path d="M4 12h16" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="#c97a8a" opacity="0.4"/>
  </svg>,
  <svg key="6" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round"/>
  </svg>,
];

const products = [
  {
    id: 1,
    name: "Rouge Eternal",
    category: "İmza Buketi",
    price: "₼ 85",
    originalPrice: null,
    description: "50 premium qırmızı gül imza kaskad stilimizdə düzülüb",
    badge: "Çox Satan",
    badgeColor: "#e8a4b0",
    accentColor: "#c97a8a",
    iconIndex: 0,
    stems: 50,
  },
  {
    id: 2,
    name: "Champagne Dreams",
    category: "Lüks Qutu",
    price: "₼ 145",
    originalPrice: null,
    description: "Məxməri quçuquşu qutusunda qövşək və bağ gülləri",
    badge: "Yeni",
    badgeColor: "#c9a96e",
    accentColor: "#e0c48a",
    iconIndex: 1,
    stems: 35,
  },
  {
    id: 3,
    name: "Blanc de Blanc",
    category: "Toy Buketi",
    price: "₼ 220",
    originalPrice: null,
    description: "Fil sümüyü güllər, ağ orkidelər və evkalipt ilə tam ağ gəlin buketi",
    badge: "Toy",
    badgeColor: "#f5ead6",
    accentColor: "#e8d5b7",
    iconIndex: 2,
    stems: 70,
  },
  {
    id: 4,
    name: "Novruz Ruhu",
    category: "Mövsümi",
    price: "₼ 75",
    originalPrice: "₼ 95",
    description: "Azərbaycan Yeni İlini qədərləyən lalə, sünbül və narsis",
    badge: "Məhdud",
    badgeColor: "#f2c4ce",
    accentColor: "#e8a4b0",
    iconIndex: 3,
    stems: 40,
  },
  {
    id: 5,
    name: "Velvet Noir",
    category: "İmza Buketi",
    price: "₼ 110",
    originalPrice: null,
    description: "Qara kalla zanbaqları ilə tünd burgundy güllər. Dramatik zəriflik.",
    badge: "Eksklüziv",
    badgeColor: "#c97a8a",
    accentColor: "#c97a8a",
    iconIndex: 4,
    stems: 45,
  },
  {
    id: 6,
    name: "Qızıl Saat",
    category: "Lüks Qutu",
    price: "₼ 180",
    originalPrice: null,
    description: "Kəhrəba günəbaxanlar, qızıl protea və premium idxal güllər",
    badge: "Premium",
    badgeColor: "#c9a96e",
    accentColor: "#c9a96e",
    iconIndex: 5,
    stems: 55,
  },
];

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      ref={cardRef}
      className="scroll-snap-item w-[300px] md:w-[340px] flex-shrink-0"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "var(--dark-3)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          boxShadow: isHovered
            ? `0 32px 80px rgba(0,0,0,0.7), 0 0 40px ${product.accentColor}20`
            : "0 8px 40px rgba(0,0,0,0.4)",
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-cursor="hover"
      >
        <div
          className="relative h-72 overflow-hidden flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at center, ${product.accentColor}15 0%, var(--dark-2) 100%)`,
          }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="select-none opacity-80"
          >
            {productIcons[product.iconIndex]}
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{
              background: isHovered
                ? `radial-gradient(ellipse at center, ${product.accentColor}08 0%, transparent 70%)`
                : "none",
            }}
          />

          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                background: `${product.badgeColor}20`,
                color: product.badgeColor,
                border: `1px solid ${product.badgeColor}40`,
              }}
            >
              {product.badge}
            </span>
          </div>

          <motion.div
            className="absolute top-4 right-4"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rose-light)" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-20"
            style={{
              background: "linear-gradient(to top, var(--dark-3), transparent)",
            }}
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-[var(--ivory)] group-hover:text-[var(--rose-light)] transition-colors duration-300">
                {product.name}
              </h3>
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-medium"
                style={{ color: product.accentColor }}
              >
                {product.category}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif text-xl font-bold text-[var(--champagne-light)]">
                {product.price}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-white/30 line-through">
                  {product.originalPrice}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-white/40 mb-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: product.accentColor }}
              />
              <span className="text-[10px] text-white/30 tracking-wider">{product.stems} gövdə</span>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300"
              style={{
                background: added
                  ? "linear-gradient(135deg, #4ade80, #22c55e)"
                  : `linear-gradient(135deg, ${product.accentColor}, ${product.badgeColor})`,
                color: "var(--ivory)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {added ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Sifariş
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--dark-1)" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
              Seçilmişlər
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
              <span className="text-gradient-champagne">Ən Çox</span>
              <br />
              <span className="text-gradient-rose italic">Sevilənlər</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-[var(--rose-light)] transition-colors duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              data-cursor="hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-[var(--rose-light)] transition-colors duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              data-cursor="hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollContainerRef}
        className="horizontal-scroll-container px-6 md:px-[max(24px,calc((100vw-1280px)/2+24px))] gap-6 pb-4"
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}

        <motion.div
          className="scroll-snap-item w-[300px] md:w-[340px] flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="flex flex-col items-center gap-4 group"
            whileHover={{ scale: 1.05 }}
            data-cursor="hover"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center glass"
              style={{ border: "1px solid rgba(232,164,176,0.3)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--rose-light)" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--rose-light)]">
              Hamısına Bax
            </span>
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 w-24 h-full -translate-y-1/2 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--dark-1), transparent)" }}
      />
      <div className="absolute top-1/2 right-0 w-24 h-full -translate-y-1/2 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--dark-1), transparent)" }}
      />
    </section>
  );
}
