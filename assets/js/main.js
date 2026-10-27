/* ==========================================================
   Selim Sahaf — ortak bileşenler ve sayfa oluşturucular
   ========================================================== */

const $ = (sel, root = document) => root.querySelector(sel);

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const kategoriBul = (slug) => KATEGORILER.find((k) => k.slug === slug);
const eserBul = (id) => ESERLER.find((e) => e.id === id);
const kategoriEserleri = (slug) => ESERLER.filter((e) => e.kategori === slug);

const fiyatYaz = (eser) => {
  if (eser.satildi) return "Satıldı";
  if (eser.fiyat == null) return "Fiyat için iletişime geçin";
  return new Intl.NumberFormat("tr-TR").format(eser.fiyat) + " ₺";
};

const waLink = (metin) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(metin)}`;

/* Görsel ya da zarif yer tutucu */
function gorsel(eser, kategori, index = 0) {
  const src = eser && eser.gorseller && eser.gorseller[index];
  if (src) {
    return `<div class="ph"><img src="${esc(src)}" alt="${esc(eser.baslik)}" loading="lazy"></div>`;
  }
  const k = kategori || kategoriBul(eser.kategori);
  const etiket = eser ? eser.baslik : k.ad;
  const alt = eser ? k.ad : "Koleksiyon";
  return `
    <div class="ph ph-bos">
      <div class="ph-art">
        <div class="ph-frame"></div>
        <div class="ph-label">${esc(etiket)}<small>${esc(alt)}</small></div>
      </div>
    </div>`;
}

function eserKarti(eser) {
  const k = kategoriBul(eser.kategori);
  const fiyatSinif = eser.fiyat == null && !eser.satildi ? "price ask" : "price";
  return `
    <a class="item-card" href="eser.html?id=${encodeURIComponent(eser.id)}">
      <div class="ph-wrap">${gorsel(eser, k)}</div>
      <div class="item-meta">
        <span class="eyebrow">${esc(k.ad)}${eser.donem ? " · " + esc(eser.donem) : ""}</span>
        <h3>${esc(eser.baslik)}</h3>
        ${eser.sanatci ? `<div class="artist">${esc(eser.sanatci)}</div>` : ""}
        <div class="${fiyatSinif}">${eser.satildi ? '<span class="badge">Satıldı</span>' : esc(fiyatYaz(eser))}</div>
      </div>
    </a>`;
}

function kategoriKarti(k) {
  const n = kategoriEserleri(k.slug).length;
  return `
    <a class="cat-card" href="kategori.html?k=${k.slug}">
      <div class="ph-wrap">${gorsel(null, k)}</div>
      <div class="cat-card-body">
        <h3>${esc(k.ad)}</h3>
        <span class="count">${n} eser</span>
      </div>
      <p>${esc(k.aciklama)}</p>
    </a>`;
}

/* ---------- Başlık ve alt bilgi ---------- */

function baslikOlustur(aktif) {
  const navLinks = KATEGORILER.map(
    (k) => `<li><a href="kategori.html?k=${k.slug}" class="${aktif === k.slug ? "active" : ""}">${esc(k.ad)}</a></li>`
  ).join("");

  return `
    <div class="topbar">Nadir kitap, gravür, harita ve antika eserlerde güvenilir adres · Türkiye geneline sigortalı gönderim</div>
    <header class="site-header">
      <div class="wrap header-inner">
        <div class="header-left">
          <button class="menu-toggle" aria-label="Menüyü aç" id="menuOpen"><span></span><span></span><span></span></button>
          <a href="hakkimizda.html" class="hide-m">Hakkımızda</a>
          <a href="iletisim.html#satis" class="hide-m">Eserinizi Satın</a>
        </div>
        <a href="index.html" class="logo" aria-label="${esc(SITE.ad)} anasayfa">
          <img src="assets/img/logo/logo.png" alt="${esc(SITE.ad)} — ${esc(SITE.slogan)}">
        </a>
        <div class="header-right">
          <a href="tum-eserler.html" class="hide-m">Tüm Eserler</a>
          <a href="iletisim.html">İletişim</a>
        </div>
      </div>
      <nav class="main-nav" aria-label="Kategoriler">
        <ul class="wrap">${navLinks}</ul>
      </nav>
    </header>
    <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
      <div class="mobile-menu-head">
        <a href="index.html" class="logo">
          <img src="assets/img/logo/logo.png" alt="${esc(SITE.ad)}" style="height:40px;margin:0">
        </a>
        <button class="mobile-menu-close" id="menuClose" aria-label="Menüyü kapat">×</button>
      </div>
      <ul>
        ${KATEGORILER.map((k) => `<li><a href="kategori.html?k=${k.slug}">${esc(k.ad)}</a></li>`).join("")}
      </ul>
      <ul class="mobile-secondary" style="margin-top:28px">
        <li><a href="tum-eserler.html">Tüm Eserler</a></li>
        <li><a href="hakkimizda.html">Hakkımızda</a></li>
        <li><a href="iletisim.html#satis">Eserinizi Satın</a></li>
        <li><a href="iletisim.html">İletişim</a></li>
      </ul>
    </div>`;
}

function altBilgiOlustur() {
  const yil = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo">
              <img src="assets/img/logo/logo-acik.png" alt="${esc(SITE.ad)}">
            </a>
            <p>Nadir kitaplardan gravürlere, haritalardan antika objelere; her eseri özenle inceleyip belgeleyerek koleksiyonerlerle buluşturuyoruz.</p>
          </div>
          <div>
            <h4>Koleksiyon</h4>
            <ul>${KATEGORILER.slice(0, 5).map((k) => `<li><a href="kategori.html?k=${k.slug}">${esc(k.ad)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>&nbsp;</h4>
            <ul>${KATEGORILER.slice(5).map((k) => `<li><a href="kategori.html?k=${k.slug}">${esc(k.ad)}</a></li>`).join("")}
              <li><a href="tum-eserler.html">Tüm Eserler</a></li>
            </ul>
          </div>
          <div>
            <h4>İletişim</h4>
            <ul>
              <li><a href="tel:${esc(SITE.telefon.replace(/\s/g, ""))}">${esc(SITE.telefon)}</a></li>
              <li><a href="mailto:${esc(SITE.eposta)}">${esc(SITE.eposta)}</a></li>
              <li>${esc(SITE.adres)}</li>
              <li><a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${yil} ${esc(SITE.ad)}. Tüm hakları saklıdır.</span>
          <span><a href="hakkimizda.html">Hakkımızda</a> · <a href="iletisim.html">İletişim</a></span>
        </div>
      </div>
    </footer>
    <a class="wa-float" href="${waLink("Merhaba, Selim Sahaf web sitesinden ulaşıyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43zm8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.33 11.33 0 0 0 5.77 1.47h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03z"/></svg>
    </a>`;
}

function iskeletOlustur(aktif) {
  $("#site-header").innerHTML = baslikOlustur(aktif);
  $("#site-footer").innerHTML = altBilgiOlustur();

  const menu = $("#mobileMenu");
  $("#menuOpen").addEventListener("click", () => {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
  $("#menuClose").addEventListener("click", () => {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
}

/* ---------- Sayfalar ---------- */

function anasayfa() {
  iskeletOlustur();

  const vitrin = eserBul("viyana-bronzu-genc") || ESERLER[0];
  $("#hero-visual").innerHTML = `
    <a href="eser.html?id=${encodeURIComponent(vitrin.id)}">
      ${gorsel(vitrin)}
      <div class="hero-caption">Haftanın Eseri<strong>${esc(vitrin.baslik)}</strong></div>
    </a>`;

  $("#kategori-grid").innerHTML = KATEGORILER.map(kategoriKarti).join("");

  const onecikanlar = ESERLER.filter((e) => e.onecikan && !e.satildi).slice(0, 8);
  $("#onecikan-grid").innerHTML = onecikanlar.map(eserKarti).join("");
}

function siralaVeGoster(liste, hedef, siralama) {
  const kopya = [...liste];
  if (siralama === "fiyat-artan") kopya.sort((a, b) => (a.fiyat ?? Infinity) - (b.fiyat ?? Infinity));
  if (siralama === "fiyat-azalan") kopya.sort((a, b) => (b.fiyat ?? -Infinity) - (a.fiyat ?? -Infinity));
  if (siralama === "ad") kopya.sort((a, b) => a.baslik.localeCompare(b.baslik, "tr"));
  // satılanlar her zaman sonda
  kopya.sort((a, b) => (a.satildi ? 1 : 0) - (b.satildi ? 1 : 0));

  hedef.innerHTML = kopya.length
    ? kopya.map(eserKarti).join("")
    : `<div class="empty" style="grid-column:1/-1">
         <h3>Yakında yeni eserler</h3>
         <p>Bu kategorideki eserler hazırlanıyor. Aradığınız özel bir parça için bize yazın.</p>
         <a class="btn btn-outline" href="iletisim.html">İletişime Geçin</a>
       </div>`;
}

function kategoriPills(aktif) {
  return (
    `<a href="tum-eserler.html" class="${aktif ? "" : "active"}">Tümü</a>` +
    KATEGORILER.map((k) => `<a href="kategori.html?k=${k.slug}" class="${aktif === k.slug ? "active" : ""}">${esc(k.ad)}</a>`).join("")
  );
}

function kategoriSayfasi() {
  const slug = new URLSearchParams(location.search).get("k");
  const k = kategoriBul(slug) || KATEGORILER[0];
  iskeletOlustur(k.slug);

  document.title = `${k.ad} — ${SITE.ad}`;
  $("#kat-baslik").textContent = k.ad;
  $("#kat-crumb").textContent = k.ad;
  $("#kat-aciklama").textContent = k.aciklama;
  $("#kat-pills").innerHTML = kategoriPills(k.slug);

  const liste = kategoriEserleri(k.slug);
  $("#kat-sayi").textContent = `${liste.length} eser`;
  const grid = $("#eser-grid");
  const sec = $("#siralama");
  siralaVeGoster(liste, grid, sec.value);
  sec.addEventListener("change", () => siralaVeGoster(liste, grid, sec.value));
}

function tumEserlerSayfasi() {
  iskeletOlustur();
  $("#kat-pills").innerHTML = kategoriPills(null);
  $("#kat-sayi").textContent = `${ESERLER.length} eser`;
  const grid = $("#eser-grid");
  const sec = $("#siralama");
  siralaVeGoster(ESERLER, grid, sec.value);
  sec.addEventListener("change", () => siralaVeGoster(ESERLER, grid, sec.value));
}

function eserSayfasi() {
  const id = new URLSearchParams(location.search).get("id");
  const eser = eserBul(id);

  if (!eser) {
    iskeletOlustur();
    $("#eser-detay").innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        <h3>Eser bulunamadı</h3>
        <p>Aradığınız eser satılmış ya da kaldırılmış olabilir.</p>
        <a class="btn btn-outline" href="tum-eserler.html">Tüm Eserlere Dön</a>
      </div>`;
    return;
  }

  const k = kategoriBul(eser.kategori);
  iskeletOlustur(k.slug);
  document.title = `${eser.baslik} — ${SITE.ad}`;

  $("#eser-crumb").innerHTML = `
    <a href="index.html">Anasayfa</a><span>/</span>
    <a href="kategori.html?k=${k.slug}">${esc(k.ad)}</a><span>/</span>
    ${esc(eser.baslik)}`;

  const ozellikler = [
    ["Sanatçı / Yapımcı", eser.sanatci],
    ["Dönem", eser.donem],
    ["Teknik", eser.teknik],
    ["Ölçüler", eser.olcu],
    ["Köken", eser.koken],
    ["Kondisyon", eser.durum],
    ["Kategori", k.ad],
    ["Referans No", eser.id.toUpperCase().slice(0, 18)],
  ].filter(([, v]) => v);

  const sayfaUrl = location.href;
  const soruMetni = `Merhaba, "${eser.baslik}" adlı eser hakkında bilgi almak istiyorum.\n${sayfaUrl}`;
  const mailLink = `mailto:${SITE.eposta}?subject=${encodeURIComponent("Eser hakkında: " + eser.baslik)}&body=${encodeURIComponent(soruMetni)}`;

  const gorselSayisi = Math.max(1, eser.gorseller?.length || 0);
  const thumbs =
    gorselSayisi > 1
      ? `<div class="thumbs">${eser.gorseller
          .map((_, i) => `<button class="${i === 0 ? "active" : ""}" data-i="${i}" aria-label="Görsel ${i + 1}">${gorsel(eser, k, i)}</button>`)
          .join("")}</div>`
      : "";

  $("#eser-detay").innerHTML = `
    <div class="detail-gallery">
      <div class="main" id="ana-gorsel">${gorsel(eser, k, 0)}</div>
      ${thumbs}
    </div>
    <div class="detail-info">
      <span class="eyebrow">${esc(k.ad)}${eser.donem ? " · " + esc(eser.donem) : ""}</span>
      <h1>${esc(eser.baslik)}</h1>
      ${eser.sanatci ? `<div class="artist">${esc(eser.sanatci)}</div>` : ""}

      <div class="detail-price">
        <div class="value">${esc(fiyatYaz(eser))}</div>
        <div class="note">${
          eser.satildi
            ? "Benzer eserler için bizimle iletişime geçebilirsiniz."
            : "Sigortalı gönderim · Orijinallik belgesi ile teslim"
        }</div>
      </div>

      <div class="detail-actions">
        <a class="btn" href="${waLink(soruMetni)}" target="_blank" rel="noopener">WhatsApp ile Sorun</a>
        <a class="btn btn-outline" href="${mailLink}">E-posta ile Bilgi Alın</a>
      </div>

      <dl class="specs">
        ${ozellikler.map(([e, v]) => `<div><dt>${esc(e)}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>

      ${eser.aciklama ? `<div class="detail-desc"><h2>Eser Hakkında</h2><p>${esc(eser.aciklama)}</p></div>` : ""}

      <div class="assurances">
        <div><strong>Orijinallik Garantisi</strong>Her eser uzman incelemesinden geçer.</div>
        <div><strong>Güvenli Gönderim</strong>Özel ambalaj ve sigortalı kargo.</div>
      </div>
    </div>`;

  $("#eser-detay").querySelectorAll(".thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      $("#ana-gorsel").innerHTML = gorsel(eser, k, Number(btn.dataset.i));
      $("#eser-detay").querySelectorAll(".thumbs button").forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  const benzerler = kategoriEserleri(k.slug).filter((e) => e.id !== eser.id).slice(0, 4);
  if (benzerler.length) {
    $("#benzer").hidden = false;
    $("#benzer-link").href = `kategori.html?k=${k.slug}`;
    $("#benzer-grid").innerHTML = benzerler.map(eserKarti).join("");
  }
}

function iletisimSayfasi() {
  iskeletOlustur();
  $("#iletisim-listesi").innerHTML = `
    <li><span class="eyebrow">Telefon</span><a href="tel:${esc(SITE.telefon.replace(/\s/g, ""))}">${esc(SITE.telefon)}</a></li>
    <li><span class="eyebrow">WhatsApp</span><a href="${waLink("Merhaba,")}" target="_blank" rel="noopener">Mesaj gönderin</a></li>
    <li><span class="eyebrow">E-posta</span><a href="mailto:${esc(SITE.eposta)}">${esc(SITE.eposta)}</a></li>
    <li><span class="eyebrow">Adres</span><span class="value">${esc(SITE.adres)}</span></li>
    <li><span class="eyebrow">Çalışma Saatleri</span><span class="value">${esc(SITE.calismaSaatleri)}</span></li>`;

  const konu = $("#konu");
  konu.innerHTML =
    `<option value="Genel bilgi">Genel bilgi</option>
     <option value="Eserimi satmak istiyorum">Eserimi satmak istiyorum</option>
     <option value="Ekspertiz / değerleme">Ekspertiz / değerleme</option>` +
    KATEGORILER.map((k) => `<option value="${esc(k.ad)} hakkında">${esc(k.ad)} hakkında</option>`).join("");

  if (location.hash === "#satis") konu.value = "Eserimi satmak istiyorum";

  // Form, sunucu gerektirmeden kullanıcının e-posta uygulamasını açar
  $("#iletisim-formu").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const govde = `Ad Soyad: ${f.get("ad")}\nTelefon: ${f.get("telefon")}\nE-posta: ${f.get("eposta")}\n\n${f.get("mesaj")}`;
    location.href = `mailto:${SITE.eposta}?subject=${encodeURIComponent(f.get("konu"))}&body=${encodeURIComponent(govde)}`;
  });
}

function hakkimizdaSayfasi() {
  iskeletOlustur();
  $("#hakkimizda-gorsel").innerHTML = gorsel(null, kategoriBul("kutuphanemiz"));
}

/* ---------- Başlat ---------- */

const SAYFALAR = {
  anasayfa,
  kategori: kategoriSayfasi,
  "tum-eserler": tumEserlerSayfasi,
  eser: eserSayfasi,
  iletisim: iletisimSayfasi,
  hakkimizda: hakkimizdaSayfasi,
};

document.addEventListener("DOMContentLoaded", () => {
  const sayfa = document.body.dataset.page;
  (SAYFALAR[sayfa] || iskeletOlustur)();
});
