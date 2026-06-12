// ── Nav scroll ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Count-up sincronizado con animación hero (t=850ms) ──
;(function() {
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
    setTimeout(() => {
      document.querySelectorAll('[data-count]').forEach(runCountUp);
    }, 850);
  }
})()

// ── Nav activa por scroll ──
;(function() {
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

// ── Scroll reveals con IntersectionObserver ──
;(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('reveal--visible');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
})();

// ── Lightbox ──
;(function () {
  const dialog   = document.getElementById('lightbox');
  const dlgImg   = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  if (!dialog || !dlgImg) return;

  let lastTrigger = null;

  document.querySelectorAll('.lightbox-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      lastTrigger = btn;
      dlgImg.src = btn.dataset.full || btn.dataset.src;
      dlgImg.alt = btn.dataset.alt || '';
      dialog.showModal();
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  dialog.addEventListener('click', e => {
    if (e.target === dialog) closeLightbox();
  });

  dialog.addEventListener('close', () => {
    lastTrigger?.focus();
    lastTrigger = null;
    dlgImg.src = '';
  });

  function closeLightbox() {
    dialog.close();
  }
})();

// ── Vídeos: Emite scroll+play, toggles tarjetas, pause on exit ──
;(function () {
  const btnEmite = document.getElementById('btn-emite-video');
  const emiteVid = document.getElementById('emite-video');
  if (btnEmite && emiteVid) {
    btnEmite.addEventListener('click', () => {
      emiteVid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emiteVid.play();
    });
  }

  if ('IntersectionObserver' in window) {
    const vo = new IntersectionObserver(
      entries => entries.forEach(e => { if (!e.isIntersecting) e.target.pause(); }),
      { threshold: 0 }
    );
    document.querySelectorAll('video').forEach(v => vo.observe(v));
  }
})();

// ── Clipboard copy email ──
document.querySelectorAll('.btn-copy').forEach(btn => {
  const icon = btn.querySelector('.btn-copy__icon');
  let timer;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      icon.textContent = '✓';
      btn.classList.add('btn-copy--done');
      btn.setAttribute('aria-label', 'Email copiado');
      clearTimeout(timer);
      timer = setTimeout(() => {
        icon.textContent = '⧉';
        btn.classList.remove('btn-copy--done');
        btn.setAttribute('aria-label', 'Copiar email al portapapeles');
      }, 2000);
    } catch {
      // fallback silencioso
    }
  });
});
