(function(){var h=document.querySelector('header');function s(){h.classList.toggle('s',scrollY>8)}addEventListener('scroll',s,{passive:true});s();
if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
document.documentElement.classList.add('js');
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
document.querySelectorAll('.head,details,.why>div,.contact>div,form').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(el.matches('details,.why>div')?(i%7)*70:0)+'ms';io.observe(el)})})();
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();var d=new FormData(this);
var body='Nome: '+d.get('nome')+'\nE-mail: '+d.get('email')+'\n\n'+d.get('msg');
location.href='mailto:contato@blume.com.br?subject='+encodeURIComponent('Contato pelo site')+'&body='+encodeURIComponent(body)});
