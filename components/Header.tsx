import { content } from "@/lib/content";
import { Button } from "@/components/ui";

// Header: brand left, actions right. Styled entirely by semantic tokens.
export function Header() {
  // The header carries GitHub only. The demo link still lives in the hero, the
  // CTA panel, and the footer; this is a deliberate per-project trim, not a
  // template change.
  const { repo } = content.links;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-20">
        <span className="font-heading text-h5 text-heading">{content.projectName}</span>
        <nav className="flex items-center gap-4">
          {repo ? (
            <Button href={repo} variant="ghost" size="md">
              GitHub
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
