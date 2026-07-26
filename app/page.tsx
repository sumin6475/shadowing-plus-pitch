import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Features } from "@/components/sections/Features";
import { Technical } from "@/components/sections/Technical";
import { Outcomes } from "@/components/sections/Outcomes";
import { CTA } from "@/components/sections/CTA";

// Fixed pitch-page anatomy. Order is fixed; see ../../PRD.md.
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Technical />
        <Outcomes />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
