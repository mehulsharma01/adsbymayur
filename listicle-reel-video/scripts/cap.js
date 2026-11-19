const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const dir=process.argv[2],only=process.argv[3];const FPS=+(process.env.FPS||60);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('PAGEERR',e.message));
if(process.env.TMFILE){await p.addInitScript(`window.TM=${fs.readFileSync(process.env.TMFILE,'utf8')}`);}
await p.goto('file://'+path.join(dir,process.env.PAGE||'reel.html'));await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
const total=await p.evaluate(()=>TOTAL);const FD=path.join(dir,process.env.FDIR||'f');fs.mkdirSync(FD,{recursive:true});
let times=only?only.split(',').map(Number):Array.from({length:Math.ceil(total*FPS)},(_,i)=>i/FPS);const F0=+(process.env.F0||0),F1=+(process.env.F1||times.length);if(!only)times=times.slice(F0,F1);
let k=only?0:F0;for(const t of times){await p.evaluate(t=>seek(t),t);await p.screenshot({path:path.join(FD,only?`t${t}.jpg`:`${String(k).padStart(5,'0')}.jpg`),type:'jpeg',quality:92});k++;}
console.log('frames',k,'total',total);await b.close()})();
