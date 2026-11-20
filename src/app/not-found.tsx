import Link from "next/link";

const NotFound = () => (
  <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
    <div className="mx-auto max-w-[90rem]">
      <h1 className="max-w-[16ch] text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
        Bu sayfa rafta yok.
      </h1>
      <div className="mt-10 h-px w-24 bg-gold" />
      <p className="mt-8 max-w-[52ch] text-lg text-ink-soft">
        Aradığın sayfa kaldırılmış ya da adresi değişmiş olabilir. Koleksiyona
        göz at ya da sana uyan kokuyu birlikte bulalım.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/satin-al" className="btn-bordo">
          Koleksiyona göz at
        </Link>
        <Link href="/parfumunu-bul" className="btn-line">
          Parfümünü bul
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
