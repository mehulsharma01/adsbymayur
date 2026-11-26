/* ===== S14 ESPRESSO: phone maps search → not found → leave (cream) ===== */
scene({t0:T(128)-.12,bg:'cream',zoom:.05,
sfx:[[T(131),'type',.6],[T(134)+.1,'pop',.6],[T(135),'error',.9],[T(138),'steps',.8],[T(139),'whoosh',.7]],
build(r){const st={};
  const Ph=phone(r,'left:270px;top:490px;width:540px;height:1060px');st.Ph=Ph;
  Ph.sc.innerHTML=`<div style="position:absolute;inset:0;background:linear-gradient(#E9EEF2,#DDE5EA)"><svg width="508" height="1028" style="position:absolute;inset:0;opacity:.9"><path d="M-20 300 Q200 260 300 420 T560 520" stroke="#fff" stroke-width="26" fill="none"/><path d="M120 -20 Q160 400 80 1100" stroke="#fff" stroke-width="20" fill="none"/><path d="M-20 760 Q260 700 560 800" stroke="#fff" stroke-width="16" fill="none"/><rect x="230" y="560" width="160" height="110" rx="12" fill="#CFE3C8"/><rect x="300" y="120" width="140" height="90" rx="12" fill="#D6DDE6"/></svg></div>
   <div style="position:absolute;left:24px;right:24px;top:70px;height:76px;border-radius:38px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.12);display:flex;align-items:center;gap:14px;padding:0 26px;font-size:28px;font-weight:500"><svg width="28" height="28" viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" stroke="#777" stroke-width="2.5" fill="none"/><path d="M15 15l6 6" stroke="#777" stroke-width="2.5"/></svg><span class="q"></span></div>
   <div class="pin" style="position:absolute;left:210px;top:440px">${`<svg width="80" height="100" viewBox="0 0 24 30"><path d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 30 12 30s12-10 12-18.4C24 5.2 18.6 0 12 0z" fill="${CORAL}"/><circle cx="12" cy="11.5" r="5" fill="#fff"/></svg>`}</div>
   <div class="sheet" style="position:absolute;left:0;right:0;bottom:0;height:430px;border-radius:36px 36px 0 0;background:#fff;box-shadow:0 -10px 40px rgba(0,0,0,.12);padding:22px 30px">
     <div style="width:60px;height:6px;border-radius:3px;background:#DDD;margin:0 auto 22px"></div>
     <div style="font-weight:800;font-size:34px;letter-spacing:-.6px">Maison Trois</div><div style="display:flex;align-items:center;gap:8px;margin-top:6px;font-size:22px;color:#666">4.9 ${IC.star(GOLD,20).repeat(5)} · 0.2 mi</div>
     <div class="res" style="margin-top:22px;padding:18px 20px;border-radius:18px;background:#FFF1EE;border:2px solid #FFD2C9;display:flex;align-items:center;gap:14px;font-size:25px;font-weight:700;color:${RED}">${IC.x(RED,32)} No espresso here</div>
     <div class="muted" style="margin-top:16px;font-size:21px">0 results for "espresso" on this menu</div></div>`;
  st.door=el('div','abs','left:880px;top:1270px',`<svg width="120" height="190" viewBox="0 0 40 64"><rect x="2" y="2" width="36" height="60" rx="3" fill="#2A2420"/><rect x="6" y="6" width="28" height="52" rx="2" fill="#3A322C"/><circle cx="29" cy="34" r="2" fill="${GOLD}"/></svg>`,r);
  st.m=mascot(r,140);st.lines=el('div','abs','',`<svg width="80" height="60"><path d="M0 10h50M10 30h60M0 50h44" stroke="#BDB4A3" stroke-width="5" stroke-linecap="round"/></svg>`,r);
  st.shop=el('div','abs','left:820px;top:1180px;width:230px;height:280px',`<svg width="230" height="280" viewBox="0 0 230 280"><rect x="15" y="70" width="200" height="200" rx="10" fill="#fff" stroke="#E2DCCF" stroke-width="3"/><path d="M5 70 L25 20 H205 L225 70Z" fill="${CORAL}"/>${[0,1,2,3,4].map(i=>`<path d="M${25+i*36} 20 L${5+i*44} 70 H${27+i*44} L${43+i*36} 20Z" fill="#fff" opacity=".85"/>`).join('')}<rect x="80" y="160" width="70" height="110" rx="6" fill="#3A322C"/><g transform="translate(92 92)"><path d="M0 14h38v18a14 14 0 01-14 14h-10A14 14 0 010 32z" fill="#6B4E2E"/><path d="M38 18h6a7 7 0 010 14h-6" stroke="#6B4E2E" stroke-width="4" fill="none"/><path class="stm" d="M10 8q-4-5 0-10M20 8q-4-5 0-10M30 8q-4-5 0-10" stroke="#B9A27C" stroke-width="3" fill="none" stroke-linecap="round"/></g></svg>`,r);return st},
update(s,lt,t){const sc=s.Ph.sc;typed(sc.querySelector('.q'),'espresso near me',P(t,T(130),1.1));
  s.Ph.el.style.transform=`rotateY(${-10+6*P(t,s.t0,5)}deg) rotateX(4deg)`;
  const sh=eOut(P(t,T(134),.5));sc.querySelector('.sheet').style.transform=`translateY(${(1-sh)*430}px)`;
  const pn=back(P(t,T(133),.4),2);sc.querySelector('.pin').style.transform=`translateY(${(1-pn)*-200}px) scale(${pn})`;
  const nf=P(t,T(135)-.05,.3);sc.querySelector('.res').style.transform=`scale(${1+.08*Math.sin(Math.PI*nf)}) translateX(${t>T(135)?Math.sin((t-T(135))*60)*8*(1-P(t,T(135),.5)):0}px)`;
  const lv=T(137)+.1,wk=eIO(P(t,lv,1.3));
  const mx=t<lv?150:lerp(150,950,wk);s.m.set(mx,1460,t,{mood:t>T(135)?'sad':'idle',look:t>lv?1:1,r:t>lv?Math.sin(t*20)*8:0});
  s.lines.style.left=(mx-160)+'px';s.lines.style.top='1370px';s.lines.style.opacity=t>lv&&wk<1?.8:0;
  popIn(s.door,t,T(137)-.2,{dy:0,s0:.5});popIn(s.shop,t,T(138)+.1,{dy:60,s0:.6,k:2});s.shop.querySelector('.stm').style.transform=`translateY(${-4*Math.sin(t*4)}px)`;s.door.style.opacity=1-P(t,T(138),.3);s.m.el.style.opacity=1-P(t,lv+1,.3);
  
}});

/* ===== S15 AUDIENCE: search box + 3D cloud of queries (dark) ===== */
const QS=['best seo tool for startups','how long does seo take','is seo worth it in 2026','seo vs google ads','how to rank on chatgpt','cheap seo for small business','seo checklist pdf','what is aeo','seo for shopify stores','how to get on page one','local seo near me','does blogging still work','ai content and google','seo agency vs freelancer','keyword research free','how to fix crawl errors','what is topical authority','seo for b2b saas','backlinks worth buying?','how many blog posts per week','google update recovery','seo pricing 2026','how to write meta descriptions','what is e-e-a-t','schema markup guide','seo reporting template','why is my traffic down','how to rank without backlinks','seo for youtube','voice search seo','zero click searches','internal linking tips','how to optimize images','perplexity seo','core web vitals fix','seo career path'];
scene({t0:T(140)-.12,bg:'dark',tr:'whip',zoom:.06,
sfx:[[T(140),'type',.6],[T(146),'type',.6],[T(152)-.1,'pops',.9],[T(154),'shimmer',.5]],
build(r){const st={};glow(r,540,980,600,'rgba(76,125,255,.28)',.8);
  st.chips=QS.map((q,i)=>{const z=rnd(i+3);return {e:el('div','abs',`white-space:nowrap;padding:14px 24px;border-radius:999px;background:rgba(28,28,34,.92);border:1.5px solid #3A3A44;font-size:24px;font-weight:600;color:#DCDCE4;display:flex;align-items:center;gap:10px`,
    `<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" stroke="#8A8A96" stroke-width="2.5" fill="none"/><path d="M15 15l6 6" stroke="#8A8A96" stroke-width="2.5"/></svg>${q}`,r),z,a:rnd(i+7)*Math.PI*2,rad:250+rnd(i+11)*420,i}});
  st.box=el('div','abs',`left:110px;top:880px;width:860px;padding:0;border-radius:40px;background:#fff;color:#141414;box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 80px rgba(76,125,255,.35);z-index:4;overflow:hidden`,
   `<div style="height:96px;display:flex;align-items:center;gap:18px;padding:0 34px;font-size:32px;font-weight:500">${IC.G(52,'#F1F1EF')}<span class="q"></span></div><div class="dd" style="border-top:1.5px solid #EEE"></div>`,r);
  st.cnt=el('div','pill abs',`left:50%;top:1450px;background:${CORAL};color:#141414;font-size:30px;z-index:5;white-space:nowrap`,'',r);
  return st},
update(s,lt,t){const cyc=['what is seo','seo tips','how to do seo','seo for beginners','is seo dead','seo strategy 2026','how to rank higher','seo vs aeo'];
  const k=Math.floor((t-T(140))/0.62);const kk=((k%cyc.length)+cyc.length)%cyc.length;const ph=((t-T(140))/0.62)%1;
  typed(s.box.querySelector('.q'),cyc[kk],t<T(140)?0:ph*1.6);
  s.box.querySelector('.dd').innerHTML=[0,1,2].map(j=>`<div style="padding:16px 40px;font-size:25px;color:#555;display:flex;gap:16px;align-items:center"><span style="color:#AAA">↗</span>${cyc[(kk+j+1)%cyc.length]} <b style="color:#141414">${['guide','2026','for beginners'][j]}</b></div>`).join('');
  s.box.style.transform=`rotateX(${10}deg) scale(${back(P(t,s.t0,.5),1.4)})`;
  let shown=0;s.chips.forEach(c=>{const t0=s.t0+.25+c.i*(T(155)-s.t0-.25)/QS.length;const p=P(t,t0,.5);if(p>0)shown++;
    const dep=.55+c.z*.6;const x=540+Math.cos(c.a+t*.12)*c.rad*1.15,y=980+Math.sin(c.a+t*.12)*c.rad*.95;
    c.e.style.opacity=clamp(p*2)*(.35+.65*c.z);c.e.style.filter=`blur(${(1-c.z)*5}px)`;
    c.e.style.transform=`translate(${x-200}px,${y-30}px) scale(${dep*back(p,1.6)})`;c.e.style.zIndex=c.z>.6?6:2});
  s.cnt.style.display='none';
}});

/* ===== S16 10 TOPICS covered vs missed ===== */
scene({t0:T(156)-.12,bg:'dark',zoom:.05,
sfx:[[T(160)-.1,'ticks',.8],[T(163)-.05,'sweepdown',.8],[T(163)+.1,'error',.6],[T(166),'ticks',.6]],
build(r){const st={};
  const Pn=el('div','dcard','left:70px;top:500px;width:940px;height:900px;padding:30px;background:#1F1F25',null,r);st.Pn=Pn;
  Pn.innerHTML=`<div style="display:flex;align-items:center;gap:14px">${IC.G(44)}<div style="font-weight:800;font-size:30px">Search demand in your niche</div><div class="pill" style="margin-left:auto;background:#30303A;color:#AAA;font-size:20px">48 topics</div></div><div class="gr" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:26px"></div>`;
  const gr=Pn.querySelector('.gr');st.cells=[];const cov=[0,5,9,14,18,22,27,33,38,44];
  for(let i=0;i<48;i++){st.cells.push({e:el('div','',`height:58px;border-radius:14px;border:1.5px solid #44444E;background:#2A2A32;display:flex;align-items:center;gap:8px;padding:0 12px;font-size:16px;color:#A0A0A8;white-space:nowrap;overflow:hidden`,`<span class="ic" style="flex:none;width:22px;display:inline-flex"></span><span style="overflow:hidden;text-overflow:ellipsis">${QS[i%QS.length]}</span>`,gr),c:cov.includes(i),i})}
  st.a=toast(r,'left:70px;top:1420px;width:440px;z-index:4',`${IC.check(GREEN,34)}<span>Covered</span><b class="cv" style="margin-left:auto;color:${GREEN};font-size:36px">0</b>`);
  st.b=toast(r,'left:570px;top:1420px;width:440px;z-index:4',`${IC.x(RED,34)}<span>Missed</span><b class="ms" style="margin-left:auto;color:${RED};font-size:36px">0</b>`);
  return st},
update(s,lt,t){let cv=0,ms=0;s.Pn.style.transform=`rotateX(${12-4*P(t,s.t0,4)}deg)`;popIn(s.Pn,t,s.t0,{dy:100,s0:.92,post:`rotateX(${12-4*P(t,s.t0,4)}deg)`});
  s.cells.forEach((c,k)=>{const ap=P(t,s.t0+.05+k*.012,.25);c.e.style.opacity=ap;
    if(c.c){const on=t>T(160)-.1+k*.02;if(on)cv++;c.e.style.borderColor=on?GREEN:'#44444E';c.e.style.background=on?'rgba(31,203,107,.14)':'#2A2A32';c.e.style.color=on?'#fff':'';c.e.querySelector('.ic').innerHTML=on?IC.check(GREEN,22):''}
    else{const w=T(163)-.05+((k%4)+Math.floor(k/4))*.03;const on=t>w;if(on)ms++;c.e.style.borderColor=on?'rgba(255,77,61,.55)':'#44444E';c.e.style.background=on?'rgba(255,77,61,.10)':'#2A2A32';c.e.style.color=on?'#FF8A80':'';c.e.querySelector('.ic').innerHTML=on?IC.x(RED,22):'';c.e.style.transform=`scale(${1-.06*Math.sin(Math.PI*P(t,w,.25))})`}});
  s.a.querySelector('.cv').textContent=cv;s.b.querySelector('.ms').textContent=ms;
  popIn(s.a,t,T(160)-.2,{dy:40,s0:.9});popIn(s.b,t,T(163)-.1,{dy:40,s0:.9});
}});

/* ===== S17 3,000-WORD ESSAY: doc editor ===== */
scene({t0:T(169)-.12,bg:'dark',tr:'whip',zoom:.06,
sfx:[[T(171),'type',.7],[T(173),'type',.7],[T(175),'ticks',.7],[T(177)+.1,'thud',.9]],
build(r){const st={};
  const B=browser(r,'left:110px;top:500px;width:860px;height:1000px','docs/the-ultimate-guide-to-seo',{dark:false});st.B=B;
  let lines='';for(let i=0;i<160;i++){const w=i%9===8?40+rnd(i)*20:80+rnd(i)*18;lines+=i%12===0?`<div style="height:22px;width:${45+rnd(i)*30}%;background:#2A2A2A;border-radius:6px;margin:30px 0 16px;opacity:.85"></div>`:`<div style="height:12px;width:${w}%;background:#D5D3CC;border-radius:6px;margin-bottom:14px"></div>`}
  B.body.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:70px;border-bottom:1.5px solid #ECEAE4;display:flex;align-items:center;gap:18px;padding:0 30px;color:#666;font-size:20px;font-weight:600;background:#FAFAF7;z-index:2"><b style="font-family:serif;font-size:26px">B</b><i style="font-family:serif;font-size:26px">I</i><u style="font-size:22px">U</u><span>H1</span><span>H2</span><span style="margin-left:auto" class="pill wc">0 words</span></div>
   <div class="pg" style="position:absolute;left:90px;right:90px;top:110px"><div style="font-weight:900;font-size:44px;letter-spacing:-1.5px;line-height:1.1;color:#141414;margin-bottom:20px">The Ultimate Guide to SEO (2026 Edition)</div>${lines}</div>
   <div style="position:absolute;right:16px;top:90px;bottom:20px;width:10px;border-radius:5px;background:#EEE;z-index:2"><div class="sb" style="width:10px;height:120px;border-radius:5px;background:#BBB"></div></div>`;
  st.big=el('div','abs',`left:600px;top:1340px;padding:24px 32px;border-radius:28px;background:#202027;border:1.5px solid #4E4E58;box-shadow:0 30px 80px rgba(0,0,0,.6);z-index:5`,`<div class="n" style="font-weight:900;font-size:76px;letter-spacing:-3px;color:${CORAL};line-height:1">0</div><div style="font-size:24px;color:#AAA;font-weight:600">words · 14 min read</div>`,r);
  return st},
update(s,lt,t){const B=s.B.body;const g=eIO(P(t,T(170),T(177)+.2-T(170)));const n=Math.round(3000*g);
  B.querySelector('.wc').textContent=fmt(n)+' words';s.big.querySelector('.n').textContent=fmt(n);
  B.querySelector('.pg').style.transform=`translateY(${-g*3300}px)`;B.querySelector('.sb').style.transform=`translateY(${g*740}px)`;
  s.B.el.style.transform=`rotateX(${18-8*g}deg) rotateY(${-8+6*g}deg) translateY(${t>T(177)+.1?Math.sin((t-T(177))*50)*8*(1-P(t,T(177)+.1,.4)):0}px)`;
  popIn(s.big,t,T(171),{dx:150,dy:0,post:`translateZ(160px) scale(${1+.15*Math.sin(Math.PI*P(t,T(177)+.1,.35))})`});
}});

/* ===== S18 SHORT ANSWER vs MASSIVE ARTICLE ===== */
scene({t0:T(180)-.12,bg:'dark',zoom:.05,
sfx:[[T(182),'type',.5],[T(188)-.05,'success',.9],[T(191),'whoosh',.6],[T(192),'pops',.7],[T(193),'sad',.8]],
build(r){const st={};
  const A=el('div','card','left:90px;top:490px;width:900px;padding:30px 34px;border:3px solid transparent',null,r);st.A=A;
  A.innerHTML=`<div style="display:flex;align-items:center;gap:12px;font-size:20px;color:#777;font-weight:600">${IC.G(34,'#F1F1EF')} Featured answer</div><div style="font-weight:800;font-size:31px;margin-top:12px;letter-spacing:-.5px">How long should a blog post be?</div>
   <div class="ans" style="font-size:25px;line-height:1.4;margin-top:10px;color:#333;min-height:70px"></div>
   <div style="display:flex;gap:10px;margin-top:14px"><span class="pill b1" style="background:#E6F8EE;color:#13994F;font-size:20px">${IC.check(GREEN,22)} 40 words</span><span class="pill b2" style="background:#EEF2FF;color:${BLUE};font-size:20px">${IC.spark(BLUE,20)} Cited by AI</span><span class="pill b3" style="background:#FBF0DA;color:${CORAL};font-size:20px">★ Saved 2.3K</span></div>`;
  st.g=glow(r,540,650,420,'rgba(31,203,107,.35)',0);
  const L=el('div','dcard','left:90px;top:930px;width:900px;height:560px;padding:28px 34px;background:#1F1F25',null,r);st.L=L;
  L.innerHTML=`<div style="display:flex;align-items:center;gap:14px">${IC.doc('#A3A3AE',40)}<div style="font-weight:700;font-size:28px">The Ultimate Guide to SEO</div><div class="pill" style="margin-left:auto;background:#30303A;color:#AAA;font-size:19px">3,000 words</div></div>
   <div style="margin-top:24px;color:#A8A8B2;font-size:21px;font-weight:600">READERS STILL SCROLLING</div><div class="av" style="display:flex;gap:10px;margin-top:14px"></div>
   <div style="margin-top:28px;display:flex;gap:16px;align-items:flex-end;height:180px" class="fun"></div><div style="display:flex;justify-content:space-between;color:#A6A6B0;font-size:18px;margin-top:8px"><span>Intro</span><span>25%</span><span>50%</span><span>75%</span><span>End</span></div>
   <div class="fin" style="position:absolute;right:34px;top:150px;font-size:24px;font-weight:700"></div>`;
  const av=L.querySelector('.av');st.avs=[...Array(10)].map((_,i)=>el('div','',`width:56px;height:56px;border-radius:50%;background:hsl(${i*36},55%,60%);border:3px solid #1F1F25;display:flex;align-items:center;justify-content:center;font-weight:800;color:#141414`,String.fromCharCode(65+i),av));
  const fn=L.querySelector('.fun');st.bars=[100,62,31,12,0].map(v=>({v,e:el('div','',`flex:1;border-radius:12px 12px 4px 4px;background:linear-gradient(${RED},rgba(255,77,61,.3));height:0`,null,fn)}));
  return st},
update(s,lt,t){typed(s.A.querySelector('.ans'),'Long enough to fully answer the question — and not a word longer. For most topics, that’s far shorter than you think.',P(t,T(181),1.4),false);
  popIn(s.A,t,s.t0,{dy:-60,s0:.9,post:'translateZ(60px)'});const v=P(t,T(188)-.1,.4);s.A.style.borderColor=v>0?GREEN:'transparent';s.g.style.opacity=.9*v;
  ['b1','b2','b3'].forEach((b,i)=>popIn(s.A.querySelector('.'+b),t,T(188)-.1+i*.12,{dy:0,s0:0,k:2.5}));
  popIn(s.L,t,T(189)-.2,{dy:120,s0:.9,post:'rotateX(10deg)'});
  s.bars.forEach((b,i)=>{b.e.style.height=(1.7*b.v*eOut(P(t,T(191)+i*.15,.5)))+'px'});
  s.avs.forEach((a,i)=>{const d=T(192)+i*.12;const p=P(t,d,.3);a.style.opacity=1-p*.85;a.style.transform=`translateY(${eIn(p)*40}px) scale(${1-.3*p})`;a.style.filter=`grayscale(${p})`});
  const fin=s.L.querySelector('.fin');fin.innerHTML=t>T(193)?IC.x(RED,56):'';fin.style.transform=`scale(${back(P(t,T(193),.3),3)})`;
}});

/* ===== S19 STRATEGY: big caption moment (cream) ===== */
scene({t0:T(195)-.12,bg:'cream',bigcap:true,zoom:.1,
sfx:[[T(195),'riser',.8],[T(199),'hit',1],[T(199)+.05,'sparkle',.6]],
build(r){const st={};st.rays=el('div','abs','left:-210px;top:410px;width:1500px;height:1500px;border-radius:50%;background:repeating-conic-gradient(rgba(216,158,55,.09) 0 7deg,transparent 7deg 20deg);-webkit-mask-image:radial-gradient(circle,#000 15%,transparent 65%)',null,r);
  st.m=mascot(r,170);st.ex=el('div','abs',`font-weight:900;font-size:90px;color:${CORAL}`,'!!',r);st.b=burst(r,16,CORAL,'spark');return st},
update(s,lt,t){s.rays.style.transform=`rotate(${t*14}deg) scale(${.8+.25*P(t,T(199),.4)})`;s.rays.style.opacity=.6+.4*P(t,T(199),.3);
  const j=P(t,T(199),.6);s.m.set(540,1420-Math.sin(Math.PI*j)*90,t,{mood:t>T(199)?'happy':'idle',squash:-.12*Math.sin(Math.PI*j)});
  s.ex.style.left='610px';s.ex.style.top=(1160-Math.sin(Math.PI*j)*90)+'px';s.ex.style.opacity=P(t,T(199),.15);s.ex.style.transform=`scale(${back(P(t,T(199),.3),3)}) rotate(12deg)`;
  s.b(540,1000,P(t,T(199),1));
}});

/* ===== S20 CONTENT LIBRARY: glowing topic graph (cream) ===== */
scene({t0:T(200)-.12,bg:'cream',zoom:.06,
sfx:[[T(200),'pop',.8],[T(202)-.1,'pops',.8],[T(204),'success',.8]],
build(r){const st={sp:[]};const cx=540,cy=1010;
  const labs=['Pricing','How-to guides','Comparisons','FAQs','Use cases','Glossary'];
  let lines='';labs.forEach((l,i)=>{const a=-Math.PI/2+i*Math.PI/3;const x=cx+Math.cos(a)*330,y=cy+Math.sin(a)*380;
    lines+=`<path class="ln${i}" d="M${cx} ${cy} L${x} ${y}" stroke="${CORAL}" stroke-width="4" stroke-dasharray="400" stroke-dashoffset="400" stroke-linecap="round" opacity=".7"/><circle class="pu${i}" r="9" fill="${CORAL}" opacity="0"/>`;
    st.sp.push({x,y,c:el('div','card light-shadow',`left:${x-145}px;top:${y-48}px;width:290px;height:96px;border-radius:22px;display:flex;align-items:center;gap:14px;padding:0 20px;z-index:2`,
      `${IC.doc(CORAL,40)}<div style="font-weight:700;font-size:24px;letter-spacing:-.3px;flex:1">${l}</div><div class="ck">${IC.check(GREEN,30)}</div>`,r)})});
  st.svg=el('div','abs','inset:0',`<svg width="1080" height="1920">${lines}</svg>`,r);st.svg.style.zIndex=1;
  st.hub=el('div','card',`left:${cx-180}px;top:${cy-85}px;width:360px;height:170px;border-radius:32px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:#141414;color:#fff;z-index:3;box-shadow:0 30px 70px rgba(0,0,0,.3),0 0 0 8px rgba(216,158,55,.15)`,
    `<div style="display:flex;align-items:center;gap:12px">${IC.book(CORAL,46)}<div style="font-weight:800;font-size:33px">Content library</div></div><div style="font-size:22px;color:#9A9AA0">one niche · real questions</div>`,r);
  st.hg=glow(r,cx,cy,300,'rgba(216,158,55,.35)',0);st.m=mascot(r,120);st.m.el.style.zIndex=4;return st},
update(s,lt,t){const hp=back(P(t,T(200)-.05,.45),2);s.hub.style.transform=`scale(${hp})`;s.hg.style.opacity=.8*hp*(.8+.2*Math.sin(t*4));
  s.sp.forEach((o,i)=>{const t0=T(202)-.2+i*.13;const p=back(P(t,t0+.12,.4),2);o.c.style.transform=`scale(${p}) translateY(${Math.sin(t*2+i)*5}px)`;o.c.style.opacity=clamp(p*3);
    s.svg.querySelector('.ln'+i).setAttribute('stroke-dashoffset',400*(1-eOut(P(t,t0,.3))));
    const pu=s.svg.querySelector('.pu'+i);const q=((t-t0)*.9+i*.17)%1;pu.setAttribute('opacity',t>t0+.3?Math.sin(Math.PI*q):0);pu.setAttribute('cx',lerp(540,o.x,q));pu.setAttribute('cy',lerp(1010,o.y,q));
    o.c.querySelector('.ck').style.transform=`scale(${back(P(t,T(204)+i*.05,.3),3)})`});
  const mp=back(P(t,T(201),.4),2);s.m.set(680,928,t,{op:mp>0?1:0,s:mp,mood:'happy'});
}});

/* ===== S21 REAL QUESTIONS: People-also-ask accordion (cream) ===== */
scene({t0:T(205)-.12,bg:'cream',tr:'whip',zoom:.05,
sfx:[[T(207),'click',.7],[T(207)+.35,'click',.7],[T(208),'click',.7],[T(208)+.35,'click',.7],[T(209)+.2,'click',.7],[T(211),'success',.6]],
build(r){const st={};
  const C=el('div','card light-shadow','left:90px;top:500px;width:900px;padding:30px 34px 20px',null,r);st.C=C;
  const qs=['How much does SEO cost in 2026?','How long until SEO starts working?','Is SEO worth it for a small business?','SEO or paid ads — which first?','Can AI-written content rank?'];
  C.innerHTML=`<div style="display:flex;align-items:center;gap:12px;font-weight:800;font-size:30px">${IC.G(40,'#F1F1EF')} People also ask</div>`+qs.map((q,i)=>`<div class="q" style="border-top:1.5px solid #ECEAE4;margin-top:${i?0:18}px"><div style="display:flex;align-items:center;gap:14px;height:88px;font-size:26px;font-weight:600"><span class="ck" style="width:32px">${IC.check(GREEN,30)}</span><span style="flex:1">${q}</span><span class="ch" style="font-size:24px;color:#999;display:inline-block">⌄</span></div>
     <div class="ex" style="height:0;overflow:hidden"><div style="display:flex;align-items:center;gap:12px;padding:0 0 18px 46px"><span class="pill" style="background:#FBF0DA;color:${CORAL};font-size:19px">${IC.doc(CORAL,22)} yourblog.com/${['seo-cost','seo-timeline','seo-small-business','seo-vs-ads','ai-content-seo'][i]}</span><span class="muted" style="font-size:19px">answered</span></div></div></div>`).join('');
  st.qs=[...C.querySelectorAll('.q')];st.cur=cursor(r);st.m=mascot(r,130);return st},
update(s,lt,t){popIn(s.C,t,s.t0,{dy:80,s0:.92,post:`rotateX(${8-4*P(t,s.t0,3)}deg)`});
  const times=[T(207),T(207)+.35,T(208),T(208)+.35,T(209)+.2];
  s.qs.forEach((q,i)=>{const p=eOut(P(t,times[i],.3));q.querySelector('.ex').style.height=(56*p)+'px';q.querySelector('.ch').style.transform=`rotate(${180*p}deg)`;
    q.querySelector('.ck').style.transform=`scale(${back(P(t,times[i]+.15,.3),3)})`});
  let k=0;times.forEach((x,i)=>{if(t>x-.25)k=i});const y=500+80+k*88+44+ (k>0?k*56*0:0)+[0,56,112,168,224][k];
  cursorAt(s.cur,lerp(900,880,P(t,s.t0,1)),lerp(1600,y,eIO(P(t,s.t0+.1,.4))),times.some(x=>t>x&&t<x+.3)?((t-times.filter(x=>t>x).pop())/.3):null);s.cur.style.opacity=P(t,s.t0+.1,.2);
  const mp=P(t,T(211),.4);s.m.set(940,520,t,{op:mp>0?1:0,s:back(mp,2),mood:'happy',look:-1});
}});

/* ===== S22 DEEPER than competing pages (cream) ===== */
scene({t0:T(212)-.12,bg:'cream',zoom:.05,
sfx:[[T(213),'riser',.6],[T(213)+.1,'pops',.8],[T(216),'success',.7]],
build(r){const st={};
  const a=browser(r,'left:60px;top:560px;width:420px;height:760px','competitor.com');a.body.innerHTML=`<div style="padding:24px">${[90,70,85,60].map(w=>`<div style="height:11px;width:${w}%;background:#DAD8D2;border-radius:6px;margin-bottom:14px"></div>`).join('')}<div style="margin-top:20px;font-weight:700;font-size:20px;color:#999">That's it.</div></div>`;st.a=a;
  const b=browser(r,'left:520px;top:500px;width:500px;height:880px','yourblog.com');st.b=b;
  const secs=['Original data','Real examples','Screenshots','Expert take','Step-by-step','FAQs'];
  b.body.innerHTML=`<div style="padding:22px 24px">${secs.map(x=>`<div class="sc" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:16px;background:#fff;border:1.5px solid #EEE;margin-bottom:12px;font-size:23px;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,.04)">${IC.check(GREEN,28)}${x}</div>`).join('')}</div>`;st.secs=[...b.body.querySelectorAll('.sc')];
  const mtr=(l,c,cls)=>`<div style="display:flex;align-items:center;gap:16px;margin-top:14px"><div style="width:180px;font-weight:700;font-size:22px">${l}</div><div style="flex:1;height:22px;border-radius:11px;background:#EAE6DE;overflow:hidden"><div class="${cls}" style="height:100%;width:0;background:${c};border-radius:11px"></div></div><div class="${cls}t" style="width:70px;font-weight:800;font-size:24px"></div></div>`;
  st.mt=el('div','card light-shadow','left:90px;top:1400px;width:900px;padding:18px 30px 26px;z-index:4',`<div class="muted" style="font-size:19px;font-weight:700;letter-spacing:1px">CONTENT DEPTH</div>${mtr('Competitor','#B5AFA4','m1')}${mtr('Your page',CORAL,'m2')}`,r);
  return st},
update(s,lt,t){s.a.el.style.transform=`rotateY(16deg) translateZ(-60px)`;s.a.el.style.filter='saturate(.6)';popIn(s.a.el,t,s.t0,{dx:-100,dy:0,s0:.9,post:'rotateY(16deg)'});
  popIn(s.b.el,t,s.t0+.1,{dx:100,dy:0,s0:.9,post:'rotateY(-12deg) translateZ(40px)'});
  s.secs.forEach((e,i)=>popIn(e,t,T(213)+i*.14,{dy:20,s0:.7,k:2.4}));
  popIn(s.mt,t,T(214),{dy:60,s0:.9});const m=eOut(P(t,T(214)+.1,.8));
  s.mt.querySelector('.m1').style.width=32*m+'%';s.mt.querySelector('.m2').style.width=94*m+'%';s.mt.querySelector('.m1t').textContent=Math.round(32*m)+'%';s.mt.querySelector('.m2t').textContent=Math.round(94*m)+'%';
}});

/* ===== S23 BEFORE PUBLISHING: CMS editor + question modal ===== */
scene({t0:T(217)-.12,bg:'dark',tr:'whip',zoom:.05,
sfx:[[T(218),'whoosh',.5],[T(221)-.05,'pop',1],[T(223),'ding',.8]],
build(r){const st={};
  const B=browser(r,'left:80px;top:520px;width:920px;height:900px','yourblog.com/admin/new-post',{dark:true});st.B=B;
  B.body.innerHTML=`<div style="display:flex;height:100%"><div style="flex:1;padding:36px"><div style="font-weight:900;font-size:42px;letter-spacing:-1.5px">New post</div>${[95,88,92,70,0,90,84,60].map(w=>w?`<div class="line-ph" style="height:13px;width:${w}%;margin-top:18px;background:#44444E"></div>`:'<div style="height:20px"></div>').join('')}</div>
   <div style="width:300px;border-left:1.5px solid #383842;padding:30px 26px"><div style="color:#A8A8B2;font-size:20px;font-weight:700;letter-spacing:1px">STATUS</div><div style="font-size:24px;margin-top:8px">Draft</div><div class="pb" style="margin-top:30px;height:78px;border-radius:20px;background:${CORAL};color:#141414;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:30px;box-shadow:0 0 40px rgba(216,158,55,.5)">Publish</div></div></div>`;
  st.dim=el('div','abs','inset:0;background:rgba(5,5,6,.6);opacity:0;z-index:3',null,r);
  st.mod=el('div','card','left:390px;top:760px;width:300px;height:300px;border-radius:50%;z-index:4;display:flex;align-items:center;justify-content:center;background:'+CORAL+';box-shadow:0 0 0 14px rgba(216,158,55,.2),0 30px 80px rgba(0,0,0,.5)',
    `<div style="font-family:ISerif;font-style:italic;font-size:260px;line-height:.9;color:#141414">?</div>`,r);
  st.cur=cursor(r);st.cur.style.zIndex=5;return st},
update(s,lt,t){s.B.el.style.transform=`rotateX(8deg) rotateY(${8-6*P(t,s.t0,5)}deg)`;
  const pb=s.B.body.querySelector('.pb');pb.style.transform=`scale(${1+.04*Math.sin(t*6)})`;
  const mv=eIO(P(t,T(218),1.2));const stop=T(221)-.1;cursorAt(s.cur,lerp(560,840,mv)-(t>stop?20*eOut(P(t,stop,.4)):0),lerp(1500,700,mv)+(t>stop?30*eOut(P(t,stop,.4)):0),null);s.cur.style.opacity=P(t,T(218),.2);
  s.dim.style.opacity=.6*P(t,stop,.3);popIn(s.mod,t,stop,{dy:80,s0:0,k:2.6,post:`rotate(${Math.sin(t*3)*5}deg)`});if(t>stop)pb.style.transform='scale(1)';
}});

/* ===== S24 PAGE ONE comparison scan ===== */
scene({t0:T(225)-.12,bg:'dark',zoom:.05,
sfx:[[T(225),'whoosh',.6],[T(228),'scan',.9],[T(231),'tick',.6],[T(232),'tick',.6],[T(233),'success',.9]],
build(r){const st={};glow(r,700,900,500,'rgba(76,125,255,.25)',.7);
  const stack=el('div','abs p3','left:560px;top:520px;width:440px;height:900px',null,r);st.stack=stack;st.res=[];
  for(let i=0;i<8;i++){const d=DOMS[i%6];st.res.push(el('div','abs',`left:0;top:${i*102}px;width:440px;height:90px;border-radius:16px;background:#2A2A32;border:1.5px solid #46464F;display:flex;align-items:center;gap:12px;padding:0 18px;font-size:19px;color:#AAA`,
    `<b style="color:#666;width:30px">#${i+1}</b>${FAV(d[1],d[2])}<div style="flex:1"><div style="color:#8AB4FF;font-weight:700;font-size:19px">${['SEO Basics Guide','10 SEO Tips','What Is SEO?','SEO in 2026','SEO Checklist','Beginner SEO','SEO Explained','SEO 101'][i]}</div><div class="line-ph" style="height:6px;margin-top:8px;width:80%"></div></div>`,stack))}
  el('div','pill abs',`left:560px;top:460px;background:#30303A;color:#AAA;font-size:20px`,'PAGE ONE',r);
  const Y=el('div','card','left:70px;top:560px;width:520px;padding:26px 28px;z-index:3',null,r);st.Y=Y;
  const secs=[['What is SEO',0],['Why it matters',0],['Basic checklist',0],['Original survey: 312 sites',1]];
  Y.innerHTML=`<div style="display:flex;align-items:center;gap:12px;font-size:20px;color:#777;font-weight:600">${FAV(CORAL,'Y')} Your page</div><div style="font-weight:800;font-size:30px;margin-top:8px;letter-spacing:-.5px">SEO Strategy Guide</div>`+
    secs.map(([x,u])=>`<div class="sx" data-u="${u}" style="position:relative;margin-top:14px;padding:16px 18px;border-radius:16px;border:2px solid #EEE;font-size:23px;font-weight:700;display:flex;align-items:center;gap:12px"><span class="ic" style="width:28px"></span><span class="tx">${x}</span><span class="tg pill" style="margin-left:auto;font-size:16px;padding:4px 10px;opacity:0"></span></div>`).join('');
  st.sx=[...Y.querySelectorAll('.sx')];st.beam=el('div','abs',`left:60px;width:540px;height:8px;border-radius:4px;background:${BLUE};box-shadow:0 0 30px 8px rgba(76,125,255,.6);z-index:4;opacity:0`,null,r);
  st.g=glow(r,330,1060,300,'rgba(216,158,55,.5)',0);return st},
update(s,lt,t){s.stack.style.transform=`rotateY(-28deg) rotateX(6deg) translateZ(-80px)`;
  s.res.forEach((e,i)=>popIn(e,t,s.t0+.05+i*.06,{dx:120,dy:0,s0:.9}));popIn(s.Y,t,T(226),{dx:-120,dy:0,s0:.9,post:'rotateY(10deg) translateZ(60px)'});
  const sc0=T(228),sc1=T(233);const bp=P(t,sc0,sc1-sc0);s.beam.style.opacity=t>sc0&&t<sc1+.3?1:0;s.beam.style.top=(690+bp*400)+'px';
  s.sx.forEach((e,i)=>{const at=sc0+(i+.6)*(sc1-sc0)/4;const on=t>at;const u=e.dataset.u==='1';const tg=e.querySelector('.tg');
    const mi=[1,4,6][i];if(!u&&mi!=null){const fl=Math.sin(Math.PI*P(t,at,.6));s.res[mi].style.borderColor=on?`rgba(216,158,55,${.4+.6*fl})`:'';s.res[mi].style.boxShadow=on?`0 0 ${30*fl}px rgba(216,158,55,.7)`:''}
    if(on){tg.style.opacity=1;tg.innerHTML=u?IC.spark(CORAL,30):'<svg width="30" height="30" viewBox="0 0 24 24"><rect x="7" y="3" width="13" height="16" rx="2" fill="none" stroke="#B5B5B5" stroke-width="2"/><rect x="3" y="6" width="13" height="16" rx="2" fill="#fff" stroke="#B5B5B5" stroke-width="2"/></svg>';tg.style.background='transparent';
      e.querySelector('.tx').style.color=u?'#141414':'#BBB';e.style.opacity=u?1:.55;e.style.borderColor=u?CORAL:'#EEE';e.style.background=u?'#FBF0DA':'';e.style.boxShadow=u?'0 0 40px rgba(216,158,55,.55)':''}
    e.style.transform=`scale(${1+(u?.06:0)*Math.sin(Math.PI*P(t,at,.35))})`});
  s.g.style.opacity=.9*P(t,sc1-.1,.4);
}});

/* ===== S25 DON'T PUBLISH ===== */
scene({t0:T(235)-.12,bg:'dark',tr:'whip',zoom:.06,
sfx:[[T(240),'pop',.7],[T(242)-.05,'error',1],[T(243),'click',.8],[T(244),'thud',.6]],
build(r){const st={};st.gl=glow(r,540,1000,460,'rgba(216,158,55,.4)',.7);
  const C=el('div','dcard','left:140px;top:560px;width:800px;padding:36px 40px;background:#202027',null,r);st.C=C;
  C.innerHTML=`<div style="font-weight:800;font-size:30px">Pre-publish check</div>
   <div class="ck1" style="margin-top:22px;display:flex;align-items:center;gap:16px;padding:20px 22px;border-radius:18px;border:2px solid #46464F;font-size:26px;font-weight:600"><span class="bx" style="width:40px;height:40px;border-radius:10px;border:3px solid #55555C;display:inline-flex;align-items:center;justify-content:center"></span>Adds something page one doesn't have?</div>
   <div class="btn" style="margin-top:30px;height:110px;border-radius:26px;background:${CORAL};color:#141414;display:flex;align-items:center;justify-content:center;gap:16px;font-weight:900;font-size:42px;position:relative;overflow:hidden"><span class="bl">Publish</span><div class="sl" style="position:absolute;left:8%;right:8%;top:50%;height:7px;background:#fff;border-radius:4px;transform:scaleX(0);transform-origin:left"></div></div>
   <div class="dr"></div>`;
  st.cur=cursor(r);return st},
update(s,lt,t){popIn(s.C,t,s.t0,{dy:100,s0:.9,post:`rotateX(${10-6*P(t,s.t0,4)}deg)`});const C=s.C;
  const bx=C.querySelector('.bx'),c1=C.querySelector('.ck1');const q=t>T(240)-.05;bx.innerHTML=q?IC.bigx(RED,30):'';bx.style.borderColor=q?RED:'#55555C';c1.style.borderColor=q?'rgba(255,77,61,.6)':'#46464F';
  c1.style.transform=`translateX(${q?Math.sin((t-T(240))*60)*8*(1-P(t,T(240),.4)):0}px)`;
  const no=T(242)-.05;const b=C.querySelector('.btn');const off=P(t,no,.35);
  b.style.background=off>0?`rgb(${lerp(255,46,off)},${lerp(106,46,off)},${lerp(61,52,off)})`:CORAL;b.querySelector('.sl').style.transform=`scaleX(${eOut(P(t,no+.1,.3))})`;
  b.querySelector('.bl').textContent=t>T(243)?"Don't publish":'Publish';b.style.color=off>.5?'#D0D0D6':'#141414';b.querySelector('.sl').style.background=RED;
  s.gl.style.background=`radial-gradient(circle,${off>.3?'rgba(255,77,61,.35)':'rgba(216,158,55,.4)'} 0%,transparent 68%)`;
  const mv=eIO(P(t,T(237),.8)),back_=eIO(P(t,T(243)+.1,.6));cursorAt(s.cur,lerp(820,560,mv)+back_*260,lerp(1500,1080,mv)+back_*300,null);s.cur.style.opacity=P(t,T(237),.2);
  C.querySelector('.dr').style.opacity=P(t,T(244),.3);
}});

/* ===== S26 CTA: follow ===== */
scene({t0:T(245)-.12,bg:'dark',keep:true,zoom:.04,
sfx:[[T(245)+.55,'click',.5],[TE(250)+.25,'success',.9],[TE(250)+.3,'sparkle',.6]],
build(r){const st={};st.g=glow(r,540,880,560,'rgba(255,185,56,.25)',.8);
  st.rays=el('div','abs','left:-210px;top:130px;width:1500px;height:1500px;border-radius:50%;background:repeating-conic-gradient(rgba(255,185,56,.07) 0 6deg,transparent 6deg 18deg);-webkit-mask-image:radial-gradient(circle,#000 15%,transparent 60%)',null,r);
  const C=el('div','dcard','left:110px;top:600px;width:860px;padding:44px 44px 40px;background:#202027',null,r);st.card=C;
  C.innerHTML=`<div style="display:flex;align-items:center;gap:28px"><div style="width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#33333B,#0C0C0E);border:3px solid #FFB938;display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(255,185,56,.3)">${IC.logo(96)}</div>
   <div><div style="font-weight:800;font-size:52px;letter-spacing:-1.5px">Answer Theory</div><div style="font-size:26px;color:#A0A0A8;margin-top:8px;line-height:1.35">SEO &amp; AI search,<br>without the fluff.</div></div></div>
   <div class="btn" style="margin-top:38px;height:104px;border-radius:26px;background:${CORAL};color:#141414;display:flex;align-items:center;justify-content:center;gap:14px;font-weight:800;font-size:40px;box-shadow:0 0 40px rgba(216,158,55,.45)">Follow</div>`;
  st.n1=el('div','abs','left:470px;top:1150px;z-index:4',`<svg width="140" height="140" viewBox="0 0 24 24"><path d="M12 3a6 6 0 00-6 6v4l-2 3h16l-2-3V9a6 6 0 00-6-6z" fill="${CORAL}"/><circle cx="12" cy="19" r="2.2" fill="${CORAL}"/></svg>`,r);
  st.n2=el('div','abs',`left:620px;top:1120px;z-index:5;font-weight:900;font-size:64px;color:${GREEN}`,'+1',r);
  st.cur=cursor(r);st.burst=burst(r,18,'#FFB938');st.m=mascot(r,140);return st},
update(s,lt,t){const cp=back(P(t,T(245)-.2,.5),1.3);s.card.style.transform=`translateY(${(1-cp)*160}px) scale(${.9+.1*cp}) rotateX(${6-6*cp}deg)`;s.card.style.opacity=clamp(cp*2);
  s.rays.style.transform=`rotate(${t*10}deg)`;
  const click=T(245)+.55;const mv=eIO(P(t,T(245),.5));cursorAt(s.cur,lerp(860,560,mv),lerp(1520,960,mv),t>click?P(t,click,.35):null);s.cur.style.opacity=P(t,T(245),.15)*(1-P(t,click+1.2,.3));
  const b=s.card.querySelector('.btn');const on=t>click;b.innerHTML=on?`${IC.check('#1FCB6B',40)} Following`:'Follow';b.style.background=on?'#3A3A44':CORAL;b.style.color=on?'#fff':'#141414';b.style.boxShadow=on?'none':'0 0 40px rgba(216,158,55,.45)';
  b.style.transform=`scale(${1-.06*Math.sin(Math.PI*P(t,click-.05,.25))})`;s.burst(540,960,P(t,click,.9));
  popIn(s.n1,t,click+.45,{dy:40,s0:0,k:2.6,post:`rotate(${t>click+.6?Math.sin((t-click)*18)*18*Math.exp(-(t-click-.6)*1.5):0}deg)`});s.n1.style.transformOrigin='50% 10%';
  const fp=P(t,click+.7,1.2);s.n2.style.opacity=t>click+.7?Math.min(1,fp*5)*(1-P(t,click+1.6,.4)):0;s.n2.style.transform=`translateY(${-90*eOut(fp)}px) scale(${.6+.4*back(P(t,click+.7,.3),2)})`;
  const jp=P(t,click,.6);s.m.set(880,612-Math.sin(Math.PI*jp)*70,t,{op:cp,mood:on?'happy':'idle',squash:-.12*Math.sin(Math.PI*jp)});
}});

finalize();
