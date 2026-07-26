import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

// Section 5: Outcomes / Key learnings. Real metrics only; notes otherwise.
export function Outcomes() {
  const { metrics, notes, ...heading } = content.outcomes;
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>

        {metrics.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={`${m.label}-${i}`} delay={0.06 * i}>
                <div className="rounded-card border border-line bg-surface p-8 shadow-card">
                  <p className="font-heading text-h2 leading-none text-accent">{m.value}</p>
                  <p className="mt-3 text-body-lg text-body">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {notes.length > 0 ? (
          <div className="mt-12 flex max-w-3xl flex-col gap-4">
            {notes.map((note, i) => (
              <Reveal key={`${note}-${i}`} delay={0.05 * i}>
                <p className="text-body-lg text-body">{note}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
