"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  y = 40,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
