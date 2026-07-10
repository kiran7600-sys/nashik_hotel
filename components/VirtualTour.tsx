"use client";

import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { siteInfo } from "@/lib/content";

export default function VirtualTour() {
  return (
    <section id="virtual-tour" className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#C5A880] text-xs tracking-[0.3em] uppercase font-body mb-3 block font-semibold">
              Take a Look Inside
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1A17] mb-4">
              Virtual Tour
            </h2>
            <div className="w-[60px] h-[2px] bg-[#C5A880] mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* Video Aspect Ratio Iframe Wrapper */}
        <ScrollReveal delay={0.15}>
          <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-stone-100 shadow-lg border border-[#1C1A17]/10">
            <iframe
              src="PASTE_GOOGLE_MAPS_EMBED_URL_HERE"
              title="The Terotale 360° Virtual Tour"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>

        {/* Dynamic Fallback Link */}
        <ScrollReveal delay={0.25}>
          <div className="text-center mt-6">
            <a
              href={siteInfo.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#C5A880] hover:text-[#A38A66] transition-colors font-body"
            >
              Can&apos;t see the tour? View it directly on Google
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="inline-block"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
