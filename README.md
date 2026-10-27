# Selim Sahaf — Web Sitesi

Sunucu, veritabanı ya da derleme gerektirmeyen statik bir site. Dosyaları herhangi bir hostinge yüklemek yeterli.

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Anasayfa (vitrin, kategoriler, öne çıkanlar) |
| `kategori.html?k=gravur` | Kategori sayfası |
| `tum-eserler.html` | Tüm eserler |
| `eser.html?id=...` | Eser detayı (WhatsApp / e-posta ile soru butonları) |
| `hakkimizda.html`, `iletisim.html` | Kurumsal sayfalar |

## İletişim bilgilerini değiştirme

`assets/js/data.js` dosyasının en üstündeki `SITE` bölümünü düzenleyin (telefon, WhatsApp, e-posta, adres, Instagram).

## Yeni eser ekleme

1. Fotoğrafları `assets/img/eserler/` klasörüne koyun (ör. `allom-istanbul-1.jpg`).
2. `assets/js/data.js` içindeki `ESERLER` listesine bir kayıt ekleyin:

```js
{
  id: "allom-istanbul",              // benzersiz, Türkçe karakter ve boşluk yok
  kategori: "gravur",                // gravur, harita, tablo, nadide-eserler, kutuphanemiz, efemera, figur, taki, parfumeri
  baslik: "Konstantinopolis Panoraması",
  sanatci: "Thomas Allom",
  donem: "c. 1838",
  teknik: "Çelik gravür",
  olcu: "21 × 27 cm",
  fiyat: 4500,                       // ya da null → "Fiyat için iletişime geçin"
  onecikan: true,                    // anasayfada gösterilsin mi
  aciklama: "...",
  gorseller: ["assets/img/eserler/allom-istanbul-1.jpg", "assets/img/eserler/allom-istanbul-2.jpg"],
},
```

Satılan bir eser için `satildi: true` ekleyin. Şu an listede bulunan eserler **örnektir**, gerçek eserlerle değiştirilmelidir.

## Yerelde açma

```bash
python3 -m http.server 4173
```

Ardından tarayıcıda `http://localhost:4173` adresini açın.

## Ürün fotoğrafı hazırlama

`araclar/urun_foto.py` fotoğrafı site için stüdyo görünümüne getirir ve `assets/img/eserler/` klasörüne yazar.

- `--mod obje` (varsayılan): arka planı kaldırır, ürünü gölgesiyle stüdyo zeminine oturtur. Figür, takı, parfüm şişesi için.
- `--mod duz`: arka planı korur, eseri duvara asılı gibi gölgeyle yerleştirir. Gravür, harita, tablo için.

```bash
~/.selim-sahaf/venv/bin/python araclar/urun_foto.py ~/Downloads/foto1.jpg ~/Downloads/foto2.jpg --ad viyana-bronzu-genc
```

Ortam `~/.selim-sahaf/venv` içinde kurulu (Python 3.12, rembg, Pillow, pillow-heif). Yapay zekâ modeli `~/.rembg/models/` altında.
