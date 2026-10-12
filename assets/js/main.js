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
