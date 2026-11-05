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

  // Contact form. Without JavaScript it posts straight to FormSubmit (the form's action).
  // With JavaScript it sends through FormSubmit's AJAX endpoint (no captcha page) and, if
  // FormSubmit is down or slow, keeps the visitor's text and offers a prefilled email instead,
  // so an enquiry is never lost to an error page.
  var form = document.querySelector('#lead-form');
  if(form){
    var TO = 'mtmdselflove@gmail.com';
    var setBtn = function(busy){
      var b = form.querySelector('button[type="submit"]');
      if(b){ b.disabled = busy; b.textContent = busy ? 'Sending...' : 'Send enquiry'; }
    };
    var fallback = function(){
      var v = function(n){ var el = form.elements[n]; return el && el.value ? el.value.trim() : ''; };
      var body = 'Name: ' + v('name') + '\nOrganisation: ' + v('org') + '\nEmail: ' + v('email') +
        '\nPhone: ' + v('phone') + '\nEnquiring as: ' + v('role') + '\n\n' + v('msg').slice(0, 1500);
      var href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(body);
      var box = document.getElementById('form-fallback');
      if(!box){
        box = document.createElement('div');
        box.id = 'form-fallback';
        box.className = 'card';
        box.setAttribute('role', 'alert');
        box.style.marginTop = '1rem';
        form.appendChild(box);
      }
      box.textContent = '';
      var p = document.createElement('p');
      p.textContent = 'Sorry, the form could not be sent just now. Your message is still here. Please send it by email instead; it opens ready to go.';
      var a = document.createElement('a');
      a.className = 'btn btn-primary';
      a.href = href;
      a.textContent = 'Email your enquiry';
      a.style.marginTop = '.75rem';
      box.appendChild(p); box.appendChild(a);
      setBtn(false);
    };
    form.addEventListener('submit', function(e){
      if(!window.fetch || !window.FormData) { setBtn(true); return; } // old browsers: normal post
      e.preventDefault();
      if(form.elements._honey && form.elements._honey.value){ window.location.href = '/thanks'; return; }
      setBtn(true);
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function(){ if(ctrl) ctrl.abort(); }, 15000);
      fetch('https://formsubmit.co/ajax/' + TO, {
        method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function(r){
        return r.ok ? r.json() : null;
      }).then(function(d){
        clearTimeout(timer);
        if(d && (d.success === true || d.success === 'true')){ window.location.href = '/thanks'; }
        else { fallback(); }
      }).catch(function(){ clearTimeout(timer); fallback(); });
    });
    // Re-enable the button if the visitor comes back with the browser's Back button.
    window.addEventListener('pageshow', function(){
      var btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.disabled = false; btn.textContent = 'Send enquiry'; }
    });
  }
})();
