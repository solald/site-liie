/* ================================================================
   LIIE — main.js (v6 "Clinical Graphite")
   Interactions : preloader, Lenis smooth scroll, split-text, parallax,
   clip-reveal, reveal on scroll, marquee, header auto-hide, counters,
   + héritages (nav mobile, PubMed, active link)
   ================================================================ */

/* ================ 0. Flags ================ */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;

/* ================ 1. Preloader ================ */
(function () {
  if (REDUCED) { document.documentElement.classList.add('js-intro-done'); return; }
  document.documentElement.classList.add('js-intro-ready');

  const pre = document.createElement('div');
  pre.className = 'preloader';
  pre.innerHTML = `
    <div class="preloader-inner">
      <img src="${location.pathname.includes('/projets/') ? '../' : ''}assets/images/logo-liie.png" alt="" aria-hidden="true">
    </div>`;
  document.body.appendChild(pre);

  const minVisible = 900;  // ms — laisse voir la barre, plus rapide
  const start = performance.now();
  const finish = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, minVisible - elapsed);
    setTimeout(() => {
      pre.classList.add('is-leaving');
      // Glissement du logo vers le coin haut-gauche (nav)
      const logoDest = document.querySelector('.site-header .brand-logo');
      const inner = pre.querySelector('.preloader-inner');
      if (logoDest && inner) {
        const src = inner.getBoundingClientRect();
        const dst = logoDest.getBoundingClientRect();
        const dx = (dst.left + dst.width / 2) - (src.left + src.width / 2);
        const dy = (dst.top + dst.height / 2) - (src.top + src.height / 2);
        const scale = dst.width / src.width;
        inner.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        inner.style.opacity = '0';
      }
      document.documentElement.classList.remove('js-intro-ready');
      document.documentElement.classList.add('js-intro-done');
      setTimeout(() => pre.remove(), 1000);
    }, wait);
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
})();

/* ================ 2. Lenis smooth scroll ================ */
(function () {
  if (REDUCED) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
  s.defer = true;
  s.onload = () => {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({
      lerp: 0.085,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
    });
    // Différer le scroll fluide jusqu'à la fin de l'intro (preloader)
    if (!document.documentElement.classList.contains('js-intro-done')) {
      lenis.stop();
      const waitIntro = () => {
        if (document.documentElement.classList.contains('js-intro-done')) {
          lenis.start();
        } else {
          requestAnimationFrame(waitIntro);
        }
      };
      requestAnimationFrame(waitIntro);
    }
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    // Liens d'ancre
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id && id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(id, { offset: -80 });
        }
      });
    });
    window.__lenis = lenis;
  };
  document.head.appendChild(s);
})();

/* ================ 3. Menu mobile ================ */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 900) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ================ 4. Compteur PubMed ================ */
(function () {
  const el = document.getElementById('pubmed-count');
  if (!el) return;
  const term = 'LIIE[Affiliation] OR "Laboratoire d\'Imagerie Interventionnelle Expérimentale"[Affiliation] OR "Interventional Imaging Laboratory"[Affiliation]';
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&rettype=count&retmode=json&term=' + encodeURIComponent(term);
  fetch(url, { cache: 'force-cache' })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const n = data && data.esearchresult && parseInt(data.esearchresult.count, 10);
      if (Number.isFinite(n) && n > 0) el.textContent = n.toLocaleString('fr-FR');
      else el.textContent = '—';
    })
    .catch(() => { el.textContent = '—'; });
})();

/* ================ 5. Nav active ================ */
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  const inProjets = location.pathname.includes('/projets/');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    const isActive =
      file === path ||
      (path === '' && file === 'index.html') ||
      (inProjets && file === 'projets.html');
    if (isActive) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });
})();

/* ================ 6. Scroll progress bar ================ */
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ================ 7. Header auto-hide ================ */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // Auto-hide uniquement sur mobile — sur desktop on garde le header ancré
      if (window.innerWidth <= 960) {
        if (y > 120 && y > lastY) header.classList.add('hidden');
        else header.classList.remove('hidden');
      } else {
        header.classList.remove('hidden');
      }
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();

/* ================ 8. Split-text sur H1 ================ */
(function () {
  if (REDUCED) return;
  // Applique split-line sur paragraphes lead du hero/page-header
  document.querySelectorAll('.hero .lead, .page-header .lead, .project-hero .lead').forEach(p => {
    if (p.dataset.splitDone) return;
    p.dataset.splitDone = '1';
    // simple wrap : split-line autour de tout le texte interne
    const wrap = document.createElement('span');
    wrap.className = 'split-line';
    const inner = document.createElement('span');
    inner.className = 'split-line-inner';
    while (p.firstChild) inner.appendChild(p.firstChild);
    wrap.appendChild(inner);
    p.appendChild(wrap);
    // révélation après le H1
    const isHero = p.closest('.hero, .project-hero, .page-header');
    // lead arrive juste après la fin du stagger du h1 (~ h1Delay + words*22 + 120)
    let heroDelay = 1100;
    if (isHero) {
      const h1 = isHero.querySelector('h1');
      const wc = h1 && h1.dataset.wordCount ? parseInt(h1.dataset.wordCount, 10) : 8;
      heroDelay = 1100 + wc * 22 + 120;
    }
    const delay = isHero ? heroDelay : 250;
    setTimeout(() => p.classList.add('is-visible'), delay);
  });
  document.querySelectorAll('.hero h1, .page-header h1, .project-hero h1').forEach(h => {
    if (h.dataset.splitDone) return;
    h.dataset.splitDone = '1';
    const walk = (node) => {
      const children = Array.from(node.childNodes);
      children.forEach(child => {
        if (child.nodeType === 3) {  // text
          const words = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          words.forEach(w => {
            if (/^\s+$/.test(w)) {
              frag.appendChild(document.createTextNode(w));
            } else if (w.length) {
              const wrap = document.createElement('span');
              wrap.className = 'split-word';
              const inner = document.createElement('span');
              inner.className = 'split-word-inner';
              inner.textContent = w;
              wrap.appendChild(inner);
              frag.appendChild(wrap);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !['BR','SUP','SUB'].includes(child.tagName)) {
          walk(child);
        }
      });
    };
    walk(h);
    // animer progressivement à l'apparition
    const inners = h.querySelectorAll('.split-word-inner');
    inners.forEach((el, i) => { el.style.transitionDelay = (i * 22) + 'ms'; });
    h.dataset.wordCount = inners.length;
    // Attendre la fin du preloader avant d'animer le hero
    const isHero = h.closest('.hero, .project-hero, .page-header');
    const delay = isHero ? 1100 : 200;
    setTimeout(() => h.classList.add('is-visible'), delay);
  });
})();

/* ================ 9. Reveal on scroll ================ */
(function () {
  if (REDUCED) return;
  const selectors = [
    '.section > .container > *',
    '.section > .container-narrow > *',
    '.hero-inner > *',
    '.hero-visual',
    '.card', '.news-item', '.stat',
    '.project-hero', '.project-meta-grid',
    '.figure-sci',
    '.reveal'
  ];
  const targets = document.querySelectorAll(selectors.join(','));
  if (!('IntersectionObserver' in window) || !targets.length) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }
  targets.forEach((el) => {
    el.classList.add('reveal');
    if (el.matches('.card, .news-item, .stat')) {
      // Stagger réinitialisé par parent (siblings de même type)
      const parent = el.parentElement;
      if (parent) {
        const siblings = [...parent.children].filter(c => c.matches('.card, .news-item, .stat'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 60) + 'ms';
      }
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach(el => io.observe(el));
})();

/* ================ 10. Clip-reveal sur images ================ */
(function () {
  if (REDUCED) return;
  const imgs = document.querySelectorAll('.news-thumb img, .figure-sci img, .hero-visual img, .project-hero img, .member-photo img');
  if (!('IntersectionObserver' in window)) return;
  imgs.forEach(img => img.classList.add('clip-reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px 15% 0px', threshold: 0.01 });
  imgs.forEach(img => io.observe(img));
})();

/* ================ 11. Parallax léger ================ */
(function () {
  if (REDUCED || !FINE) return;
  const layers = document.querySelectorAll('.hero-visual, .project-hero img, .card-thumb img');
  if (!layers.length) return;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      layers.forEach(el => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < 0 || r.top > vh) { return; }
        // -1 à 1 selon position dans le viewport
        const t = (r.top + r.height / 2 - vh / 2) / vh;
        const depth = el.matches('.hero-visual') ? 40 : 20;
        el.style.setProperty('--parallax-y', (-t * depth).toFixed(1) + 'px');
      });
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ================ 12. Compteurs statiques (count-up retiré — ces chiffres sont des labels) ================ */

/* ================ 13. Tilt léger (static, pas de mouse-follow agressif) ================ */
(function () {
  /* Deliberately empty — mouse-tracking retiré à la demande. */
})();
