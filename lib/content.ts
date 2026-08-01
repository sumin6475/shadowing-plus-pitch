/*
  The per-project content model. One pitch page = one PitchContent object.
  Filled for Shadowing Plus from the real repo: github.com/sumin6475/shadowing-plus.
  Every claim traces to the MVP PRD (.agents/PRDs/speaking-memory-mvp.md), README,
  ARCHITECTURE.md, the migration ledger, the build journal, or `npm test` output
  as of 2026-07-26.

  Copy rules:
  - Real, specific sentences. No slogans, no buzzwords.
  - No em dashes. No invented metrics.
  - Headlines are two-tone: a heading line + an accent line.
*/

export type Heading = {
  top: string; // heading-color line
  accent: string; // accent line
  body?: string; // supporting copy
};

export type Feature = {
  title: string;
  body: string;
  points?: string[]; // optional supporting detail; vary length across features
  image?: string; // path under public/ to a real screenshot; falls back to the label
  visualLabel?: string; // caption shown when there is no image yet
};
export type Decision = { title: string; body: string };
export type Metric = { label: string; value: string };

export type PitchContent = {
  projectName: string;
  hero: {
    eyebrow: string; // small accent label above the headline
    headline: string; // the value + pain point, one line
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    image?: string; // when set, the hero shows this screenshot on a scroll-tilt device frame
    imageAlt?: string; // otherwise the hero shows the abstract shape cluster
  };
  problem: Heading & { points: string[]; image?: string; visualLabel?: string };
  features: Heading & { items: Feature[] };
  technical: Heading & {
    stack: string[];
    decisions: Decision[];
    skills: string[];
    learnings: string[];
  };
  outcomes: Heading & { metrics: Metric[]; notes: string[] };
  cta: Heading;
  links: {
    demo?: string;
    repo?: string;
    resume?: string;
  };
};

export const content: PitchContent = {
  projectName: "Shadowing Plus",
  hero: {
    eyebrow: "Solo built · Next.js 16 · Supabase · Cloudflare R2 · Vercel",
    headline: "Stop collecting English. Start using the English you already know.",
    subhead:
      "A speaking-memory web app for non-native English speakers who understand plenty but freeze when they have to explain their own work. Upload your own media, keep the phrases that matter, and get them back when you actually need them. Built solo, heading into an invite-only beta.",
    primaryCta: "Read the code",
    secondaryCta: "See it live",
    image: "/shots/island.png",
    imageAlt:
      "The Explain what I do Language Island: a rough spoken explanation shaped into editable message beats, each tagged as the learner's own words or as AI-structured",
  },
  problem: {
    top: "Saving English is easy.",
    accent: "Retrieving it is the hard part.",
    body: "Learners collect clips, subtitles, and phrases for years and still go blank in the one meeting that counts. The gap is not vocabulary. It is retrieval under pressure, and a generic AI tutor does not close it, because it hands you its answer instead of yours.",
    points: [
      "A learner walks into an interview with the knowledge, the evidence, and the phrases already saved, then loses all three the moment they have to speak.",
      "AI tutors solve the wrong half. A polished native-sounding answer erases the learner's own facts and voice, which is the part that mattered.",
      "Building the honest version means processing private media, tracking what a learner can genuinely retrieve, and refusing to score anything they did not really do.",
    ],
    image: "/shots/practice.png",
    visualLabel: "Practice: an SM-2 style drill over the sentences you bookmarked",
  },
  features: {
    top: "What it does.",
    accent: "The parts worth showing.",
    body: "Four things, in the order a reader would care about. The first is the MVP going into beta; the rest are the shipped foundation it stands on.",
    items: [
      {
        title: "Language Island: Explain what I do",
        body: "The learner brain-dumps a real explanation in their own words. The model reorganizes it into editable message beats and stops there. Every beat is tagged AI-structured until the learner edits it, at which point it becomes Your words. AI structures; the learner owns the facts.",
        points: [
          "Beats are reorderable, deletable, and stored per learner behind row-level security.",
          "Re-shaping warns before it discards edits, because the edits are the learner's contribution.",
        ],
        image: "/shots/island.png",
        visualLabel: "The Explain what I do island",
      },
      {
        title: "A phrase bank that tracks what you can actually use",
        body: "Select a line inside your own uploaded media, get a context-aware Korean explanation, and save it with its video, subtitle, and timestamp intact. Each phrase then carries an evidence level you have to earn.",
        points: [
          "Status only moves on a learner quick-check. A view, a replay, or an AI suggestion never promotes a phrase on its own.",
          "Search asks what you are trying to say, and answers only from your own saved material.",
        ],
        image: "/shots/phrases.png",
        visualLabel: "Phrase Bank with the readiness meter",
      },
      {
        title: "Spaced repetition over the lines you got wrong",
        body: "Bookmarked sentences become an SM-2-lite drill. Again, Good, and Easy schedule the next review, and an undo rolls the verdict back on both the client and the server.",
        image: "/shots/practice.png",
        visualLabel: "Practice mode",
      },
      {
        title: "A five-stage media pipeline that survives its own failures",
        body: "Five stages, because a timeout in translation should not cost the transcription already paid for. Each one checkpoints to R2 and re-runs on its own.",
        image: "/shots/pipeline.png",
        visualLabel: "extract · transcribe · postprocess · translate · persist",
      },
    ],
  },
  technical: {
    top: "How it's built.",
    accent: "And what I decided against.",
    body: "One person, one repo, from the schema to the deploy. The decisions below are the ones that were expensive to reverse, so they are the ones worth reading.",
    stack: [
      "TypeScript 5",
      "Next.js 16 (App Router)",
      "React 19",
      "Tailwind CSS 4",
      "Supabase Postgres + Auth",
      "Row-level security",
      "Cloudflare R2 (S3 API)",
      "Vercel API routes",
      "ElevenLabs Scribe v2",
      "GPT-4o-mini",
      "Vitest",
      "Expo (mobile scaffold)",
    ],
    decisions: [
      {
        title: "Rebuilt single-user shortcuts into per-user row-level security",
        body: "RLS off with a shared anon key is fine for one user and a privacy hole for two. Migration 008 moved every table to per-user policies, and nobody outside the build gets invited until a two-account isolation test passes.",
      },
      {
        title: "Made private media private by signed URL, not by obscurity",
        body: "Media rows hold bare object keys now, and playback resolves through an authenticated route that mints a short-lived signed URL. A guessable public URL is not access control.",
      },
      {
        title: "Matched translations by batch position, not by the index the model returned",
        body: "GPT-4o-mini sometimes drops or reorders items inside a batch, which silently pairs a Korean line with the wrong English sentence. Matching on the position sent makes that drift impossible.",
      },
      {
        title: "Cut public YouTube caption import from the launch",
        body: "The official IFrame API authorizes embedded playback, not bulk caption collection. Private uploads became the only ingestion path.",
      },
      {
        title: "Kept the pure logic pure",
        body: "Postprocess, SRS, and retrieval are I/O-free. That is where all 78 tests live.",
      },
    ],
    skills: [
      "Shipped an LLM product end to end: two AI providers, one production pipeline",
      "Defended against model drift: batched calls mapped by position, not by returned index",
      "Metered spend. Every billable call logs tokens, audio seconds, and cost",
      "Chose inspectable retrieval over vector search until the simple version fails",
      "Per-user RLS and signed private object storage",
      "Idempotent pipeline stages with checkpointed retry",
      "Evidence levels a learner earns, never inferred from a view",
      "Full-stack TypeScript, solo: schema to UI",
    ],
    learnings: [
      "A bug that hits desktop, mobile, and the installed PWA at once is a server or deploy cause, not three client bugs.",
      "Deploy config is code. Unanchored .vercelignore patterns quietly dropped the media API from the upload, so playback 404'd in production only.",
      "Green local tests are not production evidence. Auth and RLS count as verified only after a two-account isolation run against the real project.",
      "Shipping the honest version means refusing to auto-mark a phrase as learned, even when the fake metric would look better.",
    ],
  },
  outcomes: {
    top: "Where it stands.",
    accent: "And what is not proven yet.",
    body: "The app is deployed and the MVP scope is closing. There are no user results yet, so here is the build instead, measured rather than described.",
    metrics: [
      { label: "unit tests over the pure logic: postprocess, SRS, retrieval, due-selection", value: "78" },
      { label: "API routes behind per-user auth", value: "29" },
      { label: "schema migrations, applied in order", value: "19" },
      { label: "lines of TypeScript across 150 files, solo since April 2026", value: "21k" },
    ],
    notes: [
      "The public MVP is one Language Island, Explain what I do, going out as a free invite-only web beta.",
      "The bar is small and falsifiable: of the first ten users, five complete two attempts and report retrieving a phrase they had saved earlier, without being shown a script.",
      "What is not proven: nobody outside the build has used it. Production auth and RLS still sit behind a two-account isolation test, which is why the beta is invite-only rather than open.",
      "Next is the speak loop the island was built for: one attempt, one diagnosed gap, one repair, then a second attempt. An Expo client is scaffolded against the same API.",
    ],
  },
  cta: {
    top: "Want the full story?",
    accent: "Read the code.",
    body: "The repo, the live app, and the résumé are one click away.",
  },
  links: {
    // Rendered in the hero, the CTA panel, and the footer. The top nav is the one
    // surface that deliberately omits it (see components/Header.tsx).
    demo: "https://shadowing-plus.vercel.app",
    repo: "https://github.com/sumin6475/shadowing-plus",
    resume:
      "https://drive.google.com/file/d/1l_2-hgLLXuP7KYbc_mRQ9TbwnBCi0rOA/view?usp=sharing",
  },
};
