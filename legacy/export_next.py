"""Export the shared content in build.py to lib/data.json and make sharper images for the Next.js site."""
import json, sys
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance

L = Path(__file__).parent
ROOT = L.parent
sys.path.insert(0, str(L))
import build as D

keys = ["SITE","PHONE_OFFICE","PHONE_OFFICE_SHOW","WA_ENQUIRY","EMAIL","INSTAGRAM","LINKTREE","ADDRESS_1","ADDRESS_2",
        "ADDRESS_NOTE","HOURS","MAP_EMBED","MAP_LINK","GOOGLE_RATING","GOOGLE_REVIEWS","PASS_RATE","LEGAL"]
data = {k: getattr(D, k) for k in keys}
data["faculty"] = D.FACULTY
data["achievers"] = [dict(name=n, slug=s, course=c, note=note) for n, s, c, note in D.ACHIEVERS]
data["reviews"] = [dict(name=n, text=t) for n, t in D.REVIEWS]
(ROOT / "lib/data.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf8")

pub = ROOT / "public/img"
# achievers: originals are 200px with a printed frame; crop the frame, upscale 3x with Lanczos, sharpen
for p in sorted((L / "assets/results").glob("std-*.webp")):
    im = Image.open(p).convert("RGB")
    w, h = im.size; i = round(w * 0.165)
    im = im.crop((i, i, w - i, h - i)).resize((420, 420), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=90, threshold=2))
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im.save(pub / "achievers" / (p.stem[4:] + ".webp"), quality=92, method=6)
for p in sorted((L / "assets/team").glob("*.webp")):
    if p.stem.startswith("thumb-"): continue
    im = Image.open(p).convert("RGB").resize((800, 800), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))
    im.save(pub / "team" / p.name, quality=92, method=6)
Image.open(L / "assets/hero-bg.webp").convert("RGB").save(pub / "students.webp", quality=90, method=6)
for f in ["mark.png", "logo-round.png"]:
    src = L / "v2/assets" / f
    Image.open(src).save(pub / f, optimize=True)
print(len(data["achievers"]), "achievers,", len(data["faculty"]), "faculty")
