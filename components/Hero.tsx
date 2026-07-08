"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Visual Asset with Subtle Darkness Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAF9F6] z-10" />
        <img 
          src="/images/hero-background.png" 
          alt="The Terotale Ambiance" 
          className="w-full h-full object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 text-center max-w-4xl px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] mb-4 block font-medium">
          Pure Vegetarian Fine Dining
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide leading-tight mb-6">
          Where Culinary Art <br /> Meets Luminous Nature
        </h1>
        <p className="text-stone-300 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8 font-serif">
          Experience an elevated multi-cuisine journey surrounded by lush living greens and an architectural rooftop skyline view.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#reserve" 
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-white uppercase tracking-widest text-xs font-semibold hover:bg-[#B3966E] transition-all duration-300 ease-in-out text-center"
          >
            Reserve A Table
          </a>
          <a 
            href="#menu" 
            className="w-full sm:w-auto px-8 py-4 border border-white/40 text-white uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 ease-in-out text-center"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
}
