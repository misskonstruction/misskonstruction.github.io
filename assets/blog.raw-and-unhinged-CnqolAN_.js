import{d as p,j as e,L,f as N,B as T}from"./index-R6Piydid.js";import{S as O,X as R}from"./SiteLayout-CaDJIrub.js";import{f as C,a as y,r as M}from"./rawUnhingedEntries-DXF66RW_.js";import{A as F}from"./arrow-left-DMPOxOh8.js";import{A as I}from"./arrow-right-DlvklaI-.js";const j="/assets/paper-texture-IL-84V4t.jpg";function v(r){return r.kind==="entry-image"||r.kind==="right-photos"||r.kind==="scrapbook"?r.entry:null}function B(r){const a=[{kind:"toc",entries:r},{kind:"title"}];for(const t of r){const o=t.entryImages.length;t.entryImages.forEach((s,i)=>{a.push({kind:"entry-image",entry:t,pageOfEntry:i,totalPagesInEntry:o})}),t.rightPagePhotos&&t.rightPagePhotos.length>0&&a.push({kind:"right-photos",entry:t}),t.finalPagePhotos&&t.finalPagePhotos.length>0&&a.push({kind:"scrapbook",entry:t})}return a}function J(r){const a=B(r),t=[];for(let o=0;o<a.length;o+=2)t.push({left:a[o],right:a[o+1]??{kind:"blank"}});return t}function k(r,a){return r.findIndex(t=>v(t.left)?.id===a||v(t.right)?.id===a)}function te(){const[r,a]=p.useState(!1);return e.jsxs(O,{children:[e.jsx("style",{children:K}),e.jsxs("section",{className:"relative ru-stage",children:[e.jsxs(L,{to:"/blog",className:"absolute top-4 left-4 z-30 inline-flex items-center gap-2 text-amber-100/80 hover:text-amber-100 transition-colors text-sm",style:{fontFamily:"var(--font-journal)"},children:[e.jsx(F,{className:"h-4 w-4"}),"The Journal"]}),e.jsxs("div",{className:"absolute top-4 right-4 z-30 text-right",children:[e.jsx("p",{className:"text-amber-200/90 text-2xl md:text-3xl leading-none",style:{fontFamily:"var(--font-hand)"},children:"ink on paper —"}),e.jsx("h1",{className:"text-amber-50 text-3xl md:text-5xl mt-1",style:{fontFamily:"var(--font-journal)",fontWeight:400},children:e.jsx("em",{className:"text-amber-300",children:"Raw & Unhinged"})})]}),e.jsxs("div",{className:"relative w-full ru-scene",children:[e.jsx("img",{src:N,alt:"Overhead view of a writer's desk at evening with a rose-leather journal, candle, tea, fountain pen, vintage camera, sleeping ginger cat, plant, and an ocean sunset through a window",className:"block w-full h-auto",width:1536,height:1024}),e.jsx(W,{}),e.jsx(A,{}),e.jsx(G,{}),e.jsxs("button",{type:"button",onClick:()=>a(!0),"aria-label":"Open the journal",className:"ru-journal-hotspot group",children:[e.jsx("span",{className:"ru-journal-glow","aria-hidden":"true"}),e.jsxs("span",{className:"ru-journal-hint",style:{fontFamily:"var(--font-hand)"},children:[e.jsx(T,{className:"h-4 w-4 inline-block mr-1.5"}),"click to open"]})]})]}),e.jsx("div",{className:"container mx-auto px-4 py-8 md:py-10 text-center",children:e.jsx("p",{className:"max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed",style:{fontFamily:"var(--font-journal)",fontStyle:"italic"},children:"What you see here is exactly what I wrote — photographed straight from the page. Click the journal to turn through it."})})]}),r&&e.jsx(X,{onClose:()=>a(!1)})]})}function W(){return e.jsxs("div",{className:"ru-flame","aria-hidden":"true",children:[e.jsx("div",{className:"ru-flame-halo"}),e.jsxs("svg",{viewBox:"0 0 40 70",width:"40",height:"70",className:"ru-flame-svg",children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"ruFlameGrad",cx:"50%",cy:"65%",r:"55%",children:[e.jsx("stop",{offset:"0%",stopColor:"#fff8d6"}),e.jsx("stop",{offset:"35%",stopColor:"#ffd47a"}),e.jsx("stop",{offset:"70%",stopColor:"#f59a2a"}),e.jsx("stop",{offset:"100%",stopColor:"#9a3a05",stopOpacity:"0.6"})]}),e.jsxs("radialGradient",{id:"ruFlameCore",cx:"50%",cy:"75%",r:"35%",children:[e.jsx("stop",{offset:"0%",stopColor:"#7ec8ff",stopOpacity:"0.9"}),e.jsx("stop",{offset:"100%",stopColor:"#7ec8ff",stopOpacity:"0"})]})]}),e.jsx("path",{className:"ru-flame-outer",d:"M20 68 C 6 60, 4 38, 20 4 C 36 38, 34 60, 20 68 Z",fill:"url(#ruFlameGrad)"}),e.jsx("ellipse",{className:"ru-flame-core",cx:"20",cy:"56",rx:"5",ry:"9",fill:"url(#ruFlameCore)"})]})]})}function A(){return e.jsxs("div",{className:"ru-wax","aria-hidden":"true",children:[e.jsx("span",{className:"ru-wax-glow ru-wax-glow--1"}),e.jsx("span",{className:"ru-wax-glow ru-wax-glow--2"})]})}function G(){return e.jsxs("div",{className:"ru-steam","aria-hidden":"true",children:[e.jsxs("svg",{className:"ru-steam-wisp ru-steam-wisp--1",viewBox:"0 0 20 100",preserveAspectRatio:"none",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"ruSteamGrad",x1:"0",y1:"1",x2:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"rgba(255,245,230,0)"}),e.jsx("stop",{offset:"20%",stopColor:"rgba(255,245,230,0.45)"}),e.jsx("stop",{offset:"70%",stopColor:"rgba(255,240,220,0.18)"}),e.jsx("stop",{offset:"100%",stopColor:"rgba(255,235,210,0)"})]})}),e.jsx("path",{d:"M10 100 C 4 82, 16 64, 10 46 C 4 28, 16 14, 10 0",fill:"none",stroke:"url(#ruSteamGrad)",strokeWidth:"1.4",strokeLinecap:"round"})]}),e.jsx("svg",{className:"ru-steam-wisp ru-steam-wisp--2",viewBox:"0 0 20 100",preserveAspectRatio:"none",children:e.jsx("path",{d:"M10 100 C 16 82, 4 64, 10 46 C 16 28, 4 14, 10 0",fill:"none",stroke:"url(#ruSteamGrad)",strokeWidth:"1.1",strokeLinecap:"round"})}),e.jsx("svg",{className:"ru-steam-wisp ru-steam-wisp--3",viewBox:"0 0 20 100",preserveAspectRatio:"none",children:e.jsx("path",{d:"M10 100 C 5 80, 15 60, 10 42 C 5 24, 13 12, 10 0",fill:"none",stroke:"url(#ruSteamGrad)",strokeWidth:"0.9",strokeLinecap:"round"})}),e.jsx("svg",{className:"ru-steam-wisp ru-steam-wisp--4",viewBox:"0 0 20 100",preserveAspectRatio:"none",children:e.jsx("path",{d:"M10 100 C 14 84, 6 66, 10 48 C 14 30, 6 14, 10 0",fill:"none",stroke:"url(#ruSteamGrad)",strokeWidth:"1.2",strokeLinecap:"round"})}),e.jsx("svg",{className:"ru-steam-wisp ru-steam-wisp--5",viewBox:"0 0 20 100",preserveAspectRatio:"none",children:e.jsx("path",{d:"M10 100 C 7 78, 13 58, 10 40 C 7 22, 12 10, 10 0",fill:"none",stroke:"url(#ruSteamGrad)",strokeWidth:"1.0",strokeLinecap:"round"})})]})}function X({onClose:r}){const a=p.useMemo(()=>J(M),[]),[t,o]=p.useState(0),[s,i]=p.useState(null),[d,l]=p.useState(!1);p.useEffect(()=>{const n=window.setTimeout(()=>l(!0),50);return()=>window.clearTimeout(n)},[]);const m=a.length,x=typeof window<"u"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,c=p.useCallback(n=>{if(s)return;const u=n==="next"?t+1:t-1;if(!(u<0||u>=m)){if(x){o(u);return}i({direction:n,fromIndex:t}),window.setTimeout(()=>{o(u),i(null)},750)}},[s,t,m,x]),b=p.useCallback(n=>{if(n===t||s)return;if(x){o(n);return}const u=n>t?"next":"prev";i({direction:u,fromIndex:t}),window.setTimeout(()=>{o(n),i(null)},750)},[s,t,x]);p.useEffect(()=>{const n=u=>{u.key==="Escape"&&r(),u.key==="ArrowRight"&&c("next"),u.key==="ArrowLeft"&&c("prev")};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[r,c]);const f=a[t],g=a[t+1],w=a[t-1],E=s?.direction==="prev"?w??f:f,Y=s?.direction==="next"?g??f:f;return e.jsxs("div",{className:"fixed inset-0 z-[80] ru-overlay flex flex-col items-center justify-center p-4 md:p-8",role:"dialog","aria-modal":"true","aria-label":"Raw and Unhinged journal",children:[e.jsx("button",{type:"button",onClick:r,className:"absolute top-4 right-4 z-10 text-amber-100 hover:text-amber-300 transition-colors","aria-label":"Close journal",children:e.jsx(R,{className:"h-7 w-7"})}),e.jsxs("p",{className:"absolute top-5 left-5 z-10 text-amber-100/70 text-sm",style:{fontFamily:"var(--font-journal)",fontStyle:"italic"},children:["spread ",t+1," of ",m]}),e.jsx($,{spreads:a,currentIndex:t,onJump:b}),e.jsx("div",{className:`ru-book ${d?"is-opened":""}`,children:e.jsxs("div",{className:"ru-book-inner",children:[e.jsx("div",{className:"ru-page ru-page-left",children:e.jsx(h,{leaf:E.left,side:"left",onJumpToEntry:n=>b(k(a,n))})}),e.jsx("div",{className:"ru-page ru-page-right",children:e.jsx(h,{leaf:Y.right,side:"right",onJumpToEntry:n=>b(k(a,n))})}),s?.direction==="next"&&g&&e.jsxs("div",{className:"ru-flip ru-flip-next",children:[e.jsx("div",{className:"ru-flip-face ru-flip-front",children:e.jsx(h,{leaf:f.right,side:"right",onJumpToEntry:()=>{}})}),e.jsx("div",{className:"ru-flip-face ru-flip-back",children:e.jsx(h,{leaf:g.left,side:"left",onJumpToEntry:()=>{}})})]}),s?.direction==="prev"&&w&&e.jsxs("div",{className:"ru-flip ru-flip-prev",children:[e.jsx("div",{className:"ru-flip-face ru-flip-front",children:e.jsx(h,{leaf:f.left,side:"left",onJumpToEntry:()=>{}})}),e.jsx("div",{className:"ru-flip-face ru-flip-back",children:e.jsx(h,{leaf:w.right,side:"right",onJumpToEntry:()=>{}})})]}),e.jsx("button",{type:"button",className:"ru-turn ru-turn-prev",onClick:()=>c("prev"),disabled:t===0||!!s,"aria-label":"Previous page",children:e.jsx(F,{className:"h-5 w-5"})}),e.jsx("button",{type:"button",className:"ru-turn ru-turn-next",onClick:()=>c("next"),disabled:t>=m-1||!!s,"aria-label":"Next page",children:e.jsx(I,{className:"h-5 w-5"})})]})}),e.jsx("p",{className:"mt-4 text-amber-100/60 text-xs",style:{fontFamily:"var(--font-journal)",fontStyle:"italic"},children:"Use the arrows, the keyboard ← →, or pull the ribbon to jump to any entry."})]})}function $({spreads:r,currentIndex:a,onJump:t}){const[o,s]=p.useState(!1),i=new Set,d=[];return r.forEach((l,m)=>{for(const x of[l.left,l.right]){const c=v(x);!c||i.has(c.id)||x.kind==="entry-image"&&x.pageOfEntry===0&&(i.add(c.id),d.push({entry:c,i:m}))}}),e.jsxs("div",{className:"ru-ribbon-wrap",children:[e.jsxs("button",{type:"button",onClick:()=>s(l=>!l),className:"ru-ribbon","aria-label":"Open entry menu","aria-expanded":o,children:[e.jsx("span",{className:"ru-ribbon-cloth"}),e.jsx("span",{className:"ru-ribbon-tassel"})]}),o&&e.jsxs("div",{className:"ru-ribbon-menu",style:{fontFamily:"var(--font-journal)"},children:[e.jsx("p",{className:"text-amber-900/80 text-xs uppercase tracking-widest mb-2",children:"Jump to"}),e.jsx("button",{type:"button",onClick:()=>{t(0),s(!1)},className:`block w-full text-left px-2 py-1.5 rounded hover:bg-amber-900/10 ${a===0?"text-amber-900 font-medium":"text-amber-950/80"}`,children:"Table of Contents"}),e.jsx("div",{className:"my-2 h-px bg-amber-900/20"}),e.jsx("ul",{className:"space-y-0.5 max-h-72 overflow-y-auto pr-1",children:d.map(({entry:l,i:m})=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:()=>{t(m),s(!1)},className:`block w-full text-left px-2 py-1.5 rounded hover:bg-amber-900/10 ${a===m?"text-amber-900 font-medium":"text-amber-950/80"}`,children:[e.jsx("span",{className:"text-xs text-amber-900/60 mr-2",children:C(l.date)}),l.title]})},l.id))})]})]})}function h({leaf:r,side:a,onJumpToEntry:t}){switch(r.kind){case"toc":return e.jsx(U,{entries:r.entries,onJump:t});case"title":return e.jsx(D,{});case"entry-image":return e.jsx(V,{entry:r.entry,image:r.entry.entryImages[r.pageOfEntry],pageNumber:r.pageOfEntry+1,totalPages:r.totalPagesInEntry});case"right-photos":return e.jsx(Z,{entry:r.entry,photos:r.entry.rightPagePhotos??[]});case"scrapbook":return e.jsx(S,{photos:r.entry.finalPagePhotos??[],videoShort:r.entry.videoShort});default:return e.jsx(P,{note:r.kind==="blank"?r.note:void 0})}}function U({entries:r,onJump:a}){return e.jsxs("div",{className:"ru-page-inner ru-paper",children:[e.jsxs("header",{className:"text-center mb-6",children:[e.jsx("p",{className:"ru-script-sm",children:"Table of"}),e.jsx("h2",{className:"ru-script-lg",children:"Contents"}),e.jsx("div",{className:"mx-auto mt-3 h-px w-12 bg-amber-900/40"})]}),r.length===0?e.jsx("p",{className:"ru-body text-center italic mt-12",children:"No entries yet."}):e.jsx("ul",{className:"space-y-3",children:r.map(t=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:()=>a(t.id),className:"group w-full text-left flex items-baseline gap-3",children:[e.jsx("span",{className:"ru-body text-amber-900/70 whitespace-nowrap text-sm",children:C(t.date)}),e.jsx("span",{className:"flex-1 border-b border-dotted border-amber-900/30 translate-y-[-3px]"}),e.jsx("span",{className:"ru-body text-amber-950 group-hover:text-amber-700 transition-colors",children:t.title})]})},t.id))}),e.jsx("p",{className:"ru-script-xs mt-10 text-center text-amber-900/50",children:"— click any line to flip there —"})]})}function D(){return e.jsxs("div",{className:"ru-page-inner ru-paper flex flex-col items-center justify-center text-center",children:[e.jsx("p",{className:"ru-script-sm mb-2",children:"the journal of"}),e.jsx("h2",{className:"ru-script-xl",children:"Raw & Unhinged"}),e.jsx("div",{className:"mt-4 mb-6 h-px w-16 bg-amber-900/40"}),e.jsx("p",{className:"ru-body italic max-w-[28ch]",children:"Pages photographed straight from the page. Nothing typed up, nothing tidied."}),e.jsx("p",{className:"ru-script-sm mt-10",children:"— Cami"})]})}function V({entry:r,image:a,pageNumber:t,totalPages:o}){return e.jsxs("div",{className:"ru-page-inner ru-paper flex flex-col",children:[e.jsxs("header",{className:"flex items-baseline justify-between mb-3",children:[t===1?e.jsx("p",{className:"ru-script-sm text-amber-900/80",children:y(r.date)}):e.jsx("span",{"aria-hidden":"true"}),o>1&&e.jsxs("p",{className:"ru-body text-xs text-amber-900/60",children:["page ",t," of ",o]})]}),e.jsx("div",{className:"relative flex-1 min-h-0 flex items-center justify-center pb-[calc((1em+0.75rem)/2)]",children:e.jsxs("span",{className:"ru-photo-mount relative inline-flex h-full max-w-full items-center justify-center",children:[e.jsx("img",{src:a.src,alt:a.alt,className:"block h-full w-auto max-w-full object-contain ru-photo",loading:"lazy"}),e.jsx("span",{className:"ru-corner ru-corner-tl"}),e.jsx("span",{className:"ru-corner ru-corner-tr"}),e.jsx("span",{className:"ru-corner ru-corner-bl"}),e.jsx("span",{className:"ru-corner ru-corner-br"})]})})]})}function Z({entry:r,photos:a}){return a.length===0?e.jsx(P,{}):a.length===1?e.jsxs("div",{className:"ru-page-inner ru-paper flex flex-col",children:[e.jsx("header",{className:"text-right mb-3",children:e.jsx("p",{className:"ru-script-sm text-amber-900/70",children:y(r.date)})}),e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsx(z,{children:e.jsx("img",{src:a[0].src,alt:a[0].alt,className:"block max-h-full max-w-full object-contain ru-photo",loading:"lazy"})})})]}):e.jsx(S,{photos:a,dateLabel:y(r.date),videoShort:r.videoShort})}function P({note:r}={}){return e.jsx("div",{className:"ru-page-inner ru-paper flex flex-col",children:e.jsx("div",{className:"flex-1 flex items-center justify-center",children:r?e.jsx("p",{className:"ru-script-sm text-amber-900/40",children:r}):e.jsx("p",{className:"ru-script-xs text-amber-900/30"})})})}function S({photos:r,dateLabel:a,videoShort:t}){const o=[{top:"4%",left:"6%",w:"55%",rot:-4},{top:"14%",left:"42%",w:"52%",rot:3.5},{top:"48%",left:"3%",w:"48%",rot:2},{top:"52%",left:"44%",w:"54%",rot:-3},{top:"30%",left:"22%",w:"50%",rot:1},{top:"66%",left:"26%",w:"48%",rot:-2}];return e.jsxs("div",{className:"ru-page-inner ru-paper relative",children:[a&&e.jsx("p",{className:"absolute top-3 right-4 ru-script-sm text-amber-900/70 z-10",children:a}),e.jsxs("div",{className:"relative w-full h-full",children:[r.slice(0,6).map((s,i)=>{const d=o[i%o.length];return e.jsx("div",{className:"absolute",style:{top:d.top,left:d.left,width:d.w,transform:`rotate(${d.rot}deg)`},children:e.jsx(z,{children:e.jsx("img",{src:s.src,alt:s.alt,className:"block w-full h-auto ru-photo",loading:"lazy"})})},i)}),t&&e.jsx(H,{videoShort:t})]})]})}function H({videoShort:r}){const[a,t]=p.useState(!1),o=r.poster??`https://i.ytimg.com/vi/${r.youtubeId}/hqdefault.jpg`,s=r.caption??"a moving picture — tap to watch";return p.useEffect(()=>{if(!a)return;const i=l=>{l.key==="Escape"&&t(!1)};window.addEventListener("keydown",i);const d=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",i),document.body.style.overflow=d}},[a]),e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:i=>{i.stopPropagation(),t(!0)},"aria-label":`Play short: ${s}`,className:"ru-video-polaroid absolute z-20",style:{right:"4%",bottom:"3%",width:"32%",transform:"rotate(5deg)"},children:e.jsxs("span",{className:"ru-polaroid-frame block",children:[e.jsxs("span",{className:"ru-polaroid-photo block relative overflow-hidden",children:[e.jsx("img",{src:o,alt:"",className:"block w-full h-auto",loading:"lazy","aria-hidden":"true"}),e.jsx("span",{className:"ru-polaroid-play","aria-hidden":"true",children:e.jsx("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",children:e.jsx("path",{d:"M7 4 L20 12 L7 20 Z",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round",strokeLinecap:"round"})})})]}),e.jsx("span",{className:"ru-polaroid-caption block ru-script-sm",children:s})]})}),a&&e.jsx("div",{className:"fixed inset-0 z-[80] flex items-center justify-center p-4 ru-video-modal-bg",onClick:()=>t(!1),role:"dialog","aria-modal":"true","aria-label":"Video short",children:e.jsxs("div",{className:"ru-video-modal-frame relative",onClick:i=>i.stopPropagation(),children:[e.jsx("button",{type:"button",onClick:()=>t(!1),className:"ru-video-modal-close ru-script-lg","aria-label":"Close",children:"×"}),e.jsx("div",{className:"ru-video-modal-inner",children:e.jsx("iframe",{src:`https://www.youtube-nocookie.com/embed/${r.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,title:"YouTube short",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"strict-origin-when-cross-origin",className:"ru-video-modal-iframe"})}),r.caption&&e.jsx("p",{className:"ru-video-modal-caption ru-script-sm",children:r.caption})]})})]})}function z({children:r}){return e.jsxs("span",{className:"ru-photo-mount relative inline-block",children:[r,e.jsx("span",{className:"ru-corner ru-corner-tl"}),e.jsx("span",{className:"ru-corner ru-corner-tr"}),e.jsx("span",{className:"ru-corner ru-corner-bl"}),e.jsx("span",{className:"ru-corner ru-corner-br"})]})}const K=`
.ru-stage { background: radial-gradient(ellipse at center, #1a0e07 0%, #0a0604 80%); }

.ru-scene { position: relative; max-width: 1400px; margin: 0 auto; }

/* ----- Candle flame: positioned over the wick in desk-scene.jpg ----- */
.ru-flame {
  position: absolute;
  left: 17.4%;
  top: 17.2%;
  width: 3.6%;
  aspect-ratio: 40 / 70;
  transform: translate(-50%, -94%);
  pointer-events: none;
  z-index: 2;
}
.ru-flame-halo {
  position: absolute;
  inset: -260% -260% -200% -260%;
  background: radial-gradient(circle, rgba(255, 190, 110, 0.35) 0%, rgba(255, 150, 60, 0.18) 30%, transparent 65%);
  filter: blur(8px);
  animation: ruFlameHalo 2.6s ease-in-out infinite alternate;
}
.ru-flame-svg {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 50% 100%;
  animation: ruFlameSway 2.4s ease-in-out infinite;
  filter: drop-shadow(0 -6px 10px rgba(255, 170, 70, 0.55));
}
.ru-flame-outer { transform-origin: 50% 100%; animation: ruFlameFlicker 1.6s ease-in-out infinite; }
.ru-flame-core  { transform-origin: 50% 100%; animation: ruFlameCorePulse 1.2s ease-in-out infinite; }

@keyframes ruFlameSway {
  0%, 100% { transform: rotate(-1.5deg) scaleY(1); }
  25% { transform: rotate(1.2deg) scaleY(1.04); }
  50% { transform: rotate(-0.8deg) scaleY(0.97); }
  75% { transform: rotate(2deg) scaleY(1.02); }
}
@keyframes ruFlameFlicker {
  0%, 100% { transform: scale(1, 1); opacity: 1; }
  30% { transform: scale(0.96, 1.05); opacity: 0.92; }
  60% { transform: scale(1.04, 0.95); opacity: 1; }
  80% { transform: scale(0.98, 1.02); opacity: 0.96; }
}
@keyframes ruFlameCorePulse {
  0%, 100% { opacity: 0.6; transform: scale(1, 1); }
  50% { opacity: 0.9; transform: scale(1.08, 1.04); }
}
@keyframes ruFlameHalo {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.06); }
}

/* ----- Wall cover: hides the original sunset window in the desk-scene image ----- */
.ru-wall-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 82%;
  height: 22%;
  z-index: 1;
  background:
    radial-gradient(ellipse at 40% 55%, rgba(38, 18, 6, 0.0) 0%, rgba(20, 9, 2, 0.55) 45%, rgba(12, 5, 1, 0.95) 78%),
    linear-gradient(180deg, #160a03 0%, #20100a 55%, #1a0c05 100%);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, black 82%, transparent 100%);
          mask-image: linear-gradient(180deg, black 82%, transparent 100%);
}

/* ----- New bay window: tall arched pane, top continues off the page ----- */
.ru-new-window {
  position: absolute;
  left: 6%;
  /* Extend top above the visible scene so the arch is cropped off-page */
  top: -22%;
  width: 70%;
  height: 38%;
  border: clamp(6px, 0.95vw, 14px) solid #3a1d0b;
  border-bottom-width: clamp(8px, 1.2vw, 18px);
  border-top: 0;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
  background: #0c0502;
  box-shadow:
    0 0 0 clamp(2px, 0.3vw, 5px) rgba(120, 62, 24, 0.95),
    0 clamp(8px, 1.4vw, 20px) clamp(14px, 2.2vw, 32px) rgba(8, 3, 1, 0.7),
    inset 0 0 clamp(14px, 2vw, 28px) rgba(18, 7, 0, 0.78);
  /* Match the desk's perspective: sill slopes down toward the right */
  transform: rotate(2.4deg);
  transform-origin: 0% 100%;
}
.ru-new-window-view {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: brightness(0.82) saturate(0.95) sepia(0.14) hue-rotate(-6deg);
}
.ru-new-window-glass {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(24, 11, 3, 0.45), transparent 14%, transparent 86%, rgba(24, 11, 3, 0.5)),
    linear-gradient(180deg, rgba(255, 198, 120, 0.22), transparent 38%, rgba(15, 6, 1, 0.55));
  box-shadow: inset 0 0 clamp(14px, 2vw, 28px) rgba(0, 0, 0, 0.7);
}
.ru-new-window-sill {
  position: absolute;
  left: -3%;
  right: -3%;
  bottom: calc(clamp(8px, 1.2vw, 18px) * -1.3);
  height: clamp(7px, 1.1vw, 15px);
  background: linear-gradient(180deg, #8a4c24, #2a1207);
  box-shadow: 0 6px 13px rgba(8, 4, 1, 0.7);
  border-radius: 2px;
  z-index: 3;
}

/* ----- Wax shimmer: slow vertical glisten over the candle drips ----- */
.ru-wax {
  position: absolute;
  /* Candle drip area in desk-scene.jpg — aligned to the candle body below the wick */
  left: 17.4%;
  top: 26%;
  width: 5%;
  height: 16%;
  transform: translate(-50%, 0);
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
  -webkit-mask-image: radial-gradient(ellipse 55% 80% at center, black 25%, transparent 85%);
          mask-image: radial-gradient(ellipse 55% 80% at center, black 25%, transparent 85%);
  mix-blend-mode: screen;
  opacity: 0.65;
}
.ru-wax-glow {
  position: absolute;
  width: 14%;
  height: 14%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse 50% 100% at center,
    rgba(255, 248, 225, 0.85) 0%,
    rgba(255, 240, 210, 0.4) 50%,
    transparent 100%
  );
  filter: blur(1.2px);
  opacity: 0;
  will-change: transform, opacity;
}
.ru-wax-glow--1 {
  left: 38%;
  animation: ruWaxDrip 7.5s ease-in-out infinite;
}
.ru-wax-glow--2 {
  left: 58%;
  width: 11%;
  height: 11%;
  animation: ruWaxDrip 9.5s ease-in-out infinite;
  animation-delay: 3.4s;
}

@keyframes ruWaxDrip {
  0%   { transform: translateY(-30%);  opacity: 0; }
  25%  { opacity: 0.85; }
  60%  { opacity: 0.7; }
  90%  { opacity: 0.25; }
  100% { transform: translateY(620%); opacity: 0; }
}



/* ----- Tea steam: thin curling wisps rising from the teacup ----- */
.ru-steam {
  position: absolute;
  /* Teacup rim in desk-scene.jpg (1536x1024): ~x 1230, y 380 */
  left: 80.1%;
  top: 37%;
  width: 5%;
  height: 18%;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 2;
  filter: blur(2.2px);
  mix-blend-mode: screen;
  opacity: 0.45;
}
.ru-steam-wisp {
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 100%;
  transform-origin: 50% 100%;
  opacity: 0;
  animation: ruSteamRise 4.6s ease-in-out infinite;
}
.ru-steam-wisp--1 { left: 50%; animation-duration: 4.6s; animation-delay: 0s; }
.ru-steam-wisp--2 { left: 38%; animation-duration: 5.4s; animation-delay: 1.6s; width: 75%; }
.ru-steam-wisp--3 { left: 62%; animation-duration: 4.0s; animation-delay: 3.0s; width: 65%; }
.ru-steam-wisp--4 { left: 45%; animation-duration: 5.8s; animation-delay: 0.8s; width: 70%; }
.ru-steam-wisp--5 { left: 56%; animation-duration: 4.4s; animation-delay: 2.3s; width: 60%; }

@keyframes ruSteamRise {
  0%   { transform: translate(-50%, 15%) scaleY(0.55) rotate(0deg); opacity: 0; }
  15%  { opacity: 0.85; }
  35%  { transform: translate(-58%, -15%) scaleY(0.85) rotate(-6deg); opacity: 0.8; }
  60%  { transform: translate(-42%, -55%) scaleY(1.05) rotate(5deg); opacity: 0.55; }
  85%  { transform: translate(-55%, -95%) scaleY(1.2) rotate(-3deg); opacity: 0.2; }
  100% { transform: translate(-50%, -120%) scaleY(1.3) rotate(0deg); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ru-flame-svg, .ru-flame-outer, .ru-flame-core, .ru-flame-halo,
  .ru-steam-wisp, .ru-wax-glow { animation: none; }
}




/* ----- Clickable journal hotspot (overlaid on the journal in the photo) ----- */
.ru-journal-hotspot {
  position: absolute;
  /* Journal bounds in desk-scene.jpg (1536x1024): ~x 510-985, y 240-830 */
  left: 33.2%;
  top: 23.4%;
  width: 31%;
  height: 57.6%;
  border: 0;
  background: transparent;
  cursor: pointer;
  z-index: 3;
  transition: transform 400ms ease;
}
.ru-journal-hotspot:hover { transform: scale(1.015) translateY(-3px); }
.ru-journal-hotspot:focus-visible { outline: 2px solid #ffd47a; outline-offset: 6px; border-radius: 6px; }
.ru-journal-glow {
  position: absolute; inset: -6%;
  border-radius: 8px;
  background: radial-gradient(ellipse at center, rgba(255, 200, 120, 0.28), transparent 70%);
  opacity: 0; transition: opacity 400ms ease;
  pointer-events: none;
}
.ru-journal-hotspot:hover .ru-journal-glow,
.ru-journal-hotspot:focus-visible .ru-journal-glow { opacity: 1; }
.ru-journal-hint {
  position: absolute; bottom: -42px; left: 50%;
  transform: translateX(-50%);
  color: #fde7b8;
  font-size: 1.5rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  white-space: nowrap;
  opacity: 0.85;
  transition: opacity 300ms, transform 300ms;
}
.ru-journal-hotspot:hover .ru-journal-hint { opacity: 1; transform: translateX(-50%) translateY(2px); }

/* ----- Book overlay ----- */
.ru-overlay {
  background:
    radial-gradient(ellipse at center, rgba(60, 30, 12, 0.85) 0%, rgba(8, 4, 2, 0.96) 70%),
    url(${JSON.stringify(N)});
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.ru-book {
  position: relative;
  width: min(95vw, 1100px);
  aspect-ratio: 11 / 7;
  perspective: 2200px;
  transform: scale(0.85);
  opacity: 0;
  transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 500ms ease;
}
.ru-book.is-opened { transform: scale(1); opacity: 1; }
.ru-book-inner {
  position: relative;
  width: 100%; height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(180deg, #2a0f08 0%, #1a0a04 100%);
  box-shadow:
    0 40px 80px -20px rgba(0,0,0,0.7),
    0 0 0 8px #6a2c14,
    0 0 0 10px #3a1808;
  border-radius: 6px;
  transform-style: preserve-3d;
}
.ru-book-inner::before {
  /* Center gutter shadow */
  content: "";
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 28px; transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.45) 50%, transparent);
  pointer-events: none;
  z-index: 5;
}

.ru-page {
  position: relative;
  overflow: hidden;
  background-color: #d9b274;
  background-image:
    radial-gradient(ellipse at 30% 20%, rgba(255, 215, 150, 0.3), transparent 60%),
    radial-gradient(ellipse at 70% 80%, rgba(150, 85, 35, 0.3), transparent 65%),
    linear-gradient(180deg, rgba(150, 80, 25, 0.28), rgba(115, 60, 15, 0.32)),
    url(${JSON.stringify(j)});
  background-size: cover, cover, cover, cover;
  background-blend-mode: multiply, multiply, multiply, normal;
}
.ru-page-left  { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-page-right { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-paper { position: absolute; inset: 0; padding: clamp(18px, 3.5%, 36px); }
.ru-page-inner { width: 100%; height: 100%; color: #3a1d0a; }

/* Page typography */
.ru-script-xs { font-family: var(--font-hand); font-size: clamp(0.9rem, 1.3vw, 1.1rem); color: #6b3614; }
.ru-script-sm { font-family: var(--font-hand); font-size: clamp(1.1rem, 1.6vw, 1.4rem); color: #6b3614; }
.ru-script-lg { font-family: var(--font-journal); font-style: italic; font-size: clamp(2rem, 4vw, 3rem); color: #4a2208; font-weight: 500; letter-spacing: 0.01em; }
.ru-script-xl { font-family: var(--font-journal); font-style: italic; font-size: clamp(2.4rem, 5vw, 3.8rem); color: #4a2208; font-weight: 500; letter-spacing: 0.01em; }
.ru-body { font-family: var(--font-journal); font-size: clamp(0.95rem, 1.25vw, 1.1rem); color: #3a1d0a; line-height: 1.55; }

/* Photo mounts */
.ru-photo-mount { line-height: 0; }
.ru-photo { box-shadow: 0 8px 24px -8px rgba(60,30,10,0.5), 0 2px 4px rgba(0,0,0,0.15); border-radius: 2px; max-height: 100%; }
.ru-corner {
  position: absolute;
  width: 18px; height: 18px;
  background:
    linear-gradient(135deg, #2a1408 50%, transparent 50.5%);
  opacity: 0.85;
}
.ru-corner-tl { top: -2px; left: -2px; }
.ru-corner-tr { top: -2px; right: -2px; transform: rotate(90deg); }
.ru-corner-br { bottom: -2px; right: -2px; transform: rotate(180deg); }
.ru-corner-bl { bottom: -2px; left: -2px; transform: rotate(270deg); }

/* Page turn buttons */
.ru-turn {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px;
  border-radius: 999px;
  background: rgba(60, 28, 10, 0.85);
  color: #fde7b8;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(253, 231, 184, 0.3);
  cursor: pointer;
  z-index: 20;
  transition: background 200ms, opacity 200ms;
}
.ru-turn:hover { background: rgba(120, 60, 24, 0.95); }
.ru-turn:disabled { opacity: 0.25; cursor: not-allowed; }
.ru-turn-prev { left: -50px; }
.ru-turn-next { right: -50px; }
@media (max-width: 700px) {
  .ru-turn-prev { left: 6px; }
  .ru-turn-next { right: 6px; }
}

/* Page flip animation */
.ru-flip {
  position: absolute;
  top: 0; bottom: 0;
  width: 50%;
  transform-style: preserve-3d;
  z-index: 15;
  pointer-events: none;
}
.ru-flip-next {
  right: 0;
  transform-origin: left center;
  animation: ruFlipNext 750ms ease-in-out forwards;
}
.ru-flip-prev {
  left: 0;
  transform-origin: right center;
  animation: ruFlipPrev 750ms ease-in-out forwards;
}
.ru-flip-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-color: #d9b274;
  background-image:
    radial-gradient(ellipse at 30% 20%, rgba(255, 215, 150, 0.3), transparent 60%),
    radial-gradient(ellipse at 70% 80%, rgba(150, 85, 35, 0.3), transparent 65%),
    linear-gradient(180deg, rgba(150, 80, 25, 0.28), rgba(115, 60, 15, 0.32)),
    url(${JSON.stringify(j)});
  background-size: cover, cover, cover, cover;
  background-blend-mode: multiply, multiply, multiply, normal;
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;
}
.ru-flip-face > * { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.ru-flip-front { z-index: 2; transform: translateZ(2px); animation: ruFaceFront 750ms steps(1) forwards; }
.ru-flip-back  { transform: rotateY(180deg) translateZ(2px); animation: ruFaceBack 750ms steps(1) forwards; }
.ru-flip-next .ru-flip-front { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-next .ru-flip-back  { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-prev .ru-flip-front { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-prev .ru-flip-back  { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }

@keyframes ruFlipNext {
  0% { transform: rotateY(0deg); box-shadow: 0 0 30px rgba(0,0,0,0.2); }
  100% { transform: rotateY(-180deg); box-shadow: -30px 0 40px rgba(0,0,0,0.4); }
}
@keyframes ruFlipPrev {
  0% { transform: rotateY(0deg); box-shadow: 0 0 30px rgba(0,0,0,0.2); }
  100% { transform: rotateY(180deg); box-shadow: 30px 0 40px rgba(0,0,0,0.4); }
}
/* Hard swap face visibility at the halfway mark to eliminate bleed-through */
@keyframes ruFaceFront {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes ruFaceBack {
  0%, 49.9% { opacity: 0; }
  50%, 100% { opacity: 1; }
}

/* Ribbon bookmark */
.ru-ribbon-wrap { position: absolute; top: 0; right: calc(50% - 18px); z-index: 30; }
.ru-ribbon {
  position: relative;
  display: block;
  width: 26px;
  height: 90px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
}
.ru-ribbon-cloth {
  position: absolute;
  top: 0; left: 0;
  width: 26px; height: 78px;
  background: linear-gradient(180deg, #b5793a 0%, #8a4a18 100%);
  box-shadow: inset -3px 0 4px rgba(0,0,0,0.25);
}
.ru-ribbon-tassel {
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 22px; height: 18px;
  background: radial-gradient(ellipse at top, #d49a4e 0%, #7a3d10 100%);
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
}
.ru-ribbon:hover .ru-ribbon-cloth { filter: brightness(1.1); }

.ru-ribbon-menu {
  position: absolute;
  top: 100px;
  right: -8px;
  width: 320px;
  background:
    linear-gradient(180deg, #fbf3df, #f3e7c8);
  border: 1px solid rgba(120, 60, 20, 0.3);
  border-radius: 4px;
  padding: 14px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  color: #3a1d0a;
}

/* Mobile: stack pages */
@media (max-width: 760px) {
  .ru-book { width: min(88vw, 480px); max-width: 88vw; aspect-ratio: 8 / 11; }
  .ru-book-inner { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
  .ru-book-inner::before {
    left: 0; right: 0; top: 50%; bottom: auto;
    width: auto; height: 28px; transform: translateY(-50%);
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.45) 50%, transparent);
  }
  .ru-page-left { border-radius: 4px 4px 0 0; box-shadow: inset 0 -8px 16px -8px rgba(60,30,10,0.35); }
  .ru-page-right { border-radius: 0 0 4px 4px; box-shadow: inset 0 8px 16px -8px rgba(60,30,10,0.35); }
  .ru-flip { width: 100%; height: 50%; }
  .ru-flip-next { right: 0; top: 50%; bottom: auto; transform-origin: top center; animation-name: ruFlipNextMobile; }
  .ru-flip-prev { left: 0; top: 0; transform-origin: bottom center; animation-name: ruFlipPrevMobile; }
  @keyframes ruFlipNextMobile {
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(180deg); }
  }
  @keyframes ruFlipPrevMobile {
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(-180deg); }
  }
  .ru-ribbon-menu { width: 260px; right: -120px; }
}

/* ----- Video polaroid (companion YouTube short, scrapbook style) ----- */
.ru-video-polaroid {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: transform 220ms ease, filter 220ms ease;
  transform-origin: 50% 50%;
  filter: drop-shadow(0 6px 10px rgba(20, 10, 4, 0.35));
}
.ru-video-polaroid:hover,
.ru-video-polaroid:focus-visible {
  transform: rotate(2deg) translateY(-2px) scale(1.03);
  outline: none;
}
.ru-polaroid-frame {
  background: #f6ecd6;
  padding: 6% 6% 14% 6%;
  border-radius: 2px;
  box-shadow:
    inset 0 0 0 1px rgba(120, 80, 30, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.7) inset;
}
.ru-polaroid-photo {
  background: #1a1208;
  border-radius: 1px;
  aspect-ratio: 9 / 12;
}
.ru-polaroid-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
}
.ru-polaroid-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f6ecd6;
  pointer-events: none;
}
.ru-polaroid-play svg {
  width: 38%;
  height: 38%;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.55));
  transform: translateX(4%);
}
.ru-polaroid-caption {
  margin-top: 6%;
  color: #6b3a14;
  text-align: center;
  line-height: 1.1;
}

/* ----- Video modal (candlelit overlay) ----- */
.ru-video-modal-bg {
  background:
    radial-gradient(ellipse at center, rgba(60, 30, 10, 0.55) 0%, rgba(10, 6, 4, 0.92) 80%);
  backdrop-filter: blur(6px);
  animation: ru-fade-in 240ms ease both;
}
.ru-video-modal-frame {
  background: #f6ecd6;
  padding: 18px 18px 28px;
  border-radius: 4px;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(120, 80, 30, 0.22);
  max-width: min(420px, 92vw);
  width: 100%;
  animation: ru-rise-in 320ms cubic-bezier(.2,.7,.2,1) both;
}
.ru-video-modal-close {
  position: absolute;
  top: 4px;
  right: 12px;
  background: transparent;
  border: 0;
  color: #6b3a14;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
}
.ru-video-modal-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: #000;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(120, 80, 30, 0.25);
}
.ru-video-modal-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.ru-video-modal-caption {
  margin-top: 10px;
  text-align: center;
  color: #6b3a14;
}

@keyframes ru-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ru-rise-in {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ru-video-modal-bg,
  .ru-video-modal-frame { animation: none; }
  .ru-video-polaroid { transition: none; }
}
`;export{te as component};
