"use client";

import { useEffect, useRef } from "react";

export default function ScrollSpeedGrain() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastTime = performance.now();
    let requestFrameId: number;

    const updateGrainSpeed = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      
      const distance = Math.abs(currentScrollY - lastScrollY);
      const timeDiff = Math.max(currentTime - lastTime, 1);
      
      // Calculate scroll speed in pixels per millisecond
      const speed = distance / timeDiff;
      
      if (overlayRef.current) {
        // Base opacity is 0.022. Increase slightly as scroll speed increases (max 0.038)
        const targetOpacity = Math.min(0.022 + speed * 0.015, 0.038);
        
        // Speed up the jitter animation during fast scroll to simulate celluloid motion blur (from 0.15s down to 0.06s)
        const targetDuration = Math.max(0.15 - speed * 0.08, 0.06);

        // Smoothly interpolate values to prevent sudden flashes
        overlayRef.current.style.opacity = targetOpacity.toFixed(4);
        overlayRef.current.style.animationDuration = `${targetDuration.toFixed(3)}s`;
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    const handleScroll = () => {
      if (requestFrameId) {
        cancelAnimationFrame(requestFrameId);
      }
      requestFrameId = requestAnimationFrame(updateGrainSpeed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestFrameId) {
        cancelAnimationFrame(requestFrameId);
      }
    };
  }, []);

  return <div ref={overlayRef} className="noise-overlay" />;
}
