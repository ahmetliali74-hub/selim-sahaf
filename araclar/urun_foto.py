"""
Selim Sahaf — ürün fotoğrafı hazırlama aracı

Ürün fotoğrafını site için stüdyo görünümüne getirir:
  obje  → arka planı kaldırır, ürünü gölgesiyle stüdyo zeminine oturtur
          (figür, takı, parfüm şişesi vb.)
  duz   → arka planı kaldırmaz, eseri duvara asılmış gibi gölgeyle yerleştirir
          (gravür, harita, tablo, belge vb.)

Kullanım:
  ~/.selim-sahaf/venv/bin/python araclar/urun_foto.py FOTO [FOTO ...] --ad eser-adi [--mod obje|duz] [--doldur]

  --doldur: çerçeveli eserlerde camın arkasındaki koyu fonun silinmesini önler

Çıktılar assets/img/eserler/ klasörüne eser-adi-1.jpg, eser-adi-2.jpg ... olarak yazılır.
"""

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

PROJE = Path(__file__).resolve().parent.parent
CIKTI = PROJE / "assets" / "img" / "eserler"

BOYUT = 1600            # kare çıktı, px
MODEL = "isnet-general-use"

# Stüdyo zemini: sıcak, kırık beyaz
ISIK = (251, 250, 246)  # ortadaki ışık
KENAR = (233, 228, 219) # köşeler
ZEMIN = (238, 233, 224) # zemin (duvarın altı)


def stüdyo_zemini(zeminli: bool) -> Image.Image:
    """Ortası aydınlık, kenarlara doğru yumuşakça kararan stüdyo arka planı."""
    k = 64  # küçük çizip büyütmek hem hızlı hem pürüzsüz
    zemin = Image.new("RGB", (k, k))
    px = zemin.load()
    for y in range(k):
        for x in range(k):
            dx, dy = (x - k * 0.5) / k, (y - k * 0.42) / k
            t = min(1.0, (dx * dx * 1.6 + dy * dy * 1.3) ** 0.5 * 1.35)
            renk = [ISIK[i] + (KENAR[i] - ISIK[i]) * t for i in range(3)]
            if zeminli and y > k * 0.78:
                # duvar ile zemin arasında belli belirsiz bir geçiş
                u = min(1.0, (y - k * 0.78) / (k * 0.22))
                renk = [renk[i] + (ZEMIN[i] - renk[i]) * u * 0.6 for i in range(3)]
            px[x, y] = tuple(int(c) for c in renk)
    return zemin.resize((BOYUT, BOYUT), Image.BICUBIC).filter(ImageFilter.GaussianBlur(BOYUT / 80))


def gölge_ekle(tuval: Image.Image, maske: Image.Image, konum, yogunluk: float, bulanik: float, ezme: float = 1.0, kayma=(0, 0)):
    """Maskeden yumuşak bir gölge üretip tuvalin üstüne çarpar."""
    w, h = maske.size
    m = maske if ezme == 1.0 else maske.resize((w, max(1, int(h * ezme))))
    katman = Image.new("L", tuval.size, 0)
    x, y = konum
    katman.paste(m, (x + kayma[0], y + kayma[1]))
    katman = katman.filter(ImageFilter.GaussianBlur(bulanik)).point(lambda v: int(v * yogunluk))
    karanlik = Image.new("RGB", tuval.size, (60, 50, 40))
    return Image.composite(karanlik, tuval, katman)


def ic_bosluklar(alfa: Image.Image) -> Image.Image:
    """Ürünün içinde kalan, dışarıyla bağlantısı olmayan boşlukların maskesi
    (ör. çerçevenin içindeki koyu fon)."""
    k = 4  # hız için küçültülmüş maske üzerinde çalış
    kucuk = alfa.resize((alfa.width // k, alfa.height // k)).point(lambda v: 255 if v > 40 else 0)
    cerceveli = Image.new("L", (kucuk.width + 2, kucuk.height + 2), 0)
    cerceveli.paste(kucuk, (1, 1))
    ImageDraw.floodfill(cerceveli, (0, 0), 128)  # dışarıdan ulaşılabilen arka plan
    delikler = cerceveli.crop((1, 1, kucuk.width + 1, kucuk.height + 1)).point(lambda v: 255 if v == 0 else 0)
    return delikler.resize(alfa.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(1.5))


def obje_hazirla(foto: Image.Image, oturum, doldur: bool = False) -> Image.Image:
    from rembg import remove

    kesik = remove(foto, session=oturum, post_process_mask=True)
    if doldur:
        alfa = ImageChops.lighter(kesik.getchannel("A"), ic_bosluklar(kesik.getchannel("A")))
        kesik = foto.convert("RGB").convert("RGBA")
        kesik.putalpha(alfa)
    kutu = kesik.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    if not kutu:
        sys.exit("Fotoğrafta ürün bulunamadı.")
    kesik = kesik.crop(kutu)

    # Ürünü sığdır: genişliğin %72'si, yüksekliğin %74'ü
    olcek = min(BOYUT * 0.72 / kesik.width, BOYUT * 0.74 / kesik.height)
    kesik = kesik.resize((max(1, int(kesik.width * olcek)), max(1, int(kesik.height * olcek))), Image.LANCZOS)
    w, h = kesik.size
    x = (BOYUT - w) // 2
    taban = int(BOYUT * 0.86)  # ürünün oturduğu zemin çizgisi
    y = taban - h

    tuval = stüdyo_zemini(zeminli=True)
    alfa = kesik.getchannel("A")

    # 1) Zemine düşen geniş, yumuşak gölge
    ezme = 0.10
    gh = max(1, int(h * ezme))
    tuval = gölge_ekle(tuval, alfa, (x, taban - gh // 2), yogunluk=0.22, bulanik=BOYUT / 45, ezme=ezme)

    # 2) Ürünün değdiği yerde koyu, dar temas gölgesi
    temas = Image.new("L", (w, max(1, int(w * 0.07))), 0)
    ImageDraw.Draw(temas).ellipse([w * 0.08, 0, w * 0.92, temas.height], fill=255)
    tuval = gölge_ekle(tuval, temas, (x, taban - temas.height // 2), yogunluk=0.30, bulanik=BOYUT / 160)

    tuval.paste(kesik, (x, y), kesik)
    return tuval


def kenar_kirp(foto: Image.Image, esik: int = 28) -> Image.Image:
    """Fotoğrafın etrafındaki düz renkli boşluğu (duvar, fon) kırpar; köşe rengini fon kabul eder."""
    k = 8
    kose = [foto.getpixel(p) for p in ((k, k), (foto.width - k, k), (k, foto.height - k), (foto.width - k, foto.height - k))]
    fon = tuple(sorted(c[i] for c in kose)[1] for i in range(3))
    fark = ImageChops.difference(foto, Image.new("RGB", foto.size, fon)).convert("L")
    kutu = fark.point(lambda v: 255 if v > esik else 0).filter(ImageFilter.MedianFilter(5)).getbbox()
    if not kutu or (kutu[2] - kutu[0]) * (kutu[3] - kutu[1]) < foto.width * foto.height * 0.3:
        return foto  # güvenli değilse dokunma
    return foto.crop(kutu)


def duz_hazirla(foto: Image.Image) -> Image.Image:
    foto = kenar_kirp(foto.convert("RGB"))
    olcek = min(BOYUT * 0.80 / foto.width, BOYUT * 0.80 / foto.height)
    foto = foto.resize((int(foto.width * olcek), int(foto.height * olcek)), Image.LANCZOS)
    w, h = foto.size
    x, y = (BOYUT - w) // 2, (BOYUT - h) // 2 - int(BOYUT * 0.01)

    tuval = stüdyo_zemini(zeminli=False)
    kutu = Image.new("L", (w, h), 255)
    # Duvara asılı gibi: aşağı doğru yumuşak gölge
    tuval = gölge_ekle(tuval, kutu, (x, y), yogunluk=0.28, bulanik=BOYUT / 70, kayma=(0, int(BOYUT * 0.012)))
    tuval.paste(foto, (x, y))
    return tuval


def main():
    p = argparse.ArgumentParser(description="Ürün fotoğrafını site için hazırlar.")
    p.add_argument("fotolar", nargs="+", type=Path)
    p.add_argument("--ad", required=True, help="dosya adı, ör. viyana-bronzu-genc")
    p.add_argument("--mod", choices=["obje", "duz"], default="obje")
    p.add_argument("--doldur", action="store_true", help="ürünün içindeki kapalı boşlukları koru (çerçeveli eserler için)")
    p.add_argument("--cikti", type=Path, default=CIKTI)
    a = p.parse_args()

    a.cikti.mkdir(parents=True, exist_ok=True)
    oturum = None
    if a.mod == "obje":
        from rembg import new_session

        oturum = new_session(MODEL)

    for i, yol in enumerate(a.fotolar, 1):
        foto = ImageOps.exif_transpose(Image.open(yol))
        sonuc = obje_hazirla(foto.convert("RGBA"), oturum, a.doldur) if a.mod == "obje" else duz_hazirla(foto)
        hedef = a.cikti / f"{a.ad}-{i}.jpg"
        sonuc.convert("RGB").save(hedef, "JPEG", quality=86, optimize=True, progressive=True)
        print(f"assets/img/eserler/{hedef.name}" if a.cikti == CIKTI else hedef)


if __name__ == "__main__":
    main()
