// Mobile menu
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open',open);
  menuToggle.setAttribute('aria-expanded',String(open));
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');menuToggle.classList.remove('open');
}));

// Highlight current section in nav
const navItems=document.querySelectorAll('.nav-link[data-nav]');
const spy=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    navItems.forEach(n=>n.classList.toggle('active',n.getAttribute('href')==='#'+e.target.id));
  }
}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>spy.observe(s));

// Scroll progress bar
const bar=document.createElement('div');bar.className='progress';document.body.prepend(bar);
addEventListener('scroll',()=>{
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

// Tools marquee under the hero
const tools=['Python','SQL','Power BI','Tableau','Pandas','NumPy','Scikit-learn','XGBoost','TensorFlow','Keras','MySQL','Excel','Git'];
const marquee=document.createElement('div');
marquee.className='marquee';marquee.setAttribute('aria-hidden','true');
marquee.innerHTML='<div class="marquee-track">'+[...tools,...tools].map(t=>'<span>'+t+'</span>').join('')+'</div>';
document.querySelector('.hero').after(marquee);

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const el=e.target;el.classList.add('in');io.unobserve(el);
    setTimeout(()=>el.classList.remove('reveal','in'),1600);
  }
}),{threshold:.12});
document.querySelectorAll('.section-head,.about-grid,.skill-card,.timeline-item,.project-card,.edu-card,.contact-inner').forEach((el,i)=>{
  el.classList.add('reveal');el.style.setProperty('--d',(i%3)*0.08+'s');io.observe(el);
});

// Mouse spotlight on cards
document.querySelectorAll('.skill-card,.project-card,.edu-card,.contact-card').forEach(c=>{
  c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');
    c.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});
