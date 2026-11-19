"""Count offer types across scraped ads (JSONL, one ad per line).

Usage: python3 classify_offers.py data/*.jsonl
Each line: {"b": brand, "id", "f": format, "d": date, "h": headline, "c": primary copy, "lp", "th", "img"}
Prints ads and brands per offer type. These counts are what the video may show ("Seen in 66 ads").
Spot-check the matches before using a number: print a few headlines per type and drop false positives.
"""
import json, sys, re, collections
rows = [json.loads(l) for f in sys.argv[1:] for l in open(f) if l.strip()]
T = lambda r: ((r.get('h') or '') + ' ' + (r.get('c') or '')).lower()
CAT = {
 'early_access': r'early access|early holiday sale|pre-black friday|first access|first dibs|head start|shop (the )?sale first|before everyone',
 'dollars_saved': r'save \$[\d,]+|\$[\d,]+ off|save over \$|\$[\d,]+\+? of free',
 'free_gift': r'free (gift|travel bag|toiletry|skincare)|\d free gifts|\$[\d,]+\+? of free|gift with purchase',
 'multibuy': r'buy \d,? get \d|\d for \$\d+|bogo',
 'gift_framed': r'gifts? under \$|stocking stuffer|gift guide|gift (for|that|nobody|he|they)|the gift',
 'up_to_everything': r'up to \d+% off (everything|sitewide)|up to \d+% (off )?sitewide|\d+% off sitewide|everything.{0,25}on sale|everything is \d+% off|save up to \d+% sitewide',
 'deadline': r'this weekend|weekend only|ends soon|five days|ends tonight|limited time',
 'bundle_save': r'bundle (and|&) save',
}
print('ads', len(rows), 'brands', len(set(r['b'] for r in rows)))
for k, rx in CAT.items():
    m = [r for r in rows if re.search(rx, T(r))]
    print(f'{k:18s} {len(m):4d} ads  {len(set(r["b"] for r in m)):2d} brands  {collections.Counter(r["b"] for r in m).most_common(6)}')
