"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

// Real copied dish photos
const DISHES = [
  { src: "/images/dishes/unnamed.webp", alt: "Tandoori Khazana", label: "Tandoori Special" },
  { src: "/images/dishes/unnamed (1).webp", alt: "Special Curry", label: "Chef's Gravy" },
  { src: "/images/dishes/unnamed (2).webp", alt: "Baked Dessert", label: "Signature Sweet" },
  { src: "/images/dishes/unnamed (3).webp", alt: "Exotic Mocktail", label: "Lovely Mojito" }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Scroll parallax (fade and drift upwards)
  const { scrollY } = useScroll();
  const cardOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const cardYShift = useTransform(scrollY, [0, 450], [0, -80]);

  // Track mouse coordinates on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map to [-0.5, 0.5]
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  // Reset coordinates on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Depth transforms for each card:
  // Card 0: Large Hero Dish (Bottom Right)
  const x0 = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const y0 = useTransform([springY, cardYShift], ([latestY, latestShift]) => {
    return (latestY as number) * 24 + (latestShift as number);
  });

  // Card 1: Supporting Dish (Top Left)
  const x1 = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const y1 = useTransform([springY, cardYShift], ([latestY, latestShift]) => {
    return (latestY as number) * 48 + (latestShift as number) * 1.2;
  });

  // Card 2: Supporting Dish (Bottom Left)
  const x2 = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const y2 = useTransform([springY, cardYShift], ([latestY, latestShift]) => {
    return (latestY as number) * -40 + (latestShift as number) * 0.9;
  });

  // Card 3: Supporting Drink (Top Right)
  const x3 = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const y3 = useTransform([springY, cardYShift], ([latestY, latestShift]) => {
    return (latestY as number) * -60 + (latestShift as number) * 1.4;
  });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1C1A17] select-none"
    >
      {/* Background Visual Asset with Dark Ambiance Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-[#1C1A17] z-10" />
        <img 
          src="/images/hero-background.png" 
          alt="The Terotale Ambiance" 
          className="w-full h-full object-cover scale-105 animate-kenburns opacity-55"
        />
      </div>

      {/* ── Layered Dish Collage (Desktop Only) ─────────────────────────── */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        
        {/* Card 0 — Large Hero Dish (Bottom Right) */}
        <motion.div
          style={{ x: x0, y: y0, opacity: cardOpacity }}
          className="absolute bottom-[10%] right-[10%] w-60 h-72 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 rotate-[4deg] bg-[#1C1A17]"
        >
          <img 
            src={DISHES[0].src} 
            alt={DISHES[0].alt} 
            className="w-full h-full object-cover photo-grade"
          />
          <div className="absolute bottom-3 left-3 bg-[#1C1A17]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
            {DISHES[0].label}
          </div>
        </motion.div>

        {/* Card 1 — Supporting Curry/Gravy (Top Left) */}
        <motion.div
          style={{ x: x1, y: y1, opacity: cardOpacity }}
          className="absolute top-[16%] left-[8%] w-44 h-56 rounded-sm overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/5 rotate-[-4deg] bg-[#1C1A17]"
        >
          <img 
            src={DISHES[1].src} 
            alt={DISHES[1].alt} 
            className="w-full h-full object-cover photo-grade"
          />
          <div className="absolute bottom-3 left-3 bg-[#1C1A17]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
            {DISHES[1].label}
          </div>
        </motion.div>

        {/* Card 2 — Supporting Dessert (Bottom Left) */}
        <motion.div
          style={{ x: x2, y: y2, opacity: cardOpacity }}
          className="absolute bottom-[14%] left-[12%] w-48 h-60 rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.45)] border border-white/5 rotate-[5deg] bg-[#1C1A17]"
        >
          <img 
            src={DISHES[2].src} 
            alt={DISHES[2].alt} 
            className="w-full h-full object-cover photo-grade"
          />
          <div className="absolute bottom-3 left-3 bg-[#1C1A17]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
            {DISHES[2].label}
          </div>
        </motion.div>

        {/* Card 3 — Supporting Drink/Mocktail (Top Right) */}
        <motion.div
          style={{ x: x3, y: y3, opacity: cardOpacity }}
          className="absolute top-[14%] right-[14%] w-40 h-52 rounded-sm overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/5 rotate-[-5deg] bg-[#1C1A17]"
        >
          <img 
            src={DISHES[3].src} 
            alt={DISHES[3].alt} 
            className="w-full h-full object-cover photo-grade"
          />
          <div className="absolute bottom-3 left-3 bg-[#1C1A17]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
            {DISHES[3].label}
          </div>
        </motion.div>
        
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center mt-20">
        {/* Eyebrow - fades in and down */}
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.4em] text-[#C5A880] mb-6 block font-medium"
        >
          Pure Vegetarian Fine Dining
        </motion.span>

        {/* Heading - delayed by 0.2s */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight mb-8"
        >
          Where Culinary Art <br /> Meets Nature
        </motion.h1>
        
        {/* Tagline/description - delayed by 0.4s */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-stone-300 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8 font-serif"
        >
          Experience an elevated multi-cuisine journey surrounded by lush living greens and an architectural rooftop skyline view.
        </motion.p>
        
        {/* CTAs - delayed by 0.6s */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 mt-4"
        >
          <a 
            href="#reserve" 
            className="px-10 py-4 bg-[#C5A880] text-white uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#A38A66] transition-all duration-300 shadow-md text-center"
          >
            Reserve A Table
          </a>
          <a 
            href="#menu" 
            className="px-10 py-4 border border-white/30 text-white uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 text-center"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
