"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import { ambienceGallery } from "@/lib/content";

export default function AmbienceGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? ambienceGallery.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === ambienceGallery.length - 1 ? 0 : prev + 1
    );
  }, []);

  const lightboxImages = ambienceGallery.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <section id="gallery" className="bg-[#FAF9F6] py-24 md:py-32 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] mb-2 block font-medium">The Sanctuary</span>
            <SectionHeading
              title="The Space"
              subtitle="Two floors of garden dining — open-air seating below, a covered terrace above, and nature woven through every corner"
            />
          </div>
        </ScrollReveal>

        {/* Gallery grid — alternating sizes for editorial feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ambienceGallery.map((image, i) => (
            <ScrollReveal
              key={image.id}
              delay={i * 0.08}
              className={`${
                i === 0 || i === 3 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <button
                onClick={() => openLightbox(i)}
                className="group relative w-full overflow-hidden rounded-lg cursor-pointer block border border-stone-200"
                aria-label={`View: ${image.caption}`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    i === 0 || i === 3 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out photo-grade"
                    sizes={
                      i === 0 || i === 3
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1C1A17]/0 group-hover:bg-[#1C1A17]/20 transition-colors duration-500 flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
                {/* Floor badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-sm text-[#FAF9F6] text-[10px] tracking-wider uppercase font-semibold">
                  {image.floor === "ground" ? "Ground Floor" : "First Floor"}
                </div>
              </button>
              {/* Editorial caption */}
              <p className="editorial-caption mt-3 text-stone-500 font-serif">
                {image.caption}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
