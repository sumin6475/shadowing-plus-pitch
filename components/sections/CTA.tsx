import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, Button } from "@/components/ui";

// Section 6: Call to action. A centered panel carrying the handoff links.
export function CTA() {
  const { demo, repo, resume } = content.links;
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">
        <Reveal>
          <div className="flex flex-col items-center gap-10 rounded-card border border-line bg-surface px-6 py-20 text-center shadow-elevated md:px-20">
            <SectionHeading heading={content.cta} align="center" />
            <div className="flex flex-wrap items-center justify-center gap-4">
              {repo ? (
                <Button href={repo} variant="primary">
                  Read the code
                </Button>
              ) : null}
              {demo ? (
                <Button href={demo} variant="secondary">
                  Live demo
                </Button>
              ) : null}
              {resume ? (
                <Button href={resume} variant="secondary">
                  Résumé
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
