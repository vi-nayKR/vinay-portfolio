# Vinay K R — Software Engineer portfolio

Canonical site: https://portfolio.vinaykr.workers.dev/
Canonical source: `vi-nayKR/vinay-portfolio` — React 19, Vite 8, Tailwind CSS v4 and Motion.

The existing themes, navigation and page structure are preserved. Archived `Portfolio-Ng` is a superseded Angular implementation. **Do not deploy it:** its historical configuration targets the same `portfolio` Worker.

## Deployment-source evidence

Before this update, a browser inspection of the public site returned HTTP 200, the Vite `/assets/index-DxTYjnvJ.js` entrypoint and the exact React hero copy in this repository's previous content. Both candidate repositories name the same Cloudflare Worker, so a README/configuration URL alone is not provenance.

Cloudflare authentication matches the account configured in `wrangler.jsonc`; `wrangler deployments list --name portfolio` shows deployment versions but reports their source as unknown. There are no GitHub deployment records or deploy workflows establishing automatic Git-to-Worker publishing. The supported publish path for this checkout is the explicit `npm run deploy` command. Inspect its diff and build before running it; do not infer that pushing a branch deploys the site.

## Develop and verify

```sh
npm ci
npm run check:content
npm run build
npm run verify
```

`verify` builds and runs the existing Playwright suite across navigation, viewports, carousels and themes; Google Chrome is required. Browser screenshots are ignored by Git. Development-tool dependency advisories must be reviewed separately from the production dependency audit; do not apply an automatic broad upgrade as a content edit.

## Content contract

| Area | Source |
|---|---|
| Home and positioning | `src/data/hero.js` |
| Experience and chronology | `src/data/experience.js` |
| Project scope/evidence/demo links | `src/data/projects.js` |
| Research chronology | `src/data/research.js` |
| Résumé links and summary | `src/data/resume.js` |
| Search/share metadata | `index.html` |
| Machine-readable career summary | `public/llms.txt` |

Keep internship, employment, venture activity and later portfolio experiments distinct. No three-years-of-production-Python claim is supported. Employer-specific technical work remains candidate-reported. Project evaluation, deterministic tests and prerecorded demonstrations are different evidence.

The first two projects are TraceWard and ReconcileAI. Their links target the pushed documentation-review branches so the referenced architecture/evidence/demo files actually exist. Medha and SRE also identify their review branches; do not imply those branches were merged or that public changes certified private systems.

## Approved résumé assets

- Default: `public/resumes/Vinay_K_R_Software_Engineer_Resume_ATS.pdf`.
- Layout-preserving alternative: `public/resumes/Vinay_K_R_Software_Engineer_Resume.pdf`.
- The legacy `Vinay_K_R_AI_Engineer_Resume.pdf` URL is a byte-identical compatibility copy of the default PDF.
- `public/resumes/manifest.json` records the approved PDFs' SHA-256 values. The original local PDFs are not modified by publication.
- `public/resumes/pages/page-{1,2}.webp` are rendered from the default ATS PDF, not the older Word document.
- The obsolete public DOCX download was moved out of static assets into `resume/legacy-public-download.docx`; its old URL redirects to the current PDF.

The contact form opens a prefilled draft in the visitor's email application; it does not deliver messages or falsely report successful delivery. The browser test captures the draft URL without launching an email app.

The Word files in `resume/` are **historical sources, not the current résumé**. The old `export-resume` PowerShell script can regenerate stale claims and must not be used as the approved publishing workflow. To update, approve a new PDF, copy it to the appropriate public path, refresh compatibility copies/manifest and regenerate both previews. Re-run content and browser checks.

## Publish

```sh
npx wrangler whoami
npm run check:content
npm run deploy -- --strict --keep-vars --message "vi-nayKR/vinay-portfolio@$(git rev-parse HEAD)"
```

Use the account that owns the configured `portfolio` Worker. Publishing changes the public site; no server, unrelated Worker, database or Medha runtime needs modification. Record the resulting version ID and verify live copy plus the downloaded PDF hash after deployment. Account authentication is not proof that publication succeeded.
