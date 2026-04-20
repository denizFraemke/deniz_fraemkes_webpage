import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { footer, profile } from "@/lib/siteData";

type SiteShellProps = {
  children: ReactNode;
  pageLabel?: string;
};

const NAV = [
  { label: "Research", href: "/#research" },
  { label: "Publications", href: "/publications" },
  { label: "Consulting", href: "/#consulting" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteShell({ children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0eee9] text-[#17353b]">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-baseline justify-between border-b border-[rgba(23,53,59,0.18)] px-[64px] py-7">
        <Link href="/">
          <span className="font-mono text-[11px] tracking-[3px] text-[#17353b] cursor-pointer">
            DF · <span className="text-[#c88a4a]">denizfraemke.com</span>
          </span>
        </Link>
        <div className="flex gap-10 font-serif text-[15px] text-[#17353b]">
          {NAV.map((item) =>
            item.href.startsWith("/#") ? (
              <a key={item.label} href={item.href} className="no-underline hover:text-[#c88a4a]">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href}>
                <span className="cursor-pointer hover:text-[#c88a4a]">{item.label}</span>
              </Link>
            ),
          )}
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden sticky top-0 z-20 flex items-center justify-between border-b border-[rgba(23,53,59,0.18)] bg-[#f0eee9] px-[22px] py-[18px]">
        <Link href="/">
          <span className="font-mono text-[10px] tracking-[2.5px] text-[#17353b] cursor-pointer">
            DF · <span className="text-[#c88a4a]">denizfraemke.com</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="border border-[rgba(23,53,59,0.32)] bg-transparent px-[10px] py-[6px] font-mono text-[10px] tracking-[2px] text-[#17353b]"
          aria-label="Menu"
        >
          MENU
        </button>
      </nav>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <main>{children}</main>

      <footer className="bg-[#17353b] text-[#f7f3ec] px-[22px] py-12 md:px-[64px] md:py-14">
        <div className="mx-auto max-w-[1440px] grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12 md:items-start">
          <div>
            <div className="font-serif text-[32px] leading-none tracking-[-0.02em] font-light md:text-[44px]">
              Deniz <span className="italic text-[#c88a4a]">Fraemke</span>
            </div>
            <p className="mt-3 max-w-[360px] font-serif text-[14px] italic leading-relaxed opacity-80 md:text-[16px] md:mt-3.5">
              {footer.tagline}
            </p>
          </div>

          <FooterCol
            heading="Site"
            items={[
              { label: "Publications", href: "/publications", internal: true },
              { label: "Consulting", href: "/#consulting" },
              { label: "Contact", href: "/#contact" },
            ]}
          />
          <FooterCol
            heading="Elsewhere"
            items={[
              { label: "Google Scholar", href: profile.scholar, external: true },
              { label: "Institutional profile", href: profile.homepage, external: true },
            ]}
          />
          <FooterCol
            heading="Colophon"
            items={[
              { label: "Fraunces · JetBrains Mono", static: true },
              { label: "Cream #F7F3EC · Teal #17353B", static: true },
              { label: "Hand-drawn plates, 2026", static: true },
              { label: "© MMXXVI D.F.", static: true },
            ]}
          />
        </div>
        <div className="mx-auto max-w-[1440px] mt-10 flex flex-col gap-2 border-t border-[rgba(247,243,236,0.2)] pt-5 font-mono text-[10px] tracking-[2px] opacity-60 md:flex-row md:justify-between md:mt-12 md:pt-[22px]">
          <span>BERLIN · MMXXVI</span>
          <span>SET IN FRAUNCES &amp; JETBRAINS MONO</span>
          <span>{profile.email.toUpperCase()}</span>
        </div>
      </footer>
    </div>
  );
}

type FooterItem = {
  label: string;
  href?: string;
  external?: boolean;
  internal?: boolean;
  static?: boolean;
};

function FooterCol({ heading, items }: { heading: string; items: FooterItem[] }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[2.5px] opacity-65">
        {heading}
      </div>
      <ul className="m-0 list-none p-0 flex flex-col gap-2.5 font-serif text-[15px]">
        {items.map((it) => (
          <li key={it.label} className="opacity-90">
            {it.static || !it.href ? (
              it.label
            ) : it.external ? (
              <a href={it.href} target="_blank" rel="noreferrer" className="hover:text-[#c88a4a]">
                {it.label}
              </a>
            ) : it.internal ? (
              <Link href={it.href}>
                <span className="cursor-pointer hover:text-[#c88a4a]">{it.label}</span>
              </Link>
            ) : (
              <a href={it.href} className="hover:text-[#c88a4a]">
                {it.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const items = ["Research", "Publications", "Consulting", "Contact"];
  const hrefs: Record<string, string> = {
    Research: "/#research",
    Publications: "/publications",
    Consulting: "/#consulting",
    Contact: "/#contact",
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f0eee9] px-[22px] py-[18px]">
      <div className="flex items-center justify-between border-b border-[rgba(23,53,59,0.18)] pb-[18px]">
        <div className="font-mono text-[10px] tracking-[2.5px] text-[#17353b]">
          DF · <span className="text-[#c88a4a]">INDEX</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="border border-[rgba(23,53,59,0.32)] bg-transparent px-[10px] py-[6px] font-mono text-[10px] tracking-[2px] text-[#17353b]"
        >
          CLOSE ✕
        </button>
      </div>
      <div className="mt-10 flex flex-col">
        {items.map((label, i) => {
          const href = hrefs[label];
          const isInternal = !href.startsWith("/#");
          const anchorProps = {
            className:
              "flex items-baseline justify-between border-b border-[rgba(23,53,59,0.18)] py-[22px]",
            onClick: onClose,
          };
          const content = (
            <>
              <span className="font-serif text-[42px] font-light tracking-[-0.02em] text-[#17353b]">
                {label}
              </span>
              <span className="font-mono text-[10px] tracking-[2px] text-[#c88a4a]">
                § 0{i + 1}
              </span>
            </>
          );
          return isInternal ? (
            <Link key={label} href={href}>
              <a {...anchorProps}>{content}</a>
            </Link>
          ) : (
            <a key={label} href={href} {...anchorProps}>
              {content}
            </a>
          );
        })}
      </div>
      <div className="mt-auto flex justify-between font-mono text-[9.5px] tracking-[2px] opacity-60">
        <span>BERLIN</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}
