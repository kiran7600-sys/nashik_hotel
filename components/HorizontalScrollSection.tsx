"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import Hero from "@/components/Hero";
import EcoStory from "@/components/EcoStory";
import AmbienceGallery from "@/components/AmbienceGallery";
import TrustStrip from "@/components/TrustStrip";
import { scrollState } from "@/lib/scrollState";

const PANEL_COUNT = 4;
const PANELS = ["Hero", "Eco Story", "Ambience", "Reviews"] as const;

// Cinematic panel slide — easeInOutQuart
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const TRANSITION_S = 0.9; // seconds per panel slide

// Min accumulated wheel delta to trigger a panel jump
const TRIGGER_DELTA = 50;

export default function HorizontalScrollSection() {
  const [isMobile, setIsMobile]   = useState(false);
  const [panel, setPanel]         = useState(0);       // active panel index (for UI)
  const [exited, setExited]       = useState(false);   // true after all panels done

  // Refs that stay stable in callbacks without closure stale issues
  const panelRef        = useRef(0);
  const isAnimating     = useRef(false);
  const accumulated     = useRef(0);
  const clearAccTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One ref per panel — the scrollable inner container
  const panelScrollRefs = useRef<(HTMLDivElement | null)[]>(Array(PANEL_COUNT).fill(null));

  // Framer Motion value for horizontal translateX (in vw%)
  const x       = useMotionValue(0);
  const xString = useTransform(x, (v) => `${v}vw`);

  // ── Mobile detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Keep global scroll mode flag in sync ─────────────────────────────────
  useEffect(() => {
    scrollState.horizontalActive = !exited && !isMobile;
    return () => { scrollState.horizontalActive = false; };
  }, [exited, isMobile]);

  // ── Re-enter horizontal mode when user scrolls back to very top ──────────
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      if (exited && window.scrollY < 30) {
        // Reset everything
        panelScrollRefs.current.forEach((el) => { if (el) el.scrollTop = 0; });
        x.set(0);
        panelRef.current = 0;
        setPanel(0);
        setExited(false);
        accumulated.current = 0;
        scrollState.horizontalActive = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, exited, x]);

  // ── Panel transition ─────────────────────────────────────────────────────
  const goToPanel = useCallback(
    (next: number) => {
      if (isAnimating.current) return;

      // Past last panel → exit horizontal mode
      if (next >= PANEL_COUNT) {
        scrollState.horizontalActive = false;
        setExited(true);
        return;
      }
      // Before first panel → stay
      if (next < 0) return;

      isAnimating.current = true;
      panelRef.current    = next;
      setPanel(next);

      // Reset destination panel scroll to top
      const destEl = panelScrollRefs.current[next];
      if (destEl) destEl.scrollTop = 0;

      animate(x, next * -100, {
        type: "tween",
        ease: EASE,
        duration: TRANSITION_S,
        onComplete: () => { isAnimating.current = false; },
      });
    },
    [x]
  );

  // ── Core wheel handler ───────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile || exited) return;

    const onWheel = (e: WheelEvent) => {
      // Use capture phase + stopImmediatePropagation so SmoothScrollProvider
      // never sees this event while we're in horizontal mode
      e.preventDefault();
      e.stopImmediatePropagation();

      if (isAnimating.current) return;

      const currentIdx = panelRef.current;
      const scrollEl   = panelScrollRefs.current[currentIdx];

      // Normalise deltaMode (lines / pages → pixels)
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 40;
      if (e.deltaMode === 2) dy *= window.innerHeight;

      if (dy > 0) {
        // ── Scrolling DOWN ──────────────────────────────────────────────
        const maxScroll = scrollEl
          ? scrollEl.scrollHeight - scrollEl.clientHeight
          : 0;
        const atBottom = !scrollEl || maxScroll <= 5 ||
          scrollEl.scrollTop >= maxScroll - 6;

        if (!atBottom && scrollEl) {
          // Still content left in this panel — scroll it
          scrollEl.scrollTop = Math.min(
            scrollEl.scrollTop + dy,
            maxScroll
          );
          accumulated.current = 0;
        } else {
          // At bottom — accumulate delta until threshold reached
          accumulated.current += dy;
          if (clearAccTimer.current) clearTimeout(clearAccTimer.current);
          clearAccTimer.current = setTimeout(() => {
            accumulated.current = 0;
          }, 600);

          if (accumulated.current >= TRIGGER_DELTA) {
            accumulated.current = 0;
            goToPanel(currentIdx + 1);
          }
        }
      } else if (dy < 0) {
        // ── Scrolling UP ────────────────────────────────────────────────
        const atTop = !scrollEl || scrollEl.scrollTop <= 4;

        if (!atTop && scrollEl) {
          scrollEl.scrollTop = Math.max(0, scrollEl.scrollTop + dy);
          accumulated.current = 0;
        } else {
          accumulated.current += dy; // dy is negative
          if (clearAccTimer.current) clearTimeout(clearAccTimer.current);
          clearAccTimer.current = setTimeout(() => {
            accumulated.current = 0;
          }, 600);

          if (accumulated.current <= -TRIGGER_DELTA) {
            accumulated.current = 0;
            goToPanel(currentIdx - 1);
          }
        }
      }
    };

    // capture:true → runs before SmoothScrollProvider's bubble-phase listener
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      if (clearAccTimer.current) clearTimeout(clearAccTimer.current);
    };
  }, [isMobile, exited, goToPanel]);

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

  // ── DESKTOP: full-page panel experience ──────────────────────────────────
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Horizontal panel strip */}
      <motion.div
        style={{ x: xString, willChange: "transform" }}
        className="flex flex-nowrap h-full"
      >
        {/* Panel 0 — Hero (full screen, no internal scroll) */}
        <div
          ref={(el) => { panelScrollRefs.current[0] = el; }}
          className="shrink-0 w-screen h-screen overflow-hidden"
        >
          <Hero />
        </div>

        {/* Panel 1 — Eco Story (scrollable) */}
        <div
          ref={(el) => { panelScrollRefs.current[1] = el; }}
          className="shrink-0 w-screen h-screen overflow-y-scroll no-scrollbar"
        >
          <EcoStory />
        </div>

        {/* Panel 2 — Ambience Gallery (scrollable) */}
        <div
          ref={(el) => { panelScrollRefs.current[2] = el; }}
          className="shrink-0 w-screen h-screen overflow-y-scroll no-scrollbar"
        >
          <AmbienceGallery />
        </div>

        {/* Panel 3 — Trust Strip / Reviews (scrollable) */}
        <div
          ref={(el) => { panelScrollRefs.current[3] = el; }}
          className="shrink-0 w-screen h-screen overflow-y-scroll no-scrollbar"
        >
          <TrustStrip />
        </div>
      </motion.div>

      {/* ── Panel progress indicator — bottom centre ──────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 pointer-events-none"
        aria-hidden="true"
      >
        {PANELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{
                width: i === panel ? 28 : 8,
                backgroundColor:
                  i === panel ? "#C5A880" : "rgba(255,255,255,0.28)",
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="h-[3px] rounded-full"
            />
            <motion.span
              animate={{ opacity: i === panel ? 1 : 0, y: i === panel ? 0 : 3 }}
              transition={{ duration: 0.35 }}
              className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold font-sans"
            >
              {label}
            </motion.span>
          </div>
        ))}
      </div>

      {/* ── Scroll hint (first panel only) ────────────────────────────────── */}
      <motion.div
        animate={{ opacity: panel === 0 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-14 right-8 flex items-center gap-2 text-white/40 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
