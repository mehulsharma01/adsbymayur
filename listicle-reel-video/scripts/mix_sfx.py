"""Voice + quiet music + moment-synced sound effects.

Usage: python3 mix_sfx.py --vo vo.wav --music lofi.mp3 --tm tm.json --sfx sfx.json [--out mix.wav]

sfx.json is a list of [file, seconds, gain_dB]. Times are absolute video seconds; take them
from the same numbers the scene code uses (e.g. scene start + the animation's start time).
Every SFX is first normalised to -20 LUFS, then the gain is applied, so gains are comparable:
  whoosh on scene changes  -4 to -8 dB      (the quietest layer)
  ticks / marker / flip     -6 to -8 dB
  stamp / box thud          -2 to -4 dB      (one or two "hits" per video, no more)
  ka-ching / popper / bell  -5 to -7 dB
Voice -16 LUFS lead, music about -30 LUFS with sidechain ducking, master -14 LUFS / -1 dBTP.
"""
import json, subprocess, argparse
ap = argparse.ArgumentParser()
for k in ["vo", "music", "tm", "sfx", "out"]: ap.add_argument("--" + k)
a = ap.parse_args()
tm = json.load(open(a.tm)); TOT = tm["intro"] + sum(tm["seg"]) + tm["outro"]
ev = json.load(open(a.sfx))
inp = ["-i", a.vo, "-stream_loop", "2", "-i", a.music]; fil = []; lab = []
for k, (f, t, g) in enumerate(ev):
    inp += ["-i", f]; ms = int(max(0, t) * 1000)
    fil.append(f"[{k+2}:a]aformat=sample_rates=44100:channel_layouts=stereo,loudnorm=I=-20:TP=-2,volume={g}dB,adelay={ms}|{ms}[s{k}]"); lab.append(f"[s{k}]")
fil.append(f"[1:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:{TOT:.3f},loudnorm=I=-30:TP=-3,afade=t=in:d=0.6,afade=t=out:st={TOT-2.2:.3f}:d=2.2[mus]")
fil.append("[0:a]aformat=sample_rates=44100:channel_layouts=stereo,loudnorm=I=-16:TP=-2,asplit=2[vo][vok]")
fil.append("[mus][vok]sidechaincompress=threshold=0.02:ratio=5:attack=15:release=400[duck]")
fil.append(f"[vo][duck]{''.join(lab)}amix=inputs={2+len(lab)}:normalize=0:duration=longest,apad,atrim=0:{TOT:.3f}[mx]")
fil.append("[mx]loudnorm=I=-14:TP=-1.0:LRA=9[out]")
subprocess.run(["ffmpeg", "-v", "error", *inp, "-filter_complex", ";".join(fil), "-map", "[out]", "-ar", "48000", "-c:a", "pcm_s16le", "-y", a.out or "mix.wav"], check=True)
print("mixed", round(TOT, 2), "s with", len(ev), "sfx")
