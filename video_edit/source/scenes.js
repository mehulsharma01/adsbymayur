[3,6,16,29,40,48,55,59,66,74,76,90,97,104,111,117,123,127,134,139,152,161,163,177,181,188,193,199,202,207,213,223,233,234,240,242,243,249].forEach(i=>EMPH.add(i));
buildChunks([]);
const TITLES=['10 Easy SEO Tips for 2026','What Is Keyword Research?','Best SEO Tools (Updated)','How to Rank on Google Fast','SEO Checklist for Beginners','On-Page SEO: Full Guide','Why Backlinks Matter','Meta Tags Explained','Local SEO in 5 Steps','Content Marketing 101','Technical SEO Basics','Blogging for Traffic','SEO vs SEM','Long-tail Keywords Guide'];

/* ===== S1 HOOK: CMS publishing 100 posts ===== */
scene({t0:0,bg:'dark',zoom:.08,
sfx:[[0,'riser',.5],[0.15,'ticks',.7],[1.5,'pop',.9],[T(6)-.05,'pop',.9],[T(6)+.1,'shimmer',.5]],
build(r){const st={};glow(r,540,960,620,'rgba(216,158,55,.35)',.6);
  const w=el('div','abs p3','left:0;top:0;width:1080px;height:1920px',null,r);st.w=w;
  const B=browser(w,'left:120px;top:560px;width:840px;height:780px','yourblog.com/admin/posts',{dark:true});st.B=B;
  B.body.innerHTML=`<div style="display:flex;align-items:center;padding:28px 30px 18px"><div style="font-weight:800;font-size:36px;letter-spacing:-1px">Posts</div><div class="pill" style="margin-left:18px;background:#1F1F23;color:#AAA;font-size:20px">All · <b class="n" style="color:#fff;margin-left:6px">0</b></div><div class="pill" style="margin-left:auto;background:${CORAL};color:#141414;font-size:22px">+ Add new</div></div>
   <div style="display:flex;padding:0 30px 10px;color:#A0A0AA;font-size:18px;font-weight:600;letter-spacing:1px"><span style="flex:1">TITLE</span><span style="width:150px">STATUS</span><span style="width:90px">DATE</span></div><div class="lst" style="position:relative;height:600px;overflow:hidden"></div>`;
  st.rows=[];const L=B.body.querySelector('.lst');
  for(let k=0;k<11;k++){st.rows.push(el('div','abs',`left:30px;right:30px;height:62px;display:flex;align-items:center;border-top:1px solid #383842;font-size:23px;font-weight:500`,
   `<span style="width:22px;height:22px;border-radius:6px;border:2px solid #55555F;margin-right:16px"></span><span class="tt" style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#E8E8EC"></span><span style="width:150px"><span class="pill" style="background:rgba(31,203,107,.14);color:${GREEN};font-size:18px;padding:5px 12px">Published</span></span><span style="width:90px;color:#A6A6B0;font-size:20px">Today</span>`,L))}
  st.big=el('div','abs',`left:70px;top:470px;padding:22px 34px;border-radius:30px;background:rgba(20,20,24,.85);border:1.5px solid #3A3A42;box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 60px rgba(216,158,55,.25);display:flex;align-items:baseline;gap:14px`,
    `<span class="bn" style="font-weight:900;font-size:110px;letter-spacing:-5px;color:${CORAL};line-height:1">0</span><span style="font-size:32px;font-weight:700;color:#ddd">posts<br><span style="color:#A8A8B2;font-size:24px;font-weight:500">published</span></span>`,w);
  st.trust=el('div','dcard',`left:600px;top:1210px;width:400px;padding:26px 28px;background:rgba(22,22,26,.95)`,
    `<div style="display:flex;align-items:center;gap:14px">${IC.G(52)}<div style="font-weight:700;font-size:28px">Trust</div></div>
     <div style="margin-top:20px;height:14px;border-radius:8px;background:#3A3A44;overflow:hidden"><div class="tb" style="height:100%;width:0;background:linear-gradient(90deg,${RED},${GOLD})"></div></div>
     <div style="display:flex;justify-content:flex-end;margin-top:10px;font-size:26px"><span class="tv" style="color:${RED};font-weight:800"></span></div>`,w);
  st.m=mascot(w,130);return st},
update(s,lt,t){
  const N=Math.min(100,Math.floor(100*eOut(P(t,0.1,1.45))));
  s.B.body.querySelector('.n').textContent=N;s.big.querySelector('.bn').textContent=N;
  const frac=(100*eOut(P(t,0.1,1.45)))%1;
  s.rows.forEach((r,k)=>{const n=N-k;r.style.opacity=n>0?1:0;r.style.top=((k+(N<100?1-frac:0)-1)*62+62)+'px';r.querySelector('.tt').textContent=n>0?`${TITLES[n%TITLES.length]} #${n}`:'';r.style.background=k===0&&N<100?'rgba(216,158,55,.08)':''});
  const ep=back(P(t,0,.6),1.3);
  s.B.el.style.transform=`translateY(${(1-ep)*300}px) rotateX(${16-6*lt/3}deg) rotateY(${-14+5*lt/3}deg) rotateZ(2deg)`;s.B.el.style.opacity=clamp(ep*2);
  popIn(s.big,t,.25,{post:`translateZ(140px) rotateY(-8deg)`});s.big.style.transform+=` scale(${1+.08*Math.sin(Math.PI*P(t,1.45,.3))})`;
  popIn(s.trust,t,T(6)-.1,{dx:120,post:'translateZ(200px) rotateY(-10deg)'});
  const tw=t>T(6)+.15?11+5*Math.abs(Math.sin((t-T(6))*7))*Math.exp(-(t-T(6))*1.2):0;s.trust.querySelector('.tb').style.width=tw+'%';s.trust.querySelector('.tv').textContent=tw>0?Math.round(tw)+'%':'';
  const mp=P(t,1.6,.4);s.m.set(860,575,t,{op:mp>0?1:0,s:back(mp,2),look:-1,mood:'idle'});
}});

/* ===== S2 HURT: rankings crash after mass publishing ===== */
scene({t0:T(9)-.12,bg:'dark',tr:'whip',zoom:.05,
sfx:[[T(11),'pop',.8],[T(16)-.05,'drop',1],[T(16)+.1,'error',.7],[T(16)+.5,'pop',.6],[T(16)+.75,'pop',.6],[T(16)+1,'pop',.6]],
build(r){const st={};glow(r,540,1000,600,'rgba(255,77,61,.25)',.6);
  const B=browser(r,'left:80px;top:520px;width:920px;height:900px','console.search/performance',{dark:true});st.B=B;
  const kpi=(l,v,id)=>`<div style="flex:1;padding:22px 24px;border-radius:18px;background:#2A2A32;border:1.5px solid #3A3A44"><div style="color:#A8A8B2;font-size:19px;font-weight:600">${l}</div><div class="${id}" style="font-size:44px;font-weight:800;letter-spacing:-1.5px;margin-top:6px">${v}</div></div>`;
  B.body.innerHTML=`<div style="padding:26px 30px 0;display:flex;gap:16px">${kpi('Total clicks','12.4K','k1')}${kpi('Impressions','318K','k2')}${kpi('Avg. position','4.2','k3')}</div>
   <svg class="ch" width="920" height="470" style="position:absolute;left:0;top:200px"><defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${GREEN}" stop-opacity=".35"/><stop offset="1" stop-color="${GREEN}" stop-opacity="0"/></linearGradient>
   <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${RED}" stop-opacity=".4"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></linearGradient><clipPath id="c1"><rect class="cr1" x="0" y="0" width="0" height="470"/></clipPath><clipPath id="c2"><rect class="cr2" x="470" y="0" width="0" height="470"/></clipPath></defs>
   ${[0,1,2,3].map(i=>`<path d="M30 ${80+i*100}H890" stroke="#3A3A44" stroke-width="2"/>`).join('')}
   <g clip-path="url(#c1)"><path d="M30 380 C100 360 150 330 220 300 S330 230 400 170 S450 120 470 110 V440 H30Z" fill="url(#gA)"/><path d="M30 380 C100 360 150 330 220 300 S330 230 400 170 S450 120 470 110" stroke="${GREEN}" stroke-width="6" fill="none"/></g>
   <g clip-path="url(#c2)"><path d="M470 110 C520 115 540 200 590 280 S700 390 780 405 S860 415 890 418 V440 H470Z" fill="url(#gB)"/><path d="M470 110 C520 115 540 200 590 280 S700 390 780 405 S860 415 890 418" stroke="${RED}" stroke-width="6" fill="none"/></g>
   <g class="pin"><path d="M470 60V440" stroke="#fff" stroke-dasharray="8 8" stroke-width="2.5" opacity=".6"/></g></svg>
   <div class="pinl pill" style="position:absolute;left:330px;top:200px;background:#fff;color:#141414;font-size:21px;box-shadow:0 10px 30px rgba(0,0,0,.4)">${IC.doc(CORAL,26)} Published 100 posts</div>`;
  st.toasts=[['seo tips','3','41'],['blog strategy','5','38'],['content plan','2','29']].map((q,i)=>toast(r,`left:470px;top:${1180+i*96}px;width:560px;z-index:5`,`${IC.x(RED,30)}<span style="flex:1">"${q[0]}"</span><span style="color:#A8A8B2">#${q[1]}</span><span style="color:${RED}">→ #${q[2]}</span>`));
  st.m=mascot(r,140);return st},
update(s,lt,t){const B=s.B.body;const hurt=T(16)-.05;
  B.querySelector('.cr1').setAttribute('width',470*eOut(P(t,T(9),1.3)));B.querySelector('.cr2').setAttribute('width',430*eIO(P(t,hurt,1)));
  popIn(B.querySelector('.pinl'),t,T(11)-.05,{dy:-30});B.querySelector('.pin').style.opacity=P(t,T(11),.3);
  const p=eOut(P(t,hurt+.1,1.2));B.querySelector('.k1').textContent=(lerp(12.4,3.1,p)).toFixed(1)+'K';B.querySelector('.k3').textContent=lerp(4.2,38.7,p).toFixed(1);
  B.querySelector('.k1').style.color=B.querySelector('.k3').style.color=p>.1?RED:'';
  s.B.el.style.transform=`rotateX(${8-3*P(t,s.t0,4)}deg) rotateY(${10-6*P(t,s.t0,4)}deg) translateY(${t>hurt?Math.sin((t-hurt)*55)*10*(1-P(t,hurt,.5)):0}px)`;
  s.toasts.forEach((e,i)=>popIn(e,t,hurt+.5+i*.25,{dx:300,dy:0,s0:.9,post:'translateZ(150px)'}));
  const mp=P(t,hurt+.2,.4);s.m.set(890,535,t,{op:mp>0?1:0,s:back(mp,2),mood:'shock',sweat:t>hurt+.5,look:-1});
}});

/* ===== S3 THINK: light bulb ===== */
scene({t0:T(19)-.12,bg:'dark',zoom:.12,
sfx:[[T(23)-.05,'click',1],[T(23),'ding',.7]],
build(r){const st={};st.g=glow(r,540,900,520,'rgba(255,200,80,.55)',0);
  st.rays=el('div','abs','left:140px;top:500px;width:800px;height:800px;border-radius:50%;background:repeating-conic-gradient(rgba(255,210,120,.16) 0 8deg,transparent 8deg 22deg);-webkit-mask-image:radial-gradient(circle,#000 20%,transparent 70%)',null,r);
  st.b=el('div','abs','left:390px;top:640px;width:300px;height:420px',`<svg viewBox="0 0 100 140" width="300" height="420"><path class="gl1" d="M50 6C27 6 12 23 12 44c0 15 8 24 15 33 4 5 6 10 6 16h34c0-6 2-11 6-16 7-9 15-18 15-33C88 23 73 6 50 6z" fill="#4A4A55" stroke="#8C8C98" stroke-width="2"/>
   <path class="fil" d="M40 92V70l-6-14M60 92V70l6-14M34 56q8 6 16 0t16 0" stroke="#6A6A70" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="33" y="96" width="34" height="9" rx="3" fill="#A8A8B2"/><rect x="35" y="107" width="30" height="9" rx="3" fill="#6E6E74"/><path d="M40 120h20l-4 8h-12z" fill="#55555C"/></svg>`,r);
  st.m=mascot(r,150);return st},
update(s,lt,t){const on=P(t,T(23)-.05,.25);const f=on>0&&on<1?(Math.sin(t*90)>0?1:.3):on;
  s.b.querySelector('.gl1').setAttribute('fill',f>.5?'#FFD36B':'#4A4A55');s.b.querySelector('.gl1').setAttribute('stroke',f>.5?'#FFE6A8':'#8C8C98');s.b.querySelector('.fil').setAttribute('stroke',f>.5?'#FF8A3D':'#9A9AA6');
  s.g.style.opacity=.9*f;s.rays.style.opacity=f;s.rays.style.transform=`rotate(${t*20}deg) scale(${.8+.2*f})`;
  popIn(s.b,t,T(19)-.1,{dy:-80});s.b.style.filter=f>.5?'drop-shadow(0 0 40px rgba(255,200,80,.8))':'';
  s.m.set(540,1420,t,{look:0,mood:f>.5?'happy':'idle',squash:-.1*Math.sin(Math.PI*P(t,T(23),.3))});
}});

/* ===== S4 MENU: 200 items, half frozen (cream) ===== */
const DISH=['Truffle Fries','Pad Thai','Caesar Salad','Lobster Roll','Margherita','Ramen Bowl','Fish Tacos','Smash Burger','Sushi Platter','Mac & Cheese','Chicken Tikka','Falafel Wrap','Lasagna','Poke Bowl','BBQ Ribs','Pho','Paella','Club Sandwich','Dim Sum','Gnocchi','Burrito','Shawarma','Risotto','Fried Chicken'];
const SECT=['STARTERS','MAINS','SUSHI','PIZZA','BURGERS','CURRIES','PASTA','TACOS','DESSERTS'];
scene({t0:T(24)-.12,bg:'cream',zoom:.05,
sfx:[[T(29),'ticks',.6],[T(31)+.1,'pop',.8],[T(35)+.1,'freeze',.8],[T(40)-.05,'stamp',1.1],[T(40),'freeze',.6]],
build(r){const st={rows:[]};glow(r,540,1000,600,'rgba(140,190,255,.0)',0);
  const w=el('div','abs p3','inset:0',null,r);st.w=w;
  const C=el('div','card light-shadow','left:190px;top:540px;width:700px;height:960px;overflow:hidden;background:#FFFDF7;border:1.5px solid #EDE6D6',null,w);st.card=C;
  C.innerHTML=`<div style="padding:34px 42px 22px;border-bottom:2px dashed #E8E2D4;display:flex;align-items:center;gap:18px"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="11"/><path d="M8 6v5a2 2 0 002 2v5M8 6v4M10 6v4M16 6c-2 1-2 5 0 7v5"/></svg>
   <div><div style="font-weight:800;font-size:30px;letter-spacing:4px">THE EVERYTHING BISTRO</div><div class="muted" style="font-size:21px;margin-top:6px">Open all day · Every cuisine ever</div></div></div>`;
  const L=el('div','abs','left:0;right:0;top:132px;bottom:0;-webkit-mask-image:linear-gradient(transparent,#000 8%,#000 82%,transparent)',null,C);
  const inner=el('div','abs','left:0;right:0;top:0',null,L);st.inner=inner;let y=20;
  for(let i=0;i<130;i++){if(i%9===0){el('div','abs',`left:42px;top:${y+8}px;font-weight:800;font-size:20px;letter-spacing:4px;color:${CORAL}`,SECT[(i/9)%SECT.length],inner);y+=50}
    const nm=DISH[i%DISH.length]+(i>=DISH.length?[' Deluxe',' Special',' Lite',' XL',' Combo'][Math.floor(i/DISH.length)%5]:'');
    const row=el('div','abs',`left:42px;right:42px;top:${y}px;height:48px;display:flex;align-items:center;gap:12px;font-size:25px;font-weight:500;color:#2A2420`,
     `<span class="sf" style="width:26px;display:inline-flex;opacity:0">${IC.snow('#3F7BFF',26)}</span><span class="nm">${nm}</span><span style="flex:1;border-bottom:2px dotted #D9D1C0;margin:0 6px;transform:translateY(6px)"></span><span style="font-weight:600">$${(9+Math.floor(rnd(i)*22))}</span>`,inner);
    st.rows.push({row,i,fz:i%2===0||rnd(i+40)<.25});y+=48}
  st.frost=el('div','abs','inset:0;background:linear-gradient(160deg,rgba(225,238,255,.8),rgba(180,210,255,.45) 50%,rgba(235,245,255,.85));opacity:0',null,C);
  st.badge=el('div','abs',`left:700px;top:470px;width:220px;height:220px;border-radius:50%;background:${CORAL};color:#141414;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 30px 60px rgba(216,158,55,.4);border:6px solid #FFF6E5`,
    `<div class="cn" style="font-weight:900;font-size:84px;letter-spacing:-4px;line-height:.9">0</div><div style="font-weight:700;font-size:26px">items</div>`,w);
  st.thermo=toast(w,'left:120px;top:1380px;z-index:3',`<span style="font-size:30px">🌡</span><span style="color:#2F6BFF;font-weight:800">-18°C</span>`,false);
  st.stamp=el('div','abs',`left:230px;top:920px;width:620px;height:180px;border:9px solid #2F6BFF;border-radius:24px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;gap:22px;color:#2F6BFF;font-weight:900;font-size:100px;letter-spacing:6px;box-shadow:0 30px 70px rgba(47,107,255,.3)`,IC.snow('#2F6BFF',76)+'FROZEN',w);
  st.flakes=[...Array(26)].map((_,i)=>el('div','abs','',IC.snow(i%3?'#8DB8FF':'#4C86FF',18+rnd(i)*36),w));
  st.m=mascot(w,150);return st},
update(s,lt,t){const fz=T(40)-.04;
  const c=eOut(P(t,T(29)-.1,T(31)-T(29)+.5));s.badge.querySelector('.cn').textContent=Math.round(200*c);
  popIn(s.badge,t,T(29)-.2,{post:`translateZ(120px) rotate(${8+4*Math.sin(t*2)}deg) scale(${1+.1*Math.sin(Math.PI*P(t,T(31),.3))})`});
  const off=70*(Math.min(t,fz)-s.t0)+3800*eIO(P(t,T(29)-.3,fz+.35-(T(29)-.3)));s.inner.style.transform=`translateY(${-off}px)`;
  s.rows.forEach(o=>{const on=o.fz&&t>T(35)+rnd(o.i)*.9;o.row.querySelector('.sf').style.opacity=on?1:0;o.row.querySelector('.nm').style.color=on?'#3F7BFF':''});
  const shake=t>fz+.12?Math.sin((t-fz)*70)*14*(1-P(t,fz+.12,.35)):0;
  s.card.style.transform=`rotateX(${14-4*P(t,s.t0,5)}deg) rotateZ(${-4+2*P(t,s.t0,5)}deg) translateX(${shake}px)`;
  s.frost.style.opacity=.9*eOut(P(t,fz,.35));
  const sp=back(P(t,fz,.3),2.5);s.stamp.style.opacity=t>fz?1:0;s.stamp.style.transform=`translateZ(220px) scale(${lerp(2.4,1,sp)}) rotate(-9deg)`;
  popIn(s.thermo,t,T(35)+.2,{dx:-200,dy:0,post:'translateZ(160px)'});
  s.flakes.forEach((f,i)=>{const st=T(35)+rnd(i+3)*1.2;const p=P(t,st,4);f.style.opacity=t>st?(t>fz?1:.6)*(1-P(t,st+3,.8)):0;
    f.style.transform=`translate(${120+rnd(i+7)*840+Math.sin(t*2+i)*30}px,${480+p*1200}px) rotate(${t*60+i*30}deg) translateZ(${rnd(i)*200}px)`});
  s.m.set(170,1530,t,{mood:t>fz?'shock':'idle',shiver:t>fz+.2,look:1,sweat:t>fz+.3});
}});

/* ===== S5 SEO works the same way: menu flips into blog ===== */
scene({t0:T(41)-.12,bg:'cream',zoom:.04,
sfx:[[T(41),'flip',1]],
build(r){const st={};const B=browser(r,'left:120px;top:540px;width:840px;height:900px','yourblog.com/blog');st.B=B;
  let h=`<div style="padding:28px 32px 10px;display:flex;align-items:center"><div style="font-weight:800;font-size:36px;letter-spacing:-1px">Blog</div><div class="pill" style="margin-left:auto;background:${CORAL};color:#141414;font-size:22px">200 posts</div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:12px 32px">`;
  for(let i=0;i<12;i++){const th=i%2===0||rnd(i+9)<.3;h+=`<div style="height:170px;border-radius:16px;border:1.5px solid #ECEAE4;background:#fff;padding:14px;position:relative"><div style="height:66px;border-radius:10px;background:${th?'#E8EEF9':'linear-gradient(135deg,#FFD9C9,#FFB49A)'}"></div><div style="height:11px;width:85%;background:#2A2A2A;border-radius:6px;margin-top:14px;opacity:.75"></div><div style="height:8px;width:60%;background:#C9C7C0;border-radius:6px;margin-top:10px"></div>${th?`<span class="pill thin" style="position:absolute;right:10px;top:10px;background:#2F6BFF;color:#fff;font-size:15px;padding:4px 10px">❄ thin</span>`:''}</div>`}
  B.body.innerHTML=h+'</div>';return st},
update(s,lt,t){const p=eOut(P(t,s.t0,.6));s.B.el.style.transform=`rotateY(${(1-p)*-160}deg) rotateX(6deg)`;s.B.el.style.opacity=p>.05?1:0;
  s.B.body.querySelectorAll('.thin').forEach((e,i)=>popIn(e,t,T(43)+i*.07,{dy:0,s0:0,k:3}))}});

/* ===== S6 REDDIT thread + poll ===== */
scene({t0:T(46)-.12,bg:'dark',tr:'whip',zoom:.05,
sfx:[[T(48),'pop',.7],[T(48)+.35,'pop',.6],[T(48)+.7,'pop',.6],[T(50)-.1,'whoosh',.8],[T(54),'fill',.7],[T(58),'fill',.7]],
build(r){const st={};glow(r,540,800,600,'rgba(255,69,0,.18)',.7);
  const B=browser(r,'left:80px;top:500px;width:920px;height:1000px','r/SEO · discussion',{dark:false});st.B=B;
  const com=(c,n,txt,v)=>`<div class="cm" style="display:flex;gap:16px;padding:16px 0;border-top:1.5px solid #EEECE6"><div style="width:44px;height:44px;border-radius:50%;background:${c};flex:none"></div><div><div style="font-size:20px;font-weight:700;color:#555">u/${n} <span class="muted" style="font-weight:500">· 2h</span></div><div style="font-size:24px;margin-top:4px;color:#222">${txt}</div><div class="muted" style="font-size:19px;margin-top:6px;font-weight:600">▲ ${v}  ·  Reply</div></div></div>`;
  B.body.innerHTML=`<div style="padding:28px 34px;color:#141414"><div style="display:flex;align-items:center;gap:14px"><div style="width:52px;height:52px;border-radius:50%;background:#FF4500;color:#fff;font-weight:800;font-size:22px;display:flex;align-items:center;justify-content:center">r/</div><div style="font-weight:700;font-size:25px">r/SEO</div><div class="muted" style="font-size:22px">· Posted by u/growth_mode · 5h</div></div>
   <div style="font-weight:800;font-size:36px;line-height:1.24;letter-spacing:-.6px;margin-top:20px">Is it better to have 10 high-quality articles or 100 average ones?</div>
   <div class="muted" style="font-size:24px;margin-top:12px;line-height:1.35">In today's SEO and AI-search world, what's the smarter approach?</div>
   <div style="display:flex;gap:12px;margin:22px 0 10px"><div class="pill" style="background:#F1F1EE;color:#333">${IC.up('#333',24)}<span class="up">300</span></div><div class="pill" style="background:#F1F1EE;color:#333">${IC.bubble('#333',24)}<span>96 comments</span></div></div>
   ${com('#7C5CFF','rank_hacker','Volume wins. Just publish more 🤷','212')}${com('#1FB5A8','content_cara','Quality over quantity. Always.','187')}${com('#F2A93B','serp_nerd','Honestly… it depends on topic coverage','341')}</div>`;
  st.cms=[...B.body.querySelectorAll('.cm')];
  const Pc=el('div','dcard',`left:130px;top:1060px;width:820px;padding:30px 34px;background:rgba(18,18,21,.96);box-shadow:0 40px 100px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.05)`,null,r);st.poll=Pc;
  const opt=(lab,ic,col,cls)=>`<div class="${cls}" style="position:relative;height:108px;border-radius:20px;border:2px solid #474751;margin-top:16px;overflow:hidden;display:flex;align-items:center;padding:0 28px;gap:18px">
     <div class="fill" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${col}"></div><div style="position:relative;display:flex;gap:4px">${ic}</div>
     <div style="position:relative;font-weight:700;font-size:33px;letter-spacing:-.5px">${lab}</div><div class="pc" style="position:relative;margin-left:auto;font-weight:700;font-size:32px"></div></div>`;
  Pc.innerHTML=`<div style="color:#A8A8B2;font-size:24px;font-weight:700;letter-spacing:1px">POLL · Would you rather publish…</div>`+opt('10 great articles',IC.star(GOLD,30)+IC.star(GOLD,30)+IC.star(GOLD,30),'rgba(216,158,55,.3)','o1')+opt('100 average ones',IC.doc('#A3A3AE',34)+IC.doc('#A3A3AE',34),'rgba(76,125,255,.3)','o2');
  st.cur=cursor(r);st.m=mascot(r,130);return st},
update(s,lt,t){const pollT=T(50)-.15;
  s.B.el.style.transform=`rotateX(${6}deg) rotateY(${-6+4*P(t,s.t0,5)}deg) translateY(${-80*eIO(P(t,pollT,.6))}px)`;
  s.B.el.style.filter=`blur(${7*eIO(P(t,pollT,.5))}px) brightness(${1-.45*P(t,pollT,.5)})`;
  s.B.body.querySelector('.up').textContent=fmt(lerp(300,1204,eOut(P(t,T(46),3))));
  s.cms.forEach((c,i)=>popIn(c,t,T(48)+i*.35,{dy:30,s0:.95}));
  popIn(s.poll,t,pollT,{dy:200,s0:.85,post:'translateZ(120px) rotateX(4deg)'});
  const o1=s.poll.querySelector('.o1'),o2=s.poll.querySelector('.o2');const f1=eOut(P(t,T(54),.9)),f2=eOut(P(t,T(58),.9));
  o1.querySelector('.fill').style.width=(47*f1)+'%';o2.querySelector('.fill').style.width=(53*f2)+'%';
  o1.querySelector('.pc').textContent=f1>0?Math.round(47*f1)+'%':'';o2.querySelector('.pc').textContent=f2>0?Math.round(53*f2)+'%':'';
  o1.style.borderColor=t>T(54)&&t<T(58)?CORAL:'#474751';o2.style.borderColor=t>T(58)?BLUE:'#474751';
  const cx=t<T(57)?lerp(900,700,eIO(P(t,T(53),.5))):lerp(700,720,eIO(P(t,T(57),.5)));const cy=t<T(57)?lerp(1500,1205,eIO(P(t,T(53),.5))):lerp(1205,1330,eIO(P(t,T(57),.5)));
  cursorAt(s.cur,cx,cy,t>T(54)&&t<T(54)+.4?P(t,T(54),.4):t>T(58)&&t<T(58)+.4?P(t,T(58),.4):null);s.cur.style.opacity=P(t,T(53),.2);
  const mp=P(t,pollT+.4,.4);s.m.set(900,1063,t,{op:mp>0?1:0,s:back(mp,2),look:-1});
}});

/* ===== S7 BOTH FAIL: two fanned 3D cards ===== */
scene({t0:T(61)-.12,bg:'dark',zoom:.07,
sfx:[[T(61),'swish',.9],[T(61)+.2,'swish',.8],[T(63),'error',.8],[T(63)+.15,'crack',.8],[T(66)-.05,'stamp',1]],
build(r){const st={};st.gl=glow(r,540,1000,560,'rgba(255,77,61,.4)',0);glow(r,540,1000,560,'rgba(216,158,55,.25)',.6);
  const card=(n,l,bg,ic)=>el('div','abs',`left:330px;top:640px;width:420px;height:580px;border-radius:34px;background:${bg};box-shadow:0 40px 90px rgba(0,0,0,.6),inset 0 2px 0 rgba(255,255,255,.25);padding:40px;color:#fff;transform-origin:50% 120%`,
    `<div style="display:flex;gap:6px">${ic}</div><div style="font-weight:900;font-size:200px;letter-spacing:-10px;line-height:1;margin-top:40px">${n}</div><div style="font-weight:700;font-size:40px;letter-spacing:-1px;margin-top:10px">${l}</div>
     <div class="xm" style="position:absolute;inset:0;border-radius:34px;background:rgba(20,6,4,.55);display:flex;align-items:center;justify-content:center;opacity:0">${IC.bigx(RED,260)}</div>`,r);
  st.a=card('10','great articles','linear-gradient(150deg,#F0BC5E,#B07619)',IC.star('#FFF3D6',36)+IC.star('#FFF3D6',36)+IC.star('#FFF3D6',36));
  st.b=card('100','average ones','linear-gradient(150deg,#5C6E99,#2A3350)',IC.doc('#B9C4E0',40)+IC.doc('#B9C4E0',40));
  st.sa=shine(st.a);st.sb=shine(st.b);
  st.stamp=el('div','abs',`left:150px;top:1290px;width:780px;height:150px;border:9px solid ${RED};border-radius:24px;color:${RED};background:rgba(20,8,6,.88);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:84px;letter-spacing:4px;box-shadow:0 0 60px rgba(255,77,61,.4)`,'BOTH CAN FAIL',r);
  return st},
update(s,lt,t){const fan=back(P(t,T(61)-.1,.6),1.4);const both=T(63)-.05,fail=T(66)-.05;const drop=eIn(P(t,fail,.4));
  [[s.a,-1],[s.b,1]].forEach(([c,d],i)=>{const shk=t>both?Math.sin((t-both)*60+i)*8*(1-P(t,both,.5)):0;
    c.style.transform=`translateX(${d*150*fan+shk}px) translateY(${drop*60}px) rotate(${d*14*fan+d*4*drop}deg)`;c.style.opacity=clamp(fan*3);
    const xp=P(t,both+i*.15,.3);c.querySelector('.xm').style.opacity=xp;c.querySelector('.xm').firstChild.style.transform=`scale(${back(xp,3)})`;
    c.style.filter=t>both?`saturate(${1-.6*xp})`:''});
  s.sa(P(t,T(61)+.3,.9));s.sb(P(t,T(61)+.5,.9));
  s.gl.style.opacity=.8*P(t,both,.4);
  const sp=back(P(t,fail,.3),2.5);s.stamp.style.opacity=t>fail?1:0;s.stamp.style.transform=`scale(${lerp(2.2,1,sp)}) rotate(-6deg)`;
}});

/* ===== S8 REPEATING: identical SERP → thousands of sites ===== */
const DOMS=[['seoguru.io','#7C5CFF','S'],['rankfast.co','#1FB5A8','R'],['blogboost.net','#F2A93B','B'],['yourblog.com',CORAL,'Y'],['marketerhub.com','#4C7DFF','M'],['growthly.io','#E0467C','G']];
scene({t0:T(67)-.12,bg:'dark',tr:'whip',zoom:.04,
sfx:[[T(67),'type',.7],[T(70),'pop',.5],[T(70)+.15,'pop',.5],[T(70)+.3,'pop',.5],[T(74),'mark',.6],[T(74)+.2,'mark',.6],[T(74)+.4,'mark',.6],[T(76)-.1,'zoomout',1],[T(76)+.2,'ticks',.7]],
build(r){const st={};
  const B=browser(r,'left:90px;top:500px;width:900px;height:1010px','search · how to improve seo',{dark:true});st.B=B;
  let h=`<div style="padding:24px 30px"><div style="height:68px;border-radius:34px;border:2px solid #4E4E58;display:flex;align-items:center;gap:14px;padding:0 26px;font-size:28px;background:#2A2A32">${IC.G(40)}<span class="q"></span></div>`;
  DOMS.forEach((d,i)=>{h+=`<div class="res" style="margin-top:22px;padding:16px 18px;border-radius:16px;${d[0]==='yourblog.com'?`border:2px solid ${CORAL};background:rgba(216,158,55,.07)`:'border:2px solid transparent'}"><div style="display:flex;align-items:center;gap:12px;font-size:20px;color:#9A9AA2">${FAV(d[1],d[2])}${d[0]}</div>
    <div style="font-size:30px;font-weight:600;margin-top:8px;color:#8AB4FF"><span class="hl" style="background-image:linear-gradient(rgba(255,200,60,.38),rgba(255,200,60,.38));background-repeat:no-repeat;background-size:0% 100%">10 Easy Ways to Improve Your SEO (2026)</span></div>
    <div style="font-size:21px;color:#A8A8B2;margin-top:6px">Want to rank higher? Here are 10 easy ways to improve your SEO…</div></div>`});
  B.body.innerHTML=h+'</div>';st.res=[...B.body.querySelectorAll('.res')];
  const wall=el('div','abs p3','left:-240px;top:420px;width:1560px;height:1300px',null,r);st.wall=wall;st.minis=[];
  for(let i=0;i<70;i++){const d=DOMS[i%6];const x=(i%10)*156,y=Math.floor(i/10)*180;
    st.minis.push(el('div','abs',`left:${x}px;top:${y}px;width:140px;height:160px;border-radius:14px;background:#26262E;border:1.5px solid #44444E;padding:12px;overflow:hidden`,
      `<div style="display:flex;gap:4px;margin-bottom:10px"><i style="width:7px;height:7px;border-radius:50%;background:#FF5F57"></i><i style="width:7px;height:7px;border-radius:50%;background:#FEBC2E"></i><i style="width:7px;height:7px;border-radius:50%;background:#28C840"></i></div>${FAV(d[1],d[2])}<div style="font-size:12px;font-weight:700;color:#8AB4FF;margin-top:8px;line-height:1.25">10 Easy Ways to Improve Your SEO</div><div class="line-ph" style="height:5px;margin-top:8px"></div><div class="line-ph" style="height:5px;margin-top:5px;width:70%"></div>`,wall))}
  st.cnt=el('div','abs',`left:50%;top:1330px;transform:translateX(-50%);padding:20px 34px;border-radius:26px;background:rgba(18,18,21,.95);border:1.5px solid #55555F;box-shadow:0 30px 80px rgba(0,0,0,.7);white-space:nowrap;font-size:32px;font-weight:700`,`<span style="display:inline-flex;align-items:center;gap:16px"><svg width="46" height="46" viewBox="0 0 24 24"><rect x="7" y="3" width="13" height="16" rx="2" fill="none" stroke="#D89E37" stroke-width="2"/><rect x="3" y="6" width="13" height="16" rx="2" fill="#2A2A32" stroke="#D89E37" stroke-width="2"/></svg><span class="c" style="color:${GOLD};font-weight:900;font-size:64px;letter-spacing:-2px">0</span></span>`,r);
  return st},
update(s,lt,t){const B=s.B.body;typed(B.querySelector('.q'),'how to improve seo',P(t,T(67)-.05,.9));
  s.res.forEach((e,i)=>{popIn(e,t,T(69)+i*.12,{dy:24,s0:.96});e.querySelector('.hl').style.backgroundSize=`${100*eOut(P(t,T(74)+i*.12,.3))}% 100%`});
  const z=eIO(P(t,T(76)-.15,.8));
  s.B.el.style.transform=`translateY(${-z*80}px) scale(${1-.72*z}) rotateX(${6+20*z}deg)`;s.B.el.style.opacity=1-P(t,T(76)+.4,.3);s.B.el.style.zIndex=3;
  s.wall.style.transform=`rotateX(${40-8*P(t,T(76),3)}deg) rotateZ(-8deg) scale(${lerp(1.5,1,z)}) translateY(${-60*P(t,T(76),3)}px)`;s.wall.style.opacity=z;
  s.minis.forEach((m,i)=>{const p=P(t,T(76)-.1+rnd(i)*.7,.3);m.style.opacity=p;m.style.transform=`scale(${back(p,1.6)})`});
  popIn(s.cnt,t,T(76)+.1,{dy:60,pre:'translateX(-50%)',post:'translateZ(200px)'});
  s.cnt.querySelector('.c').textContent=fmt(4812*eOut(P(t,T(76)+.15,1.6)));
}});

/* ===== S9 COPY: AI + search reject duplicate ===== */
scene({t0:T(82)-.12,bg:'dark',zoom:.05,
sfx:[[T(82),'type',.6],[T(85),'shimmer',.6],[T(87),'error',.6],[T(89)-.1,'whoosh',.9],[T(90)+.15,'reject',1],[T(90)+.3,'pop',.7]],
build(r){const st={};glow(r,540,950,560,'rgba(76,125,255,.3)',.7);
  const B=browser(r,'left:90px;top:520px;width:900px;height:760px','ai.assistant/chat',{dark:true});st.B=B;
  B.body.innerHTML=`<div style="padding:26px 30px;display:flex;align-items:center;gap:14px;border-bottom:1.5px solid #383842">${IC.spark(BLUE,38)}<div style="font-weight:800;font-size:28px">AI Assistant</div><div class="pill" style="margin-left:auto;background:#30303A;color:#9A9AA2;font-size:19px">Search on</div></div>
   <div style="padding:26px 30px"><div style="display:flex;justify-content:flex-end"><div class="ub" style="max-width:600px;padding:18px 24px;border-radius:22px 22px 6px 22px;background:#2A2A30;font-size:27px"></div></div>
   <div class="ans" style="margin-top:26px;display:flex;gap:16px"><div style="flex:none">${IC.spark(BLUE,36)}</div><div style="flex:1"><div class="line-ph" style="height:14px;width:95%;background:#3A3A42"></div><div class="line-ph" style="height:14px;width:88%;margin-top:14px;background:#3A3A42"></div><div class="line-ph" style="height:14px;width:72%;margin-top:14px;background:#3A3A42"></div>
   <div class="src" style="display:flex;gap:10px;margin-top:24px;align-items:center">${DOMS.filter(d=>d[0]!=='yourblog.com').map(d=>FAV(d[1],d[2])).join('')}<span class="pill" style="background:#30303A;color:#C8C8D0;font-size:20px">1,247 sources</span></div></div></div></div>`;
  st.icons=[IC.G(84),`<div style="width:84px;height:84px;border-radius:50%;background:#2C2C34;border:2px solid #4E4E58;display:flex;align-items:center;justify-content:center">${IC.spark(BLUE,46)}</div>`].map((h,i)=>{const e=el('div','abs',`left:${i?820:176}px;top:470px`,h+`<div class="xb" style="position:absolute;right:-8px;top:-8px;opacity:0">${IC.x(RED,36)}</div>`,r);return e});
  st.art=el('div','card',`left:240px;top:1330px;width:600px;padding:24px 28px;border:3px solid transparent`,`<div style="display:flex;align-items:center;gap:12px;font-size:20px;color:#777">${FAV(CORAL,'Y')} yourblog.com</div><div style="font-weight:800;font-size:30px;margin-top:10px;letter-spacing:-.5px;line-height:1.2">10 Easy Ways to Improve Your SEO (2026)</div><div class="pill" style="margin-top:12px;background:#F1F1EE;color:#555;font-size:19px">copy #4,813</div>`,r);
  st.ghosts=[1,2,3,4].map(k=>{const g=st.art.cloneNode(true);g.style.zIndex=-1;g.style.opacity=0;r.insertBefore(g,st.art);return g});
  return st},
update(s,lt,t){const B=s.B.body;typed(B.querySelector('.ub'),'How do I improve my SEO?',P(t,T(82),.9));
  popIn(B.querySelector('.ans'),t,T(84)+.1,{dy:20,s0:.97});popIn(B.querySelector('.src'),t,T(85),{dy:10,s0:.8});
  s.B.el.style.transform=`rotateX(${6-3*P(t,s.t0,4)}deg) rotateY(${6}deg)`;
  s.icons.forEach((e,i)=>{popIn(e,t,s.t0+.1+i*.1);const xb=e.querySelector('.xb');xb.style.opacity=P(t,T(87)+i*.1,.15);xb.style.transform=`scale(${back(P(t,T(87)+i*.1,.3),3)})`});
  const fly=eOut(P(t,T(89)-.15,.4)),hit=T(90)+.15,bounce=P(t,hit,.6);
  const y=t<hit?lerp(500,-60,fly):lerp(-60,40,eOut(bounce));s.art.style.opacity=P(t,T(89)-.15,.1);
  s.art.style.transform=`translateY(${y}px) rotate(${t>hit?6*eOut(bounce):0}deg) translateX(${t>hit?Math.sin((t-hit)*50)*12*(1-bounce):0}px)`;s.art.style.borderColor=t>hit?RED:'transparent';
  const fan=eOut(P(t,hit+.05,.45)),fall=eIn(P(t,hit+1.0,.6));s.ghosts.forEach((g,k)=>{g.style.opacity=fan*(1-fall)*(.9-.15*k);g.style.transform=`translateY(${y-14*(k+1)*fan+fall*500}px) translateX(${-22*(k+1)*fan}px) rotate(${-3*(k+1)*fan}deg)`;g.style.filter='brightness(.75)'});
  if(t>hit){s.art.style.filter=`grayscale(${P(t,hit+.3,.4)}) brightness(${1-.35*P(t,hit+.3,.4)})`;s.art.style.transform+=` translateY(${fall*500}px)`;s.art.style.opacity=1-fall}
}});

/* ===== S10 QUALITY: content generator + gauge ===== */
scene({t0:T(95)-.12,bg:'dark',tr:'whip',zoom:.05,
sfx:[[T(95)+.1,'click',1],[T(95)+.3,'ticks',.8],[T(100)-.05,'sweepdown',1],[T(104),'error',.8]],
build(r){const st={};
  const B=browser(r,'left:110px;top:490px;width:860px;height:430px','content.generator/bulk',{dark:true});st.B=B;
  B.body.innerHTML=`<div style="padding:22px 28px;display:flex;align-items:center;gap:16px"><div class="pill gb" style="background:${CORAL};color:#141414;font-size:24px;padding:12px 22px">✦ Generate 100 posts</div><div style="flex:1;height:14px;border-radius:8px;background:#3A3A44;overflow:hidden"><div class="pb" style="height:100%;width:0;background:${CORAL}"></div></div><div class="pn mono" style="font-size:22px;color:#AAA;width:90px;text-align:right">0/100</div></div><div class="ls" style="position:relative;height:260px;overflow:hidden;margin:0 28px;-webkit-mask-image:linear-gradient(#000 60%,transparent)"></div>`;
  st.L=B.body.querySelector('.ls');st.rows=[...Array(7)].map(()=>el('div','abs','left:0;right:0;height:48px;display:flex;align-items:center;gap:12px;font-size:22px;color:#C8C8D0',`${IC.check(GREEN,26)}<span class="tt"></span><span class="pill" style="margin-left:auto;background:#30303A;color:#A6A6B0;font-size:17px;padding:4px 12px">generic</span>`,st.L));
  const C=el('div','dcard','left:140px;top:960px;width:800px;height:540px;background:#1F1F25',null,r);st.card=C;
  const R=240,cx=400,cy=370;const pt=a=>[cx+R*Math.cos(a*Math.PI/180),cy+R*Math.sin(a*Math.PI/180)];
  const arc=(a0,a1,col)=>{const[x0,y0]=pt(a0),[x1,y1]=pt(a1);return `<path d="M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}" stroke="${col}" stroke-width="34" fill="none"/>`};
  let ticks='';for(let a=180;a<=360;a+=9){const[x0,y0]=[cx+(R-40)*Math.cos(a*Math.PI/180),cy+(R-40)*Math.sin(a*Math.PI/180)],[x1,y1]=[cx+(R-54)*Math.cos(a*Math.PI/180),cy+(R-54)*Math.sin(a*Math.PI/180)];ticks+=`<path d="M${x0} ${y0}L${x1} ${y1}" stroke="#55555F" stroke-width="3"/>`}
  C.innerHTML=`<div style="position:absolute;left:34px;top:28px;display:flex;align-items:center;gap:14px">${IC.G(44)}<div style="font-weight:700;font-size:30px">Site quality score</div></div>
   <svg width="800" height="540" style="position:absolute;left:0;top:0;overflow:visible"><defs><filter id="ng"><feGaussianBlur stdDeviation="8"/></filter></defs>${arc(180,238,RED)}${arc(242,298,GOLD)}${arc(302,360,GREEN)}${ticks}
   <g class="nd" style="transform-origin:${cx}px ${cy}px"><path d="M${cx-11} ${cy} L${cx} ${cy-205} L${cx+11} ${cy}Z" fill="#000" opacity=".5" filter="url(#ng)"/><path d="M${cx-11} ${cy} L${cx} ${cy-205} L${cx+11} ${cy}Z" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="22" fill="#fff"/></g></svg>
   <div class="val" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-weight:900;font-size:90px;letter-spacing:-4px;line-height:1">86</div>`;
  st.gg=glow(C,400,370,300,'rgba(255,77,61,.5)',0);
  st.cur=cursor(r);st.m=mascot(r,140);return st},
update(s,lt,t){const click=T(95)+.1;const g=eOut(P(t,click+.15,T(104)-click));const n=Math.floor(100*g);
  cursorAt(s.cur,lerp(500,300,eIO(P(t,s.t0,.25))),lerp(800,580,eIO(P(t,s.t0,.25))),t>click&&t<click+.4?P(t,click,.4):null);s.cur.style.opacity=1-P(t,click+.6,.2);
  s.B.body.querySelector('.pb').style.width=g*100+'%';s.B.body.querySelector('.pn').textContent=n+'/100';
  s.B.body.querySelector('.gb').style.transform=`scale(${1-.08*Math.sin(Math.PI*P(t,click,.25))})`;
  const fr=(100*g)%1;s.rows.forEach((e,k)=>{const i=n-k;e.style.top=((k+1-fr)*48-48)+'px';e.style.opacity=i>0?1:0;e.querySelector('.tt').textContent=i>0?`"${TITLES[i%TITLES.length]}" #${i}`:''});
  s.B.el.style.transform=`rotateX(10deg) rotateY(-8deg)`;
  const hurt=T(100)-.05;const gp=P(t,hurt,T(104)+.5-hurt);const v=lerp(86,23,clamp(elastic(gp)));
  s.card.querySelector('.nd').style.transform=`rotate(${-90+(v/100)*180}deg)`;const val=s.card.querySelector('.val');val.textContent=Math.round(v);val.style.color=v>66?GREEN:v>40?GOLD:RED;
  s.gg.style.opacity=.8*P(t,T(103),.4);
  s.card.style.borderColor=v<40?'rgba(255,77,61,.6)':'';
  popIn(s.card,t,T(95)+.2,{dy:200,s0:.9,post:'rotateX(8deg)'});
  const mp=P(t,hurt+.3,.4);s.m.set(905,1512,t,{op:mp>0?1:0,s:back(mp,2),mood:t>hurt+.5?'shock':'idle',sweat:t>hurt+.8,look:-1});
}});

/* ===== S11-12 10 AMAZING carousel → not the answer (cream) ===== */
scene({t0:T(105)-.12,bg:'cream',zoom:.05,
sfx:[[T(110),'shimmer',.8],[T(111),'sparkle',.8],[T(114),'deflate',.9]],
build(r){const st={cards:[]};glow(r,540,1000,560,'rgba(255,176,46,.35)',.8);
  const ring=el('div','abs p3','left:540px;top:1000px;width:0;height:0',null,r);st.ring=ring;
  const G=['#F0BC5E,#B07619','#FFC46B,#F08A1C','#7FA3FF,#3D5BD9','#5FD3A8,#1E9C74','#C08BFF,#7A3FE0'];
  for(let i=0;i<10;i++){const c=el('div','abs',`left:-130px;top:-180px;width:260px;height:340px;border-radius:24px;background:#fff;box-shadow:0 20px 50px rgba(60,40,20,.18);padding:14px;color:#141414;backface-visibility:hidden`,
    `<div style="height:140px;border-radius:14px;background:linear-gradient(135deg,${G[i%5]});position:relative"><div style="position:absolute;left:12px;bottom:10px">${IC.doc('rgba(255,255,255,.9)',36)}</div></div><div style="font-weight:800;font-size:21px;margin-top:14px;line-height:1.2;letter-spacing:-.3px">${['The Complete SEO Playbook','Keyword Research, Done Right','Technical SEO Deep Dive','Link Building That Works','Content Briefs That Rank','AI Search Optimization','SEO for SaaS','Local SEO Masterclass','E-E-A-T Explained','SEO Audits Step by Step'][i]}</div><div style="display:flex;gap:2px;margin-top:10px">${IC.star(GOLD,20).repeat(5)}</div><div class="muted" style="font-size:16px;margin-top:6px">12 min read</div>`,ring);
    st.cards.push(c)}
  st.sp=[...Array(14)].map((_,i)=>el('div','abs','',IC.spark(GOLD,18+rnd(i)*26),r));
  st.q=el('div','abs',`left:440px;top:1280px;width:200px;height:200px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-family:ISerif;font-style:italic;font-size:170px;box-shadow:0 30px 60px rgba(0,0,0,.3)`,'?',r);
  return st},
update(s,lt,t){const no=T(114)-.05;const spin=t*28-Math.max(0,t-no)*20;
  s.cards.forEach((c,i)=>{const a=i*36+spin;const p=back(P(t,T(105)+i*.06,.5),1.5);const dim=P(t,no,.5);
    c.style.transform=`rotateX(-10deg) rotateY(${a}deg) translateZ(${470*p}px) scale(${p*(1-.12*dim)})`;c.style.opacity=clamp(p*2);c.style.filter=dim>0?`grayscale(${dim}) brightness(${1-.15*dim})`:''});
  s.ring.style.transform=`translateY(${-60*P(t,no,.6)}px)`;
  s.sp.forEach((e,i)=>{const p=P(t,T(111)-.1+rnd(i)*.5,.9);e.style.opacity=Math.sin(Math.PI*p);e.style.left=(160+rnd(i+1)*760)+'px';e.style.top=(620+rnd(i+2)*700)+'px';e.style.transform=`scale(${Math.sin(Math.PI*p)}) rotate(${p*90}deg)`});
  popIn(s.q,t,no+.1,{dy:80,s0:0,k:2.4});s.q.style.transform+=` rotate(${Math.sin(t*3)*6}deg)`;
}});

/* ===== S13 THREE DISHES, NO COFFEE (cream) ===== */
const plate=(c1,c2,c3)=>`<svg width="190" height="190" viewBox="0 0 100 100"><circle cx="50" cy="52" r="46" fill="rgba(0,0,0,.08)"/><circle cx="50" cy="50" r="46" fill="#fff" stroke="#EDE9E0" stroke-width="2"/><circle cx="50" cy="50" r="33" fill="#FAF8F3" stroke="#F0ECE3" stroke-width="2"/><ellipse cx="47" cy="50" rx="20" ry="15" fill="${c1}"/><circle cx="57" cy="44" r="8" fill="${c2}"/><circle cx="40" cy="56" r="5" fill="${c3}"/><path d="M35 40q4-4 8 0M58 58q3 3 7 0" stroke="#4E8A3A" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
scene({t0:T(118)-.12,bg:'cream',tr:'whip',zoom:.05,
sfx:[[T(122),'clink',.8],[T(122)+.3,'clink',.8],[T(123)+.2,'clink',.8],[T(123)+.5,'sparkle',.6],[T(126)-.05,'error',.8],[T(127),'thud',.8]],
build(r){const st={};
  const M=el('div','card light-shadow','left:90px;top:500px;width:900px;height:1020px;background:#FFFDF8;border:1.5px solid #EDE6D6',null,r);st.M=M;
  M.innerHTML=`<div style="text-align:center;padding-top:34px"><div style="font-family:ISerif;font-style:italic;font-size:64px;line-height:1">Maison Trois</div><div class="muted" style="font-size:20px;letter-spacing:4px;margin-top:8px;font-weight:600">THREE DISHES · DONE PERFECTLY</div></div>`;
  st.d=[['Truffle Risotto','#F4D9A0','#6B4E2E','#C9A86A'],['Seared Salmon','#FF9A76','#F7E3C4','#7FB069'],['Chocolate Soufflé','#5A3424','#F2E6D8','#C7372F']].map((d,i)=>el('div','abs',`left:${40+i*280}px;top:200px;width:260px;height:390px;border-radius:24px;background:#fff;border:1.5px solid #F0EBE0;box-shadow:0 14px 30px rgba(60,40,20,.08);display:flex;flex-direction:column;align-items:center;padding-top:22px`,
    `${plate(d[1],d[2],d[3])}<div style="font-weight:800;font-size:25px;margin-top:16px;letter-spacing:-.4px">${d[0]}</div><div style="display:flex;gap:2px;margin-top:10px">${IC.star(GOLD,22).repeat(5)}</div><div class="pill" style="margin-top:12px;background:#FBF0DA;color:${CORAL};font-size:17px;padding:5px 12px">Chef's pick</div>`,M));
  st.cof=el('div','abs',`left:40px;top:630px;width:820px;height:320px;border-radius:24px;border:3px dashed #D9D1C0;display:flex;align-items:center;gap:36px;padding:0 50px`,
    `<svg width="170" height="170" viewBox="0 0 64 64"><path d="M12 24h34v14a14 14 0 01-14 14h-6a14 14 0 01-14-14z" fill="#F1EDE5" stroke="#BDB4A3" stroke-width="2.5"/><path d="M46 28h4a6 6 0 010 12h-4" stroke="#BDB4A3" stroke-width="2.5" fill="none"/><path d="M8 56h46" stroke="#BDB4A3" stroke-width="2.5" stroke-linecap="round"/><path class="stm" d="M22 18q-3-4 0-8M30 18q-3-4 0-8M38 18q-3-4 0-8" stroke="#D0C8B8" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>
     <div><div style="font-weight:800;font-size:44px;letter-spacing:-1px;color:#9C9486;position:relative;display:inline-block">Coffee<div class="st" style="position:absolute;left:-6px;right:-6px;top:52%;height:5px;background:${RED};transform-origin:left;transform:scaleX(0)"></div></div><div class="na pill" style="margin-top:14px;background:#FFE7E3;color:${RED};font-size:24px">${IC.x(RED,26)} Not on the menu</div></div>`,M);
  return st},
update(s,lt,t){s.M.style.transform=`rotateX(${8-4*P(t,s.t0,5)}deg) rotateY(${-6+6*P(t,s.t0,5)}deg)`;
  s.d.forEach((d,i)=>popIn(d,t,s.t0+.15+i*.25,{dy:60,s0:.7}));s.d.forEach((d,i)=>{d.style.boxShadow=t>T(122)-.1+i*.3&&t<T(122)+.5+i*.3?'0 0 0 4px rgba(216,158,55,.6),0 14px 30px rgba(60,40,20,.12)':''})
  const nc=T(125);popIn(s.cof,t,nc-.1,{dy:40,s0:.92});s.cof.style.transform+=` translateX(${t>T(127)?Math.sin((t-T(127))*55)*10*(1-P(t,T(127),.5)):0}px)`;
  s.cof.querySelector('.st').style.transform=`scaleX(${eOut(P(t,T(126),.3))})`;popIn(s.cof.querySelector('.na'),t,T(127)-.05,{dy:0,s0:0,k:3});
  s.cof.style.borderColor=t>T(127)?RED:'#D9D1C0';
}});
