# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Türkiye'de, tanınmış tasarım ve niş parfümlerin kokusunu seven ama orijinal fiyatını ödemek istemeyen alıcılar. Çoğu telefondan gelir, kokuyu deneyemeden karar vermek zorundadır ve hangi şişenin kendine uyduğunu bilmek ister. (Çıkarım: kitle tanımı depo içeriğinden ve ürün açıklamalarından türetildi, sahibi tarafından ayrıca doğrulanmadı.)

## Product Purpose

Blue Perfumery, bilinen parfümlerin kendi yorumlarını 50 ml şişelerde satar. Site, ziyaretçinin kokuyu koklayamadan doğru şişeyi seçmesini sağlar: koleksiyona göz atma, "Parfümünü Bul" testi ve Mira adlı yapay zeka danışmanı. Başarı: ziyaretçinin bir ürünü Shopier üzerinden satın almaya gitmesi.

## Positioning

Her ürün, adı açıkça belirtilen bir orijinal kokunun Blue Perfumery yorumudur; tek boy (50 ml), tek fiyat seviyesi. Seçim markaya göre değil kokuya göre yapılır: notalar, karakter ve kullanım anı.

## Operating Context

- Satın alma site dışında, Shopier ürün sayfalarında tamamlanır (`shopierLink`); linki olmayan ürünler genel Shopier mağazasına gider.
- Katalog MongoDB'dedir ve admin panelden yönetilir; site ve Mira yalnızca oradaki aktif ürünleri gösterir.
- Mira'nın yanıtları katalogdaki ürünlere dayanır; katalogda olmayan bir parfümü önermez.

## Capabilities and Constraints

- Ürün alanları: ad, açıklama, notalar (düz liste; üst/orta/alt ayrımı yok), karakteristikler, cinsiyet, kategori (`woman`, `man`, `niches`), fiyat, ml, stok, görsel, Shopier linki.
- Sepet ve ödeme sitede yok.
- Arayüz dili Türkçe.
- Kargo süresi, iade koşulu, kalıcılık süresi gibi bilgiler kayıtlı değil; uydurulmaz.

## Brand Commitments

- Ad: Blue Perfumery. Şişe: kare altın kapak, bordo etiket, altın "BLUE" yazısı, "MADE WITH LOVE" alt satırı.
- Danışmanın adı Mira.
- Sahibinin seçtiği görsel yön: sıcak butik; fildişi zemin, bordo ve altın, serif başlıklar, büyük ürün fotoğrafları.
- Ürün görsellerinin arka planı notalardan ve ilham alınan markanın genel havasından kurulur; logo veya tescilli desen kullanılmaz.

## Evidence on Hand

- Canlı katalog (Kasım 2026): 22 aktif ürün, hepsi 50 ml; kampanyada ₺1.250 yerine ₺950 (`originalPrice` / `price`).
- Ürün fotoğrafları: `public/perfumes/<id>.webp`, her ürün için bir tane; ortak yedek `public/perfumes/default.webp`.
- Referans şişe fotoğrafı: `public/card-photos/blue-default.webp` (yalnızca görsel üretiminde referans; sitede gösterilmez).
- İletişim: blueperfumerie@gmail.com. Çalışma saatleri Hakkımızda sayfasında yazılı.
- Yok: müşteri yorumu, satış rakamı, basın, sertifika. Bunlar üretilmez.

## Product Principles

1. Koku önce, marka sonra: gezinme ve öneriler notalar ve karakter üzerinden kurulur.
2. Yalnızca katalogda olan söylenir: site ve Mira veritabanındaki ürün, fiyat ve stok dışına çıkmaz.
3. Karar kısa sürer: her yüzey ziyaretçiyi birkaç adımda bir şişeye ve satın alma linkine götürür.
4. Yorum olduğu açıkça söylenir: ürünler orijinalmiş gibi sunulmaz.
