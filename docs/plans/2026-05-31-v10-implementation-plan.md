# v10 Personal Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild eltoncrego.com as a single editorial landing page with print-inspired typography on a modern Vite + React stack.

**Architecture:** Vite builds a React 18 SPA with Tailwind CSS v4 for styling and shadcn/ui for theming tokens. react-router v7 handles routing (single route now, expandable). MDX tooling is pre-configured for future blog posts. The page is a centered typographic column with print-editorial design: serif fonts, drop caps, dotted separators, and the wonky green circle as logo/motif.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, shadcn/ui, react-router v7, @mdx-js/rollup, gh-pages

**Design doc:** `docs/plans/2026-05-31-v10-overhaul-design.md`

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`
- Create: `src/main.tsx`, `src/vite-env.d.ts`
- Modify: `.gitignore`

**Step 1: Initialize Vite project**

From the repo root, remove the old CRA files and scaffold a new Vite project. We're rebuilding in-place (same repo, same branch) since v9 is being replaced entirely.

```bash
# Remove old CRA source files (keep docs/, public/CNAME, public/favicon.png, public/404.html)
rm -rf src/ public/index.html public/manifest.json public/content/
rm package.json package-lock.json yarn.lock .prettierrc

# Scaffold Vite + React + TS
npm create vite@latest . -- --template react-ts
```

**Step 2: Clean up scaffolded files**

Remove Vite's default demo content:
```bash
rm src/App.css src/App.tsx src/index.css src/assets/react.svg
```

**Step 3: Restore project-specific public assets**

Copy back the files we need from git:
```bash
git checkout HEAD -- public/CNAME public/favicon.png public/404.html
```

**Step 4: Update `.gitignore` for Vite**

Replace contents with:
```
node_modules
dist
.DS_Store
*.local
```

**Step 5: Update `index.html`**

The Vite-scaffolded `index.html` at project root needs our meta tags, fonts, and SPA redirect script. Update it to:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#7C9072" />
    <meta
      name="description"
      content="Elton C. Rego is a software engineer based in Oakland, CA."
    />
    <link rel="apple-touch-icon" href="/favicon.png" />

    <!-- Google Fonts: Fraunces (display), Source Serif 4 (body), JetBrains Mono (accent) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400&display=swap"
      rel="stylesheet"
    />

    <title>Elty</title>

    <!-- SPA redirect for GitHub Pages -->
    <script type="text/javascript">
      (function (l) {
        if (l.search) {
          var q = {};
          l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
          });
          if (q.p !== undefined) {
            window.history.replaceState(
              null, null,
              l.pathname.slice(0, -1) + (q.p || '') +
              (q.q ? '?' + q.q : '') + l.hash
            );
          }
        }
      })(window.location);
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 6: Create minimal `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>v10</div>
  </StrictMode>
);
```

**Step 7: Install dependencies and verify**

```bash
npm install
npm run dev
```

Expected: Dev server starts, browser shows "v10" on a blank page.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React 18 + TypeScript, remove CRA"
```

---

### Task 2: Install and Configure Tailwind CSS v4

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `vite.config.ts`
- Create: `src/styles/globals.css`
- Modify: `src/main.tsx`

**Step 1: Install Tailwind CSS v4 + Vite plugin**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 2: Add Tailwind plugin to `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Step 3: Create `src/styles/globals.css`**

This is the main stylesheet with Tailwind import and our design tokens:

```css
@import "tailwindcss";

@theme {
  --color-background: #fafaf8;
  --color-foreground: #1a1a1a;
  --color-accent: #7c9072;
  --color-muted: #a3a3a0;
  --color-separator: #e5e5e0;

  --font-display: "Fraunces", serif;
  --font-body: "Source Serif 4", serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

**Step 4: Import globals.css in `src/main.tsx`**

Add to the top of main.tsx:
```tsx
import "./styles/globals.css";
```

**Step 5: Verify Tailwind works**

Update the div in main.tsx to use a Tailwind class:
```tsx
<div className="text-accent font-display text-4xl">v10</div>
```

Run `npm run dev`. Expected: "v10" appears in green Fraunces font.

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind CSS v4 with design tokens"
```

---

### Task 3: Install shadcn/ui

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `tsconfig.json`, `tsconfig.app.json`
- Modify: `vite.config.ts`
- Create: `src/lib/utils.ts`
- Create: `components.json`

**Step 1: Set up path aliases**

shadcn/ui requires `@/` path aliases. Update `tsconfig.app.json` to add:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Also update `tsconfig.json` to include the same paths config if it has a `compilerOptions` section, or ensure it references `tsconfig.app.json`.

Install the vite path resolution helper:
```bash
npm install -D @types/node
```

Update `vite.config.ts` to resolve the `@/` alias:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 2: Initialize shadcn**

```bash
npx shadcn@latest init
```

Choose: New York style, Neutral color, CSS variables: yes. This creates `components.json` and `src/lib/utils.ts`.

**Step 3: Verify build still works**

```bash
npm run dev
```

Expected: Same as before, no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: initialize shadcn/ui with path aliases"
```

---

### Task 4: Set Up react-router v7

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/app.tsx`
- Create: `src/pages/home.tsx`
- Modify: `src/main.tsx`

**Step 1: Install react-router**

```bash
npm install react-router
```

**Step 2: Create `src/pages/home.tsx`**

Placeholder page:
```tsx
export default function Home() {
  return <div>Home</div>;
}
```

**Step 3: Create `src/app.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Step 4: Update `src/main.tsx`**

```tsx
import "./styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Step 5: Verify routing works**

```bash
npm run dev
```

Expected: Browser shows "Home" at localhost root.

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: add react-router v7 with home route"
```

---

### Task 5: Configure MDX Support

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `vite.config.ts`
- Create: `src/content/.gitkeep`
- Create: `src/mdx.d.ts`

**Step 1: Install MDX dependencies**

```bash
npm install @mdx-js/rollup @mdx-js/react
npm install -D @types/mdx
```

**Step 2: Add MDX plugin to `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({ providerImportSource: "@mdx-js/react" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 3: Create TypeScript declaration for MDX**

Create `src/mdx.d.ts`:
```ts
declare module "*.mdx" {
  let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
```

**Step 4: Create content directory**

```bash
mkdir -p src/content
touch src/content/.gitkeep
```

**Step 5: Verify MDX works with a test file**

Create a temporary `src/content/test.mdx`:
```mdx
# Hello MDX

This is a test.
```

Import it temporarily in `home.tsx` to verify it renders, then delete the test file.

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure MDX support for future blog posts"
```

---

### Task 6: Configure GitHub Pages Deployment

**Files:**
- Modify: `package.json`
- Verify: `public/CNAME`, `public/404.html`

**Step 1: Install gh-pages**

```bash
npm install -D gh-pages
```

**Step 2: Add deploy scripts to `package.json`**

Add to `scripts`:
```json
{
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

**Step 3: Verify build output**

```bash
npm run build
```

Expected: `dist/` directory is created with `index.html`, assets, `CNAME`, `favicon.png`, and `404.html`.

Check that CNAME and 404.html are in dist:
```bash
ls dist/CNAME dist/404.html dist/favicon.png
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: configure gh-pages deployment"
```

---

### Task 7: Build the Wonky Circle SVG Component

**Files:**
- Create: `src/components/wonky-circle.tsx`

**Step 1: Extract SVG path from favicon**

Open `public/favicon.png` and trace/recreate the wonky circle shape as an SVG path. The circle is an imperfect/organic circle in accent green (#7C9072). Create an SVG that captures the slightly irregular, hand-drawn quality.

**Step 2: Create `src/components/wonky-circle.tsx`**

```tsx
interface WonkyCircleProps {
  size?: number;
  className?: string;
}

export function WonkyCircle({ size = 48, className }: WonkyCircleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Organic circle path — traced from favicon.png */}
      {/* Replace this path with the actual traced shape */}
      <circle cx="50" cy="50" r="48" />
    </svg>
  );
}
```

Note: The actual SVG path should be traced from the favicon to preserve the wonky/organic shape. If the favicon is close enough to a circle, a slightly deformed ellipse or hand-drawn circle path should be crafted. Use the `/frontend-design:frontend-design` skill to get this right.

**Step 3: Verify component renders**

Import into `home.tsx` temporarily and confirm it renders at the expected size in accent green.

**Step 4: Commit**

```bash
git add src/components/wonky-circle.tsx
git commit -m "feat: add wonky circle SVG logo component"
```

---

### Task 8: Build the Layout Component

**Files:**
- Create: `src/components/layout.tsx`

**Step 1: Create `src/components/layout.tsx`**

A centered content column with the editorial design constraints:

```tsx
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[640px] px-6 py-16 md:py-24">
        {children}
      </main>
    </div>
  );
}
```

**Step 2: Wire layout into the app**

Update `src/app.tsx` to wrap routes in `Layout`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

**Step 3: Verify**

```bash
npm run dev
```

Expected: "Home" text is centered in a ~640px column with padding, on an off-white background.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add centered editorial layout component"
```

---

### Task 9: Build the Landing Page

> **REQUIRED:** Use `/frontend-design:frontend-design` skill for this task.

**Files:**
- Modify: `src/pages/home.tsx`
- Modify: `src/styles/globals.css` (for drop cap, typography utilities)

This is the core of the site. The page must feel like a beautifully typeset broadsheet — not a generic website.

**Design spec for the frontend-design skill:**

The page implements this exact flow top-to-bottom:

1. **Wonky circle** — the `WonkyCircle` component at 40-48px, in accent green (`text-accent`), centered or left-aligned
2. **Name** — "Elton Christopher Rego." in Fraunces (`font-display`), large, with a period at the end
3. **Decorative separator** — dotted or hand-drawn style divider. Inspired by makingsoftware.com's perforated lines
4. **Bio paragraph** — 2-3 sentences in Source Serif 4 (`font-body`), justified text, with a drop cap on the first letter. Content: who Elton is, his role at Frigade, what he cares about
5. **Another separator**
6. **Links section** — GitHub, LinkedIn, email links. Small wonky circles as bullet markers. Minimal styling. Links use accent green on hover
7. **Footer** — subtle, "Oakland, CA" in JetBrains Mono (`font-mono`), small-caps, muted color

**Typography rules:**
- Body text: `font-body`, justified, ~18px/1.7 line-height
- Headings: `font-display`, heavy weight
- Labels/meta: `font-mono`, small-caps, smaller size, muted
- Drop cap: First letter of bio paragraph is large (~3 lines tall), in `font-display`, floated left
- Links: `text-foreground` default, `text-accent` on hover, bold, smooth transition

**Color usage:**
- Background: `bg-background` (#FAFAF8)
- Text: `text-foreground` (#1A1A1A)
- Accent (links, logo, decorative): `text-accent` (#7C9072)
- Muted (footer, captions): `text-muted`
- Separators: `border-separator`

**Step 1: Add typography base styles to `src/styles/globals.css`**

Add base layer styles for body font, justified text, drop cap, and link transitions below the existing `@theme` block.

**Step 2: Build the home page**

Implement the full page in `src/pages/home.tsx` following the design spec above. Use the design references (benji.org layout, makingsoftware.com typography) as guides.

**Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Verify in browser:
- Off-white paper background
- Wonky circle renders in green at top
- Name in Fraunces serif, large, with period
- Dotted separator
- Bio text is justified with a drop cap
- Links with wonky circle bullets
- Footer in monospace small-caps
- Responsive: looks good on mobile widths too

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build editorial landing page with print typography"
```

---

### Task 10: Final Verification and Deploy Prep

**Files:**
- None new — verification only

**Step 1: Build and verify**

```bash
npm run build
```

Expected: Clean build, no errors, `dist/` contains all files.

**Step 2: Check dist contents**

```bash
ls dist/
cat dist/CNAME
```

Expected: CNAME contains `eltoncrego.com`, 404.html and favicon.png are present.

**Step 3: Preview production build**

```bash
npm run preview
```

Verify the production build looks identical to dev.

**Step 4: Run through checklist**

- [ ] Page loads on off-white background
- [ ] Wonky circle renders at top
- [ ] Name displays in Fraunces serif
- [ ] Separators visible between sections
- [ ] Bio text is justified with drop cap
- [ ] Links work and show hover state in green
- [ ] Footer shows in monospace
- [ ] Responsive on mobile viewport
- [ ] Favicon shows wonky circle
- [ ] Page title is "Elty"
- [ ] Meta description is updated

**Step 5: Commit any final tweaks**

```bash
git add -A
git commit -m "chore: final verification and polish"
```

---

## Task Dependency Graph

```
Task 1 (Scaffold Vite)
  └─> Task 2 (Tailwind)
       └─> Task 3 (shadcn)
            └─> Task 4 (react-router)
                 ├─> Task 5 (MDX)
                 ├─> Task 6 (gh-pages)
                 ├─> Task 7 (Wonky Circle)
                 └─> Task 8 (Layout)
                      └─> Task 9 (Landing Page) ← uses /frontend-design skill
                           └─> Task 10 (Verify)
```

Tasks 5, 6, 7 can run in parallel once Task 4 is done.
Task 9 depends on Tasks 7 and 8 (needs WonkyCircle and Layout components).
