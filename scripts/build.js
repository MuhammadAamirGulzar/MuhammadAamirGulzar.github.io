'use strict';
/* Regenerates index.html from content/profile.json.
   No dependencies, no build tool: `node scripts/build.js` and commit the result.
   Run this after any edit to content/profile.json so the live HTML stays in sync. */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const profile = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'profile.json'), 'utf8'));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function factsHtml() {
  return profile.facts.map(f => `
        <li><span class="fact-label">${esc(f.label)}</span> ${esc(f.text)}</li>`).join('');
}

function timelineHtml() {
  return profile.experience.map(e => `
      <li class="timeline-item">
        <div class="timeline-when">${esc(e.when)}</div>
        <div class="timeline-body">
          <h3>${esc(e.title)} · ${esc(e.org)}</h3>
          <p class="timeline-where">${esc(e.location)}</p>
          <p>${esc(e.summary)}</p>
        </div>
      </li>`).join('');
}

function projectsHtml() {
  return profile.projects.map(p => `
      <article class="card">
        <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a></h3>
        <p>${esc(p.description)}</p>
        <p class="card-stack">${esc(p.stack)}</p>
      </article>`).join('');
}

function publicationsHtml() {
  return profile.publications.map(p => `
    <div class="pub">
      <p class="pub-venue">${esc(p.venue)}</p>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <a class="link-arrow" href="${esc(p.link)}" target="_blank" rel="noopener">View on Google Scholar →</a>
    </div>`).join('');
}

function stackHtml() {
  return Object.entries(profile.stack).map(([group, items]) => `
    <div class="stack-group">
      <h3>${esc(group)}</h3>
      <div class="pills">
        ${items.map(i => `<span class="pill">${esc(i)}</span>`).join('')}
      </div>
    </div>`).join('');
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(profile.name)} — ${esc(profile.title)}</title>
<meta name="description" content="${esc(profile.about)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<header class="site-header">
  <nav class="nav">
    <a class="brand" href="#top">${esc(profile.shortName)}</a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
      <li><a href="#about">About</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#publications">Research</a></li>
      <li><a href="#stack">Stack</a></li>
      <li><a class="nav-cta" href="#book">Book a meeting</a></li>
    </ul>
  </nav>
</header>

<main id="top">

  <section class="hero">
    <div class="hero-inner">
      <p class="eyebrow">${esc(profile.eyebrow)}</p>
      <h1>${esc(profile.name)}</h1>
      <p class="hero-lede">${esc(profile.heroLede)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#book">Book a meeting</a>
        <a class="btn btn-ghost" href="#projects">View projects</a>
        <a class="btn btn-ghost" href="${esc(profile.cvPath)}" target="_blank" rel="noopener">Download CV</a>
      </div>
      <ul class="hero-links">
        <li><a href="${esc(profile.links.github)}" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="${esc(profile.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="${esc(profile.links.scholar)}" target="_blank" rel="noopener">Google Scholar</a></li>
        <li><a href="mailto:${esc(profile.email)}">Email</a></li>
      </ul>
    </div>
  </section>

  <section id="about" class="section reveal">
    <h2 class="section-title">About</h2>
    <div class="about-grid">
      <p class="about-text">${esc(profile.about)}</p>
      <ul class="facts">${factsHtml()}
      </ul>
    </div>
  </section>

  <section id="experience" class="section reveal">
    <h2 class="section-title">Experience</h2>
    <ol class="timeline">${timelineHtml()}
    </ol>
  </section>

  <section id="projects" class="section reveal">
    <h2 class="section-title">Featured work</h2>
    <div class="card-grid">${projectsHtml()}
    </div>
    <p class="more-work">More on <a href="${esc(profile.links.github)}" target="_blank" rel="noopener">GitHub →</a></p>
  </section>

  <section id="publications" class="section reveal">
    <h2 class="section-title">Research</h2>${publicationsHtml()}
  </section>

  <section id="stack" class="section reveal">
    <h2 class="section-title">Tech I work with</h2>${stackHtml()}
  </section>

  <section id="book" class="section reveal book-section">
    <div class="book-card">
      <h2 class="section-title">Let's talk</h2>
      <p>
        Open to AI engineering engagements, research collaborations, and consulting on
        GenAI products. Pick a time that works for you — you'll get a calendar invite with
        a video-call link straight away, no back-and-forth needed.
      </p>
      <a class="btn btn-primary btn-large" id="bookLink" href="#" target="_blank" rel="noopener">Book a meeting</a>
      <p class="book-fallback">Prefer async? <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>
    </div>
  </section>

</main>

<footer class="site-footer">
  <p>© <span id="year"></span> ${esc(profile.name)}</p>
  <ul class="footer-links">
    <li><a href="mailto:${esc(profile.email)}">Email</a></li>
    <li><a href="${esc(profile.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
    <li><a href="${esc(profile.links.github)}" target="_blank" rel="noopener">GitHub</a></li>
    <li><a href="${esc(profile.links.scholar)}" target="_blank" rel="noopener">Scholar</a></li>
  </ul>
</footer>

<script>window.__BOOKING_URL__ = ${JSON.stringify(profile.bookingUrl)};</script>
<script src="script.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('Built index.html from content/profile.json');
