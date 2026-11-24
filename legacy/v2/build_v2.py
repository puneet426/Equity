"""Equity Classes v2: white base, brand plum and gold, 3D hero.

Content (faculty, achievers, reviews, contact) is shared with ../build.py.
Run:  python v2/build_v2.py      Output goes into v2/
"""
import html
import json
import math
import re
import sys
from pathlib import Path
from urllib.parse import quote

OUT = Path(__file__).parent
sys.path.insert(0, str(OUT.parent))
import build as D  # noqa: E402  (content only; its __main__ does not run)

e = html.escape
SITE = D.SITE
ICON = D.ICON
FACULTY, ACHIEVERS, REVIEWS = D.FACULTY, D.ACHIEVERS, D.REVIEWS
TAGLINE = "Creating a Financial Ecosystem"


def wa(msg):
    return f"https://wa.me/{D.WA_ENQUIRY}?text={quote(msg)}"


HELLO = "Hello Equity Classes, I would like to know about the next batch."


# ---------------------------------------------------------------- isometric steps
def iso_steps(top, left, right, stroke="none"):
    s, c30, s30 = 46, math.cos(math.pi / 6), math.sin(math.pi / 6)
    P = lambda x, y, z: ((x - y) * c30 * s, (x + y) * s30 * s - z * s)
    blocks = []
    for i, h in enumerate([0.9, 1.75, 2.6]):
        x0, x1 = 0, 1.15
        y0, y1 = -(i + 1) * 1.15, -i * 1.15
        faces = [
            ([(x0, y1, 0), (x1, y1, 0), (x1, y1, h), (x0, y1, h)], left),
            ([(x1, y0, 0), (x1, y1, 0), (x1, y1, h), (x1, y0, h)], right),
            ([(x0, y0, h), (x1, y0, h), (x1, y1, h), (x0, y1, h)], top),
        ]
        blocks.append(faces)
    pts = [P(*p) for b in blocks for f, _ in b for p in f]
    minx, maxx = min(p[0] for p in pts), max(p[0] for p in pts)
    miny, maxy = min(p[1] for p in pts), max(p[1] for p in pts)
    pad = 4
    out = []
    for faces in reversed(blocks):  # back (tallest) first
        g = []
        for poly, fill in faces:
            d = " ".join(f"{P(*p)[0] - minx + pad:.1f},{P(*p)[1] - miny + pad:.1f}" for p in poly)
            g.append(f'<polygon points="{d}" fill="{fill}" stroke="{stroke}" stroke-width="1" stroke-linejoin="round"/>')
        out.append(f'<g class="blk">{"".join(g)}</g>')
    w, h = maxx - minx + 2 * pad, maxy - miny + 2 * pad
    return f'<svg class="steps-svg" viewBox="0 0 {w:.0f} {h:.0f}" aria-hidden="true" focusable="false">{"".join(out)}</svg>'


def dial_svg():
    """Tick-mark dial laid flat under the 3D book, like the ring in the reel."""
    ticks = []
    for i in range(120):
        a = i * 3 * math.pi / 180
        r1, r2 = (188, 200) if i % 5 else (178, 200)
        ticks.append(f'<line x1="{200 + r1 * math.cos(a):.1f}" y1="{200 + r1 * math.sin(a):.1f}" '
                     f'x2="{200 + r2 * math.cos(a):.1f}" y2="{200 + r2 * math.sin(a):.1f}"/>')
    return ('<svg class="stage-dial" viewBox="0 0 400 400" aria-hidden="true" focusable="false">'
            '<g stroke="#f9c26a" stroke-width="1.2" opacity=".6">' + "".join(ticks) + '</g>'
            '<circle cx="200" cy="200" r="168" fill="none" stroke="#f9c26a" stroke-opacity=".5" stroke-width="1.4"/>'
            '<circle cx="200" cy="200" r="118" fill="none" stroke="#c9a8ee" stroke-opacity=".4" stroke-width="1"/></svg>')


# ---------------------------------------------------------------- shared chrome
def head(R, title, desc, path, extra=""):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en-IN" style="color-scheme: dark">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#1c0226">
<link rel="icon" href="{R}favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="{R}favicon.png">
<link rel="apple-touch-icon" href="{R}assets/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Equity Classes">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="{SITE}/assets/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(desc)}">
<meta name="twitter:image" content="{SITE}/assets/og.jpg">
<meta name="google-site-verification" content="fe1k1809DCJAvYMaVQtzkn2bsossO2tuWfnR9foXoaM">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Montserrat:wght@300;600;700;800&display=swap">
<link rel="stylesheet" href="{R}assets/css/site.css">
{extra}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def header(R, current=""):
    home = R or "./"
    links = [("Courses", f"{home}#courses"), ("Faculty", f"{home}#faculty"), ("Results", f"{R}results/"),
             ("Reviews", f"{home}#reviews"), ("Visit", f"{home}#visit")]
    nav = "".join(f'<a href="{h}"{" aria-current=\"page\"" if l == current else ""}>{l}</a>' for l, h in links)
    return f"""<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{home}" aria-label="Equity Classes, home">
      <img src="{R}assets/mark-160.png" alt="" width="30" height="33"><b>EQUITY <span>CLASSES</span></b>
    </a>
    <nav class="nav" aria-label="Main">{nav}</nav>
    <a class="header-call" href="tel:{D.PHONE_OFFICE}">{D.PHONE_OFFICE_SHOW}</a>
    <a class="btn header-cta" href="{wa(HELLO)}" target="_blank" rel="noopener">{ICON['wa']}WhatsApp us</a>
    <button class="menu-btn" type="button" data-menu-open aria-controls="menu-sheet" aria-expanded="false">Menu</button>
  </div>
</header>
<div class="menu-sheet" id="menu-sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="top"><b>EQUITY CLASSES</b><button class="close" type="button" data-menu-close>Close</button></div>
  <nav aria-label="Mobile">{"".join(f'<a href="{h}">{l}</a>' for l, h in links)}</nav>
  <div class="foot">
    <a href="tel:{D.PHONE_OFFICE}">Call {D.PHONE_OFFICE_SHOW}</a>
    <span>{D.ADDRESS_1}, Lalpur</span><span>{D.HOURS}</span>
  </div>
</div>
"""


def footer(R):
    home = R or "./"
    return f"""<footer class="site-footer on-plum">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <p class="foot-brand">EQUITY<span>CLASSES</span></p>
        <p class="foot-tag">{TAGLINE}</p>
        <p>CA and CS coaching in Lalpur, Ranchi.<br>{D.LEGAL}</p>
      </div>
      <div>
        <h2>Visit</h2>
        <p>{D.ADDRESS_1}<br>{D.ADDRESS_2}<br>{D.ADDRESS_NOTE}</p>
        <p>{D.HOURS}<br>Closed on Sunday</p>
      </div>
      <div>
        <h2>Contact</h2>
        <ul>
          <li><a href="tel:{D.PHONE_OFFICE}">{D.PHONE_OFFICE_SHOW}</a></li>
          <li><a href="https://wa.me/{D.WA_ENQUIRY}" target="_blank" rel="noopener">WhatsApp 87978 34974</a></li>
          <li><a href="mailto:{D.EMAIL}">{D.EMAIL}</a></li>
          <li><a href="{D.INSTAGRAM}" target="_blank" rel="noopener">Instagram @equityclasses</a></li>
          <li><a href="{D.LINKTREE}" target="_blank" rel="noopener">All links (Linktree)</a></li>
        </ul>
      </div>
      <div>
        <h2>Pages</h2>
        <ul>
          <li><a href="{home}#courses">Courses</a></li>
          <li><a href="{home}#faculty">Faculty</a></li>
          <li><a href="{R}results/">All achievers</a></li>
          <li><a href="{home}#reviews">Reviews</a></li>
          <li><a href="{home}#faq">Questions</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-base">
      <span>&copy; <span data-year>2026</span> Equity Edutech Pvt. Ltd.</span>
      <span>Assets = Liabilities + Equity</span>
    </div>
  </div>
</footer>
<nav class="action-bar" aria-label="Quick contact">
  <a href="tel:{D.PHONE_OFFICE}">{ICON['phone']}Call</a>
  <a href="{wa(HELLO)}" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a>
</nav>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<script src="{R}assets/js/site.js" defer></script>
<script>document.querySelectorAll("[data-year]").forEach(function(n){{n.textContent=new Date().getFullYear()}})</script>
</body>
</html>
"""


def img_ach(R, slug):
    return f"{R}assets/achievers/{slug}.webp"


def write(path, text):
    p = OUT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    print("wrote v2/" + path)


# ---------------------------------------------------------------- home
def home():
    R = ""
    byid = {f["id"]: f for f in FACULTY}
    lead = [f for f in FACULTY if f.get("lead")]
    rest = [f for f in FACULTY if not f.get("lead")]
    topper = ACHIEVERS[0]
    ca = [a for a in ACHIEVERS[1:] if a[2] == "CA"]
    cs = [a for a in ACHIEVERS if a[2] == "CS"]
    ring = [x for p in zip(ca, cs) for x in p][:16]
    n_ca = len([a for a in ACHIEVERS if a[2] == "CA"])

    ring_items = "".join(
        f'<li><img src="{img_ach(R, s)}" alt="{e(n)}, {c} achiever" width="112" height="112" loading="lazy" draggable="false"><b>{e(n)}</b><span>{c}</span></li>'
        for n, s, c, _ in ring)
    flat_items = "".join(
        f'<li><img src="{img_ach(R, s)}" alt="" width="88" height="88" loading="lazy"><b>{e(n)}</b></li>' for n, s, c, _ in ring[:12])

    leads_html = "".join(f"""
      <a class="lead tilt" href="faculty/{f['id']}/">
        <img src="assets/team/{f['id']}.webp" alt="Portrait of {e(f['name'])}" width="400" height="400" loading="lazy">
        <div>
          <span class="role">{e(f['role'])} · {e(f['experience'])}</span>
          <h3>{e(f['name'])}</h3>
          <p>{e(f['short'])}</p>
          <span class="more">Read profile</span>
        </div>
      </a>""" for f in lead)
    roster_html = "".join(f"""
      <li><a href="faculty/{f['id']}/"><img src="assets/team/thumb-{f['id']}.webp" alt="" width="76" height="76" loading="lazy"><div><b>{e(f['name'])}</b><span>{e(f['expertise'])}{(' · ' + e(f['level'])) if f.get('level') else ''}</span></div></a></li>"""
                          for f in rest)

    teach_rows = [
        ("Accounts, Taxation, Costing", "ashish-sultania", ""), ("Law and Audit", "mona-mohta", ""),
        ("Ind AS and Financial Reporting", "harsh-agarwal", "CA Final"), ("Taxation and Audit", "vishal-chandra", "CA Final"),
        ("Mathematics", "shankar-kinger", "CA Foundation, CSEET"),
        ("Business Environment, Capital Markets, Strategic Management", "himanshu-chitlangia", ""),
        ("Company Law and corporate compliance", "shikha-agarwal", "CS"),
        ("Corporate compliance and governance", "minakshi-agarwal", "CS"),
        ("Commercial, Constitutional and Administrative Law", "shubham-kataruka", ""),
    ]
    teach_html = "".join(
        f'<tr><td>{e(s)}</td><td><a class="link" href="faculty/{i}/">{e(byid[i]["name"])}</a></td><td>{e(lv)}</td></tr>'
        for s, i, lv in teach_rows)

    reviews_html = "".join(
        f'<blockquote class="review"><p>{e(t)}</p><footer><i aria-hidden="true">{e(n[0])}</i><span>{e(n)}<small>Google review</small></span></footer></blockquote>'
        for n, t in [REVIEWS[4]] + [r for i, r in enumerate(REVIEWS) if i != 4])

    courses = ["CA Foundation", "CA Intermediate", "CA Final", "CSEET", "CS Executive", "CS Professional", "Not sure yet"]
    chips = "".join(f'<label><input type="radio" name="course" value="{c}"><span>{c}</span></label>' for c in courses)

    faq = [
        ("Where exactly is the institute?",
         f'Unit 504, H Square Mall, opposite Pranami Heights in Lalpur, Ranchi, next to Mocha. <a class="link" href="{D.MAP_LINK}" target="_blank" rel="noopener">Open it in Google Maps</a>.'),
        ("What are the office hours?",
         "Monday to Saturday, 10:30 AM to 7:00 PM. We are closed on Sunday. Calls and WhatsApp messages sent after hours are answered the next working day."),
        ("What are the fees, and when does the next batch start?",
         f'Fees depend on the course, the level and the batch, so we share the current fee sheet and start dates directly. <a class="link" href="{wa("Hello Equity Classes, please share the fee sheet and next batch dates.")}" target="_blank" rel="noopener">Ask on WhatsApp</a> or call {D.PHONE_OFFICE_SHOW}.'),
        ("Can we talk to someone before joining?",
         f"Yes. Counselling is free. Call {D.PHONE_OFFICE_SHOW} and we will talk through which level to start with and what the course involves, or visit the institute during office hours."),
        ("Do you teach both CA and CS?",
         "Yes. For CA we coach Foundation, Intermediate and Final. For CS we coach CSEET, Executive and Professional."),
    ]
    faq_html = "".join(f"<details><summary>{e(q)}</summary><p>{a}</p></details>" for q, a in faq)
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": html.unescape(re.sub(r"<[^>]+>", "", a))}}
        for q, a in faq]}

    steps_ca = iso_steps("#f9c26a", "#7a3fae", "#5e268a")
    steps_cs = iso_steps("#ffffff", "#5e268a", "#3c0066", stroke="#e4dbee")

    three = """<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<script type="module" src="assets/js/book3d.js"></script>
"""

    body = f"""{header(R)}
<main id="main">

<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker">CA and CS coaching · Lalpur, Ranchi</p>
      <h1 id="hero-title"><span class="ln">Become a CA.</span><br><span class="thin ln">Or a CS.</span><br><span class="ln">Start in <span class="under">Ranchi</span>.</span></h1>
      <p class="lede"><b>Foundation to Final. CSEET to Professional.</b> {len(FACULTY)} teachers, including practising CAs, CSs and a High Court advocate, in H Square Mall, Lalpur.</p>
      <div class="actions">
        <a class="btn" href="tel:{D.PHONE_OFFICE}">{ICON['phone']}Book a free counselling call</a>
        <a class="btn btn--ghost" href="#courses">See the courses</a>
      </div>
      <a class="rating-pill" href="{D.MAP_LINK}" target="_blank" rel="noopener"><b>{D.GOOGLE_RATING}</b><span class="stars" aria-hidden="true">★★★★★</span>{D.GOOGLE_REVIEWS} Google reviews</a>
    </div>
    <div class="stage">
      {dial_svg()}
      <div class="stage-canvas" id="book3d" role="img" aria-label="The Equity Classes book logo in 3D, with gold orbits around it">
        <img class="fallback" src="assets/mark.png" alt="" width="487" height="540">
      </div>
      <p class="stage-tag stage-tag--a">State Topper<span>{e(topper[0])}, CA Foundation</span></p>
      <p class="stage-tag stage-tag--b">{D.PASS_RATE}% pass rate<span>by the institute's own count</span></p>
      <p class="stage-tag stage-tag--c">{TAGLINE}</p>
    </div>
  </div>
  <div class="wrap">
    <div class="facts-strip">
      <ul>
        <li><b>{D.GOOGLE_RATING}<small> / 5</small></b><span>Google rating, {D.GOOGLE_REVIEWS} reviews</span></li>
        <li><b>{D.PASS_RATE}<small>%</small></b><span>Pass rate</span></li>
        <li><b>{len(ACHIEVERS)}</b><span>Achievers named on this site</span></li>
        <li><b>{len(FACULTY)}</b><span>Faculty, CA, CS, CMA, LL.M</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="photo-band" aria-label="Our students">
  <div class="wrap">
    <figure class="photo-frame">
      <img src="assets/hero-bg.webp" srcset="assets/hero-960.webp 960w, assets/hero-bg.webp 1920w" sizes="(max-width: 1300px) 100vw, 1260px" alt="Around sixty Equity Classes students in navy institute T-shirts pose together on a green turf court beneath an Equity Classes banner" width="1920" height="1080" loading="lazy">
      <figcaption>Equity Classes students, Ranchi</figcaption>
    </figure>
  </div>
</section>

<section class="section" id="courses" aria-labelledby="courses-title">
  <div class="wrap">
    <div class="head reveal">
      <div><p class="kicker">Courses</p><h2 id="courses-title">Two tracks. <span class="thin">Six exams.</span></h2></div>
      <p>Join at the level you are at now. Each subject is taught by a specialist in it, and the table further down shows who teaches what.</p>
    </div>
    <div class="tracks">
      <article class="track track--ca" aria-labelledby="ca-t">
        <div class="track-head"><div><h3 id="ca-t">CA</h3><p class="body-sm">Chartered Accountancy · ICAI</p></div></div>
        <p>Full preparation for CA Foundation, Intermediate and Final, with structured study material written around the exam.</p>
        <div class="steps-wrap">
          {steps_ca}
          <ol class="levels">
            <li><b>CA Foundation</b><span>The entry exam after Class 12.</span></li>
            <li><b>CA Intermediate</b><span>The second level, after Foundation.</span></li>
            <li><b>CA Final</b><span>The last level. Taught by practising CAs.</span></li>
          </ol>
        </div>
        <ul class="chips-row" aria-label="Included in CA coaching"><li>Concepts first</li><li>Exam-oriented notes</li><li>Regular mock tests</li></ul>
        <a class="btn" href="{wa('Hello Equity Classes, I want to know about CA batches.')}" target="_blank" rel="noopener">{ICON['wa']}Ask about CA batches</a>
      </article>
      <article class="track track--cs" aria-labelledby="cs-t">
        <div class="track-head"><div><h3 id="cs-t">CS</h3><p class="body-sm">Company Secretary · ICSI</p></div></div>
        <p>Complete coaching for CSEET, CS Executive and CS Professional, with in-depth subject coverage and mentoring for each student.</p>
        <div class="steps-wrap">
          {steps_cs}
          <ol class="levels">
            <li><b>CSEET</b><span>The entrance test for the CS course.</span></li>
            <li><b>CS Executive</b><span>Company law, tax and the core papers.</span></li>
            <li><b>CS Professional</b><span>The final level of the CS course.</span></li>
          </ol>
        </div>
        <ul class="chips-row" aria-label="Included in CS coaching"><li>Individual attention</li><li>Doubt-clearing sessions</li><li>Structured curriculum</li></ul>
        <a class="btn" href="{wa('Hello Equity Classes, I want to know about CS batches.')}" target="_blank" rel="noopener">{ICON['wa']}Ask about CS batches</a>
      </article>
    </div>
    <div class="teach">
      <div><h3>Who teaches what</h3><p>Every subject has its own teacher. Tap a name to read their profile.</p></div>
      <table>
        <thead><tr><th scope="col">Subject</th><th scope="col">Teacher</th><th scope="col">Level</th></tr></thead>
        <tbody>{teach_html}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="section on-plum" id="method" aria-labelledby="method-title">
  <div class="wrap method-grid">
    <div class="reveal">
      <p class="kicker">How classes run</p>
      <h2 id="method-title">Small rooms. <span class="thin">Every doubt answered.</span></h2>
      <p>Professional exams are long and the syllabus is heavy. What helps most is a teacher who knows where you are stuck, and a place where asking is normal.</p>
      <blockquote class="pull">
        <p>"The environment is so friendly and competitive at the same time."</p>
        <footer>{e(REVIEWS[0][0])}, on Google</footer>
      </blockquote>
    </div>
    <ol class="points">
      <li><b>Small batches</b><p>Batches are kept small so every student gets personal guidance, and the teacher knows your name.</p></li>
      <li><b>Concepts before shortcuts</b><p>We teach why an entry or a section works, so it stays with you past the exam hall.</p></li>
      <li><b>Notes written for the exam</b><p>Exam-oriented notes and properly curated study material, so you are not hunting through five books.</p></li>
      <li><b>Separate doubt sessions</b><p>Dedicated time for questions, outside the lecture, answered with patience.</p></li>
      <li><b>Regular mock tests</b><p>You write papers under exam conditions long before the real one.</p></li>
      <li><b>A room that pushes you</b><p>A friendly, competitive atmosphere. Students push each other along.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="results" aria-labelledby="results-title">
  <div class="wrap">
    <div class="head reveal">
      <div><p class="kicker">Results</p><h2 id="results-title">The students <span class="thin">who passed.</span></h2></div>
      <p>{len(ACHIEVERS)} Equity Classes students who cleared their CA or CS exams, with their photos. {n_ca} in CA and {len(cs)} in CS so far.</p>
    </div>
    <div class="results-top">
      <div>
        <article class="topper">
          <span class="ribbon">State<br>Topper</span>
          <img src="{img_ach(R, topper[1])}" alt="{e(topper[0])}, State Topper in CA Foundation" width="208" height="208" loading="lazy">
          <h3>{e(topper[0])}</h3>
          <p>State Topper, CA Foundation</p>
        </article>
        <div class="pass-row">
          <div><b>{D.PASS_RATE}%</b><span>pass rate, by the institute's count</span></div>
          <div><b>{len(ACHIEVERS)}</b><span>named achievers</span></div>
        </div>
      </div>
      <div>
        <div class="ring-stage" tabindex="0" aria-label="Rotating ring of {len(ring)} achievers. Drag, or use the left and right arrow keys, to turn it.">
          <ul class="ring">{ring_items}</ul>
          <div class="ring-floor"></div>
        </div>
        <ul class="ring-flat">{flat_items}</ul>
        <div class="results-foot">
          <a class="btn btn--ghost" href="results/">See all {len(ACHIEVERS)} achievers</a>
          <span class="hint">Drag the ring to turn it</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section fac-bg" id="faculty" aria-labelledby="faculty-title">
  <div class="wrap">
    <div class="head reveal">
      <div><p class="kicker">Faculty</p><h2 id="faculty-title">Who <span class="thin">teaches you.</span></h2></div>
      <p>Chartered Accountants, Company Secretaries, a cost accountant, an MBA and a practising advocate. Some of them still work in practice alongside teaching.</p>
    </div>
    <div class="leads">{leads_html}
    </div>
    <ul class="roster">{roster_html}
    </ul>
  </div>
</section>

<section class="section" id="reviews" aria-labelledby="reviews-title">
  <div class="wrap">
    <div class="reviews-head reveal">
      <div><p class="kicker">Reviews</p><h2 id="reviews-title">What students <span class="thin">say about us.</span></h2></div>
      <a class="score" href="{D.MAP_LINK}" target="_blank" rel="noopener"><b>{D.GOOGLE_RATING}</b><span><span class="stars" aria-hidden="true">★★★★★</span>{D.GOOGLE_REVIEWS} reviews on Google. Read them all</span></a>
    </div>
    <div class="review-cols">{reviews_html}</div>
  </div>
</section>

<section class="section visit" id="visit" aria-labelledby="visit-title" style="padding-top:0">
  <div class="wrap visit-grid">
    <div>
      <p class="kicker">Visit or enquire</p>
      <h2 id="visit-title">Drop in, <span class="thin">or send a message.</span></h2>
      <dl class="facts">
        <div><dt>Address</dt><dd>{D.ADDRESS_1},<br>{D.ADDRESS_2}. {D.ADDRESS_NOTE}.</dd></div>
        <div><dt>Hours</dt><dd>{D.HOURS}. Closed Sunday.</dd></div>
        <div><dt>Phone</dt><dd><a class="link" href="tel:{D.PHONE_OFFICE}">{D.PHONE_OFFICE_SHOW}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a class="link" href="https://wa.me/{D.WA_ENQUIRY}" target="_blank" rel="noopener">87978 34974</a></dd></div>
        <div><dt>Email</dt><dd><a class="link" href="mailto:{D.EMAIL}">{D.EMAIL}</a></dd></div>
      </dl>
      <iframe class="map" src="{D.MAP_EMBED}" title="Map: Equity Classes, H Square Mall, Lalpur, Ranchi" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <form class="form-card" id="enquiry" data-wa="{D.WA_ENQUIRY}" novalidate>
      <h3>Ask about the next batch</h3>
      <p>Fill this in and WhatsApp opens with your message ready to send. We reply during office hours.</p>
      <div class="field" data-field="name">
        <label for="f-name">Student's name</label>
        <input id="f-name" name="name" autocomplete="name" required aria-describedby="e-name">
        <p class="err" id="e-name" aria-live="polite"></p>
      </div>
      <div class="field" data-field="phone">
        <label for="f-phone">Mobile number</label>
        <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="98765 43210" required aria-describedby="e-phone">
        <p class="err" id="e-phone" aria-live="polite"></p>
      </div>
      <fieldset class="field" data-field="course" aria-describedby="e-course">
        <legend>Preparing for</legend>
        <div class="chips">{chips}</div>
        <p class="err" id="e-course" aria-live="polite"></p>
      </fieldset>
      <div class="field" data-field="stage">
        <label for="f-stage">Where are you now? <span class="hint">(optional)</span></label>
        <select id="f-stage" name="stage">
          <option value="">Choose one</option>
          <option>In Class 11</option><option>In Class 12</option><option>Finished Class 12</option>
          <option>In college / graduate</option><option>Already registered with ICAI / ICSI</option><option>Parent enquiring</option>
        </select>
      </div>
      <div class="field" data-field="note">
        <label for="f-note">Anything else? <span class="hint">(optional)</span></label>
        <textarea id="f-note" name="note" rows="3" placeholder="Preferred timing, attempt month, subjects you find hard"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn" type="submit">{ICON['wa']}Send on WhatsApp</button>
        <small>Or call <a class="link" href="tel:{D.PHONE_OFFICE}">{D.PHONE_OFFICE_SHOW}</a></small>
      </div>
      <div class="form-status" role="status" tabindex="-1" hidden></div>
    </form>
  </div>
</section>

<section class="section section--tight" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-grid">
    <h2 id="faq-title">Questions we hear at the front desk</h2>
    <div class="faq">{faq_html}</div>
  </div>
</section>

<section class="wrap" aria-label="Contact Equity Classes">
  <div class="closer">
    <img src="assets/logo-round-240.png" alt="Equity Classes logo: {TAGLINE}" width="120" height="120" loading="lazy">
    <div>
      <h2>{TAGLINE.split(' a ')[0]} a <span class="thin">{TAGLINE.split(' a ')[1]}.</span></h2>
      <p>Unit 504, H Square Mall, Lalpur. Monday to Saturday, 10:30 AM to 7 PM.</p>
    </div>
    <div class="actions">
      <a class="btn btn--gold" href="tel:{D.PHONE_OFFICE}">{ICON['phone']}Call {D.PHONE_OFFICE_SHOW}</a>
      <a class="btn btn--ghost" href="{wa(HELLO)}" target="_blank" rel="noopener" style="color:var(--on-plum);border-color:#ffffff55">{ICON['wa']}WhatsApp us</a>
    </div>
  </div>
</section>

</main>
{footer(R)}"""
    write("index.html", head(R, "Equity Classes | CA & CS Coaching in Lalpur, Ranchi",
                             f"CA Foundation, Intermediate and Final, and CSEET, CS Executive and Professional coaching in H Square Mall, Lalpur, Ranchi. {D.GOOGLE_RATING} on Google from {D.GOOGLE_REVIEWS} reviews.",
                             "/", extra=D.jsonld(D.ORG_LD | {"image": SITE + "/assets/og.jpg", "slogan": TAGLINE}) + D.jsonld(faq_ld) + three) + body)


# ---------------------------------------------------------------- results
def results_page():
    R = "../"
    n_ca = len([a for a in ACHIEVERS if a[2] == "CA"])
    items = "".join(
        f'<li data-cat="{c}" data-name="{e(n.lower())}"><img src="{img_ach(R, s)}" alt="{e(n)}, {c} achiever at Equity Classes" width="112" height="112"{"" if i < 14 else " loading=lazy"}><b>{e(n)}</b><span>{c}{" · STATE TOPPER" if note else ""}</span></li>'
        for i, (n, s, c, note) in enumerate(ACHIEVERS))
    body = f"""{header(R, 'Results')}
<main id="main">
  <div class="page-head"><div class="wrap">
    <p class="crumb"><a href="../">Home</a> / Results</p>
    <h1>Our <span class="thin">achievers</span></h1>
    <p class="intro">{len(ACHIEVERS)} Equity Classes students who cleared their CA or CS exams: {n_ca} in CA and {len(ACHIEVERS) - n_ca} in CS. Rudra Raj Dawn topped the state in CA Foundation.</p>
  </div></div>
  <div class="wrap" style="padding-bottom:2rem">
    <div class="toolbar">
      <div class="seg" role="group" aria-label="Filter by course">
        <button type="button" data-filter="all" aria-pressed="true">All</button>
        <button type="button" data-filter="CA" aria-pressed="false">CA</button>
        <button type="button" data-filter="CS" aria-pressed="false">CS</button>
      </div>
      <div class="search"><label for="achiever-search">Find a name</label><input id="achiever-search" type="search" autocomplete="off" placeholder="Type a first name"></div>
    </div>
    <p class="count" id="achiever-count" aria-live="polite">Showing {len(ACHIEVERS)} of {len(ACHIEVERS)} achievers</p>
    <ul class="faces" id="achievers">{items}</ul>
    <div class="empty" id="achiever-empty" hidden><p>No achiever by that name.</p><button class="btn btn--ghost" type="button" id="achiever-reset">Clear the search</button></div>
  </div>
</main>
{footer(R)}"""
    write("results/index.html", head(R, "Results & Achievers | Equity Classes, Ranchi",
                                     f"{len(ACHIEVERS)} CA and CS achievers from Equity Classes, Ranchi, including State Topper Rudra Raj Dawn (CA Foundation).",
                                     "/results") + body)


# ---------------------------------------------------------------- faculty
def faculty_pages():
    R = "../../"
    for f in FACULTY:
        others = "".join(
            f'<li><a href="../{o["id"]}/"><img src="{R}assets/team/thumb-{o["id"]}.webp" alt="" width="76" height="76" loading="lazy"><div><b>{e(o["name"])}</b><span>{e(o["expertise"])}</span></div></a></li>'
            for o in FACULTY if o["id"] != f["id"])
        facts = ([("Qualified", f["qualifications"])] if f.get("qualifications") else []) + \
                ([("Experience", f["experience"])] if f.get("experience") else []) + [("Teaches", f["expertise"])] + \
                ([("Level", f["level"])] if f.get("level") else [])
        facts_html = "".join(f"<div><dt>{k}</dt><dd>{e(v)}</dd></div>" for k, v in facts)
        li = f'<a class="link" href="{f["linkedin"]}" target="_blank" rel="noopener">LinkedIn profile</a>' if f.get("linkedin") else ""
        parts = f["name"].split()
        first = parts[1] if parts[0] in ("CS", "CA", "Prof.", "Adv.") else parts[0]
        ld = {"@context": "https://schema.org", "@type": "Person", "name": f["name"], "jobTitle": f["role"],
              "image": f"{SITE}/assets/team/{f['id']}.webp", "knowsAbout": f["expertise"],
              "worksFor": {"@type": "EducationalOrganization", "name": "Equity Classes", "url": SITE + "/"}}
        if f.get("linkedin"): ld["sameAs"] = [f["linkedin"]]
        body = f"""{header(R)}
<main id="main">
  <div class="wrap">
    <article class="profile">
      <div class="profile-photo">
        <p class="crumb"><a href="{R}">Home</a> / <a href="{R}#faculty">Faculty</a></p>
        <img src="{R}assets/team/{f['id']}.webp" alt="Portrait of {e(f['name'])}" width="400" height="400">
      </div>
      <div>
        <span class="role">{e(f['role'])} · Equity Classes</span>
        <h1>{e(f['name'])}</h1>
        <p class="bio">{e(f['bio'])}</p>
        <dl class="facts">{facts_html}</dl>
        <div class="actions">
          <a class="btn" href="{wa(f'Hello Equity Classes, I would like to know about classes with {f["name"]}.')}" target="_blank" rel="noopener">{ICON['wa']}Ask about {e(first)}'s classes</a>
          {li}
        </div>
      </div>
    </article>
    <section aria-labelledby="others" style="padding-bottom:1rem">
      <h2 id="others" style="font-size:var(--s2);color:var(--plum);margin-bottom:1.2rem">Other faculty</h2>
      <ul class="roster">{others}</ul>
    </section>
  </div>
</main>
{footer(R)}"""
        write(f"faculty/{f['id']}/index.html",
              head(R, f"{f['name']}, {f['role']} | Equity Classes, Ranchi",
                   f"{f['name']} teaches {f['expertise']} at Equity Classes, Lalpur, Ranchi.",
                   f"/faculty/{f['id']}", extra=D.jsonld(ld)) + body)


def mona_card():
    R = "../"
    body = f"""<main id="main" class="card-page">
  <article class="vcard">
    <div class="vcard-top">
      <a class="brand-sm" href="../">EQUITY <span>CLASSES</span></a>
      <h1><small>Founder &amp; Director</small>Mona<br>Mohta</h1>
      <img src="{R}assets/team/mona-mohta.webp" alt="Portrait of Mona Mohta" width="130" height="162">
    </div>
    <div class="vcard-body">
      <a class="btn" href="{R}mona-mohta.vcf" download="Mona_Mohta_Equity_Classes.vcf">Save to contacts</a>
      <nav class="vcard-links" aria-label="Contact Mona Mohta">
        <a href="tel:+917549114051">{ICON['phone']}Call</a>
        <a href="https://wa.me/917549114051" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a>
        <a href="mailto:{D.EMAIL}">{ICON['mail']}Email</a>
        <a href="../">{ICON['web']}Website</a>
      </nav>
      <dl class="facts">
        <div><dt>Mobile</dt><dd><a class="link" href="tel:+917549114051">+91 75491 14051</a></dd></div>
        <div><dt>Office</dt><dd><a class="link" href="tel:{D.PHONE_OFFICE}">+91 92884 84448</a></dd></div>
        <div><dt>Email</dt><dd><a class="link" href="mailto:{D.EMAIL}">{D.EMAIL}</a></dd></div>
        <div><dt>Address</dt><dd>504, H Square Building, opp. Pranami Heights, Lalpur, Ranchi 834001</dd></div>
      </dl>
      <p style="font-size:.84rem;color:var(--ink-2);margin:0">{D.LEGAL}</p>
    </div>
  </article>
</main>
</body></html>"""
    write("mona/index.html", head(R, "Mona Mohta | Founder & Director, Equity Classes",
                                  "Contact Mona Mohta, Founder & Director of Equity Classes, Ranchi.", "/mona") + body)


def not_found():
    R = "/"
    body = f"""{header(R)}
<main id="main"><div class="page-head"><div class="wrap">
  <p class="kicker">Error 404</p>
  <h1>This page <span class="thin">doesn't balance.</span></h1>
  <p class="intro">The page you were looking for has moved or never existed. The courses, faculty and results are all still here.</p>
  <p style="margin-top:2rem;display:flex;gap:.8rem;flex-wrap:wrap"><a class="btn" href="/">Go to the home page</a><a class="btn btn--ghost" href="/results/">See our results</a></p>
</div></div></main>
{footer(R)}"""
    write("404.html", head(R, "Page not found | Equity Classes", "This page could not be found.", "/404") + body)


def sitemap():
    urls = ["/", "/results"] + [f"/faculty/{f['id']}" for f in FACULTY]
    write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + "".join(f"  <url><loc>{SITE}{u}</loc></url>\n" for u in urls) + "</urlset>\n")
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")


if __name__ == "__main__":
    home()
    results_page()
    faculty_pages()
    mona_card()
    not_found()
    sitemap()
