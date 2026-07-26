import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, CheckItem, VisualSlot } from "@/components/ui";

// Section 2: Problem. Two-column pattern (Figma node 107:996):
// text column with two-tone heading + check list, visual column beside it.
export function Problem() {
  const { points, ...heading } = content.problem;
  return (
    <section className="bg-page">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-20 px-6 py-20 md:flex-row md:p-20">
        <div className="flex-1">
          <Reveal>
            <SectionHeading heading={heading} />
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 flex flex-col gap-3">
              {points.map((point, i) => (
                <CheckItem key={`${point}-${i}`}>{point}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="flex-1">
          <VisualSlot
            image={content.problem.image}
            label={content.problem.visualLabel ?? "Project visual — swap in a real screenshot"}
          />
        </Reveal>
      </div>
    </section>
  );
}
