/* ════════════════════════════════════════════
   UTSHO PORTFOLIO — script.js
   ════════════════════════════════════════════ */

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── STAGGERED GRID ANIMATION ── */
document.querySelectorAll('.skills-grid, .projects-grid, .cert-grid').forEach((grid) => {
  [...grid.children].forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });
});

/* ── LIGHTBOX ── */
function openLightbox(src, title) {
  const overlay = document.getElementById('lightbox');
  const img     = document.getElementById('lightbox-img');
  const label   = document.getElementById('lightbox-title');

  img.src        = src;
  label.textContent = title;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close lightbox on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── CERTIFICATE IMAGE PROTECTION ── */

/* 1. Block right-click context menu on cert images and the lightbox */
document.addEventListener('contextmenu', (e) => {
  if (
    e.target.classList.contains('cert-thumb') ||
    e.target.classList.contains('cert-thumb-placeholder') ||
    e.target.id === 'lightbox-img' ||
    e.target.closest('#lightbox') ||
    e.target.closest('.cert-card')
  ) {
    e.preventDefault();
    return false;
  }
});

/* 2. Block drag-start on cert images (prevents drag-to-desktop) */
document.addEventListener('dragstart', (e) => {
  if (
    e.target.classList.contains('cert-thumb') ||
    e.target.id === 'lightbox-img'
  ) {
    e.preventDefault();
    return false;
  }
});

/* 3. Block Ctrl+S / Cmd+S (page save) while lightbox is open */
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb.classList.contains('open')) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
  }
});

/* ── SMOOTH ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => navObserver.observe(section));
