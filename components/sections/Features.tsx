import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, CheckItem, VisualSlot } from "@/components/ui";

// Section 3: Features. Alternating text/image rows (Figma nodes 107:965 / 107:980 / 107:996),
// NOT a symmetric grid of identical cards. Each feature is its own row with real hierarchy;
// the image side flips left/right. Drop a real screenshot into each slot per project.
export function Features() {
  const { items, ...heading } = content.features;
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {items.map((feature, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={`${feature.title}-${i}`}>
                <div
                  className={`flex flex-col gap-10 md:items-center md:gap-20 ${
                    flip ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-heading text-h5 text-heading md:text-h3">
                      {feature.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-body-lg text-body">{feature.body}</p>
                    {feature.points && feature.points.length > 0 ? (
                      <ul className="mt-6 flex flex-col gap-3">
                        {feature.points.map((point, p) => (
                          <CheckItem key={`${point}-${p}`}>{point}</CheckItem>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <VisualSlot
                      image={feature.image}
                      label={feature.visualLabel ?? "Screenshot of this feature"}
                      alt={feature.title}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
