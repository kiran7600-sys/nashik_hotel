"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";
import Hero from "@/components/Hero";
import EcoStory from "@/components/EcoStory";
import AmbienceGallery from "@/components/AmbienceGallery";
import TrustStrip from "@/components/TrustStrip";

const PANELS = ["Hero", "Eco Story", "Ambience", "Reviews"] as const;
const PANEL_COUNT = PANELS.length;

// Lerp — the secret behind silky Premium scrolling.
// Each frame, move 8% closer to target. Fast start, exponential ease-out.
const lerp = (from: number, to: number, factor: number) =>
  from + (to - from) * factor;

export default function HorizontalScrollSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount and resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track the outer tall container scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The raw target x (in vw%) — directly from scroll, no lag
  const targetX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(PANEL_COUNT - 1) * 100]
  );

  // The smooth x we actually apply — lerped toward targetX each frame
  const smoothX = useMotionValue(0);

  // useAnimationFrame runs every RAF tick — lerp toward target
  useAnimationFrame(() => {
    const target = targetX.get();
    const current = smoothX.get();
    // Factor 0.085 = very smooth, ~95ms to settle. Increase for snappier.
    const next = lerp(current, target, 0.085);
    smoothX.set(next);
  });

  // Convert numeric vw% to CSS string
  const x = useTransform(smoothX, (v) => `${v}vw`);

  // Update active panel indicator from the raw (un-smoothed) progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const panel = Math.round(v * (PANEL_COUNT - 1));
      setActivePanel(Math.min(Math.max(panel, 0), PANEL_COUNT - 1));
    });
  }, [scrollYProgress]);

  // ── Scroll hint opacity — fades out as soon as scrolling starts ───────────
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // ── MOBILE: normal vertical stacking ─────────────────────────────────────
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

  // ── DESKTOP: horizontal scroll-jacked layout ──────────────────────────────
  return (
    <>
      {/* Outer tall container — 400vh = 4 panels worth of scroll travel */}
      <div
        ref={containerRef}
        style={{ height: `${PANEL_COUNT * 100}vh` }}
        className="relative"
      >
        {/* Sticky inner — pinned at top, clips to 100vh */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ overscrollBehavior: "none" }}
        >
          {/* Horizontal panel strip — GPU-composited via willChange */}
          <motion.div
            style={{ x, willChange: "transform" }}
            className="flex flex-nowrap h-full"
          >
            {/* Panel 1 — Hero */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <Hero />
            </div>

            {/* Panel 2 — Eco Story */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto no-scrollbar">
                <EcoStory />
              </div>
            </div>

            {/* Panel 3 — Ambience Gallery */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto no-scrollbar">
                <AmbienceGallery />
              </div>
            </div>

            {/* Panel 4 — Trust Strip / Reviews */}
            <div className="relative shrink-0 w-screen h-screen overflow-hidden">
              <div className="h-full overflow-y-auto no-scrollbar">
                <TrustStrip />
              </div>
            </div>
          </motion.div>

          {/* ── Panel progress indicator — bottom center ─────────────────── */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 pointer-events-none"
            aria-hidden="true"
          >
            {PANELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    width: i === activePanel ? 28 : 8,
                    backgroundColor:
                      i === activePanel
                        ? "#C5A880"
                        : "rgba(255,255,255,0.3)",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-[3px] rounded-full"
                />
                <motion.span
                  animate={{ opacity: i === activePanel ? 1 : 0, y: i === activePanel ? 0 : 4 }}
                  transition={{ duration: 0.35 }}
                  className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold font-sans"
                >
                  {label}
                </motion.span>
              </div>
            ))}
          </div>

          {/* ── Scroll hint arrow — right edge, fades on first scroll ─────── */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-14 right-8 flex items-center gap-2 text-white/40 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-widest font-sans">
              Scroll
            </span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
