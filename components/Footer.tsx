import { content } from "@/lib/content";

const year = 2026; // static: bump per build. Avoids hydration drift from Date.

export function Footer() {
  const { demo, repo, resume } = content.links;
  const links = [
    demo ? { label: "Live demo", href: demo } : null,
    repo ? { label: "GitHub repo", href: repo } : null,
    resume ? { label: "Résumé", href: resume } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:px-20">
        <div>
          <p className="font-heading text-h6 text-heading">{content.projectName}</p>
          <p className="mt-1 text-body text-muted">A Pitch Page Studio project.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-body font-medium text-body">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 pb-8 md:px-20">
        <span className="text-sm text-muted">
          © {year} {content.projectName}
        </span>
      </div>
    </footer>
  );
}
