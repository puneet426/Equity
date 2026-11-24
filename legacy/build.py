"""Builds the Equity Classes website into static HTML.

Run:  python build.py
Edit the content in the DATA section below, then run it again.
Output: index.html, results/, faculty/<id>/, mona/, 404.html, sitemap.xml, robots.txt
"""
import html
import json
import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parent
SITE = "https://equityclasses.in"

# =====================================================================
# DATA (taken from the client's existing site)
# =====================================================================
PHONE_OFFICE = "+919288484448"
PHONE_OFFICE_SHOW = "092884 84448"
WA_ENQUIRY = "918797834974"
EMAIL = "equityclassesranchi@gmail.com"
INSTAGRAM = "https://www.instagram.com/equityclasses/"
LINKTREE = "https://linktr.ee/equityclasses"
ADDRESS_1 = "H Square Mall, Unit 504, opposite Pranami Heights"
ADDRESS_2 = "Lalpur, Ranchi, Jharkhand 834001"
ADDRESS_NOTE = "Next to Mocha"
HOURS = "Mon to Sat, 10:30 AM to 7:00 PM"
MAP_EMBED = "https://www.google.com/maps?q=H+Square+Mall,+504,+opposite+Pranami+Heights,+Lalpur,+Ranchi,+Jharkhand+834001&output=embed"
MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Equity+Classes+H+Square+Mall+Lalpur+Ranchi"
GOOGLE_RATING = "5.0"
GOOGLE_REVIEWS = 202          # CLIENT: update when the count changes
PASS_RATE = 86                # CLIENT: confirm which attempt this figure is from
LEGAL = "A unit of Equity Edutech Pvt. Ltd."

FACULTY = [
    dict(id="mona-mohta", name="CS Mona Mohta", role="Founder & Director", lead=True,
         experience="7+ years teaching", expertise="Law and Audit",
         short="Founded Equity Classes and teaches Law and Audit. Students know her for a friendly, student-first approach.",
         linkedin="https://linkedin.com/in/mona-mohta-044056346",
         bio="CS Mona Mohta founded Equity Classes and teaches there herself. She has over seven years in the classroom and teaches Law and Audit. Students know her for a friendly, student-first approach: she learns who her students are, and her classes are informative and enjoyable in equal measure. The institute runs on the same idea, with engagement and mutual respect between teacher and student."),
    dict(id="ashish-sultania", name="Prof. Ashish Sultania", role="Academic Head", lead=True,
         experience="20 years teaching", expertise="Accounts, Taxation and Costing",
         short="Leads the academic side and teaches Accounts, Taxation and Costing. Has guided many students to top All-India Ranks.",
         bio="Prof. Ashish Sultania has taught for two decades and leads the academic side of Equity Classes. He teaches Accounts, Taxation and Costing, and has guided many students to top All-India Ranks. Students come to him for his depth of subject knowledge and his high standards."),
    dict(id="harsh-agarwal", name="CA Harsh Agarwal", role="Faculty",
         expertise="Ind AS / AS and Financial Reporting", level="CA Final",
         linkedin="https://linkedin.com/in/caharsh0210",
         bio="A practising Chartered Accountant, CA Harsh Agarwal teaches Indian Accounting Standards (Ind AS) and Financial Reporting at the CA Final level. He brings the rigour of practice into the classroom, with a focus on how financial statements are actually interpreted and presented. He teaches for understanding rather than rote learning, so students can handle the scenarios the exam throws at them."),
    dict(id="vishal-chandra", name="CA Vishal Chandra", role="Faculty",
         qualifications="FCA, CMA, B.Com (Hons.)", experience="10+ years in practice",
         expertise="Taxation and Audit", level="CA Final",
         linkedin="https://linkedin.com/in/ca-vishal-chandra-9620b17b",
         bio="CA Vishal Chandra is qualified as both a Chartered Accountant and a Cost & Management Accountant, with over a decade of practical work in Taxation and Audit. He teaches CA Final, where he connects theory to real cases and turns the hardest standards into logical, scoring answers."),
    dict(id="shankar-kinger", name="Shankar Kinger", role="Faculty",
         experience="23+ years teaching", expertise="Mathematics", level="CA Foundation, CSEET",
         bio="Shankar Kinger has taught Mathematics for over 23 years and has taken a great many students through the quantitative papers of CA Foundation and CSEET. He teaches interactively and gives personal attention, so students who fear maths come out of his classes confident."),
    dict(id="himanshu-chitlangia", name="Himanshu Chitlangia", role="Faculty",
         qualifications="MBA (Silver Medalist)", experience="10+ years (8 teaching, 2 corporate)",
         expertise="Business Environment, Capital Markets and Strategic Management",
         linkedin="https://linkedin.com/in/himanshu-chitlangia-610205107",
         bio="Himanshu Chitlangia is an MBA silver medalist with ten years of experience: two in the corporate sector and eight in teaching. He teaches Business Environment, Capital Markets and Strategic Management through applied examples, so students learn to think the way real businesses are run."),
    dict(id="shubham-modi", name="CA Shubham Modi", role="Faculty",
         qualifications="FCA, CS, B.Com (A&F), DISA", expertise="Financial subjects",
         bio="CA Shubham Modi has years of experience as faculty with ICAI and knows the hardest professional papers closely. His teaching is clear and high-energy, and he is known for breaking abstract topics into simple steps that students can act on."),
    dict(id="shubham-kataruka", name="Adv. Shubham Kataruka", role="Faculty",
         qualifications="B.A. LL.B. (Hons.), LL.M. Finance and Corporate Law",
         expertise="Law: commercial, constitutional and administrative",
         linkedin="https://linkedin.com/in/shubham-kataruka-8a2910110",
         bio="Adv. Shubham Kataruka practises at the Jharkhand High Court in commercial litigation, arbitration and writ matters. He holds an LL.M. in Corporate and Financial Law from Jindal Global Law School and a B.A. LL.B. (Hons.) from Nirma University. He has worked on public interest litigation covering social security, environmental protection and human rights, and is visiting faculty at ICFAI University, Ranchi, where he lectures on Constitutional and Administrative Law. In class he turns dense legal text into clear reasoning."),
    dict(id="shikha-agarwal", name="CS Shikha Agarwal", role="Faculty",
         qualifications="BBA, CS, LLB", expertise="Company Law and corporate compliance",
         linkedin="https://linkedin.com/in/shikha-jain-agarwal-881619243",
         bio="CS Shikha Agarwal works across corporate compliance and regulatory affairs. Her classes are interactive, and she has a knack for making dense legal concepts simple. Her background in both law and management makes her a strong guide for Company Law."),
    dict(id="minakshi-agarwal", name="CS Minakshi Agarwal", role="Faculty",
         expertise="Corporate compliance and governance",
         bio="CS Minakshi Agarwal teaches corporate compliance and governance for the CS course. Her structured teaching gives students clarity on regulatory subjects that are easy to get lost in."),
    dict(id="manjusha-jaiswal", name="Manjusha Jaiswal", role="Faculty",
         expertise="Professional courses",
         bio="Manjusha Jaiswal is a valued member of the Equity Classes faculty, known for her commitment to her students' progress. Her approachable teaching style makes her a favourite in class."),
]

ACHIEVERS = [  # (name, photo slug, course, note)
    ("Rudra Raj Dawn", "rudra-ca", "CA", "State Topper, CA Foundation"),
    ("Himanshi Kejriwal", "himanshi", "CA", ""), ("Palak Jalan", "palak", "CA", ""),
    ("Aditya Raj", "aditya-raj", "CA", ""), ("Sakshi Manjhi", "sakshi-ca", "CA", ""),
    ("Akshra Saraswat", "akshra", "CA", ""), ("Pratham Patel", "pratham-ca", "CA", ""),
    ("Aryan Sodhani", "aryan-sodhani", "CA", ""), ("Varsha", "varsha", "CA", ""),
    ("Anuj Prasad", "anuj-ca", "CA", ""), ("Aryan Kumar", "aryan-kumar", "CA", ""),
    ("Pavika Vijay", "pavika-ca", "CA", ""), ("Simon", "simon-ca", "CA", ""),
    ("Shreya Agarwal", "shreya-agarwal", "CA", ""), ("Kritiwas Shahdeo", "kritiwas", "CA", ""),
    ("Akshay Poddar", "akshay-poddar", "CA", ""), ("Gaurav Kumar", "gaurav-kumar", "CA", ""),
    ("Isha", "isha", "CA", ""), ("Tanushka Singh", "tanushka-ca", "CA", ""),
    ("Mudit", "mudit", "CA", ""), ("Hemesh", "hemesh", "CA", ""), ("Vedant", "vedant", "CA", ""),
    ("Utkarsh Anand", "utkarsh", "CA", ""), ("Khushi Dokania", "khushi", "CA", ""),
    ("Utpal Kumar", "utpal", "CA", ""), ("Priyani Ghosh", "priyani", "CA", ""),
    ("Kavya Khaitan", "kavya", "CA", ""), ("Gunjan Saboo", "gunjan", "CA", ""),
    ("Dolly Singh", "dolly-singh", "CA", ""),
    ("Aanchal", "aanchal", "CS", ""), ("Rishu", "rishu", "CS", ""), ("Amrit Kaur", "amrit-kaur", "CS", ""),
    ("Shweta", "shweta", "CS", ""), ("Shubhshri Sahani", "shubhshri", "CS", ""),
    ("Neha Jha", "neha-jha", "CS", ""), ("Pratistha Gupta", "pratistha", "CS", ""),
    ("Anjana", "anjana", "CS", ""), ("Aayushi Singh", "aayushi", "CS", ""),
    ("Swastik Dubey", "swastik", "CS", ""), ("Shristi Ranjan", "shristi-cs", "CS", ""),
    ("Tanya", "tanya", "CS", ""), ("Manaswi Gupta", "manaswi-gupta", "CS", ""),
    ("Kanika Bijawat", "kanika-bijawat", "CS", ""), ("Aditya Krishna", "aditya-krishna-cs", "CS", ""),
    ("Kajal Sahu", "kajal-sahu", "CS", ""), ("Riddhi Kalwar", "riddhi", "CS", ""),
    ("Akansha Kumari", "akansha-kumari", "CS", ""), ("Sheetal Kumari", "sheetal-kumari", "CS", ""),
    ("Manya Goel", "manya-goel", "CS", ""), ("Sharan Chattaraj", "sharan", "CS", ""),
    ("Hardeep", "hardeep", "CS", ""), ("Manish Chaubey", "manish-chaubey", "CS", ""),
    ("Shreya Sharma", "shreya-sharma", "CS", ""),
]

REVIEWS = [  # verbatim from Google, as shown on the old site
    ("Urvi Mitra", "Equity Classes changed my perception. The environment is so friendly and competitive at the same time. Best classes in Ranchi for CA, CS or CMA."),
    ("Kumar Rakshit", "The teachers here are knowledgeable, supportive, and always ready to clear every doubt with patience. The study material is properly structured."),
    ("Shubham Burman", "Excellent CS coaching with clear concepts. I am having a great experience studying in this institute, the vibe and atmosphere are perfect for learning."),
    ("Nidhi Deep", "The sessions were highly informative, well-structured, and academically enriching. Equity classes for CS are very helpful and conceptually strong."),
    ("Akshat Manpuria", "Excellent conceptual clarity and supportive faculty! My experience so far has been outstanding. The biggest strength is the teaching methodology."),
    ("Nishthaa Poddar", "Equity classes have given me the confidence and motivation to study. Teachers are very friendly and make every course very easy. Undoubtedly the best!"),
]

# =====================================================================
# helpers
# =====================================================================
e = html.escape

ICON = {
    "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    "wa": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2s.2-1.1.1-1.2-.2-.2-.4-.3z"/></svg>',
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    "web": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
}


def wa(msg):
    from urllib.parse import quote
    return f"https://wa.me/{WA_ENQUIRY}?text={quote(msg)}"


def ach_img(slug):
    return f"assets/achievers/{slug}.webp"


def head(R, title, desc, path, og_image="assets/og.jpg", extra=""):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#230640">
<link rel="icon" href="{R}favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="{R}favicon.png">
<link rel="apple-touch-icon" href="{R}assets/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Equity Classes">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="{SITE}/{og_image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(desc)}">
<meta name="twitter:image" content="{SITE}/{og_image}">
<meta name="google-site-verification" content="fe1k1809DCJAvYMaVQtzkn2bsossO2tuWfnR9foXoaM">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="{R}assets/css/site.css">
{extra}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def header(R, current=""):
    home = R or "./"
    links = [("Courses", f"{home}#courses"), ("Faculty", f"{home}#faculty"),
             ("Results", f"{R}results/"), ("Reviews", f"{home}#reviews"), ("Visit", f"{home}#visit")]
    nav = "".join(
        f'<a href="{h}"{" aria-current=\"page\"" if l == current else ""}>{l}</a>' for l, h in links)
    sheet_nav = "".join(f'<a href="{h}">{l}</a>' for l, h in links)
    return f"""<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{home}" aria-label="Equity Classes, home">
      <img src="{R}assets/mark-160.png" alt="" width="30" height="33">
      <span>Equity Classes<small>CA · CS · Ranchi</small></span>
    </a>
    <nav class="nav" aria-label="Main">{nav}</nav>
    <a class="header-call" href="tel:{PHONE_OFFICE}">{PHONE_OFFICE_SHOW}</a>
    <a class="btn header-cta" href="{wa('Hello Equity Classes, I would like to know about the next batch.')}" target="_blank" rel="noopener">{ICON['wa']}WhatsApp us</a>
    <button class="menu-btn" type="button" data-menu-open aria-controls="menu-sheet" aria-expanded="false">Menu</button>
  </div>
</header>
<div class="menu-sheet" id="menu-sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="top">
    <span class="brand"><span style="color:var(--on-dark)">Equity Classes</span></span>
    <button class="close" type="button" data-menu-close>Close</button>
  </div>
  <nav aria-label="Mobile">{sheet_nav}</nav>
  <div class="foot">
    <a href="tel:{PHONE_OFFICE}">Call {PHONE_OFFICE_SHOW}</a>
    <span>{ADDRESS_1}, Lalpur</span>
    <span>{HOURS}</span>
  </div>
</div>
"""


def footer(R):
    home = R or "./"
    return f"""<footer class="site-footer on-dark">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><img src="{R}assets/mark-160.png" alt="" width="34" height="37"><span>Equity Classes</span></div>
        <p>CA and CS coaching in Lalpur, Ranchi.<br>{LEGAL}</p>
      </div>
      <div>
        <h2>Visit</h2>
        <p>{ADDRESS_1}<br>{ADDRESS_2}<br>{ADDRESS_NOTE}</p>
        <p>{HOURS}<br>Closed on Sunday</p>
      </div>
      <div>
        <h2>Contact</h2>
        <ul>
          <li><a href="tel:{PHONE_OFFICE}">{PHONE_OFFICE_SHOW}</a></li>
          <li><a href="https://wa.me/{WA_ENQUIRY}" target="_blank" rel="noopener">WhatsApp 87978 34974</a></li>
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li><a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram @equityclasses</a></li>
          <li><a href="{LINKTREE}" target="_blank" rel="noopener">All links (Linktree)</a></li>
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
  <a href="tel:{PHONE_OFFICE}">{ICON['phone']}Call</a>
  <a href="{wa('Hello Equity Classes, I would like to know about the next batch.')}" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a>
</nav>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<script src="{R}assets/js/site.js" defer></script>
<script>document.querySelectorAll("[data-year]").forEach(function(n){{n.textContent=new Date().getFullYear()}})</script>
</body>
</html>
"""


def face(name, slug, cat, R, eager=False):
    return (f'<li data-cat="{cat}" data-name="{e(name.lower())}"><img src="{R}{ach_img(slug)}" '
            f'alt="{e(name)}, {cat} student at Equity Classes" width="104" height="104"'
            f'{"" if eager else " loading=lazy"}><b>{e(name)}</b><span>{cat}</span></li>')


def jsonld(obj):
    return f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>\n'


ORG_LD = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    "name": "Equity Classes", "url": SITE + "/", "logo": SITE + "/assets/mark-160.png",
    "image": SITE + "/assets/og.jpg",
    "description": "CA and CS coaching institute in Lalpur, Ranchi, Jharkhand.",
    "telephone": "+91-9288484448", "email": EMAIL,
    "address": {"@type": "PostalAddress", "streetAddress": "H Square Mall, 504, opposite Pranami Heights, Lalpur",
                "addressLocality": "Ranchi", "addressRegion": "Jharkhand", "postalCode": "834001", "addressCountry": "IN"},
    "openingHoursSpecification": [{"@type": "OpeningHoursSpecification",
                                   "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                   "opens": "10:30", "closes": "19:00"}],
    "aggregateRating": {"@type": "AggregateRating", "ratingValue": GOOGLE_RATING, "reviewCount": str(GOOGLE_REVIEWS)},
    "sameAs": [INSTAGRAM, LINKTREE],
}


def write(path, text):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    print("wrote", path)


# =====================================================================
# image prep (runs once)
# =====================================================================
def prep_images():
    out = ROOT / "assets/achievers"
    out.mkdir(parents=True, exist_ok=True)
    for _, slug, _, _ in ACHIEVERS:
        dst = out / f"{slug}.webp"
        if dst.exists():
            continue
        im = Image.open(ROOT / f"assets/results/std-{slug}.webp").convert("RGB")
        w, h = im.size
        # the old site baked a gold ring on a purple tile into each photo: keep only the inner portrait
        c = int(w * 0.165)
        im.crop((c, c, w - c, h - c)).resize((208, 208), Image.LANCZOS).save(dst, quality=84)
    for f in FACULTY:
        dst = ROOT / f"assets/team/thumb-{f['id']}.webp"
        if not dst.exists():
            im = Image.open(ROOT / f"assets/team/{f['id']}.webp").convert("RGB")
            w, h = im.size
            im.crop((int(w * .22), int(h * .1), int(w * .78), int(h * .66))).resize((128, 128), Image.LANCZOS).save(dst, quality=85)
    og = ROOT / "assets/og.jpg"
    if not og.exists():
        hero = Image.open(ROOT / "assets/hero-bg.webp").convert("RGB")
        hero = hero.resize((1200, 675), Image.LANCZOS).crop((0, 20, 1200, 650))
        mark = Image.open(ROOT / "assets/mark.png").convert("RGBA")
        mark.thumbnail((96, 96))
        tile = Image.new("RGB", (mark.size[0] + 36, mark.size[1] + 36), (246, 241, 233))
        tile.paste(mark, (18, 18), mark)
        hero.paste(tile, (40, 40))
        hero.save(og, quality=84)


# =====================================================================
# pages
# =====================================================================
def home():
    R = ""
    lead = [f for f in FACULTY if f.get("lead")]
    rest = [f for f in FACULTY if not f.get("lead")]
    topper = ACHIEVERS[0]
    ca = [a for a in ACHIEVERS[1:] if a[2] == "CA"]
    cs = [a for a in ACHIEVERS if a[2] == "CS"]
    mix = [x for pair in zip(ca, cs) for x in pair][:15]

    leads_html = "".join(f"""
      <a class="lead" href="faculty/{f['id']}/">
        <img src="assets/team/{f['id']}.webp" alt="Portrait of {e(f['name'])}" width="400" height="400" loading="lazy">
        <div>
          <span class="role">{e(f['role'])} · {e(f['experience'])}</span>
          <h3>{e(f['name'])}</h3>
          <p>{e(f['short'])}</p>
          <span class="more">Read profile</span>
        </div>
      </a>""" for f in lead)

    roster_html = "".join(f"""
      <li><a href="faculty/{f['id']}/"><img src="assets/team/thumb-{f['id']}.webp" alt="" width="64" height="64" loading="lazy"><div><b>{e(f['name'])}</b><span>{e(f['expertise'])}{(' · ' + e(f['level'])) if f.get('level') else ''}</span></div></a></li>"""
                          for f in rest)

    teach_rows = [
        ("Accounts, Taxation, Costing", "ashish-sultania", ""),
        ("Law and Audit", "mona-mohta", ""),
        ("Ind AS and Financial Reporting", "harsh-agarwal", "CA Final"),
        ("Taxation and Audit", "vishal-chandra", "CA Final"),
        ("Mathematics", "shankar-kinger", "CA Foundation, CSEET"),
        ("Business Environment, Capital Markets, Strategic Management", "himanshu-chitlangia", ""),
        ("Company Law and corporate compliance", "shikha-agarwal", "CS"),
        ("Corporate compliance and governance", "minakshi-agarwal", "CS"),
        ("Commercial, Constitutional and Administrative Law", "shubham-kataruka", ""),
    ]
    byid = {f["id"]: f for f in FACULTY}
    teach_html = "".join(
        f'<tr><td>{e(s)}</td><td><a class="link" href="faculty/{i}/">{e(byid[i]["name"])}</a></td><td>{e(lv) or "&nbsp;"}</td></tr>'
        for s, i, lv in teach_rows)

    big = REVIEWS[0]

    course_opts = ["CA Foundation", "CA Intermediate", "CA Final", "CSEET", "CS Executive", "CS Professional", "Not sure yet"]
    chips = "".join(
        f'<label><input type="radio" name="course" value="{c}"><span>{c}</span></label>' for c in course_opts)

    faq = [
        ("Where exactly is the institute?",
         f"Unit 504, H Square Mall, opposite Pranami Heights in Lalpur, Ranchi, next to Mocha. <a class=\"link\" href=\"{MAP_LINK}\" target=\"_blank\" rel=\"noopener\">Open it in Google Maps</a>."),
        ("What are the office hours?",
         "Monday to Saturday, 10:30 AM to 7:00 PM. We are closed on Sunday. Calls and WhatsApp messages sent after hours are answered the next working day."),
        ("What are the fees, and when does the next batch start?",
         f"Fees depend on the course, the level and the batch, so we share the current fee sheet and start dates directly. <a class=\"link\" href=\"{wa('Hello Equity Classes, please share the fee sheet and next batch dates.')}\" target=\"_blank\" rel=\"noopener\">Ask on WhatsApp</a> or call {PHONE_OFFICE_SHOW}."),
        ("Can we talk to someone before joining?",
         f"Yes. Counselling is free. Call {PHONE_OFFICE_SHOW} and we will talk through which level to start with and what the course involves, or visit the institute during office hours."),
        ("Do you teach both CA and CS?",
         "Yes. For CA we coach Foundation, Intermediate and Final. For CS we coach CSEET, Executive and Professional."),
    ]
    faq_html = "".join(f"<details><summary>{e(q)}</summary><p>{a}</p></details>" for q, a in faq)
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": html.unescape(
            __import__("re").sub(r"<[^>]+>", "", a))}} for q, a in faq]}

    body = f"""{header(R)}
<main id="main">

<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <p class="label">CA and CS coaching · Lalpur, Ranchi</p>
      <h1 id="hero-title"><span class="eq">Assets = Liabilities +</span><em>Equity</em> Classes</h1>
      <p class="lede">Every CA student learns that line in week one. We teach the rest: CA Foundation to CA Final and CSEET to CS Professional, with practising CAs, CSs and a High Court advocate at the front of the room.</p>
      <div class="actions">
        <a class="btn" href="tel:{PHONE_OFFICE}">{ICON['phone']}Book a free counselling call</a>
        <a class="link" href="#courses">See the six exams we coach</a>
      </div>
    </div>
    <dl class="ledger" aria-label="Equity Classes at a glance">
      <div class="ledger-row"><dt>Google rating</dt><span class="dots"></span><dd>{GOOGLE_RATING} / 5<small>{GOOGLE_REVIEWS} reviews</small></dd></div>
      <div class="ledger-row"><dt>Pass rate</dt><span class="dots"></span><dd>{PASS_RATE}%</dd></div>
      <div class="ledger-row"><dt>Faculty</dt><span class="dots"></span><dd>{len(FACULTY)} teachers</dd></div>
      <div class="ledger-row"><dt>Achievers named here</dt><span class="dots"></span><dd>{len(ACHIEVERS)}</dd></div>
      <div class="ledger-row"><dt>Open</dt><span class="dots"></span><dd>Mon to Sat<small>10:30 AM to 7 PM</small></dd></div>
      <div class="ledger-total"><p>Unit 504, H Square Mall, Lalpur. Next to Mocha.</p></div>
    </dl>
  </div>
  <figure class="hero-photo">
    <img src="assets/hero-bg.webp" alt="Around sixty Equity Classes students in navy institute T-shirts pose together on a green turf court beneath an Equity Classes banner" width="1920" height="1080" fetchpriority="high">
    <figcaption>Equity Classes students, Ranchi.</figcaption>
  </figure>
</section>

<section class="section on-dark" id="courses" aria-labelledby="courses-title">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label">Courses</p>
        <h2 id="courses-title">Two tracks.<br>Six exams.</h2>
      </div>
      <p>Join at the level you are at now. Each subject is taught by a specialist in it, and the table below shows who teaches what.</p>
    </div>
    <div class="tracks">
      <article class="track" aria-labelledby="ca-title">
        <div class="track-top"><h3 id="ca-title">CA<span>Chartered Accountancy · ICAI</span></h3></div>
        <p class="body">Full preparation for CA Foundation, Intermediate and Final, with structured study material written around the exam.</p>
        <ol class="levels">
          <li><strong>CA Foundation</strong><span>The entry exam after Class 12.</span></li>
          <li><strong>CA Intermediate</strong><span>The second level, after Foundation.</span></li>
          <li><strong>CA Final</strong><span>The last level. Taught by practising CAs.</span></li>
        </ol>
        <ul class="ticks" aria-label="Included in CA coaching"><li>Concepts first</li><li>Exam-oriented notes</li><li>Regular mock tests</li></ul>
        <a class="btn btn--line" href="{wa('Hello Equity Classes, I want to know about CA batches.')}" target="_blank" rel="noopener">Ask about CA batches</a>
      </article>
      <article class="track" aria-labelledby="cs-title">
        <div class="track-top"><h3 id="cs-title">CS<span>Company Secretary · ICSI</span></h3></div>
        <p class="body">Complete coaching for CSEET, CS Executive and CS Professional, with in-depth subject coverage and mentoring for each student.</p>
        <ol class="levels">
          <li><strong>CSEET</strong><span>The entrance test for the CS course.</span></li>
          <li><strong>CS Executive</strong><span>Company law, tax and the core papers.</span></li>
          <li><strong>CS Professional</strong><span>The final level of the CS course.</span></li>
        </ol>
        <ul class="ticks" aria-label="Included in CS coaching"><li>Individual attention</li><li>Doubt-clearing sessions</li><li>Structured curriculum</li></ul>
        <a class="btn btn--line" href="{wa('Hello Equity Classes, I want to know about CS batches.')}" target="_blank" rel="noopener">Ask about CS batches</a>
      </article>
    </div>
    <div class="teach">
      <h3>Who teaches what</h3>
      <table>
        <thead><tr><th scope="col">Subject</th><th scope="col">Teacher</th><th scope="col">Level</th></tr></thead>
        <tbody>{teach_html}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="method" aria-labelledby="method-title">
  <div class="wrap method">
    <div>
      <p class="label">How classes run</p>
      <h2 id="method-title">Small rooms. Every doubt answered.</h2>
      <p>Professional exams are long and the syllabus is heavy. What helps most is a teacher who knows where you are stuck, and a place where asking is normal.</p>
      <blockquote class="method-quote">
        <p>The environment is so friendly and competitive at the same time.</p>
        <footer>{e(big[0])}, student, on Google</footer>
      </blockquote>
    </div>
    <ol class="points">
      <li><span class="n">01</span><b>Small batches</b><p>Batches are kept small so every student gets personal guidance, and the teacher knows your name.</p></li>
      <li><span class="n">02</span><b>Concepts before shortcuts</b><p>We teach why an entry or a section works, so it stays with you past the exam hall.</p></li>
      <li><span class="n">03</span><b>Notes written for the exam</b><p>Exam-oriented notes and properly curated study material, so you are not hunting through five books.</p></li>
      <li><span class="n">04</span><b>Separate doubt sessions</b><p>Dedicated time for questions, outside the lecture, answered with patience.</p></li>
      <li><span class="n">05</span><b>Regular mock tests</b><p>You write papers under exam conditions long before the real one.</p></li>
      <li><span class="n">06</span><b>A room that pushes you</b><p>A friendly, competitive atmosphere. Students push each other along.</p></li>
    </ol>
  </div>
</section>

<section class="section results-band" id="results" aria-labelledby="results-title">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label">Results</p>
        <h2 id="results-title">The students who passed.</h2>
      </div>
      <p>Every name on this page studied at Equity Classes and cleared their CA or CS exam. {len(ACHIEVERS)} of them so far, with photos.</p>
    </div>
    <div class="results-grid">
      <div>
        <article class="topper">
          <span class="stamp">State Topper</span>
          <img src="{ach_img(topper[1])}" alt="{e(topper[0])}, State Topper in CA Foundation" width="208" height="208" loading="lazy">
          <h3>{e(topper[0])}</h3>
          <p>CA Foundation · State Topper</p>
        </article>
        <div class="pass"><b>{PASS_RATE}%</b><span>of our students pass, by the institute's own count.</span></div>
      </div>
      <div>
        <ul class="faces">{''.join(face(n, s, c, R) for n, s, c, _ in mix)}</ul>
        <div class="faces-foot">
          <a class="btn btn--line" href="results/">See all {len(ACHIEVERS)} achievers</a>
          <span class="mono" style="font-size:.86rem;color:var(--ink-2)">{len([a for a in ACHIEVERS if a[2]=='CA'])} CA · {len(cs)} CS</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="faculty" aria-labelledby="faculty-title">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label">Faculty</p>
        <h2 id="faculty-title">Who teaches you.</h2>
      </div>
      <p>Chartered Accountants, Company Secretaries, a cost accountant, an MBA and a practising advocate. Some of them still work in practice alongside teaching.</p>
    </div>
    <div class="leads">{leads_html}
    </div>
    <ul class="roster">{roster_html}
    </ul>
  </div>
</section>

<section class="section on-dark" id="reviews" aria-labelledby="reviews-title">
  <div class="wrap">
    <h2 id="reviews-title" class="sr-only">Student reviews</h2>
    <div class="reviews-grid">
      <div>
        <p class="label">From Google reviews</p>
        <blockquote class="big-quote">
          <p>{e(REVIEWS[4][1])}</p>
          <footer>{e(REVIEWS[4][0])} · Google review</footer>
        </blockquote>
        <div class="rating">
          <b>{GOOGLE_RATING}</b>
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span>from {GOOGLE_REVIEWS} reviews. <a class="link" href="{MAP_LINK}" target="_blank" rel="noopener">Read them on Google</a></span>
        </div>
      </div>
      <div class="quotes">{''.join(f'<blockquote class="quote"><p>{e(t)}</p><footer>{e(n)} · Google review</footer></blockquote>' for n, t in [r for i, r in enumerate(REVIEWS) if i != 4])}</div>
    </div>
  </div>
</section>

<section class="section visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit-grid">
    <div>
      <p class="label">Visit or enquire</p>
      <h2 id="visit-title">Drop in, or send a message.</h2>
      <dl class="facts">
        <div><dt>Address</dt><dd>{ADDRESS_1},<br>{ADDRESS_2}. {ADDRESS_NOTE}.</dd></div>
        <div><dt>Hours</dt><dd>{HOURS}. Closed Sunday.</dd></div>
        <div><dt>Phone</dt><dd><a class="link" href="tel:{PHONE_OFFICE}">{PHONE_OFFICE_SHOW}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a class="link" href="https://wa.me/{WA_ENQUIRY}" target="_blank" rel="noopener">87978 34974</a></dd></div>
        <div><dt>Email</dt><dd><a class="link" href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
      </dl>
      <iframe class="map" src="{MAP_EMBED}" title="Map: Equity Classes, H Square Mall, Lalpur, Ranchi" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <form class="form-card" id="enquiry" data-wa="{WA_ENQUIRY}" novalidate>
      <h3>Ask about the next batch</h3>
      <p>Fill this in and it opens WhatsApp with your message ready to send. We reply during office hours.</p>
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
        <small>Or call <a class="link" href="tel:{PHONE_OFFICE}">{PHONE_OFFICE_SHOW}</a></small>
      </div>
      <div class="form-status" role="status" tabindex="-1" hidden></div>
    </form>
  </div>
</section>

<section class="section section--tight" id="faq" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="faq">
      <h2 id="faq-title">Questions we hear at the front desk</h2>
      {faq_html}
    </div>
  </div>
</section>

</main>
{footer(R)}"""
    write("index.html",
          head(R, "Equity Classes | CA & CS Coaching in Lalpur, Ranchi",
               f"CA Foundation, Intermediate and Final, and CSEET, CS Executive and Professional coaching in H Square Mall, Lalpur, Ranchi. {GOOGLE_RATING} on Google from {GOOGLE_REVIEWS} reviews.",
               "/", extra=jsonld(ORG_LD) + jsonld(faq_ld)) + body)


def results_page():
    R = "../"
    ca_n = len([a for a in ACHIEVERS if a[2] == "CA"])
    cs_n = len(ACHIEVERS) - ca_n
    body = f"""{header(R, 'Results')}
<main id="main">
  <div class="page-head">
    <div class="wrap">
      <p class="crumb"><a href="../">Home</a> / Results</p>
      <h1>Our achievers</h1>
      <p>{len(ACHIEVERS)} Equity Classes students who cleared their CA or CS exams: {ca_n} in CA and {cs_n} in CS. Rudra Raj Dawn topped the state in CA Foundation.</p>
    </div>
  </div>
  <div class="wrap section" style="padding-top:0">
    <div class="toolbar">
      <div class="seg" role="group" aria-label="Filter by course">
        <button type="button" data-filter="all" aria-pressed="true">All</button>
        <button type="button" data-filter="CA" aria-pressed="false">CA</button>
        <button type="button" data-filter="CS" aria-pressed="false">CS</button>
      </div>
      <div class="search">
        <label for="achiever-search">Find a name</label>
        <input id="achiever-search" type="search" autocomplete="off" placeholder="Type a first name">
      </div>
    </div>
    <p class="count" id="achiever-count" aria-live="polite">Showing {len(ACHIEVERS)} of {len(ACHIEVERS)} achievers</p>
    <ul class="faces faces--all" id="achievers">{''.join(face(n, s, c, R, eager=i < 12) for i, (n, s, c, _) in enumerate(ACHIEVERS))}</ul>
    <div class="empty" id="achiever-empty" hidden>
      <p>No achiever by that name.</p>
      <button class="btn btn--line" type="button" id="achiever-reset">Clear the search</button>
    </div>
  </div>
</main>
{footer(R)}"""
    write("results/index.html",
          head(R, "Results & Achievers | Equity Classes, Ranchi",
               f"{len(ACHIEVERS)} CA and CS achievers from Equity Classes, Ranchi, including State Topper Rudra Raj Dawn (CA Foundation).",
               "/results") + body)


def faculty_pages():
    R = "../../"
    for f in FACULTY:
        others = "".join(
            f'<li><a href="../{o["id"]}/"><img src="{R}assets/team/thumb-{o["id"]}.webp" alt="" width="64" height="64" loading="lazy"><div><b>{e(o["name"])}</b><span>{e(o["expertise"])}</span></div></a></li>'
            for o in FACULTY if o["id"] != f["id"])
        facts = []
        if f.get("qualifications"): facts.append(("Qualified", f["qualifications"]))
        if f.get("experience"): facts.append(("Experience", f["experience"]))
        facts.append(("Teaches", f["expertise"]))
        if f.get("level"): facts.append(("Level", f["level"]))
        facts_html = "".join(f"<div><dt>{k}</dt><dd>{e(v)}</dd></div>" for k, v in facts)
        li = f'<a class="link" href="{f["linkedin"]}" target="_blank" rel="noopener">LinkedIn profile</a>' if f.get("linkedin") else ""
        first = f["name"].split()[-2] if f["name"].split()[0] in ("CS", "CA", "Prof.", "Adv.") else f["name"].split()[0]
        person_ld = {"@context": "https://schema.org", "@type": "Person", "name": f["name"], "jobTitle": f["role"],
                     "image": f"{SITE}/assets/team/{f['id']}.webp", "worksFor": {"@type": "EducationalOrganization", "name": "Equity Classes", "url": SITE + "/"},
                     "knowsAbout": f["expertise"]}
        if f.get("linkedin"): person_ld["sameAs"] = [f["linkedin"]]
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
    <section class="section" style="padding-top:0" aria-labelledby="others">
      <h2 id="others" style="font-size:var(--s2);margin-bottom:1.2rem">Other faculty</h2>
      <ul class="roster">{others}</ul>
    </section>
  </div>
</main>
{footer(R)}"""
        write(f"faculty/{f['id']}/index.html",
              head(R, f"{f['name']}, {f['role']} | Equity Classes, Ranchi",
                   f"{f['name']} teaches {f['expertise']} at Equity Classes, Lalpur, Ranchi. {f['bio'].split('. ')[0]}.",
                   f"/faculty/{f['id']}", extra=jsonld(person_ld)) + body)


def mona_card():
    R = "../"
    body = f"""<main id="main" class="card-page">
  <article class="vcard">
    <div class="vcard-top">
      <a class="brand-sm" href="../" style="color:inherit;text-decoration:none"><img src="{R}assets/mark-160.png" alt="" width="22" height="24">Equity Classes</a>
      <h1><small>Founder &amp; Director</small>Mona<br>Mohta</h1>
      <img class="face" src="{R}assets/team/mona-mohta.webp" alt="Portrait of Mona Mohta" width="128" height="160">
    </div>
    <div class="vcard-body">
      <a class="btn" href="{R}mona-mohta.vcf" download="Mona_Mohta_Equity_Classes.vcf">Save to contacts</a>
      <nav class="vcard-links" aria-label="Contact Mona Mohta">
        <a href="tel:+917549114051">{ICON['phone']}Call</a>
        <a href="https://wa.me/917549114051" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a>
        <a href="mailto:{EMAIL}">{ICON['mail']}Email</a>
        <a href="../">{ICON['web']}Website</a>
      </nav>
      <dl class="facts">
        <div><dt>Mobile</dt><dd><a class="link" href="tel:+917549114051">+91 75491 14051</a></dd></div>
        <div><dt>Office</dt><dd><a class="link" href="tel:{PHONE_OFFICE}">+91 92884 84448</a></dd></div>
        <div><dt>Email</dt><dd><a class="link" href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
        <div><dt>Address</dt><dd>504, H Square Building, opp. Pranami Heights, Lalpur, Ranchi 834001</dd></div>
      </dl>
      <p style="font-size:.84rem;color:var(--ink-2);margin:0">{LEGAL}</p>
    </div>
  </article>
</main>
<script src="{R}assets/js/site.js" defer></script>
</body></html>"""
    write("mona/index.html",
          head(R, "Mona Mohta | Founder & Director, Equity Classes",
               "Contact Mona Mohta, Founder & Director of Equity Classes, Ranchi. Save her contact details or get in touch directly.",
               "/mona") + body)


def not_found():
    R = "/"  # served for any missing path, so use root-absolute links
    body = f"""{header(R)}
<main id="main">
  <div class="page-head" style="border:0">
    <div class="wrap">
      <p class="label">Error 404</p>
      <h1>This page doesn't balance.</h1>
      <p>The page you were looking for has moved or never existed. The faculty pages, results and contact details are all still here.</p>
      <p style="margin-top:2rem"><a class="btn" href="/">Go to the home page</a> &nbsp; <a class="link" href="/results/">See our results</a></p>
    </div>
  </div>
</main>
{footer(R)}"""
    write("404.html", head(R, "Page not found | Equity Classes", "This page could not be found.", "/404") + body)


def sitemap():
    urls = ["/", "/results"] + [f"/faculty/{f['id']}" for f in FACULTY]
    items = "".join(f"  <url><loc>{SITE}{u}</loc></url>\n" for u in urls)
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{items}</urlset>\n')
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")


if __name__ == "__main__":
    prep_images()
    home()
    results_page()
    faculty_pages()
    mona_card()
    not_found()
    sitemap()
