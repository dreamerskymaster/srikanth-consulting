/* Shared site behaviour: no dependencies */
(function(){
  // Mobile menu toggle
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Display settings: theme, text size, reduced motion. Saved per browser only.
  var root = document.documentElement;
  var KEY = 'sk-display';
  function load(){ try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ return {}; } }
  function save(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }
  function apply(s){
    if(s.theme === 'light' || s.theme === 'dark') root.setAttribute('data-theme', s.theme); else root.removeAttribute('data-theme');
    if(s.text === 'large' || s.text === 'larger') root.setAttribute('data-text', s.text); else root.removeAttribute('data-text');
    if(s.motion === 'reduce') root.setAttribute('data-motion', 'reduce'); else root.removeAttribute('data-motion');
  }
  var a11yBtn = document.querySelector('.a11y-btn');
  var panel = document.getElementById('a11y-panel');
  if(a11yBtn && panel){
    var state = load();
    function sync(){
      var t = panel.querySelector('input[name="sk-theme"][value="' + (state.theme || 'auto') + '"]');
      var x = panel.querySelector('input[name="sk-text"][value="' + (state.text || 'normal') + '"]');
      if(t) t.checked = true;
      if(x) x.checked = true;
      panel.querySelector('input[name="sk-motion"]').checked = state.motion === 'reduce';
    }
    sync();
    function setPanel(open){
      panel.hidden = !open;
      a11yBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open){ var first = panel.querySelector('input:checked') || panel.querySelector('input'); if(first) first.focus(); }
    }
    a11yBtn.addEventListener('click', function(e){ e.stopPropagation(); setPanel(panel.hidden); });
    panel.addEventListener('click', function(e){ e.stopPropagation(); });
    panel.addEventListener('change', function(e){
      var n = e.target.name;
      if(n === 'sk-theme') state.theme = e.target.value === 'auto' ? undefined : e.target.value;
      if(n === 'sk-text') state.text = e.target.value === 'normal' ? undefined : e.target.value;
      if(n === 'sk-motion') state.motion = e.target.checked ? 'reduce' : undefined;
      apply(state); save(state);
    });
    panel.querySelector('.a11y-reset').addEventListener('click', function(){
      state = {}; apply(state); save(state); sync();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !panel.hidden){ setPanel(false); a11yBtn.focus(); }
    });
    document.addEventListener('click', function(){ if(!panel.hidden) setPanel(false); });
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
  
  var reduceMotion = root.getAttribute('data-motion') === 'reduce' ||
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (isAutomated || reduceMotion) {
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
