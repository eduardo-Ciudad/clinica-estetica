/* ── Navbar scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Scroll reveal (IntersectionObserver) ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* Hero elements appear immediately */
document.querySelectorAll('.hero-panel .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 150 + i * 120);
});

/* ── Before / After slider ── */
function initSlider(sliderEl, beforeLayer, line, btn) {
  let active = false;

  function setPos(x) {
    const rect = sliderEl.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((x - rect.left) / rect.width) * 100));
    beforeLayer.style.clipPath = `inset(0 ${(100 - pct).toFixed(1)}% 0 0)`;
    line.style.left = pct.toFixed(1) + '%';
    btn.style.left  = pct.toFixed(1) + '%';
  }

  sliderEl.addEventListener('mousedown',  (e) => { active = true; setPos(e.clientX); });
  sliderEl.addEventListener('touchstart', (e) => { active = true; setPos(e.touches[0].clientX); }, { passive: true });

  window.addEventListener('mouseup',   () => active = false);
  window.addEventListener('touchend',  () => active = false);

  window.addEventListener('mousemove', (e) => { if (active) setPos(e.clientX); }, { passive: true });
  window.addEventListener('touchmove', (e) => { if (active) setPos(e.touches[0].clientX); }, { passive: true });

  /* Intro animation: slide to 55% after load */
  setTimeout(() => {
    const rect = sliderEl.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(rect.left + rect.width * 0.55);
  }, 800);
}

function setupSliders() {
  const s1 = document.getElementById('slider1');
  if (s1) initSlider(s1, document.getElementById('s1-before'), document.getElementById('s1-line'), document.getElementById('s1-btn'));

  const s2 = document.getElementById('slider2');
  if (s2) initSlider(s2, document.getElementById('s2-before'), document.getElementById('s2-line'), document.getElementById('s2-btn'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSliders);
} else {
  setupSliders();
}
