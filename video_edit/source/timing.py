import json,sys,wave,numpy as np
S=sys.argv[1]
W=json.load(open(f"{S}/src/words.json"))
# merge split number tokens like "3" ",000"
M=[]
for w in W:
    if M and w["w"].startswith(","): M[-1]["w"]+=w["w"]; M[-1]["e"]=w["e"]
    else: M.append(dict(w))
W=M
import soundfile as sf
a,sr=sf.read(f"{S}/sep/htdemucs/orig_audio/vocals.wav"); a=a.mean(1) if a.ndim>1 else a
hop=int(sr*0.01); n=len(a)//hop
rms=np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2))+1e-9 for i in range(n)]); db=20*np.log10(rms)
KEEP=0.30  # target pause length
cuts=[]
for i in range(len(W)-1):
    g0,g1=W[i]["e"],W[i+1]["s"]
    if g1-g0<0.42: continue
    # find quiet frames inside gap
    f0,f1=int(g0*100),int(g1*100)
    q=[f for f in range(f0,f1) if db[f]<-38]
    if len(q)<10: continue
    qs,qe=q[0]/100,(q[-1]+1)/100
    # keep breathing room: 0.14 after speech end, 0.12 before next start
    c0=max(qs,g0)+0.14; c1=min(qe,g1)-0.12
    remove=(c1-c0)-(KEEP-0.26)
    if remove>0.08: cuts.append([round(c0,3),round(c0+remove,3)])
END=W[-1]["e"]+1.6
def mp(t):
    s=0
    for c0,c1 in cuts:
        if t>=c1: s+=c1-c0
        elif t>c0: s+=t-c0
    return round(t-s,3)
out=[{"w":w["w"],"s":mp(w["s"]),"e":mp(w["e"])} for w in W]
segs=[];p=0
for c0,c1 in cuts: segs.append([p,c0]); p=c1
segs.append([p,END])
json.dump({"segs":segs,"dur":mp(END)},open(f"{S}/build/cuts.json","w"))
open(f"{S}/build/data.js","w").write("window.WORDS="+json.dumps(out)+";window.DUR="+str(mp(END))+";")
print("cuts",len(cuts),"removed %.2fs"%sum(c1-c0 for c0,c1 in cuts),"new dur",mp(END))
