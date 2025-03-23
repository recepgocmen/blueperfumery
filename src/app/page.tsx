"use client";

import Link from "next/link";

export default function Home() {
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
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Hakkımızda
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Kendine Özel Parfüm Deneyimi
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mb-10">
            Blue Perfumery ile kişiliğinize ve tarzınıza uygun parfümleri
            keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/parfumunu-bul"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg"
            >
              Parfümünü Bul
            </Link>
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-600 md:text-lg"
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kişiselleştirilmiş Parfüm Deneyimi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Blue Perfumery farkıyla kendinizi özel hissedin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Kişilik Analizi
              </h3>
              <p className="text-gray-600">
                Kişiliğinize, yaşam tarzınıza ve tercihlerinize göre size özel
                parfüm önerileri sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
                💎
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Koleksiyon
              </h3>
              <p className="text-gray-600">
                En seçkin parfüm evlerinin en özel parçalarını bir araya getiren
                benzersiz koleksiyonumuz.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
                🎁
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Özel Paketleme
              </h3>
              <p className="text-gray-600">
                Her parfüm, şık ve özel tasarım kutularda sevdiklerinize hediye
                etmeye hazır şekilde sunulur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Parfümlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En çok tercih edilen ve beğenilen Blue Perfumery imzalı kokular.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-blue-50 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl">
                  ✨
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Kirke</h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Exclusive
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Tatlı ve meyvemsi notalarla bezeli, sofistike ve çekici bir
                  koku. Yaz akşamlarının vazgeçilmezi.
                </p>
                <div className="flex items-center justify-end">
                  <a
                    href="https://shopier.com/blueperfumery/kirke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Satın Al
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-blue-50 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl">
                  🌙
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Libre</h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Artisanal
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Modern ve özgür ruhlu bir koku. Lavanta ve portakal çiçeği
                  notalarıyla özgürlüğün sembolü.
                </p>
                <div className="flex items-center justify-end">
                  <a
                    href="https://shopier.com/blueperfumery/libre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Satın Al
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-blue-50 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl">
                  🌸
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  La Vie Est Belle
                </h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Classic
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Hayatın güzelliğini yansıtan, iris ve vanilya notalarıyla
                  bezeli, mutluluk veren bir koku.
                </p>
                <div className="flex items-center justify-end">
                  <a
                    href="https://shopier.com/blueperfumery/lavieestbelle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Satın Al
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Tüm Parfümleri Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* Find Your Perfume CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kişiliğine Uygun Parfümü Keşfet
              </h2>
              <p className="text-xl text-blue-100">
                Birkaç soruyla sana özel parfüm önerilerimizi gör. Blue
                Perfumery&apos;nin eşsiz algoritması ile kendini tanı, kokunu
                bul.
              </p>
            </div>
            <div className="md:ml-8">
              <Link
                href="/parfumunu-bul"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Teste Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

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
