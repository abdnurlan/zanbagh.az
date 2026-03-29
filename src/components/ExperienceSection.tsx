"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Hiss",
    subtitle: "Sizin hissiniz, bizim ilhamımız",
    description:
      "Hər böyük buket bir hissdən başlayır. Bizimə əhvalınızı danışdırın — bir bayram, bir barışma, səvəgi ifadəsi. Biz dinləyirik, hiss edirik və çevirik.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: "var(--rose-light)",
    delay: 0,
  },
  {
    number: "02",
    title: "Yaradıcılıq",
    subtitle: "Sənətin təbiətlə buluşduğu yer",
    description:
      "Usta çiçəkçilərimiz hər gövdəni səhər təzdən seir. Hər ləçək, yarpaq və lent niyyətlə yerləşdirilir. Bakıda hazırlanmış, dayanma üçün yox.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
        <path d="M8.5 5.5C9 4 10.5 3 12 3M15.5 5.5C15 4 13.5 3 12 3" strokeLinecap="round"/>
      </svg>
    ),
    color: "var(--champagne)",
    delay: 0.15,
  },
  {
    number: "03",
    title: "Çatdırılma",
    subtitle: "Anınız, qapınıza",
    description:
      "Bakı üzərində eyni günü iqlim nəzarətli qablama ilə çatdırılır. Buketiniz studiyonı tərk etdiyi kimi mükəmməl gəlir.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M12 5l7 7-7 7"/>
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    color: "var(--gold)",
    delay: 0.3,
  },
];

function PetalAssembly({ progress }: { progress: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = Array.from({ length: 12 });
  if (!mounted) return <div className="relative w-64 h-64 md:w-80 md:h-80" />;
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute inset-0 flex items-center justify-center">
        {petals.map((_, i) => {
          const angle = (i / petals.length) * 360;
          const radius = 90 + Math.sin((i * Math.PI) / 6) * 15;
          const delay = i * 0.05;
          const petalProgress = Math.max(0, Math.min(1, progress * 1.5 - delay));
          const x = Math.cos((angle * Math.PI) / 180) * radius * petalProgress;
          const y = Math.sin((angle * Math.PI) / 180) * radius * petalProgress;
          const colors = ["#e8a4b0", "#f2c4ce", "#e8d5b7", "#c9a96e", "#c97a8a"];
          const color = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              className="absolute w-6 h-10 rounded-full"
              style={{
                background: color,
                opacity: petalProgress * 0.7,
                left: "50%",
                top: "50%",
                marginLeft: -12,
                marginTop: -20,
                transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg) scale(${petalProgress})`,
              }}
            />
          );
        })}

        <motion.div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: 60 + progress * 20,
            height: 60 + progress * 20,
            background: `radial-gradient(circle, var(--gold) 0%, var(--rose-dark) 100%)`,
            boxShadow: `0 0 ${30 * progress}px rgba(232,164,176,0.5)`,
          }}
        >
          <span className="text-2xl" style={{ opacity: progress }}>
            🌹
          </span>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(232,164,176,0.15)",
          scale: 1 + progress * 0.1,
          opacity: progress * 0.5,
        }}
      />
      <motion.div
        className="absolute inset-[-20px] rounded-full"
        style={{
          border: "1px solid rgba(201,169,110,0.08)",
          scale: 1 + progress * 0.05,
          opacity: progress * 0.3,
        }}
      />
    </div>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 1,
        delay: step.delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col md:flex-row items-start gap-8 group"
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center glass"
          style={{ border: `1px solid ${step.color}30`, color: step.color }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ duration: 0.3 }}
        >
          {step.icon}
        </motion.div>
        {index < steps.length - 1 && (
          <div
            className="w-px flex-1 mt-4 min-h-[60px]"
            style={{
              background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
            }}
          />
        )}
      </div>

      <div className="pt-3 pb-12">
        <div className="flex items-center gap-4 mb-3">
          <span
            className="text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ color: step.color }}
          >
            {step.number}
          </span>
          <div className="h-px w-8" style={{ background: `${step.color}40` }} />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ivory)] mb-2">
          {step.title}
        </h3>
        <p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: step.color }}
        >
          {step.subtitle}
        </p>
        <p className="text-white/50 text-base leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: assemblyProgress } = useScroll({
    target: assemblyRef,
    offset: ["start end", "end center"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--dark-2)" }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, var(--rose) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            Prosesiniz
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
            <span className="text-gradient-champagne">Hissdən</span>
            <br />
            <span className="text-gradient-rose italic">qapınıza qədər</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>

          <div
            ref={assemblyRef}
            className="flex items-center justify-center sticky top-1/3 relative"
          >
            <motion.div
              style={{
                opacity: assemblyProgress,
              }}
            >
              <PetalAssembly
                progress={0.85}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {[
            { value: "5,000+", label: "Çatdırılan Buket" },
            { value: "3 saat", label: "Eyni Günü Çatdırma" },
            { value: "100%", label: "Təzəlik Zəmanəti" },
            { value: "4.9★", label: "Müştəri Qiyməti" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl glass"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-serif text-3xl md:text-4xl font-bold text-gradient-rose mb-2">
                {stat.value}
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
