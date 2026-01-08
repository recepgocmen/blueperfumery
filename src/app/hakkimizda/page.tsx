import Link from "next/link";
import { Sparkles, Heart, Leaf, Crown, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Hakkımızda | Blue Perfumery",
  description: "Blue Perfumery hakkında bilgi edinin. Lüks ve kişiselleştirilmiş parfüm deneyimi sunan markamızı tanıyın.",
};

export default function AboutPage() {
  const values = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Kalite",
      description: "En yüksek kalitede ürünleri sunmak ve sizlere premium bir deneyim yaşatmak.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Kişiselleştirme",
      description: "Her müşterimizin benzersiz olduğuna inanıyor ve buna uygun özel çözümler sunuyoruz.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Zarafet",
      description: "Her detayda zarafeti ve inceliği ön planda tutuyoruz.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sürdürülebilirlik",
      description: "Doğaya saygılı ve sürdürülebilir uygulamaları destekliyoruz.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
              Hakkımızda
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-white mb-6">
            Merhaba, Biz Blue Perfumery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sizlere özel, lüks ve kişiselleştirilmiş parfüm deneyimleri sunmak
            için buradayız.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-gold/20 to-amber-600/10 p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3 py-1 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-medium">Misyonumuz</span>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                Blue Perfumery olarak, her bireyin kendine özgü kokusunu
                keşfetmesine yardımcı olmayı amaçlıyoruz.
              </p>
              <p className="text-white/70 leading-relaxed">
                Kişiliğinizi, yaşam tarzınızı ve tercihlerinizi yansıtan, 
                sizin için özel olarak seçilmiş kokularla hayatınıza değer katıyoruz.
                Dünyanın en prestijli parfüm evlerinden titizlikle seçilmiş
                özel koleksiyonumuzla, her anınızı unutulmaz kılmanız için
                yanınızdayız.
              </p>
            </div>
            <div className="md:w-1/2 p-10 lg:p-12">
              <h2 className="text-2xl font-heading font-semibold text-white mb-8">
                Değerlerimiz
              </h2>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white mb-1">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-12">
          <div className="p-10 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-heading font-semibold text-white mb-2">
                Bize Ulaşın
              </h2>
              <p className="text-gray-400">
                Sorularınız veya özel talepleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">E-posta</h3>
                    <a 
                      href="mailto:blueperfumerie@gmail.com" 
                      className="text-gold hover:underline"
                    >
                      blueperfumerie@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-400 text-sm">
                      Pazartesi - Cuma: 10:00 - 19:00<br />
                      Cumartesi: 10:00 - 18:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-gold/10 to-amber-600/5 rounded-xl p-6 border border-gold/20">
                  <h3 className="font-heading font-semibold text-white mb-2">
                    Parfümünüzü Bulmakta Zorlanıyor musunuz?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    AI destekli kişilik testimizi deneyin ve size özel parfüm önerileri alın.
                  </p>
                  <Link
                    href="/parfumunu-bul"
                    className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-full font-medium hover:bg-gold-light transition-all duration-300"
                  >
                    Teste Başla
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            Koleksiyonumuzu keşfetmeye hazır mısınız?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/satin-al"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300"
            >
              Koleksiyonu Keşfet
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
