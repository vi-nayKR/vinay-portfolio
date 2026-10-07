# Vinay K R: AI Engineer portfolio

Live: https://portfolio.vinaykr.workers.dev

A single-page portfolio built with React 19, Vite 8, Tailwind CSS v4 and Motion. Default theme: **Aurora** (cyan → indigo
on GitHub-dark), plus Void, Neon, Arctic and Light. Hosted on Cloudflare Workers as static assets.

## Structure

```
.
├── index.html              page shell, SEO and Open Graph meta
├── wrangler.jsonc          Cloudflare Workers config (serves dist/ as an SPA)
├── vite.config.js
├── package.json            dev / build / verify / deploy / export-resume scripts
├── resume/                 source of truth: Vinay_K_R_AI_Engineer_Resume_final.docx
├── scripts/
│   ├── verify.cjs          Playwright check: 7 tabs × 6 viewports, overflow, console errors, 404s, carousels, themes
│   └── export-resume.ps1   resume .docx → public/resumes/{.docx,.pdf,pages/*.webp}
├── public/                 copied as-is to the site root
│   ├── _headers            security + cache headers
│   ├── icon.svg  robots.txt  sitemap.xml  llms.txt
│   ├── images/             avatar.webp (Home), research-terminal.png (Research), og-image.jpg (link previews)
│   └── resumes/            PDF + DOCX downloads, pages/page-1.webp + page-2.webp (Resume tab slider)
└── src/
    ├── App.jsx  main.jsx  index.css   (themes are CSS variables in index.css)
    ├── components/         one component per tab + Navbar, Footer, PagedCarousel
    ├── data/               ALL text content (edit here, not in components)
    └── hooks/              useBoundedCarousel (Skills tab)
```

## Develop

```bash
npm ci            # install exact versions from package-lock.json
npm run dev       # http://localhost:5173
npm run verify    # build + full Playwright check (needs Google Chrome installed)
```

## Deploy (Cloudflare)

```bash
npx wrangler login     # once per machine, with the account that owns portfolio.vinaykr.workers.dev
npm run deploy         # vite build && wrangler deploy
```
Roll back with `npx wrangler deployments list`, then `npx wrangler rollback <version-id>`.

## Updating content

| Change | Edit |
|---|---|
| Home tagline / tech chips | `src/data/hero.js` |
| Skills | `src/data/skills.js` |
| Experience cards | `src/data/experience.js` |
| Project cards and evidence links | `src/data/projects.js` (numbers only from each repo's committed `results/`) |
| Research paper + live demo link | `src/data/research.js` |
| Resume headline text | `src/data/resume.js` |
| Contact links | `src/data/contact.js` |
| AI-crawler summary | `public/llms.txt` |
| Title / description / share image | `index.html`, `public/images/og-image.jpg` |

**Resume:** replace `resume/Vinay_K_R_AI_Engineer_Resume_final.docx`, then run `npm run export-resume`. It needs Microsoft
Word plus a Python with `pymupdf` and `pillow`, passed as `-Python <path>`. It regenerates the PDF, DOCX and the two page
images used by the Resume tab. Then run `npm run verify` and `npm run deploy`.

Keep every claim on the site identical to the resume, and every number traceable to a committed result.
