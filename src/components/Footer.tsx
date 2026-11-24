import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/satin-al", label: "Koleksiyon" },
  { href: "/kadin-parfum", label: "Kadın" },
  { href: "/erkek-parfum", label: "Erkek" },
  { href: "/nis-parfum", label: "Niş" },
  { href: "/parfumunu-bul", label: "Parfümünü Bul" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

const Footer = () => (
  <footer className="border-t border-gold/50 bg-brand-deep text-ivory">
    <div className="mx-auto grid max-w-[90rem] gap-12 px-5 pb-10 pt-16 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-start lg:px-16 lg:pt-20">
      <div>
        <Link
          href="/"
          aria-label="Blue Parfüm ana sayfa"
          className="inline-flex min-h-11 flex-col justify-center leading-none"
        >
          <span className="foil font-display text-[1.75rem] font-medium tracking-[0.08em]">
            BLUE
          </span>
          <span className="mt-1 text-[0.625rem] font-medium tracking-[0.42em]">
            PARFÜM
          </span>
        </Link>
        <p
          aria-hidden="true"
          className="mt-5 flex items-center text-[0.6875rem] font-medium tracking-[0.42em] text-gold"
        >
          MADE WITH L
          <svg viewBox="0 0 24 22" className="mr-[0.42em] h-[0.8em] w-[0.9em] fill-current">
            <path d="M12 21.6 10.3 20C4.2 14.5 0 10.8 0 6.4 0 2.8 2.8 0 6.4 0c2 0 4 .9 5.6 2.4C13.6.9 15.6 0 17.6 0 21.2 0 24 2.8 24 6.4c0 4.4-4.2 8.1-10.3 13.6L12 21.6Z" />
          </svg>
          VE
        </p>
      </div>

      <nav aria-label="Alt menü">
        <ul className="grid grid-cols-2 gap-x-12 gap-y-1 sm:grid-cols-3 lg:grid-cols-2">
          {FOOTER_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 items-center decoration-gold hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="mx-auto flex max-w-[90rem] flex-col gap-3 border-t border-ivory/15 px-5 py-6 text-base text-ivory/80 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
      <a
        href="mailto:blueperfumerie@gmail.com"
        className="link inline-flex min-h-11 items-center self-start text-ivory"
      >
        blueperfumerie@gmail.com
      </a>
      <a
        href="https://www.facebook.com/blueperfumerytr"
        target="_blank"
        rel="noopener noreferrer"
        className="link inline-flex min-h-11 items-center self-start text-ivory"
      >
        Facebook
      </a>
      <a
        href="https://www.instagram.com/blueperfumerytr/"
        target="_blank"
        rel="noopener noreferrer"
        className="link inline-flex min-h-11 items-center self-start text-ivory"
      >
        Instagram
      </a>
      <p className="pr-28">© {new Date().getFullYear()} Blue Parfüm</p>
    </div>
  </footer>
);

export default Footer;
