# CLAUDE.md, Website

Context for any AI assistant (or developer) working on this website. Read this before editing.

## What this is
A six-page marketing website for Srikanth Kalyanasundaram's consulting practice. Static HTML, CSS, and JavaScript. No framework, no build step, no dependencies. Open `index.html` to run it. Deploy on any static host (Netlify, GitHub Pages, Cloudflare Pages).

## File map
- `index.html`, home
- `program.html`, the Mindful Professional 360° curriculum
- `for-colleges.html`, conversion page for placement officers and deans
- `for-corporates.html`, conversion page for L&D and HR teams
- `posh.html`, POSH awareness and Internal Committee training for institutions
- `advisory.html`, one to one coaching and retained HR advisory
- `insights.html`, selected excerpts from his own LinkedIn writing
- `about.html`, founder profile
- `portfolio.html`, career history, frameworks, engagements, awards, session gallery
- `contact.html`, enquiry form plus contact methods
- `onepager.html`, print-first A4 leave-behind, source for the committed PDF
- `css/style.css`, the single shared stylesheet, all design tokens live at the top as CSS variables
- `js/main.js`, mobile menu, nav dropdown, scroll reveal, and a demo form handler

## Shared header and footer
Both are duplicated verbatim in every page (no templating, by design). If you change one you
must change all of them. The five offer pages sit behind a "What we do" dropdown so the top
level stays at six items; the nav was already crowded at seven and adding pages flat would
break it again. The dropdown needs `.nav-group` markup plus the handler in `js/main.js`, and
the active page is marked with `class="active"` in both the desktop panel and the mobile list.

## The calendar link
Every page closes with a "Book a 15 minute intro call" button currently pointing at
`contact.html`. Once a scheduling link exists (Cal.com and Calendly both have a free tier),
swap the `href` in the `.cta-band` of each page and in the two hero buttons on `posh.html`
and `advisory.html`. Keep the header CTA pointing at `contact.html`.

## Hard rules (do not break these)
1. **No fabricated claims.** Do not add statistics, placement percentages, counts of people trained, a PhD or "Dr." title, or "India's first" style claims unless the family confirms they are real and documented. As of the last update, none of those were verified, so they are absent by design.
2. **No em dashes.** The owner's stated preference. Use commas, colons, parentheses, or semicolons. This applies to visible copy and code comments.
3. **Lead with outcomes and credibility, not mindfulness.** The buyers care about placements and readiness. Mindfulness is a supporting benefit, framed as the thing that improves interview performance, not the headline.
4. **Keep it honest about AI.** The framing is "human-led, AI-augmented," never "AI cannot do this."

## Design system
- Colours (CSS variables in `style.css`): `--ink` navy `#14202e`, `--ivory` `#f7f4ec`, `--brass` accent `#b5893f`, plus supporting greys.
- Type: Fraunces for headings, Inter for body, loaded from Google Fonts.
- Radius is small (4px) and shadows are restrained. The intended feel is an established consultancy, not a startup.
- Layout helpers: `.wrap` (max width), `.section-dark`, `.section-paper`, `.split`, `.grid-3`, `.card`, `.aud`, `.steps`. Reuse these rather than inventing new patterns.

## Placeholders to replace before launch
See `README.md` in this folder for the full checklist. Still outstanding: the email `EMAIL_TO_CONFIRM@domain` (17 occurrences across all seven pages), wiring the contact form to a service like Formspree, and the four testimonial placeholders. Already done: real photographs (see `assets/photos/README.md`), the LinkedIn URL, and removal of the WhatsApp number.

## Current status
Deployed for review at https://dreamerskymaster.github.io/srikanth-consulting/. Real photographs are in as of September 2026. Waiting on a real contact email, a working form backend, and (ideally) the first pilot testimonial before it is promoted as a live business site. Per the wider strategy, the website is not the current priority; validating demand and checking the employment contract come first.

One standing caution: the copy names the current employer seven times (once on the home page, six on the portfolio). Given the Code of Conduct question, treat that as a live review item rather than settled.
