/* Shared site behaviour: no dependencies */
(function(){
  // Mobile menu toggle
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      menu.classList.toggle('open');
      btn.classList.toggle('active');
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  // Contact form: front-end only demo. Replace action with real endpoint (Formspree / your backend).
  var form = document.querySelector('#lead-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.querySelector('#form-note');
      if(note){
        note.textContent = "Thank you. This is a demo form. Connect it to your email or a service like Formspree to receive enquiries. For now, please reach out on WhatsApp or email.";
        note.style.display = 'block';
      }
      form.reset();
    });
  }
})();
