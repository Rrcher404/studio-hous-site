/* ============================================================
   SOLHOUS / STUDIO HOUS — shared site chrome + behaviors
   Injects: film layers, stamp, cursor, shutter, booking modal,
   mobile menu. Wires: nav, booking flow, lightbox, reveals.
   ============================================================ */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var STAMP="'26 7 2";

  /* Booking inquiries POST into this Google Form → linked Google Sheet on studio@solhous.com */
  var GFORM_ACTION="https://docs.google.com/forms/d/e/1FAIpQLSfkItbZbYVKJgyJ4VbdlAcnksgkI8LVgyycZ_ZgrMk2Vs4PyA/formResponse";
  var GFORM_FIELDS={ date:"entry.919456358", name:"entry.1143871970", occasion:"entry.1962162448", contact:"entry.1852360780" };

  var NAV=[
    {href:"/work/",label:"Work"},
    {href:"/sessions/",label:"Sessions"},
    {href:"/field-notes/",label:"Field Notes"},
    {href:"/spaces/",label:"Spaces"},
    {href:"/cosign/",label:"Cosign"},
    {href:"/housscapes/",label:"HousScapes"}
  ];

  /* ---------- inject chrome ---------- */
  var frag=document.createElement('div');
  frag.innerHTML=
    '<div class="film-vignette"></div>'+
    '<div class="film-grain"></div>'+
    '<div class="cursor" id="sh-cursor" aria-hidden="true"></div>'+
    '<div class="stamp" aria-hidden="true">'+STAMP+'</div>'+
    '<div class="shutter" id="sh-shutter" aria-hidden="true"></div>'+
    '<div class="mobmenu" id="sh-mobmenu" role="dialog" aria-modal="true" aria-label="Menu">'+
      '<button class="mclose" id="sh-mclose" aria-label="Close menu">×</button>'+
      '<p class="grp">The Studio</p>'+
      '<a href="/">Home</a>'+NAV.slice(0,3).map(function(l){return '<a href="'+l.href+'">'+l.label+'</a>';}).join('')+
      '<p class="grp">The Hous</p>'+NAV.slice(3).map(function(l){return '<a href="'+l.href+'">'+l.label+'</a>';}).join('')+
    '</div>'+
    '<div class="modal" id="sh-modal" role="dialog" aria-modal="true" aria-labelledby="sh-bk-title">'+
      '<div class="booking">'+
        '<span class="mk" id="sh-bk-title">STUDIO HOUS · HOLD A DATE</span>'+
        '<button class="close" id="sh-close" aria-label="Close booking">×</button>'+
        '<div class="inner">'+
          '<div class="step active" data-step="0"><div class="ask">When’s the day?</div><div class="hint">A date is a feeling before it’s a plan. Even a guess is fine — we’ll firm it up together.</div><input id="f_date" placeholder="e.g. May 9th  ·  or “sometime in May”" autocomplete="off"><div class="err" id="e0"></div><div class="trust">30% holds your date · response within 24 business hours · styling consult included</div><div class="row"><span class="sc">The day · 1 / 4</span><button class="next" data-next>Next ›</button></div></div>'+
          '<div class="step" data-step="1"><div class="ask">Who’s it for?</div><div class="hint">A name so I can hold it properly.</div><input id="f_name" placeholder="Your name" autocomplete="name"><div class="err" id="e1"></div><div class="row"><span class="sc">The name · 2 / 4</span><button class="next" data-next>Next ›</button></div></div>'+
          '<div class="step" data-step="2"><div class="ask">What are we celebrating?</div><div class="hint">Grad, prom, a brand, a listing, a season worth keeping.</div><input id="f_occasion" placeholder="e.g. my daughter’s graduation" autocomplete="off"><div class="err" id="e2"></div><div class="row"><span class="sc">The moment · 3 / 4</span><button class="next" data-next>Next ›</button></div></div>'+
          '<div class="step" data-step="3"><div class="ask">Where do I reach you?</div><div class="hint">A text, not a form letter. Email or phone.</div><input id="f_contact" placeholder="Phone or email" autocomplete="email"><div class="err" id="e3"></div><div class="row"><span class="sc">The line · 4 / 4</span><button class="next" id="sh-submitBtn">Hold my date ›</button></div></div>'+
          '<div class="step" data-step="4"><div class="ask" id="sh-confirmMsg">Sent.</div><div class="hint" id="sh-confirmSmall"></div><div class="row"><span class="sc">See you soon</span><a class="next" id="sh-mailBtn" href="#">Or open email ›</a></div></div>'+
        '</div>'+
      '</div>'+
    '</div>';
  while(frag.firstChild){document.body.appendChild(frag.firstChild);}

  /* mark current page in nav + mobile menu */
  var path=location.pathname.replace(/\/index\.html$/,'/');
  document.querySelectorAll('.navlinks a, .mobmenu a').forEach(function(a){
    var h=a.getAttribute('href');
    if(h===path||(h!=='/'&&path.indexOf(h)===0)){a.setAttribute('aria-current','page');}
  });

  /* mobile menu */
  var mob=document.getElementById('sh-mobmenu');
  document.querySelectorAll('[data-menu]').forEach(function(b){b.addEventListener('click',function(){mob.classList.add('open');document.getElementById('sh-mclose').focus();});});
  document.getElementById('sh-mclose').addEventListener('click',function(){mob.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')mob.classList.remove('open');});

  /* custom cursor */
  if(fine&&!reduce){
    var cursor=document.getElementById('sh-cursor');
    var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
    addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;});
    (function loop(){cx+=(mx-cx)*0.22;cy+=(my-cy)*0.22;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop);})();
    document.querySelectorAll('[data-h],button,a,figure,summary').forEach(function(el){
      el.addEventListener('pointerenter',function(){cursor.classList.add('lg');});
      el.addEventListener('pointerleave',function(){cursor.classList.remove('lg');});
    });
  }

  /* reveal on scroll */
  if(!reduce&&'IntersectionObserver' in window){
    var ro=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');ro.unobserve(en.target);}});},{threshold:0.12});
    document.querySelectorAll('.rv').forEach(function(el){ro.observe(el);});
  }else{
    document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});
  }

  /* lightbox — any .gal figure with data-full */
  var figs=Array.prototype.slice.call(document.querySelectorAll('.gal figure[data-full]'));
  if(figs.length){
    var lb=document.createElement('div');lb.className='lb';lb.id='sh-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
    lb.innerHTML='<button class="x" id="sh-lbx" aria-label="Close viewer">×</button><button class="arw prev" id="sh-lbprev" aria-label="Previous">‹</button><img id="sh-lbimg" alt=""><button class="arw next" id="sh-lbnext" aria-label="Next">›</button>';
    document.body.appendChild(lb);
    var lbimg=document.getElementById('sh-lbimg'),cur=0,lastFocus=null;
    function show(){lbimg.src=figs[cur].getAttribute('data-full');lbimg.alt=(figs[cur].querySelector('img')||{}).alt||'';}
    function openLB(i){cur=i;lastFocus=document.activeElement;show();lb.classList.add('open');document.getElementById('sh-lbx').focus();}
    function closeLB(){lb.classList.remove('open');if(lastFocus)lastFocus.focus();}
    function nav(d){cur=(cur+d+figs.length)%figs.length;show();}
    figs.forEach(function(f,i){f.tabIndex=0;f.addEventListener('click',function(){openLB(i);});f.addEventListener('keydown',function(e){if(e.key==='Enter')openLB(i);});});
    document.getElementById('sh-lbx').onclick=closeLB;
    document.getElementById('sh-lbprev').onclick=function(){nav(-1);};
    document.getElementById('sh-lbnext').onclick=function(){nav(1);};
    lb.addEventListener('click',function(e){if(e.target===lb)closeLB();});
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')closeLB();if(e.key==='ArrowRight')nav(1);if(e.key==='ArrowLeft')nav(-1);
    });
  }

  /* booking modal */
  var modal=document.getElementById('sh-modal'),step=0,steps=modal.querySelectorAll('.booking .step'),mLast=null;
  var inputs=['f_date','f_name','f_occasion','f_contact'];
  function fire(){var s=document.getElementById('sh-shutter');s.classList.remove('fire');void s.offsetWidth;s.classList.add('fire');}
  function open(e){if(e)e.preventDefault();mLast=document.activeElement;modal.classList.add('open');go(0);if(!reduce)fire();}
  function close(){modal.classList.remove('open');if(mLast)mLast.focus();}
  function go(n){step=n;steps.forEach(function(s,k){s.classList.toggle('active',k===n);});var inp=steps[n].querySelector('input');if(inp){setTimeout(function(){inp.focus();},60);}}
  document.querySelectorAll('[data-book]').forEach(function(b){b.addEventListener('click',open);});
  document.getElementById('sh-close').addEventListener('click',close);
  modal.addEventListener('click',function(e){if(e.target===modal)close();});
  document.addEventListener('keydown',function(e){
    if(!modal.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='Tab'){var f=modal.querySelectorAll('button,input,a');var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  function val(id){return (document.getElementById(id).value||'').trim();}
  function err(i,msg){var el=document.getElementById('e'+i);if(el)el.textContent=msg||'';}
  modal.querySelectorAll('[data-next]').forEach(function(b){
    b.addEventListener('click',function(){ if(step<3){ go(step+1);} });
  });
  inputs.forEach(function(id,i){
    var el=document.getElementById(id);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();if(i<3)go(i+1);else submit();}});
    el.addEventListener('input',function(){err(i,'');});
  });
  document.getElementById('sh-submitBtn').addEventListener('click',submit);
  function submit(){
    var contact=val('f_contact');
    if(!contact){err(3,'A phone or email so I can reach you.');return;}
    var d=val('f_date'),n=val('f_name'),o=val('f_occasion');
    var body="Day: "+d+"\nName: "+n+"\nOccasion: "+o+"\nReach me: "+contact;
    document.getElementById('sh-mailBtn').href="mailto:studio@solhous.com?subject="+encodeURIComponent("Booking inquiry — "+(n||'new'))+"&body="+encodeURIComponent("Hi Studio Hous,\n\nI'd like to hold a date.\n\n"+body+"\n\nThank you!");
    if(GFORM_ACTION){
      var fd=new URLSearchParams();
      fd.append(GFORM_FIELDS.date,d); fd.append(GFORM_FIELDS.name,n);
      fd.append(GFORM_FIELDS.occasion,o); fd.append(GFORM_FIELDS.contact,contact);
      fetch(GFORM_ACTION,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:fd.toString()})
        .then(function(){ confirmView(true); })
        .catch(function(){ confirmView(false); });
    } else { confirmView(false); }
  }
  function confirmView(sent){
    var n=val('f_name'),d=val('f_date');
    if(sent){
      document.getElementById('sh-confirmMsg').textContent="Got it"+(n?", "+n:"")+".";
      document.getElementById('sh-confirmSmall').textContent="Your request reached Studio Hous. I'll respond within 24 business hours with availability for "+(d||'your day')+", your styling guide, and the next step. Nothing's locked until you are.";
      document.getElementById('sh-mailBtn').style.display='none';
    } else {
      document.getElementById('sh-confirmMsg').textContent="One more tap.";
      document.getElementById('sh-confirmSmall').textContent="Your email app will open with everything filled in — just hit send and it reaches Studio Hous. I'll reply within 24 business hours.";
      document.getElementById('sh-mailBtn').style.display='';
    }
    if(!reduce)fire();
    go(4);
  }
})();
