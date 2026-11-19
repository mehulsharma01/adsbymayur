---
name: listicle-reel-video
description: Build a vertical (9:16) "I analysed 500+ ads, here are the 10 X that work" listicle reel as motion graphics, with real ad screens, an ElevenLabs voiceover, quiet music and minimal sound effects. Use when the user asks for a research/listicle reel, a "top 10 offers/hooks/ads" video, an animated swipe-file video, or wants to remake a talking-head listicle (e.g. "24 offers that print") as a clean motion-graphics video. Includes the locked style, scene structure, timing rules, audio mix, the HTML scene templates and the render scripts.
---

# Listicle Reel Video

A 45–55 s vertical reel that proves research ("I analysed 500+ e-commerce ads") and then walks through 10 items, one scene each, ending on a comment prompt. Rendered frame by frame from HTML with Playwright, encoded with ffmpeg. No video editor needed.

Reference output: `ecom-10-offers-voice.mp4` (53 s, 1080×1920, 30 fps).

---

## 1. What the user cares about (learned the hard way)

Read these before designing anything. Each one came from a rejected draft.

1. **It must look like research being shared, not software or an ad being sold.** No 3D tilts, neon glows, light beams or "Winner found" pills over dashboards. Flat, real screens. White/off-white background.
2. **Show real ads.** Recreate the real ad/landing screens from the source video (sharp, high-res) or pull live creatives (Motion / Meta Ad Library). Never show AI model faces as if they were the brand's people.
3. **Proof first.** The opening must make "500+" believable: a wall of many real ad thumbnails, not a claim on its own.
4. **The opening is 2 seconds max.** Big number, wall of ads, done.
5. **Short, plain text.** A hook a viewer reads in about 1 second. No paragraphs on screen.
6. **Make the number huge.** "500+" is the attention grabber: about 330 px, counting up from 0, with a lime highlighter swipe.
7. **Music must not sound like a commercial.** Calm, informational, "creator explaining something": lo-fi, soft acoustic, ambient. Keep it low under the voice.
8. **Sound effects: minimal.** Soft whooshes only. No pops, dings or risers on every element.
9. **Numbers on screen must agree.** If the heading says 500+ and 10, don't show a canvas that says 60 → 5.
10. **Show snapshots before rendering.** Send 3–5 key stills, get a yes, then render. Renders take minutes and users change direction often.

---

## 2. Locked visual style

| Token | Value |
| --- | --- |
| Canvas | 1080 × 1920, 30 fps |
| Background | `#FFFFFF` with soft radial washes: lime `#EAFBD9` top-left, lavender `#F1EEFE` right |
| Ink | `#0E120D` |
| Accent | lime `#B6F07A` (highlighter, marker), green `#2E8B1E` / `#7BE35A` (dots, "+") |
| Muted text | `#6B7368` |
| Display / body font | Plus Jakarta Sans 700–800, tight tracking (−0.03 to −0.045em) |
| Accent word | Instrument Serif italic, about 1.4× size (e.g. *winning*, *testing*) |
| Labels | Plus Jakarta 700, 0.14em tracking, uppercase, green, inside a white pill with a green dot |
| Number chip | the "10" in a black rounded chip with white text |
| Highlighter | lime bar behind the lower 40% of a key word or number |

Phone mockups: dark frame `#101210`, radius 96, a pastel card behind each (lavender, cream, mint, peach, blue in rotation).

---

## 3. Structure and timing

| Scene | Length | What happens |
| --- | --- | --- |
| **Intro: ad wall** | **2.0 s** | "I analysed" → **500+** counts 0→500 (pops at 500, highlighter swipes in) → "e-commerce ads." → "These **10** offers are *winning* / right now." Below it a 10-column wall of real ad tiles: tiles cascade in diagonally, columns marquee up and down alternately, random tiles flash a lime scan outline, "+ 500 more ads ↓". Exits by flying up. |
| **Offer 1…10** | about 3.4–4.7 s each (set by the voice line) | Pill "OFFER 0N / 10", big name (Plus Jakarta 110–120 px), one-line "why" with one serif accent word, a phone with the real offer screen springing up over a pastel card, an "ON THE PAGE" chip quoting the real offer from the screen (e.g. "$148 ~~$248~~ · 40% off"). Progress bar of 10 segments at the top. The phone swipes out left. |
| **End card** | about 4.5 s | "Which one are you *testing* first?", a numbered 2×5 grid of all 10 screens with names, pill "Tell me the number in the comments". |

Total is usually 44 s without voice and 50–55 s with voice.

---

## 4. Hooks and copy

Good opening hook (the user's pick): **"I analysed 500+ e-commerce ads. These 10 offers are winning right now."**

Short alternates that tested well:
- "500+ ecom ads. 10 offers that *work.*"
- "500+ ads studied. Steal these 10 offers."
- "500+ ads later: 10 offers *going viral.*"

Per-scene "why" lines are one short sentence (e.g. "Buy more, pay *less each*."). The "ON THE PAGE" chip must quote real text visible on the screen. Never invent prices or stats.

---

## 5. Voice (ElevenLabs)

- Voice: **Liam – Energetic, Social Media Creator** (`TX3LPaxmHKxFdv7VOQHJ`), model `eleven_v4`, `generations_count: 1`. If the user wants a specific voice, ask for its name or ID. Don't guess from a video: background music makes matching unreliable.
- Write the whole script as **one take** with `[pause]` between lines so the tone stays consistent. Line order: intro, offer 1…10, outro.
- Split with `scripts/split_vo.py` (silencedetect → segments, `atempo 1.06`, 0.3 s gaps) to get `vo.wav` and `tm.json` scene timings.
- If the intro line is longer than the 2 s intro, let it run over into offer 1. Don't speed it up past about 1.1×.
- Example script:
  "I analysed five hundred plus e-commerce ads. [pause] These ten offers are winning right now. Number one: the discount. Show the new price right next to the old one. [pause] Two: the welcome offer. A free gift on the first order, not just a code. [pause] … [pause] So, which one are you testing first? Comment the number."
- Cost reference: about 840 credits for a 55 s take.

## 6. Music and sound effects

- Music: **ElevenLabs Music v2.5** (full ElevenLabs connector: `node_type: music`, `model eleven_music_v2_5`). One track per call, about 900 credits each. Put "Instrumental only, no vocals, no singing" in the prompt, then listen for vocals anyway.
- Prompts that matched "informational, not salesy":
  - *Warm lo-fi hip-hop study beat … mellow Rhodes, soft dusty drums, vinyl crackle, 82 BPM, honest, informative, not salesy, no big drops.* (the pick)
  - *Soft acoustic guitar fingerpicking, light piano, brushed percussion, documentary feel, 92 BPM.*
  - *Minimal ambient electronic explainer, soft pulsing synth, light clicky percussion, 100 BPM, understated.*
- Avoid hip-hop/pop-funk/trap/corporate tracks for this format. The user said they "sound like a commercial".
- SFX from ElevenLabs Sound Effects (`node_type: sfx`, `eleven_text_to_sound_v3`, about 17 credits each): a short airy whoosh (0.6 s) and a soft rise-into-hit stinger (1.2 s).
- Mix with `scripts/mix.py`: voice −16 LUFS lead, music about −30 LUFS with sidechain ducking, whooshes at volume 0.1–0.2, master −14 LUFS / −1 dBTP. Use `--novoice` for a music-only cut.

---

## 7. Build pipeline

Templates are plain HTML pages that expose `window.seek(t)` and `window.TOTAL`. Every animation is a pure function of `t`, so frames render deterministically.

```
templates/intro-adwall.html   # 2 s intro: giant 500+, animated ad wall (needs arts/000.jpg… ad tiles)
templates/scenes.html         # offer scenes + end card (needs shots/1_t.png…10_t.png offer screens)
scripts/capture.js            # Playwright frame grabber
scripts/split_vo.py           # VO take → segments + tm.json
scripts/mix.py                # voice + music + whooshes → mix.wav
```

1. **Assets**
   - `shots/N_t.png`: 10 real offer screens, tall phone screenshots cropped to the screen (no frame or background). If the source is a blurry video, extract a frame, crop the phone and recreate it sharp with Nano Banana Pro on Higgsfield (`nano_banana_pro`, 9:16, 2k, image reference). The prompt lists the exact visible text top to bottom and ends "flat full-screen phone screenshot, no phone frame, no hands, perfectly legible text".
   - `arts/000.jpg…`: 60+ real ad creatives for the wall (200×290). Repeating them to fill a 500+ wall is fine. Shuffle so no tile repeats next to itself, and label it "500+", not an exact count.
   - Never commit third-party ad images to a public repo.
2. **Edit content** in `scenes.html` (`O` array: name, why-line with one `<span class="serif">` word, chip text, pastel colour).
3. **Voice** → `split_vo.py --intro 2.0` → `tm.json`.
4. **Render frames**
   ```bash
   PAGE=intro-adwall.html FDIR=f_intro node scripts/capture.js "$PWD"
   PAGE=scenes.html FDIR=f_scenes F0=63 TMFILE=$PWD/tm.json node scripts/capture.js "$PWD"
   ```
   Then link `f_intro` frames 0–62 and `f_scenes` frames 63+ into one numbered folder. Scene frames start at `intro+0.1 s` so the scenes template's own intro is skipped.
5. **Mix**: `python3 scripts/mix.py --vo vo.wav --music lofi.mp3 --tm tm.json --whoosh whoosh.mp3 --stinger stinger.mp3`
6. **Encode**
   ```bash
   ffmpeg -framerate 30 -i frames/%05d.jpg -i mix.wav -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart out.mp4
   ```
7. **QC**: sample about 6 frames into one strip and check the 2 s intro, number agreement, an offer scene and the end card before sending.

Render cost: about 5 min for 1,600 frames at 1080×1920. Captures are JPEG q93. Use a 2× device scale only for stills.

---

## 8. Reuse for other topics

Swap the item list and assets. The structure works for any "I analysed N things → here are the X that work" reel: hooks, landing pages, emails, ad formats. Keep the 2 s proof wall, one item per scene, real screenshots, a calm track and minimal SFX.
