"""Mix voice + quiet music + minimal whooshes, synced to tm.json.

Usage: python3 mix.py --vo vo.wav --music music.mp3 --tm tm.json --whoosh whoosh.mp3 [--stinger stinger.mp3] [--novoice]
- Voice is the lead (-16 LUFS). Music sits around -30 LUFS and ducks further under the voice (sidechain).
- With --novoice, music is the lead at -16 LUFS.
- Whooshes: one into offer 1, a very quiet one on each scene change, one into the end card. No pops.
- Final master: -14 LUFS, -1 dBTP (Instagram/TikTok).
"""
import subprocess, json, argparse
ap = argparse.ArgumentParser()
for k in ["vo","music","tm","whoosh","stinger","out"]: ap.add_argument("--"+k)
ap.add_argument("--novoice", action="store_true"); a = ap.parse_args()
tm = json.load(open(a.tm)); ST=[]; c=tm["intro"]
for d in tm["seg"]: ST.append(c); c+=d
END=c; TOT=END+tm["outro"]
ev = ([(a.stinger,0.0,0.22)] if a.stinger else []) + [(a.whoosh,tm["intro"]-0.25,0.2)] + [(a.whoosh,s-0.32,0.1) for s in ST[1:]] + [(a.whoosh,END-0.32,0.14)]
inp=[]; fil=[]; lab=[]; n=0
if not a.novoice: inp += ["-i",a.vo]; n=1
inp += ["-stream_loop","2","-i",a.music]; mi=n; n+=1
for k,(f,t,v) in enumerate(ev):
    inp += ["-i",f]; ms=int(t*1000)
    fil.append(f"[{n}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={v},adelay={ms}|{ms}[s{k}]"); lab.append(f"[s{k}]"); n+=1
lvl = -16 if a.novoice else -30
fil.append(f"[{mi}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:{TOT:.3f},loudnorm=I={lvl}:TP=-3,afade=t=in:d=0.6,afade=t=out:st={TOT-2.2:.3f}:d=2.2[mus]")
if a.novoice:
    fil.append(f"[mus]{''.join(lab)}amix=inputs={1+len(lab)}:normalize=0:duration=first[mx]")
else:
    fil.append("[0:a]aformat=sample_rates=44100:channel_layouts=stereo,loudnorm=I=-16:TP=-2,asplit=2[vo][vok]")
    fil.append("[mus][vok]sidechaincompress=threshold=0.02:ratio=5:attack=15:release=400[duck]")
    fil.append(f"[vo][duck]{''.join(lab)}amix=inputs={2+len(lab)}:normalize=0:duration=first[mx]")
fil.append("[mx]loudnorm=I=-14:TP=-1.0:LRA=9[out]")
subprocess.run(["ffmpeg","-v","error",*inp,"-filter_complex",";".join(fil),"-map","[out]","-ar","48000","-c:a","pcm_s16le","-y",a.out or "mix.wav"],check=True)
print("mixed", round(TOT,2), "s")
