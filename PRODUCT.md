# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Türkiye'de, tanınmış tasarım ve niş parfümlerin kokusunu seven ama orijinal fiyatını ödemek istemeyen alıcılar. Çoğu telefondan gelir, kokuyu deneyemeden karar vermek zorundadır ve hangi şişenin kendine uyduğunu bilmek ister. (Çıkarım: kitle tanımı depo içeriğinden ve ürün açıklamalarından türetildi, sahibi tarafından ayrıca doğrulanmadı.)

## Product Purpose

Blue Parfüm, bilinen parfümlerin kendi yorumlarını 50 ml şişelerde satar. Site, ziyaretçinin kokuyu koklayamadan doğru şişeyi seçmesini sağlar: koleksiyona göz atma, "Parfümünü Bul" testi ve Mira adlı yapay zeka danışmanı. Başarı: ziyaretçinin bir şişe için WhatsApp'tan sipariş mesajı başlatması.

## Positioning

Her ürün, adı açıkça belirtilen bir orijinal kokunun Blue Parfüm yorumudur; tek boy (50 ml), tek fiyat seviyesi. Seçim markaya göre değil kokuya göre yapılır: notalar, karakter ve kullanım anı.

## Operating Context

- Sipariş site dışında, WhatsApp üzerinden verilir: her "Satın al" / "WhatsApp'tan sipariş ver" bağlantısı (`buyUrl`, `src/lib/catalog.ts`) mağazanın WhatsApp numarasına, şişenin adı, ml'si ve fiyatı yazılı hazır bir mesajla gider. Veritabanındaki `shopierLink` alanı sitede kullanılmıyor.
- Katalog MongoDB'dedir ve admin panelden yönetilir; site ve Mira yalnızca oradaki aktif ürünleri gösterir.
- Mira'nın yanıtları katalogdaki ürünlere dayanır; katalogda olmayan bir parfümü önermez.

## Capabilities and Constraints

- Ürün alanları: ad, açıklama, notalar (düz liste; üst/orta/alt ayrımı yok), karakteristikler, cinsiyet, kategori (`woman`, `man`, `niches`), fiyat, ml, stok, görsel, Shopier linki (sitede kullanılmıyor).
- Sepet ve ödeme sitede yok.
- Arayüz dili Türkçe.
- Kargo süresi, iade koşulu, kalıcılık süresi gibi bilgiler kayıtlı değil; uydurulmaz.

## Brand Commitments

- Ad: Blue Parfüm (Kasım 2026'da "Blue Perfumery" adından değişti; alan adı, API adresi ve sosyal medya kullanıcı adları eski adı taşır). Şişe: kare, parlak sarı altın kapak; kare parlament mavisi etiket. Etiket dıştan içe: mavi üstüne mavi çatlak/damask dokulu kenar, tek ince yaldız çerçeve çizgisi, düz mavi zemin üzerinde yaldızlı sarı (varak baskı) "BL / UE" yazısı ve altında ortalı "EAU DE PARFUM", "MADE WITH L♥VE" (O harfi küçük dolu bir kalp), "50 ML" satırları. Etiketi sahibi bordodan maviye çevirdi; marka adı "Blue" olduğu için site de buna göre kuruluyor.
- Danışmanın adı Mira.
- Sahibinin seçtiği görsel yön: "parlament mavisi + yaldız". Lüks butik; derin kraliyet mavisi alanlar, fildişi okuma zemini, altın yalnızca metal (varak) olarak, serif başlıklar, büyük ürün fotoğrafları. Renk tonları sahibinin etiket fotoğraflarından örneklendi (Kasım 2026) ve `tailwind.config.ts` içinden tek yerden ayarlanır.
- Ürün fotoğrafları (`public/perfumes/`) yeni mavi etiketle yenilendi (Kasım 2026); bordo etiketli önceki set `.impeccable/photos-bordo-label/` içinde yedekli. Fotoğraf adresleri `src/lib/catalog.ts` içindeki `PHOTO_VERSION` ile sürümlenir; fotoğraflar yeniden değişirse bu sayı artırılır.
- Ürün görsellerinin arka planı notalardan ve ilham alınan markanın genel havasından kurulur; logo veya tescilli desen kullanılmaz.

## Evidence on Hand

- Canlı katalog: ürün sayısı veritabanından gelir ve değişir (23 Kasım 2026 itibarıyla 20 aktif ürün), hepsi 50 ml; kampanyada ₺1.250 yerine ₺950 (`originalPrice` / `price`).
- Ürün fotoğrafları: `public/perfumes/<id>.webp`, her ürün için bir tane; ortak yedek `public/perfumes/default.webp`.
- Referans şişe fotoğrafı: `public/card-photos/blue-default.webp` (yalnızca görsel üretiminde referans; sitede gösterilmez).
- İletişim: blueperfumerie@gmail.com. Çalışma saatleri Hakkımızda sayfasında yazılı.
- Yok: müşteri yorumu, satış rakamı, basın, sertifika. Bunlar üretilmez.

## Product Principles

1. Koku önce, marka sonra: gezinme ve öneriler notalar ve karakter üzerinden kurulur.
2. Yalnızca katalogda olan söylenir: site ve Mira veritabanındaki ürün, fiyat ve stok dışına çıkmaz.
3. Karar kısa sürer: her yüzey ziyaretçiyi birkaç adımda bir şişeye ve satın alma linkine götürür.
4. Yorum olduğu açıkça söylenir: ürünler orijinalmiş gibi sunulmaz.
