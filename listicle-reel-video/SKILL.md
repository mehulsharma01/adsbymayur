---
name: listicle-reel-video
description: Build a vertical (9:16) "I went through 800+ ads, here are the 5/10 X that work" listicle reel as After-Effects-style motion graphics, with real ad screens, an ElevenLabs voiceover, quiet music and a few moment-synced sound effects. Use when the user asks for a research/listicle reel, a "top 5/10 offers/hooks/ads" video, an animated swipe-file video, a "what's booming before Black Friday" style trend video, or wants to remake a talking-head listicle as motion graphics. Includes the research pipeline (Motion / Meta Ad Library), the locked style, per-scene motion recipes, timing rules, audio and SFX mix, the HTML templates and the render scripts.
---

# Listicle Reel Video

A 40–55 s vertical reel that proves research ("I went through 800+ live brand ads") and then walks through 5–10 items, one scene each, ending on a comment prompt. Rendered frame by frame from HTML with Playwright, encoded with ffmpeg. No video editor needed.

Reference outputs:
- `ecom-10-offers-voice.mp4` (53 s, v1 style: one template repeated). **Superseded.**
- `black-friday-5-offers-v4.mp4` (42 s, 5 offers, After-Effects style, per-scene designs, SFX). **This is the current standard.** Template: `templates/reel-ae.html`.

---

## 1. What the user cares about (learned the hard way)

Read these before designing anything. Each one came from a rejected draft.

1. **Every scene must look different.** v1 reused one layout (pill, title, phone, chip) for every item. The user's verdict: "everything looks same, use better After Effects and graphics." Each item now gets its own background, layout, hero animation and transition (see §4).
2. **It should still read as research being shared, not an ad.** Real ad screens, real numbers, clean type. After Effects energy (kinetic type, masks, lens zooms, whip pans, stamps) is wanted, but keep it editorial: no neon overload, no fake UI, no "Winner found" pills.
3. **Show real ads.** Use live creatives (Motion / Meta Ad Library) or sharp recreations of real screens. Never show AI faces as if they were the brand's people.
4. **Proof first.** The opening must make the number believable: a wall of many real ad thumbnails, not a claim on its own.
5. **The opening proof wall is 2 s max.** If the spoken hook is longer, follow the wall with a short title beat ("These 5 offers are booming before Black Friday") rather than talking over item 1.
6. **Make the number huge.** About 330 px, rolling like an odometer, lime highlighter swipe, "+" pops in.
7. **Short, plain text.** A hook a viewer reads in about 1 second. No paragraphs.
8. **Every number on screen must be real.** Counts ("Seen in 66 ads"), totals ("813 ads · 19 brands · last 30 days"), prices and the "ON THE AD" quotes all come from the data. Round down ("800+" for 813). Derived maths is fine if it's correct ($675 → $356 is 47% off).
9. **Music must not sound like a commercial.** Calm lo-fi under the voice.
10. **Sound effects: a few, tied to moments.** v2 had only whooshes and felt flat; the user asked for SFX "not much but that make the video interesting". About one per scene, each on a visual hit (see §6).
11. **Typography polish matters.** The user flags spacing issues on a phone screenshot. Keep multi-word highlights in one block, never let chips overlap headlines, no stray artefacts (see §8).
12. **Show snapshots before a full render** when the user is around. Renders take minutes.

---

## 2. Research pipeline (how to get real offers)

1. **Source.** Motion MCP (`get_inspo_creatives`) is the reliable way to read the Meta Ad Library. Direct Meta Ad Library requests from cloud IPs return 403, and Apify public actors may not be on the plan.
2. **Pick 15–25 big DTC brands** across categories with `search_brands` (take the page with the most active creatives). Pull `launchDate=LAST_30_DAYS`, `status=ACTIVE`, `limit=45` per brand.
3. **Fan out with 3 subagents** (7–8 brands each) that write JSONL to the scratchpad: `{b,id,dup,f,d,h,c,lp,th,img}`. Have them extract from the raw tool output with a script, not by retyping ad copy.
4. **Download every creative** (video → `th`, image → `img`). They double as the intro wall tiles (813 tiles last time).
5. **Classify** with `scripts/classify_offers.py data/*.jsonl`, spot-check the matches, then pick the 5 types with the most ads and brands that also make a good scene. Black Friday 2026 winners: early access (52 ads/3 brands), up to X% off everything (66/7), dollars not % (20/3), free gift on top (22/2), sell it as a gift (58/10).
6. **Pick one hero ad per item** from a contact sheet. Prefer a 9:16 image with the offer in big text. Verify the quoted text against the image.
7. **Write `RESEARCH.md`** next to the video: source, date window, brand list, counts and the ad ID + landing page for every ad shown.
8. Optional context: one web search for vendor guides. Say that vendor sources sell the tactics they recommend.

Motion stores image ads at about 600 px. Fit them on a 1128×2388 phone screen. For tall ads, use a cover crop. For square or 4:5 ads, fill above and below with the ad's own edge colours (not a blurred copy: it shows a giant blurry headline).

---

## 3. Locked visual base

| Token | Value |
| --- | --- |
| Canvas | 1080 × 1920; render 60 fps, deliver 30 fps with 2-frame blend (motion blur) |
| Ink / lime / green | `#0E120D` / `#B6F07A` / `#2E8B1E`, `#7BE35A` |
| Display font | Plus Jakarta Sans 800, **letter-spacing −0.03em**, line-height 1.02 (−0.045em was too tight) |
| Accent word | Instrument Serif italic at 1.2× |
| Data / labels | JetBrains Mono 700 uppercase, 0.06em, in a pill or a dark "data" chip |
| Texture | film grain (canvas noise, 7% multiply, shifted every frame) + soft vignette |
| Phones | dark frame `#101210`, radius 96, real ad screen inside |

Each scene picks its **own background** from this family: lavender, warm peach with type bands, **one dark scene** (ink + lime grid) for contrast, warm orange, cream + red. The rotation keeps it from looking samey.

---

## 4. Structure and per-scene motion recipes

| Beat | Length | Recipe |
| --- | --- | --- |
| **Proof wall** | 2.0 s | 3D-tilted wall of real thumbnails (rotateX 24°), tiles pop from the centre outwards, lime scan outlines. "I went through", then the **odometer 800+** (per-digit strips), "+" spins in, highlighter swipe, "live brand ads." Mono ticker types "813 ads · 19 brands · Meta Ad Library · last 30 days". **Out:** zoom through the wall (scale ×3.6 + blur). |
| **Title beat** | rest of hook line (about 5 s) | Brand-name pills marquee in 3 rows (real brand list) + giant "19 big brands", then a kinetic headline with masked word reveals, "5" in an ink chip, the serif accent word with a hand-drawn underline, a highlight block on the key phrase, a date chip, and the item screens fanned like cards. **Out:** card 1 grows to full screen + circle iris wipe. |
| **Item scenes** | 4.5–7 s each (set by the voice line) | Each has: offer pill `OFFER 0N / 05`, a **unique hero mechanic**, the real ad on a phone, a mono "Seen in N ads" counter, and its **own exit transition**. Examples that worked: |
| | | • *Early access:* letters rise one by one, a members pass flips in (rotateY), a Nov 19 → Nov 27 timeline draws, a lime box outlines the offer text on the ad. Out: whip pan left. |
| | | • *Everything on sale:* scrolling "EVERYTHING ·" bands, words slam in (scale + blur), the phone whips in from the right, the % counts 0→40, the "EVERYTHING." stamp lands with screen shake and dust. Out: angled dark panel wipe up. |
| | | • *Dollars not %:* dark scene, "%" gets struck and drops, "47% off vs $319 off" cards with a glow on the winner, the price counts down $675→$356, a magnifier lens over the real price on the ad, the strike-through draws. Out: punch zoom + white flash. |
| | | • *Free gift:* rotating sun rays, the gift box drops with an elastic bounce, the lid flies off with confetti, the ad rises out of the box, a quote chip. Out: diagonal red ribbon wipe. |
| | | • *Gift framing:* three brands' ads fan out, a swinging gift tag (damped pendulum) quoting the ad, the strongest stat counter (58 ads · 10 brands). Out: cards scatter. |
| **End card** | about 5 s | "Which one are you *running* this Black Friday?", a numbered 3+2 grid of the screens (badges pop in order), and a comment bar that types "3" and sends it into a bubble. |

Rules:
- **No two consecutive scenes share a transition or a background.**
- **Sync hero beats to the voice.** Run `silencedetect` (−35 dB, 0.12 s) on `vo.wav` to get phrase boundaries, then put the stamp, strike or lid pop on the matching word.
- The progress bar (5 segments) sits on top during item scenes and turns lime on the dark scene.

---

## 5. Voice (ElevenLabs)

- Voice: **Liam – Energetic, Social Media Creator** (`TX3LPaxmHKxFdv7VOQHJ`), model `eleven_v4`, `generations_count: 1`, one take with `[pause]` between lines. About 700 credits for 44 s.
- Script pattern: "I went through eight hundred live ads from nineteen big brands. [pause] These five offers are booming before Black Friday. [pause] Number one: early access. Mejuri lets members shop the sale first, before Black Friday even starts. [pause] … [pause] So, which one are you running this Black Friday? Comment the number."
- Name the brand and the real offer in each line. That makes it research, not opinion.
- A two-sentence hook makes `split_vo.py`'s automatic line count wrong. Split by hand from the `silencedetect` output (cut list → `atempo 1.06` → 0.3 s gaps → `vo.wav` + `tm.json` with `intro` = whole hook, `wall` = 2.0).
- Keep the end-card question identical on screen and in the voice.

## 6. Music and sound effects

- Music: ElevenLabs Music v2.5 lo-fi ("warm lo-fi hip-hop study beat… 82 BPM, not salesy, no big drops"), about 900 credits. The generation may not be flagged instrumental, so listen for vocals.
- SFX (ElevenLabs `sfx`, `eleven_text_to_sound_v3`, about 17 credits each). The set that worked, one per moment:
  | Moment | SFX prompt | Gain |
  | --- | --- | --- |
  | odometer roll | mechanical counter ticks slowing to a stop, 1.3 s | −8 dB |
  | card / pass flip | plastic card flick, 0.5 s | −6 |
  | stamp slam | heavy rubber stamp thud, 0.5 s | −2 (the one big hit) |
  | strike-through | marker swipe, 0.4 s | −5 to −8 |
  | price / "$ off" pop | soft cash-register ka-ching, 0.8 s | −5 |
  | punch zoom + flash | camera shutter + soft impact, 0.5 s | −5 |
  | box lands | cardboard box bouncy thud, 0.6 s | −4 |
  | lid pop / confetti | small party popper + confetti rustle, 1.2 s | −6 |
  | gift tag swing | tiny sleigh-bell jingle, 0.9 s | −7 |
  | comment sent | keyboard tap + send pop, 0.8 s | −5 |
  | scene changes | soft airy whoosh, 0.6 s | −4 to −8 |
- Mix with `scripts/mix_sfx.py --sfx sfx.json`: voice −16 LUFS lead, music about −30 LUFS ducked, master −14 LUFS / −1 dBTP. No risers or dings on every element.

---

## 7. Build pipeline

```
templates/reel-ae.html     # CURRENT: all scenes in one page, window.seek(t), reads window.TM
templates/intro-adwall.html + scenes.html   # v1 templates (one repeated scene layout), kept for reference
scripts/cap.js             # Playwright frame grabber, FPS env (default 60), F0/F1 for parallel chunks
scripts/classify_offers.py # offer-type counts from scraped ads
scripts/mix_sfx.py         # voice + music + timed SFX
scripts/split_vo.py, mix.py, capture.js     # v1 helpers
```

1. **Assets:** `shots/1_t.png…5_t.png` (+ extra screens, e.g. `skims.png`) at 1128×2388; `arts/000.jpg…` wall tiles at 200×290. Never commit third-party ad images or scraped data to this public repo.
2. **Edit** `reel-ae.html`: texts, counts, brand names, `TM` defaults, highlight-box and lens coordinates.
3. **Stills first:** `PAGE=reel-ae.html FDIR=st TMFILE=$PWD/tm.json node cap.js "$PWD" 2.6,6.4,10.5,…`, then make a contact sheet and check it (§8).
4. **Render** in 4 parallel chunks (2,520 frames ≈ 5 min):
   ```bash
   for a in 0 640 1280 1920; do PAGE=reel-ae.html FDIR=f60 F0=$a F1=$((a+640)) TMFILE=$PWD/tm.json node cap.js "$PWD" & done; wait
   ```
5. **Encode** with motion blur and a bitrate cap (grain makes CRF 16 produce about 290 MB):
   ```bash
   ffmpeg -framerate 60 -i f60/%05d.jpg -i mix.wav -vf "tmix=frames=2:weights='1 1',fps=30" -c:v libx264 -crf 21 -maxrate 14M -bufsize 28M -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart out.mp4
   ```
   About 50 MB for 42 s.

---

## 8. QC checklist (bugs we actually shipped once)

- **Masked text leaking:** words hidden by `translateY(115%)` inside an overflow mask still show a sliver of their highlight background. Set `opacity: 0` until the reveal starts (`rev()` does this now).
- **SVG stroke "dots":** a path with `stroke-linecap: round` and `dashoffset = 1` still draws its two round caps. Hide the SVG until the draw starts. This caused the "green drops around 19".
- **Split highlights:** "Black" and "Friday." got separate lime boxes with a gap. Join multi-word highlights with a non-breaking space (` `) so they become one block.
- **Overlaps:** check that date chips, data chips and quote chips never sit on the headline or the ad's own key text. Move the chip (per-item `ct` top) instead of covering the offer.
- **Headline wrapping:** at 118–150 px a 940 px column fits about 14 characters. Plan line breaks explicitly with `<br>`.
- **Duplicate element IDs** (a counter span sharing an ID with a phone) wipe the phone. Keep IDs unique.
- Look at the frames at full size on a phone-sized view. The user reviews on a phone.

## 9. Reuse for other topics

Swap the research query and the items. The structure works for any "I went through N things → here are the X that work" reel: hooks, landing pages, emails, ad formats, seasonal offers. Keep the 2 s proof wall, one hero mechanic per item with a unique transition, real screens, real counts, a calm track and a handful of moment-synced SFX.
