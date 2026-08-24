"""
Génère les images temporaires pour la carte, la galerie et les événements.
À REMPLACER par de véritables photographies avant mise en production.
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter

from generate_placeholders import (
    BEIGE,
    BRUN,
    BRUN_LIGHT,
    OCRE,
    OCRE_LIGHT,
    OLIVE,
    TERRACOTTA,
    TERRACOTTA_DARK,
    add_grain,
    font,
    plate_photo,
    poupee_png,
    vertical_gradient,
)

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
PLATS_OUT = os.path.join(OUT, "plats")
BOISSONS_OUT = os.path.join(OUT, "boissons")
ESPACES_OUT = os.path.join(OUT, "espaces")
EVENEMENTS_OUT = os.path.join(OUT, "evenements")
DECORATION_OUT = os.path.join(OUT, "decoration")
EQUIPE_OUT = os.path.join(OUT, "equipe")
HERO_OUT = os.path.join(OUT, "hero")
for _d in (PLATS_OUT, BOISSONS_OUT, ESPACES_OUT, EVENEMENTS_OUT, DECORATION_OUT, EQUIPE_OUT, HERO_OUT):
    os.makedirs(_d, exist_ok=True)

random.seed(7)

CATEGORY_ACCENT = {
    "entrees": OCRE,
    "sauces": TERRACOTTA,
    "accompagnements": OLIVE,
    "grillades": TERRACOTTA_DARK,
    "desserts": OCRE_LIGHT,
}

MENU_DISHES = [
    ("alloco-nature", "Alloco nature", "entrees"),
    ("accras-de-poisson", "Accras de poisson", "entrees"),
    ("salade-avocat-mangue", "Salade avocat-mangue", "entrees"),
    ("samoussas-de-boeuf", "Samoussas de bœuf", "entrees"),
    ("sauce-graine", "Sauce graine", "sauces"),
    ("sauce-arachide", "Sauce arachide", "sauces"),
    ("sauce-claire", "Sauce claire", "sauces"),
    ("sauce-gombo", "Sauce gombo", "sauces"),
    ("attieke", "Attiéké", "accompagnements"),
    ("foutou-banane", "Foutou banane", "accompagnements"),
    ("riz-blanc", "Riz blanc", "accompagnements"),
    ("igname-pilee", "Igname pilée", "accompagnements"),
    ("poulet-braise", "Poulet braisé", "grillades"),
    ("capitaine-braise", "Capitaine braisé", "grillades"),
    ("brochettes-de-boeuf", "Brochettes de bœuf", "grillades"),
    ("alloco-poulet-fume", "Alloco poulet fumé", "grillades"),
    ("beignets-sucres", "Beignets sucrés", "desserts"),
    ("salade-fruits-tropicaux", "Salade de fruits", "desserts"),
    ("gateau-banane", "Gâteau à la banane", "desserts"),
]

DRINKS = [
    ("ti-punch-ivoirien", "Ti'Punch ivoirien", (168, 90, 30), (211, 155, 58)),
    ("passion-punch", "Passion Punch", (196, 90, 40), (227, 181, 101)),
    ("bissap-cocktail", "Bissap Cocktail", (120, 30, 50), (168, 67, 36)),
    ("bissap-glace", "Bissap glacé", (130, 35, 55), (211, 155, 58)),
    ("gingembre-fizz", "Gingembre Fizz", (200, 150, 40), (255, 249, 240)),
    ("ananas-menthe", "Ananas-Menthe", (180, 170, 40), (102, 112, 68)),
    ("cafe-ivoirien", "Café ivoirien", (60, 38, 24), (168, 67, 36)),
    ("the-gingembre", "Thé au gingembre", (150, 100, 40), (227, 181, 101)),
    ("chocolat-chaud", "Chocolat chaud", (70, 42, 26), (211, 155, 58)),
    ("bandji", "Bandji", (210, 200, 160), (168, 67, 36)),
    ("biere-locale", "Bière locale", (200, 150, 50), (39, 26, 20)),
    ("vin-rouge", "Vin rouge", (90, 20, 30), (211, 155, 58)),
    ("jus-bissap", "Jus de bissap", (130, 30, 55), (227, 181, 101)),
    ("jus-gingembre", "Jus de gingembre", (200, 150, 40), (102, 112, 68)),
    ("eau-minerale", "Eau minérale", (170, 200, 200), (255, 249, 240)),
]


def drink_photo(path, size, liquid, accent, title):
    w, h = size
    img = vertical_gradient(size, (60, 40, 28), (18, 12, 9)).convert("RGBA")
    d = ImageDraw.Draw(img)
    cx = w * 0.5
    top_y = h * 0.22
    bottom_y = h * 0.62
    top_w = w * 0.16
    bottom_w = w * 0.1
    d.polygon(
        [
            (cx - top_w, top_y),
            (cx + top_w, top_y),
            (cx + bottom_w, bottom_y),
            (cx - bottom_w, bottom_y),
        ],
        fill=(255, 249, 240, 35),
        outline=(255, 249, 240, 90),
    )
    liquid_top = top_y + (bottom_y - top_y) * 0.22
    ratio = (liquid_top - top_y) / (bottom_y - top_y)
    lw = top_w - (top_w - bottom_w) * ratio
    d.polygon(
        [
            (cx - lw, liquid_top),
            (cx + lw, liquid_top),
            (cx + bottom_w, bottom_y),
            (cx - bottom_w, bottom_y),
        ],
        fill=(*liquid, 235),
    )
    d.line([(cx - bottom_w * 0.7, bottom_y + 4), (cx + bottom_w * 0.7, bottom_y + 4)], fill=(255, 249, 240, 60), width=6)
    d.rectangle([cx - bottom_w * 0.4, bottom_y, cx + bottom_w * 0.4, bottom_y + h * 0.06], fill=(60, 40, 28, 255))
    d.ellipse([cx - bottom_w * 0.55, bottom_y + h * 0.055, cx + bottom_w * 0.55, bottom_y + h * 0.075], fill=(40, 26, 18, 255))
    for i in range(3):
        gx = cx + random.uniform(-lw * 0.5, lw * 0.5)
        gy = random.uniform(liquid_top + 10, bottom_y - 10)
        d.ellipse([gx - 5, gy - 5, gx + 5, gy + 5], fill=(*accent, 160))
    straw_x = cx + top_w * 0.5
    d.line([(straw_x, top_y - h * 0.08), (straw_x - 10, bottom_y - 20)], fill=(*accent, 220), width=8)
    img = img.convert("RGB")
    img = add_grain(img, 6)
    d3 = ImageDraw.Draw(img)
    f1 = font(int(w * 0.06), bold=True)
    f2 = font(int(w * 0.03))
    d3.text((w * 0.06, h * 0.88), title, font=f1, fill=(255, 249, 240))
    d3.text((w * 0.06, h * 0.94), "Photo temporaire à remplacer", font=f2, fill=OCRE_LIGHT)
    img.save(path, quality=87)


def scene_extra(path, size, top, bottom, kind, title):
    w, h = size
    img = vertical_gradient(size, top, bottom).convert("RGBA")
    d = ImageDraw.Draw(img)
    if kind == "bar":
        d.rectangle([0, h * 0.6, w, h], fill=(*BRUN, 220))
        for i in range(5):
            x = w * (0.08 + i * 0.19)
            d.polygon([(x, h * 0.3), (x + w * 0.05, h * 0.3), (x + w * 0.03, h * 0.5), (x + w * 0.02, h * 0.5)], fill=(*OCRE, 200))
        for i in range(6):
            x = w * (0.05 + i * 0.16)
            d.ellipse([x, h * 0.62, x + w * 0.07, h * 0.7], fill=(*TERRACOTTA, 160))
    elif kind == "terrasse_soir":
        for i in range(25):
            x = random.uniform(0, w)
            y = random.uniform(0, h * 0.4)
            r = random.uniform(1, 3)
            d.ellipse([x - r, y - r, x + r, y + r], fill=(*OCRE_LIGHT, random.randint(90, 200)))
        for i in range(4):
            x = w * (0.12 + i * 0.24)
            d.ellipse([x, h * 0.55, x + w * 0.03, h * 0.6], fill=(*OCRE, 230))
            d.rectangle([x + w * 0.013, h * 0.6, x + w * 0.017, h * 0.72], fill=(*BRUN_LIGHT, 220))
    elif kind == "match":
        d.rectangle([w * 0.15, h * 0.25, w * 0.85, h * 0.65], outline=(*OCRE, 230), width=6)
        d.ellipse([w * 0.44, h * 0.4, w * 0.56, h * 0.5], fill=(*TERRACOTTA, 230))
        for i in range(4):
            x = w * (0.2 + i * 0.18)
            d.rounded_rectangle([x, h * 0.68, x + w * 0.08, h * 0.78], radius=6, fill=(*BRUN_LIGHT, 210))
    elif kind == "decouverte":
        cx, cy = w * 0.5, h * 0.45
        d.ellipse([cx - w * 0.28, cy - h * 0.2, cx + w * 0.28, cy + h * 0.2], fill=(255, 249, 240, 230))
        for i in range(3):
            angle = i / 3 * math.pi * 2
            fx = cx + math.cos(angle) * w * 0.1
            fy = cy + math.sin(angle) * h * 0.08
            d.ellipse([fx - 30, fy - 24, fx + 30, fy + 24], fill=(*random.choice([TERRACOTTA, OCRE]), 230))
    elif kind == "table_detail":
        d.rectangle([0, 0, w, h], fill=(*BRUN_LIGHT, 255))
        cell = 90
        for gy in range(0, h, cell):
            for gx in range(0, w, cell):
                if random.random() < 0.5:
                    d.rectangle([gx + 10, gy + 10, gx + cell - 10, gy + cell - 10], outline=(*OCRE, 200), width=3)
                else:
                    d.ellipse([gx + 16, gy + 16, gx + cell - 16, gy + cell - 16], outline=(*TERRACOTTA, 200), width=3)
        d.ellipse([w * 0.3, h * 0.3, w * 0.7, h * 0.7], fill=(255, 249, 240, 235))
    img = img.convert("RGB")
    img = add_grain(img, 6)
    d3 = ImageDraw.Draw(img)
    f1 = font(int(w * 0.045), bold=True)
    d3.text((w * 0.05, h * 0.92), title, font=f1, fill=(255, 249, 240) if kind != "table_detail" else BRUN)
    img.save(path, quality=87)


def menu_banner(path, size=(1920, 1000)):
    w, h = size
    img = vertical_gradient(size, (78, 44, 26), (22, 14, 11)).convert("RGBA")
    d = ImageDraw.Draw(img)
    plates = [
        (0.16, 0.55, 190, TERRACOTTA),
        (0.38, 0.32, 150, OCRE),
        (0.58, 0.62, 210, TERRACOTTA_DARK),
        (0.79, 0.4, 165, OLIVE),
        (0.93, 0.68, 130, OCRE_LIGHT),
    ]
    for px, py, r, accent in plates:
        cx, cy = w * px, h * py
        d.ellipse([cx - r, cy - r * 0.6, cx + r, cy + r * 0.6], fill=(255, 249, 240, 235))
        d.ellipse(
            [cx - r * 0.78, cy - r * 0.47, cx + r * 0.78, cy + r * 0.47],
            fill=(*accent, 90),
        )
        for _ in range(4):
            fx = cx + random.uniform(-r * 0.3, r * 0.3)
            fy = cy + random.uniform(-r * 0.18, r * 0.18)
            fr = random.uniform(r * 0.15, r * 0.26)
            tone = random.choice([TERRACOTTA, TERRACOTTA_DARK, OCRE, BRUN_LIGHT])
            d.ellipse([fx - fr, fy - fr * 0.75, fx + fr, fy + fr * 0.75], fill=(*tone, 235))
    img = img.filter(ImageFilter.GaussianBlur(0.8))
    img = img.convert("RGB")
    img = add_grain(img, 7)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay)
    for x in range(w):
        a = int(170 * (1 - x / (w * 0.6))) if x < w * 0.6 else 0
        d2.line([(x, 0), (x, h)], fill=(*BRUN, max(a, 0)))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d3 = ImageDraw.Draw(img)
    f = font(30)
    d3.text((w * 0.04, h * 0.93), "Photo temporaire — plats ivoiriens à table à remplacer", font=f, fill=(255, 249, 240))
    img.save(path, quality=88)


def avatar_bust(path, size, skin, shirt, name, role):
    w, h = size
    img = vertical_gradient(size, (90, 55, 34), (35, 22, 15)).convert("RGBA")
    d = ImageDraw.Draw(img)
    cx = w / 2
    d.ellipse([cx - w * 0.24, h * 0.56, cx + w * 0.24, h * 0.95], fill=(*shirt, 255))
    d.ellipse([cx - w * 0.16, h * 0.18, cx + w * 0.16, h * 0.54], fill=(*skin, 255))
    d.pieslice([cx - w * 0.18, h * 0.1, cx + w * 0.18, h * 0.46], 180, 360, fill=(*BRUN, 255))
    img = img.convert("RGB")
    img = add_grain(img, 6)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay)
    d2.rectangle([0, h * 0.8, w, h], fill=(*BRUN, 190))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d3 = ImageDraw.Draw(img)
    f1 = font(int(w * 0.09), bold=True)
    f2 = font(int(w * 0.05))
    d3.text((w * 0.08, h * 0.85), name, font=f1, fill=(255, 249, 240))
    d3.text((w * 0.08, h * 0.93), role, font=f2, fill=OCRE_LIGHT)
    img.save(path, quality=87)


if __name__ == "__main__":
    menu_banner(os.path.join(HERO_OUT, "menu-banniere.jpg"))

    for slug, name, cat in MENU_DISHES:
        accent = CATEGORY_ACCENT.get(cat, OCRE)
        plate_photo(
            os.path.join(PLATS_OUT, f"{slug}.jpg"), (1000, 900),
            (92, 55, 34), (28, 18, 13), name, "Photo temporaire à remplacer", accent=accent,
        )

    for slug, name, liquid, accent in DRINKS:
        drink_photo(os.path.join(BOISSONS_OUT, f"{slug}.jpg"), (900, 1100), liquid, accent, name)

    scene_extra(os.path.join(ESPACES_OUT, "espace-bar.jpg"), (1000, 1250), (70, 46, 30), (24, 16, 12), "bar", "Notre bar")
    scene_extra(os.path.join(ESPACES_OUT, "espace-terrasse-soir.jpg"), (1200, 900), (30, 25, 45), (10, 8, 14), "terrasse_soir", "Terrasse en soirée")
    scene_extra(os.path.join(EVENEMENTS_OUT, "evenement-match.jpg"), (1200, 900), (35, 45, 35), (14, 16, 12), "match", "Diffusion d'un match")
    scene_extra(os.path.join(EVENEMENTS_OUT, "evenement-decouverte.jpg"), (1200, 900), (85, 50, 30), (26, 17, 12), "decouverte", "Soirée découverte")
    scene_extra(os.path.join(DECORATION_OUT, "decoration-table.jpg"), (1000, 1000), (60, 40, 26), (60, 40, 26), "table_detail", "Détail d'une table")

    avatar_bust(os.path.join(EQUIPE_OUT, "equipe-1.jpg"), (900, 1100), (94, 58, 38), TERRACOTTA, "L'équipe en salle", "Photo à venir")
    avatar_bust(os.path.join(EQUIPE_OUT, "equipe-2.jpg"), (900, 1100), (110, 68, 44), OLIVE, "L'équipe en cuisine", "Photo à venir")
    avatar_bust(os.path.join(EQUIPE_OUT, "equipe-3.jpg"), (900, 1100), (80, 50, 32), OCRE, "L'accueil", "Photo à venir")

    print("Images menu/galerie générées dans", PLATS_OUT, BOISSONS_OUT, ESPACES_OUT, EVENEMENTS_OUT, DECORATION_OUT, EQUIPE_OUT)
