import Link from "next/link";
import { getActiveProducts, type Product } from "@/lib/api";
import { featuredFirst, formatPrice } from "@/lib/catalog";
import ProductImage from "@/components/ProductImage";

export const revalidate = 60;

export const metadata = {
  title: "Hakkımızda | Blue Perfumery",
  description:
    "Blue Perfumery hakkında. Tanınmış kokuların kendi yorumlarıyla kişiselleştirilmiş bir parfüm deneyimi sunan markamızı tanı.",
};

const oneSizeOnePrice = (products: Product[]) => {
  const sizes = new Set(products.map((product) => product.ml));
  const prices = new Set(products.map((product) => product.price));
  if (!products.length)
    return "Bütün şişeler aynı boyda ve aynı fiyatta; seçerken bütçeyi değil kokuyu düşünürsün.";
  if (sizes.size > 1 || prices.size > 1) return null;
  return `Bütün şişeler ${products[0].ml} ml ve aynı fiyatta, ${formatPrice(products[0].price)}; seçerken bütçeyi değil kokuyu düşünürsün.`;
};

const values = (products: Product[]) => {
  const sizeAndPrice = oneSizeOnePrice(products);
  return [
    {
      term: "Koku önce",
      description:
        "Şişeni marka adına göre değil, notalarına ve karakterine göre seçersin.",
    },
    {
      term: "Açıklık",
      description:
        "Her şişe, adı belli bir kokunun Blue Perfumery yorumudur ve hangisi olduğunu açıkça yazarız.",
    },
    ...(sizeAndPrice
      ? [{ term: "Tek boy, tek fiyat", description: sizeAndPrice }]
      : []),
    {
      term: "Kişiye göre",
      description:
        "Beş soruluk test ve Mira rafı sana göre daraltır; Mira yalnızca rafta olanı önerir.",
    },
  ];
};

const HOURS = [
  { days: "Pazartesi – Cuma", time: "10:00 – 19:00" },
  { days: "Cumartesi", time: "10:00 – 18:00" },
  { days: "Pazar", time: "Kapalı" },
];

const AboutPage = async () => {
  const products = await getActiveProducts();
  const [cover] = featuredFirst(products);

  return (
    <div>
      <section className="relative bg-bordo px-5 pb-20 pt-28 text-ivory sm:px-10 lg:px-16 lg:pb-28 lg:pt-36">
        {cover && (
          <div className="absolute inset-y-0 right-0 hidden w-[38%] overflow-hidden bg-bordo-deep lg:block">
            <ProductImage product={cover} priority sizes="38vw" />
          </div>
        )}
        <div className="relative mx-auto max-w-[90rem] lg:pr-[40%]">
          <h1 className="max-w-[14ch] text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            Merhaba, biz Blue Perfumery.
          </h1>
          <div className="mt-10 h-px w-24 bg-gold" />
          <p className="mt-8 max-w-[40ch] text-xl sm:text-2xl">
            Sana özel, lüks ve kişiselleştirilmiş bir parfüm deneyimi sunmak
            için buradayız.
          </p>
        </div>
      </section>

      <div className="px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[90rem]">
          <section
            className="py-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:py-28"
            aria-labelledby="misyon"
          >
            <h2 id="misyon" className="text-4xl sm:text-5xl">
              Misyonumuz
            </h2>
            <div className="mt-8 max-w-[68ch] space-y-5 text-lg lg:mt-0">
              <p className="font-display text-2xl leading-snug sm:text-3xl">
                Blue Perfumery olarak, her bireyin kendine özgü kokusunu
                keşfetmesine yardımcı olmayı amaçlıyoruz.
              </p>
              <p>
                Kişiliğini, yaşam tarzını ve tercihlerini yansıtan, senin için
                seçilmiş kokularla hayatına değer katıyoruz. Koleksiyonumuzdaki
                her parfüm, tanınmış bir kokunun Blue Perfumery yorumudur; hangi
                kokudan ilham aldığımızı açıkça söyleriz.
              </p>
            </div>
          </section>

          <section
            className="border-t border-gold py-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:py-28"
            aria-labelledby="degerler"
          >
            <h2 id="degerler" className="text-4xl sm:text-5xl">
              Değerlerimiz
            </h2>
            <dl className="mt-8 divide-y divide-gold/60 border-y border-gold/60 lg:mt-0">
              {values(products).map((value) => (
                <div
                  key={value.term}
                  className="py-6 sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-baseline sm:gap-10"
                >
                  <dt className="font-display text-3xl sm:text-4xl">
                    {value.term}
                  </dt>
                  <dd className="mt-2 max-w-[60ch] text-ink-soft sm:mt-0">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section
        className="bg-sand px-5 py-20 sm:px-10 lg:px-16 lg:py-28"
        aria-labelledby="iletisim"
      >
        <div className="mx-auto grid max-w-[90rem] gap-16 lg:grid-cols-2">
          <div>
            <h2 id="iletisim" className="text-4xl sm:text-5xl">
              Bize ulaş
            </h2>
            <p className="mt-4 max-w-[48ch] text-ink-soft">
              Soruların veya özel taleplerin için bize yazabilirsin.
            </p>
            <a
              href="mailto:blueperfumerie@gmail.com"
              className="link mt-8 inline-block break-all font-display text-2xl sm:text-3xl"
            >
              blueperfumerie@gmail.com
            </a>
            <h3 className="mt-10 text-2xl">Çalışma saatleri</h3>
            <dl className="mt-4 max-w-sm">
              {HOURS.map((row) => (
                <div
                  key={row.days}
                  className="flex justify-between gap-6 border-b border-ink/15 py-2"
                >
                  <dt>{row.days}</dt>
                  <dd className="tabular-nums text-ink-soft">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:border-l lg:border-gold lg:pl-16">
            <h2 className="text-3xl sm:text-4xl">
              Parfümünü bulmakta zorlanıyor musun?
            </h2>
            <p className="mt-4 max-w-[48ch] text-ink-soft">
              Beş soruluk testi dene, sana uyan şişeleri gör.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/parfumunu-bul" className="btn-bordo">
                Teste başla
              </Link>
              <Link href="/satin-al" className="btn-line">
                Koleksiyonu incele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
