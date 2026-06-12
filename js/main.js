// ── Nav scroll ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Count-up ──
function runCountUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-count]').forEach(runCountUp);
}

// ── Nav activa por scroll ──
(function() {
  const sectionNavMap = {
    'hero':                  null,
    'proyecto-destacado':    'a[href="#proyecto-destacado"]',
    'proyectos':             'a[href="#proyecto-destacado"]',
    'trayectoria':           'a[href="#trayectoria"]',
    'stack':                 'a[href="#stack"]',
    'contacto':              'a[href="#contacto"]'
  };

  const allNavLinks = document.querySelectorAll('.nav a[href^="#"]');

  function setActive(sectionId) {
    allNavLinks.forEach(l => l.classList.remove('nav--active'));
    const selector = sectionNavMap[sectionId];
    if (selector) {
      const link = document.querySelector(selector);
      if (link) link.classList.add('nav--active');
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-60px 0px -60% 0px',
    threshold: 0
  });

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
})();

// ── Clipboard copy email ──
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const feedback = btn.querySelector('.btn-copy__feedback');
      feedback.textContent = 'Copiado ✓';
      btn.classList.add('btn-copy--done');
      setTimeout(() => {
        feedback.textContent = '';
        btn.classList.remove('btn-copy--done');
      }, 2000);
    } catch {
      // fallback silencioso
    }
  });
});
