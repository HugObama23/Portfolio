'use strict';

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Lukk meny' : 'Apne meny');
  });

  // Close nav when any link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Apne meny');
    });
  });
})();

/* ============================================================
   NAV SCROLL OPACITY
   ============================================================ */
(function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    },
    { passive: true }
  );
})();

/* ============================================================
   CASE STUDY ACCORDION
   ============================================================ */
(function initAccordion() {
  const cards = document.querySelectorAll('.case-card');
  if (!cards.length) return;

  function openCard(card) {
    const btn  = card.querySelector('.case-header');
    const body = card.querySelector('.case-body');
    card.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    // Accessibility: make body content reachable
    if (body) body.removeAttribute('hidden');
  }

  function closeCard(card) {
    const btn  = card.querySelector('.case-header');
    const body = card.querySelector('.case-body');
    card.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.case-header');
    if (!btn) return;

    // Click handler
    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      // Close all cards
      cards.forEach((c) => {
        if (c !== card) closeCard(c);
      });

      // Toggle clicked card
      if (isOpen) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });

    // Keyboard: Enter or Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();
