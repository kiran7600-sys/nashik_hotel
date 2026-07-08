"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1C1A17]">
      {/* Background Visual Asset with Subtle Darkness Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FAF9F6] z-10" />
        <img 
          src="/images/hero-background.png" 
          alt="The Terotale Ambiance" 
          className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center mt-20">
        <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] mb-6 block font-medium">
          Pure Vegetarian Fine Dining
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight mb-8">
          Where Culinary Art <br /> Meets Nature
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <a 
            href="#reserve" 
            className="px-10 py-4 bg-[#C5A880] text-white uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#A38A66] transition-all duration-300"
          >
            Reserve A Table
          </a>
          <a 
            href="#menu" 
            className="px-10 py-4 border border-white/30 text-white uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
}
