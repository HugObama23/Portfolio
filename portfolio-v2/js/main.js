/* ============================================================
   EDITORIAL PORTFOLIO — main.js
   Hugo Hedquist 2026
   ============================================================ */

'use strict';

/* ---- Scroll Reveal ---- */
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function(el) {
    observer.observe(el);
  });
})();

/* ---- Active nav highlight on scroll ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.top-bar-nav a[href^="#"]');

  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) {
            link.removeAttribute('style');
          });
          const active = document.querySelector(
            '.top-bar-nav a[href="#' + entry.target.id + '"]'
          );
          if (active) {
            active.style.color = '#1a1a1a';
          }
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(function(section) {
    observer.observe(section);
  });
})();

/* ---- Smooth anchor offset (account for fixed top bar) ---- */
(function initAnchorOffset() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
