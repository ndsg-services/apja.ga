(function(){
  var btn=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.addEventListener('click',function(e){
      if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}
    });
  }
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  // Message de retour du formulaire de contact (?envoi=ok|erreur)
  var box=document.getElementById('form-status');
  if(box){
    var q=new URLSearchParams(location.search).get('envoi');
    if(q==='ok'){box.className='alert alert-ok';box.textContent='Message envoyé. Nous vous répondrons dans les meilleurs délais.';box.hidden=false;}
    if(q==='erreur'){box.className='alert alert-err';box.textContent="Le message n'a pas pu être envoyé. Vérifiez les champs obligatoires ou écrivez-nous sur WhatsApp.";box.hidden=false;}
  }
})();
// Sous-menu « Ressources »
(function(){
  document.querySelectorAll('.sub-toggle').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var li=b.parentElement,open=li.classList.toggle('open');
      b.setAttribute('aria-expanded',open?'true':'false');
    });
  });
  document.addEventListener('click',function(e){
    document.querySelectorAll('.has-sub.open').forEach(function(li){
      if(!li.contains(e.target)){li.classList.remove('open');li.querySelector('.sub-toggle').setAttribute('aria-expanded','false');}
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    document.querySelectorAll('.has-sub.open').forEach(function(li){li.classList.remove('open');var t=li.querySelector('.sub-toggle');t.setAttribute('aria-expanded','false');t.focus();});
  });
})();
// « Lire la suite » : le texte reste visible si JavaScript est désactivé
(function(){
  var btns=document.querySelectorAll('.read-more');
  if(!btns.length)return;
  document.documentElement.classList.add('js');
  btns.forEach(function(b){
    var box=document.getElementById(b.getAttribute('aria-controls'));
    b.hidden=false;
    b.addEventListener('click',function(){
      var open=box.classList.toggle('open');
      b.setAttribute('aria-expanded',open?'true':'false');
      b.textContent=open?'Réduire':'Lire la suite';
    });
  });
})();
// Affiche événement sur l'accueil : s'ouvre au chargement, se ferme après N secondes
(function(){
  var p=document.getElementById('promo'); if(!p)return;
  var until=p.dataset.until; if(until&&new Date()>new Date(until))return; // événement passé : rien ne s'affiche
  var secs=parseInt(p.dataset.duration||'10',10),timer,last=document.activeElement;
  function close(){p.hidden=true;clearTimeout(timer);document.removeEventListener('keydown',onKey);if(last&&last.focus)last.focus();}
  function onKey(e){if(e.key==='Escape')close();}
  setTimeout(function(){
    p.style.setProperty('--promo-duration',secs+'s');
    p.hidden=false;
    p.querySelector('.promo-close').focus({preventScroll:true});
    document.addEventListener('keydown',onKey);
    timer=setTimeout(close,secs*1000);
  },800);
  p.querySelector('.promo-close').addEventListener('click',close);
  p.addEventListener('click',function(e){if(e.target===p)close();});
})();
// Apéro Networking : tri automatique selon la date (data-end = fin de l'événement)
// - la prochaine édition à venir s'affiche dans « Prochaine édition »
// - les éditions passées restent dans la liste, de la plus récente à la plus ancienne
// - s'il n'y a aucune édition à venir, la section « Prochaine édition » est masquée
(function(){
  var list=document.getElementById('editions'),next=document.getElementById('prochaine-edition');
  if(!list||!next)return;
  var now=new Date(),items=[].slice.call(list.querySelectorAll('.edition[data-end]'));
  var future=items.filter(function(li){return new Date(li.dataset.end)>now;})
                  .sort(function(a,b){return new Date(a.dataset.end)-new Date(b.dataset.end);});
  var past=items.filter(function(li){return new Date(li.dataset.end)<=now;})
                .sort(function(a,b){return new Date(b.dataset.end)-new Date(a.dataset.end);});
  past.forEach(function(li){list.appendChild(li);});
  future.forEach(function(li){li.remove();});
  if(!future.length){next.hidden=true;return;}
  next.hidden=false;
  var e=future[0],q=function(sel){return e.querySelector(sel);};
  var a=next.querySelector('.next-poster'),img=a.querySelector('img');
  a.href=q('.edition-poster').getAttribute('href');
  img.src=q('.edition-poster img').getAttribute('src');
  img.alt=q('.edition-poster img').getAttribute('alt');
  next.querySelector('.next-date').textContent=q('.edition-date').textContent+', 18h–21h';
  next.querySelector('.next-speaker').innerHTML='<strong></strong><br>';
  next.querySelector('.next-speaker strong').textContent=q('h3').textContent;
  next.querySelector('.next-speaker').appendChild(document.createTextNode(q('.edition-role').textContent));
  next.querySelector('.next-theme').textContent=q('.edition-theme').textContent;
})();
