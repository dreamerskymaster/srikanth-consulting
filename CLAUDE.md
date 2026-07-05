# CLAUDE.md, Website

Context for any AI assistant (or developer) working on this website. Read this before editing.

## What this is
A six-page marketing website for Srikanth Kalyanasundaram's consulting practice. Static HTML, CSS, and JavaScript. No framework, no build step, no dependencies. Open `index.html` to run it. Deploy on any static host (Netlify, GitHub Pages, Cloudflare Pages).

## File map
- `index.html`, home
- `program.html`, the Mindful Professional 360° curriculum
- `for-colleges.html`, conversion page for placement officers and deans
- `for-corporates.html`, conversion page for L&D and HR teams
- `about.html`, founder profile
- `contact.html`, enquiry form plus contact methods
- `css/style.css`, the single shared stylesheet, all design tokens live at the top as CSS variables
- `js/main.js`, mobile menu, scroll reveal, and a demo form handler

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
See `README.md` in this folder for the full checklist. In short: the WhatsApp number `910000000000`, the email `hello@example.com`, the LinkedIn URL, a calendar link, wiring the contact form to a service like Formspree, and swapping the grey photo boxes for real images.

## Current status
Draft, complete, and previewed. Not yet deployed. Waiting on real photos, real contact details, and (ideally) the first pilot testimonial before going live. Per the wider strategy, the website is not the current priority; validating demand and checking the employment contract come first.
