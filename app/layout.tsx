import type { Metadata } from "next";
import { Roboto, Instrument_Serif } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

/*
  Fonts. Each theme picks from the loaded vars (see app/theme.css):
  - default theme uses --font-roboto for everything
  - shadowing-plus uses --font-instrument-serif for headings; its body font
    (Pretendard) is not on Google Fonts, so --brand-font falls back to system Korean sans.
  Load a project's own font here when its theme needs one.
*/
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-roboto",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

// SEO + Open Graph so a pasted link previews well. Fill per project in lib/content.ts.
export const metadata: Metadata = {
  title: `${content.projectName} — ${content.hero.headline}`,
  description: content.hero.subhead,
  openGraph: {
    title: `${content.projectName} — ${content.hero.headline}`,
    description: content.hero.subhead,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.projectName} — ${content.hero.headline}`,
    description: content.hero.subhead,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${instrumentSerif.variable}`}
      style={
        {
          // Pretendard is Shadowing Plus's body face and is not on Google Fonts.
          // Loaded from the same CDN the app itself uses, so the pitch page and
          // the product read as one system.
          ["--font-pretendard" as string]:
            '"Pretendard Variable", "Pretendard", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", sans-serif',
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
