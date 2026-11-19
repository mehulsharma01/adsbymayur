"""Split one ElevenLabs voiceover take into per-scene clips and write scene timings.

Usage: python3 split_vo.py full.mp3 --intro 2.0 [--tempo 1.06] [--gap 0.3]
- Finds pauses with ffmpeg silencedetect (generate the take with "[pause]" between lines).
- Expects N+2 lines: intro, offer 1..N, outro. Prints the pauses so you can sanity-check the count.
- Writes seg00.wav..segNN.wav, vo.wav (all joined, starting at 0s) and tm.json:
  {"intro": seconds, "seg": [scene seconds...], "outro": seconds}
- The intro scene is fixed at --intro seconds; if the intro line is longer, it simply keeps
  talking over the start of offer 1 (offer 1 gets the remaining time).
"""
import subprocess, json, re, sys, argparse
ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("--intro", type=float, default=2.0)
ap.add_argument("--tempo", type=float, default=1.06); ap.add_argument("--gap", type=float, default=0.3)
ap.add_argument("--noise", default="-38dB"); ap.add_argument("--mind", type=float, default=0.45)
a = ap.parse_args()
dur = lambda f: float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
log = subprocess.run(["ffmpeg","-i",a.src,"-af",f"silencedetect=noise={a.noise}:d={a.mind}","-f","null","-"],capture_output=True,text=True).stderr
ss = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]; se = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
starts = [0.0] + se; ends = ss + [dur(a.src)]
print("lines found:", len(starts))
segs = []
for i, (s, e) in enumerate(zip(starts, ends)):
    o = f"seg{i:02d}.wav"
    subprocess.run(["ffmpeg","-v","error","-ss",str(max(0,s-0.05)),"-to",str(e+0.08),"-i",a.src,"-af",f"atempo={a.tempo},apad=pad_dur={a.gap}","-ar","44100","-ac","2","-y",o],check=True)
    segs.append(o)
# hold the outro 1.4s longer so the end card can land
subprocess.run(["ffmpeg","-v","error","-i",segs[-1],"-af","apad=pad_dur=1.4","-y","_o.wav"],check=True); subprocess.run(["mv","_o.wav",segs[-1]])
open("list.txt","w").write("".join(f"file '{s}'\n" for s in segs))
subprocess.run(["ffmpeg","-v","error","-f","concat","-safe","0","-i","list.txt","-c:a","pcm_s16le","-y","vo.wav"],check=True)
d = [dur(s) for s in segs]
first = d[0] + d[1] - a.intro  # offer 1 absorbs any intro overrun
tm = {"intro": a.intro, "seg": [round(first,3)] + [round(x,3) for x in d[2:-1]], "outro": round(d[-1],3)}
json.dump(tm, open("tm.json","w")); print(tm, "total", round(sum(d),2))
