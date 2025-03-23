import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-blue-600 font-bold text-xl">
                Blue Perfumery
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/parfumunu-bul"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Parfümünü Bul
              </Link>
              <Link
                href="https://www.shopier.com/blueperfumery"
                className="text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Satın Al
              </Link>
              <Link
                href="/hakkimizda"
                className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm"
              >
                Hakkımızda
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Merhaba, Biz Blue Perfumery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sizlere özel, lüks ve kişiselleştirilmiş parfüm deneyimleri sunmak
              için buradayız.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 text-white p-12">
                <h2 className="text-3xl font-bold mb-6">Misyonumuz</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Blue Perfumery olarak, her bireyin kendine özgü kokusunu
                  keşfetmesine yardımcı olmayı amaçlıyoruz. Kişiliğinizi, yaşam
                  tarzınızı ve tercihlerinizi yansıtan, sizin için özel olarak
                  seçilmiş kokularla hayatınıza değer katıyoruz.
                </p>
                <p className="text-blue-100 text-lg leading-relaxed mt-4">
                  Dünyanın en prestijli parfüm evlerinden titizlikle seçilmiş
                  özel koleksiyonumuzla, her anınızı unutulmaz kılmanız için
                  yanınızdayız.
                </p>
              </div>
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Değerlerimiz
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">●</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Kalite
                      </h3>
                      <p className="text-gray-600">
                        En yüksek kalitede ürünleri sunmak ve sizlere premium
                        bir deneyim yaşatmak.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">●</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Kişiselleştirme
                      </h3>
                      <p className="text-gray-600">
                        Her müşterimizin benzersiz olduğuna inanıyor ve buna
                        uygun özel çözümler sunuyoruz.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">●</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Zarafet
                      </h3>
                      <p className="text-gray-600">
                        Her detayda zarafeti ve inceliği ön planda tutuyoruz.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">●</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Sürdürülebilirlik
                      </h3>
                      <p className="text-gray-600">
                        Doğaya saygılı ve sürdürülebilir uygulamaları
                        destekliyoruz.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Ekibimiz
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    Elif Yılmaz
                  </h3>
                  <p className="text-blue-600 mb-4">Kurucu & Parfüm Uzmanı</p>
                  <p className="text-gray-600">
                    20 yıllık deneyimiyle parfüm dünyasının inceliklerini
                    müşterilerimizle buluşturuyor.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    Ahmet Kaya
                  </h3>
                  <p className="text-blue-600 mb-4">Kreatif Direktör</p>
                  <p className="text-gray-600">
                    Markanın vizyonunu şekillendiren yaratıcı beyin, lüks
                    deneyiminin mimarı.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    Zeynep Demir
                  </h3>
                  <p className="text-blue-600 mb-4">Müşteri Deneyimi Uzmanı</p>
                  <p className="text-gray-600">
                    Her müşterimizin eşsiz bir deneyim yaşaması için çalışan
                    ekibimizin yıldızı.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bize Ulaşın
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    İletişim Bilgileri
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sorularınız veya özel talepleriniz için bizimle iletişime
                    geçebilirsiniz.
                  </p>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-semibold">Adres:</span> Bağdat
                      Caddesi No:123, Kadıköy, İstanbul
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Telefon:</span> +90 (212)
                      555 1234
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">E-posta:</span>{" "}
                      info@blueperfumery.com
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Çalışma Saatleri
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Pazartesi - Cuma:</span>{" "}
                      10:00 - 19:00
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Cumartesi:</span> 10:00 -
                      18:00
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Pazar:</span> Kapalı
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/parfumunu-bul"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Parfüm Eşleştirme Testini Deneyin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Blue Perfumery</h3>
              <p className="text-gray-400">
                Lüks ve kişiselleştirilmiş parfüm deneyiminiz için yanınızdayız.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/parfumunu-bul"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Parfümünü Bul
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.shopier.com/blueperfumery"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Satın Al
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Blue Perfumery. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
