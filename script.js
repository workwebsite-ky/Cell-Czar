/* ═══════════════════════════════════════════════
   CELL CZAR — script.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── LOADER ─── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 900);
  });

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Sticky style
    navbar.classList.toggle('scrolled', y > 50);

    // Back to top visibility
    backTop.classList.toggle('visible', y > 500);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  });

  /* ─── BACK TO TOP ─── */
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── HAMBURGER / MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ─── SMOOTH SCROLL for all internal links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── REVEAL ON SCROLL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ─── ANIMATED COUNTERS ─── */
  const counters = document.querySelectorAll('.stat-num');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = formatNum(target);
            clearInterval(timer);
          } else {
            counter.textContent = formatNum(Math.floor(current));
          }
        }, 16);
      });
    }
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) countObserver.observe(statsBar);

  function formatNum(n) {
    if (n >= 1000) return n.toLocaleString();
    return n;
  }

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ─── CONTACT FORM ─── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Let the mailto action handle it, just show the message
      setTimeout(() => {
        const msg = document.getElementById('form-msg');
        if (msg) msg.style.display = 'block';
      }, 300);
    });
  }

  /* ─── PARALLAX on hero orbs ─── */
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;

    const orbs = document.querySelectorAll('.bio-orb');
    orbs.forEach((orb, i) => {
      const intensity = (i + 1) * 12;
      orb.style.transform = `translate(${dx * intensity}px, ${dy * intensity}px)`;
    });

    const mol = document.querySelector('.hero-molecule');
    if (mol) {
      mol.style.transform = `translateY(calc(-50% + ${dy * 10}px)) rotate(${dx * 3}deg)`;
    }
  });

  /* ─── SERVICE CARD stagger delay ─── */
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  /* ─── PKG CARD stagger ─── */
  document.querySelectorAll('.pkg-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
  });

  /* ─── WHY CARD stagger ─── */
  document.querySelectorAll('.why-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  /* ─── TESTI CARD stagger ─── */
  document.querySelectorAll('.testi-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
  });

  /* ─── NAV active highlight on load ─── */
  navLinks[0]?.classList.add('active');
});
