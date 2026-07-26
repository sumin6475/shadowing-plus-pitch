"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { content } from "@/lib/content";
import { Button } from "@/components/ui";
import { ScrollTiltCard } from "@/components/ui/container-scroll";
import { riseIn, EASE, DUR } from "@/lib/motion";

// Section 1: Hero.
// - When content.hero.image is set: eyebrow + headline + subhead, then a screenshot that
//   tilts flat as you scroll, then the CTA below it.
// - Otherwise: the abstract rotated-square shape cluster (Figma default).
export function Hero() {
  const reduce = useReducedMotion();
  const { hero, links } = content;

  const eyebrow = (
    <motion.p className="text-subtitle font-medium text-accent" {...riseIn(reduce, 0)}>
      {hero.eyebrow}
    </motion.p>
  );
  const headline = (
    <motion.h1
      className="max-w-4xl font-heading text-h3 text-heading md:text-display"
      {...riseIn(reduce, 0.08)}
    >
      {hero.headline}
    </motion.h1>
  );
  const subhead = (
    <motion.p className="max-w-2xl text-body-lg text-body" {...riseIn(reduce, 0.16)}>
      {hero.subhead}
    </motion.p>
  );
  const ctas = (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4"
      {...riseIn(reduce, 0.24)}
    >
      {links.repo ? (
        <Button href={links.repo} variant="primary">
          {hero.primaryCta}
        </Button>
      ) : null}
      {links.demo ? (
        <Button href={links.demo} variant="secondary">
          {hero.secondaryCta}
        </Button>
      ) : null}
    </motion.div>
  );

  if (hero.image) {
    return (
      <section className="overflow-hidden bg-page">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 pt-16 pb-20 text-center md:px-20 md:pt-24 md:pb-28">
          <div className="flex flex-col items-center gap-3">
            {eyebrow}
            {headline}
          </div>
          {subhead}
          <div className="mt-6 w-full">
            <ScrollTiltCard>
              <Image
                src={hero.image}
                alt={hero.imageAlt ?? `${content.projectName} interface`}
                fill
                priority
                className="object-cover object-left-top"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </ScrollTiltCard>
          </div>
          {ctas}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-20 px-6 py-20 text-center md:p-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            {eyebrow}
            {headline}
          </div>
          {subhead}
          {ctas}
        </div>
        <ShapeCluster reduce={reduce} />
      </div>
    </section>
  );
}

// Figma node 107:949 "Shapes": overlapping rotated OUTLINE squares in the accent color,
// with one filled square (accent-deep) rotated inside. One scale-in on mount, no loop.
function ShapeCluster({ reduce }: { reduce: boolean | null }) {
  const outlines = [
    { size: 256, rotate: 0 },
    { size: 184, rotate: 45 },
    { size: 208, rotate: 60 },
    { size: 232, rotate: 75 },
  ];

  return (
    <motion.div
      className="relative grid h-[284px] w-[284px] place-items-center"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: DUR, ease: EASE, delay: 0.3 }}
    >
      {outlines.map((s) => (
        <div
          key={`${s.size}-${s.rotate}`}
          className="col-start-1 row-start-1 border-4 border-accent-solid"
          style={{ width: s.size, height: s.size, transform: `rotate(${s.rotate}deg)` }}
        />
      ))}
      <div
        className="col-start-1 row-start-1 bg-accent-deep"
        style={{ width: 160, height: 160, transform: "rotate(15deg)" }}
      />
    </motion.div>
  );
}
