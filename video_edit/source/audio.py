import json, sys, numpy as np, soundfile as sf
S = sys.argv[1]
SR = 48000
rng = np.random.default_rng(7)
cuts = json.load(open(f"{S}/build/cuts.json"))
DUR = cuts["dur"]
N = int((DUR + 0.2) * SR)
W = json.loads(open(f"{S}/build/data.js").read().split("window.WORDS=")[1].split(";window.DUR")[0])
T = lambda i: W[i]["s"]

def t_(d): return np.arange(int(d * SR)) / SR
def env(n, a, d):  # attack sec, exp decay tau
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)
    return e
def lp(x, fc):  # one-pole lowpass, fc may be array
    fc = np.broadcast_to(np.asarray(fc, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); s = 0.0
    for i in range(len(x)):
        s += a[i] * (x[i] - s); y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def bp(x, lo, hi): return hp(lp(x, hi), lo)
def noise(d): return rng.standard_normal(int(d * SR))
def mix(*a):
    n=max(len(x) for x in a); o=np.zeros(n)
    for x in a: o[:len(x)]+=x
    return o
def at(x, sec): return np.pad(x, (int(sec*SR), 0))
def norm(x, g=1.0): m = np.max(np.abs(x)) + 1e-9; return x / m * g

# ---------- SFX library ----------
def whoosh(d=0.45, up=True):
    n = int(d * SR); t = np.arange(n) / SR
    fc = 300 + 3500 * (t / d if up else 1 - t / d) ** 1.5
    x = lp(noise(d), fc); x = hp(x, 150)
    e = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return norm(x * e, .55)
def whip(): return norm(np.concatenate([whoosh(.22), np.zeros(10)]) , .6)
def pop():
    d = .09; t = t_(d); f = 900 * np.exp(-t * 40) + 260
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .002, .03)
    return norm(x, .55)
def tick():
    d = .03; x = hp(noise(d), 3000) * env(int(d * SR), .0005, .006)
    return norm(x, .35)
def click():
    d = .05; t = t_(d); x = np.sin(2 * np.pi * 2200 * t) * env(len(t), .0005, .008) + .5 * hp(noise(d), 2000) * env(len(t), .0003, .004)
    return norm(x, .5)
def ticks(d=1.2, rate=22):
    out = np.zeros(int(d * SR)); k = 0; tt = 0
    while tt < d - .03:
        s = int(tt * SR); c = tick() * (0.6 + 0.4 * rng.random()); out[s:s + len(c)] += c[:len(out) - s]
        tt += 1 / rate * (1 + .3 * rng.random())
    return norm(out, .4)
def typing(d=0.9): return ticks(d, 16) * .9
def ding(f=1320):
    d = 1.2; t = t_(d); x = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * dk) for m, a, dk in [(1, 1, 3), (2.76, .4, 6), (5.4, .2, 9)])
    return norm(x * env(len(t), .002, 5), .4)
def success():
    a = ding(1046) * .8; b = ding(1568); out = np.zeros(len(b) + int(.11 * SR)); out[:len(a)] += a; out[int(.11 * SR):] += b
    return norm(out, .45)
def sparkle():
    d = 1.0; out = np.zeros(int(d * SR))
    for k in range(9):
        s = int(rng.random() * .6 * SR); f = 2500 + rng.random() * 3500; tt = t_(.25)
        c = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 18); out[s:s + len(c)] += c[:len(out) - s] * .5
    return norm(out, .3)
def shimmer():
    d = 1.0; t = t_(d); x = sum(np.sin(2 * np.pi * f * t + rng.random() * 6) for f in [1760, 2217, 2637, 3520]) * np.sin(np.pi * t / d) ** 2
    return norm(x * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t)), .22)
def thud():
    d = .5; t = t_(d); f = 120 * np.exp(-t * 9) + 42
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .002, .16) + .3 * lp(noise(d), 800) * env(len(t), .001, .03)
    return norm(x, .85)
def stamp():
    x = thud(); c = hp(noise(.08), 1200) * env(int(.08 * SR), .0005, .015)
    x[:len(c)] += c * .6; return norm(x, .9)
def hit():
    x = thud(); r = lp(noise(1.2), 2500) * env(int(1.2 * SR), .002, .4); out = np.zeros(len(r)); out[:len(x)] += x; out += r * .35
    return norm(out, .9)
def riser(d=1.4):
    n = int(d * SR); t = np.arange(n) / SR; fc = 200 + 5000 * (t / d) ** 2
    x = bp(noise(d), 100, 1) if False else lp(noise(d), fc)
    tone = np.sin(2 * np.pi * np.cumsum(220 + 660 * (t / d) ** 2) / SR) * .25
    return norm((x + tone) * (t / d) ** 2, .5)
def error():
    d = .32; t = t_(d); sq = np.sign(np.sin(2 * np.pi * 150 * t)) * .5 + np.sign(np.sin(2 * np.pi * 112 * t)) * .5
    g = ((t < .13) | (t > .17)) * 1.0
    return norm(lp(sq, 1800) * g * env(len(t), .003, .2), .4)
def drop():
    d = .9; t = t_(d); f = 900 * np.exp(-t * 3.5) + 80
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .005, .5)
    return norm(mix(x, whoosh(.9, False) * .5), .55)
def sweepdown(): return drop() * .9
def freeze():
    d = 1.3; t = t_(d); x = hp(noise(d), 4000) * (np.sin(np.pi * t / d) ** 2) * .6
    for k in range(14):
        s = int(rng.random() * 1.0 * SR); f = 3000 + rng.random() * 4000; tt = t_(.15); c = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 30)
        x[s:s + len(c)] += c[:len(x) - s] * .7
    return norm(x, .32)
def flip(): return norm(mix(whoosh(.35), at(click() * .5, .3)), .55)
def swish(): return whoosh(.3) * .9
def crack():
    d = .25; x = hp(noise(d), 1500) * env(int(d * SR), .0005, .03)
    for k in range(4):
        s = int(rng.random() * .15 * SR); c = hp(noise(.02), 2500) * env(int(.02 * SR), .0002, .004); x[s:s + len(c)] += c
    return norm(x, .45)
def mark(): return norm(lp(noise(.18), 3000) * np.sin(np.pi * t_(.18) / .18), .3)
def zoomout(): return norm(mix(whoosh(.8, False), at(thud() * .4, .25)), .6)
def reject(): return norm(mix(thud() * .7, error()), .7)
def deflate():
    d = .7; t = t_(d); f = 520 * np.exp(-t * 2.2) + 110
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 + .3 * np.sin(2 * np.pi * 14 * t)) * env(len(t), .01, .35), .4)
def sad(): return deflate() * .9
def clink(): return norm(ding(2600 + rng.random() * 600)[:int(.5 * SR)] * env(int(.5 * SR), .001, .12), .38)
def steps():
    d = 1.3; out = np.zeros(int(d * SR))
    for k in range(6):
        s = int(k * .2 * SR); c = lp(noise(.06), 900) * env(int(.06 * SR), .001, .02); out[s:s + len(c)] += c * (1 - k * .1)
    return norm(out, .45)
def pops():
    out = np.zeros(int(1.0 * SR))
    for k in range(7):
        s = int(k * .12 * SR); c = pop(); out[s:s + len(c)] += c * (.7 + .3 * rng.random())
    return norm(out, .5)
def fill(): return norm(riser(.6) * .6, .3)
def scan():
    d = 1.6; t = t_(d); x = np.sin(2 * np.pi * (600 + 300 * np.sin(2 * np.pi * 1.2 * t)) * t) * .3 + lp(noise(d), 2000) * .4
    return norm(x * np.sin(np.pi * t / d) ** 2, .28)

LIB = dict(whoosh=lambda: whoosh(), whip=whip, pop=pop, tick=tick, click=click, ticks=lambda: ticks(), type=typing, ding=ding,
           success=success, sparkle=sparkle, shimmer=shimmer, thud=thud, stamp=stamp, hit=hit, riser=lambda: riser(), error=error,
           drop=drop, sweepdown=sweepdown, freeze=freeze, flip=flip, swish=swish, crack=crack, mark=mark, zoomout=zoomout,
           reject=reject, deflate=deflate, sad=sad, clink=clink, steps=steps, pops=pops, fill=fill, scan=scan)
GAIN = dict(whoosh=.55, whip=.6, tick=.35, ticks=.45, type=.4, riser=.7)

# ---------- real SFX samples (Epidemic Sound via Higgsfield) ----------
import os
LIBD = f"{S}/sfxlib"
def samp(name, maxlen=None, fade=.08, start=None, gain=1.0):
    x, sr = sf.read(f"{LIBD}/{name}.wav"); x = x if x.ndim == 2 else np.stack([x, x], 1)
    env_ = np.abs(x).mean(1); thr = env_.max() * 0.06
    i0 = int(start * SR) if start is not None else max(0, int(np.argmax(env_ > thr)) - int(.004 * SR))
    x = x[i0:]
    if maxlen: x = x[:int(maxlen * SR)]
    f = min(len(x) // 2, int(fade * SR)); x[-f:] *= np.linspace(1, 0, f)[:, None]
    return x * gain
def first_onsets(name, n=3, gap=.25):
    x, _ = sf.read(f"{LIBD}/{name}.wav"); m = np.abs(x).mean(1) if x.ndim == 2 else np.abs(x)
    thr = m.max() * .25; outs = []; i = 0
    while len(outs) < n and i < len(m):
        if m[i] > thr: outs.append(i / SR); i += int(gap * SR)
        else: i += 1
    return outs
CL = first_onsets("clicks", 4)
cnt = {}
def rot(key, opts):
    k = cnt.get(key, 0); cnt[key] = k + 1; return opts[k % len(opts)]
def lowpassed(x, fc): return np.stack([lp(x[:, 0], fc), lp(x[:, 1], fc)], 1)
SMAP = {
 "whoosh1": lambda: samp("whoosh1", 1.2, .3, gain=.8), "whoosh2": lambda: samp("whoosh2", 1.0, .25, gain=.8), "whoosh3": lambda: samp("whoosh3", 1.2, .3, gain=.8),
 "whoosh": lambda: samp(rot("w", ["whoosh1", "whoosh3", "whoosh2"]), 1.1, .3, gain=.75), "whip": lambda: samp("whoosh2", .9, .25, gain=.8),
 "swish": lambda: samp("whoosh2", .8, .25, gain=.6),
 "pop": lambda: samp(rot("p", ["pop1", "pop2"]), .5, .05), "pops": None, "mark": lambda: samp("pop2", .3, .05, gain=.5),
 "tick": lambda: samp("pop2", .3, .05, gain=.4), "fill": lambda: samp("pop1", .4, .05, gain=.5), "clink": lambda: samp("pop1", .5, .05, gain=.8),
 "popup": lambda: samp("popup", 1.0, .2, gain=.8),
 "click": lambda: samp("clicks", .25, .03, start=rot("c", CL)),
 "ticks": lambda: samp("counter", 1.3, .3, gain=.7), "counter": lambda: samp("counter", 2.4, .4, gain=.8),
 "type": lambda: samp("typing", 1.0, .2, start=rot("t", [0.2, 2.1, 4.3, 6.2]), gain=.8),
 "ding": lambda: samp("success", 1.2, .3, gain=.6), "success": lambda: samp("success", 1.3, .3),
 "sparkle": lambda: samp("sparkle", 1.6, .5, gain=.7), "shimmer": lambda: samp("sparkle", 1.4, .5, gain=.5),
 "thud": lambda: samp("thud", .4, .1), "stamp": None, "hit": lambda: samp("boom", 2.5, .8),
 "boom": lambda: samp("boom", 2.6, .8),
 "riser": lambda: samp("riser", 2.8, .1, gain=.8), "scan": lambda: samp("riser", 1.6, .4, gain=.4),
 "error": lambda: samp("error", 1.2, .2, gain=.8), "reject": None, "crack": lambda: samp("glitch", .4, .1, gain=.6),
 "drop": lambda: samp("glitch", 1.3, .4, gain=.8), "sweepdown": lambda: samp("glitch", 1.3, .4, gain=.75),
 "deflate": lambda: lowpassed(samp("glitch", .9, .3, gain=.6), 2500), "sad": lambda: lowpassed(samp("glitch", .9, .3, gain=.55), 2000),
 "freeze": lambda: samp("freeze", 2.2, .6, gain=.8), "flip": lambda: samp("flip", .6, .15),
 "steps": lambda: samp("steps", 1.4, .3, gain=.8), "zoomout": None,
}
def get(tp):
    if tp == "pops":
        out = np.zeros((int(1.0 * SR), 2))
        for k in range(6):
            x = samp(rot("p", ["pop2", "pop1"]), .3, .05, gain=.6 + .3 * rng.random()); s0 = int(k * .13 * SR); out[s0:s0 + len(x)] += x[:len(out) - s0]
        return out
    if tp == "stamp": a = samp("stamp", .4, .08); b_ = samp("thud", .4, .1) * .7; o = np.zeros((max(len(a), len(b_)), 2)); o[:len(a)] += a; o[:len(b_)] += b_; return o
    if tp == "reject": a = samp("error", 1.0, .2); b_ = samp("thud", .4, .1) * .8; o = np.zeros((len(a), 2)); o[:len(a)] += a; o[:len(b_)] += b_; return o
    if tp == "zoomout": a = samp("whoosh3", 1.2, .3); b_ = samp("boom", 1.5, .6) * .5; o = np.zeros((max(len(a), len(b_) + int(.3 * SR)), 2)); o[:len(a)] += a; o[int(.3 * SR):int(.3 * SR) + len(b_)] += b_; return o
    return SMAP[tp]()
sfxL = np.zeros(N); sfxR = np.zeros(N)
cues = json.load(open(f"{S}/build/sfx.json"))
for c in cues:
    t0 = c["t"]
    x = get(c["type"]) * c["g"]
    if c["type"] == "riser": t0 -= 2.5
    s = max(0, int(t0 * SR)); x = x[:N - s]
    sfxL[s:s + len(x)] += x[:, 0]; sfxR[s:s + len(x)] += x[:, 1]

# ---------- music bed (A minor, 100 bpm) ----------
BPM = 100; beat = 60 / BPM; bar = 4 * beat
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
prog = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
mus = np.zeros(N); t = np.arange(N) / SR
# pad
pad = np.zeros(N)
nb = int(DUR / bar) + 2
for b in range(nb):
    s = int(b * bar * SR); e = min(N, int((b + 1) * bar * SR) + int(.3 * SR))
    if s >= N: break
    tt = np.arange(e - s) / SR; ch = prog[b % 4]
    seg = sum(((tt * mtof(m) * dt) % 1 * 2 - 1) for m in ch for dt in (0.997, 1.003)) / 6
    a = np.minimum(1, tt / .6) * np.minimum(1, np.maximum(0, (bar + .3 - tt)) / .4)
    pad[s:e] += seg * a
pad = lp(pad, 900) * .32
# sub bass
sub = np.zeros(N)
for b in range(nb):
    for k in (0, 2.5):
        s = int((b * bar + k * beat) * SR)
        if s >= N: continue
        tt = t_(beat * 1.4); x = np.sin(2 * np.pi * mtof(prog[b % 4][0] - 24) * tt) * env(len(tt), .01, .5)
        sub[s:s + len(x)] += x[:N - s] * .5
# arp pluck
arp = np.zeros(N); pat = [0, 1, 2, 1, 0, 2, 1, 2]
for b in range(nb):
    for k in range(8):
        s = int((b * bar + k * beat / 2) * SR)
        if s >= N: continue
        m = prog[b % 4][pat[k]] + 12; tt = t_(.4)
        x = (np.sin(2 * np.pi * mtof(m) * tt) + .3 * np.sin(4 * np.pi * mtof(m) * tt)) * env(len(tt), .003, .12)
        arp[s:s + len(x)] += x[:N - s] * .16
# drums
kick = np.zeros(N); hat = np.zeros(N)
K = (lambda: (lambda tt: np.sin(2 * np.pi * np.cumsum(110 * np.exp(-tt * 18) + 45) / SR) * env(len(tt), .001, .18))(t_(.4)))()
H = hp(noise(.05), 7000) * env(int(.05 * SR), .0005, .012)
for i in range(int(DUR / beat) + 1):
    s = int(i * beat * SR)
    if s >= N: break
    if i % 2 == 0: kick[s:s + len(K)] += K[:N - s] * .7
    sh = int((i + .5) * beat * SR)
    if sh < N: hat[sh:sh + len(H)] += H[:N - sh] * .22
# arrangement: drums enter at bar 1; drop-out for the "strategy" build; fade out at the end
drums_g = np.clip((t - bar * 1) / .05, 0, 1)
sA, sB = T(195) - 0.2, T(199)
drums_g *= np.where((t > sA) & (t < sB), 0, 1)
arp_g = np.where((t > sA) & (t < sB), 0.4, 1.0)
mus = pad + sub * .9 + arp * arp_g + (kick + hat) * drums_g
mus *= np.clip((DUR - t) / 1.5, 0, 1) * np.clip(t / .3, 0, 1)

if os.path.exists(f"{S}/build/music_gen.wav"):
    mg, _ = sf.read(f"{S}/build/music_gen.wav"); mg = mg.mean(1) if mg.ndim == 2 else mg
    mg = mg[:N]; mg = np.pad(mg, (0, N - len(mg))); tt_ = np.arange(N) / SR
    mus = mg * np.clip((DUR - tt_) / 1.8, 0, 1)
# ---------- voice: original recording, silence inserted at sentence breaks (no stretching) ----------
v, vsr = sf.read(f"{S}/sep/vocals_ft48.wav"); assert vsr == SR
v = v if v.ndim == 1 else v.mean(1)
v = v[:int(cuts["end"] * SR)]
parts = []; p = 0
for x, d in cuts["ins"]:
    k = int(x * SR); parts.append(v[p:k]); parts.append(np.zeros(int(d * SR))); p = k
parts.append(v[p:])
voice = np.concatenate(parts)[:N]; voice = np.pad(voice, (0, N - len(voice)))
# one smooth lift on the final line only (you naturally trail off there)
L = len(W); a = W[L - 6]["s"] - .3; b = W[L - 1]["e"] + .3
g = np.ones(N); tt = np.arange(N) / SR
g += (10 ** (4 / 20) - 1) * np.clip((tt - a) / .4, 0, 1) * np.clip((b + .4 - tt) / .4, 0, 1)
voice *= g
voice = voice / (np.sqrt(np.mean(voice[np.abs(voice) > 2e-3] ** 2)) + 1e-9) * 10 ** (-20 / 20)
sf.write(f"{S}/build/voice_raw.wav", np.clip(voice, -1, 1), SR)

# strong ducking of music + SFX whenever the voice is speaking
venv = np.abs(voice); w = int(.08 * SR); venv = np.convolve(venv, np.ones(w) / w, mode="same")
act = np.clip(venv / (np.percentile(venv[venv > 1e-4], 60) + 1e-9), 0, 1)
hold = lp(act, 3)  # ~50ms release smoothing
act = np.maximum(act, hold)
mus *= 1 - .70 * lp(act, 6)          # ~ -10 dB under speech
sd = 1 - .68 * lp(act, 10)           # SFX ~ -10 dB under speech, full in gaps
sfxL *= sd; sfxR *= sd
sf.write(f"{S}/build/music.wav", norm(mus, .5), SR)
sf.write(f"{S}/build/sfx.wav", np.stack([sfxL, sfxR], 1) / (np.max(np.abs([sfxL, sfxR])) + 1e-9) * .9, SR)
print("ok", DUR)
