import type { ReactNode } from "react";
import Image from "next/image";
import type { Heading } from "@/lib/content";

// Primitives built on the SEMANTIC tokens (see app/theme.css + template/DESIGN-SYSTEM.md).
// Components reference roles (accent-solid, heading, line), never a brand's raw scale,
// so swapping the active theme file restyles all of them at once.

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "lg" | "md";
}) {
  const base =
    "inline-flex items-center justify-center rounded-btn font-medium tracking-[0.5px] transition-colors";
  const sizes = {
    lg: "px-8 py-4 text-btn",
    md: "px-6 py-3 text-body",
  };
  const variants = {
    primary: "bg-accent-solid border border-accent-edge text-on-accent hover:bg-accent-hover",
    secondary: "bg-secondary border border-secondary-edge text-heading hover:border-accent-edge",
    ghost: "text-heading hover:text-accent",
  };
  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}

// Section shell: 80px rhythm with a 1440 max width.
export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">{children}</div>
    </section>
  );
}

// Two-tone heading: heading-color line + accent line, then optional body copy.
// Face, weight, and tracking come from the brand tokens (an editorial serif brand
// renders these at 400; the default renders ExtraBold sans).
export function SectionHeading({
  heading,
  align = "left",
  as: Tag = "h2",
}: {
  heading: Heading;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div className={`flex flex-col gap-8 ${alignment}`}>
      <div className={`flex flex-col gap-2 ${alignment}`}>
        <Tag className="font-heading text-h5 text-heading md:text-h3">
          {heading.top}
          <span className="block text-accent">{heading.accent}</span>
        </Tag>
      </div>
      {heading.body ? (
        <p className={`max-w-2xl text-body-lg text-body ${align === "center" ? "mx-auto" : ""}`}>
          {heading.body}
        </p>
      ) : null}
    </div>
  );
}

// Check-list item: 24px check icon in the accent color + body-size heading-color text.
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckIcon />
      <span className="text-body-lg text-heading">{children}</span>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-1 size-6 flex-none text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// A framed 16:9 visual. Renders a real screenshot when `image` is set (a path under
// public/), otherwise a labelled placeholder. Screenshots are the studio's main imagery.
export function VisualSlot({
  image,
  label,
  alt,
}: {
  image?: string;
  label: string;
  alt?: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-line bg-surface shadow-elevated">
      {image ? (
        <Image
          src={image}
          alt={alt ?? label}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="px-6 text-center text-body text-muted">{label}</span>
        </div>
      )}
    </div>
  );
}
