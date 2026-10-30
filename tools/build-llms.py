"""Write llms.txt and llms-full.txt for the website (AI search and assistants).

Usage: python3 -I tools/build-llms.py .
Run it after editing any page text. It reads the brand from the site header, so it works
on the unbranded site and after tools/apply-brand.py.
"""
import re, sys, html, pathlib
from html.parser import HTMLParser

root = pathlib.Path(sys.argv[1])
BASE = "https://srikanthk.pages.dev/"
PAGES = [("index.html", ""), ("about.html", "about"), ("program.html", "program"), ("for-colleges.html", "for-colleges"),
         ("for-corporates.html", "for-corporates"), ("posh.html", "posh"), ("advisory.html", "advisory"),
         ("benefits.html", "benefits"), ("insights.html", "insights"), ("portfolio.html", "portfolio"),
         ("contact.html", "contact"), ("privacy.html", "privacy"), ("terms.html", "terms")]

class Text(HTMLParser):
    """Visible text of <main> as light Markdown: headings, paragraphs, list items."""
    BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "summary", "div", "section", "figcaption", "blockquote", "tr"}
    def __init__(self):
        super().__init__(); self.out = []; self.buf = []; self.in_main = 0; self.skip = 0; self.tag = None
    def flush(self):
        t = " ".join("".join(self.buf).split()); self.buf = []
        if not t: return
        if self.tag in ("h1",): t = "# " + t
        elif self.tag == "h2": t = "## " + t
        elif self.tag in ("h3", "h4", "summary"): t = "### " + t
        elif self.tag == "li": t = "- " + t
        self.out.append(t)
    def handle_starttag(self, tag, attrs):
        if tag == "main": self.in_main += 1
        if tag in ("script", "style", "svg", "noscript", "form", "picture", "button"): self.skip += 1
        if self.in_main and tag in self.BLOCK: self.flush(); self.tag = tag
    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg", "noscript", "form", "picture", "button") and self.skip: self.skip -= 1
        if self.in_main and tag in self.BLOCK: self.flush(); self.tag = None
        if tag == "main": self.flush(); self.in_main -= 1
    def handle_data(self, d):
        if self.in_main and not self.skip: self.buf.append(d)

def meta(s, pat):
    m = re.search(pat, s, re.S); return html.unescape(m.group(1)) if m else ""

idx = (root / "index.html").read_text()
brand = html.unescape(re.sub(r"<[^>]+>", "", re.search(r'<span class="name">(.*?)</span>', idx).group(1))).replace("™", "").strip()
branded = brand != "Srikanth Kalyanasundaram"
title_name = f"{brand} (founded by Srikanth Kalyanasundaram)" if branded else "Srikanth Kalyanasundaram"
practice = f"{brand} Campus" if branded else "Campus"

full = [f"# {title_name}: full site text", "",
        f"> Plain-text copy of every public page on {BASE}, for AI assistants and search. Generated from the live HTML.", ""]
for f, path in PAGES:
    s = (root / f).read_text()
    p = Text(); p.feed(s); p.flush()
    lines = [l for i, l in enumerate(p.out) if i == 0 or l != p.out[i - 1]]
    t = meta(s, r"<title>(.*?)</title>")
    d = meta(s, r'<meta name="description" content="([^"]*)"')
    full += ["---", "", f"URL: {BASE}{path}", f"Title: {t}", f"Description: {d}", ""] + lines + [""]
(root / "llms-full.txt").write_text("\n".join(full).replace("\u2014", ", ") + "\n")

P = lambda k: f"{brand} {k}" if branded else k
intro = f"{brand} is the people advisory and transformation practice founded by Srikanth Kalyanasundaram, M.IOD. " if branded else ""
llms = f"""# {title_name}

> {intro}Srikanth Kalyanasundaram, M.IOD, is a Mumbai-based HR leader, entrepreneur and mentor with over two decades building people-centred, high-performance organisations. He started as a mechanical engineer, moved into HR, and now helps students and early-career professionals cross the bridge from campus to corporate. Tagline: "Elevating People, Empowering Futures." He was profiled in "Leadership Spotlight: The Engineer Who Learned to Read People" by The 365 Circle: C-Suite Advantage.

## Four practices
- {P("Campus")}: Campus-to-Corporate Readiness. The signature 12-week Mindful Professional 360° programme, placement readiness cohorts for colleges, graduate trainee bootcamps for companies.
- {P("Respect")}: Building Respect, Enabling Safe Workplaces. POSH compliance and Internal Committee training for institutions, workplace dignity, culture transformation.
- {P("Inspire")}: Unlock Potential, Inspire Growth, Elevate Lives. Leadership development, mentoring and career growth, wellbeing and mindfulness, personal effectiveness coaching, retained HR advisory.
- {P("Benefits")}: Employee Benefits Advisory. Independent advice for employers on benefits design, employee wellbeing, and benefits operations and governance. Advice only: no insurance is sold, solicited or arranged.

## Key facts
- Based in Mumbai, Maharashtra, India; delivers on campus and on site across India.
- Languages: English, Hindi, Tamil, Malayalam, Marathi.
- Education: Diploma in Mechanical Engineering, Coimbatore Institute of Technology; Post Graduate Diploma in HR Management, Welingkar Institute, Mumbai.
- Certifications: ESG (Institute of Directors), POSH (Indian Society for Training and Development), Happiness Coaching (Berkeley Institute of Well Being), Mindfulness Coaching (Happiitude), Train the Trainer (NSDC and MEPSC), Business Storytelling (NIST).
- Approach: human-led and AI-augmented; experiential practice, feedback and simulation rather than lectures; every college cohort is assessed before and after.
- Contact: mtmdselflove@gmail.com, or the form at {BASE}contact. LinkedIn: https://www.linkedin.com/in/campus2corporate

## Pages
- [Home]({BASE}): the four practices, the signature programme, FAQ
- [About]({BASE}about): founder profile, certifications and awards
- [The Programme]({BASE}program): Mindful Professional 360°, six pillars over twelve weeks
- [For Colleges]({BASE}for-colleges): placement readiness training and pilots
- [For Corporates]({BASE}for-corporates): graduate trainee bootcamps
- [POSH for Institutions]({BASE}posh): awareness sessions and Internal Committee training
- [Advisory and Coaching]({BASE}advisory): one to one coaching and retained HR advisory
- [Employee Benefits]({BASE}benefits): benefits advisory, wellbeing, governance (advice only)
- [Insights]({BASE}insights): selected writing on leadership and people skills
- [Portfolio]({BASE}portfolio): career history, frameworks, engagements, gallery
- [Contact]({BASE}contact): book a 15 minute intro call

## Optional
- [Full site text]({BASE}llms-full.txt): every page above as plain text
- [Privacy notice]({BASE}privacy): DPDP Act 2023 notice
- [Terms of use]({BASE}terms)
"""
(root / "llms.txt").write_text(llms)
print(f"brand={brand!r}; llms-full.txt {len(full)} lines")
