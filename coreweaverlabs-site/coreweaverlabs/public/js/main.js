/* ── CURSOR ──────────────────────────────────── */
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .pillar, .project, .ncard, .sc, .pchip').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ── REVEAL ON SCROLL ────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  reveals.forEach(el => obs.observe(el));
}

/* ── HERO STAGGER ────────────────────────────── */
const heroEls = document.querySelectorAll('.hero-stagger > *');
heroEls.forEach((el, i) => {
  el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.11}s, transform 0.6s ease ${i * 0.11}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '1'; el.style.transform = 'none';
  }));
});

/* ── TICKER ──────────────────────────────────── */
const ticker = document.getElementById('ticker-inner');
if (ticker) {
  const clone = ticker.innerHTML;
  ticker.innerHTML = clone + clone;
  let pos = 0;
  function tick() {
    pos -= 0.45;
    const half = ticker.scrollWidth / 2;
    if (Math.abs(pos) >= half) pos = 0;
    ticker.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(tick);
  }
  tick();
}

/* ── AGENT NODE CANVAS ───────────────────────── */
const canvas = document.getElementById('agent-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function mk() {
    return {
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.8+0.8, pulse: Math.random()*Math.PI*2,
      ps: 0.02+Math.random()*0.015,
      col: ['#e8ff00','#4f46e5','#00e5ff'][Math.floor(Math.random()*3)]
    };
  }
  for (let i=0;i<55;i++) nodes.push(mk());

  function draw() {
    ctx.clearRect(0,0,W,H);
    nodes.forEach(n => {
      n.x+=n.vx; n.y+=n.vy; n.pulse+=n.ps;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      nodes.forEach(m => {
        if(m===n) return;
        const d=Math.hypot(m.x-n.x,m.y-n.y);
        if(d<160) {
          ctx.globalAlpha=(1-d/160)*0.5;
          ctx.strokeStyle=n.col; ctx.lineWidth=0.4;
          ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.stroke();
          ctx.globalAlpha=1;
        }
      });
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r+Math.sin(n.pulse)*0.5,0,Math.PI*2);
      ctx.fillStyle=n.col; ctx.globalAlpha=0.65+Math.sin(n.pulse)*0.2; ctx.fill(); ctx.globalAlpha=1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── NAV ACTIVE STATE ────────────────────────── */
const path = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(l => {
  const href = l.getAttribute('href');
  if (href === path || (href !== '/' && path.startsWith(href))) l.classList.add('active');
  if (href === '/' && path === '/') l.classList.add('active');
});
