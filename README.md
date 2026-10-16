# Srikanth Kalyanasundaram Consulting, website

Marketing site for Srikanth Kalyanasundaram's campus-to-corporate, POSH, coaching and HR advisory practice.
Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies.

**Live:** https://srikanthk.pages.dev (Cloudflare Pages project `srikanthk`)

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home: hero from the Leadership Spotlight feature, programme, LinkedIn recommendations |
| `program.html` | Mindful Professional 360°, the twelve-week curriculum |
| `for-colleges.html` | Placement readiness for colleges |
| `for-corporates.html` | Graduate trainee bootcamps |
| `posh.html` | POSH awareness and Internal Committee training for institutions |
| `advisory.html` | One to one coaching and retained HR advisory |
| `insights.html` | Excerpts from his LinkedIn writing |
| `about.html` | Founder profile |
| `portfolio.html` | Career history, frameworks, engagements, awards, gallery |
| `contact.html` | Enquiry form (with consent checkbox) and contact details |
| `onepager.html` | Printable A4 leave-behind; source of `srikanth-kalyanasundaram-onepager.pdf` |
| `privacy.html`, `terms.html` | DPDP Act 2023 privacy notice and terms of use |
| `404.html` | Not-found page (root-relative links, `noindex`) |

Shared: `css/style.css` (all design tokens at the top), `js/main.js` (menu, dropdown, display
settings, scroll reveal, demo form handler), `_headers` (Cloudflare security headers),
`sitemap.xml`, `robots.txt`, `llms.txt`, `assets/photos` (see its README), `assets/ai`.

## Features
- **Light and dark mode.** Follows the device; the header's display settings button lets a visitor pick
  Auto, Light or Dark, a text size (three steps) and reduced motion. Saved in that browser only.
- **Accessibility.** Skip link, `main` landmark, visible focus, WCAG AA contrast checked in both themes.
- **SEO.** Name-first titles, JSON-LD (Person, ProfessionalService, Service, ProfilePage), image sitemap,
  `llms.txt`. Canonical URLs point at srikanthk.pages.dev.
- **India compliance.** Privacy notice (DPDP Act 2023), terms with grievance contact and Mumbai jurisdiction,
  consent on the enquiry form, testimonials quoted verbatim with dates.

## Run locally
```bash
python3 -m http.server 8000
```
Open http://localhost:8000.

## Deploy
The Cloudflare project is not connected to Git, so pushing to `main` does **not** publish.
Deploy from a clean copy that leaves out the Markdown notes (they must not go public):
```bash
rsync -a --delete --exclude .git --exclude '*.md' --exclude .gitignore --exclude .nojekyll \
  --exclude .DS_Store --exclude .wrangler ./ /tmp/sk-dist/
npx wrangler pages deploy /tmp/sk-dist --project-name srikanthk --branch main
```
Requires `npx wrangler login` on the account that owns the project.

To regenerate the one-page PDF after editing `onepager.html`, print it with headless Chrome
(`--print-to-pdf`, light theme, A4) and check it is still one page.

## Pending
See "Pending" in `CLAUDE.md` for the current list.
