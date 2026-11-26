// ---------- math ----------
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,p)=>a+(b-a)*p;
const P=(t,t0,d)=>clamp((t-t0)/d);
const eOut=p=>1-Math.pow(1-p,3);
const eIn=p=>p*p*p;
const eIO=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
const back=(p,s=1.70158)=>{p=clamp(p);const c3=s+1;return 1+c3*Math.pow(p-1,3)+s*Math.pow(p-1,2)};
const elastic=p=>{p=clamp(p);if(p===0||p===1)return p;return Math.pow(2,-10*p)*Math.sin((p*10-.75)*(2*Math.PI/3))+1};
const rnd=(i)=>{let x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const W=window.WORDS; const T=i=>W[i].s; const TE=i=>W[i].e;

// ---------- dom ----------
function el(tag,cls,style,html,parent){const e=document.createElement(tag);if(cls)e.className=cls;if(style)e.style.cssText=style;if(html!=null)e.innerHTML=html;if(parent)parent.appendChild(e);return e}
function tf(e,x,y,s=1,r=0,extra=''){e.style.transform=`translate(${x}px,${y}px) scale(${s}) rotate(${r}deg) ${extra}`}

// ---------- icons ----------
const IC={
 check:(c='#1FCB6B',s=34)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="${c}"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 x:(c='#FF4D3D',s=34)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="${c}"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>`,
 bigx:(c='#FF4D3D',s=120)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/></svg>`,
 G:(s=64,bg='#fff')=>`<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="${bg}"/><text x="32" y="44" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#141414">G</text></svg>`,
 snow:(c='#7FB2FF',s=28)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2M4 10.5l3.5-.3L6 7M20 13.5l-3.5.3L18 17M4 13.5l3.5.3L6 17M20 10.5l-3.5-.3L18 7"/></svg>`,
 spark:(c='#FFC53D',s=40)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" fill="${c}"/></svg>`,
 star:(c='#FFB02E',s=30)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" fill="${c}"/></svg>`,
 cursor:(s=54)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M4 2.5l15 10.2-6.6 1.2 3.9 7.3-2.9 1.5-3.9-7.4L4.6 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
 up:(c='#8A8A90',s=30)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 4l7 8h-4.5v8h-5v-8H5z" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
 bubble:(c='#8A8A90',s=30)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
 doc:(c='#D89E37',s=40)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6z" fill="${c}"/><path d="M14 2v5h5" fill="rgba(0,0,0,.18)"/><path d="M9 12h7M9 15.5h7M9 19h4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`,
 book:(c='#D89E37',s=44)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><path d="M12 6c-2-1.6-5-2-8-1.6V19c3-.4 6 0 8 1.6 2-1.6 5-2 8-1.6V4.4C17 4 14 4.4 12 6zM12 6v14.6"/></svg>`,
 logo:(s=40,c='#FFB938')=>`<svg width="${s}" height="${s}" viewBox="0 0 40 40"><g fill="${c}"><rect x="6" y="15" width="4" height="10" rx="2"/><rect x="12.5" y="9" width="4" height="22" rx="2"/><rect x="19" y="5" width="4" height="30" rx="2"/><rect x="25.5" y="11" width="4" height="18" rx="2"/></g><path d="M33 4c.3 2.4 1.6 3.7 4 4-2.4.3-3.7 1.6-4 4-.3-2.4-1.6-3.7-4-4 2.4-.3 3.7-1.6 4-4z" fill="${c}"/></svg>`,
};

// ---------- mascot "Pagey": an original doc-shaped buddy ----------
function mascot(parent,size=150){
  const wrap=el('div','abs','width:'+size+'px;height:'+size+'px;transform-origin:50% 100%;',null,parent);
  wrap.innerHTML=`<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="overflow:visible">
   <ellipse class="sh" cx="50" cy="97" rx="30" ry="4" fill="rgba(0,0,0,.28)"/>
   <g class="body">
    <rect x="34" y="84" width="9" height="12" rx="3" fill="#9C6E1E"/><rect x="57" y="84" width="9" height="12" rx="3" fill="#9C6E1E"/>
    <path d="M20 18 Q20 10 28 10 H62 L80 28 V82 Q80 90 72 90 H28 Q20 90 20 82Z" fill="#D89E37"/>
    <path d="M62 10 V22 Q62 28 68 28 H80Z" fill="#F2CF8C"/>
    <rect x="28" y="62" width="30" height="4" rx="2" fill="rgba(255,255,255,.35)"/><rect x="28" y="70" width="20" height="4" rx="2" fill="rgba(255,255,255,.35)"/>
    <g class="eyes"><rect class="e1" x="33" y="36" width="9" height="13" rx="3" fill="#1A0E0A"/><rect class="e2" x="55" y="36" width="9" height="13" rx="3" fill="#1A0E0A"/></g>
    <g class="happy" style="display:none" stroke="#1A0E0A" stroke-width="4" fill="none" stroke-linecap="round"><path d="M32 45 Q37.5 37 43 45"/><path d="M54 45 Q59.5 37 65 45"/></g>
    <path class="sweat" d="M84 30 Q88 38 84 42 Q80 38 84 30Z" fill="#7FC4FF" style="display:none"/>
    <path class="mouth" d="M44 54 Q49 58 54 54" stroke="#1A0E0A" stroke-width="3" fill="none" stroke-linecap="round"/>
   </g></svg>`;
  const q=s=>wrap.querySelector(s);
  const m={el:wrap,size,
    set(x,y,t,o={}){ // x,y = bottom-center
      const bob=o.still?0:Math.sin(t*5.2)*3;
      const sq=o.squash||0;
      const jit=o.shiver?Math.sin(t*90)*3:0;
      wrap.style.left=(x-size/2+jit)+'px';wrap.style.top=(y-size+bob)+'px';
      wrap.style.transform=`scale(${(o.s||1)*(1+sq)},${(o.s||1)*(1-sq)}) rotate(${o.r||0}deg)`;
      wrap.style.opacity=o.op==null?1:o.op;
      const bl=(t%2.7)<0.12; const ey=q('.eyes');
      ey.style.transform=bl?'translateY(40px) scaleY(0.15)':'';ey.style.transformOrigin='50% 42%';
      const look=o.look||0; ey.setAttribute('transform',`translate(${look*4},0)`);
      q('.happy').style.display=o.mood==='happy'?'':'none'; ey.style.display=o.mood==='happy'?'none':'';
      q('.sweat').style.display=o.sweat?'':'none';
      q('.mouth').setAttribute('d',o.mood==='shock'?'M45 56 Q49 50 53 56 Q49 61 45 56Z':o.mood==='sad'?'M44 57 Q49 52 54 57':'M44 54 Q49 58 54 54');
      q('.mouth').setAttribute('fill',o.mood==='shock'?'#1A0E0A':'none');
    }};
  return m;
}

// cursor
function cursor(parent){const c=el('div','abs',`width:54px;height:54px;z-index:30;filter:drop-shadow(0 6px 10px rgba(0,0,0,.4))`,IC.cursor(),parent);
  c.ring=el('div','abs','left:-18px;top:-18px;width:40px;height:40px;border-radius:50%;border:3px solid #4C7DFF;opacity:0',null,c);return c}
function cursorAt(c,x,y,click){c.style.left=x+'px';c.style.top=y+'px';const k=click==null?0:click;
  c.style.transform=`scale(${1-0.15*Math.sin(Math.PI*clamp(k*2))})`;c.ring.style.opacity=k>0&&k<1?1-k:0;c.ring.style.transform=`scale(${0.5+k*1.6})`}

// burst particles (stars)
function burst(parent,n,color,kind='star'){const ps=[];for(let i=0;i<n;i++){ps.push(el('div','abs','',kind==='star'?IC.star(color,26+rnd(i)*20):IC.spark(color,20+rnd(i)*22),parent))}
  return (cx,cy,p)=>ps.forEach((e,i)=>{const a=rnd(i+3)*Math.PI*2,d=(140+rnd(i+9)*220)*eOut(p);e.style.left=(cx+Math.cos(a)*d-16)+'px';e.style.top=(cy+Math.sin(a)*d-16+p*p*60)+'px';e.style.opacity=p<=0||p>=1?0:(1-p)*1.2;e.style.transform=`rotate(${p*200*(rnd(i)-.5)}deg) scale(${1-p*.4})`})}

// count text
const fmt=n=>Math.round(n).toLocaleString('en-US');

// ---------- captions ----------
const CAP=document.getElementById('cap');
const EMPH=new Set(window.EMPH||[]);
let CHUNKS=[];
function buildChunks(breaks){
  const B=new Set(breaks||[]);let cur=[];
  W.forEach((w,i)=>{
    const len=cur.reduce((a,j)=>a+W[j].w.length+1,0);
    if(cur.length&&(B.has(i)||len+w.w.length>32)){CHUNKS.push(cur);cur=[]}
    cur.push(i);
    const punct=/[.?!,:]$/.test(w.w);
    const next=W[i+1];
    const longgap=next&&next.s-w.e>0.35;
    if(punct||longgap){CHUNKS.push(cur);cur=[]}
  });
  if(cur.length)CHUNKS.push(cur);
  // merge tiny trailing chunks of 1 non-emph short word into next
  const out=[];for(let k=0;k<CHUNKS.length;k++){const c=CHUNKS[k];
    if(c.length===1&&!EMPH.has(c[0])&&W[c[0]].w.length<=4&&CHUNKS[k+1]&&!/[.?!]$/.test(W[c[0]].w)){CHUNKS[k+1]=c.concat(CHUNKS[k+1]);continue}out.push(c)}
  // attach stranded single trailing words to the previous chunk
  const o2=[];for(const c of out){const pv=o2[o2.length-1];const L=a=>a.reduce((x,j)=>x+W[j].w.length+1,0);
    if(c.length===1&&pv&&!/[.?!]$/.test(W[pv[pv.length-1]].w)&&L(pv)+L(c)<=36){pv.push(c[0]);continue}o2.push(c)}
  CHUNKS=o2;
}
let capCur=-1,capEls=[];
function renderCaption(t,mode){
  let k=-1;for(let i=0;i<CHUNKS.length;i++){if(T(CHUNKS[i][0])-0.06<=t)k=i;else break}
  const hide=k<0||(window.CAPHIDE&&window.CAPHIDE(t));
  if(k!==capCur){capCur=k;CAP.innerHTML='';capEls=[];if(k>=0){
    const line=el('div','line',null,null,CAP);const c=CHUNKS[k];let i=0;
    while(i<c.length){const wi=c[i];
      if(EMPH.has(wi)){const g=el('span','em',null,null,line);const box=el('span','box',null,null,g);const hs=['left:-7px;top:-1px','right:-7px;top:-1px','left:-7px;bottom:-7px','right:-7px;bottom:-7px'].map(p=>el('span','h',p,null,g));
        const ws=[];while(i<c.length&&EMPH.has(c[i])){const s=el('span','w',null,W[c[i]].w.replace(/[,.?!]$/,'').replace(/^(.*)$/,'$1'),g);ws.push([c[i],s]);if(c[i+1]!=null&&EMPH.has(c[i+1]))el('span','w','margin-right:12px','',g);i++}
        // trailing punctuation outside box
        const lastW=W[ws[ws.length-1][0]].w;
        capEls.push({em:true,g,box,hs,ws,idx:ws[0][0]});
      }else{const s=el('span','w',null,W[wi].w,line);capEls.push({em:false,s,idx:wi});i++}
    }}}
  CAP.className=(mode.light?'light ':'')+(mode.big?'big':'');
  CAP.style.opacity=hide?0:1;
  if(k<0)return;
  const nextStart=CHUNKS[k+1]?T(CHUNKS[k+1][0])-0.06:1e9;
  const outp=P(t,nextStart-0.1,0.1);
  capEls.forEach(c=>{const p=eOut(P(t,T(c.idx)-0.08,0.22));
    const set=(e)=>{e.style.opacity=p*(1-outp);e.style.filter=`blur(${(1-p)*10+outp*8}px)`;e.style.transform=`translateY(${(1-p)*18}px)`};
    if(c.em){c.ws.forEach(([wi,e])=>{const pp=eOut(P(t,T(wi)-0.08,0.22));e.style.opacity=pp*(1-outp);e.style.filter=`blur(${(1-pp)*10+outp*8}px)`});
      const bp=eOut(P(t,T(c.idx)+0.05,0.28));c.box.style.transform=`scaleX(${bp})`;c.box.style.opacity=(1-outp);
      c.hs.forEach((h,j)=>{h.style.opacity=P(t,T(c.idx)+0.2,0.12)*(1-outp)});c.g.style.transform=`translateY(${(1-p)*18}px) scale(${1+0.08*Math.sin(Math.PI*P(t,T(c.idx),0.3))})`}
    else set(c.s)});
}

// ---------- components ----------
const LOCK=`<svg width="16" height="16" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>`;
function browser(p,css,url,o={}){const d=o.dark;
  const b=el('div','abs',`${css};border-radius:24px;overflow:hidden;background:${d?'#1D1D23':'#FCFCFA'};color:${d?'#fff':'#141414'};border:1.5px solid ${d?'#3E3E48':'rgba(0,0,0,.07)'};box-shadow:0 50px 120px rgba(0,0,0,${d?.6:.22}),0 10px 30px rgba(0,0,0,${d?.4:.08})`,null,p);
  const bar=el('div','',`height:60px;display:flex;align-items:center;gap:10px;padding:0 22px;background:${d?'#26262E':'#F0EFEB'};border-bottom:1.5px solid ${d?'#363640':'#E3E1DB'}`,
   `<i style="width:15px;height:15px;border-radius:50%;background:#FF5F57"></i><i style="width:15px;height:15px;border-radius:50%;background:#FEBC2E"></i><i style="width:15px;height:15px;border-radius:50%;background:#28C840"></i>
    <div style="margin-left:20px;flex:1;height:38px;border-radius:11px;background:${d?'#15151A':'#fff'};display:flex;align-items:center;gap:10px;padding:0 16px;font-size:20px;color:${d?'#A6A6B0':'#707075'};border:1px solid ${d?'#33333C':'#E6E4DF'}">${LOCK}<span class="url">${url}</span></div>`,b);
  const body=el('div','',`position:absolute;left:0;right:0;top:61px;bottom:0;overflow:hidden`,null,b);
  return {el:b,body,bar}}
function phone(p,css){const ph=el('div','abs',`${css};border-radius:64px;background:#0B0B0C;padding:16px;box-shadow:0 50px 120px rgba(0,0,0,.35),0 0 0 3px #2B2B2F inset`,null,p);
  const sc=el('div','',`position:absolute;inset:16px;border-radius:50px;overflow:hidden;background:#F6F6F4;color:#141414`,null,ph);
  el('div','abs','left:50%;top:14px;width:130px;height:36px;margin-left:-65px;border-radius:20px;background:#0B0B0C;z-index:5',null,sc);return {el:ph,sc}}
function glow(p,x,y,r,c,o=.5){return el('div','gl',`left:${x-r}px;top:${y-r}px;width:${2*r}px;height:${2*r}px;background:radial-gradient(circle,${c} 0%,transparent 68%);opacity:${o}`,null,p)}
const SPIN=(a,c='#8A8A90')=>`<svg width="28" height="28" viewBox="0 0 24 24" style="transform:rotate(${a}deg)"><circle cx="12" cy="12" r="9" stroke="${c}" stroke-opacity=".25" stroke-width="3" fill="none"/><path d="M12 3a9 9 0 019 9" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
function tasks(p,css,items,dark){const box=el('div','abs',css,null,p);
  const rows=items.map(it=>el('div','',`display:flex;align-items:center;gap:14px;height:50px;font-size:24px;font-weight:500;color:${dark?'#D8D8DC':'#2A2A2A'}`,`<span class="ic" style="width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center"></span><span class="tx">${it}</span>`,box));
  return {box,rows,set(t,times,dur=.45){rows.forEach((r,i)=>{const t0=times[i];const a=P(t,t0,.2);r.style.opacity=a;r.style.transform=`translateY(${(1-eOut(a))*16}px)`;
    const done=t>t0+dur;r.querySelector('.ic').innerHTML=done?IC.check(GREEN,28):SPIN(t*540,dark?'#AAA':'#777');r.querySelector('.tx').style.color=done?'':(dark?'#8A8A90':'#888')})}}}
function toast(p,css,html,dark=true){return el('div','abs',`${css};display:flex;align-items:center;gap:14px;padding:18px 24px;border-radius:20px;font-size:24px;font-weight:600;
  background:${dark?'rgba(44,44,52,.96)':'rgba(255,255,255,.96)'};color:${dark?'#fff':'#141414'};border:1.5px solid ${dark?'#4A4A56':'rgba(0,0,0,.06)'};box-shadow:0 20px 50px rgba(0,0,0,.35)`,html,p)}
function popIn(e,t,t0,o={}){const p=back(P(t,t0,o.d||.4),o.k||1.8);const out=o.out!=null?eIn(P(t,o.out,.25)):0;
  e.style.opacity=clamp(P(t,t0,.12))*(1-out);e.style.transform=`${o.pre||''} translate(${(o.dx||0)*(1-p)}px,${(o.dy==null?40:o.dy)*(1-p)}px) scale(${(o.s0==null?.6:o.s0)+(1-(o.s0==null?.6:o.s0))*p}) ${o.post||''}`;return p}
function typed(e,text,p,caret=true){const n=Math.floor(text.length*clamp(p));e.innerHTML=text.slice(0,n)+(caret&&p<1.05?'<span style="display:inline-block;width:3px;height:1em;background:currentColor;vertical-align:-3px;margin-left:2px;opacity:.8"></span>':'')}
function shine(e){const s=el('div','abs','inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);background-size:250% 100%;mix-blend-mode:overlay',null,e);
  return p=>{s.style.backgroundPosition=`${lerp(160,-60,p)}% 0`;s.style.opacity=p>0&&p<1?1:0}}
const GREEN='#1FCB6B',RED='#FF4D3D',CORAL='#D89E37',BLUE='#4C7DFF',GOLD='#FFB02E';
const FAV=(c,l)=>`<span style="width:30px;height:30px;border-radius:8px;background:${c};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;flex:none">${l}</span>`;

// ---------- SFX registry ----------
window.SFX=[];function sfx(t,type,g=1){window.SFX.push({t:+t.toFixed(3),type,g})}

// ---------- ambient layers ----------
const GH=document.getElementById('ghost'),DU=document.getElementById('dust');const ghosts=[],dusts=[];
for(let i=0;i<14;i++){const w=160+rnd(i)*260,h=120+rnd(i+5)*300;const g=el('div','abs',`width:${w}px;height:${h}px;border-radius:22px;filter:blur(${8+rnd(i+2)*10}px);padding:22px`,
  `<div style="height:16px;width:60%;border-radius:8px;background:${[CORAL,BLUE,GREEN,GOLD][i%4]};opacity:.7;margin-bottom:14px"></div><div style="height:10px;width:90%;border-radius:6px;background:currentColor;opacity:.35;margin-bottom:10px"></div><div style="height:10px;width:70%;border-radius:6px;background:currentColor;opacity:.35"></div>`,GH);
  ghosts.push({g,x:rnd(i+11)*1180-150,y:rnd(i+17)*2100-150,sp:10+rnd(i+23)*25})}
for(let i=0;i<46;i++){const d=el('div','abs',`width:${2+rnd(i+40)*4}px;height:${2+rnd(i+40)*4}px;border-radius:50%;background:currentColor`,null,DU);dusts.push({d,x:rnd(i+50)*1080,y:rnd(i+60)*1920,sp:12+rnd(i+70)*30,o:.15+rnd(i+80)*.35})}
function ambient(t,cream){GH.style.color=cream?'#000':'#fff';
  ghosts.forEach((o,i)=>{o.g.style.background=cream?'rgba(255,255,255,.75)':'rgba(255,255,255,.045)';o.g.style.opacity=cream?.22:.35;o.g.firstChild.style.background=cream?'':'rgba(216,158,55,.5)';o.g.style.border=cream?'1px solid rgba(0,0,0,.05)':'1px solid rgba(255,255,255,.06)';
    o.g.style.transform=`translate(${o.x+Math.sin(t*.2+i)*30}px,${((o.y-t*o.sp)%2200+2200)%2200-200}px)`});
  DU.style.color=cream?'#B9A27C':'#fff';dusts.forEach(o=>{o.d.style.transform=`translate(${o.x+Math.sin(t*.5+o.x)*20}px,${((o.y-t*o.sp)%1960+1960)%1960-20}px)`;o.d.style.opacity=o.o*(cream?.6:.7)})}

// ---------- scene system ----------
const SC=[];const ROOT=document.getElementById('scenes');
function scene(o){SC.push(o);if(o.sfx)o.sfx.forEach(c=>sfx(...c))}
function finalize(){SC.sort((a,b)=>a.t0-b.t0);SC.forEach((s,i)=>{s.t1=s.t1||(SC[i+1]?SC[i+1].t0:window.DUR)});
  let k=0;SC.forEach((s,i)=>{if(i===0||s.nowhoosh)return;const pv=SC[i-1];const tt=s.t0-0.12;
    const big=pv.bg!==s.bg||s.tr==='whip';const busy=window.SFX.some(c=>Math.abs(c.t-tt)<0.45);
    if(big&&!busy){sfx(tt,'whoosh'+(1+(k++%3)),.55)}})}
const bgD=document.getElementById('bgDark'),bgC=document.getElementById('bgCream'),FL=document.getElementById('flash'),HD=document.getElementById('handle');
HD.innerHTML=IC.logo(34,'currentColor')+'<span>Answer Theory</span>';
function sceneAt(t){let s=SC[0];for(const x of SC)if(x.t0<=t)s=x;return s}
window.renderAt=function(t){
  const cs=sceneAt(t);const idx=SC.indexOf(cs);const prev=SC[idx-1];
  let cream=cs.bg==='cream'?1:0;
  if(prev&&prev.bg!==cs.bg){const p=eIO(P(t,cs.t0-0.1,0.18));cream=lerp(prev.bg==='cream'?1:0,cream,p)}
  bgC.style.opacity=cream;document.getElementById('capbg').style.opacity=1-cream;ambient(t,cream>.5);
  FL.style.opacity=prev&&prev.bg!==cs.bg&&t>=cs.t0-0.02?0.06*(1-P(t,cs.t0-0.02,0.2)):0;
  for(const s of SC){
    const vis=t>=s.t0-0.15&&t<s.t1+0.2;
    if(!vis){if(s.root)s.root.style.display='none';continue}
    if(!s.root){s.root=el('div','scene',null,null,ROOT);s.cam=el('div','cam',null,null,s.root);s.st=s.build(s.cam,s)||{};s.st.t0=s.t0;s.st.t1=s.t1}
    s.root.style.display='block';
    const pin=s.instant?1:eOut(P(t,s.t0-0.15,0.3)),pout=s.keep?0:eIn(P(t,s.t1-0.02,0.2));
    s.root.style.opacity=Math.min(pin,1-pout);
    let tx=0,sc=(0.96+0.04*pin)*(1+0.04*pout),bl=(1-pin)*8+pout*8;
    if(s.tr==='whip'){tx=(1-pin)*420;sc=1;bl=(1-pin)*12}
    const nx=SC[SC.indexOf(s)+1];if(nx&&nx.tr==='whip'&&pout>0){tx=-pout*420;sc=1;bl=pout*12}
    s.root.style.transform=`translateX(${tx}px) scale(${sc})`;
    s.root.style.filter=bl>0.3?`blur(${bl}px)`:'none';
    const lp=P(t,s.t0,s.t1-s.t0);s.cam.style.transform=`scale(${0.9*(1+(s.zoom==null?0.06:s.zoom)*eIO(lp))})`;
    s.update(s.st,t-s.t0,t,s);
  }
  const light=cs.bg==='cream';
  renderCaption(t,{light,big:!!cs.bigcap});
  HD.className=light?'light':'';HD.style.opacity=cs.nohandle?0:1;
};
