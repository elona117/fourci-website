// Minimal client-side behavior: slideshow, resource fetch, contact form
(function(){
  const HERO_IMAGES = [
    'https://i.postimg.cc/yWqGDZ1t/Whats-App-Image-2026-01-09-at-10-09-09.jpg',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000'
  ];

  // Slideshow
  const slidesEl = document.getElementById('slides');
  const dotsEl = document.getElementById('dots');
  if(slidesEl){
    HERO_IMAGES.forEach((src, i)=>{
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.className = 'w-full h-full object-cover absolute inset-0 transition-opacity duration-1000';
      img.style.opacity = i===0 ? '1' : '0';
      slidesEl.appendChild(img);

      const dot = document.createElement('button');
      dot.className = 'w-2 h-2 rounded-full bg-white/50';
      dot.onclick = ()=> setSlide(i);
      dotsEl.appendChild(dot);
    });

    let active = 0;
    const imgs = Array.from(slidesEl.querySelectorAll('img'));
    const dots = Array.from(dotsEl.querySelectorAll('button'));
    function setSlide(n){
      imgs.forEach((im, idx)=> im.style.opacity = idx===n ? '1' : '0');
      dots.forEach((d, idx)=> d.className = idx===n ? 'w-8 h-2 rounded-full bg-green-500' : 'w-2 h-2 rounded-full bg-white/40');
      active = n;
    }
    setInterval(()=> setSlide((active+1)%imgs.length), 6000);
    setSlide(0);
  }

  // Load resources list if present — render cards and support search
  const resourcesList = document.getElementById('resources-list');
  const resourceSearch = document.getElementById('resource-search');
  async function fetchResources(){
    try{
      const res = await fetch('/api/resources');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }catch(e){ return null; }
  }

  function renderResources(items){
    if(!resourcesList) return;
    if(items === null){
      resourcesList.innerHTML = '<div class="p-4 bg-white rounded shadow">Unable to load resources.</div>';
      return;
    }
    if(items.length === 0){
      resourcesList.innerHTML = '<div class="p-6 bg-white rounded shadow text-center text-gray-600">No resources yet.</div>';
      return;
    }
    resourcesList.innerHTML = items.map(r=>{
      const link = r.link ? `<a href="${escapeHtml(r.link)}" target="_blank" rel="noopener" class="text-sm text-green-600 font-semibold">Open</a>` : '';
      return `
        <article class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-bold text-lg">${escapeHtml(r.title||'Untitled')}</h3>
          <p class="mt-2 text-sm text-gray-600">${escapeHtml(r.description||'')}</p>
          <div class="mt-4 flex justify-between items-center">
            <div class="text-xs text-gray-400">ID: ${escapeHtml(String(r.id||''))}</div>
            <div>${link}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  async function refreshResources(){
    const items = await fetchResources();
    if(items === null) return renderResources(null);
    const q = (resourceSearch && resourceSearch.value || '').toLowerCase().trim();
    const filtered = q ? items.filter(it => ((it.title||'')+ ' ' + (it.description||'')).toLowerCase().includes(q)) : items;
    renderResources(filtered);
  }

  if(resourcesList){
    refreshResources();
  }

  if(resourceSearch){
    let t;
    resourceSearch.addEventListener('input', ()=>{
      clearTimeout(t);
      t = setTimeout(refreshResources, 200);
    });
  }

  /* --- Header / Footer injection and behavior --- */
  async function loadInclude(selector, url){
    try{
      const resp = await fetch(url);
      if(!resp.ok) return;
      const html = await resp.text();
      const el = document.querySelector(selector);
      if(el) el.innerHTML = html;
    }catch(e){ console.warn('include load failed', url, e); }
  }

  document.addEventListener('DOMContentLoaded', async ()=>{
    // inject loading overlay then header/footer
    try{
      const resp = await fetch('/includes/loading.html');
      if(resp.ok){
        const html = await resp.text();
        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.insertBefore(div.firstElementChild, document.body.firstChild);

        // timings mirror the original React LoadingScreen
        setTimeout(()=>{
          const stage = document.querySelector('[data-loading-stage]');
          if(stage) stage.classList.remove('scale-110','opacity-0');
          const core = document.querySelector('[data-core]');
          if(core) core.classList.remove('scale-50','opacity-0');
          const brand = document.querySelector('[data-brand]');
          if(brand) brand.classList.add('animate-tracking-reveal');
        }, 150);

        // begin exit
        setTimeout(()=>{
          const root = document.getElementById('site-loading');
          if(root) root.classList.add('exit-aperture','pointer-events-none');
        }, 3800);

        // remove after exit
        setTimeout(()=>{
          const root = document.getElementById('site-loading');
          if(root && root.parentNode) root.parentNode.removeChild(root);
        }, 5000);
      }
    }catch(e){/* ignore */}

    await loadInclude('#header-placeholder', '/includes/header.html');
    await loadInclude('#footer-placeholder', '/includes/footer.html');
    initHeaderBehavior();
    initFooterBehavior();
    // initialize additional UI widgets
    try{ initPageTransitions(); }catch(e){}
    try{ initClimateAssistant(); }catch(e){}
  });

  function initHeaderBehavior(){
    const progress = document.querySelector('.header-progress');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-navigation');
    if(menuToggle && mobileNav){
      menuToggle.addEventListener('click', ()=>{
        const open = mobileNav.classList.contains('opacity-100');
        if(open){
          mobileNav.classList.remove('opacity-100','visible','h-screen');
          mobileNav.classList.add('opacity-0','invisible','h-0');
          menuToggle.setAttribute('aria-expanded','false');
        } else {
          mobileNav.classList.remove('opacity-0','invisible','h-0');
          mobileNav.classList.add('opacity-100','visible','h-screen');
          menuToggle.setAttribute('aria-expanded','true');
        }
      });
    }

    // scroll progress
    if(progress){
      const update = ()=>{
        const cur = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h>0 ? (cur/h)*100 : 0;
        progress.style.width = pct + '%';
      };
      update();
      window.addEventListener('scroll', update);
      window.addEventListener('resize', update);
    }

    // active nav
    const links = document.querySelectorAll('.desktop-nav .nav-link');
    links.forEach(a=>{
      try{
        const href = a.getAttribute('href');
        if(href && (location.pathname === href || (href==='/' && location.pathname==='/' ))){
          a.classList.add('text-green-600','font-semibold');
        }
      }catch(e){}
    });
  }

  function initFooterBehavior(){
    const form = document.getElementById('newsletter-form');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button');
      if(btn) btn.setAttribute('disabled','');
      // fake subscribe flow
      setTimeout(()=>{
        alert('Subscribed — thank you! (demo)');
        form.reset();
        if(btn) btn.removeAttribute('disabled');
      }, 900);
    });
  }

  /* Page transition handler for static multi-page navigation */
  function initPageTransitions(){
    // create overlay
    if(document.getElementById('page-transition-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.className = 'page-transition-overlay opacity-0 pointer-events-none fixed inset-0 z-50 flex items-start';
    overlay.innerHTML = `
      <div class="w-full">
        <div class="page-transition-progress" style="width:0%"></div>
        <div class="page-transition-bg"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    function showAndNavigate(href){
      overlay.classList.remove('opacity-0','pointer-events-none');
      const bar = overlay.querySelector('.page-transition-progress');
      if(bar){
        bar.style.width = '6%';
        setTimeout(()=> bar.style.width = '70%', 120);
      }
      setTimeout(()=>{
        // final animation then navigate
        if(bar) bar.style.width = '100%';
        setTimeout(()=> { location.href = href; }, 220);
      }, 380);
    }

    document.addEventListener('click', (e)=>{
      const a = e.target.closest && e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href');
      if(!href) return;
      // ignore external and anchors
      if(href.startsWith('http') && !href.startsWith(location.origin)) return;
      if(href.startsWith('#')) return;
      // allow ctrl/meta click to open new tab
      if(e.ctrlKey || e.metaKey || e.shiftKey || a.target === '_blank') return;
      // treat internal links as navigations
      const url = new URL(href, location.href);
      if(url.origin === location.origin){
        e.preventDefault();
        showAndNavigate(url.href);
      }
    }, {capture: true});
  }

  /* Climate Assistant: lightweight vanilla widget with localStorage */
  function initClimateAssistant(){
    const STORAGE_KEY = 'fourci_chat_history';
    if(document.getElementById('climate-assistant')) return;
    const container = document.createElement('div');
    container.id = 'climate-assistant';
    container.className = 'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]';
    container.innerHTML = `
      <div id="ca-closed" class="ca-button">
        <button id="ca-open-btn" aria-label="Open Climate Assistant" class="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all hover:scale-110">💬</button>
      </div>
      <div id="ca-panel" class="ca-panel hidden">
        <div class="bg-green-600 p-4 text-white flex justify-between items-center">
          <div class="flex items-center space-x-2"><strong>FOURCi Assistant</strong><span class="text-xs text-green-200 ml-2">Always Active</span></div>
          <div class="flex items-center space-x-2">
            <button id="ca-clear" class="p-2 hover:bg-white/10 rounded">↻</button>
            <button id="ca-close" class="p-2 hover:bg-white/10 rounded">✕</button>
          </div>
        </div>
        <div id="ca-messages" class="flex-grow p-4 overflow-y-auto bg-gray-50 max-h-[60vh]"></div>
        <div class="p-4 bg-white border-t border-gray-100">
          <form id="ca-form" class="flex gap-2">
            <input id="ca-input" class="flex-grow border border-gray-200 rounded-xl px-4 py-2 text-sm" placeholder="Ask about local climate action..." />
            <button id="ca-send" class="bg-green-600 text-white p-2.5 rounded-xl">Send</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    const openBtn = document.getElementById('ca-open-btn');
    const panel = document.getElementById('ca-panel');
    const closeBtn = document.getElementById('ca-close');
    const clearBtn = document.getElementById('ca-clear');
    const messagesEl = document.getElementById('ca-messages');
    const form = document.getElementById('ca-form');
    const input = document.getElementById('ca-input');

    function loadHistory(){
      try{ const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); return Array.isArray(saved) ? saved : [{role:'model', text: 'Hello! I am your FOURCi Climate Assistant. How can I help?'}]; }catch(e){ return [{role:'model', text: 'Hello!'}]; }
    }
    let messages = loadHistory();

    function saveHistory(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20))); }

    function renderMessages(){
      messagesEl.innerHTML = messages.map(m=>{
        if(m.role === 'user') return `<div class="flex justify-end"><div class="bg-blue-600 text-white p-3 rounded-2xl max-w-[85%]">${escapeHtml(m.text)}</div></div>`;
        return `<div class="flex justify-start"><div class="bg-white border border-gray-200 p-3 rounded-2xl max-w-[85%]">${escapeHtml(m.text)}</div></div>`;
      }).join('');
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function clearChat(){ messages = [{role:'model', text: 'Hello again! How can I assist you with climate action today?'}]; saveHistory(); renderMessages(); }

    openBtn?.addEventListener('click', ()=>{ panel.classList.remove('hidden'); openBtn.parentElement.classList.add('hidden'); renderMessages(); });
    closeBtn?.addEventListener('click', ()=>{ panel.classList.add('hidden'); openBtn.parentElement.classList.remove('hidden'); });
    clearBtn?.addEventListener('click', ()=> clearChat());

    form?.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const v = input.value.trim();
      if(!v) return;
      messages.push({role:'user', text: v});
      renderMessages(); saveHistory(); input.value = '';
      // fake AI response
      const loader = {role:'model', text: 'Researching...'}; messages.push(loader); renderMessages();
      setTimeout(()=>{
        messages.pop();
        const reply = `Thanks — here are a few local steps: start a native-tree planting, set up simple water capture, and involve youth in awareness activities. (auto-reply)`;
        messages.push({role:'model', text: reply}); saveHistory(); renderMessages();
      }, 900 + Math.random()*800);
    });
  }

  // Admin: manage resources
  const adminList = document.getElementById('admin-resources');
  const resForm = document.getElementById('resource-form');
  async function loadAdminResources(){
    if(!adminList) return;
    try{
      const res = await fetch('/api/resources');
      const data = await res.json();
      adminList.innerHTML = (data||[]).map(r=>`
        <div class="p-4 bg-white rounded shadow flex justify-between items-start">
          <div>
            <div class="font-bold">${escapeHtml(r.title||'Untitled')}</div>
            <div class="text-sm text-gray-600">${escapeHtml(r.description||'')}</div>
          </div>
          <div class="ml-4">
            <button data-id="${r.id}" class="delete-res bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      `).join('');
      // wire delete buttons
      Array.from(document.querySelectorAll('.delete-res')).forEach(btn=>{
        btn.addEventListener('click', async ()=>{
          const id = btn.getAttribute('data-id');
          await fetch('/api/resources/'+encodeURIComponent(id), { method: 'DELETE' });
          loadAdminResources();
          if(typeof refreshResources === 'function') refreshResources();
        });
      });
    }catch(e){ adminList.innerHTML = '<div class="p-4 bg-white rounded shadow">Unable to load</div>'; }
  }
  loadAdminResources();

  if(resForm){
    resForm.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const title = document.getElementById('res-title').value;
      const link = document.getElementById('res-link').value;
      const description = document.getElementById('res-desc').value;
      try{
        const r = await fetch('/api/resources', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ title, link, description })
        });
        if(r.ok){
          resForm.reset();
          loadAdminResources();
          alert('Resource created');
        }else alert('Failed to create');
      }catch(e){ alert('Error creating resource'); }
    });
  }

  // Contact form (static example)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Thank you — form handling not configured in static demo.');
      contactForm.reset();
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>'&#'+c.charCodeAt(0)+';'); }
})();
