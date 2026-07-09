"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Hero from "@/components/Hero";
import EcoStory from "@/components/EcoStory";
import AmbienceGallery from "@/components/AmbienceGallery";
import TrustStrip from "@/components/TrustStrip";

const PANELS = ["Hero", "Eco Story", "Ambience", "Reviews"] as const;
const PANEL_COUNT = PANELS.length;

export default function HorizontalScrollSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // useScroll tracks the outer tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 scroll progress to 0 → -(PANEL_COUNT-1)*100vw translateX
  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(PANEL_COUNT - 1) * 100]
  );

  // Very soft spring — stiffness 30 / damping 25 = slow, patient, deliberate feel
  // (Think Aesop or Cartier — the page takes its time)
  const springX = useSpring(xPercent, { stiffness: 30, damping: 25, restDelta: 0.001 });

  // Convert back to vw string for the transform
  const x = useTransform(springX, (v) => `${v}vw`);

  // Update active dot indicator
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const panel = Math.round(v * (PANEL_COUNT - 1));
      setActivePanel(Math.min(Math.max(panel, 0), PANEL_COUNT - 1));
    });
  }, [scrollYProgress]);

  // ── MOBILE: normal vertical stacking ──────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <Hero />
        <EcoStory />
        <AmbienceGallery />
        <TrustStrip />
      </>
    );
  }

  // ── DESKTOP: horizontal scroll-jacked layout ─────────────────────────────
  return (
    <>
      {/* Outer tall container — 400vh gives 4 "screens" of scroll */}
      <div
        ref={containerRef}
        style={{ height: `${PANEL_COUNT * 100}vh` }}
        className="relative"
      >
        {/* Sticky inner wrapper — stays at top, 100vh tall.
             overscroll-behavior:none prevents the sticky exit from jolting */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ overscrollBehavior: "none" }}
        >
          {/* Horizontal flex row — all panels side-by-side.
               translate3d forces GPU compositing so there's no pixel-snap
               as the browser switches from sticky-scroll back to normal flow */}
          <motion.div
            style={{ x }}
            className="flex flex-nowrap h-full"
            // GPU layer hint — prevents repaint glitch at section boundaries
            initial={{ willChange: "transform" }}
          >
            {/* Panel 1 — Hero */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <Hero />
            </div>

            {/* Panel 2 — Eco Story */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto">
                <EcoStory />
              </div>
            </div>

            {/* Panel 3 — Ambience Gallery */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto">
                <AmbienceGallery />
              </div>
            </div>

            {/* Panel 4 — Trust Strip / Reviews */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto">
                <TrustStrip />
              </div>
            </div>
          </motion.div>

          {/* ── Panel progress indicator — fixed bottom center ─────────── */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 pointer-events-none"
            aria-hidden="true"
          >
            {PANELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    width: i === activePanel ? 28 : 8,
                    backgroundColor: i === activePanel ? "#C5A880" : "rgba(255,255,255,0.35)",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-[3px] rounded-full"
                />
                <motion.span
                  animate={{ opacity: i === activePanel ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold font-sans"
                >
                  {label}
                </motion.span>
              </div>
            ))}
          </div>

          {/* ── Scroll hint — fades out after first scroll ─────────────── */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
            className="absolute bottom-14 right-8 flex items-center gap-2 text-white/50 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
