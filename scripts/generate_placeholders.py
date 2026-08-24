"""
Génère des images temporaires (placeholders) pour le site Le Trophée.
À REMPLACER par de véritables photographies du restaurant avant mise en production.
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

TERRACOTTA = (168, 67, 36)
TERRACOTTA_DARK = (117, 46, 24)
BRUN = (39, 26, 20)
BRUN_LIGHT = (58, 40, 31)
OCRE = (211, 155, 58)
OCRE_LIGHT = (227, 181, 101)
OLIVE = (102, 112, 68)
IVOIRE = (255, 249, 240)
BEIGE = (240, 224, 199)

random.seed(42)


def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(size, top, bottom):
    w, h = size
    img = Image.new("RGB", size, top)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        c = lerp(top, bottom, t)
        for x in range(w):
            px[x, y] = c
    return img


def radial_glow(img, center, radius, color, alpha=90):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    cx, cy = center
    for r in range(radius, 0, -4):
        a = int(alpha * (1 - r / radius))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, a))
    img.paste(Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB"), (0, 0))
    return img


def add_grain(img, amount=10):
    w, h = img.size
    px = img.load()
    for _ in range(int(w * h * 0.015)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y][:3]
        n = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + n)), max(0, min(255, g + n)), max(0, min(255, b + n)))
    return img


def label(img, text, sub=None, color=IVOIRE, y_ratio=0.5):
    d = ImageDraw.Draw(img)
    w, h = img.size
    f1 = font(int(w * 0.045), bold=True)
    f2 = font(int(w * 0.022))
    bbox = d.textbbox((0, 0), text, font=f1)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    ty = int(h * y_ratio - th)
    d.text(((w - tw) / 2, ty), text, font=f1, fill=color)
    if sub:
        bbox2 = d.textbbox((0, 0), sub, font=f2)
        sw = bbox2[2] - bbox2[0]
        d.text(((w - sw) / 2, ty + th + 18), sub, font=f2, fill=color)
    return img


def plate_photo(path, size, base_top, base_bottom, title, tag, accent=OCRE):
    w, h = size
    img = vertical_gradient(size, base_top, base_bottom)
    img = img.convert("RGBA")
    # soft organic plate shape
    plate = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(plate)
    cx, cy = w * 0.5, h * 0.46
    rx, ry = w * 0.34, h * 0.27
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(255, 249, 240, 235))
    d.ellipse(
        [cx - rx * 0.78, cy - ry * 0.78, cx + rx * 0.78, cy + ry * 0.78],
        fill=(*accent, 60),
    )
    # food mounds
    for i in range(5):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(0, rx * 0.45)
        fx = cx + math.cos(angle) * dist
        fy = cy + math.sin(angle) * dist * 0.6
        fr = random.uniform(rx * 0.16, rx * 0.28)
        tone = random.choice([TERRACOTTA, TERRACOTTA_DARK, OCRE, BRUN_LIGHT])
        d.ellipse([fx - fr, fy - fr * 0.8, fx + fr, fy + fr * 0.8], fill=(*tone, 230))
    plate = plate.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.alpha_composite(img, plate)
    img = img.convert("RGB")
    img = add_grain(img, 6)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay)
    d2.rectangle([0, h * 0.82, w, h], fill=(*BRUN, 150))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d3 = ImageDraw.Draw(img)
    f1 = font(int(w * 0.048), bold=True)
    f2 = font(int(w * 0.024))
    d3.text((w * 0.05, h * 0.86), title, font=f1, fill=IVOIRE)
    d3.text((w * 0.05, h * 0.935), tag, font=f2, fill=OCRE_LIGHT)
    img.save(path, quality=87)


def bogolan_texture(path, size=(1600, 1600)):
    w, h = size
    img = Image.new("RGB", size, BEIGE)
    d = ImageDraw.Draw(img)
    # base weave lines
    for y in range(0, h, 6):
        shade = lerp(BEIGE, (223, 199, 160), (y % 60) / 60)
        d.line([(0, y), (w, y)], fill=shade, width=1)
    cell = 160
    for gy in range(0, h, cell):
        for gx in range(0, w, cell):
            rnd = random.random()
            pad = 14
            box = [gx + pad, gy + pad, gx + cell - pad, gy + cell - pad]
            if rnd < 0.2:
                d.rectangle(box, outline=BRUN, width=6)
                d.line([box[0], box[1], box[2], box[3]], fill=BRUN, width=5)
                d.line([box[0], box[3], box[2], box[1]], fill=BRUN, width=5)
            elif rnd < 0.4:
                cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
                r = (box[2] - box[0]) / 2
                d.ellipse(box, outline=TERRACOTTA_DARK, width=6)
                d.ellipse([cx - r * 0.35, cy - r * 0.35, cx + r * 0.35, cy + r * 0.35], fill=TERRACOTTA_DARK)
            elif rnd < 0.6:
                step = (box[2] - box[0]) / 4
                for i in range(5):
                    xx = box[0] + i * step
                    d.line([(xx, box[1]), (xx, box[3])], fill=OCRE, width=5)
                for i in range(5):
                    yy = box[1] + i * step
                    d.line([(box[0], yy), (box[2], yy)], fill=OCRE, width=3)
            elif rnd < 0.8:
                d.polygon(
                    [(box[0], box[3]), ((box[0] + box[2]) / 2, box[1]), (box[2], box[3])],
                    outline=BRUN,
                    width=6,
                )
            else:
                for i in range(6):
                    xx = box[0] + i * (box[2] - box[0]) / 6
                    d.line([(xx, box[1]), (xx, box[3])], fill=BRUN, width=4 if i % 2 == 0 else 2)
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img = add_grain(img, 8)
    img.save(path, quality=90)


def poupee_png(path, size, palette):
    w, h = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = w / 2
    # base shadow
    d.ellipse([w * 0.22, h * 0.93, w * 0.78, h * 0.99], fill=(0, 0, 0, 40))
    # body (wrapper skirt, bell-shaped)
    body_top = h * 0.42
    d.polygon(
        [(cx - w * 0.05, body_top), (cx + w * 0.05, body_top), (w * 0.82, h * 0.95), (w * 0.18, h * 0.95)],
        fill=palette["body"],
    )
    # skirt pattern stripes
    for i in range(6):
        t = i / 5
        y0 = body_top + (h * 0.95 - body_top) * t
        y1 = y0 + 10
        d.rectangle([w * 0.15, y0, w * 0.85, y1], fill=palette["accent"])
    # torso wrap
    d.rectangle([cx - w * 0.16, h * 0.28, cx + w * 0.16, body_top + 10], fill=palette["torso"])
    d.rectangle([cx - w * 0.16, h * 0.3, cx + w * 0.16, h * 0.34], fill=palette["accent"])
    # arms
    d.rounded_rectangle([cx - w * 0.27, h * 0.3, cx - w * 0.16, h * 0.55], radius=14, fill=palette["torso"])
    d.rounded_rectangle([cx + w * 0.16, h * 0.3, cx + w * 0.27, h * 0.55], radius=14, fill=palette["torso"])
    # neck + head
    d.rectangle([cx - w * 0.045, h * 0.22, cx + w * 0.045, h * 0.29], fill=palette["skin"])
    head_r = w * 0.13
    d.ellipse([cx - head_r, h * 0.09, cx + head_r, h * 0.09 + head_r * 2], fill=palette["skin"])
    # headwrap
    d.pieslice([cx - head_r * 1.15, h * 0.06, cx + head_r * 1.15, h * 0.09 + head_r * 1.3], 180, 360, fill=palette["head"])
    d.rectangle([cx - head_r * 1.15, h * 0.09 + head_r * 0.55, cx + head_r * 1.15, h * 0.09 + head_r * 0.75], fill=palette["accent"])
    knot_r = head_r * 0.35
    d.ellipse([cx - knot_r, h * 0.055, cx + knot_r, h * 0.055 + knot_r * 2], fill=palette["accent"])
    # simple beaded necklace
    for i in range(-3, 4):
        bx = cx + i * (w * 0.028)
        by = h * 0.235 + abs(i) * (h * 0.01)
        d.ellipse([bx - 5, by - 5, bx + 5, by + 5], fill=palette["accent"])
    img.save(path)


def scene_photo(path, size, top, bottom, kind):
    w, h = size
    img = vertical_gradient(size, top, bottom).convert("RGBA")
    d = ImageDraw.Draw(img)
    if kind == "interieur":
        for i in range(6):
            x = w * (0.05 + i * 0.16)
            d.rounded_rectangle([x, h * 0.55, x + w * 0.1, h * 0.62], radius=8, fill=(*BRUN_LIGHT, 200))
            d.ellipse([x + w * 0.01, h * 0.4, x + w * 0.09, h * 0.55], fill=(*OCRE, 180))
        d.rectangle([0, h * 0.62, w, h], fill=(*BRUN, 220))
        for i in range(4):
            x = w * (0.1 + i * 0.28)
            d.rounded_rectangle([x, h * 0.15, x + w * 0.14, h * 0.4], radius=18, fill=(*TERRACOTTA, 90))
    elif kind == "exterieur":
        for i in range(5):
            x = w * (0.05 + i * 0.2)
            d.ellipse([x, h * 0.12, x + w * 0.16, h * 0.5], fill=(*OLIVE, 140))
        d.rectangle([0, h * 0.65, w, h], fill=(*OCRE_LIGHT, 90))
        for i in range(4):
            x = w * (0.12 + i * 0.24)
            d.rounded_rectangle([x, h * 0.62, x + w * 0.12, h * 0.72], radius=10, fill=(*IVOIRE, 210))
    elif kind == "karaoke":
        for i in range(30):
            x = random.uniform(0, w)
            y = random.uniform(h * 0.1, h * 0.6)
            r = random.uniform(2, 5)
            d.ellipse([x - r, y - r, x + r, y + r], fill=(*OCRE_LIGHT, random.randint(60, 160)))
        d.rounded_rectangle([w * 0.42, h * 0.35, w * 0.58, h * 0.75], radius=30, fill=(*BRUN, 230))
        d.ellipse([w * 0.44, h * 0.32, w * 0.56, h * 0.44], fill=(*TERRACOTTA, 230))
    elif kind == "jeux":
        for i in range(4):
            for j in range(4):
                x = w * 0.28 + i * w * 0.11
                y = h * 0.4 + j * h * 0.09
                col = OCRE if (i + j) % 2 == 0 else TERRACOTTA
                d.rectangle([x, y, x + w * 0.09, y + h * 0.07], fill=(*col, 200))
        d.ellipse([w * 0.15, h * 0.2, w * 0.28, h * 0.33], fill=(*IVOIRE, 220))
        d.ellipse([w * 0.72, h * 0.22, w * 0.85, h * 0.35], fill=(*OLIVE, 220))
    elif kind == "prive":
        for i in range(8):
            x = w * (0.05 + i * 0.12)
            d.ellipse([x, h * 0.2, x + w * 0.07, h * 0.3], fill=(*OCRE, 200))
        d.rectangle([w * 0.1, h * 0.55, w * 0.9, h * 0.62], fill=(*IVOIRE, 220))
        for i in range(6):
            x = w * (0.14 + i * 0.14)
            d.ellipse([x, h * 0.4, x + w * 0.08, h * 0.55], fill=(*TERRACOTTA, 210))
    img = img.convert("RGB")
    img = add_grain(img, 6)
    return img


def hero_image(path, size=(1920, 1280)):
    w, h = size
    img = vertical_gradient(size, (74, 40, 24), (20, 13, 10)).convert("RGBA")
    d = ImageDraw.Draw(img)
    cx, cy = w * 0.56, h * 0.5
    for r, col, a in [(560, TERRACOTTA, 70), (420, OCRE, 60), (300, TERRACOTTA_DARK, 90)]:
        d.ellipse([cx - r, cy - r * 0.72, cx + r, cy + r * 0.72], fill=(*col, a))
    for i in range(7):
        angle = i / 7 * math.pi * 2
        fx = cx + math.cos(angle) * 210
        fy = cy + math.sin(angle) * 150
        fr = random.uniform(70, 120)
        tone = random.choice([TERRACOTTA, OCRE, BRUN_LIGHT])
        d.ellipse([fx - fr, fy - fr * 0.8, fx + fr, fy + fr * 0.8], fill=(*tone, 235))
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img = img.convert("RGB")
    img = add_grain(img, 8)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay)
    for x in range(0, w):
        a = int(150 * (1 - x / (w * 0.75))) if x < w * 0.75 else 0
        d2.line([(x, 0), (x, h)], fill=(*BRUN, max(a, 0)))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d3 = ImageDraw.Draw(img)
    f = font(38)
    d3.text((w * 0.04, h * 0.94), "Photo temporaire — plat ivoirien à remplacer", font=f, fill=(255, 249, 240))
    img.save(path, quality=88)


def cta_background(path, size=(1920, 1080)):
    w, h = size
    img = vertical_gradient(size, (30, 19, 14), (12, 8, 6)).convert("RGBA")
    d = ImageDraw.Draw(img)
    for i in range(10):
        x = random.uniform(0, w)
        y = random.uniform(0, h)
        r = random.uniform(60, 180)
        d.ellipse([x - r, y - r * 0.6, x + r, y + r * 0.6], fill=(*TERRACOTTA, 25))
    img = img.filter(ImageFilter.GaussianBlur(2))
    img = img.convert("RGB")
    img = add_grain(img, 6)
    img.save(path, quality=85)


def about_portrait(path, size=(1000, 1300)):
    w, h = size
    img = vertical_gradient(size, (60, 42, 30), (24, 16, 12)).convert("RGBA")
    d = ImageDraw.Draw(img)
    d.ellipse([w * 0.5 - 260, h * 0.42 - 260, w * 0.5 + 260, h * 0.42 + 260], fill=(*TERRACOTTA, 90))
    poupee_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    dd = ImageDraw.Draw(poupee_layer)
    palette = {"body": OCRE, "torso": TERRACOTTA, "head": BRUN_LIGHT, "accent": IVOIRE, "skin": (94, 58, 38)}
    tmp_path = "/tmp/_poupee_tmp.png"
    poupee_png(tmp_path, (600, 900), palette)
    doll = Image.open(tmp_path).convert("RGBA")
    img = img.convert("RGBA")
    img.alpha_composite(doll, (int(w / 2 - 300), int(h * 0.28)))
    img = img.convert("RGB")
    img = add_grain(img, 7)
    d3 = ImageDraw.Draw(img)
    f = font(26)
    d3.text((w * 0.05, h * 0.955), "Photo temporaire — poupée africaine en décor", font=f, fill=(255, 249, 240))
    img.save(path, quality=88)


def logo(path, size=(480, 480)):
    w, h = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w / 2, h / 2
    d.ellipse([cx - 220, cy - 220, cx + 220, cy + 220], outline=TERRACOTTA, width=10)
    d.ellipse([cx - 190, cy - 190, cx + 190, cy + 190], outline=OCRE, width=4)
    f1 = font(150, bold=True)
    d.text((cx, cy - 40), "LT", font=f1, fill=TERRACOTTA, anchor="mm")
    f2 = font(28)
    d.text((cx, cy + 90), "LE TROPHÉE", font=f2, fill=BRUN, anchor="mm")
    f3 = font(20)
    d.text((cx, cy + 130), "DAKAR", font=f3, fill=OCRE, anchor="mm")
    img.save(path)


def og_image(path, size=(1200, 630)):
    w, h = size
    img = vertical_gradient(size, (60, 30, 18), (20, 13, 10)).convert("RGBA")
    d = ImageDraw.Draw(img)
    for r, col, a in [(420, TERRACOTTA, 90), (300, OCRE, 70)]:
        d.ellipse([w * 0.72 - r, h * 0.5 - r * 0.8, w * 0.72 + r, h * 0.5 + r * 0.8], fill=(*col, a))
    img = img.filter(ImageFilter.GaussianBlur(1))
    img = img.convert("RGB")
    d3 = ImageDraw.Draw(img)
    f1 = font(64, bold=True)
    f2 = font(30)
    d3.text((70, 220), "Le Trophée", font=f1, fill=IVOIRE)
    d3.text((70, 300), "Restaurant ivoirien à Dakar", font=f2, fill=OCRE_LIGHT)
    img.save(path, quality=90)


if __name__ == "__main__":
    bogolan_texture(os.path.join(OUT, "bogolan-texture.jpg"))
    hero_image(os.path.join(OUT, "hero-plat-ivoirien.jpg"))
    cta_background(os.path.join(OUT, "cta-reservation.jpg"))
    about_portrait(os.path.join(OUT, "about-poupee.jpg"))
    og_image(os.path.join(OUT, "og-image.jpg"))
    logo(os.path.join(OUT, "logo.png"))

    plate_photo(
        os.path.join(OUT, "plat-garba.jpg"), (1200, 1400),
        (90, 55, 34), (30, 19, 14), "Garba", "Photo temporaire à remplacer", accent=OCRE,
    )
    plate_photo(
        os.path.join(OUT, "plat-kedjenou.jpg"), (1200, 1000),
        (95, 50, 30), (32, 20, 15), "Kédjénou de poulet", "Photo temporaire à remplacer", accent=TERRACOTTA,
    )
    plate_photo(
        os.path.join(OUT, "plat-poisson-braise.jpg"), (1200, 1000),
        (88, 52, 32), (28, 18, 13), "Poisson braisé", "Photo temporaire à remplacer", accent=OLIVE,
    )

    scene_photo(os.path.join(OUT, "espace-interieur.jpg"), (1200, 900), (70, 46, 30), (28, 18, 14), "interieur").save(
        os.path.join(OUT, "espace-interieur.jpg"), quality=88
    )
    scene_photo(os.path.join(OUT, "espace-exterieur.jpg"), (1200, 900), (140, 110, 60), (70, 60, 35), "exterieur").save(
        os.path.join(OUT, "espace-exterieur.jpg"), quality=88
    )
    scene_photo(os.path.join(OUT, "evenement-karaoke.jpg"), (1200, 900), (60, 30, 40), (20, 12, 15), "karaoke").save(
        os.path.join(OUT, "evenement-karaoke.jpg"), quality=88
    )
    scene_photo(os.path.join(OUT, "evenement-jeux.jpg"), (1200, 900), (70, 55, 30), (25, 18, 12), "jeux").save(
        os.path.join(OUT, "evenement-jeux.jpg"), quality=88
    )
    scene_photo(os.path.join(OUT, "evenement-prive.jpg"), (1200, 900), (75, 45, 30), (28, 17, 13), "prive").save(
        os.path.join(OUT, "evenement-prive.jpg"), quality=88
    )

    poupee_png(
        os.path.join(OUT, "poupee-africaine-1.png"), (700, 1100),
        {"body": TERRACOTTA, "torso": OCRE, "head": BRUN_LIGHT, "accent": IVOIRE, "skin": (94, 58, 38)},
    )
    poupee_png(
        os.path.join(OUT, "poupee-africaine-2.png"), (700, 1100),
        {"body": OLIVE, "torso": TERRACOTTA_DARK, "head": OCRE, "accent": BEIGE, "skin": (110, 68, 44)},
    )
    poupee_png(
        os.path.join(OUT, "poupee-africaine-3.png"), (700, 1100),
        {"body": OCRE, "torso": OLIVE, "head": TERRACOTTA, "accent": IVOIRE, "skin": (80, 50, 32)},
    )

    print("Images générées dans", OUT)
