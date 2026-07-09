"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scrollState";

/**
 * SmoothScrollProvider
 *
 * Handles smooth vertical scrolling via lerp for the VERTICAL sections
 * of the page (Menu, Reserve, VisitUs, Footer).
 *
 * When HorizontalScrollSection is active it intercepts wheel events in
 * capture phase and sets scrollState.horizontalActive = true. This provider
 * backs off completely in that case, so there's no double-handling.
 */

const EASE   = 0.09;  // lerp factor — 9% per frame ≈ 110ms settle

export default function SmoothScrollProvider() {
  const targetY = useRef(0);
  const rafId   = useRef<number | null>(null);

  useEffect(() => {
    targetY.current = window.scrollY;

    const getMax = () =>
      Math.max(0, document.body.scrollHeight - window.innerHeight);

    const clamp = (v: number, lo: number, hi: number) =>
      Math.min(Math.max(v, lo), hi);

    // ── RAF loop — always running, does nothing when delta < 0.5 ──────────
    const tick = () => {
      const cur    = window.scrollY;
      const target = targetY.current;
      const delta  = target - cur;

      if (Math.abs(delta) >= 0.5) {
        window.scrollTo(0, cur + delta * EASE);
      } else if (delta !== 0) {
        window.scrollTo(0, target);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // ── Wheel handler (bubble phase — capture handled by HorizontalScroll) ─
    const onWheel = (e: WheelEvent) => {
      // HorizontalScrollSection uses capture phase and stopImmediatePropagation
      // so this only fires when horizontal mode is not active.
      // Guard anyway for safety.
      if (scrollState.horizontalActive) return;

      e.preventDefault();

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 40;
      if (e.deltaMode === 2) dy *= window.innerHeight;

      targetY.current = clamp(targetY.current + dy, 0, getMax());
    };

    // ── Keyboard handler ──────────────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (scrollState.horizontalActive) return;

      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const vh  = window.innerHeight;
      const map: Record<string, number> = {
        ArrowDown:  70,
        ArrowUp:   -70,
        PageDown:   vh * 0.88,
        PageUp:    -vh * 0.88,
      };

      let dy: number | undefined;
      if (e.key === " ")       dy = e.shiftKey ? -vh * 0.88 : vh * 0.88;
      else if (e.key === "End")  dy = getMax() - targetY.current;
      else if (e.key === "Home") dy = -targetY.current;
      else                       dy = map[e.key];

      if (dy === undefined) return;

      e.preventDefault();
      targetY.current = clamp(targetY.current + dy, 0, getMax());
    };

    // ── Anchor / programmatic jump sync ───────────────────────────────────
    const onScroll = () => {
      // If something jumped scrollY far from our target (anchor click etc.),
      // snap target to match so we don't drift back.
      if (Math.abs(window.scrollY - targetY.current) > 150) {
        targetY.current = window.scrollY;
      }
    };

    // Bubble phase — HorizontalScrollSection's capture-phase handler runs first
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
