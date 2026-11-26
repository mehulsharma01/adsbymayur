const {chromium}=require('playwright');
(async()=>{const [html,out,a,bnd]=process.argv.slice(2);const A=+a,B=+bnd;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+html);await p.evaluate(()=>document.fonts.ready);
 for(let f=Math.max(0,A-15);f<B;f++){await p.evaluate(t=>renderAt(t),f/30);if(f>=A)await p.screenshot({path:`${out}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:94});}
 await b.close();console.log('done',A,B)})();
