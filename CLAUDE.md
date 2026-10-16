# CLAUDE.md, Website

Context for any AI assistant (or developer) working on this website. Read this before editing.

## What this is
The marketing website for Srikanth Kalyanasundaram's consulting practice (campus-to-corporate,
POSH for institutions, coaching and HR advisory). Static HTML, CSS and JavaScript. No framework,
no build step, no dependencies. Live at **https://srikanthk.pages.dev**.

## File map
- `index.html`, home (hero from the Leadership Spotlight feature, LinkedIn recommendations)
- `program.html`, the Mindful Professional 360° curriculum
- `for-colleges.html`, conversion page for placement officers and deans
- `for-corporates.html`, conversion page for L&D and HR teams
- `posh.html`, POSH awareness and Internal Committee training for institutions
- `advisory.html`, one to one coaching and retained HR advisory
- `insights.html`, selected excerpts from his own LinkedIn writing
- `about.html`, founder profile
- `portfolio.html`, career history, frameworks, engagements, awards, session gallery
- `contact.html`, enquiry form (required consent checkbox) plus contact methods
- `onepager.html`, print-first A4 leave-behind, source for `srikanth-kalyanasundaram-onepager.pdf`
- `privacy.html`, DPDP Act 2023 privacy notice; `terms.html`, terms of use and grievances
- `404.html`, not-found page; uses root-relative links because it is served at any path
- `css/style.css`, the single stylesheet; brand tokens and theme role tokens at the top
- `js/main.js`, mobile menu, nav dropdown, display settings, scroll reveal, demo form handler
- `_headers`, Cloudflare Pages security headers; `sitemap.xml`, `robots.txt`, `llms.txt` for search and AI

## Shared header and footer
Duplicated verbatim in every page (no templating, by design). Change one, change all of them.
The header holds the "What we do" dropdown (`.nav-group` plus its handler in `js/main.js`), the
Book a Consultation button, and the display settings button and panel (`.a11y`). Each page also
has a small inline script in `<head>` that applies saved display settings before first paint; keep
it in every page or the wrong theme flashes. The footer carries Privacy, Terms and Grievances links.
`onepager.html` has no site header; its sheet is the `main` element.

## Theme and accessibility
- Brand tokens (`--ink`, `--ivory`, `--brass`, ...) never change. Role tokens (`--bg`, `--bg-2`,
  `--surface`, `--text`, `--band`, `--band-soft`) carry the theme. Use role tokens in new CSS;
  hard-coded colours break dark mode.
- Dark mode follows `prefers-color-scheme` unless the visitor picks one (`data-theme` on `<html>`).
  Text size is `data-text` (rem based, so keep font sizes in rem). Reduced motion is `data-motion`.
- Settings live in `localStorage` key `sk-display`, in the visitor's browser only.
- Contrast was checked to WCAG AA 4.5:1 for every text and surface pair in both themes. `--brass-deep`
  was darkened to `#7d5c27` for that reason; re-check if you touch colours.

## Deploy
Cloudflare Pages project `srikanthk` (account of ajithsri3103@gmail.com). **Not Git-connected:
pushing to `main` does not publish.** Deploy a copy without the Markdown notes:
```bash
rsync -a --delete --exclude .git --exclude '*.md' --exclude .gitignore --exclude .nojekyll \
  --exclude .DS_Store --exclude .wrangler ./ /tmp/sk-dist/
npx wrangler pages deploy /tmp/sk-dist --project-name srikanthk --branch main
```
Never run `wrangler deploy` inside the repo: it writes `.wrangler/`, which once got uploaded as
public assets. Canonical URLs, the sitemap and JSON-LD all use `https://srikanthk.pages.dev/` with
extensionless paths (`/about`); Cloudflare redirects `about.html` to `/about`.

Keep the repo to a single `main` branch: branch, merge the PR, delete the branch.

## Hard rules (do not break these)
1. **No fabricated claims.** No statistics, placement percentages, counts of people trained, PhD or
   "Dr." title, or "India's first" claims unless the family confirms they are real and documented.
2. **No em dashes.** The owner's stated preference, in visible copy and code comments.
3. **Lead with outcomes and credibility, not mindfulness.** Mindfulness is a supporting benefit.
4. **Keep it honest about AI.** "Human-led, AI-augmented," never "AI cannot do this."
5. **Testimonials are verbatim and dated.** Home page quotes come from his public LinkedIn
   recommendations (linkedin.com/in/campus2corporate). Do not edit their wording.
6. **Do not publish the Markdown notes.** They mention his employment Code of Conduct question.

## Design system
- Colours: `--ink` navy `#14202e`, `--ivory` `#f7f4ec`, `--brass` accent `#b5893f`, plus greys.
- Type: Fraunces for headings, Inter for body, from Google Fonts.
- Radius 4px, restrained shadows. The feel is an established consultancy, not a startup.
- Layout helpers: `.wrap`, `.section-dark`, `.section-paper`, `.split`, `.grid-3`, `.card`, `.aud`,
  `.steps`, `.prose` (legal pages). Reuse these rather than inventing new patterns.

## Current status (15 October 2026)
Live at https://srikanthk.pages.dev with light and dark mode, display settings, SEO structured data,
the DPDP privacy notice and terms, and the contact email `srikanthsund@gmail.com` on every page and
in the one-page PDF. The air compressor commissioning line has been removed everywhere. The repo
has one branch, `main`, and the live site matches it.

## Pending
1. **Contact form backend.** The form is still a demo (shows a note, sends nothing). Connect a free
   Formspree form: set the `action` on `contact.html` and remove `id="lead-form"` so `main.js` stops
   intercepting it. The privacy notice already allows for a form service.
2. **Employment contract and legal review.** His Code of Conduct may bar consulting while employed;
   a lawyer should review it, and the privacy notice and terms, before the site is promoted as a business.
3. **Current employer named seven times** (once on home, six on portfolio). A live review item
   given point 2.
4. **GitHub Pages copy still live** at dreamerskymaster.github.io/srikanth-consulting, and the repo is
   public, so this file can be read by anyone. Turn off Pages (Settings, Pages) and consider making
   the repo private.
5. **Google Search Console.** Add srikanthk.pages.dev, verify, submit `sitemap.xml`. Needs the owner's
   Google login.
6. **Testimonial placeholders** on `for-colleges.html` and `for-corporates.html`: keep until real pilot
   quotes exist.
7. **Calendar link.** The "Book a 15 minute intro call" buttons point at `contact.html`; swap the `href`
   in each page's `.cta-band` (and the hero buttons on `posh.html` and `advisory.html`) once a free
   Cal.com or Calendly link exists.
8. **Optional:** a domain in his name (paid, about ₹500 to ₹1,000 a year) and a domain email to replace
   the Gmail address; Git-connect the Cloudflare project for automatic deploys (would need a build
   step that excludes `*.md`).
