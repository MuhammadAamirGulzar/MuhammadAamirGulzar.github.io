'use strict';

// Set from content/profile.json's bookingUrl by scripts/build.js — edit that, not this.
document.getElementById('bookLink').href = window.__BOOKING_URL__;

document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Era pipeline ----------
const eraButtons = document.querySelectorAll('.era-btn');
const eraSummaryEl = document.getElementById('eraDetailSummary');
const eraEvidenceEl = document.getElementById('eraDetailEvidence');

function activateEra(btn) {
  eraButtons.forEach(b => {
    b.classList.remove('is-active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('is-active');
  btn.setAttribute('aria-pressed', 'true');

  eraSummaryEl.textContent = btn.dataset.summary;

  let evidence = [];
  try { evidence = JSON.parse(btn.dataset.evidence); } catch (e) { evidence = []; }
  eraEvidenceEl.innerHTML = evidence.map(ev => {
    const a = document.createElement('a');
    a.href = ev.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = ev.name + ' →';
    const li = document.createElement('li');
    li.appendChild(a);
    return li.outerHTML;
  }).join('');
}

eraButtons.forEach(btn => {
  btn.addEventListener('click', () => activateEra(btn));
});

// ---------- Recruiter / Researcher lens ----------
const lensRecruiter = document.getElementById('lensRecruiter');
const lensResearcher = document.getElementById('lensResearcher');
const heroLede = document.getElementById('heroLede');

function setLens(view) {
  document.body.setAttribute('data-view', view);
  const isResearcher = view === 'researcher';
  lensRecruiter.setAttribute('aria-pressed', String(!isResearcher));
  lensResearcher.setAttribute('aria-pressed', String(isResearcher));
  if (heroLede) {
    heroLede.textContent = isResearcher ? heroLede.dataset.researcher : heroLede.dataset.recruiter;
  }
  try { localStorage.setItem('lens', view); } catch (e) { /* private mode etc. */ }
}

lensRecruiter.addEventListener('click', () => setLens('recruiter'));
lensResearcher.addEventListener('click', () => setLens('researcher'));

let savedLens = 'recruiter';
try { savedLens = localStorage.getItem('lens') || 'recruiter'; } catch (e) { /* private mode etc. */ }
if (savedLens === 'researcher') setLens('researcher');

const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  revealTargets.forEach(el => io.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
