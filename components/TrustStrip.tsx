"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { trustData } from "@/lib/content";

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-block"
    >
      {value}{suffix}
    </motion.span>
  );
}

function StarRating({ score }: { score: string }) {
  const fullStars = Math.floor(parseFloat(score));
  const hasHalf = parseFloat(score) % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={
            i < fullStars
              ? "text-[#C5A880] fill-[#C5A880]"
              : i === fullStars && hasHalf
              ? "text-[#C5A880] fill-[#C5A880]/50"
              : "text-stone-300 fill-stone-200"
          }
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ratings */}
        <ScrollReveal>
          <div className="text-center mb-4">
            <p className="text-[#C5A880] text-xs tracking-[0.3em] uppercase font-body mb-3 font-medium">
              What Our Guests Say
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 mb-4">
              Loved by Thousands
            </h2>
            <div className="w-[60px] h-[2px] bg-[#C5A880] mx-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 mt-12 mb-16">
            {trustData.ratings.map((rating) => (
              <div
                key={rating.platform}
                className="text-center"
              >
                <div className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-2">
                  <AnimatedNumber value={rating.score} />
                  <span className="text-2xl text-stone-400">/{rating.outOf}</span>
                </div>
                <div className="flex justify-center mb-2">
                  <StarRating score={rating.score} />
                </div>
                <p className="text-stone-500 text-sm font-body">
                  {rating.reviewCount} reviews
                </p>
                <p className="text-[#C5A880] text-[10px] tracking-[0.2em] uppercase font-body font-semibold mt-1">
                  {rating.platform}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Guest quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustData.quotes.map((quote, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.1}>
              <div className="glass-card rounded-xl p-6 md:p-8 h-full flex flex-col border border-stone-200/60 bg-white/85 shadow-sm">
                {/* Quote mark */}
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  className="text-[#C5A880]/30 mb-4 shrink-0"
                  fill="currentColor"
                >
                  <path d="M0 24V14.4C0 6.08 4.48.64 13.44 0l1.28 3.2C9.6 4.16 6.72 7.68 6.4 12H12v12H0zm18.56 0V14.4c0-8.32 4.48-13.76 13.44-14.4l1.28 3.2c-5.12.96-7.36 4.48-8 8.8H32v12H18.56z" />
                </svg>
                <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed italic flex-1">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="text-stone-900 font-medium text-sm font-sans">{quote.author}</p>
                  <p className="text-stone-500 text-xs font-sans">{quote.source}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
