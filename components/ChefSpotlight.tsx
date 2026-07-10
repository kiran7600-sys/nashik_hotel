"use client";

import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ChefSpotlight() {
  return (
    <section id="chef-spotlight" className="bg-[#1C1A17] py-24 md:py-32 overflow-hidden border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Column 1: Image Left */}
          <ScrollReveal>
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden shadow-2xl border border-white/5 bg-stone-900">
              <img
                src="/images/chef-portrait.jpg"
                alt="Chef Yash"
                className="w-full h-full object-cover photo-grade"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                Executive Chef
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Content Right */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col">
              <p className="text-[#C5A880] text-xs tracking-[0.3em] uppercase font-body mb-3 font-semibold">
                Meet Our Chef
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                Chef Yash
              </h2>
              <div className="w-[60px] h-[2px] bg-[#C5A880] mb-8 mt-4" />
              
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-stone-200 italic font-light leading-relaxed mb-8">
                &ldquo;Pure vegetarian cuisine is not about limitation — it is an invitation to explore the true vibrancy of the earth. We let the natural essence of each root, shoot, and harvest lead the dish, respecting the seasons and the land that grew them.&rdquo;
              </blockquote>
              
              <div className="border-t border-stone-800 pt-6">
                <p className="text-[#C5A880] text-xs uppercase tracking-wider font-semibold font-body">
                  Specialty & Experience
                </p>
                <p className="text-stone-400 text-sm md:text-base font-light mt-2 font-sans">
                  15+ years crafting fine dining experiences, pioneering progressive plant-forward Indian cuisine with garden-fresh ingredients.
                </p>
              </div>
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
