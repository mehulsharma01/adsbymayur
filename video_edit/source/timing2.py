import json,sys
S=sys.argv[1]
W=json.load(open(f"{S}/src/words.json"));M=[]
for w in W:
    if M and w["w"].startswith(","): M[-1]["w"]+=w["w"]; M[-1]["e"]=w["e"]
    else: M.append(dict(w))
W=M
# inserts: (orig_time, seconds_of_silence) placed mid-gap
ins=[]
for i in range(len(W)-1):
    a,b=W[i]["e"],W[i+1]["s"];g=b-a
    want=0.85 if W[i]["w"][-1] in ".?!" else 0.40 if W[i]["w"][-1] in ",:" else 0
    if want>g+0.05: ins.append((round((a+b)/2,3),round(want-g,3)))
END=W[-1]["e"]+2.0
def mp(t): return round(t+sum(d for (x,d) in ins if x<=t),3)
out=[{"w":w["w"],"s":mp(w["s"]),"e":mp(w["e"])} for w in W]
D=mp(END)
json.dump({"ins":ins,"end":END,"dur":D},open(f"{S}/build/cuts.json","w"))
open(f"{S}/build/data.js","w").write("window.WORDS="+json.dumps(out)+";window.DUR="+str(D)+";")
print("inserts",len(ins),"added %.2fs"%sum(d for _,d in ins),"dur",D)
