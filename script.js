// Interactions: year, smooth scroll, panel reveal, theme toggle, contact demo, simple lightbox
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const t = document.querySelector(href);
      if(!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Panels reveal
  const panels = document.querySelectorAll('.panel');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if(ent.isIntersecting) ent.target.classList.add('visible');
    });
  }, {threshold:0.12});
  panels.forEach(p => io.observe(p));

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');
  if(saved === 'light') body.classList.add('light'), body.classList.remove('dark');

  themeToggle.addEventListener('click', ()=>{
    body.classList.toggle('light');
    body.classList.toggle('dark');
    const mode = body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
  });

  // Contact form demo
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('cname').value || 'Anon';
      alert(`Terima kasih, ${name}! Form ini demo — tidak terkirim.`);
      form.reset();
    });
  }

  // Lightbox gallery
  const grid = document.getElementById('portfolioGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbCaption = document.querySelector('.lb-caption');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');

  let items = Array.from(document.querySelectorAll('.portfolio-item img'));
  let current = 0;

  function openLB(idx){
    const img = items[idx];
    if(!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.dataset.caption || img.alt || '';
    lightbox.setAttribute('aria-hidden','false');
    current = idx;
  }
  function closeLB(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    lbCaption.textContent = '';
  }
  function prevLB(){
    openLB((current - 1 + items.length) % items.length);
  }
  function nextLB(){
    openLB((current + 1) % items.length);
  }

  items.forEach((img, idx)=>{
    img.addEventListener('click', ()=> openLB(idx));
  });

  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', prevLB);
  lbNext.addEventListener('click', nextLB);

  // keyboard nav for lightbox
  window.addEventListener('keydown', (e)=>{
    if(lightbox.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeLB();
      if(e.key === 'ArrowLeft') prevLB();
      if(e.key === 'ArrowRight') nextLB();
    }
  });
});
