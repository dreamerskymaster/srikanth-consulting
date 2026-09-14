# Photo assets

Real photographs from Srikanth's campus sessions and institutional engagements.
Generated from the original camera and phone files, resized, re-encoded, and stripped
of camera metadata. Every image ships as WebP plus a JPEG fallback, wired up in the
HTML with `<picture>`, `srcset`, and `sizes`.

## What is here

| Base name | Ratio | Widths | Used on |
|---|---|---|---|
| `srikanth-portrait` | 4:5 | 800, 1600 | Home ("Meet Srikanth"), About, Portfolio |
| `campus-session` | 3:2 | 1200, 1800 | Home ("Why it works"), For Colleges |
| `corporate-session` | 3:2 | 1200, 1800 | For Corporates |
| `og-card` | 1200x630 | 1200 | Social share preview on all pages |
| `session-speaking` | 3:2 | 800, 1200 | Portfolio gallery |
| `session-felicitation` | 3:2 | 800, 1200 | Portfolio gallery |
| `session-sahyadri` | 3:2 | 800, 1200 | Portfolio gallery |
| `session-cohort-group` | 3:2 | 800, 1200 | Portfolio gallery |
| `session-srm-cohort` | 3:2 | 800, 1200 | Portfolio gallery |
| `session-sfimar` | 3:2 | 800, 1200 | Portfolio gallery |

## Editing rules

1. **Check for text in the frame before publishing anything new.** Two source photos
   had to be re-cropped: one had Srikanth's personal mobile number written on a
   whiteboard, another had his current employer's name on the event screen. The site
   rule is no phone number anywhere, and naming the current employer on a consulting
   site is a live contract risk. Zoom in and read every whiteboard, banner, and slide.
2. Keep the base widths (800 and 1200) under roughly 200KB. The 2x retina variants
   are allowed to be larger since only high-density screens fetch them.
3. Alt text describes what is actually in the photo. No claims that the image does not
   support.
4. To regenerate, re-run the crop and encode step against the originals rather than
   re-compressing these files.

## Still worth adding

- A proper studio headshot. The current portrait is a crop from a live session and works,
  but a clean 4:5 headshot would be stronger.
- A genuine corporate session photo. Everything here is from campus and institutional
  events, so `corporate-session` is currently an accurately described campus photo.
- Testimonial headshots (`testimonial-college`, `testimonial-corporate`, 1:1, 150px)
  once the first written testimonials exist.
