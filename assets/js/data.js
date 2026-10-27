/* ==========================================================
   SİTE VERİLERİ
   Yeni eser eklemek için ESERLER listesine yeni bir kayıt
   ekleyin. Görseli assets/img/eserler/ klasörüne koyup
   "gorseller" alanına yolunu yazın.
   ========================================================== */

const SITE = {
  ad: "Selim Sahaf",
  slogan: "Sahaf & Curiosity House",
  telefon: "+90 5XX XXX XX XX",
  whatsapp: "905XXXXXXXXX", // başında + olmadan, ülke koduyla
  eposta: "selimsahaf@gmail.com",
  adres: "Adres bilgisi buraya — İstanbul",
  calismaSaatleri: "Pazartesi – Cumartesi · 10:00 – 19:00",
  instagram: "https://www.instagram.com/selimsahaf",
};

const KATEGORILER = [
  {
    slug: "gravur",
    ad: "Gravür",
    aciklama: "16. yüzyıldan 19. yüzyıla Osmanlı ve Doğu konulu orijinal bakır ve çelik gravürler.",
  },
  {
    slug: "harita",
    ad: "Harita",
    aciklama: "Anadolu, İstanbul ve Akdeniz'e ait tarihî haritalar ve deniz haritaları.",
  },
  {
    slug: "tablo",
    ad: "Tablo",
    aciklama: "Oryantalist, akademik ve Türk resim sanatından seçkin yağlıboya ve suluboya eserler.",
  },
  {
    slug: "nadide-eserler",
    ad: "Nadide Eserler",
    aciklama: "İlk baskılar, imzalı nüshalar, yazmalar ve koleksiyon değeri taşıyan nadir kitaplar.",
  },
  {
    slug: "kutuphanemiz",
    ad: "Kütüphanemiz",
    aciklama: "Tarih, edebiyat, sanat ve İstanbul üzerine özenle seçilmiş sahaf kitapları.",
  },
  {
    slug: "efemera",
    ad: "Efemera",
    aciklama: "Kartpostallar, afişler, fotoğraflar, belgeler ve gündelik hayatın kâğıt hafızası.",
  },
  {
    slug: "figur",
    ad: "Figür",
    aciklama: "Viyana bronzları, porselen ve heykel figürler.",
  },
  {
    slug: "taki",
    ad: "Takı",
    aciklama: "Osmanlı ve Avrupa dönemi antika ve vintage mücevherler.",
  },
  {
    slug: "parfumeri",
    ad: "Parfümeri",
    aciklama: "Antika parfüm şişeleri, gülabdanlar ve vintage parfümeri objeleri.",
  },
];

/*
  Eser alanları:
  id          — benzersiz, URL'de kullanılır (türkçe karakter ve boşluk yok)
  kategori    — KATEGORILER içindeki slug
  baslik      — eser adı
  sanatci     — sanatçı / yazar / atölye (yoksa boş bırakın)
  donem       — örn. "c. 1890"
  teknik      — teknik / malzeme
  olcu        — ölçüler
  koken       — köken / provenans (isteğe bağlı)
  durum       — kondisyon notu (isteğe bağlı)
  fiyat       — sayı (TL) ya da null → "Fiyat için iletişime geçin"
  satildi     — true ise "Satıldı" görünür
  onecikan    — true ise anasayfada gösterilir
  aciklama    — uzun açıklama
  gorseller   — ["assets/img/eserler/dosya.jpg", ...] (boşsa zarif yer tutucu görünür)
*/
const ESERLER = [
  // --- Gravür ---
  {
    id: "konstantinopolis-panorama-gravur",
    kategori: "gravur",
    baslik: "Konstantinopolis Panoraması",
    sanatci: "Thomas Allom",
    donem: "c. 1838",
    teknik: "Çelik gravür, sonradan elle renklendirilmiş",
    olcu: "21 × 27 cm",
    koken: "Londra, Fisher & Son",
    fiyat: 4500,
    onecikan: true,
    aciklama: "Thomas Allom'un 'Constantinople and the Scenery of the Seven Churches of Asia Minor' adlı eserinden, Haliç'e bakan geniş bir İstanbul manzarası. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "turk-kahvehanesi-gravur",
    kategori: "gravur",
    baslik: "Bir Türk Kahvehanesi",
    sanatci: "Antoine-Ignace Melling",
    donem: "c. 1819",
    teknik: "Bakır gravür",
    olcu: "48 × 82 cm",
    fiyat: null,
    aciklama: "Melling'in 'Voyage pittoresque de Constantinople et des rives du Bosphore' albümünden. Örnek kayıttır.",
    gorseller: [],
  },

  // --- Harita ---
  {
    id: "natolia-haritasi",
    kategori: "harita",
    baslik: "Natoliae, quae olim Asia Minor",
    sanatci: "Abraham Ortelius",
    donem: "1570",
    teknik: "Bakır baskı, dönem renklendirmesi",
    olcu: "36 × 50 cm",
    fiyat: null,
    onecikan: true,
    aciklama: "Theatrum Orbis Terrarum atlasından Anadolu haritası. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "istanbul-plani",
    kategori: "harita",
    baslik: "Plan de Constantinople",
    sanatci: "Kauffer & Lechevalier",
    donem: "1786",
    teknik: "Bakır baskı",
    olcu: "44 × 60 cm",
    fiyat: 18500,
    aciklama: "Tarihî yarımada, Galata ve Boğaz girişini gösteren ayrıntılı şehir planı. Örnek kayıttır.",
    gorseller: [],
  },

  // --- Tablo ---
  {
    id: "bogazda-sandal-yagliboya",
    kategori: "tablo",
    baslik: "Boğaz'da Sandal",
    sanatci: "Anonim, Oryantalist okul",
    donem: "19. yüzyıl sonu",
    teknik: "Tuval üzerine yağlıboya",
    olcu: "46 × 61 cm",
    fiyat: null,
    onecikan: true,
    aciklama: "Rumeli kıyısında bir sandal ve yalılar. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "naturmort-suluboya",
    kategori: "tablo",
    baslik: "Natürmort, Çiçekler",
    sanatci: "İmzalı",
    donem: "c. 1930",
    teknik: "Kâğıt üzerine suluboya",
    olcu: "32 × 24 cm",
    fiyat: 12000,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },

  // --- Nadide Eserler ---
  {
    id: "divan-ilk-baski",
    kategori: "nadide-eserler",
    baslik: "Divan — İlk Baskı",
    sanatci: "Matbaa-i Âmire",
    donem: "H. 1290 / M. 1873",
    teknik: "Taş baskı, deri cilt",
    olcu: "24 × 16 cm",
    durum: "Cilt aşınmış, iç sayfalar temiz",
    fiyat: null,
    onecikan: true,
    aciklama: "Osmanlıca, dönem cildinde ilk baskı. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "imzali-ilk-baski-roman",
    kategori: "nadide-eserler",
    baslik: "İmzalı İlk Baskı Roman",
    sanatci: "Yazar adı",
    donem: "1944",
    teknik: "Karton kapak",
    olcu: "20 × 14 cm",
    fiyat: 9500,
    aciklama: "Yazarın ithaf ve imzasını taşıyan ilk baskı. Örnek kayıttır.",
    gorseller: [],
  },

  // --- Kütüphanemiz ---
  {
    id: "istanbul-semtleri",
    kategori: "kutuphanemiz",
    baslik: "İstanbul Semtleri",
    sanatci: "Yazar adı",
    donem: "1958",
    teknik: "Karton kapak",
    olcu: "19 × 13 cm",
    fiyat: 650,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "osmanli-tarihi-takim",
    kategori: "kutuphanemiz",
    baslik: "Osmanlı Tarihi (4 Cilt Takım)",
    sanatci: "Yazar adı",
    donem: "1947",
    teknik: "Bez cilt",
    olcu: "24 × 17 cm",
    fiyat: 3200,
    aciklama: "Takım halinde, iyi durumda. Örnek kayıttır.",
    gorseller: [],
  },

  // --- Efemera ---
  {
    id: "pera-kartpostal-seti",
    kategori: "efemera",
    baslik: "Pera Kartpostalları (12 adet)",
    sanatci: "Max Fruchtermann",
    donem: "c. 1900",
    teknik: "Kromolitografi kartpostal",
    olcu: "9 × 14 cm",
    fiyat: 2800,
    onecikan: true,
    aciklama: "Beyoğlu, Galata ve Tünel'e ait dönem kartpostalları. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "vapur-afisi",
    kategori: "efemera",
    baslik: "Şirket-i Hayriye Tarifesi",
    sanatci: "",
    donem: "c. 1925",
    teknik: "Litografi baskı",
    olcu: "35 × 50 cm",
    fiyat: null,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },

  // --- Figür ---
  {
    id: "viyana-bronzu-genc",
    kategori: "figur",
    baslik: "Oryantalist Soğuk Boyalı Viyana Bronzu",
    sanatci: "Bergmann Dökümhanesi",
    donem: "c. 1900",
    teknik: "Soğuk boyalı bronz",
    olcu: "Y. 14 cm",
    koken: "Viyana",
    fiyat: null,
    onecikan: true,
    aciklama: "Halı üzerinde oturan genç figürü; Bergmann dökümhanesi damgalı. Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "porselen-figur",
    kategori: "figur",
    baslik: "Porselen Dansçı Figürü",
    sanatci: "Rosenthal",
    donem: "c. 1925",
    teknik: "Sırlı porselen",
    olcu: "Y. 22 cm",
    fiyat: 7800,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },

  // --- Takı ---
  {
    id: "osmanli-gumus-kemer-tokasi",
    kategori: "taki",
    baslik: "Osmanlı Gümüş Kemer Tokası",
    sanatci: "",
    donem: "19. yüzyıl",
    teknik: "Gümüş, telkâri",
    olcu: "12 × 7 cm",
    fiyat: 8500,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "art-deco-bros",
    kategori: "taki",
    baslik: "Art Deco Broş",
    sanatci: "",
    donem: "c. 1930",
    teknik: "Platin, elmas",
    olcu: "4,5 cm",
    fiyat: null,
    onecikan: true,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },

  // --- Parfümeri ---
  {
    id: "lalique-parfum-sisesi",
    kategori: "parfumeri",
    baslik: "Kristal Parfüm Şişesi",
    sanatci: "René Lalique stilinde",
    donem: "c. 1925",
    teknik: "Kalıp cam",
    olcu: "Y. 11 cm",
    fiyat: 5400,
    aciklama: "Örnek kayıttır.",
    gorseller: [],
  },
  {
    id: "gumus-gulabdan",
    kategori: "parfumeri",
    baslik: "Gümüş Gülabdan",
    sanatci: "",
    donem: "19. yüzyıl",
    teknik: "Gümüş, kakma",
    olcu: "Y. 24 cm",
    fiyat: null,
    satildi: true,
    aciklama: "Osmanlı dönemi gümüş gülsuyu serpme kabı. Örnek kayıttır.",
    gorseller: [],
  },
];
