"use client";

import { useEffect, useRef } from "react";

/**
 * SmoothScrollProvider
 *
 * Intercepts mouse-wheel & keyboard scroll events and replaces the browser's
 * native chunky scroll jumps with a lerp-based animation each RAF tick.
 * This makes the mouse wheel feel identical to a trackpad — critical for a
 * scroll-jacked horizontal layout where discrete jumps cause section breaks.
 *
 * Architecture:
 *  - targetY: where the page SHOULD be (updated instantly on wheel/key)
 *  - Every RAF tick: window.scrollY lerps toward targetY at EASE factor
 *  - Framer Motion's useScroll reads every native scroll event, so the
 *    horizontal transform in HorizontalScrollSection stays perfectly in sync
 */

const EASE             = 0.08;  // 8% per frame — smooth but responsive (~120ms settle)
const WHEEL_MULT       = 1.0;   // Wheel speed multiplier. 1 = natural.

export default function SmoothScrollProvider() {
  const targetY   = useRef(0);
  const rafId     = useRef<number | null>(null);

  useEffect(() => {
    // Sync to current scroll position on mount (handles reload mid-page)
    targetY.current = window.scrollY;

    const getMax = () =>
      Math.max(0, document.body.scrollHeight - window.innerHeight);

    const clamp = (v: number, lo: number, hi: number) =>
      Math.min(Math.max(v, lo), hi);

    // ── RAF animation loop ─────────────────────────────────────────────────
    const tick = () => {
      const current = window.scrollY;
      const target  = targetY.current;
      const delta   = target - current;

      if (Math.abs(delta) < 0.5) {
        // Close enough — snap and stop
        if (delta !== 0) window.scrollTo(0, target);
        rafId.current = requestAnimationFrame(tick); // keep alive for next event
        return;
      }

      // Lerp: move 8% closer each frame
      window.scrollTo(0, current + delta * EASE);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // ── Mouse wheel handler ────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Normalise delta across deltaMode variants:
      //   0 = pixels  (most mice & trackpads)
      //   1 = lines   (some older mice, Firefox on Windows)
      //   2 = pages   (Page Up/Down)
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 40;
      if (e.deltaMode === 2) dy *= window.innerHeight;

      targetY.current = clamp(
        targetY.current + dy * WHEEL_MULT,
        0,
        getMax()
      );
    };

    // ── Keyboard scroll handler ────────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const vh = window.innerHeight;
      const keyMap: Record<string, number> = {
        ArrowDown:  70,
        ArrowUp:   -70,
        PageDown:   vh * 0.88,
        PageUp:    -vh * 0.88,
      };

      let dy: number | undefined;
      if (e.key === " ")      dy = e.shiftKey ? -vh * 0.88 : vh * 0.88;
      else if (e.key === "End")  dy = getMax() - targetY.current;
      else if (e.key === "Home") dy = -targetY.current;
      else                       dy = keyMap[e.key];

      if (dy === undefined) return;

      e.preventDefault();
      targetY.current = clamp(targetY.current + dy, 0, getMax());
    };

    // ── Anchor / programmatic jump sync ───────────────────────────────────
    // If an anchor link or JS scrolls the page far away from our target,
    // snap targetY to match so the lerp doesn't pull back the wrong way.
    const onScroll = () => {
      if (Math.abs(window.scrollY - targetY.current) > 150) {
        targetY.current = window.scrollY;
      }
    };

    window.addEventListener("wheel",   onWheel,  { passive: false });
    window.addEventListener("keydown", onKey,    { passive: false });
    window.addEventListener("scroll",  onScroll, { passive: true  });

    return () => {
      window.removeEventListener("wheel",   onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll",  onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}
