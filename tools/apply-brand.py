"""Apply a brand name to the whole site, on top of the unbranded pages in main.

    python3 -I tools/apply-brand.py "<Brand>" .
    python3 -I tools/build-llms.py .

tools/launch.sh "<Brand>" runs both, regenerates the one-pager PDF, and deploys.
Use it only after the trade mark application for the brand has been filed.
Exact-count replacements only; it stops and lists anything that did not match.
"""
import re, sys, pathlib
TM = '<sup class="tm">&trade;</sup>'
if len(sys.argv) != 3: sys.exit("usage: apply-brand.py <Brand> <site dir>")
BRAND = sys.argv[1].strip()
root = pathlib.Path(sys.argv[2]); bad = []

def r(s, a, b, want, where):
    n = s.count(a)
    if want is not None and n != want: bad.append(f"{where}: {a[:60]!r} expected {want}, got {n}")
    return s.replace(a, b)

for p in sorted(root.glob("*.html")):
    s = p.read_text(); hdr = 'class="site-header"' in s
    if hdr:
        s = r(s, '<span class="name">Srikanth Kalyanasundaram</span>\n      <span class="tag">', f'<span class="name">{BRAND}{TM}</span>\n      <span class="tag">', 1, p.name)
        s = r(s, '<span class="name">Srikanth Kalyanasundaram Consulting</span>', f'<span class="name">{BRAND}{TM}</span>', 1, p.name)
        s = r(s, 'leadership development and employee benefits, across India.</p>',
                 'leadership development and employee benefits, across India. Founded by Srikanth Kalyanasundaram.</p>', 1, p.name)
        s = r(s, 'Srikanth Kalyanasundaram Consulting, Mumbai, India. All rights reserved.', f'{BRAND}, Mumbai, India. All rights reserved.', 1, p.name)
    s = s.replace('<meta property="og:site_name" content="Srikanth Kalyanasundaram Consulting">', f'<meta property="og:site_name" content="{BRAND}">')
    # title suffix in <title>, og:title, twitter:title
    s = re.sub(r'(<title>[^<]*?) \| Srikanth Kalyanasundaram(</title>)', rf'\1 | {BRAND}\2', s)
    s = re.sub(r'(<meta (?:property="og:title"|name="twitter:title") content="[^"]*?) \| Srikanth Kalyanasundaram(")', rf'\1 | {BRAND}\2', s)
    p.write_text(s)

p = root / "index.html"; s = p.read_text()
s = s.replace("Srikanth Kalyanasundaram | Campus-to-Corporate &amp; HR Advisory", f"{BRAND} | Campus-to-Corporate &amp; HR Advisory, Mumbai")
s = r(s, '"name": "Srikanth Kalyanasundaram Consulting",', f'"name": "{BRAND}",', 2, "index ld")
s = r(s, '"founder": {', f'"alternateName": "{BRAND} People Advisory",\n   "founder": {{', 1, "index ld alt")
s = r(s, '<span class="eyebrow">Four practices &middot; People Advisory &amp; Transformation</span>',
         f'<span class="eyebrow">{BRAND}{TM} &middot; People Advisory &amp; Transformation</span>', 1, "index eyebrow")
for k in ["Campus", "Respect", "Inspire", "Benefits"]:
    s = r(s, f'<span class="kicker">{k}</span>', f'<span class="kicker">{BRAND} {k}</span>', 1, "index kicker")
    s = r(s, f'"name": "{k}: ', f'"name": "{BRAND} {k}: ', 1, "index catalog")
# FAQ question 1, both the visible text and the JSON-LD
s = r(s, "What does Srikanth Kalyanasundaram offer?", f"What is {BRAND}?", 2, "faq q1")
s = r(s, "People advisory and transformation in four practices: Campus (",
         f"{BRAND} is the people advisory and transformation practice founded by Srikanth Kalyanasundaram, with four practices: {BRAND} Campus (", 2, "faq a1")
for k in ["Respect", "Inspire"]:
    s = r(s, f"), {k} (", f"), {BRAND} {k} (", 2, f"faq a1 {k}")
s = r(s, ") and Benefits (", f") and {BRAND} Benefits (", 2, "faq a1 benefits")
p.write_text(s)

p = root / "about.html"; s = p.read_text()
s = r(s, '<div class="crumb">About the Founder</div>', f'<div class="crumb">About the Founder &middot; {BRAND}</div>', 1, "about crumb")
p.write_text(s)

p = root / "onepager.html"; s = p.read_text()
s = r(s, '<div class="role">People Advisory &amp; Transformation', f'<div class="role">Founder, {BRAND}{TM} &nbsp;&middot;&nbsp; People Advisory &amp; Transformation', 1, "onepager")
p.write_text(s)

css = root / "css/style.css"; c = css.read_text()
if ".tm{" not in c:
    css.write_text(c.rstrip("\n") + "\n\n/* Trade mark symbol after the brand name */\n.tm{font-size:.5em;vertical-align:super;line-height:0;margin-left:.05em;letter-spacing:0}\n")

left = [p.name for p in root.glob("*.html") if "Srikanth Kalyanasundaram Consulting" in p.read_text()]
if left: bad.append("still says 'Consulting': " + ", ".join(left))
if bad: print("\n".join(bad)); sys.exit(1)
print("ok")
