// ═══════════════════
//  NAV SCROLL
// ═══════════════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ═══════════════════
//  REVEAL ON SCROLL
// ═══════════════════
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ═══════════════════
//  COUNTER ANIMATION
// ═══════════════════
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Trigger counters when hero stats come into view
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.hero-stat-num');
      const data = [
        { el: nums[0], val: 4800, suffix: '+' },
        { el: nums[1], val: 18,   suffix: ' anos' },
        { el: nums[2], val: 4.9,  suffix: '★', isFloat: true }
      ];
      data.forEach(({ el, val, suffix, isFloat }) => {
        if (isFloat) {
          let start = 0;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 1800, 1);
            const v = (1 - Math.pow(1 - p, 3)) * val;
            el.textContent = v.toFixed(1) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          animateCounter(el, val, suffix);
        }
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

// ═══════════════════
//  SMOOTH LINK SCROLL
// ═══════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
