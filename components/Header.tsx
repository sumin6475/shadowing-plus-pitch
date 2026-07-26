import { content } from "@/lib/content";
import { Button } from "@/components/ui";

// Header: brand left, actions right. Styled entirely by semantic tokens.
export function Header() {
  const { repo, demo } = content.links;
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
          {demo ? (
            <Button href={demo} variant="secondary" size="md">
              Live demo
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
