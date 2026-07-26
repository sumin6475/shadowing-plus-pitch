import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, CheckItem } from "@/components/ui";

// Section 4: Technical / Stack & Skills. THE differentiator from a normal landing page.
// Two-tone heading + body, stack badges, decision cards, and a check list of
// résumé-aligned skills. Framed by hairline borders top and bottom.
export function Technical() {
  const { stack, decisions, skills, learnings, ...heading } = content.technical;
  return (
    <section className="border-y border-line bg-page">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>

        {/* Stack badges */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="rounded-btn border border-secondary-edge bg-secondary px-4 py-2 text-body font-medium text-heading"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="font-heading text-h6 text-heading">Key decisions</h3>
            <div className="mt-6 flex flex-col gap-4">
              {decisions.map((d, i) => (
                <Reveal key={`${d.title}-${i}`} delay={0.06 * i}>
                  <div className="rounded-card border border-line bg-surface p-6 shadow-card">
                    <p className="text-body-lg font-bold text-heading">{d.title}</p>
                    <p className="mt-2 text-body-lg text-body">{d.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-heading text-h6 text-heading">Skills demonstrated</h3>
              <Reveal delay={0.06}>
                <ul className="mt-6 flex flex-col gap-3">
                  {skills.map((skill, i) => (
                    <CheckItem key={`${skill}-${i}`}>{skill}</CheckItem>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div>
              <h3 className="font-heading text-h6 text-heading">What building it taught me</h3>
              <Reveal delay={0.06}>
                <ul className="mt-6 flex flex-col gap-3">
                  {learnings.map((l, i) => (
                    <CheckItem key={`${l}-${i}`}>{l}</CheckItem>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
