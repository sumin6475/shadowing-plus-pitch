"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";

/*
  A screenshot on a device frame that tilts from angled to flat as it scrolls up through
  the viewport. Adapted from the Aceternity "container-scroll-animation" idea, but
  self-contained: it tilts only the card (the page owns the title and CTA), it is sized to
  the viewport (aspect-video, no giant fixed height), and it never translates content under
  the sticky header or over the next section. Reduced-motion renders it flat.
*/
export function ScrollTiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // 0 when the card top enters from the lower viewport, 1 as it rises toward the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.97, 1]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl" style={{ perspective: "1400px" }}>
      <motion.div
        style={{ rotateX: rotate, scale, transformOrigin: "center top" }}
        className="rounded-[28px] border-4 border-frame-edge bg-frame p-2 shadow-2xl md:p-3"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
