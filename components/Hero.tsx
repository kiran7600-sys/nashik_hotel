"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  "/images/dishes/unnamed.webp",
  "/images/dishes/unnamed (1).webp",
  "/images/dishes/unnamed (2).webp",
  "/images/dishes/unnamed (3).webp",
  "/images/dishes/unnamed (4).webp",
  "/images/dishes/unnamed (6).webp"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500); // cycle every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1C1A17] select-none">
      {/* Background Slideshow with Crossfade */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-[#1C1A17] z-10" />
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={SLIDES[currentSlide]}
            alt="The Terotale Signature Dish"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover photo-grade"
          />
        </AnimatePresence>
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
          Experience an elevated multi-cuisine journey surrounded by seasonal harvests, lush living greens, and an architectural skyline view.
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
