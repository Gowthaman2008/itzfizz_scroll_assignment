# Itzfizz | Scroll-Driven Hero Animation

A hero section where a top-down car drives across the screen as you scroll, revealing the headline behind it.
Built for the Itzfizz Digital Web Development Internship assignment.

**Live demo:** _add your GitHub Pages link here_

## Features
- **Intro animation:** headline letters stagger in (fade + slide up), then stat cards appear one by one.
- **Scroll-driven core animation:** car position, headline reveal (`clip-path`), road lines and stat cards are all tied to scroll progress via GSAP ScrollTrigger (`scrub: 1` for eased, fluid motion). Not time-based; scrolling back reverses it.
- **Performance:** only `transform`, `opacity` and `clip-path` are animated; no layout reads in scroll handlers (`quickSetter` + cached measurements refreshed on resize).
- **Responsive:** fluid sizing with `clamp()` / `vw`, shorter pin distance and 2x2 stat grid on mobile.
- **Accessible:** respects `prefers-reduced-motion`; headline has screen-reader text.

## Tech stack
Next.js (App Router, static export) · React · Tailwind CSS · GSAP + ScrollTrigger · HTML/CSS/JS

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy to GitHub Pages
1. Create a GitHub repo and push this project to the `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Each push to `main` builds and deploys via `.github/workflows/deploy.yml`.
4. Your site will be at `https://<username>.github.io/<repo-name>/`.

## Customize
Edit `lib/config.js` (headline, stats, scroll length) and the colors in `app/globals.css`.
