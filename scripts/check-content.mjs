import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { heroData } from '../src/data/hero.js';
import { experienceData } from '../src/data/experience.js';
import { projectsData } from '../src/data/projects.js';
import { resumeData } from '../src/data/resume.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const textFiles = ['src/data/hero.js', 'src/data/experience.js', 'src/data/projects.js', 'src/data/resume.js', 'index.html', 'public/llms.txt'];
for (const name of textFiles) {
  const text = fs.readFileSync(path.join(root, name), 'utf8');
  assert(!/3\+ years|Apr.?Jul 2025|Apr.?Jul.?2025/.test(text), `Unsupported tenure/promotion claim: ${name}`);
}
assert.equal(heroData.tagline, 'Software Engineer');
assert.deepEqual(projectsData.highlights.slice(0, 2).map(p => p.shortTitle), ['TraceWard', 'ReconcileAI']);
assert(projectsData.highlights.every(p => !p.year.includes('2024')));
for (const project of projectsData.highlights.slice(0, 2)) {
  for (const label of ['Evidence', 'Architecture', 'Demo script']) {
    assert(project.evidence.some(e => e.label === label && e.url.includes('/docs/portfolio-evidence/')), `${project.shortTitle}: missing ${label}`);
  }
}
const experiences = experienceData.experiences;
assert.equal(experiences.find(e => e.slug === 'light-and-wonder-employment').period, 'Aug 2023 – Jul 2025');
assert.equal(experiences.find(e => e.slug === 'light-and-wonder-intern').period, 'Mar 2023 – Jul 2023');
assert.equal(experiences.find(e => e.slug === 'medha-innovations').period, 'Mar 2026 – Sep 2026');
assert(experiences.find(e => e.slug === 'medha-innovations').highlights.some(h => h.includes('October follow-on')));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/resumes/manifest.json'), 'utf8'));
for (const [name, expected] of Object.entries(manifest.files)) {
  const bytes = fs.readFileSync(path.join(root, 'public/resumes', name));
  assert(bytes.subarray(0, 5).toString() === '%PDF-');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, `PDF mismatch: ${name}`);
}
assert.equal(resumeData.url, `/resumes/${manifest.preferred}`);
assert(fs.readFileSync(path.join(root, 'public/resumes/Vinay_K_R_AI_Engineer_Resume.pdf')).equals(fs.readFileSync(path.join(root, 'public', resumeData.url))));
assert(!fs.existsSync(path.join(root, 'public/resumes/Vinay_K_R_AI_Engineer_Resume.docx')));
assert(fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8').includes(`${resumeData.url} 302`));
for (const image of resumeData.pageImages) {
  const bytes = fs.readFileSync(path.join(root, 'public', image));
  assert.equal(bytes.subarray(0, 4).toString(), 'RIFF');
  assert.equal(bytes.subarray(8, 12).toString(), 'WEBP');
}
console.log('PASS: chronology, bounded positioning, flagship evidence/demo links, approved PDF hashes, compatibility copy and current previews');
