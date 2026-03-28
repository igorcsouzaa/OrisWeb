// ─── THEME TOGGLE ───
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

// default: dark
html.setAttribute('data-theme', 'dark');
iconSun.style.display = 'block';
iconMoon.style.display = 'none';

themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  iconSun.style.display = isDark ? 'none' : 'block';
  iconMoon.style.display = isDark ? 'block' : 'none';
});

// ─── INTERSECTION OBSERVER ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => {
  if (!el.classList.contains('visible')) {
    observer.observe(el);
  }
});

// ─── INFINITE MARQUEE (requestAnimationFrame) ───
(function () {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const templateGroup = track.querySelector('.marquee-group');
  if (!templateGroup) return;

  let groupW = 0;

  function measure() {
    // width should include gap/padding so the seam stays invisible
    groupW = templateGroup.getBoundingClientRect().width;
  }

  function rebuild() {
    // Keep only the template, then clone until the track always covers the viewport
    track.querySelectorAll('.marquee-group').forEach((g, idx) => {
      if (idx !== 0) g.remove();
    });

    measure();

    // Ensure enough content so there's never a blank space on wide screens
    const minWidth = window.innerWidth + groupW;
    while (track.scrollWidth < minWidth) {
      track.appendChild(templateGroup.cloneNode(true));
    }

    // Always keep at least 2 groups to guarantee a seamless modulo wrap
    if (track.querySelectorAll('.marquee-group').length < 2) {
      track.appendChild(templateGroup.cloneNode(true));
    }
  }

  rebuild();

  window.addEventListener('resize', rebuild, { passive: true });
  if (document.fonts && typeof document.fonts.ready?.then === 'function') {
    document.fonts.ready.then(rebuild).catch(() => {});
  }

  let pos = 0;
  const speedPxPerSec = 36; // consistent speed across refresh rates
  let lastT = null;

  function tick(t) {
    if (lastT == null) lastT = t;
    const dt = Math.min(50, t - lastT);
    lastT = t;

    pos -= (speedPxPerSec * dt) / 1000;

    if (groupW > 0) {
      while (-pos >= groupW) pos += groupW;
    }

    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// ─── CUSTOM CURSOR LOGIC ───
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  dot.style.left = `${posX}px`;
  dot.style.top = `${posY}px`;

  outline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 150, fill: "forwards" });
});

// Efeito de hover em elementos interativos
const interactive = document.querySelectorAll('a, button, .theme-btn, .service-card');
interactive.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});