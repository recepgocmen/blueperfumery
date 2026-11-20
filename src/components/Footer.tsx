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
  <footer className="bg-bordo-deep text-ivory">
    <div className="mx-auto grid max-w-[90rem] gap-14 px-5 pb-10 pt-20 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-end lg:px-16 lg:pt-28">
      <div>
        <p className="font-display text-[clamp(5rem,22vw,6rem)] font-medium leading-[0.85] tracking-[0.04em] text-gold"
        >
          BLUE
        </p>
        <p
          aria-hidden="true"
          className="mt-4 text-xs font-medium tracking-[0.5em] text-ivory/80"
        >
          MADE WITH LOVE
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

    <div className="mx-auto flex max-w-[90rem] flex-col gap-3 border-t border-ivory/15 px-5 py-6 text-[0.9375rem] text-ivory/80 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
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
      <p className="pr-28">© {new Date().getFullYear()} Blue Perfumery</p>
    </div>
  </footer>
);

export default Footer;
