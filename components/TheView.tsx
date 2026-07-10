"use client";

import React from "react";

export default function TheView() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1C1A17]">
      {/* Background panoramic image with slow Ken-burns effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-[#1C1A17] z-10" />
        <img
          src="/images/view/unnamed.webp"
          alt="The Terotale Garden Skyline View"
          className="w-full h-full object-cover scale-105 animate-kenburns photo-grade"
        />
      </div>

      {/* Minimalistic text overlay */}
      <div className="relative z-20 text-center px-6 max-w-xl">
        <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] mb-4 block font-semibold font-sans">
          The View
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide leading-tight mb-4">
          Nashik&apos;s skyline, <br className="hidden sm:inline" /> from our garden.
        </h2>
        <div className="w-[45px] h-[1px] bg-[#C5A880] mx-auto mt-6" />
      </div>
    </section>
  );
}
