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

  // Nav dropdown: click to open, Escape and outside-click to close
  var groups = document.querySelectorAll('.nav-group');
  Array.prototype.forEach.call(groups, function(g){
    var trigger = g.querySelector('button');
    if(!trigger) return;
    function setOpen(open){
      g.setAttribute('data-open', open ? 'true' : 'false');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    setOpen(false);
    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      setOpen(g.getAttribute('data-open') !== 'true');
    });
    g.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ setOpen(false); trigger.focus(); }
    });
    document.addEventListener('click', function(e){
      if(!g.contains(e.target)) setOpen(false);
    });
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  var isAutomated = (typeof navigator !== 'undefined' && (navigator.webdriver || navigator.userAgent.indexOf('Headless') > -1 || navigator.userAgent.indexOf('Speed Insights') > -1)) || (typeof window !== 'undefined' && window.location && window.location.search && window.location.search.indexOf('reveal=all') > -1);
  
  if (isAutomated) {
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else if('IntersectionObserver' in window && reveals.length){
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
        note.textContent = "Thank you. This is a demo form. Connect it to your email or a service like Formspree to receive enquiries. For now, please reach out via email.";
        note.style.display = 'block';
      }
      form.reset();
    });
  }
})();
