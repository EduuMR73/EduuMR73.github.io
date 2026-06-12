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
// #proyecto-destacado y #proyectos ambos activan el enlace "Proyectos"
const navLinks = document.querySelectorAll('.nav__link');
const sectionToNav = {
  'proyecto-destacado': '#proyecto-destacado',
  'proyectos':          '#proyecto-destacado',
  'trayectoria':        '#trayectoria',
  'stack':              '#stack',
  'contacto':           '#contacto',
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const navHref = sectionToNav[entry.target.id];
    if (!navHref) return;
    navLinks.forEach(link => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === navHref);
    });
  });
}, { rootMargin: '-64px 0px -40% 0px', threshold: 0 });

Object.keys(sectionToNav).forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

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
