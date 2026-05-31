# v10 Personal Site Overhaul

## Overview

Full rebuild of eltoncrego.com from v9 (React 16, CRA, styled-components) to v10 — a single editorial landing page with print-inspired typography, built on a modern stack that supports future expansion (blog posts via MDX).

## Design References

- **benji.org** — minimal, text-focused content layout. Short bio, experience, links. No filler.
- **makingsoftware.com** — print/letterpress typography. Serif display font, justified body text, drop caps, dotted separators, figure annotations. The feel of a well-typeset book page.

## Tech Stack

- **Vite** — build tool, replacing CRA (which is deprecated)
- **React 18 + TypeScript**
- **Tailwind CSS v4** — utility-first styling, typographic control
- **shadcn/ui** — component primitives and theming tokens. Light usage initially, ready for expansion.
- **react-router v7** — single route now, supports `/blog/:slug` later
- **@mdx-js/rollup** — configured in Vite for future MDX blog posts
- **gh-pages** — same deploy flow: `vite build` → `gh-pages -d dist`
- **GitHub Pages SPA redirect** — 404.html client-side routing trick

## Project Structure

```
v10/
├── public/
│   ├── CNAME              (eltoncrego.com)
│   ├── favicon.png         (wonky circle)
│   └── 404.html            (SPA redirect)
├── src/
│   ├── main.tsx
│   ├── app.tsx
│   ├── pages/
│   │   └── home.tsx         (the landing page)
│   ├── components/
│   │   ├── layout.tsx       (centered content column, header/footer)
│   │   └── wonky-circle.tsx (SVG logo component)
│   ├── styles/
│   │   └── globals.css      (Tailwind + font imports + typography base)
│   └── content/             (future: .mdx blog posts go here)
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Visual Design

### Typography

- **Display/heading font**: Print-inspired serif with character. Primary candidate: **Fraunces** (organic, slightly wonky serifs that echo the wonky circle logo). Alternatives: Playfair Display, DM Serif Display.
- **Body font**: Readable serif for bio text. Candidates: **Source Serif 4** or **Lora**. Justified text alignment for the printed-page feel.
- **Accent font**: Monospace for small labels, metadata, dates. Candidates: **JetBrains Mono** or **IBM Plex Mono**, used in small-caps.

### Color Palette

- **Background**: Warm off-white (`#FAFAF8`) — paper-like, not sterile
- **Text**: Near-black (`#1A1A1A`) — softer than pure black, like printed ink
- **Accent**: Green `#7C9072` — carried forward from v9. Used for links, hover states, the wonky circle, decorative elements
- **Subtle**: Light warm gray for separators and secondary text

### Layout

- Centered content column, ~640px max-width
- Generous vertical rhythm with ample whitespace between sections
- Dotted or hand-drawn-style separators between content blocks (inspired by makingsoftware.com's perforated lines)
- Responsive: graceful scaling on mobile, maintaining typographic quality

### Wonky Circle Logo

The existing wonky green circle (currently the favicon) becomes a core brand element used in two ways:

1. **Logo mark**: SVG at the top of the page above the name. Small (~40-48px), accent green.
2. **Decorative motif**: Smaller instances as bullet markers for links, subtle repeating element in footer, or dot separators between inline items.

### Page Flow (Top to Bottom)

1. **Wonky circle** logo mark
2. **Name** in display serif — "Elton Christopher Rego."
3. **Decorative separator** (dotted/hand-drawn style)
4. **Bio paragraph** — 2-3 sentences. Drop cap on first letter, justified text. Who you are, what you do at Frigade, what you care about.
5. **Separator**
6. **Links section** — GitHub, LinkedIn, email. Minimal styling, small wonky circles as bullets.
7. **Footer** — subtle, location or timestamp ("Oakland, CA")

## Content

Minimal. Name, title (Software Engineer at Frigade), short bio, and contact links. No profile photo. No detailed resume. Content can expand later.

## Deployment

Same as v9:
- Custom domain: eltoncrego.com (via CNAME file)
- Build: `vite build` outputs to `dist/`
- Deploy: `gh-pages -d dist`
- SPA routing: 404.html redirect script for client-side routes

## Future Expansion

The architecture supports adding:
- **Blog posts**: Drop `.mdx` files in `content/`, add routes. MDX tooling pre-configured.
- **Additional pages**: react-router already in place.
- **Interactive components**: shadcn/ui ready for richer UI elements.

## Implementation Note

All frontend/UI implementation must use the `/frontend-design:frontend-design` skill to ensure distinctive, crafted design quality — not generic AI output.
