(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

  // Thème (mémorisé)
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  $('#theme').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Texte tapé dans le titre
  const el = $('#typed'), words = ['pour le web.', 'sur mesure.', 'avec amour.', 'en équipe.'];
  if (reduce) el.textContent = words[0];
  else {
    let w = 0, i = 0, del = false;
    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(tick, 1500); }
      if (del && i === 0) { del = false; w = (w + 1) % words.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 45 : 90);
    };
    setTimeout(tick, 900);
  }

  // Apparition au scroll + compteurs
  const count = b => {
    const n = +b.dataset.count, pre = b.dataset.prefix || '', suf = b.dataset.suffix || '', t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / 1100, 1);
      b.textContent = pre + Math.round(n * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      const b = e.target.querySelector('[data-count]'); if (b) count(b);
    }), { threshold: .18 });
    $$('[data-reveal]').forEach(n => io.observe(n));
  } else $$('[data-reveal]').forEach(n => n.classList.add('in'));

  // Lien actif de la pilule
  const links = $$('.pill a'), map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const nav = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      map.get(e.target.id)?.classList.add('active');
    }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) nav.observe(s); });
  }

  // Effets liés au scroll : barre, parallaxe, ligne du parcours, bandeau
  const bar = $('.progress'), tl = $('.timeline'), track = $('.track');
  const para = $$('[data-speed]'), lis = $$('.timeline li');
  // Positionne le fil du temps du centre du 1er point au centre du dernier
  const layout = () => {
    const rem = parseFloat(getComputedStyle(root).fontSize);
    lis.forEach(li => li._y = li.offsetTop + 2.1 * rem + 8.5);
    tl._a = lis[0]._y; tl._h = lis[lis.length - 1]._y - lis[0]._y;
    tl.style.setProperty('--lt', tl._a + 'px'); tl.style.setProperty('--lh', tl._h + 'px');
  };
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY, h = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (reduce) return;
    para.forEach(n => {
      const r = n.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) * (+n.dataset.speed);
      n.style.translate = `0 ${off.toFixed(1)}px`;
    });
    const r = tl.getBoundingClientRect(), probe = innerHeight * .6;
    tl.style.setProperty('--tl', Math.max(0, Math.min(1, (probe - r.top - tl._a) / (tl._h || 1))).toFixed(3));
    lis.forEach(li => li.classList.toggle('on', probe >= r.top + li._y));
    const m = track.parentElement.getBoundingClientRect();
    track.style.transform = `translateX(${(-(m.top) * 0.35 - 100).toFixed(1)}px)`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  const relayout = () => { layout(); update(); };
  addEventListener('resize', relayout); addEventListener('load', relayout);
  if (document.fonts) document.fonts.ready.then(relayout);
  relayout();

  // Inclinaison 3D des cartes (souris uniquement)
  if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('.card').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transition = 'transform .1s';
        c.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)'; c.style.transform = ''; });
    });
  }

  // Raccourci "/" : aller aux projets
  addEventListener('keydown', e => {
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !/INPUT|TEXTAREA/.test(e.target.tagName)) {
      e.preventDefault(); $('#projets').scrollIntoView({ behavior: 'smooth' });
    }
  });
  $('#year').textContent = new Date().getFullYear();
})();
