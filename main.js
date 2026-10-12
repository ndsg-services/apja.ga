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
