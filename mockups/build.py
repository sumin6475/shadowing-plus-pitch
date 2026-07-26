#!/usr/bin/env python3
"""
Build the Shadowing Plus pitch-page screens.

The real app sits behind Supabase Auth with no seed data, so a live capture is
not possible. Instead each screen is rebuilt as static HTML using the project's
OWN stylesheets (read verbatim from Code HQ/Shadowing Plus/web/src) and markup
that mirrors the real JSX. Nothing here invents a look: the CSS is the shipped
CSS, so the capture matches what the app renders.

Usage:
    python3 mockups/build.py            # write mockups/screens.html
    then capture with headless Chrome (see mockups/README.md)
"""

from pathlib import Path

APP = Path(__file__).resolve().parents[2] / "Shadowing Plus" / "web" / "src"
OUT = Path(__file__).resolve().parent / "screens.html"

CSS_FILES = [
    APP / "app" / "home.css",
    APP / "app" / "app" / "island" / "island.css",
    APP / "app" / "phrases" / "phrases.css",
]

FONT_LINKS = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:opsz,wght@6..72,300..600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
"""

SHIM = """
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; }
:root {
  --font-pretendard: "Pretendard Variable";
  --font-instrument-serif: "Instrument Serif";
  --font-newsreader: "Newsreader";
  --font-mono: "JetBrains Mono";
  --font-serif: "Instrument Serif";
  --font-sans: "Pretendard Variable";
}
.screen { width: 1600px; height: 900px; overflow: hidden; position: relative; }
.screen + .screen { border-top: 1px solid #000; }
.home-app { height: 900px; }
.home-app .main { overflow: hidden; }
/* Only cosmetic deviation from the shipped CSS: keep the "coming next" pill on
   one line. In the app it sits in a flex row that can wrap it mid-capture. */
.li-soon { white-space: nowrap; flex: none; }
"""

# Inline SVG icons lifted from the app's icon set (stroke-based, 1.5 weight).
ICONS = {
    "home": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    "library": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="16" rx="1"/><path d="m17.5 5.5 3.2 14.2"/></svg>',
    "inbox": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h4l2 3h4l2-3h4"/><path d="M5 5h14l2 8v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"/></svg>',
    "bookmark": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v16l-6-4-6 4z"/></svg>',
    "mic": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    "search": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
    "check": '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
    "pencil": '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16z"/></svg>',
    "chevron": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    "trash": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
    "plus": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    "replay": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
    "note": '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    "play": '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10-6.5z"/></svg>',
    "mic-lg": '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    "drill": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
}


def sidebar(active: str) -> str:
    """The real Sidebar.tsx markup, with one nav item marked active."""
    def item(key, icon, label, count=None, href=True):
        cls = "nav-item active" if key == active else "nav-item"
        c = f'<span class="nav-count">{count}</span>' if count is not None else ""
        return (
            f'<a class="{cls}"><span class="nav-icon">{ICONS[icon]}</span>'
            f'<span class="nav-label">{label}</span>{c}</a>'
        )

    return f"""
<aside class="sidebar">
  <div class="brand">Shadowing<span class="plus">+</span></div>
  <div class="search">
    <span class="icon">{ICONS['search']}</span>
    <input placeholder="Search clips, folders…" disabled>
    <kbd>⌘K</kbd>
  </div>
  <nav class="nav-section">
    <div class="nav-head"><span>Library</span></div>
    {item('home', 'home', 'Home')}
    {item('all', 'library', 'All clips', 18)}
    {item('recent', 'inbox', 'Recently added', 4)}
    {item('bookmarks', 'bookmark', 'Bookmarks')}
    {item('phrases', 'library', 'Phrase Bank')}
    {item('island', 'mic', 'Language Island')}
  </nav>
  <nav class="nav-section">
    <div class="nav-head"><span>Folders</span><button>＋</button></div>
    <a class="nav-item"><span class="nav-icon" style="color:oklch(0.58 0.165 258)">●</span><span class="nav-label">Interviews</span><span class="nav-count">6</span></a>
    <a class="nav-item"><span class="nav-icon" style="color:oklch(0.62 0.13 155)">●</span><span class="nav-label">Podcasts</span><span class="nav-count">7</span></a>
    <a class="nav-item"><span class="nav-icon" style="color:oklch(0.68 0.13 80)">●</span><span class="nav-label">Talks</span><span class="nav-count">5</span></a>
  </nav>
</aside>
"""


def beat(n, text, evidence, yours):
    badge = (
        f'<span class="li-badge yours">{ICONS["check"]} Your words</span>'
        if yours
        else f'<span class="li-badge">{ICONS["pencil"]} AI-structured — edit to make it yours</span>'
    )
    ev = f'<p class="li-beat-evidence">{evidence}</p>' if evidence else ""
    return f"""
<div class="li-beat">
  <span class="li-beat-num">{n}</span>
  <div>
    <p class="li-beat-text">{text}</p>
    {ev}
    <div class="li-beat-meta">{badge}</div>
  </div>
  <div class="li-beat-tools">
    <button class="li-tool"><span style="display:grid;place-items:center;transform:rotate(180deg)">{ICONS['chevron']}</span></button>
    <button class="li-tool">{ICONS['chevron']}</button>
    <button class="li-tool">{ICONS['trash']}</button>
  </div>
</div>"""


ISLAND = f"""
<div class="screen">
<div class="home-app island-app">
  {sidebar('island')}
  <main class="main"><div class="main-inner"><div class="li-wrap">
    <div class="li-head"><div class="li-head-row">
      <div>
        <div class="li-eyebrow">Language Island <span class="crumb">/ your first island</span></div>
        <h1 class="li-title">Explain what I do</h1>
        <p class="li-lede">Start from a rough explanation in your own words. We&rsquo;ll help you shape it into clear message beats &mdash; then you use the English you already have.</p>
      </div>
      <span class="li-status st-ready"><span class="dot"></span>Ready</span>
    </div></div>

    <section class="li-practice-cta">
      <span class="ic">{ICONS['mic-lg']}</span>
      <div>
        <h3>Speak it once, out loud.</h3>
        <p>One attempt, one gap, one repair &mdash; then say it again. About four minutes.</p>
      </div>
      <span class="li-soon">Coming next</span>
      <button class="btn primary" style="opacity:.55">{ICONS['mic']} Practice this message</button>
    </section>

    <section class="li-beats">
      <div class="li-beats-head"><div>
        <h2 class="li-beats-title">Your message</h2>
        <p class="li-beats-intro">AI organized your words into beats. Edit them until they&rsquo;re yours &mdash; <b>AI structures; you own the facts.</b></p>
      </div></div>
      <div class="li-beat-list">
        {beat(1, "I build learning tools for people who already study English but freeze the moment they have to speak about their own work.", None, True)}
        {beat(2, "Right now I&rsquo;m building Shadowing Plus, which turns the phrases you already saved into language you can actually retrieve.", "A five-stage pipeline turns your own uploads into sentence-level transcripts; saved phrases carry their source and timestamp.", False)}
        {beat(3, "The part I care about is the moment of retrieval, not how many clips someone collected.", None, True)}
      </div>
      <div class="li-beats-foot">
        <button class="btn ghost">{ICONS['plus']} Add a beat</button>
        <button class="btn ghost">{ICONS['replay']} Re-shape into beats</button>
        <div class="spacer">
          <span class="li-saved">{ICONS['check']} Saved</span>
          <button class="btn primary">{ICONS['check']} Save my message</button>
        </div>
      </div>
    </section>

    <div class="li-rough"><div class="li-rough-head">{ICONS['note']} Your rough answer <span class="chev">{ICONS['chevron']}</span></div></div>
  </div></div></main>
</div>
</div>
"""


def phrase_card(text, gloss, context, source, at, note, tags, status_cls, status_label, saved, practiced):
    ctx = f'<div class="pb-context"><em>&ldquo;{context}&rdquo;</em></div>' if context else ""
    nt = f'<div class="pb-note">{ICONS["note"]}{note}</div>' if note else ""
    tg = ""
    if tags:
        chips = "".join(
            f'<span class="pb-tag island">{t[1]}</span>' if t[0] else f'<span class="pb-tag">{t[1]}</span>'
            for t in tags
        )
        tg = f'<div class="pb-tags">{chips}</div>'
    return f"""
<article class="pb-card"><div class="pb-card-main">
  <div style="min-width:0">
    <h3 class="pb-phrase">{text}</h3>
    <p class="pb-gloss">{gloss}</p>
    {ctx}
    <div class="pb-source">{ICONS['play']}<a>{source}</a><span>· {at}</span></div>
    {nt}
    {tg}
  </div>
  <div class="pb-side">
    <span class="pb-status {status_cls}"><span class="dot"></span>{status_label}</span>
    <div class="pb-dates"><div>Saved {saved}</div><div>{practiced}</div></div>
  </div>
</div></article>"""


PHRASES = f"""
<div class="screen">
<div class="home-app pb-home">
  {sidebar('phrases')}
  <main class="main"><div class="main-inner">
    <div class="pb-head">
      <div>
        <h1 class="li-title" style="margin:0">Phrase Bank</h1>
        <div class="pb-head-meta"><b>34</b> phrases · <b>9</b> ready to use · <b>5</b> need a refresh</div>
      </div>
    </div>

    <div class="pb-meter">
      <div class="pb-meter-track">
        <div class="pb-meter-seg" style="flex:8;background:oklch(0.72 0.008 70)"></div>
        <div class="pb-meter-seg" style="flex:7;background:oklch(0.58 0.165 258)"></div>
        <div class="pb-meter-seg" style="flex:5;background:oklch(0.68 0.13 80)"></div>
        <div class="pb-meter-seg" style="flex:9;background:oklch(0.55 0.10 155)"></div>
        <div class="pb-meter-seg" style="flex:5;background:oklch(0.62 0.155 38)"></div>
      </div>
      <div class="pb-meter-legend">
        <span><i style="background:oklch(0.72 0.008 70)"></i>New <b>8</b></span>
        <span><i style="background:oklch(0.58 0.165 258)"></i>Recognizing <b>7</b></span>
        <span><i style="background:oklch(0.68 0.13 80)"></i>Practicing <b>5</b></span>
        <span><i style="background:oklch(0.55 0.10 155)"></i>Ready to use <b>9</b></span>
        <span><i style="background:oklch(0.62 0.155 38)"></i>Needs refresh <b>5</b></span>
      </div>
    </div>

    <div class="pb-searchbar">
      {ICONS['search']}
      <input value="why my project matters" disabled>
      <kbd>⌘K</kbd>
    </div>
    <p class="pb-search-hint">Searches your own phrases by English, Korean meaning, or what you&rsquo;re trying to say. Try <code>&ldquo;under pressure&rdquo;</code>.</p>

    <div class="pb-filters">
      <button class="pb-chip active">All <span class="n">34</span></button>
      <button class="pb-chip"><span class="dot" style="background:oklch(0.72 0.008 70)"></span>New <span class="n">8</span></button>
      <button class="pb-chip"><span class="dot" style="background:oklch(0.58 0.165 258)"></span>Recognizing <span class="n">7</span></button>
      <button class="pb-chip"><span class="dot" style="background:oklch(0.68 0.13 80)"></span>Practicing <span class="n">5</span></button>
      <button class="pb-chip"><span class="dot" style="background:oklch(0.55 0.10 155)"></span>Ready to use <span class="n">9</span></button>
      <button class="pb-chip"><span class="dot" style="background:oklch(0.62 0.155 38)"></span>Needs refresh <span class="n">5</span></button>
    </div>

    <div class="pb-count"><span>3 of 34 shown</span><span>Recently saved</span></div>

    <div class="pb-list">
      {phrase_card(
        "make the call under pressure",
        "압박이 있는 상황에서 최종 결정을 내리다",
        "Somebody has to make the call under pressure, and that somebody is you.",
        "The Newsroom · Don tells the Pilot", "1:04",
        "Use it when you want to claim the decision, not just the work.",
        [(True, "Explain what I do"), (False, "ownership")],
        "st-ready", "Ready to use", "Jul 18", "Practiced 2 days ago")}
      {phrase_card(
        "what I keep coming back to is",
        "제가 계속 되돌아가게 되는 지점은",
        "What I keep coming back to is the moment people freeze.",
        "Added manually", "—",
        None,
        [(True, "Explain what I do")],
        "st-practicing", "Practicing", "Jul 22", "Practiced yesterday")}
      {phrase_card(
        "I&rsquo;m especially interested in",
        "제가 특히 관심 있는 부분은",
        "I&rsquo;m especially interested in how people retrieve language, not how they collect it.",
        "Stanford eCorner · Founder talk", "12:41",
        None,
        [(False, "opening")],
        "st-refresh", "Needs refresh", "May 09", "Practiced 41 days ago")}
    </div>
  </div></main>
</div>
</div>
"""


PIPELINE_CSS = """
.pl { width:1600px; height:900px; background: oklch(0.985 0.004 70); color: oklch(0.24 0.012 60);
  font-family: "Pretendard Variable", ui-sans-serif, system-ui, sans-serif;
  padding: 74px 80px; display:flex; flex-direction:column; }
.pl-eyebrow { font-family:"JetBrains Mono",monospace; font-size:12px; letter-spacing:.14em;
  text-transform:uppercase; color: oklch(0.48 0.165 258); }
.pl-title { font-family:"Instrument Serif",serif; font-weight:400; font-size:46px; letter-spacing:-0.015em;
  margin:14px 0 0; }
.pl-lede { margin:12px 0 0; font-size:16px; line-height:1.6; color: oklch(0.58 0.010 60); max-width:74ch; }
.pl-row { display:flex; align-items:stretch; gap:0; margin-top:74px; }
.pl-stage { flex:1; background:#fff; border:1px solid oklch(0.945 0.005 70); border-radius:16px;
  box-shadow: 0 1px 0 oklch(1 0 0 / .6) inset, 0 1px 1.5px oklch(0 0 0 / .04), 0 4px 14px -8px oklch(0 0 0 / .10);
  padding:22px 20px 20px; display:flex; flex-direction:column; gap:10px; }
.pl-n { width:28px; height:28px; border-radius:50%; background: oklch(0.955 0.0264 258);
  color: oklch(0.48 0.165 258); display:grid; place-items:center;
  font-family:"JetBrains Mono",monospace; font-size:12.5px; }
.pl-name { font-family:"Instrument Serif",serif; font-size:24px; letter-spacing:-0.012em; }
.pl-io { font-family:"JetBrains Mono",monospace; font-size:11px; line-height:1.9; color: oklch(0.72 0.008 70); }
.pl-io b { color: oklch(0.42 0.011 60); font-weight:400; }
.pl-tool { margin-top:auto; font-size:12.5px; color: oklch(0.58 0.010 60); border-top:1px solid oklch(0.945 0.005 70);
  padding-top:12px; }
.pl-arrow { width:34px; display:grid; place-items:center; color: oklch(0.72 0.008 70); flex:none; }
.pl-ckpt { display:flex; align-items:center; gap:10px; margin-top:40px;
  font-size:13.5px; color: oklch(0.58 0.010 60); }
.pl-ckpt .pill { display:inline-flex; align-items:center; gap:8px; height:30px; padding:0 13px;
  border-radius:999px; background: oklch(0.955 0.0264 258); color: oklch(0.48 0.165 258);
  font-family:"JetBrains Mono",monospace; font-size:11.5px; letter-spacing:.04em; }
.pl-foot { margin-top:86px; display:flex; gap:56px; border-top:1px solid oklch(0.91 0.006 70); padding-top:24px; }
.pl-fact { display:flex; flex-direction:column; gap:5px; }
.pl-fact b { font-family:"Instrument Serif",serif; font-weight:400; font-size:30px; color: oklch(0.48 0.165 258); }
.pl-fact span { font-size:13px; color: oklch(0.58 0.010 60); }
"""

ARROW = ('<span class="pl-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" '
         'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M4 12h15"/><path d="m14 7 5 5-5 5"/></svg></span>')


def stage(n, name, src, out, tool):
    return f"""
<div class="pl-stage">
  <span class="pl-n">{n}</span>
  <div class="pl-name">{name}</div>
  <div class="pl-io">in &nbsp;<b>{src}</b><br>out <b>{out}</b></div>
  <div class="pl-tool">{tool}</div>
</div>"""


PIPELINE = f"""
<div class="screen"><div class="pl">
  <div class="pl-eyebrow">web/src/lib/pipeline/orchestrator.ts</div>
  <h1 class="pl-title">One upload, five stages, each one re-runnable</h1>
  <p class="pl-lede">Every stage reads the previous stage&rsquo;s checkpoint from R2 and writes its own. A failure in translation
  costs the translation, not the transcription, and a retry from a job card resumes exactly where it stopped.</p>

  <div class="pl-row">
    {stage(1, "extract", "source video", "audio.mp3", "ffmpeg-static · skipped for audio uploads")}
    {ARROW}
    {stage(2, "transcribe", "audio key", "raw_transcript.json", "ElevenLabs Scribe v2 · presigned R2 URL")}
    {ARROW}
    {stage(3, "postprocess", "raw transcript", "segments.json", "Pure Segment[] to Segment[] · unit tested")}
    {ARROW}
    {stage(4, "translate", "segments", "segments_translated.json", "GPT-4o-mini · batches of 5, matched by position")}
    {ARROW}
    {stage(5, "persist", "translated", "videos + segments", "Supabase rows · job marked ready")}
  </div>

  <div class="pl-ckpt">
    <span class="pill">R2 JSON CHECKPOINT</span>
    written after every stage, so retry is resumption rather than a restart.
  </div>

  <div class="pl-foot">
    <div class="pl-fact"><b>5</b><span>idempotent stages</span></div>
    <div class="pl-fact"><b>60 min</b><span>per-clip cap, to bound cost</span></div>
    <div class="pl-fact"><b>0</b><span>public third-party media ingested</span></div>
    <div class="pl-fact"><b>78</b><span>tests, all on the pure logic</span></div>
  </div>
</div></div>
"""


def main():
    css = "\n\n".join(p.read_text() for p in CSS_FILES) + PIPELINE_CSS
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
{FONT_LINKS}
<style>{SHIM}</style>
<style>{css}</style>
</head><body>
{ISLAND}
{PHRASES}
{PIPELINE}
</body></html>
"""
    OUT.write_text(html)
    print(f"wrote {OUT} ({len(html):,} bytes)")


if __name__ == "__main__":
    main()
