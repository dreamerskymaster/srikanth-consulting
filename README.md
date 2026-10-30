# Srikanth Kalyanasundaram, website

Marketing site for Srikanth Kalyanasundaram's people advisory and transformation practice, in four
practices: Campus (campus-to-corporate readiness), Respect (POSH and workplace dignity), Inspire
(leadership, mentoring, wellbeing) and Benefits (employee benefits advice for employers).
Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies.

**Live:** https://srikanthk.pages.dev (Cloudflare Pages project `srikanthk`). `main` is the launch-ready
version; it goes live on 6 November 2026.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home: hero, the four practices, programme, LinkedIn recommendations, FAQ |
| `program.html` | Mindful Professional 360°, the twelve-week curriculum |
| `for-colleges.html` | Placement readiness for colleges |
| `for-corporates.html` | Graduate trainee bootcamps |
| `posh.html` | POSH awareness and Internal Committee training for institutions |
| `advisory.html` | One to one coaching and retained HR advisory |
| `benefits.html` | Employee benefits advisory for employers (advice only, no insurance sold), FAQ |
| `insights.html` | Excerpts from his LinkedIn writing |
| `about.html` | Founder profile |
| `portfolio.html` | Career history, frameworks, engagements, awards, gallery |
| `contact.html` | Enquiry form (consent checkbox, delivered by FormSubmit) and contact details |
| `thanks.html` | Shown after an enquiry is sent (`noindex`) |
| `onepager.html` | Printable A4 leave-behind; source of `srikanth-kalyanasundaram-onepager.pdf` |
| `privacy.html`, `terms.html` | DPDP Act 2023 privacy notice and terms of use |
| `404.html` | Not-found page (root-relative links, `noindex`) |

Shared: `css/style.css` (all design tokens at the top), `js/main.js` (menu, dropdown, display
settings, scroll reveal, form double-submit guard), `_headers` (Cloudflare security and cache headers),
`sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, the IndexNow key file (`<32 hex>.txt`),
`assets/photos` (see its README), `assets/ai`.

## Tools (never deployed)
| File | What it does |
|---|---|
| `tools/launch.sh` | Deploys main to Cloudflare, checks the live pages, pings IndexNow, lists follow-ups |
| `tools/apply-brand.py` | Applies a brand name to every page in one pass (used by `launch.sh "<Brand>"`) |
| `tools/build-llms.py` | Regenerates `llms.txt` and `llms-full.txt` from the pages |

## Features
- **Light and dark mode.** Follows the device; the header's display settings button lets a visitor pick
  Auto, Light or Dark, a text size (three steps) and reduced motion. Saved in that browser only.
- **Accessibility.** Skip link, `main` landmark, visible focus, WCAG AA contrast checked in both themes.
- **SEO.** Short titles and descriptions, canonical URLs, `en-IN` language and hreflang, Open Graph and
  Twitter cards, JSON-LD (Person, ProfessionalService with offer catalogues, Service, ProfilePage,
  ContactPage, BreadcrumbList, FAQPage), image sitemap, IndexNow.
- **AI search.** `robots.txt` welcomes AI crawlers by name; `llms.txt` and `llms-full.txt` give
  assistants an accurate summary and the full text of every page; FAQ answers are written to be quotable.
- **India compliance.** Privacy notice (DPDP Act 2023), terms with grievance contact and Mumbai
  jurisdiction, consent on the enquiry form, testimonials quoted verbatim with dates, benefits work
  stated as advice only.

## Run locally
```bash
python3 -m http.server 8000
```
Open http://localhost:8000.

## Deploy
The Cloudflare project is not connected to Git, so pushing to `main` does **not** publish. Deploy with:
```bash
tools/launch.sh
```
It needs `npx wrangler login` on the account that owns the project, and `gh` for the brand option.
After editing `onepager.html`, regenerate the PDF (the script does this when it applies a brand).

## Pending
See "Pending" in `CLAUDE.md` for the current list.
