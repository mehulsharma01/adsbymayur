const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const dir=process.argv[2],only=process.argv[3];const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1080,height:1920}});if(process.env.HOOKFILE){const hk=fs.readFileSync(process.env.HOOKFILE,'utf8');await p.addInitScript(`window.HOOK=${hk}`);}if(process.env.TMFILE){const tm=fs.readFileSync(process.env.TMFILE,'utf8');await p.addInitScript(`window.TM=${tm}`);}
await p.goto('file://'+path.join(dir,process.env.PAGE||'index.html'));await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
const total=await p.evaluate(()=>TOTAL);fs.mkdirSync(path.join(dir,process.env.FDIR||'f'),{recursive:true});
let times=only?only.split(',').map(Number):Array.from({length:Math.ceil(total*30)},(_,i)=>i/30);const F0=+(process.env.F0||0),F1=+(process.env.F1||times.length);if(!only)times=times.slice(F0,F1);let k0=only?0:F0;
let k=k0;for(const t of times){await p.evaluate(t=>seek(t),t);await p.screenshot({path:path.join(dir,process.env.FDIR||'f',only?`t${t}.jpg`:`${String(k).padStart(5,'0')}.jpg`),type:'jpeg',quality:93});k++;}
console.log('frames',k,'total',total);await b.close()})();
