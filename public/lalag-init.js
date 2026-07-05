(function(){
'use strict';

/* ═══════════════════════════════════════════════
   REDUCED MOTION — בדיקת העדפת המשתמש
   כל האנימציות מותנות בהגדרה זו.
═══════════════════════════════════════════════ */
var prefersReducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches);

/* ═══════════════════════════════════
   CINEMATIC LOADER
═══════════════════════════════════ */
var ldr=document.getElementById('ldr');
if(ldr){
  if(prefersReducedMotion){
    ldr.remove();
  } else {
    /* beam plays at ~900ms (CSS), exit at 2000ms */
    setTimeout(function(){ldr.classList.add('out');},2000);
    setTimeout(function(){if(ldr&&ldr.parentNode)ldr.remove();},3050);
  }
}

/* ═══════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════ */
var pg=document.createElement('div');
pg.style.cssText='position:fixed;top:0;right:0;width:0%;height:2px;background:linear-gradient(90deg,#F0516A,#F5C230,#6EC4A0);z-index:9999;transition:width .08s linear;pointer-events:none';
pg.setAttribute('aria-hidden','true');
pg.setAttribute('role','presentation');
document.body.appendChild(pg);
window.addEventListener('scroll',function(){
  var s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-window.innerHeight;
  pg.style.width=(h>0?Math.round(s/h*100):0)+'%';
},{ passive:true });

/* ═══════════════════════════════════
   ANCHOR SCROLL — native smooth scroll
   (custom inertia removed — was blocking
   browser compositor and causing lag)
═══════════════════════════════════ */
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#"]');
  if(!a)return;
  var id=a.getAttribute('href').slice(1);if(!id)return;
  var el=document.getElementById(id);if(!el)return;
  e.preventDefault();
  var top=el.getBoundingClientRect().top+window.scrollY-76;
  window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
});

/* ═══════════════════════════════════
   CUSTOM CURSOR — מושבת עם reduced-motion
═══════════════════════════════════ */
var cur=document.getElementById('cur'),curR=document.getElementById('cur-ring');
if(cur&&curR&&!prefersReducedMotion){
  /* ── Trail dots: 4 ghost circles following with increasing lag ── */
  var TRAIL_CFG=[
    {s:14,o:.1,lf:.055}
  ];
  var trails=TRAIL_CFG.map(function(t,i){
    var el=document.createElement('div');
    el.className='cur-tr';el.setAttribute('aria-hidden','true');
    el.style.cssText='position:fixed;pointer-events:none;z-index:'+(9994-i)+
      ';border-radius:50%;transform:translate(-50%,-50%);will-change:transform;opacity:0;'+
      'width:'+t.s+'px;height:'+t.s+'px;background:rgba(240,81,106,'+t.o+')';
    document.body.appendChild(el);
    return {el:el,x:0,y:0,lf:t.lf};
  });

  var mx=0,my=0,rx=0,ry=0,firstMove=false;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';cur.style.opacity='1';
    if(!firstMove){firstMove=true;trails.forEach(function(t){t.x=mx;t.y=my;});}
    trails.forEach(function(t){t.el.style.opacity='1';});
  });
  document.addEventListener('mouseleave',function(){
    cur.style.opacity='0';
    trails.forEach(function(t){t.el.style.opacity='0';});
  });

  (function loop(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    curR.style.left=rx+'px';curR.style.top=ry+'px';
    trails.forEach(function(t){
      t.x+=(mx-t.x)*t.lf;
      t.y+=(my-t.y)*t.lf;
      t.el.style.left=t.x+'px';t.el.style.top=t.y+'px';
    });
    requestAnimationFrame(loop);
  })();

  /* ── Hover states — 3 tiers ── */
  /* Tier 1: links & buttons → ring expands (hover), dot shrinks */
  document.querySelectorAll('a,button').forEach(function(el){
    el.addEventListener('mouseenter',function(){
      curR.classList.add('hover');
      cur.style.transform='translate(-50%,-50%) scale(0)';
    });
    el.addEventListener('mouseleave',function(){
      curR.classList.remove('hover');
      cur.style.transform='translate(-50%,-50%) scale(1)';
    });
  });
  /* Tier 2: cards → card state (medium expansion, pink tint) */
  document.querySelectorAll('.srv-card,.t-card,.faq-row,.faq-q,.faq-editorial-row,.faq-editorial-q,.how-journey-step,.srv-row').forEach(function(el){
    el.addEventListener('mouseenter',function(){curR.classList.add('card');});
    el.addEventListener('mouseleave',function(){curR.classList.remove('card');});
  });
  /* Tier 3: visual media → view state (large, neutral) */
  document.querySelectorAll('.ig-card-feat,.ig-card-sq,.ig-card-wide,.about-img-frame,.about-photo').forEach(function(el){
    el.addEventListener('mouseenter',function(){curR.classList.add('view');});
    el.addEventListener('mouseleave',function(){curR.classList.remove('view');});
  });

  document.addEventListener('mousedown',function(){curR.classList.add('click');});
  document.addEventListener('mouseup',function(){curR.classList.remove('click');});

  /* ── Cursor text labels on CTAs ── */
  var curLbl=document.getElementById('cur-lbl');
  if(curLbl){
    var CTA_MAP=[
      {sel:'.btn-wa-hero,.btn-wa-md,.srv-cta',lbl:'שלחי'},
      {sel:'.btn-ghost-lg',lbl:'עוד'},
      {sel:'.ig-card-feat,.ig-card-sq',lbl:'צפי'},
      {sel:'.t-card',lbl:'קראי'},
      {sel:'.nav-wa',lbl:'WA'},
    ];
    CTA_MAP.forEach(function(m){
      document.querySelectorAll(m.sel).forEach(function(el){
        el.addEventListener('mouseenter',function(){
          curLbl.textContent=m.lbl;
          curR.classList.add('cta-hover');
          curR.classList.remove('hover','card','view');
        });
        el.addEventListener('mouseleave',function(){
          curR.classList.remove('cta-hover');
        });
      });
    });
  }
}

/* ═══════════════════════════════════
   AMBIENT MOUSE SPOTLIGHT GLOW
═══════════════════════════════════ */
if(!prefersReducedMotion){
  var ambGlow=document.getElementById('amb-glow');
  if(ambGlow){
    var ambX=window.innerWidth/2,ambY=window.innerHeight/2;
    var ambCurrX=ambX,ambCurrY=ambY;
    ambGlow.style.opacity='1';
    document.addEventListener('mousemove',function(e){ambX=e.clientX;ambY=e.clientY;});
    (function ambLoop(){
      ambCurrX+=(ambX-ambCurrX)*.06;
      ambCurrY+=(ambY-ambCurrY)*.06;
      ambGlow.style.transform='translate('+ambCurrX+'px,'+ambCurrY+'px) translate(-50%,-50%)';
      requestAnimationFrame(ambLoop);
    })();
    /* hide on mobile */
    if(window.innerWidth<768)ambGlow.style.display='none';
  }
}

/* ═══════════════════════════════════
   LIVE SOCIAL PROOF TICKER
═══════════════════════════════════ */
(function(){
  var ticker=document.getElementById('sp-ticker');
  if(!ticker||window.innerWidth<768)return;
  var notifs=[
    {emoji:'🔥',txt:'נשאר <strong>מקום אחד</strong> בחוג שבועי — יולי'},
    {emoji:'⚡',txt:'<strong>חוג יולי</strong> — 2 מקומות אחרונים'},
    {emoji:'📅',txt:'<strong>סדנת יום הולדת</strong> — פינו תאריך ביולי'},
    {emoji:'🔥',txt:'<strong>חוג אוגוסט</strong> — נפתחה ההרשמה!'},
    {emoji:'⚡',txt:'<strong>סדנאות פרטיות</strong> — יש עוד תאריך פנוי'},
    {emoji:'📅',txt:'<strong>סדנת ארגונים</strong> — קיבלנו תאריך חדש'},
  ];
  var ni=0;
  function showNotif(){
    var n=notifs[ni%notifs.length];ni++;
    var el=document.createElement('div');
    el.className='sp-notif';
    el.innerHTML='<span class="sp-emoji">'+n.emoji+'</span><div class="sp-txt">'+n.txt+'</div><span class="sp-dot"></span>';
    ticker.appendChild(el);
    requestAnimationFrame(function(){el.classList.add('sp-in');});
    setTimeout(function(){
      el.classList.remove('sp-in');el.classList.add('sp-out');
      setTimeout(function(){if(el.parentNode)el.remove();},500);
    },4000);
  }
  /* start after 3s, repeat every 5.5s */
  setTimeout(function(){showNotif();setInterval(showNotif,5500);},3000);
})();

/* ═══════════════════════════════════
   MAGNETIC BUTTONS — מושבת עם reduced-motion
═══════════════════════════════════ */
if(!prefersReducedMotion){
  document.querySelectorAll('[data-mag],.btn-wa-hero,.btn-ghost-lg').forEach(function(btn){
    var hovIn=false;
    btn.addEventListener('mouseenter',function(){hovIn=true;btn.style.transition='transform .12s ease';});
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      var dx=(e.clientX-r.left-r.width/2)*.28;
      var dy=(e.clientY-r.top-r.height/2)*.28;
      btn.style.transform='translate('+dx+'px,'+dy+'px) scale(1.04)';
    });
    btn.addEventListener('mouseleave',function(){
      hovIn=false;
      btn.style.transition='transform .55s cubic-bezier(.23,1,.32,1)';
      btn.style.transform='';
      setTimeout(function(){if(!hovIn)btn.style.transition='';},560);
    });
  });
}

/* ═══════════════════════════════════
   LOGO 3D TILT — מושבת עם reduced-motion
═══════════════════════════════════ */
var logoWrap=document.getElementById('logo-hero');
if(logoWrap&&!prefersReducedMotion){
  logoWrap.addEventListener('mousemove',function(e){
    var r=logoWrap.getBoundingClientRect();
    var xP=(e.clientX-r.left)/r.width;
    var yP=(e.clientY-r.top)/r.height;
    var rx2=(yP-.5)*-18;
    var ry2=(xP-.5)*22;
    logoWrap.style.transform='perspective(600px) rotateX('+rx2+'deg) rotateY('+ry2+'deg) scale(1.04)';
    var shine=logoWrap.querySelector('.logo-shine');
    if(shine){shine.style.background='radial-gradient(circle at '+(xP*100)+'% '+(yP*100)+'%, rgba(255,255,255,.55) 0%, transparent 65%)';shine.style.opacity='1';}
  });
  logoWrap.addEventListener('mouseleave',function(){
    logoWrap.style.transform='perspective(600px) rotateX(0) rotateY(0) scale(1)';
    var shine=logoWrap.querySelector('.logo-shine');
    if(shine)shine.style.opacity='0';
  });
}

/* ═══════════════════════════════════
   NAV SCROLL
═══════════════════════════════════ */
var navEl=document.getElementById('nav');
if(navEl){
  window.addEventListener('scroll',function(){
    navEl.classList.toggle('scrolled',scrollY>60);
  },{ passive:true });
}

/* ═══════════════════════════════════
   MARQUEE — clone מושבת עם reduced-motion
═══════════════════════════════════ */
var mq=document.getElementById('mq-track');
if(mq&&!prefersReducedMotion){
  var clone=mq.cloneNode(true);
  mq.parentElement.appendChild(clone);
}

/* ═══════════════════════════════════
   PARALLAX BLOBS — מושבת עם reduced-motion
═══════════════════════════════════ */
if(!prefersReducedMotion){
  var tk2=false;
  var haOrbs=Array.from(document.querySelectorAll('.ha-orb'));
  if(haOrbs.length){
    document.addEventListener('mousemove',function(e){
      if(tk2)return;tk2=true;
      var cx=e.clientX,cy=e.clientY;
      requestAnimationFrame(function(){
        var dx=(cx/innerWidth-.5)*20,dy=(cy/innerHeight-.5)*20;
        haOrbs.forEach(function(el,i){
          var f=(i+1)*.18;
          el.style.transform='translate('+dx*f+'px,'+dy*f+'px)';
        });
        tk2=false;
      });
    },{ passive:true });
  }
}

/* ═══════════════════════════════════
   HERO PARTICLES CANVAS
═══════════════════════════════════ */
(function(){
  if(prefersReducedMotion)return;
  var canvas=document.getElementById('heroParticles');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var particles=[];
  var W,H;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  resize();
  window.addEventListener('resize',resize,{passive:true});
  var colors=['240,81,106','245,194,48','28,10,4','110,196,160'];
  for(var i=0;i<55;i++){
    particles.push({
      x:Math.random()*W,y:Math.random()*H,
      r:Math.random()*2+.5,
      vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.22-.08,
      a:Math.random()*.32+.05,
      c:colors[Math.floor(Math.random()*colors.length)]
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<-8)p.x=W+8;if(p.x>W+8)p.x=-8;
      if(p.y<-8)p.y=H+8;if(p.y>H+8)p.y=-8;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba('+p.c+','+p.a+')';ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════
   WHATSAPP PHONE CONVERSATIONS
═══════════════════════════════════ */
var convs=[
  {n:'אמא של נועה 💕',av:'👩‍🦱',bg:'linear-gradient(135deg,#FFB8C6,#F0516A)',msgs:[
    {t:'r',m:'הבת שלי חזרה בעננים!! 🥰',time:'11:24'},
    {t:'r',m:'היא לא הפסיקה לצחוק כל הדרך הביתה',time:'11:24'},
    {t:'s',m:'זה ממש ממריא אותי לשמוע 🥹',time:'11:26'},
    {t:'r',m:'מתי הסדנה הבאה? רוצה לרשום גם את אחותה',time:'11:27'},
    {t:'s',m:'שבוע הבא ב-ד׳! שולחת פרטים 💕',time:'11:28'},
  ]},
  {n:'שרית — אמא של מאיה',av:'👩',bg:'linear-gradient(135deg,#A8D8EA,#56AAD8)',msgs:[
    {t:'r',m:'יש מקום לסדנה של שבוע הבא?',time:'14:05'},
    {t:'s',m:'כרגע נשאר מקום אחד בלבד! 🙌',time:'14:06'},
    {t:'r',m:'שומרת!! זה ליום הולדת של מאיה',time:'14:07'},
    {t:'s',m:'מה כיף! נעשה לה חוויה בלתי נשכחת 🎉',time:'14:08'},
    {t:'r',m:'תודה!! היא כבר כל כך מתרגשת 🥳',time:'14:09'},
  ]},
  {n:'מתנ"ס נשר 🏢',av:'🏢',bg:'linear-gradient(135deg,#F5C230,#E8A020)',msgs:[
    {t:'r',m:'מתי נפתח המחזור הבא?',time:'09:15'},
    {t:'s',m:'מחזור חדש ב-1 לספטמבר ☀️',time:'09:17'},
    {t:'r',m:'מעולה. כמה מקומות נשארו?',time:'09:18'},
    {t:'s',m:'5 מקומות אחרונים 🔥 כדאי לא לחכות',time:'09:20'},
    {t:'r',m:'שומר 2 מקומות! שולח פרטים',time:'09:21'},
  ]},
  {n:'אמא של תמר 🎂',av:'👩‍🦰',bg:'linear-gradient(135deg,#6EC4A0,#3A9E82)',msgs:[
    {t:'r',m:'וואו!! תמר נהנתה בטירוף!!',time:'16:40'},
    {t:'r',m:'היא הכינה עוגה לבד בבית הערב 😭',time:'16:41'},
    {t:'s',m:'ואו!! 🎉 כמה גאה בה!',time:'16:42'},
    {t:'r',m:'כל המשפחה לא האמינה שבת 8 עשתה את זה',time:'16:43'},
    {t:'s',m:'זה בדיוק מה שאנחנו עושות 🥹💕',time:'16:44'},
  ]},
];
var ci=0,phoneTimer=null;
function showConv(idx){
  var conv=convs[idx%convs.length];
  var body=document.getElementById('wabd'),ovl=document.getElementById('covl');
  if(!body||!ovl)return;
  if(phoneTimer)clearTimeout(phoneTimer);
  ovl.classList.add('on');
  setTimeout(function(){
    var nm=document.getElementById('wanm');if(nm)nm.textContent=conv.n;
    var av=document.getElementById('wavat');if(av){av.textContent=conv.av;av.style.background=conv.bg;}
    var st=document.getElementById('wast');if(st)st.textContent='מקליד/ה...';
    body.innerHTML='';ovl.classList.remove('on');
    conv.msgs.forEach(function(m,i){
      phoneTimer=setTimeout(function(){
        var typ=document.getElementById('watyp');
        if(m.t==='r'&&typ){
          typ.classList.add('on');
          setTimeout(function(){
            typ.classList.remove('on');addMsg(body,m);
            if(i===conv.msgs.length-1&&st)st.textContent='מחובר/ת';
          },900);
        } else {
          addMsg(body,m);
          if(i===conv.msgs.length-1&&st)st.textContent='מחובר/ת';
        }
      },i*1100+240);
    });
  },460);
}
function addMsg(bd,m){
  var d=document.createElement('div');d.className='msg '+(m.t==='r'?'r':'s');
  d.innerHTML=m.m+'<div class="mt">'+m.time+'</div>';
  bd.appendChild(d);requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('in');})});
  bd.scrollTop=bd.scrollHeight;
}
showConv(0);setInterval(function(){ci++;showConv(ci);},9500);

/* ═══════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════ */
var tData=[
  {e:'👩‍🦱',n:'מורי',loc:'קריית אתא',s:5,t:'הבת שלי חזרה כל כך מאושרת. היא לא מפסיקה לדבר על הסדנה. תודה זהבה!',i:'🧁'},
  {e:'👩‍🦳',n:'ענת',loc:'חיפה',s:5,t:'מורה מדהימה, סבלנית ומקצועית. הבת שלי פורחת ממש. ממליצה בחום.',i:'🍰'},
  {e:'👩',n:'שירה',loc:'נשר',s:5,t:'הבת שלי קיבלה ביטחון עצמי שלא האמנתי שיכול לבוא מסדנת אפייה.',i:'🎂'},
  {e:'🧕',n:'רוניק',loc:'קריית ביאליק',s:5,t:'שתי בנות שלי, שתיהן אוהבות ללכת. חוויה מתוקה ומעצימה!',i:'🍪'},
  {e:'👱‍♀️',n:'דנה',loc:'קריית מוצקין',s:5,t:'אנחנו כבר עונה שנייה. הבת שלי פשוט לא רוצה להפסיק.',i:'🧁'},
  {e:'👩‍🦰',n:'ליאת',loc:'עכו',s:5,t:'שינוי אמיתי בביטחון העצמי. לא ציפיתי לזה. תודה מכל הלב.',i:'🍰'},
];
/* testimonials are now static HTML WA bubbles — no JS needed */

/* ═══════════════════════════════════
   FAQ — מקלדת + ARIA
═══════════════════════════════════ */

/* Editorial FAQ (new design) */
document.querySelectorAll('.faq-editorial-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.closest('.faq-editorial-row');
    var was=item.classList.contains('open');
    document.querySelectorAll('.faq-editorial-row').forEach(function(r){
      r.classList.remove('open');
      var btn=r.querySelector('.faq-editorial-q');
      if(btn) btn.setAttribute('aria-expanded','false');
    });
    if(!was){
      item.classList.add('open');
      q.setAttribute('aria-expanded','true');
    }
  });
  q.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}
  });
});

document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.closest('.faq-row');
    var was=item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-row').forEach(function(r){
      r.classList.remove('open');
      var btn=r.querySelector('.faq-q');
      if(btn) btn.setAttribute('aria-expanded','false');
    });
    if(!was){
      item.classList.add('open');
      q.setAttribute('aria-expanded','true');
    }
  });
  // תמיכה מקלדת — Enter ו-Space
  q.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}
  });
});

/* ═══════════════════════════════════
   VIDEO MODAL — Escape + focus trap
═══════════════════════════════════ */
var modal=document.getElementById('vid-modal');
var lastFocusedBeforeModal=null;
if(modal){
  function openModal(){
    lastFocusedBeforeModal=document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    var closeBtn=document.getElementById('vid-close');
    if(closeBtn) setTimeout(function(){closeBtn.focus()},50);
  }
  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    var iframe=modal.querySelector('iframe');
    if(iframe){var src=iframe.src;iframe.src='';iframe.src=src;}
    if(lastFocusedBeforeModal) lastFocusedBeforeModal.focus();
  }
  document.querySelectorAll('[data-vid]').forEach(function(btn){
    btn.addEventListener('click',openModal);
  });
  modal.addEventListener('click',function(e){
    if(e.target===modal||e.target.id==='vid-close') closeModal();
  });
  // Escape closes modal
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&modal.classList.contains('open')) closeModal();
  });
  // Focus trap inside modal
  modal.addEventListener('keydown',function(e){
    if(e.key!=='Tab') return;
    var focusable=modal.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])');
    var first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus();}}
    else{if(document.activeElement===last){e.preventDefault();first.focus();}}
  });
  modal.setAttribute('aria-hidden','true');
}

/* ═══════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════ */
var obs=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){
      var parent=e.target.parentElement;
      var sibs=parent?Array.from(parent.querySelectorAll(':scope > .rv, :scope > .rv-l, :scope > .rv-r, :scope > .rv-up')):[];
      var idx=sibs.indexOf(e.target);
      // reduced-motion: add class immediately, no stagger delay
      var delay=prefersReducedMotion?0:(idx>0?idx*90:0);
      setTimeout(function(){e.target.classList.add('in')},delay);
    }
  });
},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-up,.rv-scale').forEach(function(el){obs.observe(el)});

/* ═══════════════════════════════════
   CLIP-PATH TEXT REVEALS — Rejouice-style
   Watches .clip-h, .clip-h2, .clip-h3 wrappers
   and adds .in when they enter the viewport.
═══════════════════════════════════ */
(function(){
  if(prefersReducedMotion){
    document.querySelectorAll('.clip-h,.clip-h2,.clip-h3').forEach(function(el){el.classList.add('in');});
    return;
  }
  var clipObs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        clipObs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.clip-h,.clip-h2,.clip-h3').forEach(function(el){clipObs.observe(el);});
})();

/* ═══════════════════════════════════
   VIDEO LAZY LOADING — Instagram bento
═══════════════════════════════════ */
(function(){
  var videos=document.querySelectorAll('video[data-src]');
  if(!videos.length)return;
  var vObs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      var vid=entry.target;
      var card=vid.closest('.ig-card-feat,.ig-card-sq,.ig-card-wide');
      vid.src=vid.getAttribute('data-src');
      vid.removeAttribute('data-src');
      vid.addEventListener('canplay',function(){
        if(card)card.classList.add('loaded');
        vid.play().catch(function(){});
      },{once:true});
      vid.load();
      vObs.unobserve(vid);
    });
  },{rootMargin:'250px 0px',threshold:0});
  videos.forEach(function(v){vObs.observe(v);});
})();

/* ═══════════════════════════════════
   3D TILT + SHINE — all interactive cards
═══════════════════════════════════ */
if(!prefersReducedMotion){
  /* ── Testimonial cards: gentle perspective tilt (rAF throttled) ── */
  var _tcRaf=false;
  document.querySelectorAll('.t-card').forEach(function(card){
    card.addEventListener('mouseenter',function(){card.style.transition='transform .14s ease';});
    card.addEventListener('mousemove',function(e){
      if(_tcRaf)return;_tcRaf=true;
      var cx=e.clientX,cy=e.clientY;
      requestAnimationFrame(function(){
        _tcRaf=false;
        var r=card.getBoundingClientRect();
        var xP=(cx-r.left)/r.width,yP=(cy-r.top)/r.height;
        card.style.transform='perspective(820px) rotateX('+(-(yP-.5)*14)+'deg) rotateY('+((xP-.5)*14)+'deg) scale(1.04) translateY(-5px)';
      });
    });
    card.addEventListener('mouseleave',function(){
      card.style.transition='transform .65s cubic-bezier(.23,1,.32,1)';
      card.style.transform='';
      setTimeout(function(){card.style.transition='';},680);
    });
  });

  /* ── Service cards: tilt + radial shine follow (rAF throttled) ── */
  var _scRaf=false;
  document.querySelectorAll('.srv-card').forEach(function(card){
    var shine=card.querySelector('.srv-shine');
    card.addEventListener('mouseenter',function(){card.style.transition='transform .16s ease';});
    card.addEventListener('mousemove',function(e){
      if(_scRaf)return;_scRaf=true;
      var cx=e.clientX,cy=e.clientY;
      requestAnimationFrame(function(){
        _scRaf=false;
        var r=card.getBoundingClientRect();
        var xP=(cx-r.left)/r.width,yP=(cy-r.top)/r.height;
        card.style.transform='perspective(1100px) rotateX('+(-(yP-.5)*8)+'deg) rotateY('+((xP-.5)*8)+'deg) translateY(-10px) scale(1.02)';
        if(shine){
          shine.style.opacity='1';
          shine.style.background='radial-gradient(circle at '+(xP*100)+'% '+(yP*100)+'%,rgba(255,255,255,.44),transparent 54%)';
        }
      });
    });
    card.addEventListener('mouseleave',function(){
      card.style.transition='transform .62s cubic-bezier(.23,1,.32,1),box-shadow .4s var(--ease)';
      card.style.transform='';
      if(shine)shine.style.opacity='0';
      setTimeout(function(){card.style.transition='';},650);
    });
  });

  /* ── Instagram bento cards: 3D tilt (rAF throttled) ── */
  var _igRaf=false;
  document.querySelectorAll('.ig-card-feat,.ig-card-sq').forEach(function(card){
    card.addEventListener('mouseenter',function(){card.style.transition='transform .18s ease,box-shadow .18s';});
    card.addEventListener('mousemove',function(e){
      if(_igRaf)return;_igRaf=true;
      var cx=e.clientX,cy=e.clientY;
      requestAnimationFrame(function(){
        _igRaf=false;
        var r=card.getBoundingClientRect();
        var xP=(cx-r.left)/r.width,yP=(cy-r.top)/r.height;
        card.style.transform='perspective(1100px) rotateX('+(-(yP-.5)*7)+'deg) rotateY('+((xP-.5)*7)+'deg) translateY(-12px) scale(1.03)';
      });
    });
    card.addEventListener('mouseleave',function(){
      card.style.transition='transform .65s cubic-bezier(.23,1,.32,1),box-shadow .5s';
      card.style.transform='';
      setTimeout(function(){card.style.transition='';},680);
    });
  });
}

/* ═══════════════════════════════════
   GSAP SCROLL ANIMATIONS — premium motion
═══════════════════════════════════ */
(function(){
  if(prefersReducedMotion)return;
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);

  /* ────────────────────────────────
     HERO-CIN — scroll transition
     Stage fades + moves up; bg + particles fade.
     JS RAF loop handles float + tilt on #cin-logo.
  ──────────────────────────────── */
  gsap.to('#cin-stage',{
    y:-110,opacity:0,scale:.93,ease:'power1.in',
    scrollTrigger:{trigger:'.hero-cin',start:'top top',end:'+=500',scrub:1.4}
  });
  gsap.to('.cin-bg',{
    opacity:0,ease:'none',
    scrollTrigger:{trigger:'.hero-cin',start:'top top',end:'+=380',scrub:1}
  });
  gsap.to('#cin-particles',{
    opacity:0,ease:'none',
    scrollTrigger:{trigger:'.hero-cin',start:'top top',end:'+=280',scrub:.8}
  });

  /* ────────────────────────────────
     ABOUT — photo parallax + cert bounce
  ──────────────────────────────── */
  gsap.to('.about-img-frame',{
    y:-46,ease:'none',
    scrollTrigger:{trigger:'.about-sec',start:'top bottom',end:'bottom top',scrub:1.7}
  });
  gsap.fromTo('.about-cert',
    {opacity:0,y:36,scale:.88,rotation:-5},
    {opacity:1,y:0,scale:1,rotation:0,duration:1.05,ease:'back.out(1.9)',
     scrollTrigger:{trigger:'.about-cert',start:'top 88%',once:true}}
  );

  /* ────────────────────────────────
     SERVICES — 3D card entrance
     Cards taken out of IO system; GSAP
     owns their entrance animation.
  ──────────────────────────────── */
  var srvCards=document.querySelectorAll('.srv-card');
  srvCards.forEach(function(c){c.classList.remove('rv','rv-l','rv-r','rv-scale','rv-up');});
  gsap.fromTo(srvCards,
    {opacity:0,y:80,scale:.92},
    {opacity:1,y:0,scale:1,duration:1.05,ease:'power3.out',
     stagger:{amount:.38,from:'start'},
     scrollTrigger:{trigger:'.srv-grid',start:'top 82%',once:true}
    }
  );

  /* ────────────────────────────────
     GALLERY — Instagram bento entrance + depth parallax
  ──────────────────────────────── */
  var igFeat=document.querySelector('.ig-card-feat');
  var igSqs=document.querySelectorAll('.ig-card-sq');
  var igWide=document.querySelector('.ig-card-wide');
  var igAll=[igFeat].concat(Array.from(igSqs)).concat(igWide?[igWide]:[]).filter(Boolean);
  /* Entrance: featured slides from left, squares cascade, wide fades up */
  if(igFeat){
    gsap.fromTo(igFeat,
      {opacity:0,x:-60,scale:.9},
      {opacity:1,x:0,scale:1,duration:1.15,ease:'power3.out',
       scrollTrigger:{trigger:'.ig-bento',start:'top 82%',once:true}}
    );
  }
  if(igSqs.length){
    gsap.fromTo(igSqs,
      {opacity:0,y:56,scale:.88},
      {opacity:1,y:0,scale:1,duration:1,ease:'power3.out',
       stagger:{amount:.32,from:'start'},
       scrollTrigger:{trigger:'.ig-bento',start:'top 80%',once:true}}
    );
  }
  if(igWide){
    gsap.fromTo(igWide,
      {opacity:0,y:40},
      {opacity:1,y:0,duration:1.05,ease:'power2.out',
       scrollTrigger:{trigger:'.ig-card-wide',start:'top 88%',once:true}}
    );
  }
  /* Profile bar slides in */
  gsap.fromTo('.ig-profile-bar',
    {opacity:0,y:28},
    {opacity:1,y:0,duration:.9,ease:'power2.out',
     scrollTrigger:{trigger:'.ig-profile-bar',start:'top 88%',once:true}}
  );
  /* Subtle depth parallax on featured */
  if(igFeat){
    gsap.to(igFeat,{
      y:-30,ease:'none',
      scrollTrigger:{trigger:'.gallery-sec',start:'top bottom',end:'bottom top',scrub:1.2}
    });
  }
  /* Community Center entrance */
  gsap.fromTo('.orgs-tiles',
    {opacity:0,y:40},
    {opacity:1,y:0,duration:.9,ease:'power2.out',
     scrollTrigger:{trigger:'.orgs-sec',start:'top 78%',once:true}}
  );
  gsap.fromTo('.orgs-features .orgs-feat',
    {opacity:0,y:36,scale:.95},
    {opacity:1,y:0,scale:1,duration:.85,ease:'power2.out',
     stagger:{amount:.26,from:'start'},
     scrollTrigger:{trigger:'.orgs-features',start:'top 82%',once:true}}
  );
  gsap.fromTo('.orgs-ctas',
    {opacity:0,y:24},
    {opacity:1,y:0,duration:.8,ease:'power2.out',
     scrollTrigger:{trigger:'.orgs-ctas',start:'top 88%',once:true}}
  );

  /* ────────────────────────────────
     HOW STEPS — line draw + number pop
  ──────────────────────────────── */
  /* HOW — editorial journey (new design) */
  gsap.fromTo('.how-journey-line',
    {scaleY:0,transformOrigin:'top center'},
    {scaleY:1,duration:2.2,ease:'power2.inOut',
     scrollTrigger:{trigger:'.how-journey',start:'top 80%',once:true}}
  );
  gsap.fromTo('.how-j-num',
    {opacity:0,x:28},
    {opacity:1,x:0,duration:.9,ease:'power2.out',stagger:.22,
     scrollTrigger:{trigger:'.how-journey',start:'top 78%',once:true}}
  );
  gsap.fromTo('.how-j-body h3,.how-j-body p',
    {opacity:0,y:24},
    {opacity:1,y:0,duration:.72,ease:'power2.out',stagger:.09,delay:.2,
     scrollTrigger:{trigger:'.how-journey',start:'top 75%',once:true}}
  );
  gsap.fromTo('.how-j-dot',
    {scale:0},
    {scale:1,duration:.55,ease:'back.out(3)',stagger:.22,delay:.15,
     scrollTrigger:{trigger:'.how-journey',start:'top 78%',once:true}}
  );

  /* ────────────────────────────────
     CTA — editorial dark reveal
  ──────────────────────────────── */
  gsap.fromTo('.cta-editorial-h2',
    {opacity:0,y:52},
    {opacity:1,y:0,duration:1.1,ease:'power3.out',
     scrollTrigger:{trigger:'.cta-sec',start:'top 75%',once:true}}
  );
  gsap.fromTo('.cta-editorial-sub,.cta-editorial-btn,.cta-editorial-note',
    {opacity:0,y:28},
    {opacity:1,y:0,duration:.85,ease:'power2.out',stagger:.14,delay:.3,
     scrollTrigger:{trigger:'.cta-sec',start:'top 72%',once:true}}
  );

  /* ────────────────────────────────
     FAQ — editorial rows reveal
  ──────────────────────────────── */
  var faqRows=document.querySelectorAll('.faq-row');
  faqRows.forEach(function(r){r.classList.remove('rv','rv-l','rv-r','rv-scale','rv-up');});
  if(faqRows.length){
    gsap.fromTo(faqRows,
      {opacity:0,x:52},
      {opacity:1,x:0,duration:.72,ease:'power2.out',
       stagger:{amount:.3},
       scrollTrigger:{trigger:'.faq-grid',start:'top 82%',once:true}}
    );
  }
  /* Editorial FAQ rows */
  var faqEditorial=document.querySelectorAll('.faq-editorial-row');
  if(faqEditorial.length){
    gsap.fromTo(faqEditorial,
      {opacity:0,y:32},
      {opacity:1,y:0,duration:.75,ease:'power2.out',
       stagger:{amount:.4},
       scrollTrigger:{trigger:'.faq-editorial-list',start:'top 85%',once:true}}
    );
  }

  /* ────────────────────────────────
     TESTIMONIALS — subtle depth on scroll
  ──────────────────────────────── */
  gsap.to('.t-marquee-wrap',{
    y:-20,ease:'none',
    scrollTrigger:{trigger:'.testimonials-sec',start:'top bottom',end:'bottom top',scrub:2}
  });

  /* ────────────────────────────────
     SECTION LABELS — clip-path reveal
  ──────────────────────────────── */
  document.querySelectorAll('.sec-label').forEach(function(lbl){
    gsap.fromTo(lbl,
      {opacity:0,clipPath:'inset(0 100% 0 0)'},
      {opacity:1,clipPath:'inset(0 0% 0 0)',duration:.95,ease:'power2.out',
       scrollTrigger:{trigger:lbl,start:'top 88%',once:true}}
    );
  });

  /* Section heading + footer parallax removed for performance
     (multiple simultaneous scrub triggers on each heading) */

})();



/* ═══════════════════════════════════
   SPARKLE on click — מושבת עם reduced-motion
═══════════════════════════════════ */
if(!prefersReducedMotion){
  document.querySelectorAll('.btn-wa-hero,.btn-wa-md').forEach(function(btn){
    btn.addEventListener('click',function(e){
      for(var i=0;i<6;i++){
        (function(i){setTimeout(function(){
          var s=document.createElement('span');
          var r=btn.getBoundingClientRect();
          var angle=Math.random()*360;var dist=30+Math.random()*40;
          s.style.cssText='position:fixed;width:6px;height:6px;border-radius:50%;background:'+(['#F0516A','#F5C230','#6EC4A0','#A8D8EA'][i%4])+';pointer-events:none;z-index:9999;left:'+(e.clientX)+'px;top:'+(e.clientY)+'px;transition:all .6s cubic-bezier(.23,1,.32,1);opacity:1;transform:scale(1)';
          s.setAttribute('aria-hidden','true');
          document.body.appendChild(s);
                    setTimeout(function(){s.remove()},600);
        },i*40)})(i);
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════════
   THE LALAG UNIVERSE — Global flour-dust atmosphere canvas
   Tiny slow-rising particles drift across all sections,
   creating a single living world from top to bottom.
════════════════════════════════════════════════════════════════ */
(function(){
  if(prefersReducedMotion)return;
  if(window.innerWidth<769)return; /* mobile: skip for performance */
  var canvas=document.getElementById('lalag-dust');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize,{passive:true});

  /* Flour/magic dust palette — brand colors at very low alpha */
  var pts=[];
  var palettes=[
    '240,81,106','245,194,48','255,207,179','110,196,160','200,160,150'
  ];
  for(var i=0;i<55;i++){
    var c=palettes[Math.floor(Math.random()*palettes.length)];
    pts.push({
      x:Math.random()*window.innerWidth,
      y:Math.random()*window.innerHeight,
      vy:-(0.06+Math.random()*0.14),   /* slow upward drift */
      vx:(Math.random()-.5)*0.05,
      r:0.5+Math.random()*1.6,
      a:0.018+Math.random()*0.055,     /* very subtle */
      c:c,
      ph:Math.random()*Math.PI*2,
      sp:0.0015+Math.random()*0.003,
      amp:0.4+Math.random()*0.8
    });
  }

  function drawDust(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      p.ph+=p.sp;
      p.x+=p.vx+Math.sin(p.ph)*p.amp*0.035;
      p.y+=p.vy;
      if(p.y<-12)p.y=H+12;
      if(p.x<-12)p.x=W+12;
      if(p.x>W+12)p.x=-12;
      var alpha=p.a*(0.5+0.5*Math.sin(p.ph*1.4));
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba('+p.c+','+alpha+')';
      ctx.fill();
    }
    requestAnimationFrame(drawDust);
  }
  drawDust();
})();

/* ═══════════════════════════════════════════════════════════════
   GLANCE — Number counter animation
   When the stats section enters the viewport, numbers count up
   from 0 to their target with an easeOutExpo curve.
════════════════════════════════════════════════════════════════ */
(function(){
  var nums=document.querySelectorAll('.glance-num[data-target]');
  if(!nums.length||prefersReducedMotion)return;
  var triggered=false;
  var cntObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting&&!triggered){
        triggered=true;
        nums.forEach(function(el){
          var target=parseInt(el.getAttribute('data-target'),10);
          var suffix=el.getAttribute('data-suffix')||'';
          var supHTML='<sup>'+suffix+'</sup>';
          var duration=1600;
          var start=performance.now();
          function tick(now){
            var t=Math.min((now-start)/duration,1);
            /* easeOutExpo */
            var ease=t===1?1:1-Math.pow(2,-10*t);
            var cur=Math.floor(ease*target);
            el.innerHTML=cur+supHTML;
            if(t<1)requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        cntObs.disconnect();
      }
    });
  },{threshold:0.35});
  nums.forEach(function(el){cntObs.observe(el);});
})();

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC HERO — immersive world canvas + moving light + tilt
   Standalone block (auto-runs). Targets hero-cin section.
════════════════════════════════════════════════════════════════ */
(function(){
  if(prefersReducedMotion)return;
  var canvas=document.getElementById('cin-particles');
  var logo=document.getElementById('cin-logo');
  var logoImg=document.getElementById('cin-logo-img');
  if(!logo&&!canvas)return;

  /* ── Rich Creative World Canvas ── */
  var ctx,W,H,animating=true,cinDrawId=null,mx=-9999,my=-9999;
  var inHero=true;
  if(canvas){
    ctx=canvas.getContext('2d');
    function cinResize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
    cinResize();
    window.addEventListener('resize',cinResize,{passive:true});

    /* Brand palette */
    var CP=[240,81,106],CG=[245,194,48],CPH=[255,207,179],CS=[110,196,160],CC=[255,251,248];
    var ALL=[CP,CG,CPH,CS,CC];

    /* 1 — Dust particles (60 tiny drifting dots) */
    var dust=[];
    for(var i=0;i<60;i++){
      var dc=ALL[Math.floor(Math.random()*ALL.length)];
      dust.push({
        x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
        vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.12-.04,
        r:.35+Math.random()*1.7,op:.04+Math.random()*.2,
        ph:Math.random()*Math.PI*2,sp:.002+Math.random()*.005,c:dc
      });
    }

    /* 2 — Paint blobs (12 large semi-transparent drifting blobs) */
    var blobs=[];
    for(var i=0;i<12;i++){
      var bc=[CP,CG,CPH,CS][Math.floor(Math.random()*4)];
      blobs.push({
        x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
        vx:(Math.random()-.5)*.05,vy:(Math.random()-.5)*.042,
        r:38+Math.random()*88,op:.018+Math.random()*.06,
        ph:Math.random()*Math.PI*2,sp:.0007+Math.random()*.0012,c:bc,
        rx:.6+Math.random()*.75,ry:.6+Math.random()*.75
      });
    }

    /* 3 — Glitter sparkles (24 four-pointed twinkling stars) */
    var sparks=[];
    for(var i=0;i<24;i++){
      var sc=[CP,CG,CC][Math.floor(Math.random()*3)];
      sparks.push({
        x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
        vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.065,
        r:1.4+Math.random()*3.0,tOp:.15+Math.random()*.52,
        ph:Math.random()*Math.PI*2,tw:.007+Math.random()*.013,
        rot:Math.random()*Math.PI*2,rSp:(Math.random()-.5)*.016,c:sc
      });
    }

    function drawSpark(c,x,y,r,rot){
      c.beginPath();
      for(var k=0;k<4;k++){
        var a=rot+k*Math.PI/2,a2=rot+(k+.5)*Math.PI/2;
        if(k===0)c.moveTo(x+r*Math.cos(a),y+r*Math.sin(a));
        else c.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));
        c.lineTo(x+r*.3*Math.cos(a2),y+r*.3*Math.sin(a2));
      }
      c.closePath();
    }

    var wT=0;
    function drawWorld(){
      if(!animating){cinDrawId=null;return;}
      ctx.clearRect(0,0,W,H);
      wT+=.0055;

      /* Blobs — back layer */
      for(var i=0;i<blobs.length;i++){
        var b=blobs[i];
        var pulse=.5+.5*Math.sin(b.ph+wT*b.sp*700);
        b.vx+=(W*.5-b.x)*.00001;b.vy+=(H*.5-b.y)*.00001;
        b.vx*=.996;b.vy*=.996;b.x+=b.vx;b.y+=b.vy;
        if(b.x<-220)b.x=W+220;if(b.x>W+220)b.x=-220;
        if(b.y<-220)b.y=H+220;if(b.y>H+220)b.y=-220;
        ctx.save();ctx.translate(b.x,b.y);ctx.scale(b.rx,b.ry);
        var gr=ctx.createRadialGradient(0,0,0,0,0,b.r);
        gr.addColorStop(0,'rgba('+b.c[0]+','+b.c[1]+','+b.c[2]+','+(b.op*(.65+.35*pulse))+')');
        gr.addColorStop(1,'rgba('+b.c[0]+','+b.c[1]+','+b.c[2]+',0)');
        ctx.beginPath();ctx.arc(0,0,b.r,0,Math.PI*2);ctx.fillStyle=gr;ctx.fill();
        ctx.restore();
      }

      /* Dust */
      for(var i=0;i<dust.length;i++){
        var p=dust[i];
        var pulse=.5+.5*Math.sin(p.ph+wT*p.sp*700);
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;
        if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r*(.65+.35*pulse),0,Math.PI*2);
        ctx.fillStyle='rgba('+p.c[0]+','+p.c[1]+','+p.c[2]+','+(p.op*pulse)+')';
        ctx.fill();
      }

      /* Glitter sparkles */
      for(var i=0;i<sparks.length;i++){
        var s=sparks[i];
        s.rot+=s.rSp;s.x+=s.vx;s.y+=s.vy;
        if(s.x<-10)s.x=W+10;if(s.x>W+10)s.x=-10;
        if(s.y<-10)s.y=H+10;if(s.y>H+10)s.y=-10;
        var tw=.5+.5*Math.sin(s.ph+wT*s.tw*700);
        var op=s.tOp*tw;
        ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);
        drawSpark(ctx,0,0,s.r,0);
        ctx.fillStyle='rgba('+s.c[0]+','+s.c[1]+','+s.c[2]+','+op+')';ctx.fill();
        if(tw>.68){
          ctx.beginPath();ctx.arc(0,0,s.r*2.2,0,Math.PI*2);
          ctx.fillStyle='rgba('+s.c[0]+','+s.c[1]+','+s.c[2]+','+(op*.11)+')';ctx.fill();
        }
        ctx.restore();
      }

      cinDrawId=requestAnimationFrame(drawWorld);
    }
    drawWorld();
    window.addEventListener('scroll',function(){
      var wasIn=inHero;
      inHero=window.scrollY<window.innerHeight;
      animating=inHero;
      if(!wasIn&&inHero&&!cinDrawId)drawWorld();
    },{passive:true});
  }

  /* ── Moving cinematic light overlay ── */
  var lightEl=document.getElementById('cin-light');
  if(lightEl){
    var lx=window.innerWidth/2,ly=window.innerHeight/2,lCx=lx,lCy=ly;
    document.addEventListener('mousemove',function(e){lx=e.clientX;ly=e.clientY;},{passive:true});
    (function lightLoop(){
      lCx+=(lx-lCx)*.022;lCy+=(ly-lCy)*.022;
      lightEl.style.background=
        'radial-gradient(ellipse 580px 400px at '+lCx.toFixed(1)+'px '+lCy.toFixed(1)+'px,rgba(255,207,179,.04) 0%,transparent 70%),'+
        'radial-gradient(ellipse 900px 600px at '+(window.innerWidth/2)+'px '+(window.innerHeight*.38)+'px,rgba(240,81,106,.03) 0%,transparent 58%)';
      requestAnimationFrame(lightLoop);
    })();
  }

  window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;},{passive:true});
  if(!logo)return;

  /* ── Entrance sequence ── */
  var entered=false;
  if(logoImg){
    logoImg.style.animation='cin-enter 1.9s cubic-bezier(.2,1,.18,1) .5s both';
    setTimeout(function(){
      if(!logoImg)return;
      logoImg.style.filter='drop-shadow(0 0 42px rgba(240,81,106,.36)) drop-shadow(0 0 88px rgba(240,81,106,.16)) drop-shadow(0 0 160px rgba(245,194,48,.08))';
      entered=true;
    },2500);
  }

  /* ── Magnetic tilt + float RAF loop ── */
  var tX=0,tY=0,mX=0,mY=0,fT=0,ttX=0,ttY=0,tmX=0,tmY=0;
  window.addEventListener('mousemove',function(e){
    var rect=logo.getBoundingClientRect();
    var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
    var dx=e.clientX-cx,dy=e.clientY-cy,d=Math.sqrt(dx*dx+dy*dy);
    var xP=(e.clientX-rect.left)/rect.width,yP=(e.clientY-rect.top)/rect.height;
    var ts=(xP>=0&&xP<=1&&yP>=0&&yP<=1)?22:11;
    ttX=(yP-.5)*-ts;ttY=(xP-.5)*ts*1.15;
    if(d<340&&d>0){var s=(1-d/340)*22;tmX=(dx/d)*s;tmY=(dy/d)*s;}
    else{tmX=0;tmY=0;}
  },{passive:true});
  document.addEventListener('mouseleave',function(){ttX=0;ttY=0;tmX=0;tmY=0;});
  var cinRAFId=null;
  function cinRAF(){
    if(!inHero){cinRAFId=null;return;}
    fT+=.0024;
    var fy=Math.sin(fT)*11+Math.sin(fT*.68)*4.5;
    tX+=(ttX-tX)*.074;tY+=(ttY-tY)*.074;
    mX+=(tmX-mX)*.055;mY+=(tmY-mY)*.055;
    var ty=entered?mY+fy:0;
    logo.style.transform=
      'translate('+(mX).toFixed(2)+'px,'+ty.toFixed(2)+'px)'+
      'perspective(960px)'+
      'rotateX('+(entered?tX:0).toFixed(2)+'deg)'+
      'rotateY('+(entered?tY:0).toFixed(2)+'deg)';
    cinRAFId=requestAnimationFrame(cinRAF);
  }
  window.addEventListener('scroll',function(){
    if(inHero&&!cinRAFId)cinRAFId=requestAnimationFrame(cinRAF);
  },{passive:true});
  cinRAFId=requestAnimationFrame(cinRAF);

  /* ── Cursor expansion near logo ── */
  var curRing=document.getElementById('cur-ring');
  if(curRing){
    window.addEventListener('mousemove',function(e){
      var rect=logo.getBoundingClientRect();
      var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
      var d=Math.sqrt(Math.pow(e.clientX-cx,2)+Math.pow(e.clientY-cy,2));
      if(d<320){
        var s=1+(1-d/320)*2;
        curRing.style.transform='translate(-50%,-50%) scale('+s+')';
        curRing.style.borderColor='rgba(240,81,106,'+(0.25+(1-d/320)*.55)+')';
      }else{
        curRing.style.transform='translate(-50%,-50%) scale(1)';
        curRing.style.borderColor='';
      }
    },{passive:true});
  }
})();

/* ═══════════════════════════════════
   HERO STATS COUNTER
   Counts up from 0 to target value
   when the stats bar enters the viewport.
═══════════════════════════════════ */
(function(){
  if(prefersReducedMotion)return;
  var statEls=document.querySelectorAll('.hero-stat-num');
  if(!statEls.length)return;
  /* Targets match the HTML: 500+, 4.9★, 3+ */
  var TARGETS=[500,4.9,3];
  var DURATIONS=[1600,1200,900];

  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      var el=entry.target;
      var idx=Array.from(statEls).indexOf(el);
      var target=TARGETS[idx];if(target===undefined)return;
      var isFloat=target%1!==0;
      var dur=DURATIONS[idx]||1200;
      var startTime=null;

      /* Find the text node (before the +/★ span) */
      function getTextNode(node){
        for(var i=0;i<node.childNodes.length;i++){
          if(node.childNodes[i].nodeType===3&&node.childNodes[i].textContent.trim())return node.childNodes[i];
        }
        return null;
      }
      var tn=getTextNode(el);
      if(!tn)return;
      var origText=tn.textContent;

      function easeOutQuart(t){return 1-Math.pow(1-t,4);}

      function frame(ts){
        if(!startTime)startTime=ts;
        var progress=Math.min((ts-startTime)/dur,1);
        var val=target*easeOutQuart(progress);
        tn.textContent=isFloat?val.toFixed(1):Math.round(val).toString();
        if(progress<1){requestAnimationFrame(frame);}
        else{tn.textContent=origText;} /* reset to exact original */
      }
      requestAnimationFrame(frame);
      obs.unobserve(el);
    });
  },{threshold:.7});
  statEls.forEach(function(el){obs.observe(el);});
})();

/* ═══════════════════════════════════
   ACTIVE NAV SECTION TRACKER
   Highlights the nav link of the
   section currently in view.
═══════════════════════════════════ */
(function(){
  var sections=document.querySelectorAll('main section[id]');
  var navLinks=document.querySelectorAll('.nav-center a[href^="#"],.dock-link[href^="#"]');
  if(!sections.length||!navLinks.length)return;

  function setActive(id){
    navLinks.forEach(function(a){
      var matches=a.getAttribute('href')==='#'+id;
      a.classList.toggle('nav-active',matches);
      a.classList.toggle('dock-active',matches);
    });
  }

  var sectionObs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting)setActive(entry.target.id);
    });
  },{threshold:.38,rootMargin:'-70px 0px -30% 0px'});

  sections.forEach(function(s){sectionObs.observe(s);});
})();

/* ═══════════════════════════════════
   ACCESSIBILITY WIDGET
═══════════════════════════════════ */
(function(){
  var btn=document.getElementById('a11y-btn');
  var panel=document.getElementById('a11y-panel');
  var root=document.documentElement;
  if(!btn||!panel)return;

  var STORE='lalag-a11y2';
  var defaults={zoom:0,fontInc:0,sepia:false,bw:false,h1:false,noAnim:false,noBlink:false,invert:false,by:false,hc:false,bigCursor:false,curBlack:false,spacing:false,readFont:false,links:false,altText:false};
  var state=Object.assign({},defaults);
  try{var saved=localStorage.getItem(STORE);if(saved)state=Object.assign(state,JSON.parse(saved));}catch(e){}

  function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){}}

  // id → stateKey → bodyClass
  var TOGGLES=[
    ['at-sepia', 'sepia',     'a11y-sepia'],
    ['at-bw',    'bw',        'a11y-bw'],
    ['at-h1',    'h1',        'a11y-h1'],
    ['at-anim',  'noAnim',    'a11y-no-anim'],
    ['at-blink', 'noBlink',   'a11y-blink'],
    ['at-invert','invert',    'a11y-invert'],
    ['at-by',    'by',        'a11y-by'],
    ['at-hc',    'hc',        'a11y-hc'],
    ['at-bigcur','bigCursor', 'a11y-big-cursor'],
    ['at-curcol','curBlack',  'a11y-cursor-black'],
    ['at-spc',   'spacing',   'a11y-spc'],
    ['at-font',  'readFont',  'a11y-font'],
    ['at-links', 'links',     'a11y-links'],
    ['at-alt',   'altText',   'a11y-alt'],
  ];

  function apply(){
    // Zoom: html font-size
    root.style.fontSize=state.zoom!==0?(100+state.zoom*10)+'%':'';
    // Font size: body font-size
    document.body.style.fontSize=state.fontInc!==0?(100+state.fontInc*10)+'%':'';

    // Toggle classes + tile active state
    TOGGLES.forEach(function(m){
      document.body.classList.toggle(m[2],!!state[m[1]]);
      var tile=document.getElementById(m[0]);
      if(tile){
        tile.classList.toggle('on',!!state[m[1]]);
        tile.setAttribute('aria-pressed',state[m[1]]?'true':'false');
      }
    });

    // Zoom/font tiles: highlight when non-zero
    var zd=document.getElementById('at-zoom-dec');
    var zi=document.getElementById('at-zoom-inc');
    var fd=document.getElementById('at-font-dec');
    var fi=document.getElementById('at-font-inc');
    if(zd) zd.classList.toggle('on',state.zoom<0);
    if(zi) zi.classList.toggle('on',state.zoom>0);
    if(fd) fd.classList.toggle('on',state.fontInc<0);
    if(fi) fi.classList.toggle('on',state.fontInc>0);

    // Alt text: add/remove title attributes on images
    if(state.altText){
      document.querySelectorAll('img[alt]:not([data-alt-shown])').forEach(function(img){
        if(img.alt){img.setAttribute('data-alt-shown','1');img.setAttribute('title',img.alt);}
      });
    } else {
      document.querySelectorAll('img[data-alt-shown]').forEach(function(img){
        img.removeAttribute('data-alt-shown');img.removeAttribute('title');
      });
    }
  }

  function openPanel(){
    panel.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    var first=panel.querySelector('.a11y-close-x,.a11y-tile');
    if(first) setTimeout(function(){first.focus();},60);
  }
  function closePanel(){
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    btn.focus();
  }

  btn.addEventListener('click',function(e){
    e.stopPropagation();
    panel.classList.contains('open')?closePanel():openPanel();
  });

  var closeBtnEl=document.getElementById('a11y-close-btn');
  if(closeBtnEl) closeBtnEl.addEventListener('click',closePanel);

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&panel.classList.contains('open')) closePanel();
  });
  document.addEventListener('click',function(e){
    if(panel.classList.contains('open')&&!panel.contains(e.target)&&e.target!==btn) closePanel();
  });

  // Zoom buttons
  var zdEl=document.getElementById('at-zoom-dec');
  var ziEl=document.getElementById('at-zoom-inc');
  if(zdEl) zdEl.addEventListener('click',function(){if(state.zoom>-3){state.zoom--;apply();save();}});
  if(ziEl) ziEl.addEventListener('click',function(){if(state.zoom<5){state.zoom++;apply();save();}});

  // Font buttons
  var fdEl=document.getElementById('at-font-dec');
  var fiEl=document.getElementById('at-font-inc');
  if(fdEl) fdEl.addEventListener('click',function(){if(state.fontInc>-3){state.fontInc--;apply();save();}});
  if(fiEl) fiEl.addEventListener('click',function(){if(state.fontInc<5){state.fontInc++;apply();save();}});

  // Toggle tiles
  TOGGLES.forEach(function(m){
    var tile=document.getElementById(m[0]);
    if(tile) tile.addEventListener('click',function(){state[m[1]]=!state[m[1]];apply();save();});
  });

  // Reset
  var resetEl=document.getElementById('at-reset');
  if(resetEl) resetEl.addEventListener('click',function(){
    state=Object.assign({},defaults);
    root.style.fontSize='';
    document.body.style.fontSize='';
    apply();save();
  });

  // Hide now (session only)
  var hideEl=document.getElementById('at-hide');
  if(hideEl) hideEl.addEventListener('click',function(){
    closePanel();
    btn.style.display='none';
    try{sessionStorage.setItem('lalag-a11y-hidden','1');}catch(e){}
  });

  // Report violation
  var reportEl=document.getElementById('at-report');
  if(reportEl) reportEl.addEventListener('click',function(){
    window.location.href='mailto:lalag.and.more@gmail.com?subject=דיווח הפרת נגישות&body=שלום,%0Aברצוני לדווח על הפרת נגישות באתר lalag and more.';
  });

  // Declaration placeholder
  var declEl=document.getElementById('at-decl');
  if(declEl) declEl.addEventListener('click',function(){
    alert('הצהרת הנגישות של lalag & more\n\nאתר זה עומד בדרישות תקן הנגישות WCAG 2.1 AA ותקנות שוויון זכויות לאנשים עם מוגבלות (ישראל 2021).\n\nלפניות בנושא נגישות: lalag.and.more@gmail.com');
  });

  // Restore session hidden state
  try{if(sessionStorage.getItem('lalag-a11y-hidden')==='1')btn.style.display='none';}catch(e){}

  apply();
})();

/* ═══════════════════════════════════
   MOBILE HAMBURGER MENU
═══════════════════════════════════ */
(function(){
  var btn=document.getElementById('mob-menu-btn');
  var menu=document.getElementById('mob-menu');
  if(!btn||!menu)return;

  var isOpen=false;
  var links=menu.querySelectorAll('.mob-link,.mob-nav-ctas,.mob-nav-icons');

  /* — set links to hidden-start state for stagger — */
  if(!prefersReducedMotion){
    links.forEach(function(el){
      el.style.opacity='0';
      el.style.transform='translateY(20px)';
      el.style.transition='opacity .32s ease,transform .32s ease';
    });
  }

  function openMenu(){
    isOpen=true;
    btn.classList.add('open');
    menu.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
    /* stagger links in */
    if(!prefersReducedMotion){
      links.forEach(function(el,i){
        setTimeout(function(){
          el.style.opacity='1';
          el.style.transform='translateY(0)';
        },120+i*60);   /* delay so menu fade-in finishes first */
      });
    } else {
      links.forEach(function(el){el.style.opacity='1';el.style.transform='none';});
    }
    var first=menu.querySelector('.mob-link');
    if(first) setTimeout(function(){first.focus();},80);
  }

  function closeMenu(){
    isOpen=false;
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
    /* reset links to hidden for next open */
    if(!prefersReducedMotion){
      links.forEach(function(el){
        el.style.opacity='0';
        el.style.transform='translateY(20px)';
      });
    }
    btn.focus();
  }

  btn.addEventListener('click',function(e){
    e.stopPropagation();
    isOpen?closeMenu():openMenu();
  });

  /* close when a nav link is tapped */
  links.forEach(function(el){
    if(el.classList.contains('mob-link')){
      el.addEventListener('click',function(){closeMenu();});
    }
  });

  /* close on Escape */
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&isOpen)closeMenu();
  });

  /* close when tapping outside the menu (on the overlay edge) */
  menu.addEventListener('click',function(e){
    if(e.target===menu)closeMenu();
  });
})();

/* ═══════════════════════════════════
   SPOTS urgency animation
═══════════════════════════════════ */
var spots=document.querySelectorAll('.spot');
spots.forEach(function(s,i){
  s.style.animationDelay=(i*.06)+'s';
});

/* ═══════════════════════════════════
   SERVICE DETAIL MODAL
═══════════════════════════════════ */
(function(){
  var waCfg=document.getElementById('srv-wa-cfg');
  var waBase=waCfg?waCfg.dataset.wa:'https://wa.me/972506762220';
  var waMsgs={
    chuggim:  waCfg?waCfg.dataset.msgChuggim:'היי זהבה! אני מעוניינת לשמוע על חוגים שבועיים לבתי 🎂',
    private:  waCfg?waCfg.dataset.msgPrivate:'היי זהבה! אני מעוניינת לתאם סדנה פרטית 🎉',
    orgs:     waCfg?waCfg.dataset.msgOrgs:'היי זהבה! אני מעוניינת לקבל הצעת מחיר לסדנה לארגון שלנו 🏢',
    marathon: waCfg?waCfg.dataset.msgMarathon:'היי זהבה! אני מעוניינת לשמוע על מרתון האפייה לנערות בחופש הגדול 🏆'
  };
  function buildWaUrl(key){ return waBase+'?text='+encodeURIComponent(waMsgs[key]||''); }

  var SRV_DATA={
    chuggim:{
      icon:'🍰',
      lbl:'חוג שבועי',
      title:'חוגים שבועיים',
      desc:'כל שבוע, הבת שלך מגיעה הביתה עם עוגה שאפתה לבד — ועם ביטחון עצמי שגדל שיעור אחרי שיעור. קבוצות של עד 6 ילדות בלבד, כדי שכל אחת תרגיש שבאנו בשבילה.',
      tags:['גילאי 6–14','שבועי','קבוצות קטנות','לוקחות הביתה'],
      details:[
        {icon:'👧',val:'גיל 6–14',lbl:'טווח גילאים'},
        {icon:'📅',val:'כל שבוע',lbl:'תדירות'},
        {icon:'👩‍🍳',val:'עד 6 בנות',lbl:'גודל קבוצה'}
      ],
      video:'/workshop1.mp4',
      ctaTxt:'שמרי מקום עכשיו'
    },
    private:{
      icon:'🎂',
      lbl:'סדנה פרטית',
      title:'סדנאות פרטיות',
      desc:'דמייני: הבת שלך ועוד חברות, עטרות סינר ורוד, מקשטות עוגיות ביחד וצוחקות בלי הפסקה. מגיעות אליכן עם הכל — ויוצאות עם זיכרון לכל החיים.',
      tags:['זוגות','קבוצות','יום הולדת','חוויה אישית'],
      details:[
        {icon:'🎉',val:'יום הולדת',lbl:'מאפיין עיקרי'},
        {icon:'👥',val:'2–15 ילדות',lbl:'גודל קבוצה'},
        {icon:'✨',val:'חוויה מותאמת',lbl:'אישי לכל קבוצה'}
      ],
      video:'/workshop2.mp4',
      ctaTxt:'בואי נתאם יחד'
    },
    marathon:{
      icon:'🏆',
      lbl:'מרתון אפייה לנערות',
      title:'מרתון אפייה לנערות',
      desc:'5 מפגשים של 5 שעות בחופש הגדול — פחזניות, עוגות רולדה, שמרים, עוגה מעוצבת, קינוחי כוסות ועוד. כל מפגש יצירה שיוצאת הביתה. מוצרים בכשרות הבד"צ המהודרות.',
      tags:['גילאי 10–16','5 מפגשים','5 שעות כל מפגש','חופש הגדול','קריית אתא'],
      details:[
        {icon:'📅',val:'5 מפגשים',lbl:'5 שעות כל מפגש'},
        {icon:'🍰',val:'מגוון מתכונים',lbl:'רמה מקצועית'},
        {icon:'🎁',val:'לוקחות הביתה',lbl:'כל יצירה באריזה'}
      ],
      video:'/workshop1.mp4',
      ctaTxt:'שמרי מקום עכשיו'
    },
    orgs:{
      icon:'🏢',
      lbl:'לארגונים ומוסדות',
      title:'תנו להם חוויה שידברו עליה',
      desc:'לא עוד טיול לגן חיות. מגיעות אליכם עם הכל — וחוזרות הביתה עם 200 ילדות שגילו שהן יכולות. סדנאות מותאמות לכל גיל, גודל קבוצה ואירוע.',
      tags:['🏢 מתנ"סים','🏫 בתי ספר','☀️ קייטנות','🤝 ארגונים','🎉 אירועים מיוחדים'],
      details:[
        {icon:'🚐',val:'מגיעות אליכם',lbl:'ציוד, חומרים, מדריכות — הכל'},
        {icon:'👨‍👩‍👧',val:'עד 200 משתתפים',lbl:'מכיתה עד מוסד שלם'},
        {icon:'✨',val:'כל ילד מצליח',lbl:'יוצא עם יצירה שעשה לבד'}
      ],
      video:'/workshop3.mp4',
      ctaTxt:'בקשו הצעת מחיר'
    }
  };

  var modal=document.getElementById('srv-modal');
  var modalClose=document.getElementById('srv-modal-close');
  var modalVideo=document.getElementById('srv-modal-video');
  if(!modal)return;

  function openModal(key){
    var d=SRV_DATA[key];if(!d)return;
    /* read live title/desc from the card (reflects dashboard edits) */
    var card=document.querySelector('[data-srv="'+key+'"]');
    var liveTitle=card&&card.querySelector('.srv-h3')?card.querySelector('.srv-h3').textContent.trim():'';
    var liveDesc=card&&card.querySelector('.srv-body')?card.querySelector('.srv-body').textContent.trim():'';
    document.getElementById('srv-modal-icon').textContent=d.icon;
    document.getElementById('srv-modal-lbl').textContent=d.lbl;
    document.getElementById('srv-modal-title').textContent=liveTitle||d.title;
    document.getElementById('srv-modal-desc').textContent=liveDesc||d.desc;
    document.getElementById('srv-modal-tags').innerHTML=d.tags.map(function(t){return'<span class="srv-modal-tag">'+t+'</span>';}).join('');
    document.getElementById('srv-modal-details').innerHTML=d.details.map(function(det){
      return'<div class="srv-modal-det"><span class="srv-modal-det-icon">'+det.icon+'</span><span class="srv-modal-det-val">'+det.val+'</span><span class="srv-modal-det-lbl">'+det.lbl+'</span></div>';
    }).join('');
    var cta=document.getElementById('srv-modal-cta');
    cta.href=buildWaUrl(key);
    cta.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/></svg> '+d.ctaTxt;
    if(modalVideo.src!==location.origin+d.video){
      modalVideo.src=d.video;
      modalVideo.load();
    }
    modalVideo.play().catch(function(){});
    modal.classList.add('open');
    document.body.style.overflow='hidden';
    modalClose.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow='';
    modalVideo.pause();
  }

  /* set WhatsApp URLs on in-card CTA buttons */
  document.querySelectorAll('[data-srv]').forEach(function(card){
    var key=card.dataset.srv;
    var inCardCta=card.querySelector('.srv-cta');
    if(inCardCta)inCardCta.href=buildWaUrl(key);
  });

  /* open on card click */
  document.querySelectorAll('[data-srv]').forEach(function(card){
    card.addEventListener('click',function(e){
      if(e.target.closest('.srv-cta'))return; /* let WhatsApp CTA work normally */
      openModal(card.dataset.srv);
    });
    card.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(card.dataset.srv);}
    });
  });

  /* close button */
  if(modalClose)modalClose.addEventListener('click',closeModal);

  /* click outside content */
  modal.addEventListener('click',function(e){
    if(e.target===modal||e.target.classList.contains('srv-modal-scroll')||e.target.classList.contains('srv-modal-bg')||e.target.classList.contains('srv-modal-veil')||e.target===modalVideo)closeModal();
  });

  /* Escape key */
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();
  });
})();

})();
