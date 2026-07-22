from PIL import Image
import os

# ==========================
# 設定
# ==========================

SRC = "images/pages"
OUT = "images/spreads"

os.makedirs(OUT, exist_ok=True)

pairs = [
    ("01.jpg", "02.jpg"),
    ("03.jpg", "04.jpg"),
    ("05.jpg", "06.jpg"),
    ("07.jpg", "08.jpg"),
    ("09.jpg", "10.jpg"),
]

CENTER_GAP = 6
OUTER_CROP = 20

# ==========================
# 白余白を自動カット
# ==========================

def trim_white(img, threshold=245):
    img = img.convert("RGB")
    px = img.load()
    w, h = img.size

    left = 0
    while left < w:
        if any(px[left, y][0] < threshold or
               px[left, y][1] < threshold or
               px[left, y][2] < threshold for y in range(h)):
            break
        left += 1

    right = w - 1
    while right >= 0:
        if any(px[right, y][0] < threshold or
               px[right, y][1] < threshold or
               px[right, y][2] < threshold for y in range(h)):
            break
        right -= 1

    top = 0
    while top < h:
        if any(px[x, top][0] < threshold or
               px[x, top][1] < threshold or
               px[x, top][2] < threshold for x in range(w)):
            break
        top += 1

    bottom = h - 1
    while bottom >= 0:
        if any(px[x, bottom][0] < threshold or
               px[x, bottom][1] < threshold or
               px[x, bottom][2] < threshold for x in range(w)):
            break
        bottom -= 1

    return img.crop((left, top, right + 1, bottom + 1))

# ==========================
# 全画像読み込み
# ==========================

pages = []

max_w = 0
max_h = 0

for left_name, right_name in pairs:

    for name in (left_name, right_name):

        img = Image.open(os.path.join(SRC, name)).convert("RGB")

        img = trim_white(img)

        pages.append((name, img))

        max_w = max(max_w, img.width)
        max_h = max(max_h, img.height)

print(f"Canvas Size = {max_w} x {max_h}")

# ==========================
# キャンバスへ中央配置
# ==========================

normalized = {}

for name, img in pages:

    canvas = Image.new(
        "RGB",
        (max_w, max_h),
        "white"
    )

    x = (max_w - img.width) // 2
    y = (max_h - img.height) // 2

    canvas.paste(img, (x, y))

    normalized[name] = canvas

# ==========================
# 見開き生成
# ==========================

for i, (left_name, right_name) in enumerate(pairs, start=1):

    left = normalized[left_name]
    right = normalized[right_name]

    left = left.crop((
        OUTER_CROP,
        0,
        max_w,
        max_h
    ))

    right = right.crop((
        0,
        0,
        max_w - OUTER_CROP,
        max_h
    ))

    spread_w = left.width + right.width + CENTER_GAP

    spread = Image.new(
        "RGB",
        (spread_w, max_h),
        "white"
    )

    spread.paste(left, (0, 0))
    spread.paste(right, (left.width + CENTER_GAP, 0))

    filename = f"spread{i:02}.jpg"

    spread.save(
        os.path.join(OUT, filename),
        quality=95,
        optimize=True
    )

    print("Saved:", filename)

print("\nFinished!")