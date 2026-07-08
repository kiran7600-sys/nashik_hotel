"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function ScrollVine() {
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress to draw the vine. We want it to grow as the user scrolls.
  // We limit the active range to the first 40% of the page (Hero, Eco Story, and Menu)
  const pathLength = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  
  const springPathLength = useSpring(pathLength, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fade out as the user scrolls past the Menu section
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.42, 0.48], [0, 0.7, 0.7, 0]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[80vh] h-[260vh] w-64 pointer-events-none z-20 hidden md:block">
      <svg
        className="w-full h-full"
        viewBox="0 0 200 2000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Main winding vine path */}
        <motion.path
          d="M 100,0 C 60,150 140,300 100,450 C 40,600 160,750 100,900 C 50,1050 150,1200 100,1350 C 60,1500 140,1650 100,1800 C 70,1900 130,1950 100,2000"
          stroke="#C5A880"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: springPathLength, opacity }}
        />

        {/* Small leaves popping off the vine dynamically */}
        <motion.path
          d="M 90,200 Q 60,190 75,210 Z"
          fill="#C5A880"
          style={{ opacity: useTransform(springPathLength, [0.1, 0.12], [0, 0.4]) }}
        />
        <motion.path
          d="M 110,650 Q 140,640 125,660 Z"
          fill="#C5A880"
          style={{ opacity: useTransform(springPathLength, [0.3, 0.32], [0, 0.4]) }}
        />
        <motion.path
          d="M 90,1100 Q 60,1090 75,1110 Z"
          fill="#C5A880"
          style={{ opacity: useTransform(springPathLength, [0.55, 0.57], [0, 0.4]) }}
        />
        <motion.path
          d="M 115,1550 Q 145,1540 130,1560 Z"
          fill="#C5A880"
          style={{ opacity: useTransform(springPathLength, [0.78, 0.8], [0, 0.4]) }}
        />
      </svg>
    </div>
  );
}
