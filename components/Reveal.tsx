"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reveal } from "@/lib/motion";

// Scroll reveal used across sections. All timing comes from the motion tokens
// (lib/motion.ts). Honors prefers-reduced-motion: when reduced, content renders
// in place with no transform or fade.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} {...reveal(reduce, delay)}>
      {children}
    </motion.div>
  );
}
