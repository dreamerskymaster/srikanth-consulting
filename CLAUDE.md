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
- `benefits.html`, employee benefits advisory for employers (advice only; states that no insurance is sold or arranged)
- `insights.html`, selected excerpts from his own LinkedIn writing
- `about.html`, founder profile
- `portfolio.html`, career history, frameworks, engagements, awards, session gallery
- `contact.html`, enquiry form (required consent checkbox) plus contact methods; posts to FormSubmit
- `thanks.html`, where FormSubmit returns visitors after an enquiry (`noindex`)
- `onepager.html`, print-first A4 leave-behind, source for `srikanth-kalyanasundaram-onepager.pdf`
- `privacy.html`, DPDP Act 2023 privacy notice; `terms.html`, terms of use and grievances
- `404.html`, not-found page; uses root-relative links because it is served at any path
- `css/style.css`, the single stylesheet; brand tokens and theme role tokens at the top
- `js/main.js`, mobile menu, nav dropdown, display settings, scroll reveal, form double-submit guard
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
6. **Do not publish the Markdown notes.** They are for maintainers only; the deploy step excludes `*.md`.

## SEO and AI search
- Every indexable page has a title under about 65 characters, a description under 160, matching Open Graph
  and Twitter tags, a canonical URL, `hreflang` en-IN and x-default, `lang="en-IN"` and `og:locale` en_IN.
- Structured data (JSON-LD): Person and ProfessionalService (with the four practices as offer catalogues)
  on the home page, ProfilePage on About, Service on each service page, BreadcrumbList on inner pages,
  ContactPage, and FAQPage on the home and benefits pages. FAQ JSON-LD must match the visible FAQ text
  word for word; edit both together.
- `robots.txt` welcomes search and AI crawlers by name; `/thanks` is excluded and `noindex`.
- `llms.txt` (summary) and `llms-full.txt` (text of every public page) are for AI assistants. They are
  generated, so regenerate them after editing page text (script kept outside the repo, with Ajith).
- The `<32 hex>.txt` file at the root is the IndexNow key; the launch script pings IndexNow after deploys.
- Not done yet (needs the owner's Google login): Google Search Console verification and sitemap submit.

## Contact form
The form posts directly (no JavaScript interception) to `https://formsubmit.co/mtmdselflove@gmail.com`,
a free service with no account, and FormSubmit redirects to `/thanks`. The first submission from the
live site sends an "Activate Form" email to that inbox; someone must click it once before enquiries are
delivered. `_honey` is a spam honeypot; `_template=table` formats the email. The privacy notice names
FormSubmit and Gmail as the services that handle enquiries.

## Design system
- Colours: `--ink` navy `#14202e`, `--ivory` `#f7f4ec`, `--brass` accent `#b5893f`, plus greys.
- Type: Fraunces for headings, Inter for body, from Google Fonts.
- Radius 4px, restrained shadows. The feel is an established consultancy, not a startup.
- Layout helpers: `.wrap`, `.section-dark`, `.section-paper`, `.split`, `.grid-3`, `.card`, `.aud`,
  `.steps`, `.prose` (legal pages). Reuse these rather than inventing new patterns.

## Current status (29 October 2026)
Live at https://srikanthk.pages.dev with light and dark mode, display settings, SEO structured data,
the DPDP privacy notice and terms, and the contact email `mtmdselflove@gmail.com`. This branch adds the
owner's four practices (Campus, Respect, Inspire, Benefits) on the home page, his new founder bio on the
About page, the Employee Benefits page, a working contact form, and a compliance pass (no placeholder
testimonials, sourced statistics, advice-only wording for benefits). Planned launch: 6 November 2026.

## Pending
1. **Activate the contact form** on launch day: submit one test enquiry on the live site, then click
   "Activate Form" in the mtmdselflove@gmail.com inbox, then send a second test.
2. **Employment contract.** The owner should confirm his employment terms allow this work before the
   site is promoted as a business.
3. **Current employer named seven times** (once on home, six on portfolio). Review with point 2.
4. **The repo is public**, so this file and its history can be read by anyone, and a GitHub Pages copy
   is live at dreamerskymaster.github.io/srikanth-consulting. Turn off Pages and make the repo private.
5. **Google Search Console.** Add srikanthk.pages.dev, verify, submit `sitemap.xml`. Needs the owner's
   Google login.
6. **Testimonials** for the college and corporate pages: add real, named, dated quotes after the first
   pilots (the placeholders were removed).
7. **Calendar link.** The "Book a 15 minute intro call" buttons point at `contact.html`; swap the `href`
   once a free Cal.com or Calendly link exists.
8. **Optional:** a domain and a domain email; Git-connect the Cloudflare project for automatic deploys
   (would need a build step that excludes `*.md`).
