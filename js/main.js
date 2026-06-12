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
