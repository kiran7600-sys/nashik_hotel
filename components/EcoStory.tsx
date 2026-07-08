"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ecoStory } from "@/lib/content";

export default function EcoStory() {
  return (
    <section id="eco-story" className="bg-[#1C1A17] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-[#C5A880] text-xs tracking-[0.3em] uppercase font-body mb-3 text-center md:text-left font-medium">
            {ecoStory.sectionTitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Editorial photo */}
          <ScrollReveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={ecoStory.image}
                alt={ecoStory.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Editorial caption */}
            <p className="editorial-caption mt-4 text-stone-400 font-serif">
              {ecoStory.caption}
            </p>
          </ScrollReveal>

          {/* Text block */}
          <ScrollReveal delay={0.2} className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 leading-tight">
              {ecoStory.heading}
            </h2>
            <div className="w-[60px] h-[2px] bg-[#C5A880] mb-8 mt-4" />
            <div className="space-y-5">
              {ecoStory.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-stone-300 font-light text-base md:text-lg leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
