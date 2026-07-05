'use client'
import { useEffect } from 'react'

export type Testimonial = {
  id: string; avatar: string; name: string
  msg1: string; time1: string; msg2: string; time2: string
}
export type FaqItem = { id: string; q: string; a: string }
export type LandingData = {
  id: string; business_name: string; owner_name: string; location: string
  phone: string; whatsapp: string; instagram: string; headline: string
  subheadline: string; hero_desc: string; about_bio: string
  about_sub?: string; about_tagline?: string
  services_heading?: string
  section1_title: string; section1_desc: string
  section1_badge?: string; section1_tags?: string
  section2_title: string; section2_desc: string
  section2_badge?: string; section2_tags?: string
  section3_title: string; section3_desc: string
  section3_badge?: string; section3_tags?: string
  wa_msg_1?: string; wa_msg_2?: string; wa_msg_3?: string; wa_msg_4?: string
  section4_title?: string; section4_desc?: string
  section4_badge?: string; section4_tags?: string
  gallery_heading?: string; gallery_sub?: string
  how1_title?: string; how1_desc?: string
  how2_title?: string; how2_desc?: string
  how3_title?: string; how3_desc?: string
  how4_title?: string; how4_desc?: string
  cta_heading?: string; cta_sub?: string
  footer_desc?: string
  testimonials: Testimonial[] | null; faq_items: FaqItem[] | null
  updated_at: string
}

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
const IG_PATH = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
const waIcon = (sz: number, fill: string) => `<svg aria-hidden="true" focusable="false" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${fill}"><path d="${WA_PATH}"/></svg>`
const igIcon = (sz: number, uid='ig-g') => `<svg aria-hidden="true" focusable="false" width="${sz}" height="${sz}" viewBox="0 0 24 24"><defs><linearGradient id="${uid}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F58529"/><stop offset="45%" stop-color="#DD2A7B"/><stop offset="100%" stop-color="#515BD4"/></linearGradient></defs><path fill="url(#${uid})" d="${IG_PATH}"/></svg>`
const igIconWhite = (sz: number) => `<svg aria-hidden="true" focusable="false" width="${sz}" height="${sz}" viewBox="0 0 24 24"><path fill="rgba(255,255,255,0.82)" d="${IG_PATH}"/></svg>`

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@200;300;400;500;600;700;800;900&family=Bodoni+Moda:ital,wght@1,700;1,800;1,900&display=swap');

:root {
  /* Core palette — warm feminine premium */
  --pink:#F0516A;--pink2:#F97B93;--pink3:#FFB8C6;--pink4:#FFEAEF;
  --gold:#F5C230;--gold2:#FFF5C0;
  --peach:#FFCFB3;--blush:#FFE8D6;--rose:#FFD0D8;
  --sage:#6EC4A0;
  --cream:#FFFBF8;--warm:#FFF6F0;--mist:#FFFAF7;--bg:#FEFCFB;
  --brown:#1C0A04;--muted:#8A6558;--lite:#C4A898;
  --glass:rgba(255,252,250,.85);--blur:blur(28px);
  /* Premium layered shadows — no colour cast */
  --sh1:0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.06);
  --sh2:0 2px 4px rgba(0,0,0,.04),0 8px 36px rgba(0,0,0,.09),0 0 0 1px rgba(240,81,106,.06);
  --sh3:0 4px 8px rgba(0,0,0,.04),0 20px 64px rgba(0,0,0,.12),0 40px 100px rgba(240,81,106,.07);
  --sh-glass:0 2px 4px rgba(0,0,0,.04),0 12px 48px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.6);
  --r:16px;--r2:24px;--r3:36px;
  --ease:cubic-bezier(.22,1,.36,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:72px}
body{font-family:'Heebo',sans-serif;background:var(--bg);color:var(--brown);overflow-x:hidden;direction:rtl;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;cursor:none;line-height:1.78;font-size:15.5px}

/* ══ CINEMATIC LOADER ══ */
#ldr{
  position:fixed;inset:0;
  background:#080301;
  display:flex;align-items:center;justify-content:center;
  z-index:10000;
  transition:clip-path 1s cubic-bezier(.77,0,.18,1),opacity .8s cubic-bezier(.77,0,.18,1);
  clip-path:inset(0 0 0 0);
}
#ldr.out{
  clip-path:inset(0 0 100% 0);
  opacity:0;
  pointer-events:none;
}
.ldr-inner{
  display:flex;flex-direction:column;align-items:center;gap:28px;
  animation:ldr-rise 1.1s cubic-bezier(.2,1,.18,1) .15s both;
}
@keyframes ldr-rise{from{opacity:0;transform:translateY(28px) scale(.88)}to{opacity:1;transform:translateY(0) scale(1)}}
.ldr-logo-wrap{
  position:relative;overflow:hidden;
  border-radius:8px;
}
.ldr-logo-img{
  width:clamp(120px,22vw,190px);
  display:block;
  filter:brightness(0) invert(1);
  opacity:.92;
}
/* light beam sweep */
.ldr-beam{
  position:absolute;top:0;left:-120%;width:60%;height:100%;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);
  animation:ldr-sweep 1.15s ease-in-out .9s both;
  pointer-events:none;
}
@keyframes ldr-sweep{from{left:-120%}to{left:180%}}
/* pulsing dots */
.ldr-dots{display:flex;gap:7px;align-items:center}
.ldr-dots span{
  width:5px;height:5px;border-radius:50%;
  background:rgba(240,81,106,.7);
  animation:ldr-dot .9s ease-in-out infinite;
}
.ldr-dots span:nth-child(2){animation-delay:.16s;background:rgba(245,194,48,.7)}
.ldr-dots span:nth-child(3){animation-delay:.32s;background:rgba(110,196,160,.7)}
@keyframes ldr-dot{0%,80%,100%{transform:scale(.5);opacity:.3}40%{transform:scale(1.15);opacity:1}}

/* CURSOR — Cuberto premium */
#cur{position:fixed;width:7px;height:7px;background:var(--pink);border-radius:50%;pointer-events:none;z-index:9999;opacity:0;transform:translate(-50%,-50%);will-change:transform;transition:opacity .3s,transform .18s}
#cur-ring{position:fixed;width:40px;height:40px;border:1.5px solid rgba(240,81,106,.3);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);will-change:transform;transition:width .4s var(--ease),height .4s var(--ease),border-color .3s,background .3s,border-radius .3s}
#cur-ring.hover{width:60px;height:60px;background:rgba(240,81,106,.07);border-color:rgba(240,81,106,.52)}
#cur-ring.click{width:24px;height:24px;background:rgba(240,81,106,.18)}
#cur-ring.view{width:84px;height:84px;background:rgba(28,10,4,.03);border-color:rgba(28,10,4,.18);transition:width .38s var(--ease),height .38s var(--ease),border-color .3s,background .3s}
#cur-ring.card{width:68px;height:68px;background:rgba(240,81,106,.05);border-color:rgba(240,81,106,.52)}
#cur-ring.view{width:80px;height:80px;background:rgba(28,10,4,.04);border-color:rgba(28,10,4,.28)}
.cur-tr{position:fixed;pointer-events:none;z-index:9995;border-radius:50%;transform:translate(-50%,-50%);will-change:transform;opacity:0;transition:opacity .4s}
/* Cursor text label — Cuberto style */
.cur-lbl{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--pink);opacity:0;
  transition:opacity .25s;pointer-events:none;
}
#cur-ring.cta-hover{width:80px;height:80px;border-color:rgba(240,81,106,.6);background:rgba(240,81,106,.05)}
#cur-ring.cta-hover .cur-lbl{opacity:1}
/* Ambient spotlight glow — Nothing.tech */
#amb-glow{
  position:fixed;pointer-events:none;z-index:1;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(240,81,106,.055) 0%,rgba(245,194,48,.02) 40%,transparent 70%);
  transform:translate(-50%,-50%);
  opacity:0;transition:opacity .6s;
  will-change:transform;
  mix-blend-mode:normal;
}
/* Live social proof ticker */
#sp-ticker{
  position:fixed;bottom:88px;left:20px;z-index:998;
  display:flex;flex-direction:column;gap:8px;
  pointer-events:none;
}
.sp-notif{
  display:flex;align-items:center;gap:10px;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(28,10,4,.06);
  border-radius:14px;padding:11px 14px;
  box-shadow:0 8px 32px rgba(28,10,4,.12),0 2px 8px rgba(28,10,4,.06);
  font-size:12.5px;color:var(--brown);
  max-width:268px;line-height:1.4;
  opacity:0;transform:translateX(-18px);
  transition:opacity .45s cubic-bezier(.23,1,.32,1),transform .45s cubic-bezier(.23,1,.32,1);
  will-change:transform,opacity;
}
.sp-notif.sp-in{opacity:1;transform:translateX(0)}
.sp-notif.sp-out{opacity:0;transform:translateX(-18px)}
.sp-emoji{font-size:20px;flex-shrink:0}
.sp-txt strong{font-weight:700;color:var(--pink)}
.sp-dot{
  width:7px;height:7px;border-radius:50%;
  background:#25D366;flex-shrink:0;
  box-shadow:0 0 0 2px rgba(37,211,102,.2);
  animation:sp-pulse 2s ease-in-out infinite;
}
@keyframes sp-pulse{0%,100%{box-shadow:0 0 0 2px rgba(37,211,102,.2)}50%{box-shadow:0 0 0 5px rgba(37,211,102,.08)}}

/* ══ NAV — floating pill glassmorphism ══ */
#nav{display:none!important}
/* nav logo */
.nav-logo{display:flex;align-items:center;text-decoration:none}
.nav-logo-img{
  height:40px;width:auto;filter:none;
  transition:transform .3s var(--ease),opacity .2s;
}
.nav-logo:hover .nav-logo-img{transform:scale(1.06);opacity:.88}
/* nav links — hidden on desktop (moved to bottom dock) */
.nav-center{display:none}
/* ── Bottom dock ── */
#bottom-dock{
  position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  z-index:300;
  display:flex;align-items:center;gap:6px;
  background:rgba(14,7,3,.82);
  backdrop-filter:blur(40px) saturate(1.8);-webkit-backdrop-filter:blur(40px) saturate(1.8);
  border:1px solid rgba(255,255,255,.08);
  border-radius:60px;
  padding:7px 10px;
  box-shadow:0 24px 64px rgba(0,0,0,.45),0 8px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.06);
  animation:dock-in .7s cubic-bezier(.34,1.56,.64,1) 4s both;
  white-space:nowrap;
}
@keyframes dock-in{from{opacity:0;transform:translateX(-50%) translateY(24px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.dock-logo{
  display:flex;align-items:center;
  margin-left:4px;margin-right:4px;flex-shrink:0;
  text-decoration:none;
  transition:opacity .2s,transform .2s;
}
.dock-logo:hover{opacity:.8;transform:scale(1.05)}
.dock-logo img{height:34px;width:auto;object-fit:contain}
.dock-icon{
  width:34px;height:34px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;opacity:.6;
  transition:opacity .25s,transform .25s,background .25s;
  flex-shrink:0;
}
.dock-icon:hover{opacity:1;transform:scale(1.18);background:rgba(255,255,255,.1)}
.dock-sep{width:1px;height:20px;background:rgba(255,255,255,.1);margin:0 2px;flex-shrink:0}
.dock-link{
  color:rgba(255,255,255,.6);text-decoration:none;
  font-size:12px;font-weight:600;letter-spacing:.6px;
  padding:7px 18px;border-radius:50px;
  transition:color .2s,background .2s;
  cursor:pointer;
}
.dock-link:hover{color:#fff;background:rgba(255,255,255,.1)}
.dock-link.dock-active{color:#fff;background:rgba(255,255,255,.1)}
.dock-wa{
  display:flex;align-items:center;gap:7px;
  background:linear-gradient(135deg,rgba(37,211,102,.85),rgba(29,168,81,.85));
  color:#fff;font-size:12px;font-weight:700;letter-spacing:.3px;
  padding:7px 16px 7px 14px;border-radius:50px;
  text-decoration:none;
  box-shadow:0 4px 14px rgba(37,211,102,.3);
  transition:box-shadow .25s,transform .2s;
  margin-right:2px;margin-left:2px;
}
.dock-wa:hover{box-shadow:0 6px 20px rgba(37,211,102,.5);transform:scale(1.04)}
.nav-center a{
  color:var(--muted);text-decoration:none;
  font-size:11px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;
  padding:8px 20px;position:relative;transition:color .25s;
}
.nav-center a::after{
  content:'';position:absolute;bottom:6px;right:20px;left:20px;height:1px;
  background:linear-gradient(90deg,var(--pink),var(--gold));
  transform:scaleX(0);transform-origin:right;border-radius:1px;
  transition:transform .35s var(--ease);
}
.nav-center a:hover{color:var(--brown)}
.nav-center a:hover::after{transform:scaleX(1);transform-origin:left}
.nav-right{display:flex;align-items:center;gap:6px}
.nav-ig,.nav-wa{
  width:36px;height:36px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;opacity:.58;
  transition:opacity .25s,transform .25s var(--ease),background .25s;
  cursor:none;
}
.nav-ig:hover,.nav-wa:hover{opacity:1;transform:scale(1.18);background:rgba(240,81,106,.07)}
/* Nav WhatsApp pill — prominent CTA */
.nav-wa-pill{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#25D366,#1DA851);
  color:white;font-size:11.5px;font-weight:700;
  padding:9px 16px 9px 12px;border-radius:50px;
  text-decoration:none;cursor:none;
  box-shadow:0 4px 14px rgba(37,211,102,.28);
  transition:box-shadow .3s var(--ease),transform .2s var(--ease),opacity .2s;
  letter-spacing:.2px;white-space:nowrap;opacity:.9;
}
.nav-wa-pill:hover{box-shadow:0 8px 28px rgba(37,211,102,.44);transform:translateY(-1px);opacity:1}
/* Floating WhatsApp — mobile only */
.float-wa{
  position:fixed;bottom:24px;right:24px;z-index:990;
  width:56px;height:56px;border-radius:50%;
  background:linear-gradient(135deg,#25D366,#1DA851);
  display:flex;align-items:center;justify-content:center;
  text-decoration:none;cursor:pointer;
  box-shadow:0 8px 28px rgba(37,211,102,.4),0 4px 14px rgba(0,0,0,.12);
  animation:wa-pulse 3s ease-in-out infinite;
  transition:transform .25s var(--ease),box-shadow .25s;
}
.float-wa:hover{transform:scale(1.1);box-shadow:0 12px 40px rgba(37,211,102,.55)}
@media(min-width:769px){.float-wa{display:none}}

/* ══ HERO — CINEMATIC LOGO EXPERIENCE ══ */
.hero-cin{
  position:relative;width:100%;height:100svh;min-height:600px;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;background:#070302;
}
/* Moving cinematic light overlay */
#cin-light{
  position:absolute;inset:0;pointer-events:none;z-index:5;
  will-change:background;
}

/* Animated background orbs */
.cin-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
.cin-orb{position:absolute;border-radius:50%;filter:blur(90px);will-change:transform}
.cin-orb-1{
  width:80vw;height:80vw;max-width:1000px;max-height:1000px;
  background:radial-gradient(circle,rgba(240,81,106,.15) 0%,transparent 68%);
  top:-25%;left:-18%;
  animation:cin-d1 20s ease-in-out infinite;
}
.cin-orb-2{
  width:60vw;height:60vw;max-width:800px;max-height:800px;
  background:radial-gradient(circle,rgba(245,194,48,.11) 0%,transparent 68%);
  bottom:-22%;right:-14%;
  animation:cin-d2 26s ease-in-out infinite reverse;
}
.cin-orb-3{
  width:40vw;height:40vw;max-width:560px;max-height:560px;
  background:radial-gradient(circle,rgba(255,207,179,.09) 0%,transparent 68%);
  top:30%;right:22%;
  animation:cin-d3 32s ease-in-out infinite;
}
@keyframes cin-d1{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(44px,-32px) scale(1.06)}70%{transform:translate(-28px,40px) scale(.96)}}
@keyframes cin-d2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-38px,26px) scale(1.04)}75%{transform:translate(30px,-20px) scale(.97)}}
@keyframes cin-d3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,16px) scale(1.1)}}

/* Particle canvas */
#cin-particles{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}

/* Center stage — column: logo → content */
.cin-stage{
  position:relative;z-index:10;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:28px;width:100%;padding:0 24px;
}

/* Logo outer — receives JS magnetic + tilt */
.cin-logo-outer{
  position:relative;cursor:none;
  display:flex;align-items:center;justify-content:center;
  will-change:transform;
}

/* Glow rings pulse behind logo */
.cin-glow-a{
  position:absolute;width:150%;height:150%;top:-25%;left:-25%;
  border-radius:50%;pointer-events:none;z-index:1;
  background:radial-gradient(ellipse at center,rgba(240,81,106,.24) 0%,transparent 62%);
  filter:blur(24px);animation:cin-ga 4.2s ease-in-out infinite;
}
.cin-glow-b{
  position:absolute;width:120%;height:120%;top:-10%;left:-10%;
  border-radius:50%;pointer-events:none;z-index:1;
  background:radial-gradient(ellipse at center,rgba(245,194,48,.13) 0%,transparent 58%);
  filter:blur(16px);animation:cin-gb 6.5s ease-in-out infinite reverse;
}
@keyframes cin-ga{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:1;transform:scale(1.22)}}
@keyframes cin-gb{0%,100%{opacity:.3;transform:scale(.95)}50%{opacity:.8;transform:scale(1.14)}}

/* Logo image — JS triggers entrance, then continuous float + tilt */
.cin-logo-img{
  position:relative;z-index:2;
  width:clamp(300px,46vw,700px);height:auto;display:block;
  opacity:0;
  will-change:filter,opacity,transform;
  user-select:none;-webkit-user-drag:none;
}

/* Entrance keyframe — applied by JS */
@keyframes cin-enter{
  0%{opacity:0;filter:blur(28px);transform:scale(.68)}
  58%{opacity:1;filter:blur(0px);transform:scale(1.04)}
  100%{opacity:1;filter:blur(0px);transform:scale(1)}
}

/* Light sweep removed */
.cin-shine{display:none}

/* Scroll indicators — both sides */
.cin-sides{
  position:absolute;bottom:36px;left:0;right:0;z-index:20;
  display:flex;justify-content:space-between;align-items:flex-end;
  padding:0 48px;pointer-events:none;
  opacity:0;animation:fup .9s ease 3.2s forwards;
}
.cin-side{display:flex;flex-direction:column;align-items:center;gap:10px}
.cin-side-lbl{
  font-size:8px;letter-spacing:3.5px;text-transform:uppercase;
  color:rgba(255,255,255,.18);font-weight:700;
}
.cin-side-line{
  width:1px;height:44px;
  background:linear-gradient(180deg,transparent,rgba(255,255,255,.12),transparent);
  position:relative;overflow:hidden;
}
.cin-side-line::after{
  content:'';position:absolute;top:-100%;left:0;right:0;height:100%;
  background:linear-gradient(180deg,transparent,rgba(240,81,106,.85),transparent);
  animation:cin-sd 2.2s ease-in-out 3.4s infinite;
}
.cin-side-arr{
  width:11px;height:11px;
  border-right:1.5px solid rgba(255,255,255,.22);
  border-bottom:1.5px solid rgba(255,255,255,.22);
  transform:rotate(45deg);
  animation:cin-arr 1.8s ease-in-out 3.4s infinite;
}
@keyframes cin-sd{0%{top:-100%}100%{top:200%}}
@keyframes cin-arr{
  0%,100%{opacity:.22;transform:rotate(45deg) translateY(0)}
  50%{opacity:.55;transform:rotate(45deg) translateY(5px)}
}

@keyframes fup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

/* ── Hero content CTA block ── */
.hero-content{
  position:relative;z-index:20;
  text-align:center;padding:0 20px;
  animation:fup .95s ease 3.8s both;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;
  color:rgba(255,203,184,.55);margin-bottom:14px;
}
.hero-eyebrow::before,.hero-eyebrow::after{
  content:'';width:20px;height:1px;
  background:rgba(255,203,184,.35);border-radius:2px;flex-shrink:0;
}
.hero-sub{
  font-size:clamp(15px,2vw,20px);font-weight:300;
  color:rgba(255,255,255,.7);
  letter-spacing:.03em;line-height:1.55;
  margin-bottom:26px;
}
.hero-ctas{
  display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;
}
.btn-ghost-dark{
  display:inline-flex;align-items:center;gap:8px;
  color:rgba(255,255,255,.72);font-size:14px;font-weight:600;
  padding:13px 24px;border-radius:50px;
  text-decoration:none;cursor:none;
  border:1.5px solid rgba(255,255,255,.18);
  background:rgba(255,255,255,.06);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  transition:all .28s var(--ease);
}
.btn-ghost-dark:hover{border-color:rgba(255,255,255,.36);color:white;background:rgba(255,255,255,.11)}

/* ── Trust stats strip ── */
.trust-strip{
  background:white;
  border-bottom:1px solid rgba(28,10,4,.05);
  padding:36px 56px;
  display:flex;align-items:center;justify-content:center;gap:0;overflow:hidden;
}
.trust-item{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  padding:0 40px;position:relative;
}
.trust-item+.trust-item::before{
  content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);
  width:1px;height:36px;background:rgba(28,10,4,.07);
}
.trust-num{
  font-size:clamp(26px,3vw,36px);font-weight:900;
  color:var(--pink);letter-spacing:-1.5px;line-height:1;
}
.trust-lbl{
  font-size:11px;font-weight:600;color:var(--muted);
  letter-spacing:.5px;text-align:center;line-height:1.4;
}

/* CTA buttons — used site-wide */
.btn-wa-hero{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#25D366,#1DA851);
  color:white;font-size:15px;font-weight:700;
  padding:15px 30px;border-radius:50px;
  text-decoration:none;border:none;cursor:none;
  box-shadow:0 8px 28px rgba(37,211,102,.32);
  animation:wa-pulse 3s ease-in-out infinite;
  transition:box-shadow .3s,transform .1s;
}
@keyframes wa-pulse{0%,100%{box-shadow:0 8px 28px rgba(37,211,102,.32)}50%{box-shadow:0 8px 44px rgba(37,211,102,.52),0 0 0 8px rgba(37,211,102,.06)}}
.btn-wa-hero:hover{animation:none;box-shadow:0 14px 44px rgba(37,211,102,.5)}
.btn-ghost-lg{
  display:inline-flex;align-items:center;gap:8px;
  color:var(--muted);font-size:14px;font-weight:600;
  padding:13px 24px;border-radius:50px;
  text-decoration:none;cursor:none;
  border:1.5px solid rgba(120,90,80,.14);
  background:rgba(255,255,255,.6);backdrop-filter:blur(12px);
  transition:all .28s var(--ease);
}
.btn-ghost-lg:hover{border-color:var(--pink3);color:var(--pink);background:white}


/* MARQUEE — floating */
.marquee-section{
  overflow:hidden;background:var(--brown);padding:14px 0;
  position:relative;z-index:10;
  margin:0 28px;border-radius:16px;
  box-shadow:0 16px 48px rgba(28,10,4,.28),0 4px 16px rgba(28,10,4,.14);
  transform:translateY(-18px);
}
.marquee-outer{display:flex;gap:0;white-space:nowrap}
.mq-track{display:inline-flex;gap:0;animation:mq-slide 32s linear infinite;flex-shrink:0}
@keyframes mq-slide{from{transform:translateX(0)}to{transform:translateX(-100%)}}
.mq-item{display:inline-flex;align-items:center;gap:20px;padding:0 40px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.5);letter-spacing:.5px;white-space:nowrap}
.mq-sep{color:var(--pink);font-size:14px;opacity:.8}

/* GLOBAL BG GRAIN — adds subtle tactile depth to white/cream sections */
.about-sec,.services-sec,.how-sec,.faq-sec{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat:repeat;background-size:300px 300px;
}

/* ABOUT */
.about-sec{padding:110px 56px;background:white;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-visual-wrap{position:relative;display:flex;justify-content:center}
.about-img-frame{
  width:360px;height:440px;border-radius:var(--r3);
  box-shadow:var(--sh3);position:relative;overflow:hidden;
  animation:float-ab 8s ease-in-out infinite;
  background:linear-gradient(145deg,var(--pink4),#FFE8D6);
}
@keyframes float-ab{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(1deg)}}
.about-photo{
  width:100%;height:100%;
  object-fit:cover;object-position:top center;
  display:block;
}
.about-cert{
  position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);
  background:rgba(255,255,255,.96);
  backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);
  border-radius:18px;padding:18px 30px;
  box-shadow:
    0 2px 4px rgba(0,0,0,.05),
    0 12px 48px rgba(0,0,0,.12),
    0 0 0 1px rgba(255,255,255,.8),
    inset 0 1px 0 rgba(255,255,255,.9);
  display:flex;align-items:center;gap:18px;white-space:nowrap;
  border:1px solid rgba(240,81,106,.1);min-width:280px;
}
.about-cert-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--pink4),rgba(245,194,48,.15));display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.about-cert-title{font-size:13px;font-weight:800;color:var(--brown);letter-spacing:-.2px}
.about-cert-sub{font-size:11px;color:var(--lite);font-weight:500;margin-top:2px}
.about-cert-sep{width:1px;height:32px;background:rgba(240,81,106,.12);flex-shrink:0}
.about-cert-year{font-size:22px;font-weight:900;color:var(--pink);letter-spacing:-1px}
.about-cert-yearlabel{font-size:9px;color:var(--lite);text-transform:uppercase;letter-spacing:1.5px;font-weight:600}
.sec-label{display:inline-flex;align-items:center;gap:10px;font-size:10.5px;font-weight:700;color:var(--pink);letter-spacing:3px;text-transform:uppercase;margin-bottom:18px}
.sec-label::before{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,var(--pink),var(--gold));border-radius:2px}
.about-h2{font-size:clamp(30px,3vw,48px);font-weight:900;line-height:1.08;color:var(--brown);letter-spacing:-1.8px;margin-bottom:26px}
.about-h2 .ac{color:var(--pink)}
.about-body{font-size:15.5px;color:var(--muted);line-height:2.05;font-weight:300;margin-bottom:22px;letter-spacing:.01em}

/* SERVICES */
.services-sec{
  padding:120px 56px;
  background:var(--warm);
  background-image:
    radial-gradient(ellipse 80% 60% at 50% -10%,rgba(240,81,106,.04),transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat:no-repeat,repeat;
  background-size:100% auto,300px 300px;
}
.sec-header{text-align:center;margin-bottom:64px}
.sec-h2{font-size:clamp(34px,4vw,56px);font-weight:900;color:var(--brown);line-height:1.06;letter-spacing:-2.2px;margin-bottom:18px}
.sec-h2 .ac{color:var(--pink)}
.sec-desc{font-size:16.5px;color:var(--muted);font-weight:300;max-width:520px;margin:0 auto;line-height:1.85;letter-spacing:.01em}
.srv-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;align-items:stretch}
.srv-card{
  background:rgba(255,255,255,.96);border-radius:var(--r2);padding:44px 36px 40px;
  border:1px solid rgba(240,81,106,.07);
  box-shadow:var(--sh1);
  backdrop-filter:blur(0px);
  transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .5s,background .4s;
  cursor:none;display:flex;flex-direction:column;
}
.srv-card{position:relative;overflow:hidden}
/* top gradient accent bar */
.srv-card::before{
  content:'';position:absolute;top:0;right:0;width:100%;height:3.5px;
  background:linear-gradient(90deg,var(--gold),var(--pink),var(--peach));
  transform:scaleX(0);transform-origin:right;
  transition:transform .55s var(--ease);border-radius:0 var(--r2) 0 0;
}
.srv-card:hover{
  transform:translateY(-12px) scale(1.016);
  background:rgba(255,252,250,.99);
  box-shadow:
    0 2px 4px rgba(0,0,0,.03),
    0 12px 40px rgba(0,0,0,.09),
    0 28px 72px rgba(240,81,106,.09),
    inset 0 1px 0 rgba(255,255,255,.9);
  border-color:rgba(240,81,106,.16);
}
.srv-card:hover::before{transform:scaleX(1)}
.srv-shine{position:absolute;inset:0;border-radius:var(--r2);pointer-events:none;z-index:3;opacity:0;transition:opacity .25s;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.44),transparent 56%)}
.srv-num{font-size:10px;font-weight:800;color:rgba(240,81,106,.5);letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;display:block}
/* Icon wrap — gradient circle */
.srv-icon-wrap{
  width:64px;height:64px;border-radius:18px;
  background:linear-gradient(135deg,var(--pink4),rgba(245,194,48,.12));
  display:flex;align-items:center;justify-content:center;
  margin-bottom:22px;flex-shrink:0;
  box-shadow:0 4px 16px rgba(240,81,106,.12);
  transition:transform .4s var(--ease),box-shadow .4s var(--ease);
}
.srv-card:hover .srv-icon-wrap{
  transform:scale(1.1) rotate(-3deg);
  box-shadow:0 8px 28px rgba(240,81,106,.22);
}
.srv-icon{font-size:30px;line-height:1}
.srv-h3{font-size:20px;font-weight:900;color:var(--brown);letter-spacing:-.5px;margin-bottom:6px;line-height:1.2}
.srv-h3-line{width:28px;height:2.5px;background:linear-gradient(90deg,var(--pink),var(--gold));border-radius:2px;margin-bottom:16px;transition:width .45s var(--ease)}
.srv-card:hover .srv-h3-line{width:52px}
.srv-body{font-size:14.5px;color:var(--muted);line-height:2;font-weight:300;margin-bottom:20px;letter-spacing:.01em}
.srv-tags{display:flex;flex-wrap:nowrap;gap:6px;margin-bottom:22px;margin-top:auto;overflow:hidden}
.srv-tag{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.srv-tag{
  background:linear-gradient(135deg,var(--pink4),rgba(245,194,48,.08));
  color:var(--pink);border-radius:50px;padding:5px 14px;
  font-size:11px;font-weight:700;letter-spacing:.2px;
  border:1px solid rgba(240,81,106,.1);
  transition:background .25s,border-color .25s;
}
.srv-card:hover .srv-tag{background:var(--pink4);border-color:rgba(240,81,106,.2)}
.srv-cta{
  display:inline-flex;align-items:center;gap:8px;
  color:white;font-size:13px;font-weight:700;
  text-decoration:none;cursor:none;
  background:linear-gradient(135deg,#25D366,#1DA851);
  padding:12px 22px;border-radius:50px;
  box-shadow:0 4px 18px rgba(37,211,102,.28);
  transition:all .3s var(--ease);
  width:fit-content;position:relative;overflow:hidden;
}
.srv-cta::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
  opacity:0;transition:opacity .25s;
}
.srv-cta:hover{
  box-shadow:0 10px 32px rgba(37,211,102,.42);
  transform:translateY(-2px);
}
.srv-cta:hover::after{opacity:1}

/* ══════════════════════════════════════════════
   CLIP-PATH TEXT REVEAL — Rejouice signature
   Wrap headings: <div class="clip-h"><h2>...</h2></div>
   JS adds .in class when in viewport
══════════════════════════════════════════════ */
.clip-h{overflow:hidden;display:block}
.clip-h>*{display:block;transform:translateY(108%);transition:transform 1s cubic-bezier(.16,1,.3,1)}
.clip-h.in>*{transform:translateY(0)}
.clip-h2{overflow:hidden;display:block}
.clip-h2>*{display:block;transform:translateY(108%);transition:transform 1s .08s cubic-bezier(.16,1,.3,1)}
.clip-h2.in>*{transform:translateY(0)}
.clip-h3>*{display:block;transform:translateY(108%);transition:transform 1s .16s cubic-bezier(.16,1,.3,1)}
.clip-h3{overflow:hidden;display:block}
.clip-h3.in>*{transform:translateY(0)}

/* ══════════════════════════════════════════════
   AT A GLANCE — typographic stats monument
══════════════════════════════════════════════ */
.glance-sec{
  padding:120px 56px 130px;
  background:#FAFAF8;
  border-top:1px solid rgba(28,10,4,.06);
  border-bottom:1px solid rgba(28,10,4,.06);
}
.glance-top{
  display:flex;align-items:baseline;justify-content:space-between;
  flex-wrap:wrap;gap:12px;margin-bottom:72px;
}
.glance-eyebrow{
  font-size:11px;font-weight:700;color:var(--pink);
  letter-spacing:4px;text-transform:uppercase;
}
.glance-tagline{
  font-size:clamp(18px,1.8vw,24px);font-weight:300;
  color:var(--muted);font-family:'Bodoni Moda',serif;font-style:italic;
}
.glance-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:0;
}
.glance-item{
  padding:0 48px;
  border-right:1px solid rgba(28,10,4,.08);
  display:flex;flex-direction:column;gap:16px;
}
.glance-item:last-child{border-right:none}
.glance-num{
  font-size:clamp(72px,10.5vw,144px);
  font-weight:900;color:var(--brown);
  line-height:.86;letter-spacing:-5px;
  display:block;font-variant-numeric:tabular-nums;
}
.glance-num sup{
  font-size:.36em;letter-spacing:0;vertical-align:super;
  color:var(--pink);font-weight:900;
}
.glance-desc{
  font-size:clamp(15px,1.3vw,18px);
  color:var(--muted);font-weight:300;
  line-height:1.75;letter-spacing:.01em;display:block;
}
.glance-desc em{
  font-family:'Bodoni Moda',serif;font-style:italic;
  color:var(--brown);font-weight:700;font-size:1.04em;
}

/* ── Glance card layout ── */
.glance-cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
}
.glance-card{
  background:#fff;
  border-radius:24px;
  padding:44px 36px 40px;
  display:flex;flex-direction:column;gap:20px;
  box-shadow:0 2px 12px rgba(28,10,4,.06),0 8px 40px rgba(28,10,4,.04);
  border:1px solid rgba(240,81,106,.07);
  position:relative;overflow:hidden;
  transition:transform .35s var(--ease),box-shadow .35s var(--ease);
}
.glance-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--pink),var(--gold));
  border-radius:24px 24px 0 0;
}
.glance-card:hover{
  transform:translateY(-6px);
  box-shadow:0 12px 48px rgba(240,81,106,.12),0 2px 8px rgba(28,10,4,.06);
}
.glance-card-icon{
  width:48px;height:48px;border-radius:14px;
  background:linear-gradient(135deg,rgba(240,81,106,.1),rgba(245,194,48,.08));
  display:flex;align-items:center;justify-content:center;
  font-size:22px;flex-shrink:0;
  border:1px solid rgba(240,81,106,.1);
}
.glance-card .glance-num{
  font-size:clamp(64px,9vw,110px);letter-spacing:-4px;
}
.glance-card .glance-desc{
  font-size:clamp(14px,1.1vw,16px);
  padding-top:8px;border-top:1px solid rgba(28,10,4,.07);
}

/* ══════════════════════════════════════════════
   EDITORIAL SERVICES — Rejouice-inspired rows
══════════════════════════════════════════════ */
.srv-editorial-intro{
  padding:120px 56px 72px;
}
.srv-editorial-intro .sec-label{margin-bottom:22px}
.srv-main-h2{
  font-size:clamp(52px,7.5vw,112px);
  font-weight:900;color:var(--brown);
  line-height:.95;letter-spacing:-4.5px;
  margin-top:0;
}
.srv-main-h2 em{
  font-family:'Bodoni Moda',serif;font-style:italic;
  font-weight:700;color:var(--pink);letter-spacing:-3px;
}
.srv-list{border-top:1px solid rgba(28,10,4,.08)}
.srv-row{
  display:grid;
  grid-template-columns:72px 1fr auto;
  gap:0 52px;align-items:start;
  padding:60px 56px;
  border-bottom:1px solid rgba(28,10,4,.07);
  position:relative;overflow:hidden;
  transition:background .4s;cursor:none;
}
.srv-row::after{
  content:'';position:absolute;bottom:0;left:0;
  width:100%;height:1.5px;
  background:linear-gradient(90deg,var(--pink),var(--gold),var(--peach));
  transform:scaleX(0);transform-origin:right;
  transition:transform .65s var(--ease);
}
.srv-row:hover{background:rgba(255,255,255,.7)}
.srv-row:hover::after{transform:scaleX(1);transform-origin:left}
.srv-row-num{
  font-size:11px;font-weight:700;
  color:rgba(240,81,106,.38);letter-spacing:3px;
  text-transform:uppercase;padding-top:8px;text-align:center;
}
.srv-row-body h3{
  font-size:clamp(28px,3.4vw,52px);
  font-weight:900;color:var(--brown);
  letter-spacing:-1.8px;line-height:1.04;
  margin-bottom:18px;
}
.srv-row-body p{
  font-size:16px;color:var(--muted);
  font-weight:300;line-height:2;
  max-width:540px;letter-spacing:.01em;
  margin-bottom:20px;
}
.srv-row-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:0}
.srv-row-tag{
  background:rgba(240,81,106,.07);color:var(--pink);
  border:1px solid rgba(240,81,106,.12);
  border-radius:50px;padding:4px 14px;
  font-size:11px;font-weight:700;letter-spacing:.2px;
}
.srv-row-side{
  display:flex;flex-direction:column;align-items:flex-end;
  gap:14px;padding-top:8px;min-width:160px;
}
.srv-row-icon{font-size:40px;line-height:1;opacity:.6}
.srv-row-cta{
  display:inline-flex;align-items:center;gap:8px;
  white-space:nowrap;color:white;font-size:13px;font-weight:700;
  text-decoration:none;cursor:none;
  background:linear-gradient(135deg,#25D366,#1DA851);
  padding:12px 22px;border-radius:50px;
  box-shadow:0 4px 18px rgba(37,211,102,.28);
  transition:all .3s var(--ease);
}
.srv-row-cta:hover{box-shadow:0 10px 32px rgba(37,211,102,.42);transform:translateY(-2px)}
.srv-row-urgency{
  font-size:11px;font-weight:700;color:var(--pink);
  letter-spacing:.2px;display:flex;align-items:center;gap:6px;
}
.srv-row-urgency::before{
  content:'';width:6px;height:6px;border-radius:50%;
  background:var(--pink);flex-shrink:0;
  animation:sp-pulse 2s ease-in-out infinite;
}
.srv-row-badge{
  display:inline-flex;align-items:center;padding:4px 12px;
  background:var(--pink4);border:1px solid rgba(240,81,106,.18);
  border-radius:50px;font-size:10px;font-weight:800;
  color:var(--pink);letter-spacing:.5px;text-transform:uppercase;
}

/* ── Service card grid ── */
.srv-cards-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:14px;
  padding:0 56px 80px;
}
.srv-card-v2{
  background:#fff;
  border-radius:20px;
  padding:24px 26px 20px;
  display:flex;flex-direction:column;gap:0;
  border:1.5px solid rgba(240,81,106,.07);
  box-shadow:0 2px 12px rgba(28,10,4,.05),0 8px 40px rgba(28,10,4,.04);
  position:relative;overflow:hidden;
  transition:transform .38s var(--ease),box-shadow .38s var(--ease),border-color .3s;
  cursor:pointer;
}
.srv-card-v2::before{
  content:'';
  position:absolute;inset:0;
  background:radial-gradient(ellipse at top right,rgba(240,81,106,.04) 0%,transparent 60%);
  pointer-events:none;
}
.srv-card-v2:hover{
  transform:translateY(-5px);
  box-shadow:0 16px 52px rgba(240,81,106,.1),0 2px 8px rgba(28,10,4,.06);
  border-color:rgba(240,81,106,.16);
}
.srv-card-v2-top{
  display:flex;align-items:flex-start;justify-content:space-between;
  margin-bottom:14px;
}
.srv-card-v2-num{
  font-size:11px;font-weight:800;letter-spacing:.18em;
  color:var(--pink);text-transform:uppercase;
  background:var(--pink4);border:1px solid rgba(240,81,106,.14);
  border-radius:50px;padding:4px 12px;display:inline-block;
}
.srv-card-v2-icon{
  width:44px;height:44px;border-radius:14px;
  background:linear-gradient(135deg,var(--pink4),rgba(245,194,48,.1));
  display:flex;align-items:center;justify-content:center;
  font-size:26px;
  border:1px solid rgba(240,81,106,.1);
  box-shadow:0 4px 16px rgba(240,81,106,.1);
}
.srv-card-v2-title{
  font-size:clamp(17px,1.7vw,22px);font-weight:900;
  color:var(--brown);letter-spacing:-.5px;line-height:1.15;
  margin-bottom:8px;
}
.srv-card-v2-desc{
  font-size:clamp(13px,1vw,14px);color:var(--muted);
  font-weight:300;line-height:1.7;
  margin-bottom:12px;flex:1;
}
.srv-card-v2-tags{
  display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;
}
.srv-card-v2-tag{
  font-size:11px;font-weight:700;letter-spacing:.06em;
  background:rgba(28,10,4,.05);border:1px solid rgba(28,10,4,.09);
  border-radius:50px;padding:4px 12px;color:var(--brown);
}
.srv-card-v2-footer{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:14px;border-top:1px solid rgba(28,10,4,.07);
  gap:10px;
}
.srv-card-v2-urgency{
  font-size:11px;font-weight:700;color:var(--pink);
  display:flex;align-items:center;gap:5px;
}
.srv-card-v2-urgency::before{
  content:'';width:6px;height:6px;border-radius:50%;
  background:var(--pink);animation:sp-pulse 2s ease-in-out infinite;
}
.srv-card-v2-cta{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--brown);color:#fff;
  font-size:13px;font-weight:700;letter-spacing:.04em;
  padding:12px 22px;border-radius:50px;
  text-decoration:none;
  transition:background .25s,transform .2s,box-shadow .25s;
  box-shadow:0 4px 14px rgba(28,10,4,.2);
  flex-shrink:0;
}
.srv-card-v2-cta:hover{
  background:var(--pink);transform:translateY(-1px);
  box-shadow:0 6px 20px rgba(240,81,106,.35);
}

/* ══════════════════════════════════════════════
   SECTION HEADINGS — editorial scale upgrade
══════════════════════════════════════════════ */
.sec-h2{
  font-size:clamp(44px,6vw,92px)!important;
  line-height:.96!important;letter-spacing:-3.5px!important;
}
.about-h2{
  font-size:clamp(44px,5.8vw,88px)!important;
  line-height:.96!important;letter-spacing:-3.2px!important;
}
.gallery-h2{
  font-size:clamp(40px,5.5vw,82px)!important;
  line-height:.96!important;letter-spacing:-3px!important;
}
.how-h2,.cta-h2,.orgs-h2,.test-h2{
  font-size:clamp(40px,5.5vw,82px)!important;
  line-height:.96!important;letter-spacing:-3px!important;
}

/* GALLERY — Instagram-native integration */
.gallery-sec{
  padding:96px 0 100px;background:var(--brown);
  position:relative;overflow:hidden;
}
.gallery-sec::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 60% 50% at 15% 10%,rgba(131,58,180,.08),transparent),
    radial-gradient(ellipse 50% 40% at 85% 90%,rgba(240,81,106,.06),transparent);
}
.gallery-hd{text-align:center;padding:0 56px 48px}
.gallery-sec-label{font-size:11px;font-weight:700;color:rgba(255,203,184,.7);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:8px}
.gallery-sec-label::before,.gallery-sec-label::after{content:'';width:24px;height:1.5px;background:rgba(255,203,184,.4);border-radius:2px}
.gallery-h2{font-size:clamp(30px,3.5vw,50px);font-weight:900;color:white;letter-spacing:-2px;margin-bottom:14px;line-height:1.06}
.gallery-h2 .ac{color:var(--pink3)}
.gallery-sub{font-size:15.5px;color:rgba(255,255,255,.65);font-weight:300;margin-bottom:0;line-height:1.8;letter-spacing:.01em}

/* ── Instagram Profile Bar ── */
.ig-profile-bar{
  display:flex;align-items:center;gap:22px;
  max-width:1080px;margin:0 auto 36px;padding:0 56px;
}
.ig-profile-avatar{
  width:74px;height:74px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,var(--gold),var(--pink),var(--pink3));
  padding:2.5px;
}
.ig-profile-avatar-inner{
  width:100%;height:100%;border-radius:50%;
  background:var(--brown);overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.ig-profile-avatar-inner img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.ig-profile-info{flex:1;min-width:0}
.ig-handle-row{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.ig-handle{font-size:16px;font-weight:700;color:white;letter-spacing:-.2px}
.ig-verified{font-size:13px;color:var(--gold);line-height:1}
.ig-bio{font-size:12px;color:rgba(255,255,255,.48);line-height:1.5}
.ig-stats-row{display:flex;gap:24px;margin-top:9px}
.ig-stat-n{font-size:14px;font-weight:800;color:white}
.ig-stat-l{font-size:11px;color:rgba(255,255,255,.4);margin-right:3px}
.ig-follow-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--pink),var(--pink2));
  color:white;font-size:12.5px;font-weight:700;
  padding:11px 24px;border-radius:50px;
  text-decoration:none;flex-shrink:0;cursor:none;
  box-shadow:0 4px 18px rgba(240,81,106,.32);
  transition:transform .35s var(--ease),box-shadow .35s;
}
.ig-follow-btn:hover{transform:scale(1.06) translateY(-2px);box-shadow:0 10px 32px rgba(240,81,106,.48)}

/* ── Bento grid ── */
.ig-bento{
  display:grid;
  grid-template-columns:1.55fr 1fr 1fr;
  grid-template-rows:auto auto auto;
  gap:5px;
  max-width:1080px;margin:0 auto;padding:0 56px;
}
/* Featured video: col 1, spans 2 rows */
.ig-card-feat{grid-column:1;grid-row:1/3;aspect-ratio:3/4}
/* 4 small squares */
.ig-card-sq{aspect-ratio:1/1}
/* Full-width cinematic strip */
.ig-card-wide{grid-column:1/-1;aspect-ratio:16/5}

/* Base card */
.ig-card-feat,.ig-card-sq,.ig-card-wide{
  position:relative;overflow:hidden;
  border-radius:8px;background:#1a0a06;
  cursor:none;
  animation:ig-float 8s ease-in-out infinite;
  will-change:transform;
  box-shadow:0 6px 24px rgba(0,0,0,.45);
  transition:box-shadow .5s var(--ease);
}
.ig-card-feat{animation-duration:9s}
.ig-card-sq:nth-child(2){animation-delay:-1.5s;animation-duration:7s}
.ig-card-sq:nth-child(3){animation-delay:-3.2s;animation-duration:8.5s}
.ig-card-sq:nth-child(4){animation-delay:-5s;animation-duration:7.5s}
.ig-card-sq:nth-child(5){animation-delay:-2s;animation-duration:6.5s}
.ig-card-wide{animation:none;border-radius:10px}
.ig-card-feat:hover,.ig-card-sq:hover{
  animation-play-state:paused;z-index:4;
  box-shadow:0 24px 64px rgba(0,0,0,.7);
}
@keyframes ig-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* Media inside card */
.ig-media,.ig-media-video{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;display:block;
  z-index:2;
  transition:transform .75s var(--ease),filter .55s;
  will-change:transform;
}
.ig-card-feat:hover .ig-media-video,
.ig-card-sq:hover .ig-media-video,
.ig-card-wide:hover .ig-media-video,
.ig-card-feat:hover .ig-media,
.ig-card-sq:hover .ig-media,
.ig-card-wide:hover .ig-media{
  transform:scale(1.09);
  filter:brightness(1.07) saturate(1.2);
}
/* Dark gradient overlay */
.ig-overlay{
  position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.12) 42%,transparent 72%);
}
/* Hover engagement overlay */
.ig-hover-overlay{
  position:absolute;inset:0;z-index:3;
  background:rgba(0,0,0,.38);
  opacity:0;transition:opacity .3s;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:14px;
  pointer-events:none;
}
.ig-card-feat:hover .ig-hover-overlay,
.ig-card-sq:hover .ig-hover-overlay,
.ig-card-wide:hover .ig-hover-overlay{opacity:1}
.ig-play-circle{
  width:54px;height:54px;border-radius:50%;
  background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.5);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;
  font-size:19px;color:white;
}
.ig-engagement{display:flex;gap:20px;color:white;font-size:13.5px;font-weight:700}
.ig-engagement span{display:flex;align-items:center;gap:5px}
/* Card bottom label */
.ig-card-bottom{
  position:absolute;bottom:0;left:0;right:0;
  z-index:4;padding:12px 14px 11px;
}
.ig-card-title{font-size:12px;font-weight:700;color:white;text-shadow:0 1px 6px rgba(0,0,0,.6)}
/* Reel badge */
.ig-reel-badge{
  position:absolute;top:10px;left:10px;z-index:5;
  width:28px;height:28px;border-radius:7px;
  background:rgba(0,0,0,.38);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;color:white;
}
/* Shimmer loading */
.ig-card-feat::before,.ig-card-sq::before,.ig-card-wide::before{
  content:'';position:absolute;inset:0;z-index:1;
  background:linear-gradient(135deg,#1a0a06 0%,#2a1008 50%,#1a0a06 100%);
  background-size:200% 200%;
  animation:vid-shimmer 2.4s ease-in-out infinite;
  transition:opacity .5s;border-radius:inherit;
}
.ig-card-feat.loaded::before,.ig-card-sq.loaded::before,.ig-card-wide.loaded::before{animation:none;opacity:0}
@keyframes vid-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* ── CTA row ── */
.ig-cta-row{text-align:center;margin-top:44px;padding:0 56px}
.ig-cta-link{
  display:inline-flex;align-items:center;gap:10px;
  color:rgba(255,255,255,.75);font-size:13px;font-weight:500;
  text-decoration:none;padding:12px 26px;border-radius:50px;
  border:1px solid rgba(255,255,255,.18);
  background:rgba(255,255,255,.05);backdrop-filter:blur(8px);
  transition:all .3s var(--ease);
}
.ig-cta-link:hover{
  color:white;border-color:rgba(255,255,255,.35);
  background:rgba(255,255,255,.1);transform:translateY(-2px);
}

/* VIDEO MODAL */
#vid-modal{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:1000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s var(--ease);backdrop-filter:blur(8px)}
#vid-modal.open{opacity:1;pointer-events:all}
.vid-modal-inner{width:min(900px,90vw);max-height:90vh;background:#111;border-radius:var(--r2);overflow:hidden;position:relative;transform:scale(.9);transition:transform .4s var(--ease)}
#vid-modal.open .vid-modal-inner{transform:scale(1)}
#vid-close{position:absolute;top:16px;left:16px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);border:none;color:white;font-size:18px;cursor:none;display:flex;align-items:center;justify-content:center;transition:background .2s}
#vid-close:hover{background:rgba(255,255,255,.28)}
.vid-modal-inner iframe{width:100%;height:80vh;border:none;display:block}

/* TESTIMONIALS — Realistic WhatsApp screenshot cards */
.testimonials-sec{
  padding:110px 0 120px;
  background:#F5EDE6;
  overflow:hidden;
  background-image:
    radial-gradient(ellipse 60% 50% at 20% 50%,rgba(240,81,106,.06),transparent),
    radial-gradient(ellipse 50% 60% at 80% 50%,rgba(245,194,48,.04),transparent);
}
.t-header{text-align:center;margin-bottom:60px;padding:0 56px;color:var(--brown)}
.t-header .sec-h2{color:var(--brown)}
.t-header p{color:var(--muted)!important}
/* Star rating strip */
.t-stars-strip{
  display:flex;align-items:center;justify-content:center;gap:16px;
  margin-bottom:22px;
}
.t-star{font-size:20px;color:#F5A623;filter:drop-shadow(0 2px 6px rgba(245,166,35,.3))}
.t-star-count{font-size:13px;font-weight:600;color:var(--muted)}
/* Marquee container */
.t-marquee-wrap{display:flex;flex-direction:column;gap:20px}
.t-track{
  display:flex;gap:20px;
  width:max-content;
  will-change:transform;
  animation:tm-fwd 44s linear infinite;
}
.t-track-2{animation:tm-rev 54s linear infinite}
@keyframes tm-fwd{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes tm-rev{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.t-track:hover{animation-play-state:paused}

/* Phone screenshot card */
.t-card{
  width:290px;flex-shrink:0;
  border-radius:32px;
  overflow:hidden;
  display:flex;flex-direction:column;
  background:#ECE5DD;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.04),
    0 4px 12px rgba(0,0,0,.3),
    0 16px 48px rgba(0,0,0,.45),
    0 32px 80px rgba(0,0,0,.25);
  position:relative;
  transition:transform .4s var(--ease),box-shadow .4s;
}
/* subtle tilt for "screenshot pile" feel */
.t-card:nth-child(odd){transform:rotate(-0.7deg)}
.t-card:nth-child(even){transform:rotate(0.5deg)}
.t-card:nth-child(3n){transform:rotate(-1.1deg)}
.t-card:nth-child(4n){transform:rotate(0.9deg)}
.t-card:hover{
  transform:rotate(0deg) translateY(-8px) scale(1.02)!important;
  box-shadow:
    0 0 0 1px rgba(37,211,102,.15),
    0 8px 24px rgba(0,0,0,.35),
    0 32px 80px rgba(0,0,0,.55),
    0 48px 100px rgba(7,94,84,.15);
}

/* iOS status bar */
.t-status{
  background:#075E54;
  display:flex;justify-content:space-between;align-items:center;
  padding:5px 14px 0;
  font-size:10px;font-weight:700;color:white;
  letter-spacing:.2px;
}
.t-status-icons{display:flex;align-items:center;gap:4px;font-size:9px}

/* WA app header */
.t-wa-header{
  background:#075E54;
  padding:6px 10px 9px;
  display:flex;align-items:center;gap:8px;
}
.t-wa-back{color:white;font-size:22px;opacity:.9;line-height:1;margin-left:-2px}
.t-wa-avatar{
  width:34px;height:34px;border-radius:50%;
  background:rgba(255,255,255,.18);
  display:flex;align-items:center;justify-content:center;
  font-size:16px;flex-shrink:0;
}
.t-wa-info{flex:1;min-width:0}
.t-wa-name{color:white;font-size:13px;font-weight:600;line-height:1.2}
.t-wa-status{color:rgba(255,255,255,.82)!important;font-size:10px}
.t-wa-icons{display:flex;gap:14px;color:white;opacity:.85;font-size:17px}

/* Chat background — WA default wallpaper */
.t-wa-body{
  flex:1;
  padding:10px 9px 8px;
  display:flex;flex-direction:column;gap:6px;
  background-color:#ECE5DD;
  background-image:url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26 0l2 2-2 2-2-2 2-2zm13 13l2 2-2 2-2-2 2-2zM13 13l2 2-2 2-2-2 2-2zm26 26l2 2-2 2-2-2 2-2zM0 26l2 2-2 2-2-2 2-2zm13 13l2 2-2 2-2-2 2-2zm26 0l2 2-2 2-2-2 2-2zM0 0l2 2-2 2-2-2 2-2zm52 0l2 2-2 2-2-2 2-2z' fill='%23b2a99a' fill-opacity='0.22' fill-rule='evenodd'/%3E%3C/svg%3E");
}
/* Incoming WA bubble */
.t-bubble{
  background:white;
  border-radius:0 10px 10px 10px;
  padding:7px 10px 4px;
  max-width:88%;align-self:flex-start;
  position:relative;
  box-shadow:0 1px 2px rgba(0,0,0,.12);
  font-size:13px;color:#111;line-height:1.55;
  word-break:break-word;
}
.t-bubble::before{
  content:'';position:absolute;top:0;right:100%;
  border:6px solid transparent;
  border-top-color:white;border-right-color:white;
}
.t-bubble-time{
  font-size:9px;color:rgba(0,0,0,.38);
  margin-top:2px;text-align:left;
  display:flex;align-items:center;gap:2px;justify-content:flex-end;
}
.t-bubble-check{color:#53bdeb;font-size:10px}

/* Fake input bar */
.t-wa-footer{
  background:#F0F0F0;
  display:flex;align-items:center;gap:8px;
  padding:6px 8px;
  border-top:1px solid rgba(0,0,0,.06);
}
.t-wa-emoji{font-size:20px;opacity:.55}
.t-wa-field{
  flex:1;background:white;border-radius:20px;
  padding:6px 12px;font-size:11.5px;
  color:#aaa;font-family:inherit;
  box-shadow:0 1px 2px rgba(0,0,0,.07);
}
.t-wa-send{
  width:36px;height:36px;border-radius:50%;
  background:#25D366;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;color:white;flex-shrink:0;
}

/* COMMUNITY CENTER / ORGS */
.orgs-sec{
  padding:100px 56px;
  background:linear-gradient(145deg,#100604,#1e0b06,#140806);
  position:relative;overflow:hidden;
  text-align:center;
}
.orgs-sec::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 60% at 50% -10%,rgba(240,81,106,.12),transparent),
    radial-gradient(ellipse 40% 50% at 10% 80%,rgba(245,194,48,.06),transparent),
    radial-gradient(ellipse 50% 40% at 90% 90%,rgba(131,58,180,.08),transparent);
}
/* subtle dot grid */
.orgs-sec::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,203,184,.04) 1px,transparent 1px);
  background-size:28px 28px;
}
.orgs-label{
  font-size:11px;font-weight:700;color:rgba(240,81,106,.7);
  letter-spacing:3px;text-transform:uppercase;
  display:flex;align-items:center;justify-content:center;gap:10px;
  margin-bottom:20px;position:relative;z-index:1;
}
.orgs-label::before,.orgs-label::after{content:'';width:28px;height:1.5px;background:rgba(240,81,106,.35);border-radius:2px}
.orgs-h2{
  font-size:clamp(28px,3.8vw,52px);font-weight:900;
  color:white;letter-spacing:-2px;line-height:1.07;
  margin-bottom:16px;position:relative;z-index:1;
}
.orgs-h2 .orgs-ac{
  background:linear-gradient(90deg,var(--pink),var(--gold));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
}
.orgs-sub{
  font-size:16.5px;color:rgba(255,255,255,.52);
  font-weight:300;max-width:560px;margin:0 auto 56px;
  line-height:1.9;letter-spacing:.01em;position:relative;z-index:1;
}
/* Audience tiles */
.orgs-tiles{
  display:flex;justify-content:center;gap:14px;
  flex-wrap:wrap;margin-bottom:52px;
  position:relative;z-index:1;
}
.orgs-tile{
  display:flex;align-items:center;gap:10px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  border-radius:50px;padding:13px 24px;
  color:rgba(255,255,255,.78);font-size:14px;font-weight:600;letter-spacing:.01em;
  backdrop-filter:blur(12px) saturate(1.2);-webkit-backdrop-filter:blur(12px) saturate(1.2);
  transition:all .38s var(--ease);cursor:default;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12);
}
.orgs-tile:hover{
  background:rgba(240,81,106,.14);
  border-color:rgba(240,81,106,.28);
  color:white;transform:translateY(-3px);
  box-shadow:0 10px 32px rgba(240,81,106,.18),inset 0 1px 0 rgba(255,255,255,.2);
}
.orgs-tile-emoji{font-size:18px}

/* Feature grid */
.orgs-features{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:20px;max-width:820px;margin:0 auto 52px;
  position:relative;z-index:1;
}
.orgs-feat{
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);
  border-radius:20px;padding:28px 22px;
  text-align:center;
  backdrop-filter:blur(12px) saturate(1.2);-webkit-backdrop-filter:blur(12px) saturate(1.2);
  transition:background .35s,border-color .35s,transform .4s var(--ease),box-shadow .35s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12);
}
.orgs-feat:hover{
  background:rgba(255,255,255,.09);
  border-color:rgba(255,255,255,.2);
  transform:translateY(-6px);
  box-shadow:0 12px 36px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.18);
}
.orgs-feat-icon{font-size:28px;margin-bottom:10px;display:block}
.orgs-feat-title{font-size:14px;font-weight:800;color:white;margin-bottom:5px}
.orgs-feat-desc{font-size:12.5px;color:rgba(255,255,255,.42);line-height:1.6}

/* CTAs */
.orgs-ctas{
  display:flex;align-items:center;justify-content:center;gap:14px;
  flex-wrap:wrap;position:relative;z-index:1;
}
.orgs-btn-wa{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#25D366,#1DA851);
  color:white;font-size:15px;font-weight:800;
  padding:16px 36px;border-radius:50px;
  text-decoration:none;cursor:none;
  box-shadow:0 6px 28px rgba(37,211,102,.35);
  transition:all .35s var(--ease);
}
.orgs-btn-wa:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 14px 44px rgba(37,211,102,.5)}
.orgs-btn-ghost{
  display:inline-flex;align-items:center;gap:8px;
  border:1.5px solid rgba(255,255,255,.25);
  color:rgba(255,255,255,.75);font-size:14px;font-weight:600;
  padding:15px 28px;border-radius:50px;
  text-decoration:none;cursor:none;
  transition:all .3s var(--ease);
  backdrop-filter:blur(8px);
}
.orgs-btn-ghost:hover{
  border-color:rgba(255,255,255,.5);color:white;
  background:rgba(255,255,255,.06);
  transform:translateY(-2px);
}

/* HOW */
.how-sec{
  padding:120px 56px;background:white;
  background-image:radial-gradient(ellipse 60% 40% at 50% 100%,rgba(255,232,214,.35),transparent);
}
.how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:56px;position:relative}
.how-line{position:absolute;top:28px;right:calc(12.5% + 28px);width:calc(75% - 56px);height:1.5px;background:linear-gradient(90deg,var(--pink3),rgba(255,184,198,.1))}
.how-step{text-align:center;position:relative;z-index:1}
.how-num{
  width:58px;height:58px;border-radius:50%;
  background:linear-gradient(135deg,var(--pink),var(--pink2));
  color:white;font-size:20px;font-weight:900;
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 18px;
  box-shadow:0 4px 16px rgba(240,81,106,.28),inset 0 1px 0 rgba(255,255,255,.25);
  transition:transform .35s var(--ease),box-shadow .35s;
}
.how-step:hover .how-num{
  transform:scale(1.14);
  box-shadow:0 10px 36px rgba(240,81,106,.42),inset 0 1px 0 rgba(255,255,255,.3);
}
.how-step h3{font-size:14.5px;font-weight:800;color:var(--brown);margin-bottom:8px;letter-spacing:-.2px}
.how-step p{font-size:13px;color:var(--muted);line-height:1.85;letter-spacing:.01em}

/* FAQ */
.faq-sec{
  padding:120px 56px;
  background:var(--warm);
  background-image:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(255,255,255,.6),transparent);
}
.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:960px;margin:0 auto}
.faq-row{
  background:rgba(255,255,255,.9);
  border-radius:var(--r);
  border:1px solid rgba(240,81,106,.07);
  overflow:hidden;
  transition:border-color .3s,box-shadow .3s,background .3s;
  box-shadow:0 1px 3px rgba(0,0,0,.04);
}
.faq-row:hover{
  background:rgba(255,255,255,.98);
  border-color:rgba(240,81,106,.12);
  box-shadow:0 2px 8px rgba(0,0,0,.06),0 0 0 1px rgba(240,81,106,.08);
}
.faq-row.open{
  border-color:var(--pink3);
  box-shadow:0 4px 20px rgba(240,81,106,.1),0 1px 3px rgba(0,0,0,.04);
  background:white;
}
.faq-q{font-size:14px;font-weight:700;color:var(--brown);padding:18px 22px;cursor:none;display:flex;align-items:center;justify-content:space-between;gap:12px;user-select:none;transition:color .2s}
.faq-q:hover{color:var(--pink)}
.faq-arr{font-size:11px;color:var(--pink);transition:transform .3s var(--ease);flex-shrink:0}
.faq-row.open .faq-arr{transform:rotate(180deg)}
.faq-a{font-size:13.5px;color:var(--muted);line-height:1.8;padding:0 22px;max-height:0;overflow:hidden;transition:max-height .4s var(--ease),padding .3s}
.faq-row.open .faq-a{max-height:200px;padding:0 22px 18px}

/* CTA */
.cta-sec{
  padding:120px 56px;text-align:center;
  background:linear-gradient(145deg,#F0516A,#F97B93 60%,#FFCFB3);
  position:relative;overflow:hidden;
}
.cta-sec::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse at 50% -20%,rgba(255,255,255,.24) 0%,transparent 55%),
    radial-gradient(ellipse at 80% 120%,rgba(245,194,48,.12) 0%,transparent 50%);
}
.cta-h2{font-size:clamp(28px,3.5vw,52px);font-weight:900;color:white;letter-spacing:-1.5px;margin-bottom:12px;position:relative}
.cta-sub{font-size:16px;color:rgba(255,255,255,.82);margin-bottom:36px;position:relative}
.cta-spots{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:36px;position:relative}
.spot{width:46px;height:46px;border-radius:11px;display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(255,255,255,.3);font-size:16px;transition:all .3s}
.spot.taken{background:rgba(255,255,255,.2);color:rgba(255,255,255,.5)}
.spot.taken::after{content:'✓'}
.spot.me{background:white;color:var(--pink);font-size:11px;font-weight:700;animation:me-pulse 2s ease-in-out infinite}
@keyframes me-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.spot.free{background:rgba(255,255,255,.08);color:rgba(255,255,255,.35)}
.spot.free::after{content:'?'}
.btn-cta-white{display:inline-flex;align-items:center;gap:10px;background:white;color:var(--pink);padding:16px 38px;border-radius:50px;font-size:16px;font-weight:800;text-decoration:none;cursor:none;box-shadow:0 8px 32px rgba(0,0,0,.2);transition:all .3s;position:relative}
.btn-cta-white:hover{transform:translateY(-3px);box-shadow:0 14px 44px rgba(0,0,0,.28)}

/* URGENCY — badges & notes */
.urgency-badge{display:inline-flex;align-items:center;gap:4px;background:linear-gradient(135deg,var(--pink),#FF6B35);color:white;font-size:9.5px;font-weight:800;padding:4px 10px;border-radius:50px;position:absolute;top:14px;left:16px;z-index:5;letter-spacing:.5px;animation:me-pulse 2.4s ease-in-out infinite;pointer-events:none}
.urgency-note{font-size:11.5px;color:var(--pink);font-weight:700;display:flex;align-items:center;gap:6px;letter-spacing:.1px;line-height:1.4;position:absolute;bottom:16px;right:36px;left:36px}
.urgency-dot{width:7px;height:7px;border-radius:50%;background:var(--pink);flex-shrink:0;animation:me-pulse 1.7s ease-in-out infinite}
.srv-urgency-line{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);font-weight:600;margin-top:auto;padding-top:10px;border-top:1px solid rgba(240,81,106,.08)}

/* SKIP LINK — נגישות */
.skip-link{
  position:absolute;top:-999px;left:50%;transform:translateX(-50%);
  background:var(--brown);color:white;padding:10px 24px;
  border-radius:0 0 8px 8px;font-size:14px;font-weight:700;
  z-index:9999;text-decoration:none;
}
.skip-link:focus{top:0}
/* FOCUS — נגישות מקלדת */
:focus-visible{outline:3px solid var(--pink);outline-offset:3px;border-radius:3px}
/* FOOTER */
footer{background:var(--brown);color:rgba(255,255,255,.45);padding:60px 56px 32px}
.footer-logo-img{
  display:block;
  width:clamp(160px,18vw,240px);
  height:auto;
  margin-bottom:20px;
  filter:drop-shadow(0 4px 16px rgba(240,81,106,.3)) brightness(1.1);
  transition:transform .3s var(--ease),filter .3s;
}
.footer-logo-img:hover{transform:scale(1.04);filter:drop-shadow(0 8px 28px rgba(240,81,106,.45)) brightness(1.15)}
.footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:40px;margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,.07);padding-bottom:40px}
.f-brand p{font-size:12.5px;line-height:1.85}
.f-col h5{font-size:12px;font-weight:700;color:white;margin-bottom:14px}
.f-col ul{list-style:none}
.f-col li{margin-bottom:8px}
.f-col a{color:rgba(255,255,255,.42);text-decoration:none;font-size:12.5px;transition:color .2s}
.f-col a:hover{color:white}
.f-contact a{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.42);text-decoration:none;font-size:12.5px;margin-bottom:10px;transition:color .2s}
.f-contact a:hover{color:white}
.footer-bottom{display:flex;align-items:center;justify-content:center;font-size:11.5px;gap:6px;color:rgba(255,255,255,.25)}

/* REVEAL */
.rv{opacity:0;transform:translateY(52px);transition:opacity .95s var(--ease),transform .95s var(--ease)}
.rv-l{opacity:0;transform:translateX(-64px);transition:opacity .95s var(--ease),transform .95s var(--ease)}
.rv-r{opacity:0;transform:translateX(64px);transition:opacity .95s var(--ease),transform .95s var(--ease)}
.rv-scale{opacity:0;transform:scale(.84);transition:opacity .95s var(--ease),transform .95s var(--ease)}
.rv-up{opacity:0;transform:translateY(76px);transition:opacity 1.05s var(--ease),transform 1.05s var(--ease)}
.rv.in,.rv-l.in,.rv-r.in,.rv-up.in{opacity:1;transform:translate(0)}
.rv-scale.in{opacity:1;transform:scale(1)}
/* Active nav link */
.nav-center a.nav-active{color:var(--brown)}
.nav-center a.nav-active::after{transform:scaleX(1)!important;transform-origin:left!important}

/* SCROLLBAR */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--pink3);border-radius:2px}
::-webkit-scrollbar-thumb:hover{background:var(--pink)}

/* ══════════════════════════════════════════════════
   ACCESSIBILITY LAYER — WCAG 2.1 AA + חוק ישראלי
══════════════════════════════════════════════════ */

/* Screen-reader only utility */
.sr-only{
  position:absolute;width:1px;height:1px;
  padding:0;margin:-1px;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;
  border:0;pointer-events:none;
}

/* Skip link — smooth reveal */
.skip-link{transition:top .15s var(--ease);white-space:nowrap}

/* ── FOCUS STATES ─────────────────────────────────
   Custom branded focus ring on all interactive elements */
*:focus{outline:none}
*:focus-visible{
  outline:3px solid var(--pink);
  outline-offset:4px;
  border-radius:4px;
  box-shadow:0 0 0 6px rgba(240,81,106,.15);
}
/* Focus on dark backgrounds — gold ring */
.ig-card-feat:focus-visible,
.ig-card-sq:focus-visible,
.ig-card-wide:focus-visible,
.ig-cta-link:focus-visible,
.ig-follow-btn:focus-visible,
footer a:focus-visible{
  outline-color:var(--gold);
  box-shadow:0 0 0 6px rgba(245,194,48,.22);
}
/* Focus on coloured CTA buttons — white ring */
.btn-wa-hero:focus-visible,
.btn-cta-white:focus-visible,
.srv-cta:focus-visible{
  outline:3px solid rgba(255,255,255,.95);
  outline-offset:3px;
  box-shadow:0 0 0 6px rgba(255,255,255,.3);
}
/* Nav icon focus — circular */
.nav-wa:focus-visible,.nav-ig:focus-visible{
  outline:3px solid var(--pink);
  outline-offset:3px;
  border-radius:50%;
  box-shadow:0 0 0 5px rgba(240,81,106,.12);
}
/* Ghost button */
.btn-ghost-lg:focus-visible{
  outline:3px solid var(--pink);
  outline-offset:3px;
  box-shadow:0 0 0 6px rgba(240,81,106,.12);
}
/* FAQ accordion button — inset ring */
.faq-q:focus-visible{
  outline:3px solid var(--pink);
  outline-offset:-2px;
  border-radius:var(--r) var(--r) 0 0;
  box-shadow:none;
}
/* Nav links */
.nav-center a:focus-visible{
  outline:2px solid var(--pink);
  outline-offset:3px;
  border-radius:4px;
}

/* ── BUTTON ELEMENT RESET for .faq-q ───────────── */
.faq-q{
  background:transparent;
  border:none;
  width:100%;
  text-align:right;
  font-family:'Heebo',sans-serif;
}

/* ── MINIMUM TOUCH TARGETS (44×44px) ────────────── */
.nav-wa,.nav-ig{min-width:44px!important;min-height:44px!important}
.faq-q{min-height:52px}
.srv-cta{min-height:44px}
.btn-wa-hero,.btn-ghost-lg,.btn-cta-white{min-height:44px}
.gallery-ig-link{padding:10px 4px;min-height:44px}

/* ── NAV CENTER AS SEMANTIC LIST ────────────────── */
.nav-center{list-style:none}
.nav-center li{display:flex}

/* ── HEADING HIERARCHY ────────────────────────────
   how-step: was h4 (skipped h3), now h3             */
.how-step h3{font-size:14px;font-weight:800;color:var(--brown);margin-bottom:8px}
/* footer columns: was h5, now h3 */
.f-col h3,.f-col h5{font-size:12px;font-weight:700;color:white;margin-bottom:14px}

/* ── COLOR CONTRAST FIXES ─────────────────────────
   All fixes preserve the visual design language.    */
/* about-cert badge: #C4A898 on white = 2.1:1 FAILS → use --muted */
.about-cert-sub,.about-cert-yearlabel{color:var(--muted)!important}
/* CTA: darken gradient so white text reaches 4.5:1 */
.cta-sec{background:linear-gradient(145deg,#C43058,#D84070)!important}
.cta-sub{color:rgba(255,255,255,.96)}
/* footer: rgba(255,255,255,.42) on #1C0A04 = 4.3:1 FAILS → .62 */
.f-col a,.f-contact a,.f-brand p{color:rgba(255,255,255,.65)!important}
.footer-bottom{color:rgba(255,255,255,.6)!important}
/* WA status: rgba(255,255,255,.65) on #075E54 = 3.85:1 FAILS → .9 */
.t-wa-status{color:rgba(255,255,255,.92)!important}
/* gallery sub-text */
.gallery-sub{color:rgba(255,255,255,.82)}
.gallery-ig-link{color:rgba(255,255,255,.82)}

/* ── PREFERS-REDUCED-MOTION ───────────────────────
   Respect OS accessibility setting. No animations
   are removed — they're just suspended.            */
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto!important}
  *,*::before,*::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
    transition-delay:0ms!important;
    scroll-behavior:auto!important;
  }
  /* hide custom cursor — OS cursor takes over */
  #cur,#cur-ring{display:none!important}
  /* reveal elements immediately — no slide-in */
  .rv,.rv-l,.rv-r,.rv-up,.rv-scale{
    opacity:1!important;
    transform:none!important;
    transition:none!important;
  }
  .rv.in,.rv-l.in,.rv-r.in,.rv-up.in,.rv-scale.in{
    opacity:1!important;transform:none!important;
  }
  /* stop marquee */
  .mq-track{animation:none!important}
  /* logo + hero animations off */
  .logo-img-hero,.about-img-frame,.btn-wa-hero,
  .ldr-logo,.ph-glow,.bb1,.bb2,.bb3{animation:none!important}
  /* phone — no 3D tilt */
  .ph-3d,.ph-3d:hover{
    transform:rotateY(-8deg) rotateX(2deg)!important;
    transition:none!important;
  }
}

/* ── MOBILE TOUCH TARGETS ─────────────────────── */
@media(max-width:768px){
  .nav-wa,.nav-ig{min-width:48px!important;min-height:48px!important}
  .faq-q{min-height:56px;padding:16px 18px}
  .btn-wa-hero,.btn-cta-white,.srv-cta{min-height:48px}
}

/* ══ ACCESSIBILITY WIDGET ══ */
#a11y-btn{
  position:fixed;bottom:28px;left:28px;z-index:9000;
  width:54px;height:54px;border-radius:50%;
  background:#1e1e30;color:white;
  border:3px solid rgba(255,255,255,.18);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 4px 24px rgba(0,0,0,.5),0 2px 8px rgba(0,0,0,.25);
  transition:transform .2s,border-color .2s;
  font-size:22px;line-height:1;
}
#a11y-btn:hover{transform:scale(1.1);border-color:rgba(255,255,255,.4)}
#a11y-btn:focus-visible{outline:3px solid var(--pink);outline-offset:3px}
#a11y-panel{
  position:fixed;bottom:92px;left:28px;z-index:8999;
  background:#1e1e30;border-radius:18px;
  padding:14px 14px 12px;
  box-shadow:0 24px 64px rgba(0,0,0,.55),0 4px 16px rgba(0,0,0,.3);
  width:392px;opacity:0;pointer-events:none;
  transform:translateY(14px) scale(.96);
  transition:opacity .22s,transform .22s;
  border:1px solid rgba(255,255,255,.08);
  direction:rtl;color:white;
}
#a11y-panel.open{opacity:1;pointer-events:all;transform:none}
.a11y-head{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:12px;padding-bottom:10px;
  border-bottom:1px solid rgba(255,255,255,.1);
}
.a11y-title{font-size:13px;font-weight:800;color:white;font-family:'Heebo',sans-serif;letter-spacing:.3px}
.a11y-close-x{
  width:24px;height:24px;border-radius:50%;
  border:1px solid rgba(255,255,255,.2);
  background:rgba(255,255,255,.08);color:rgba(255,255,255,.8);
  font-size:12px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:background .15s;padding:0;font-family:monospace;
}
.a11y-close-x:hover{background:rgba(255,255,255,.22)}
.a11y-close-x:focus-visible{outline:2px solid var(--pink);outline-offset:2px}
.a11y-grid{
  display:grid;grid-template-columns:repeat(6,1fr);gap:6px;
  margin-bottom:12px;
}
.a11y-tile{
  border-radius:10px;border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.07);color:white;
  cursor:pointer;padding:7px 3px;
  display:flex;flex-direction:column;align-items:center;gap:3px;
  transition:background .15s,transform .1s,border-color .15s;
  min-height:52px;
}
.a11y-tile:hover{background:rgba(255,255,255,.17);border-color:rgba(255,255,255,.22);transform:scale(1.06)}
.a11y-tile.on{background:rgba(240,81,106,.75);border-color:rgba(240,81,106,.95)}
.a11y-tile:focus-visible{outline:2px solid var(--pink);outline-offset:2px}
.a11y-code{font-size:12px;font-weight:800;font-family:monospace;line-height:1;color:white}
.a11y-lbl{font-size:8.5px;font-weight:600;color:rgba(255,255,255,.7);font-family:'Heebo',sans-serif;text-align:center;line-height:1.3}
.a11y-foot{border-top:1px solid rgba(255,255,255,.1);padding-top:10px}
.a11y-decl{
  display:block;width:100%;text-align:center;
  color:rgba(255,255,255,.5);font-size:11px;
  text-decoration:underline;margin-bottom:10px;
  font-family:'Heebo',sans-serif;cursor:pointer;
  background:none;border:none;padding:0;transition:color .15s;
}
.a11y-decl:hover{color:rgba(255,255,255,.9)}
.a11y-acts{display:flex;justify-content:space-between;gap:4px}
.a11y-act{
  background:none;border:none;color:rgba(255,255,255,.45);
  font-size:10.5px;cursor:pointer;font-family:'Heebo',sans-serif;
  padding:0;transition:color .15s;
}
.a11y-act:hover{color:rgba(255,255,255,.9)}
.a11y-act:focus-visible{outline:2px solid var(--pink);outline-offset:2px}
/* body effect classes */
body.a11y-sepia{filter:sepia(.85)}
body.a11y-bw{filter:grayscale(1)}
body.a11y-invert{filter:invert(1) hue-rotate(180deg)}
body.a11y-by{filter:grayscale(1) invert(1) sepia(1) saturate(10) hue-rotate(18deg)}
body.a11y-hc{filter:contrast(2) brightness(.9)}
body.a11y-no-anim *,body.a11y-no-anim *::before,body.a11y-no-anim *::after{animation:none!important;transition:none!important}
body.a11y-blink *{animation-play-state:paused!important}
body.a11y-spc{letter-spacing:.1em!important;word-spacing:.22em!important;line-height:1.85!important}
body.a11y-font,body.a11y-font *{font-family:Arial,Helvetica,sans-serif!important}
body.a11y-links a:not(.nav-logo):not(.btn-wa-hero):not(.btn-cta-white):not(.srv-cta){
  text-decoration:underline!important;text-underline-offset:3px;
  outline:1px dashed currentColor!important;outline-offset:2px;
}
body.a11y-h1 h1,body.a11y-h1 h2,body.a11y-h1 h3,body.a11y-h1 h4,body.a11y-h1 h5{
  outline:2px solid #F5C230!important;outline-offset:4px;
}
body.a11y-big-cursor,body.a11y-big-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M6 4 L6 32 L13 25 L17 36 L21 34 L17 23 L26 23 Z' fill='white' stroke='black' stroke-width='2'/%3E%3C/svg%3E") 6 4,auto!important}
body.a11y-cursor-black,body.a11y-cursor-black *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M6 4 L6 32 L13 25 L17 36 L21 34 L17 23 L26 23 Z' fill='black' stroke='white' stroke-width='2'/%3E%3C/svg%3E") 6 4,auto!important}
@media(max-width:768px){
  #a11y-btn{bottom:20px;left:16px;width:48px;height:48px}
  #a11y-panel{left:12px;bottom:80px;width:calc(100vw - 24px);max-width:392px}
  .a11y-grid{grid-template-columns:repeat(4,1fr)}
}

/* ═══════════════════════════════════════════════════════════
   MOBILE RESPONSIVE — ALL RULES BELOW ARE INSIDE @MEDIA
   Desktop version is untouched. Mobile-only layer.
═══════════════════════════════════════════════════════════ */

/* ── NEW ELEMENTS (hamburger + mobile menu) — hidden on desktop ── */
#mob-menu-btn{
  display:none; /* revealed in @media */
  flex-direction:column;align-items:center;justify-content:center;gap:5.5px;
  width:44px;height:44px;min-width:44px;min-height:44px;
  background:none;border:none;cursor:pointer;
  padding:8px;border-radius:8px;
  transition:background .2s;
  -webkit-tap-highlight-color:transparent;
  flex-shrink:0;
}
#mob-menu-btn:active{background:rgba(28,10,4,.07)}
#mob-menu-btn:focus-visible{outline:3px solid var(--pink);outline-offset:3px;border-radius:8px}
.ham-line{
  display:block;width:22px;height:2px;
  background:var(--brown);border-radius:2px;
  transition:transform .35s var(--ease),opacity .25s,width .25s;
  transform-origin:center;
}
#mob-menu-btn.open .ham-line:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
#mob-menu-btn.open .ham-line:nth-child(2){opacity:0;transform:scaleX(0)}
#mob-menu-btn.open .ham-line:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}

/* Mobile fullscreen menu */
#mob-menu{
  display:none; /* revealed in @media */
  position:fixed;inset:0;z-index:198;
  background:rgba(255,251,248,.97);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  flex-direction:column;align-items:center;justify-content:center;
  opacity:0;pointer-events:none;
  transform:scale(.97) translateY(-8px);
  transition:opacity .32s var(--ease),transform .32s var(--ease);
  overflow:hidden;
}
#mob-menu.open{opacity:1;pointer-events:all;transform:scale(1) translateY(0)}
.mob-nav-inner{
  display:flex;flex-direction:column;align-items:center;
  gap:2px;width:100%;padding:0 32px;
}
.mob-link{
  display:block;
  font-size:clamp(30px,9vw,52px);
  font-weight:900;
  color:var(--brown);
  text-decoration:none;
  letter-spacing:-1.5px;
  line-height:1.18;
  padding:10px 0;
  text-align:center;
  width:100%;
  position:relative;
  transition:color .2s;
  -webkit-tap-highlight-color:transparent;
}
.mob-link::after{
  content:'';
  position:absolute;bottom:6px;right:0;left:0;height:2px;
  background:linear-gradient(90deg,var(--pink),var(--gold));
  transform:scaleX(0);border-radius:2px;
  transition:transform .3s var(--ease);
}
.mob-link:hover{color:var(--pink)}
.mob-link:hover::after{transform:scaleX(1)}
.mob-link:focus-visible{outline:3px solid var(--pink);outline-offset:4px;border-radius:4px}
.mob-nav-ctas{
  margin-top:28px;
  width:100%;max-width:280px;
}
.mob-nav-ctas .btn-wa-hero{
  width:100%;justify-content:center;font-size:14px;padding:14px 24px;
}
.mob-nav-icons{
  display:flex;gap:24px;margin-top:24px;align-items:center;
}
.mob-nav-icons a{opacity:.55;transition:opacity .2s;-webkit-tap-highlight-color:transparent}
.mob-nav-icons a:hover{opacity:1}
/* decorative blobs inside mobile menu */
.mob-blob1,.mob-blob2{
  position:absolute;border-radius:50%;pointer-events:none;
  filter:blur(60px);z-index:-1;
}
.mob-blob1{width:300px;height:300px;background:radial-gradient(circle,rgba(255,203,184,.45),transparent 70%);top:-60px;right:-60px}
.mob-blob2{width:250px;height:250px;background:radial-gradient(circle,rgba(240,81,106,.08),transparent 70%);bottom:-40px;left:-40px}

/* ── TABLET (≤1024px) ─────────────────────────────── */
@media(max-width:1024px){
  #nav{padding:0 28px}
  .trust-strip{padding:28px 32px;gap:0}
  .trust-item{padding:0 24px}
  .hero-cin{height:88svh;min-height:520px}
  .cin-logo-img{width:clamp(200px,34vw,480px)}
  .about-sec{padding:80px 32px;gap:48px}
  .about-img-frame{width:300px;height:380px}
  .services-sec{padding:80px 32px}
  .srv-grid{grid-template-columns:repeat(2,1fr);gap:18px}
  .gallery-sec{padding:80px 0}
  .gallery-hd{padding:0 32px 36px}
  .ig-bento{padding:0 32px;gap:4px}
  .ig-profile-bar{padding:0 32px;margin-bottom:28px}
  .ig-cta-row{padding:0 32px}
  .orgs-sec{padding:80px 32px}
  .orgs-features{grid-template-columns:repeat(3,1fr);gap:14px}
  .how-sec{padding:80px 32px}
  .faq-sec{padding:80px 32px}
  .faq-grid{gap:10px}
  .cta-sec{padding:80px 32px}
  footer{padding:48px 32px 28px}
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
}

/* ── MOBILE (≤768px) ─────────────────────────────── */
@media(max-width:768px){
  /* ── Global ── */
  body{cursor:auto;-webkit-text-size-adjust:100%}
  *{cursor:auto!important}       /* override all cursor:none from desktop */
  #cur,#cur-ring{display:none!important}

  /* ── Show mobile-only elements ── */
  #mob-menu-btn{display:flex}
  #mob-menu{display:flex}

  /* ── Nav ── */
  #nav{padding:0 18px;height:56px}
  .nav-center{display:none!important}
  #bottom-dock{display:none!important}
  .nav-logo-img{height:30px}
  .nav-right{gap:4px}
  .nav-wa,.nav-ig{width:36px;height:36px}
  .nav-wa-pill{font-size:11px;padding:8px 13px 8px 10px}

  /* ── Trust strip: mobile ── */
  .trust-strip{padding:24px 16px;gap:0;flex-wrap:wrap}
  .trust-item{padding:12px 18px}
  .trust-num{font-size:clamp(22px,6vw,28px)}

  /* ── Hero-cin: mobile ── */
  .hero-cin{height:88svh;min-height:500px}
  .cin-logo-img{width:clamp(180px,58vw,340px)}
  .hero-sub{font-size:14px;margin-bottom:20px}
  .hero-ctas{gap:10px;max-width:100%}
  .hero-ctas .btn-wa-hero{font-size:14px;padding:13px 22px}
  .btn-ghost-dark{font-size:13px;padding:11px 20px}
  .cin-sides{padding:0 24px;bottom:24px}
  .marquee-section{margin:0 14px;border-radius:12px}

  /* ── About: stack photo → cert → text ── */
  .about-sec{
    grid-template-columns:1fr;
    padding:64px 24px 80px;
    gap:36px;
  }
  /* KEY FIX: make visual wrap a column so cert appears below image */
  .about-visual-wrap{
    flex-direction:column;
    align-items:center;
    gap:0;
  }
  .about-img-frame{
    width:min(250px,70vw);
    height:310px;
    margin:0 auto;
    animation:none;          /* skip float on mobile */
  }
  /* cert badge: pull out of absolute into normal flow */
  .about-cert{
    position:relative;       /* not absolute */
    bottom:auto;left:auto;
    transform:none;
    margin:20px auto 0;
    min-width:unset;
    width:min(290px,86vw);
    border-radius:12px;
    padding:14px 20px;
    gap:12px;
  }
  .about-cert-icon{width:36px;height:36px;font-size:18px}
  .about-cert-year{font-size:18px}
  /* text content */
  .sec-label{justify-content:flex-start}
  .about-h2{font-size:clamp(26px,7vw,36px);letter-spacing:-1px;margin-bottom:16px}
  .about-body{font-size:14.5px;line-height:1.85;margin-bottom:14px}

  /* ── Services: single column ── */
  .services-sec{padding:64px 24px}
  .sec-header{margin-bottom:36px;padding:0}
  .srv-grid{grid-template-columns:1fr;gap:14px}
  .srv-card{padding:28px 24px}
  .srv-icon{font-size:36px;margin-bottom:14px}
  .srv-h3{font-size:20px}

  /* ── Gallery: compact bento on mobile ── */
  .gallery-sec{padding:64px 0}
  .gallery-hd{padding:0 24px 32px}
  .gallery-h2{font-size:clamp(26px,7.5vw,38px)}
  .ig-profile-bar{
    padding:0 20px;margin-bottom:24px;gap:14px;
    flex-wrap:wrap;
  }
  .ig-profile-avatar{width:56px;height:56px}
  .ig-handle{font-size:14px}
  .ig-stats-row{gap:14px}
  .ig-stat-n{font-size:12px}
  .ig-follow-btn{padding:9px 18px;font-size:12px}
  /* Stack bento: single column on mobile */
  .ig-bento{
    grid-template-columns:1fr 1fr;
    grid-template-rows:auto;
    padding:0 16px;gap:4px;
    max-width:100%;
  }
  .ig-card-feat{grid-column:1/3;grid-row:auto;aspect-ratio:16/9}
  .ig-card-sq{aspect-ratio:1/1}
  .ig-card-wide{grid-column:1/3;aspect-ratio:16/7}
  /* No hover animations on touch */
  .ig-card-feat:hover,.ig-card-sq:hover,.ig-card-wide:hover{
    transform:none!important;animation-play-state:running!important;
  }
  .ig-card-feat:hover .ig-media-video,.ig-card-sq:hover .ig-media-video,
  .ig-card-feat:hover .ig-media,.ig-card-sq:hover .ig-media{
    transform:none!important;filter:none!important;
  }
  .ig-hover-overlay{display:none}
  .ig-cta-row{padding:0 24px;margin-top:28px}
  /* orgs section */
  .orgs-sec{padding:64px 24px}
  .orgs-h2{font-size:clamp(26px,7vw,38px)}
  .orgs-tiles{gap:10px}
  .orgs-tile{padding:10px 16px;font-size:13px}
  .orgs-features{grid-template-columns:1fr;gap:12px}
  .orgs-ctas{flex-direction:column;align-items:center;gap:12px}
  .orgs-btn-wa,.orgs-btn-ghost{width:100%;max-width:320px;justify-content:center}

  /* ── Testimonials ── */
  .testimonials-sec{padding:64px 0}
  .t-header{padding:0 24px;margin-bottom:36px}
  .t-track{animation-duration:52s}
  .t-track-2{animation-duration:62s}
  .t-card{width:256px;border-radius:24px}
  .t-card:hover{transform:rotate(0deg) translateY(-4px) scale(1.01)!important}

  /* ── How it works: 2×2 grid ── */
  .how-sec{padding:64px 24px}
  .how-steps{
    grid-template-columns:repeat(2,1fr);
    gap:32px;margin-top:40px;
  }
  .how-line{display:none}
  .how-num{width:48px;height:48px;font-size:18px;margin-bottom:12px}
  .how-step h3,.how-step h4{font-size:13px}
  .how-step p{font-size:12px}

  /* ── FAQ: single column ── */
  .faq-sec{padding:64px 24px}
  .faq-grid{grid-template-columns:1fr;gap:8px;max-width:100%}
  .faq-q{font-size:14px;padding:18px 20px}

  /* ── CTA ── */
  .cta-sec{padding:64px 24px}
  .cta-h2{font-size:clamp(26px,7.5vw,40px);letter-spacing:-.5px}
  .cta-sub{font-size:14px}
  .cta-spots{gap:6px;margin-bottom:28px}
  .spot{width:40px;height:40px;border-radius:9px;font-size:14px}
  .btn-cta-white{
    width:100%;max-width:340px;
    justify-content:center;font-size:15px;
  }

  /* ── Footer ── */
  footer{padding:52px 24px 28px}
  .footer-grid{grid-template-columns:1fr;gap:28px}
  .footer-logo-img{width:clamp(130px,36vw,180px);margin-bottom:12px}
  .f-brand p{font-size:12px}
  .footer-bottom{font-size:11px;flex-wrap:wrap;justify-content:center;gap:4px}

  /* ── Marquee banner ── */
  .marquee-section{padding:14px 0}

  /* ── Reveal animations — lighter on mobile ── */
  .rv{transition:opacity .5s var(--ease),transform .5s var(--ease)}
  .rv-l{transition:opacity .5s var(--ease),transform .5s var(--ease)}
  .rv-r{transition:opacity .5s var(--ease),transform .5s var(--ease)}
}

/* ── SMALL MOBILE (≤480px) ─────────────────────── */
@media(max-width:480px){
  #nav{padding:0 14px;height:52px}
  .nav-logo-img{height:26px}
  .nav-wa-pill{font-size:10px;padding:7px 12px 7px 10px}

  .cin-logo-img{width:clamp(160px,62vw,300px)}
  .hero-content{bottom:72px}
  .hero-sub{font-size:13px}
  .hero-ctas{max-width:100%}
  .float-wa{width:50px;height:50px;bottom:18px;right:18px}

  .about-sec{padding:52px 16px 68px}
  .about-img-frame{width:min(220px,72vw);height:280px}
  .about-cert{width:min(270px,88vw);padding:12px 16px}

  .services-sec{padding:52px 16px}
  .srv-card{padding:24px 18px}
  .srv-h3{font-size:18px}

  .gallery-sec{padding:52px 0}
  .gallery-hd{padding:0 16px 24px}
  .ig-bento{padding:0 12px;gap:3px}
  .ig-profile-bar{padding:0 16px}
  .ig-cta-row{padding:0 16px}
  .orgs-sec{padding:52px 16px}
  .orgs-tile{padding:9px 14px;font-size:12px}

  .testimonials-sec{padding:48px 0}
  .t-card{width:240px;border-radius:20px}
  .t-bubble{font-size:12px;padding:6px 9px 3px}

  .how-sec{padding:52px 16px}
  .faq-sec{padding:52px 16px}
  .faq-q{font-size:13px;padding:16px 16px}

  .cta-sec{padding:52px 16px}
  .spot{width:36px;height:36px;border-radius:8px;font-size:13px}

  footer{padding:44px 16px 24px}

  .sec-h2{font-size:clamp(24px,7.5vw,36px)}
  .mob-link{font-size:clamp(28px,9vw,44px);letter-spacing:-1px}
}

/* ══════════════════════════════════════════
   PERFORMANCE OPTIMIZATIONS
   Zero visual change — browser workload only
══════════════════════════════════════════ */

/* Skip rendering off-screen sections until near viewport */
.services-sec,.how-sec,.gallery-sec,.t-sec,.community-sec,.faq-sec,.cta-sec{
  content-visibility:auto;
  contain-intrinsic-size:1px 600px;
}

/* Reduce hero paint area */
.hero-cin{contain:paint}

/* ── Tablet (≤1024px): reduce orb blur cost ── */
@media(max-width:1024px){
  .cin-orb{filter:blur(55px)!important}
  .cin-glow-a{filter:blur(16px)!important}
  .cin-glow-b{filter:blur(10px)!important}
}

/* ── Mobile (≤768px): kill GPU-heavy effects ── */
@media(max-width:768px){
  /* Backdrop-filter is extremely expensive on mobile — replace with solid bg */
  nav{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
  nav.scrolled{background:rgba(254,252,251,.97)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
  .about-img-badge,.about-cert{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;background:rgba(255,255,255,.92)!important}
  .ig-overlay{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;background:rgba(0,0,0,.44)!important}
  #vid-modal{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}

  /* Kill float animations on mobile (not needed, saves GPU) */
  .ig-card-feat,.ig-card-sq{animation:none!important}

  /* Remove will-change on mobile (creates unnecessary compositor layers) */
  .ig-card-feat,.ig-card-sq,.ig-media,.ig-media-video{will-change:auto!important}

  /* Reduce orb blur from 90px to 35px on mobile */
  .cin-orb{filter:blur(35px)!important}
  /* Hide inner glow elements on mobile (invisible difference, saves GPU) */
  .cin-glow-a,.cin-glow-b{display:none!important}

  /* Simplify marquee on mobile */
  .mq-track{animation-duration:48s!important}
}

/* ══════════════════════════════════════════════════════════
   V11 — AWWWARDS POLISH — complete redesign of weak sections
══════════════════════════════════════════════════════════ */

/* ── Global spacing upgrade ── */
.glance-sec{padding:150px 56px 160px!important}
.about-sec{padding:140px 56px!important;background:#FFFDFC!important}
.testimonials-sec{background:#FBF7F4!important}
.t-header{margin-bottom:72px!important}

/* ── HOW — editorial vertical timeline redesign ── */
.how-sec{background:#FEFCFB;padding:0!important;overflow:hidden}
.how-editorial-top{
  padding:140px 56px 80px;
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.15fr;gap:80px;align-items:end;
}
.how-editorial-h2{
  font-size:clamp(52px,7.5vw,108px);font-weight:900;
  line-height:.92;letter-spacing:-4.5px;color:var(--brown);
}
.how-editorial-h2 em{
  font-family:'Bodoni Moda',serif;font-style:italic;
  font-weight:700;color:var(--pink);letter-spacing:-3px;
}
.how-editorial-side{align-self:end;padding-bottom:8px}
.how-editorial-side p{
  font-size:18px;font-weight:300;color:var(--muted);
  line-height:1.9;max-width:380px;letter-spacing:.01em;
}
.how-journey{
  position:relative;max-width:1200px;margin:0 auto;
  padding:0 56px 140px;
}
.how-journey-line{
  position:absolute;top:0;bottom:100px;
  right:calc(56px + 74px);width:1px;
  background:linear-gradient(180deg,rgba(240,81,106,.25),rgba(255,184,198,.04));
  pointer-events:none;
}
.how-journey-step{
  display:grid;grid-template-columns:100px 1fr;
  gap:60px;align-items:start;
  padding:64px 0;
  border-bottom:1px solid rgba(28,10,4,.055);
  position:relative;
  transition:background .4s var(--ease);
}
.how-journey-step:last-child{border-bottom:none}
.how-journey-step::before{
  content:'';position:absolute;right:-56px;left:-56px;top:0;bottom:0;
  background:rgba(255,251,248,.0);transition:background .4s var(--ease);
  pointer-events:none;
}
.how-journey-step:hover::before{background:rgba(255,251,248,.7)}
.how-j-num{
  font-size:72px;font-weight:900;
  color:rgba(240,81,106,.12);line-height:1;
  letter-spacing:-4px;font-variant-numeric:tabular-nums;
  transition:color .45s var(--ease);user-select:none;
  position:relative;z-index:1;
}
.how-journey-step:hover .how-j-num{color:rgba(240,81,106,.32)}
.how-j-body{padding-top:8px;position:relative;z-index:1}
.how-j-body h3{
  font-size:clamp(24px,2.9vw,40px);font-weight:900;
  color:var(--brown);letter-spacing:-1.5px;
  line-height:1.06;margin-bottom:18px;
}
.how-j-body p{
  font-size:17px;color:var(--muted);
  line-height:2.05;font-weight:300;
  max-width:500px;letter-spacing:.01em;
}
.how-j-dot{
  position:absolute;right:calc(56px + 68px);top:68px;
  width:14px;height:14px;border-radius:50%;
  background:white;border:2px solid rgba(240,81,106,.25);
  transform:translateX(50%);z-index:2;
  box-shadow:0 2px 8px rgba(240,81,106,.1);
  transition:border-color .4s,box-shadow .4s,transform .4s var(--ease),background .4s;
}
.how-journey-step:hover .how-j-dot{
  border-color:var(--pink);background:var(--pink4);
  box-shadow:0 4px 16px rgba(240,81,106,.28);
  transform:translateX(50%) scale(1.35);
}

/* ── FAQ — editorial single-column redesign ── */
.faq-sec{background:white;padding:0!important}
.faq-editorial-header{
  padding:140px 56px 80px;max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:end;
}
.faq-editorial-h2{
  font-size:clamp(52px,7vw,100px);font-weight:900;
  line-height:.92;letter-spacing:-4px;color:var(--brown);
}
.faq-editorial-h2 em{
  font-family:'Bodoni Moda',serif;font-style:italic;
  font-weight:700;color:var(--pink);letter-spacing:-2px;
}
.faq-editorial-right p{
  font-size:18px;font-weight:300;color:var(--muted);
  line-height:1.9;max-width:380px;letter-spacing:.01em;align-self:end;
}
.faq-editorial-list{
  max-width:1200px;margin:0 auto;
  padding:0 56px 60px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  border-top:none;
}
.faq-editorial-row{
  background:#fff;
  border-radius:14px;
  border:1.5px solid rgba(240,81,106,.07);
  overflow:hidden;
  position:relative;
  transition:box-shadow .3s,border-color .3s,transform .3s;
  box-shadow:0 2px 10px rgba(28,10,4,.05);
}
.faq-editorial-row::after{ display:none }
.faq-editorial-row:hover{
  border-color:rgba(240,81,106,.18);
  box-shadow:0 8px 32px rgba(240,81,106,.1);
  transform:translateY(-2px);
}
.faq-editorial-row.open{
  border-color:rgba(240,81,106,.22);
  box-shadow:0 10px 40px rgba(240,81,106,.12);
}
.faq-editorial-q{
  width:100%;display:flex;align-items:center;
  justify-content:space-between;gap:16px;
  padding:16px 18px;
  font-size:clamp(13px,1.1vw,15px);font-weight:700;
  color:var(--brown);letter-spacing:-.2px;line-height:1.4;
  text-align:right;background:transparent;border:none;
  cursor:pointer;font-family:'Heebo',sans-serif;
  transition:color .25s;
}
.faq-editorial-q:hover{color:var(--pink)}
.faq-editorial-arrow{
  font-size:10px;color:var(--pink);flex-shrink:0;
  width:28px;height:28px;border-radius:50%;
  border:1.5px solid rgba(240,81,106,.22);
  display:flex;align-items:center;justify-content:center;
  transition:transform .4s var(--ease),border-color .3s,background .3s;
}
.faq-editorial-row.open .faq-editorial-arrow{
  transform:rotate(180deg);
  border-color:var(--pink);background:var(--pink4);
}
.faq-editorial-a{
  font-size:14.5px;color:var(--muted);line-height:1.85;font-weight:300;
  max-height:0;overflow:hidden;padding:0 24px;
  transition:max-height .45s var(--ease),padding .3s;
  letter-spacing:.01em;
}
.faq-editorial-row.open .faq-editorial-a{max-height:240px;padding:0 18px 16px}
.faq-editorial-cta-row{
  max-width:1200px;margin:0 auto;
  padding:8px 56px 100px;
  display:flex;align-items:center;gap:12px;
}
.faq-editorial-cta-link{
  display:inline-flex;align-items:center;gap:8px;
  color:var(--pink);font-size:14px;font-weight:700;
  text-decoration:none;letter-spacing:.02em;
  padding-bottom:2px;
  border-bottom:1px solid rgba(240,81,106,.28);
  transition:border-color .25s,opacity .25s;
}
.faq-editorial-cta-link:hover{border-color:var(--pink);opacity:.72}

/* ── CTA — dramatic dark editorial redesign ── */
.cta-sec{
  background:#0A0302!important;
  padding:0!important;
  min-height:82vh;
  display:flex!important;
  align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  text-align:center;
}
.cta-sec::before{
  content:'';position:absolute;
  top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(240,81,106,.5),rgba(245,194,48,.5),transparent);
  z-index:3;
}
.cta-editorial-inner{
  position:relative;z-index:2;
  padding:120px 56px;max-width:920px;width:100%;
}
.cta-editorial-eyebrow{
  font-size:11px;font-weight:700;letter-spacing:4px;
  text-transform:uppercase;color:rgba(240,81,106,.6);
  margin-bottom:32px;
  display:flex;align-items:center;justify-content:center;gap:14px;
}
.cta-editorial-eyebrow::before,.cta-editorial-eyebrow::after{
  content:'';width:32px;height:1px;
  background:rgba(240,81,106,.3);border-radius:1px;
}
.cta-editorial-h2{
  font-size:clamp(64px,10vw,144px)!important;
  font-weight:900!important;color:white!important;
  line-height:.88!important;letter-spacing:-5.5px!important;
  margin-bottom:44px!important;
}
.cta-editorial-h2 em{
  font-family:'Bodoni Moda',serif;font-style:italic;
  background:linear-gradient(135deg,var(--pink),var(--gold));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;letter-spacing:-4px;
}
.cta-editorial-sub{
  font-size:18px!important;color:rgba(255,255,255,.42)!important;
  font-weight:300!important;margin-bottom:56px!important;
  letter-spacing:.02em;line-height:1.8;
}
.cta-editorial-btn{
  display:inline-flex;align-items:center;gap:13px;
  background:linear-gradient(135deg,#25D366,#1DA851);
  color:white;font-size:16px;font-weight:700;
  padding:19px 48px;border-radius:50px;
  text-decoration:none;cursor:none;
  box-shadow:0 8px 36px rgba(37,211,102,.32);
  transition:all .38s var(--ease);letter-spacing:.01em;
}
.cta-editorial-btn:hover{
  transform:translateY(-5px) scale(1.02);
  box-shadow:0 18px 60px rgba(37,211,102,.55);
}
.cta-editorial-note{
  margin-top:40px;font-size:11.5px;
  color:rgba(255,255,255,.18);letter-spacing:1px;
  text-transform:uppercase;
}
.cta-editorial-divider{
  margin:28px auto 0;width:48px;height:1px;
  background:rgba(255,255,255,.08);
}
/* CTA atmospheric orbs */
.cta-orb-a{
  position:absolute;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(240,81,106,.11) 0%,transparent 68%);
  top:-350px;left:50%;transform:translateX(-50%);
  filter:blur(70px);pointer-events:none;
  animation:cin-d1 20s ease-in-out infinite;
}
.cta-orb-b{
  position:absolute;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(245,194,48,.065) 0%,transparent 68%);
  bottom:-250px;right:-80px;
  filter:blur(60px);pointer-events:none;
  animation:cin-d2 26s ease-in-out infinite reverse;
}
.cta-orb-c{
  position:absolute;
  width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(110,196,160,.04) 0%,transparent 68%);
  bottom:10%;left:5%;
  filter:blur(50px);pointer-events:none;
  animation:cin-d3 32s ease-in-out infinite;
}

/* ── GALLERY section heading upgrade ── */
.gallery-h2{
  font-size:clamp(44px,6vw,92px)!important;
  line-height:.96!important;letter-spacing:-3.5px!important;
}

/* ── ORGS section — polish ── */
.orgs-h2{
  font-size:clamp(40px,5.5vw,80px)!important;
  letter-spacing:-3px!important;line-height:.96!important;
}

/* ── V11 MOBILE ── */
@media(max-width:1024px){
  .how-editorial-top{padding:100px 32px 60px;gap:48px}
  .how-journey{padding:0 32px 100px}
  .how-journey-line{right:calc(32px + 74px)}
  .how-j-dot{right:calc(32px + 68px)}
  .faq-editorial-header{padding:100px 32px 60px;gap:48px}
  .faq-editorial-list{padding:0 32px 60px}
  .faq-editorial-cta-row{padding:8px 32px 60px}
  .cta-editorial-inner{padding:100px 32px}
  .glance-sec{padding:110px 32px 120px!important}
  .about-sec{padding:100px 32px!important}
}
@media(max-width:768px){
  /* HOW */
  .how-editorial-top{
    grid-template-columns:1fr;padding:80px 24px 44px;gap:20px;
  }
  .how-editorial-h2{letter-spacing:-2.5px}
  .how-editorial-side p{max-width:100%;font-size:16px}
  .how-journey{padding:0 24px 80px}
  .how-journey-line{display:none}
  .how-j-dot{display:none}
  .how-journey-step::before{right:-24px;left:-24px}
  .how-journey-step{
    grid-template-columns:60px 1fr;gap:22px;padding:44px 0;
  }
  .how-j-num{font-size:48px;letter-spacing:-2px}
  .how-j-body h3{font-size:clamp(22px,5.5vw,32px);letter-spacing:-1px;margin-bottom:12px}
  .how-j-body p{font-size:15px;line-height:1.9}
  /* FAQ */
  .faq-editorial-header{
    grid-template-columns:1fr;padding:80px 24px 44px;gap:16px;
  }
  .faq-editorial-h2{letter-spacing:-2.5px}
  .faq-editorial-right p{max-width:100%;font-size:16px}
  .faq-editorial-list{padding:0 24px 60px}
  .faq-editorial-q{font-size:16px;padding:26px 0;gap:24px}
  .faq-editorial-arrow{width:26px;height:26px}
  .faq-editorial-a{font-size:15px}
  .faq-editorial-cta-row{padding:8px 24px 48px}
  /* CTA */
  .cta-sec{min-height:72vh}
  .cta-editorial-inner{padding:80px 24px}
  .cta-editorial-h2{letter-spacing:-3.5px!important;margin-bottom:32px!important}
  .cta-editorial-sub{font-size:16px!important;margin-bottom:40px!important}
  .cta-editorial-btn{
    width:100%;max-width:320px;justify-content:center;
    font-size:15px;padding:17px 32px;
  }
  /* Global */
  .glance-sec{padding:80px 24px 90px!important}
  .about-sec{padding:72px 24px 88px!important}
  .t-header{margin-bottom:48px!important}
}
@media(max-width:480px){
  .how-editorial-top{padding:60px 16px 36px}
  .how-journey{padding:0 16px 60px}
  .how-journey-step{grid-template-columns:48px 1fr;gap:16px;padding:36px 0}
  .how-j-num{font-size:36px;letter-spacing:-1.5px}
  .how-j-body h3{font-size:clamp(20px,5.5vw,28px)}
  .how-j-body p{font-size:14px}
  .faq-editorial-header{padding:60px 16px 32px}
  .faq-editorial-list{padding:0 16px 48px}
  .faq-editorial-q{font-size:15px;padding:22px 0}
  .faq-editorial-cta-row{padding:8px 16px 40px}
  .cta-editorial-inner{padding:64px 16px}
  .cta-editorial-h2{letter-spacing:-2.5px!important}
  .glance-sec{padding:60px 16px 72px!important}
  .about-sec{padding:56px 16px 72px!important}
}

/* ══════════════════════════════════════════════════════════
   V12 — THE LALAG UNIVERSE
   One world. One breath. Every pixel has intention.
   When someone enters — they step inside a living universe.
══════════════════════════════════════════════════════════ */

/* ─ Global flour-dust atmosphere canvas ─ */
#lalag-dust{
  position:fixed;inset:0;pointer-events:none;z-index:3;
}

/* ─ Organic morphing border — about photo becomes living art ─ */
@keyframes morph-border{
  0%,100%{border-radius:36px 36px 36px 36px}
  20%{border-radius:58% 42% 50% 50% / 48% 52% 48% 52%}
  40%{border-radius:45% 55% 42% 58% / 52% 40% 60% 48%}
  60%{border-radius:52% 48% 62% 38% / 50% 44% 56% 50%}
  80%{border-radius:40% 60% 55% 45% / 55% 42% 58% 45%}
}
.about-img-frame{
  animation:morph-border 14s ease-in-out infinite,float-ab 8s ease-in-out infinite;
  overflow:hidden;
}

/* ─ Glance section — Bodoni art letter as background poetry ─ */
.glance-sec{position:relative;overflow:hidden}
.glance-art-letter{
  position:absolute;top:-100px;right:-80px;
  font-size:clamp(260px,36vw,520px);
  font-weight:900;font-style:italic;
  font-family:'Bodoni Moda',serif;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(240,81,106,.058);
  line-height:1;pointer-events:none;user-select:none;
  animation:cin-d1 22s ease-in-out infinite;
  z-index:0;letter-spacing:-8px;direction:ltr;
  text-rendering:geometricPrecision;
}
.glance-top,.glance-grid,.glance-cards{position:relative;z-index:1}

/* ─ Atmospheric orb layers — each section breathes with its own light ─ */
.about-sec,.services-sec,.testimonials-sec{
  position:relative;overflow:hidden;
}
.about-atm-a,.about-atm-b,
.srv-atm-a,.srv-atm-b,
.test-atm-a,.test-atm-b,
.how-atm,.faq-atm,.glance-atm{
  position:absolute;border-radius:50%;pointer-events:none;filter:blur(100px);
}
.about-atm-a{
  width:500px;height:500px;
  background:radial-gradient(circle,rgba(240,81,106,.055) 0%,transparent 68%);
  bottom:-160px;left:-100px;
  animation:cin-d3 26s ease-in-out infinite;
}
.about-atm-b{
  width:360px;height:360px;
  background:radial-gradient(circle,rgba(245,194,48,.04) 0%,transparent 68%);
  top:-50px;right:-80px;
  animation:cin-d1 20s ease-in-out infinite reverse;
}
.srv-atm-a{
  width:560px;height:560px;
  background:radial-gradient(circle,rgba(255,184,198,.062) 0%,transparent 68%);
  top:-200px;right:-160px;
  animation:cin-d2 22s ease-in-out infinite;
}
.srv-atm-b{
  width:380px;height:380px;
  background:radial-gradient(circle,rgba(240,81,106,.04) 0%,transparent 68%);
  bottom:-100px;left:-60px;
  animation:cin-d1 30s ease-in-out infinite reverse;
}
.test-atm-a{
  width:620px;height:620px;
  background:radial-gradient(circle,rgba(240,81,106,.052) 0%,transparent 68%);
  top:-240px;right:-170px;
  animation:cin-d2 20s ease-in-out infinite;
}
.test-atm-b{
  width:480px;height:480px;
  background:radial-gradient(circle,rgba(245,194,48,.038) 0%,transparent 68%);
  bottom:-110px;left:-110px;
  animation:cin-d3 32s ease-in-out infinite reverse;
}
.how-atm{
  width:520px;height:520px;
  background:radial-gradient(circle,rgba(255,184,198,.052) 0%,transparent 68%);
  bottom:-130px;left:-80px;
  animation:cin-d1 28s ease-in-out infinite reverse;
}
.faq-atm{
  width:440px;height:440px;
  background:radial-gradient(circle,rgba(240,81,106,.04) 0%,transparent 68%);
  top:-80px;left:-80px;
  animation:cin-d2 26s ease-in-out infinite;
}
.glance-atm{
  position:absolute;width:420px;height:420px;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,rgba(245,194,48,.038) 0%,transparent 68%);
  bottom:-80px;right:-60px;filter:blur(90px);z-index:0;
  animation:cin-d3 22s ease-in-out infinite;
}

/* ─ Marquee — editorial / minimal to match new premium feel ─ */
.marquee-section{
  background:var(--cream)!important;
  border-top:1px solid rgba(28,10,4,.055)!important;
  border-bottom:1px solid rgba(28,10,4,.055)!important;
  margin:0!important;border-radius:0!important;
  transform:none!important;box-shadow:none!important;
  padding:18px 0!important;
}
.mq-item{
  font-size:9.5px!important;
  color:rgba(28,10,4,.22)!important;
  letter-spacing:3.5px!important;
  text-transform:uppercase!important;
  gap:48px!important;padding:0 48px!important;
}
.mq-sep{color:var(--pink)!important;opacity:.5!important;font-size:7px!important}

/* ─ V12 Mobile: performance ─ */
@media(max-width:768px){
  #lalag-dust{display:none}
  .about-atm-a,.about-atm-b,.srv-atm-a,.srv-atm-b,
  .test-atm-a,.test-atm-b,.how-atm,.faq-atm,.glance-atm{
    display:none;
  }
  .about-img-frame{
    animation:float-ab 8s ease-in-out infinite;
    border-radius:var(--r3)!important;
  }
  .glance-art-letter{display:none}
  .marquee-section{padding:14px 0!important}
}

/* ══ SERVICE DETAIL MODAL ══ */
#srv-modal{
  position:fixed;inset:0;z-index:1200;
  display:flex;align-items:center;justify-content:center;
  opacity:0;pointer-events:none;
  transition:opacity .35s ease;
  direction:rtl;
}
#srv-modal.open{opacity:1;pointer-events:all}
.srv-modal-bg{position:absolute;inset:0;overflow:hidden}
.srv-modal-video{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;opacity:.5;
}
.srv-modal-veil{
  position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(7,3,2,.65) 0%,rgba(7,3,2,.88) 50%,rgba(7,3,2,.98) 100%);
}
.srv-modal-scroll{
  position:relative;z-index:2;
  max-height:100svh;overflow-y:auto;
  width:100%;display:flex;align-items:center;justify-content:center;
  padding:40px 16px;
}
.srv-modal-content{
  max-width:580px;width:100%;text-align:center;
  transform:translateY(36px) scale(.96);
  transition:transform .45s cubic-bezier(.23,1,.32,1);
}
#srv-modal.open .srv-modal-content{transform:none}
.srv-modal-icon{font-size:56px;margin-bottom:16px;display:block}
.srv-modal-lbl{
  font-size:11px;letter-spacing:4px;color:var(--pink);font-weight:800;
  text-transform:uppercase;margin-bottom:14px;display:block;
}
.srv-modal-title{
  font-family:'Bodoni Moda',serif;font-style:italic;
  font-size:clamp(34px,7vw,56px);color:#fff;
  margin-bottom:18px;line-height:1.1;
  text-shadow:0 2px 24px rgba(0,0,0,.6);
}
.srv-modal-desc{
  font-size:16.5px;color:rgba(255,255,255,.95);line-height:1.9;
  margin-bottom:26px;text-shadow:0 1px 8px rgba(0,0,0,.5);
  font-weight:500;
}
.srv-modal-tags{
  display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:30px;
}
.srv-modal-tag{
  background:rgba(240,81,106,.16);border:1px solid rgba(240,81,106,.32);
  color:rgba(255,255,255,.88);padding:6px 16px;border-radius:20px;
  font-size:12px;font-weight:700;
}
.srv-modal-details{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:36px;
}
.srv-modal-det{
  background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.18);
  border-radius:14px;padding:18px 10px;
}
.srv-modal-det-icon{font-size:26px;display:block;margin-bottom:8px}
.srv-modal-det-val{font-size:15px;font-weight:800;color:#fff;display:block;margin-bottom:4px;text-shadow:0 1px 6px rgba(0,0,0,.4)}
.srv-modal-det-lbl{font-size:12px;color:rgba(255,255,255,.65);display:block;font-weight:600}
.srv-modal-cta-wrap{display:flex;flex-direction:column;align-items:center;gap:12px}
.srv-modal-cta{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--pink);color:#fff;
  padding:16px 38px;border-radius:50px;
  font-size:15px;font-weight:700;text-decoration:none;
  box-shadow:0 8px 32px rgba(240,81,106,.45);
  transition:transform .18s,box-shadow .18s;
}
.srv-modal-cta:hover{transform:translateY(-2px);box-shadow:0 14px 44px rgba(240,81,106,.62)}
.srv-modal-close{
  position:fixed;top:20px;left:20px;
  width:46px;height:46px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
  border-radius:50%;color:#fff;font-size:19px;
  cursor:pointer;z-index:3;
  display:flex;align-items:center;justify-content:center;
  transition:background .2s;
}
.srv-modal-close:hover{background:rgba(255,255,255,.22)}
@media(max-width:480px){
  .srv-modal-details{grid-template-columns:repeat(3,1fr)}
  .srv-modal-det-val{font-size:12px}
  .srv-modal-det{padding:14px 6px}
}
`

const EDIT_CSS = `
  body,body *{cursor:auto!important}
  [data-editable]{cursor:pointer!important;outline:none}
  #ldr{display:none!important}
  .hero-cursor,.cursor-dot,.cursor-ring{display:none!important}
  *{animation-play-state:running}
  .rv,.rv-l,.rv-r,.rv-scale,.rv-up{opacity:1!important;transform:none!important;transition:none!important;visibility:visible!important}
  .rv.in,.rv-l.in,.rv-r.in,.rv-up.in,.rv-scale.in{opacity:1!important;transform:none!important}
  .hero-content,.hero-ctas,.hero-sub,.hero-eyebrow{opacity:1!important;transform:none!important}
`

const T_WA_SVG = `<svg class="t-wa-icon" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`

function esc(s: string) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
/** Render urgency badge — empty/missing = no badge */
function renderBadge(badge: string | undefined, label: string): string {
  if (!badge || !badge.trim()) return ''
  return `<div class="urgency-badge" aria-label="${esc(label)}">${esc(badge)}</div>`
}
/** Render srv-tags row from comma-separated string */
function renderTags(tags: string | undefined): string {
  if (!tags || !tags.trim()) return ''
  const items = tags.split(',').map(t => t.trim()).filter(Boolean)
  if (items.length === 0) return ''
  const chips = items.map(t => `<span class="srv-tag">${esc(t)}</span>`).join('')
  return `<div class="srv-tags" aria-label="מאפיינים: ${esc(items.join(', '))}">${chips}</div>`
}

function renderTCard(t: Testimonial): string {
  return `<div class="t-card">
  <div class="t-status"><span>9:41</span><div class="t-status-icons"><span>▐▐▐</span><span>WiFi</span><span>█</span></div></div>
  <div class="t-wa-header">
    <span class="t-wa-back">‹</span>
    <div class="t-wa-avatar">${esc(t.avatar)}</div>
    <div class="t-wa-info">
      <div class="t-wa-name">${esc(t.name)}</div>
      <div class="t-wa-status">מחובר/ת</div>
    </div>
    <div class="t-wa-icons"><span>📹</span><span>📞</span></div>
  </div>
  <div class="t-wa-body">
    <div class="t-bubble">${esc(t.msg1)}<div class="t-bubble-time">${esc(t.time1)} <span class="t-bubble-check">✓✓</span></div></div>
    <div class="t-bubble">${esc(t.msg2)}<div class="t-bubble-time">${esc(t.time2)} <span class="t-bubble-check">✓✓</span></div></div>
  </div>
  <div class="t-wa-footer">
    <span class="t-wa-emoji">😊</span>
    <div class="t-wa-field">הקלידי הודעה...</div>
    <div class="t-wa-send">🎤</div>
  </div>
</div>`
}

function renderTracks(testimonials: Testimonial[] | null): string {
  const list = testimonials && testimonials.length > 0 ? testimonials : []
  if (list.length === 0) return ''
  const half = Math.ceil(list.length / 2)
  const t1 = list.slice(0, Math.max(half, 1))
  const t2 = list.slice(Math.max(half, 1)).length > 0 ? list.slice(Math.max(half, 1)) : t1
  const c1 = t1.map(renderTCard).join('')
  const c2 = t2.map(renderTCard).join('')
  return `<div class="t-marquee-wrap" aria-label="ביקורות לקוחות" role="region">
  <div class="t-track" id="t-track-1" aria-hidden="true">${c1}${c1}</div>
  <div class="t-track t-track-2" id="t-track-2" aria-hidden="true">${c2}${c2}</div>
</div>`
}

function renderFaqItems(items: FaqItem[] | null): string {
  const defaults: FaqItem[] = [
    { id:'f1', q: 'מהו גיל המינימום להשתתפות בחוג?', a: 'החוג מתאים לילדות מגיל 6 ומעלה. לגילאים צעירים יותר אנחנו ממליצות על השתתפות עם הורה — וזה גם הרבה יותר כיף!' },
    { id:'f2', q: 'כמה ילדות בכל קבוצה?', a: 'קבוצות קטנות של עד 8 ילדות בלבד — כדי שכל אחת תקבל תשומת לב אישית ותוצאה שהיא ממש גאה בה.' },
    { id:'f3', q: 'מה קורה אם הילדה לא יכולה להגיע לשיעור?', a: 'אין בעיה! מותר לפספס שיעור עד פעם בחודש. ניתן לתאם תשלום חלקי או להצטרף לקבוצה אחרת באותו שבוע.' },
    { id:'f4', q: 'מה לובשים לסדנה?', a: 'בגדים שאפשר להתלכלך בהם — גם ככה רוב הקמח מגיע בחזרה הביתה עם החיוך 😄 לא חייבים סינר, אבל אפשר להביא.' },
    { id:'f5', q: 'מה הילדות אופות בכל שיעור?', a: 'כל שיעור מתמקד ביצירה אחת — עוגיות מעוצבות, מאפינס, לחם, פיצה, עוגות קרם ועוד. התפריט מתחלף בהתאם לעונה ולחגים.' },
    { id:'f6', q: 'האם הילדה לוקחת את מה שאפתה הביתה?', a: 'כמובן! כל ילדה לוקחת הביתה את מה שיצרה באריזה יפה. זה גם ארוחת ערב וגם מתנה שהכינה לבד.' },
    { id:'f7', q: 'האם ניתן לארגן יום הולדת בסדנה?', a: 'בהחלט! אנחנו מארגנות ימי הולדת מיוחדים לקבוצות של 6–15 ילדות. הפעילות כוללת אפייה, עיצוב ואריזת מתנות. פנו אלינו לפרטים.' },
    { id:'f8', q: 'מה ההבדל בין חוג שבועי לסדנה חד-פעמית?', a: 'החוג השבועי מתאים לילדות שרוצות להתפתח לאורך זמן — כישורים, ביטחון עצמי ויצירתיות. הסדנה החד-פעמית מושלמת לאירועים וימי הולדת.' },
    { id:'f9', q: 'האם הסדנאות מתאימות לילדות עם אלרגיות?', a: 'כן! חשוב לציין בעת ההרשמה כל אלרגיה כדי שנוכל להכין חומרים מתאימים ולוודא חוויה בטוחה לכל ילדה.' },
    { id:'f10', q: 'איפה הסדנאות מתקיימות?', a: 'בסטודיו המאובזר שלנו בקריות — מטבח מקצועי, עיצוב חמים, וכל הציוד כלול. לא צריך להביא כלום מהבית!' },
    { id:'f11', q: 'כמה עולה הסדנה?', a: 'המחיר משתנה לפי סוג הסדנה וכמות המשתתפות. שלחי לנו הודעה בוואטסאפ ונחזור אלייך עם הצעה אישית — ללא התחייבות.' },
    { id:'f12', q: 'איך נרשמים?', a: 'פשוט מאוד — שלחי הודעה בוואטסאפ, נעזור לבחור את הסדנה המתאימה ונשריין לך מקום. כל הפרטים מסתדרים בהודעות.' },
    { id:'f13', q: 'האם המרתון מתאים לנערות שלא אפו בעבר?', a: 'בהחלט! המרתון מתאים לכל הרמות — מתחילות לגמרי ועד מי שכבר אופה בבית. זהבה מלמדת בסבלנות ומתאימה את עצמה לכל אחת.' },
    { id:'f14', q: 'האם ניתן לשלב את הסדנה עם אירוע חברה?', a: 'כן! אנחנו מקיימות סדנאות גיבוש לחברות ועסקים — חוויה שכל הצוות יזכור. צרי קשר לפרטים ולהצעת מחיר מותאמת.' },
    { id:'f15', q: 'כמה זמן נמשך כל שיעור?', a: 'שיעור חוג רגיל נמשך כשעתיים. סדנאות יום הולדת ואירועים — 2–3 שעות לפי הבחירה. מרתון הקיץ עומד על 5 שעות בכל מפגש.' },
    { id:'f16', q: 'האם הורים יכולים לצפות בשיעור?', a: 'אנחנו מעודדות את הילדות להיות עצמאיות! ההורים מחכים בחוץ ומקבלות בסוף ילדה גאה ומחייכת — וכמובן מה שאפתה 🎂' },
    { id:'f17', q: 'האם החוג מתאים גם לבנים?', a: 'כן! אמנם רוב המשתתפים הן בנות, אבל בנים מאוד מוזמנים. אפייה אין לה מגדר — רק טעם טוב 😄' },
    { id:'f18', q: 'מה כלול במחיר?', a: 'הכל! חומרי גלם, ציוד, הוראה צמודה, ואריזה יפה להביא הביתה. לא צריך להביא שום דבר — רק להגיע עם חשק.' },
    { id:'f19', q: 'האם ניתן לשלם בתשלומים?', a: 'כן! ניתן לפרוס את התשלום. שלחי לנו הודעה ונסדר את זה בנוחות — גמישות היא חלק מהשירות שלנו.' },
    { id:'f20', q: 'כמה מראש צריך להירשם?', a: 'ממליצות להירשם לפחות שבועיים מראש — הקבוצות מתמלאות מהר. לחוג השבועי ולמרתון הקיץ — ככל שמוקדם יותר, כך יש יותר בחירה של מועדים.' },
    { id:'f21', q: 'האם יש שיעורים בסוף השבוע?', a: 'כן! יש מפגשים גם בימי שישי ובסופי שבוע, מתאים מאוד למשפחות עם לוח זמנים עמוס. שלחי הודעה לתיאום מועד נוח.' },
    { id:'f22', q: 'מה מדיניות הביטול?', a: 'ביטול עד 48 שעות לפני השיעור — מלא. ביטול בפחות מ-48 שעות יחויב בחצי. תאונה או מחלה? נטפל בזה בהבנה, תמיד.' },
  ]
  const list = items && items.length > 0 ? items : defaults
  return list.map((item, i) =>
    `<div class="faq-row rv" role="listitem"><button class="faq-q" id="faq-btn-${i+1}" aria-expanded="false" aria-controls="faq-a-${i+1}">${esc(item.q)} <span class="faq-arr" aria-hidden="true">▼</span></button><div class="faq-a" id="faq-a-${i+1}" role="region" aria-labelledby="faq-btn-${i+1}">${esc(item.a)}</div></div>`
  ).join('')
}

function renderFaqEditorial(items: FaqItem[] | null, wa: string): string {
  const defaults: FaqItem[] = [
    { id:'f1', q:'מהו גיל המינימום להשתתפות בחוג?', a:'החוג מתאים לילדות מגיל 6 ומעלה. לגילאים צעירים יותר אנחנו ממליצות על השתתפות עם הורה — וזה גם הרבה יותר כיף!' },
    { id:'f2', q:'כמה ילדות בכל קבוצה?', a:'קבוצות קטנות של עד 8 ילדות בלבד — כדי שכל אחת תקבל תשומת לב אישית ותוצאה שהיא ממש גאה בה.' },
    { id:'f3', q:'מה קורה אם הילדה לא יכולה להגיע לשיעור?', a:'אין בעיה! מותר לפספס שיעור עד פעם בחודש. ניתן לתאם תשלום חלקי או להצטרף לקבוצה אחרת באותו שבוע.' },
    { id:'f4', q:'מה הילדות אופות בכל שיעור?', a:'כל שיעור מתמקד ביצירה אחת — עוגיות מעוצבות, מאפינס, לחם, פיצה, עוגות קרם ועוד. התפריט מתחלף בהתאם לעונה ולחגים.' },
    { id:'f5', q:'האם הילדה לוקחת את מה שאפתה הביתה?', a:'כמובן! כל ילדה לוקחת הביתה את מה שיצרה באריזה יפה. זה גם ארוחת ערב וגם מתנה שהכינה לבד.' },
    { id:'f6', q:'האם ניתן לארגן יום הולדת בסדנה?', a:'בהחלט! אנחנו מארגנות ימי הולדת מיוחדים לקבוצות של 6–15 ילדות. הפעילות כוללת אפייה, עיצוב ואריזת מתנות. פנו אלינו לפרטים.' },
  ]
  const list = (items && items.length > 0 ? items : defaults).slice(0, 6)
  return list.map((item, i) =>
    `<div class="faq-editorial-row" role="listitem">
  <button class="faq-editorial-q" id="faqe-btn-${i+1}" aria-expanded="false" aria-controls="faqe-a-${i+1}">
    <span>${esc(item.q)}</span>
    <span class="faq-editorial-arrow" aria-hidden="true">▼</span>
  </button>
  <div class="faq-editorial-a" id="faqe-a-${i+1}" role="region" aria-labelledby="faqe-btn-${i+1}">${esc(item.a)}</div>
</div>`
  ).join('')
}

function getHTML(d: LandingData, editMode = false): string {
  const wa = `https://wa.me/${d.whatsapp || '972506762220'}`
  const igHandle = (d.instagram || 'lalag.and.more').replace('@','')
  const ig = `https://www.instagram.com/${igHandle}/`
  const owner = d.owner_name || 'זהבה מילברג'
  const phone = d.phone || '050-676-2220'
  const E = (field: string) => editMode ? ` data-editable="${field}"` : ''
  const S = (section: string) => editMode ? ` data-section="${section}"` : ''

  return `
<!-- ═══ כפתור נגישות ═══ -->
<button id="a11y-btn" aria-label="פתח תפריט נגישות" aria-expanded="false" aria-controls="a11y-panel">
  <span aria-hidden="true">♿</span>
</button>
<div id="a11y-panel" role="dialog" aria-label="תפריט נגישות" aria-modal="false">
  <div class="a11y-head">
    <button class="a11y-close-x" id="a11y-close-btn" aria-label="סגור תפריט נגישות">✕</button>
    <span class="a11y-title">תפריט נגישות</span>
  </div>

  <div class="a11y-grid" role="group" aria-label="אפשרויות נגישות">
    <button class="a11y-tile" id="at-sepia"    aria-pressed="false" aria-label="מצב סיפיה"><span class="a11y-code">SP</span><span class="a11y-lbl">סיפיה</span></button>
    <button class="a11y-tile" id="at-bw"       aria-pressed="false" aria-label="שחור-לבן"><span class="a11y-code">BW</span><span class="a11y-lbl">מונוכרום</span></button>
    <button class="a11y-tile" id="at-zoom-dec" aria-label="הקטן זום"><span class="a11y-code">-Z</span><span class="a11y-lbl">זום-</span></button>
    <button class="a11y-tile" id="at-zoom-inc" aria-label="הגדל זום"><span class="a11y-code">+Z</span><span class="a11y-lbl">זום+</span></button>
    <button class="a11y-tile" id="at-font-dec" aria-label="הקטן גופן"><span class="a11y-code">-A</span><span class="a11y-lbl">גופן-</span></button>
    <button class="a11y-tile" id="at-font-inc" aria-label="הגדל גופן"><span class="a11y-code">+A</span><span class="a11y-lbl">גופן+</span></button>

    <button class="a11y-tile" id="at-h1"       aria-pressed="false" aria-label="הדגש כותרות"><span class="a11y-code">H1</span><span class="a11y-lbl">כותרות</span></button>
    <button class="a11y-tile" id="at-anim"     aria-pressed="false" aria-label="הפסק אנימציות"><span class="a11y-code">RM</span><span class="a11y-lbl">אנימציה</span></button>
    <button class="a11y-tile" id="at-blink"    aria-pressed="false" aria-label="הפסק הבהובים"><span class="a11y-code">BLK</span><span class="a11y-lbl">הבהובים</span></button>
    <button class="a11y-tile" id="at-invert"   aria-pressed="false" aria-label="הפוך צבעים"><span class="a11y-code">INV</span><span class="a11y-lbl">היפך</span></button>
    <button class="a11y-tile" id="at-by"       aria-pressed="false" aria-label="מצב שחור-צהוב"><span class="a11y-code">BY</span><span class="a11y-lbl">שחור-צהוב</span></button>
    <button class="a11y-tile" id="at-hc"       aria-pressed="false" aria-label="ניגודיות גבוהה"><span class="a11y-code">HC</span><span class="a11y-lbl">ניגודיות</span></button>

    <button class="a11y-tile" id="at-bigcur"   aria-pressed="false" aria-label="סמן גדול"><span class="a11y-code">BIG</span><span class="a11y-lbl">סמן גדול</span></button>
    <button class="a11y-tile" id="at-curcol"   aria-pressed="false" aria-label="סמן שחור"><span class="a11y-code">CUR</span><span class="a11y-lbl">סמן שחור</span></button>
    <button class="a11y-tile" id="at-spc"      aria-pressed="false" aria-label="הגדל ריווח"><span class="a11y-code">SPC</span><span class="a11y-lbl">ריוח</span></button>
    <button class="a11y-tile" id="at-font"     aria-pressed="false" aria-label="גופן קריא"><span class="a11y-code">Aa</span><span class="a11y-lbl">פונט</span></button>
    <button class="a11y-tile" id="at-links"    aria-pressed="false" aria-label="הדגש קישורים"><span class="a11y-code">LNK</span><span class="a11y-lbl">קישורים</span></button>
    <button class="a11y-tile" id="at-alt"      aria-pressed="false" aria-label="תיאורי תמונות"><span class="a11y-code">TXT</span><span class="a11y-lbl">תיאור קבוע</span></button>
  </div>

  <div class="a11y-foot">
    <button class="a11y-decl" id="at-decl">הצהרת נגישות מלאה</button>
    <div class="a11y-acts">
      <button class="a11y-act" id="at-reset">אפוס הגדרות</button>
      <button class="a11y-act" id="at-hide">הסתר עכשיו</button>
      <button class="a11y-act" id="at-report">דיווח הפרה</button>
    </div>
  </div>
</div>

<!-- נגישות: דילוג לתוכן הראשי -->
<a href="#main-content" class="skip-link">דלג לתוכן הראשי</a>

<div id="cur" aria-hidden="true"></div>
<div id="cur-ring" aria-hidden="true"><span class="cur-lbl" id="cur-lbl"></span></div>
<div id="amb-glow" aria-hidden="true"></div>
<canvas id="lalag-dust" aria-hidden="true"></canvas>
<div id="sp-ticker" aria-live="polite" aria-atomic="true"></div>
<div id="ldr" role="status" aria-label="טוען..." aria-live="polite">
  <div class="ldr-inner">
    <div class="ldr-logo-wrap">
      <img src="/lalag-7.png" alt="lalag" class="ldr-logo-img" aria-hidden="true">
      <div class="ldr-beam" aria-hidden="true"></div>
    </div>
    <div class="ldr-dots" aria-hidden="true"><span></span><span></span><span></span></div>
  </div>
</div>

<!-- ═══ HEADER + NAV ═══ -->
<header role="banner">
<nav id="nav" aria-label="ניווט ראשי">
  <a class="nav-logo" href="#" aria-label="lalag & more — עמוד הבית">
    <img class="nav-logo-img" src="/lalag-7.png" alt="lalag & more" />
  </a>

  <ul class="nav-center" role="list">
    <li><a href="#about">אודות</a></li>
    <li><a href="#services">סדנאות</a></li>
    <li><a href="#gallery">גלריה</a></li>
    <li><a href="#testimonials">ביקורות</a></li>
  </ul>

  <div class="nav-right">
    <a class="nav-wa" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="שלח הודעת WhatsApp ל-lalag & more">${waIcon(18,'#25D366')}</a>
    <a class="nav-ig" href="${ig}" target="_blank" rel="noopener noreferrer" aria-label="עמוד האינסטגרם של lalag & more">${igIcon(18)}</a>
  </div>

  <!-- Hamburger — hidden on desktop, shown via @media ≤768px -->
  <button id="mob-menu-btn" aria-label="פתח תפריט ניווט" aria-expanded="false" aria-controls="mob-menu">
    <span class="ham-line" aria-hidden="true"></span>
    <span class="ham-line" aria-hidden="true"></span>
    <span class="ham-line" aria-hidden="true"></span>
  </button>
</nav>
</header>

<!-- Bottom dock nav — desktop only -->
<nav id="bottom-dock" aria-label="ניווט תחתון" role="navigation">
  <a class="dock-logo" href="#" aria-label="lalag & more — עמוד הבית">
    <img src="/lalag-7.png" alt="lalag & more" />
  </a>
  <div class="dock-sep" aria-hidden="true"></div>
  <a class="dock-link" href="#about">אודות</a>
  <a class="dock-link" href="#services">סדנאות</a>
  <a class="dock-link" href="#gallery">גלריה</a>
  <a class="dock-link" href="#testimonials">ביקורות</a>
  <div class="dock-sep" aria-hidden="true"></div>
  <a class="dock-icon" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${waIcon(18,'rgba(255,255,255,0.82)')}</a>
  <a class="dock-icon" href="${ig}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${igIconWhite(18)}</a>
</nav>

<!-- Mobile fullscreen menu — hidden on desktop via CSS display:none -->
<div id="mob-menu" role="dialog" aria-label="תפריט ניווט נייד" aria-modal="true">
  <div class="mob-blob1" aria-hidden="true"></div>
  <div class="mob-blob2" aria-hidden="true"></div>
  <nav class="mob-nav-inner" aria-label="ניווט נייד">
    <a href="#about"        class="mob-link" id="mml-about">אודות</a>
    <a href="#services"     class="mob-link" id="mml-services">סדנאות</a>
    <a href="#gallery"      class="mob-link" id="mml-gallery">גלריה</a>
    <a href="#testimonials" class="mob-link" id="mml-testimonials">ביקורות</a>
    <div class="mob-nav-ctas">
      <a class="btn-wa-hero" href="${wa}" target="_blank" rel="noopener noreferrer"
         aria-label="כתבו לנו ב-WhatsApp">${waIcon(16,'white')} כתבו לנו ב-WhatsApp</a>
    </div>
    <div class="mob-nav-icons">
      <a href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${waIcon(22,'#25D366')}</a>
      <a href="${ig}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${igIcon(22)}</a>
    </div>
  </nav>
</div>

<!-- ═══ HERO ═══ -->
<main id="main-content">
<section class="hero-cin" id="home" aria-label="lalag &amp; more — סדנאות אפייה">
  <h1 class="sr-only">lalag &amp; more — סדנאות אפייה מקצועיות בקריות</h1>

  <!-- Animated background -->
  <div class="cin-bg" aria-hidden="true">
    <div class="cin-orb cin-orb-1"></div>
    <div class="cin-orb cin-orb-2"></div>
    <div class="cin-orb cin-orb-3"></div>
  </div>
  <canvas id="cin-particles" aria-hidden="true"></canvas>
  <div id="cin-light" aria-hidden="true"></div>

  <!-- Logo + CTA in one column stage -->
  <div class="cin-stage" id="cin-stage">
    <div class="cin-logo-outer" id="cin-logo">
      <div class="cin-glow-a" aria-hidden="true"></div>
      <div class="cin-glow-b" aria-hidden="true"></div>
      <img src="/lalag-7.png" alt="lalag & more" class="cin-logo-img" id="cin-logo-img" />
      <div class="cin-shine" aria-hidden="true"></div>
    </div>

    <!-- Hero CTA — fades in after loader exits -->
    <div class="hero-content">
      <p class="hero-sub">סדנאות אפייה לילדות, קבוצות וארגונים</p>
      <div class="hero-ctas">
        <a class="btn-wa-hero" href="${wa}" target="_blank" rel="noopener noreferrer"
           aria-label="כתבי לנו ב-WhatsApp">${waIcon(15,'white')} כתבי לנו עכשיו</a>
        <a class="btn-ghost-dark" href="#services"
           aria-label="ראי את הסדנאות שלנו">← מה אנחנו מציעות</a>
      </div>
    </div>
  </div>

  <!-- Scroll indicators — both sides -->
  <div class="cin-sides" aria-hidden="true">
    <div class="cin-side">
      <span class="cin-side-lbl">scroll</span>
      <div class="cin-side-line"></div>
      <div class="cin-side-arr"></div>
    </div>
    <div class="cin-side">
      <span class="cin-side-lbl">scroll</span>
      <div class="cin-side-line"></div>
      <div class="cin-side-arr"></div>
    </div>
  </div>
</section>

<!-- ═══ MARQUEE — דקורטיבי, מוסתר ממסכי קריאה ═══ -->
<div class="marquee-section" aria-hidden="true">
  <div class="marquee-outer">
    <div class="mq-track" id="mq-track">
      <span class="mq-item">חוגי אפייה<span class="mq-sep">✦</span></span>
      <span class="mq-item">סדנאות פרטיות<span class="mq-sep">✦</span></span>
      <span class="mq-item">סדנאות קבוצתיות<span class="mq-sep">✦</span></span>
      <span class="mq-item">מרתון אפייה<span class="mq-sep">✦</span></span>
      <span class="mq-item">חוגי אפייה לילדים<span class="mq-sep">✦</span></span>
      <span class="mq-item">סדנאות לארגונים<span class="mq-sep">✦</span></span>
      <span class="mq-item">אפייה קבוצתית<span class="mq-sep">✦</span></span>
      <span class="mq-item">מרתון עוגות<span class="mq-sep">✦</span></span>
    </div>
  </div>
</div>

<!-- ═══ AT A GLANCE — typographic stats monument ═══ -->
<section class="glance-sec" aria-label="מספרים שמדברים בעד עצמם">
  <div class="glance-art-letter" aria-hidden="true">L</div>
  <div class="glance-atm" aria-hidden="true"></div>
  <div class="glance-top">
    <span class="glance-eyebrow">במספרים</span>
    <span class="glance-tagline">כי מספרים אמיתיים מדברים לבד</span>
  </div>
  <div class="glance-cards">
    <div class="glance-card rv">
      <div class="glance-card-icon" aria-hidden="true">🎂</div>
      <span class="glance-num" data-target="500" data-suffix="+">500<sup>+</sup></span>
      <span class="glance-desc">ילדות <em>שהתנסו בסדנאות שלנו</em></span>
    </div>
    <div class="glance-card rv">
      <div class="glance-card-icon" aria-hidden="true">⭐</div>
      <span class="glance-num" data-target="3" data-suffix="+">3<sup>+</sup></span>
      <span class="glance-desc">שנות <em>ניסיון מוכח בפועל</em></span>
    </div>
    <div class="glance-card rv">
      <div class="glance-card-icon" aria-hidden="true">💕</div>
      <span class="glance-num" data-target="100" data-suffix="%">100<sup>%</sup></span>
      <span class="glance-desc">ילדות <em>שחזרו לסדנה שנית</em></span>
    </div>
  </div>
</section>

<!-- ═══ ABOUT ═══ -->
<section class="about-sec" id="about"${S('about')} aria-labelledby="about-heading">
  <div class="about-atm-a" aria-hidden="true"></div>
  <div class="about-atm-b" aria-hidden="true"></div>
  <div class="about-visual-wrap rv-r">
    <div class="about-img-frame">
      <img src="/zahava.png" alt="${owner} — קונדיטורית מוסמכת ומייסדת lalag & more" class="about-photo" />
    </div>
    <!-- תג תעודה — role=img עם תיאור מפורט -->
    <div class="about-cert" role="img" aria-label="קונדיטורית מוסמכת מאז 2022">
      <div class="about-cert-icon" aria-hidden="true">🏅</div>
      <div aria-hidden="true">
        <div class="about-cert-title">קונדיטורית מוסמכת</div>
        <div class="about-cert-sub">certified pastry chef</div>
      </div>
      <div class="about-cert-sep" aria-hidden="true"></div>
      <div style="text-align:center" aria-hidden="true">
        <div class="about-cert-year">2022</div>
        <div class="about-cert-yearlabel">מאז</div>
      </div>
    </div>
  </div>

  <div class="rv-l">
    <div class="sec-label" aria-hidden="true">מי אנחנו</div>
    <div class="clip-h"><h2 class="about-h2" id="about-heading"><span${E('owner_name')}>${owner}</span> —<br><span class="ac"${E('about_sub')}>${d.about_sub || 'האהבה לאפייה הפכה לשליחות'}</span></h2></div>
    <p class="about-body"${E('about_bio')}>${d.about_bio || 'קונדיטורית מוסמכת שהפכה את האהבה לאפייה לשליחות. כל ילדה שנכנסת לסדנה — יוצאת ממנה אחרת. עם משהו שעשתה לבד, עם חיוך שלא עוזב ועם ביטחון שנשאר.'}</p>
    <p class="about-body"${E('about_tagline')}>${d.about_tagline || 'קבוצות קטנות, יחס שאי אפשר לקנות. כתבי לנו — ונמצא יחד את הסדנה שמתאימה לבת שלך.'}</p>
    <div style="margin-top:12px">
      <a class="btn-wa-hero" href="${wa}" target="_blank" rel="noopener noreferrer"
         aria-label="כתבי לנו ב-WhatsApp">${waIcon(15,'white')} בואי נדבר — כתבי לנו</a>
    </div>
  </div>
</section>

<!-- ═══ SERVICES — editorial rows ═══ -->
<section class="services-sec" id="services"${S('services')} aria-labelledby="services-heading">
  <div class="srv-atm-a" aria-hidden="true"></div>
  <div class="srv-atm-b" aria-hidden="true"></div>
  <div class="srv-editorial-intro">
    <div class="sec-label" aria-hidden="true">מה אנחנו מציעות</div>
    <div class="clip-h" style="margin-top:16px">
      <h2 class="srv-main-h2" id="services-heading"${E('services_heading')}>
        סדנה אחת —<br><em>והיא תזכור<br>אותה לתמיד</em>
      </h2>
    </div>
  </div>

  <div class="srv-cards-grid">
    <!-- 01 -->
    <article class="srv-card-v2 rv" id="chuggim" data-srv="chuggim" tabindex="0" role="button" aria-haspopup="dialog" aria-labelledby="srv-h3-1">
      <div class="srv-card-v2-top">
        <span class="srv-card-v2-num">01</span>
        <div class="srv-card-v2-icon" aria-hidden="true">🍰</div>
      </div>
      ${d.section1_badge ? `<span class="srv-row-badge" style="margin-bottom:12px">${d.section1_badge}</span>` : ''}
      <h3 class="srv-card-v2-title" id="srv-h3-1"${E('section1_title')}>${d.section1_title || 'חוגים שבועיים'}</h3>
      <p class="srv-card-v2-desc"${E('section1_desc')}>${d.section1_desc || 'כל שבוע, הבת שלך מגיעה הביתה עם עוגה שאפתה לבד — ועם ביטחון עצמי שגדל שיעור אחרי שיעור. קבוצות של 6 ילדות בלבד, כדי שכל אחת תרגיש שבאנו בשבילה.'}</p>
      ${d.section1_tags ? `<div class="srv-card-v2-tags">${(d.section1_tags||'').split(',').map(t=>`<span class="srv-card-v2-tag">${t.trim()}</span>`).join('')}</div>` : ''}
      <div class="srv-card-v2-footer">
        <span class="srv-card-v2-urgency">נותרו 2 מקומות</span>
        <a class="srv-card-v2-cta" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="שמרי מקום לחוג שבועי">${waIcon(13,'white')} שמרי מקום</a>
      </div>
    </article>

    <!-- 02 -->
    <article class="srv-card-v2 rv" id="private" data-srv="private" tabindex="0" role="button" aria-haspopup="dialog" aria-labelledby="srv-h3-2">
      <div class="srv-card-v2-top">
        <span class="srv-card-v2-num">02</span>
        <div class="srv-card-v2-icon" aria-hidden="true">🎂</div>
      </div>
      ${d.section2_badge ? `<span class="srv-row-badge" style="margin-bottom:12px">${d.section2_badge}</span>` : ''}
      <h3 class="srv-card-v2-title" id="srv-h3-2"${E('section2_title')}>${d.section2_title || 'סדנאות פרטיות'}</h3>
      <p class="srv-card-v2-desc"${E('section2_desc')}>${d.section2_desc || 'דמייני: הבת שלך ועוד 4 חברות, עטרות סינר ורוד, מקשטות עוגיות ביחד וצוחקות בלי הפסקה. מגיעות אליכן עם הכל — ויוצאות עם זיכרון לכל החיים.'}</p>
      ${d.section2_tags ? `<div class="srv-card-v2-tags">${(d.section2_tags||'').split(',').map(t=>`<span class="srv-card-v2-tag">${t.trim()}</span>`).join('')}</div>` : ''}
      <div class="srv-card-v2-footer">
        <span></span>
        <a class="srv-card-v2-cta" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="תיאום סדנה פרטית">${waIcon(13,'white')} בואי נתאם</a>
      </div>
    </article>

    <!-- 03 -->
    <article class="srv-card-v2 rv" id="orgs" data-srv="orgs" tabindex="0" role="button" aria-haspopup="dialog" aria-labelledby="srv-h3-3">
      <div class="srv-card-v2-top">
        <span class="srv-card-v2-num">03</span>
        <div class="srv-card-v2-icon" aria-hidden="true">🏢</div>
      </div>
      ${d.section3_badge ? `<span class="srv-row-badge" style="margin-bottom:12px">${d.section3_badge}</span>` : ''}
      <h3 class="srv-card-v2-title" id="srv-h3-3"${E('section3_title')}>${d.section3_title || 'סדנאות לארגונים'}</h3>
      <p class="srv-card-v2-desc"${E('section3_desc')}>${d.section3_desc || '100 ילדים בחדר אחד, כולם עסוקים ביצירה. אין מסכים, אין אי שקט — רק ריח אפייה, הצלחות קטנות וחיוכים גדולים. גיבוש שמדברים עליו חודשים אחרי.'}</p>
      ${d.section3_tags ? `<div class="srv-card-v2-tags">${(d.section3_tags||'').split(',').map(t=>`<span class="srv-card-v2-tag">${t.trim()}</span>`).join('')}</div>` : ''}
      <div class="srv-card-v2-footer">
        <span></span>
        <a class="srv-card-v2-cta" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="הצעת מחיר לארגון">${waIcon(13,'white')} הצעת מחיר</a>
      </div>
    </article>

    <!-- 04 -->
    <article class="srv-card-v2 rv" id="marathon" data-srv="marathon" tabindex="0" role="button" aria-haspopup="dialog" aria-labelledby="srv-h3-4">
      <div class="srv-card-v2-top">
        <span class="srv-card-v2-num">04</span>
        <div class="srv-card-v2-icon" aria-hidden="true">🏆</div>
      </div>
      ${d.section4_badge ? `<span class="srv-row-badge" style="margin-bottom:12px">${d.section4_badge}</span>` : ''}
      <h3 class="srv-card-v2-title" id="srv-h3-4"${E('section4_title')}>${d.section4_title || 'מרתון אפייה לנערות'}</h3>
      <p class="srv-card-v2-desc"${E('section4_desc')}>${d.section4_desc || '5 מפגשים של 5 שעות — הקיץ הזה הנערות שלך הופכות לקונדיטוריות אמיתיות. פחזניות, עוגות רולדה, שמרים ועוד. כל מפגש יצירה שיוצאת הביתה.'}</p>
      ${d.section4_tags ? `<div class="srv-card-v2-tags">${(d.section4_tags||'').split(',').map(t=>`<span class="srv-card-v2-tag">${t.trim()}</span>`).join('')}</div>` : ''}
      <div class="srv-card-v2-footer">
        <span class="srv-card-v2-urgency">מסלול קיץ — מוגבל</span>
        <a class="srv-card-v2-cta" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="שמרי מקום במרתון">${waIcon(13,'white')} שמרי מקום</a>
      </div>
    </article>
  </div>
</section>

<!-- WhatsApp message config (read by lalag-init.js) -->
<div id="srv-wa-cfg" hidden
  data-wa="${wa.split('?')[0]}"
  data-msg-chuggim="${d.wa_msg_1 || 'היי זהבה! אני מעוניינת לשמוע על חוגים שבועיים לבתי 🎂'}"
  data-msg-private="${d.wa_msg_2 || 'היי זהבה! אני מעוניינת לתאם סדנה פרטית 🎉'}"
  data-msg-orgs="${d.wa_msg_3 || 'היי זהבה! אני מעוניינת לקבל הצעת מחיר לסדנה לארגון שלנו 🏢'}"
  data-msg-marathon="${d.wa_msg_4 || 'היי זהבה! אני מעוניינת לשמוע על מרתון האפייה לנערות בחופש הגדול 🏆'}"
></div>

<!-- ═══ GALLERY — Instagram Native ═══ -->
<section class="gallery-sec" id="gallery" aria-labelledby="gallery-heading">

  <!-- Header -->
  <div class="gallery-hd rv">
    <div class="gallery-sec-label" aria-hidden="true">גלריה</div>
    <h2 class="gallery-h2" id="gallery-heading"${E('gallery_heading')}>${d.gallery_heading || 'תראי מה קורה בסדנאות שלנו'}</h2>
    <p class="gallery-sub"${E('gallery_sub')}>${d.gallery_sub || 'כל תמונה כאן — ילדה שגילתה שהיא יכולה. הצטרפי אלינו.'}</p>
  </div>

  <!-- Instagram Profile Bar -->
  <div class="ig-profile-bar rv">
    <div class="ig-profile-avatar" aria-hidden="true">
      <div class="ig-profile-avatar-inner">
        <img src="/lalag-logo.png" alt="lalag & more logo" />
      </div>
    </div>
    <div class="ig-profile-info">
      <div class="ig-handle-row">
        <span class="ig-handle">@${igHandle}</span>
        <span class="ig-verified" aria-label="verified" aria-hidden="true">✓</span>
      </div>
      <div class="ig-bio">סדנאות, קורסים וחוגי אפייה לכל המשפחה ובכל הארץ! כשר למהדרין 🎂</div>
      <div class="ig-stats-row" aria-label="סטטיסטיקות אינסטגרם">
        <span><span class="ig-stat-n">23</span><span class="ig-stat-l">פוסטים</span></span>
        <span><span class="ig-stat-n">40</span><span class="ig-stat-l">עוקבים</span></span>
        <span><span class="ig-stat-n">110</span><span class="ig-stat-l">עוקב</span></span>
      </div>
    </div>
    <a class="ig-follow-btn" href="${ig}" target="_blank" rel="noopener noreferrer"
       aria-label="עקבו אחרינו באינסטגרם — lalag.and.more">
      ${igIcon(15)} עקבו אחרינו
    </a>
  </div>

  <!-- Bento Grid -->
  <div class="ig-bento" role="list" aria-label="גלריית תמונות וסרטונים">

    <!-- Featured: Video 1 (tall, rows 1-2) -->
    <div class="ig-card-feat" role="listitem" aria-label="ריל — חוג אפייה לילדות">
      <video class="ig-media-video"
             data-src="/WhatsApp%20Video%202026-06-26%20at%2011.55.29.mp4"
             autoplay muted loop playsinline preload="none"
             aria-hidden="true"></video>
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-play-circle">▶</div>
        <div class="ig-engagement">
          <span>❤️ 284</span>
          <span>💬 31</span>
        </div>
      </div>
      <div class="ig-reel-badge" aria-hidden="true">🎬</div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">חוג אפייה לילדות 🍰</div>
      </div>
    </div>

    <!-- Small sq: Image 1 -->
    <div class="ig-card-sq" role="listitem" aria-label="תמונה מסדנת אפייה">
      <img class="ig-media" src="/lalag-new-1.png" alt="סדנת אפייה — lalag & more" loading="lazy" />
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-engagement">
          <span>❤️ 196</span>
          <span>💬 18</span>
        </div>
      </div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">יצירות מהסדנה ✨</div>
      </div>
    </div>

    <!-- Small sq: Image 2 -->
    <div class="ig-card-sq" role="listitem" aria-label="תמונה מסדנת אפייה">
      <img class="ig-media" src="/lalag-new-2.png" alt="קאפקייקס מסדנת lalag & more" loading="lazy" />
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-engagement">
          <span>❤️ 312</span>
          <span>💬 42</span>
        </div>
      </div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">קאפקייקס צבעוניים 🎨</div>
      </div>
    </div>

    <!-- Small sq: Video 2 -->
    <div class="ig-card-sq" role="listitem" aria-label="ריל — מרתון אפייה">
      <video class="ig-media-video"
             data-src="/WhatsApp%20Video%202026-06-26%20at%2011.55.30.mp4"
             autoplay muted loop playsinline preload="none"
             aria-hidden="true"></video>
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-play-circle">▶</div>
        <div class="ig-engagement">
          <span>❤️ 441</span>
          <span>💬 57</span>
        </div>
      </div>
      <div class="ig-reel-badge" aria-hidden="true">🎬</div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">מרתון אפייה 🔥</div>
      </div>
    </div>

    <!-- Small sq: Image 3 -->
    <div class="ig-card-sq" role="listitem" aria-label="תמונה מסדנת אפייה">
      <img class="ig-media" src="/lalag-new-3.png" alt="עיצוב עוגות — lalag & more" loading="lazy" />
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-engagement">
          <span>❤️ 523</span>
          <span>💬 64</span>
        </div>
      </div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">עיצוב עוגות 🎂</div>
      </div>
    </div>

    <!-- Wide cinematic strip: Video 3 -->
    <div class="ig-card-wide" role="listitem" aria-label="ריל — סדנה לארגונים">
      <video class="ig-media-video"
             data-src="/WhatsApp%20Video%202026-06-26%20at%2011.55.30%20(1).mp4"
             autoplay muted loop playsinline preload="none"
             aria-hidden="true"></video>
      <div class="ig-overlay" aria-hidden="true"></div>
      <div class="ig-hover-overlay" aria-hidden="true">
        <div class="ig-play-circle">▶</div>
        <div class="ig-engagement">
          <span>❤️ 388</span>
          <span>💬 46</span>
        </div>
      </div>
      <div class="ig-reel-badge" aria-hidden="true">🎬</div>
      <div class="ig-card-bottom" aria-hidden="true">
        <div class="ig-card-title">סדנה לארגון — 60 ילדות, חוויה אחת 🏢</div>
      </div>
    </div>

  </div>

  <!-- CTA -->
  <div class="ig-cta-row rv">
    <a class="ig-cta-link" href="${ig}" target="_blank" rel="noopener noreferrer"
       aria-label="עוד תוכן ורילסים באינסטגרם שלנו">
      ${igIcon(16)} עוד תוכן ורילסים ←
    </a>
  </div>

</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="testimonials-sec" id="testimonials"${S('testimonials')} aria-labelledby="testimonials-heading">
  <div class="test-atm-a" aria-hidden="true"></div>
  <div class="test-atm-b" aria-hidden="true"></div>
  <div class="t-header rv">
    <div class="t-stars-strip" aria-label="דירוג ממוצע 5 כוכבים מ-500 ביקורות">
      <span class="t-star" aria-hidden="true">★</span>
      <span class="t-star" aria-hidden="true">★</span>
      <span class="t-star" aria-hidden="true">★</span>
      <span class="t-star" aria-hidden="true">★</span>
      <span class="t-star" aria-hidden="true">★</span>
      <span class="t-star-count">500+ אמהות כבר בחרו בנו</span>
    </div>
    <div class="sec-label" style="justify-content:center" aria-hidden="true">מה אמהות כמוך אומרות</div>
    <div class="clip-h"><h2 class="sec-h2" id="testimonials-heading">הן<br><span class="ac">כבר בחרו</span></h2></div>
    <p style="text-align:center;color:var(--muted);font-size:13px;margin-top:8px;opacity:.7">ביקורות אמיתיות מוואטסאפ — לא ערכנו ולא סיננו 💬</p>
  </div>

  ${renderTracks(d.testimonials)}
</section>

<!-- ═══ HOW — editorial vertical journey ═══ -->
<section class="how-sec" aria-labelledby="how-heading">
  <div class="how-atm" aria-hidden="true"></div>

  <div class="how-editorial-top">
    <div>
      <div class="sec-label" aria-hidden="true">איך מתחילים?</div>
      <div class="clip-h" style="margin-top:18px">
        <h2 class="how-editorial-h2" id="how-heading">
          מהודעה<br>אחת —<br><em>לרגע<br>שתזכרי</em>
        </h2>
      </div>
    </div>
    <div class="how-editorial-side">
      <p>תהליך פשוט. ללא טפסים, ללא ביורוקרטיה. רק אמא שרוצה משהו מיוחד לבת שלה — ואנחנו שנהפוך את זה לרגע שהיא תספר עליו שנים.</p>
    </div>
  </div>

  <div class="how-journey" aria-label="שלבי ההרשמה">
    <div class="how-journey-line" aria-hidden="true"></div>

    <div class="how-journey-step rv">
      <div class="how-j-dot" aria-hidden="true"></div>
      <div class="how-j-num" aria-hidden="true">01</div>
      <div class="how-j-body">
        <h3${E('how1_title')}>${d.how1_title||'כותבת לנו'}</h3>
        <p${E('how1_desc')}>${d.how1_desc||'הודעה אחת בוואטסאפ — זהו. לא טפסים, לא שאלונים, לא המתנה. עונות תוך שעות ספורות.'}</p>
      </div>
    </div>

    <div class="how-journey-step rv">
      <div class="how-j-dot" aria-hidden="true"></div>
      <div class="how-j-num" aria-hidden="true">02</div>
      <div class="how-j-body">
        <h3${E('how2_title')}>${d.how2_title||'בוחרות יחד'}</h3>
        <p${E('how2_desc')}>${d.how2_desc||'תגידי לנו גיל, מועד מועדף ומה מתחשק — ואנחנו נמצא את הסדנה המושלמת עבורך.'}</p>
      </div>
    </div>

    <div class="how-journey-step rv">
      <div class="how-j-dot" aria-hidden="true"></div>
      <div class="how-j-num" aria-hidden="true">03</div>
      <div class="how-j-body">
        <h3${E('how3_title')}>${d.how3_title||'שומרת מקום'}</h3>
        <p${E('how3_desc')}>${d.how3_desc||'המקומות מוגבלים — מקום שמור רק אחרי אישור. ממליצות לא לחכות יותר מדי.'}</p>
      </div>
    </div>

    <div class="how-journey-step rv">
      <div class="how-j-dot" aria-hidden="true"></div>
      <div class="how-j-num" aria-hidden="true">04</div>
      <div class="how-j-body">
        <h3${E('how4_title')}>${d.how4_title||'הרגע שתזכרי'}</h3>
        <p${E('how4_desc')}>${d.how4_desc||'הבת שלך בסינר, עיניים זורחות — מחזיקה בגאווה את מה שאפתה לבד. זה הרגע שאנחנו עובדות בשבילו.'}</p>
      </div>
    </div>

  </div>
</section>

<!-- ═══ FAQ — editorial single column ═══ -->
<section class="faq-sec" aria-labelledby="faq-heading"${S('faq')}>
  <div class="faq-atm" aria-hidden="true"></div>

  <div class="faq-editorial-header">
    <div>
      <div class="sec-label" aria-hidden="true">שאלות</div>
      <div class="clip-h" style="margin-top:18px">
        <h2 class="faq-editorial-h2" id="faq-heading">
          שאלות<br><em>שכולן<br>שואלות</em>
        </h2>
      </div>
    </div>
    <div class="faq-editorial-right">
      <p>כל מה שרצית לדעת — לפני שכתבת לנו. ואם יש לך שאלה שלא כאן, הכי קל פשוט לשלוח הודעה.</p>
    </div>
  </div>

  <div class="faq-editorial-list" role="list">
    ${renderFaqEditorial(d.faq_items, wa)}
  </div>

  <div class="faq-editorial-cta-row">
    <a class="faq-editorial-cta-link" href="${wa}" target="_blank" rel="noopener noreferrer"
       aria-label="שאלות נוספות? כתבי לנו ב-WhatsApp">
      ${waIcon(13,'#F0516A')} יש לך שאלה אחרת? כתבי לנו ישירות ←
    </a>
  </div>

</section>

<!-- ═══ CTA — dramatic dark editorial ═══ -->
<section class="cta-sec" aria-labelledby="cta-heading">
  <div class="cta-orb-a" aria-hidden="true"></div>
  <div class="cta-orb-b" aria-hidden="true"></div>
  <div class="cta-orb-c" aria-hidden="true"></div>

  <div class="cta-editorial-inner">
    <div class="cta-editorial-eyebrow" aria-hidden="true">מוכנה להצטרף?</div>

    <div class="clip-h">
      <h2 class="cta-editorial-h2" id="cta-heading"${E('cta_heading')}>
        נשארו<br><em>2 מקומות</em><br>בחוג יולי
      </h2>
    </div>

    <p class="cta-editorial-sub"${E('cta_sub')}>${d.cta_sub||'פנייה ללא התחייבות. עונות תוך שעות.'}</p>

    <a class="cta-editorial-btn" href="${wa}" target="_blank" rel="noopener noreferrer" data-mag
       aria-label="שמרי מקום עכשיו — שלחי הודעת WhatsApp">
      ${waIcon(16,'white')} שמרי מקום עכשיו
    </a>

    <div class="cta-editorial-divider" aria-hidden="true"></div>
    <p class="cta-editorial-note" aria-label="500 ילדות, 3 שנות ניסיון, 100 אחוז חוזרות">
      500+ ילדות · 3 שנות ניסיון · 100% חוזרות
    </p>
  </div>
</section>

</main><!-- /main-content -->

<!-- ═══ SERVICE DETAIL MODAL ═══ -->
<div id="srv-modal" role="dialog" aria-modal="true" aria-labelledby="srv-modal-title">
  <button class="srv-modal-close" id="srv-modal-close" aria-label="סגור חלונית">✕</button>
  <div class="srv-modal-bg">
    <video class="srv-modal-video" id="srv-modal-video" autoplay muted loop playsinline></video>
    <div class="srv-modal-veil"></div>
  </div>
  <div class="srv-modal-scroll">
    <div class="srv-modal-content">
      <span class="srv-modal-icon" id="srv-modal-icon"></span>
      <span class="srv-modal-lbl" id="srv-modal-lbl"></span>
      <h2 class="srv-modal-title" id="srv-modal-title"></h2>
      <p class="srv-modal-desc" id="srv-modal-desc"></p>
      <div class="srv-modal-tags" id="srv-modal-tags"></div>
      <div class="srv-modal-details" id="srv-modal-details"></div>
      <div class="srv-modal-cta-wrap">
        <a class="srv-modal-cta" id="srv-modal-cta" href="${wa}" target="_blank" rel="noopener noreferrer">
          ${waIcon(14,'white')} שמרי מקום עכשיו
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Floating WA button — mobile only (hidden on desktop via CSS) -->
<a class="float-wa" href="${wa}" target="_blank" rel="noopener noreferrer"
   aria-label="שלחי לנו הודעה ב-WhatsApp" title="כתבי לנו ב-WhatsApp">${waIcon(24,'white')}</a>

<!-- ═══ FOOTER ═══ -->
<footer role="contentinfo" aria-label="פוטר — lalag & more">
  <div class="footer-grid">
    <div class="f-brand">
      <img class="footer-logo-img" src="/lalag-7.png" alt="lalag & more" />
      <p${E('footer_desc')}>${d.footer_desc||'סדנאות אפייה בקריות. מקום שבו ילדות מגלות ביטחון עצמי — ולוקחות הביתה יצירה שאפתה לבד.'}</p>
    </div>
    <nav class="f-col" aria-label="ניווט סדנאות">
      <h3>סדנאות</h3>
      <ul>
        <li><a href="#chuggim">חוגים שבועיים</a></li>
        <li><a href="#private">סדנאות פרטיות</a></li>
        <li><a href="#orgs">סדנאות לארגונים</a></li>
      </ul>
    </nav>
    <nav class="f-col" aria-label="ניווט מהיר">
      <h3>קישורים</h3>
      <ul>
        <li><a href="#about">אודות</a></li>
        <li><a href="#testimonials">ביקורות</a></li>
        <li><a href="${ig}" target="_blank" rel="noopener noreferrer">אינסטגרם</a></li>
      </ul>
    </nav>
    <div class="f-col f-contact">
      <h3>צרו קשר</h3>
      <a href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="שלח הודעת WhatsApp — ${phone}">${waIcon(13,'rgba(255,255,255,.62)')} ${phone}</a>
      <a href="${ig}" target="_blank" rel="noopener noreferrer" aria-label="עמוד האינסטגרם של lalag & more">${igIcon(13)} <span dir="ltr">@${igHandle}</span></a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 lalag &amp; more</span><span aria-hidden="true">·</span><span>כל הזכויות שמורות</span><span aria-hidden="true">·</span><span>טעמים ללא גבולות</span>
  </div>
</footer>
`
}

export default function LandingPageView({ data, editMode }: { data: LandingData; editMode?: boolean }) {
  useEffect(() => {
    if (editMode) {
      if (document.querySelector('script[data-lalag-editor]')) return
      const s = document.createElement('script')
      s.src = '/lalag-editor.js'
      s.setAttribute('data-lalag-editor', '1')
      document.body.appendChild(s)
      return
    }
    if (document.querySelector('script[data-lalag]')) return
    const load = (src: string, cb?: () => void) => {
      const s = document.createElement('script')
      s.src = src
      if (cb) s.onload = cb
      document.head.appendChild(s)
    }
    // Load GSAP → ScrollTrigger → our init (guarantees globals exist)
    load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', () => {
      load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', () => {
        const s = document.createElement('script')
        s.setAttribute('data-lalag', '1')
        s.src = '/lalag-init.js?v=10'
        document.body.appendChild(s)
      })
    })
  }, [editMode])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS + (editMode ? EDIT_CSS : '') }} />
      <div dangerouslySetInnerHTML={{ __html: getHTML(data, editMode) }} />
    </>
  )
}
