/*
Design reminder for this component:
Editorial modernism with warm academic tones, serif-led identity, asymmetric spacing, and restrained motion.
Does this choice reinforce or dilute our design philosophy?
*/

import { profile } from "@/lib/siteData";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
  pageLabel: string;
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Publications", href: "/publications" },
  { label: "Consulting", href: "/#consulting" },
  { label: "Scholar", href: profile.scholar, external: true },
  { label: "Institutional profile", href: profile.homepage, external: true },
];

export default function SiteShell({ children, pageLabel }: SiteShellProps) {
  const [location] = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,138,74,0.12),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(24,64,74,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,244,238,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(18,55,60,0.08),transparent_50%,rgba(200,138,74,0.08))]" />

      <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(247,243,236,0.74)] backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-5">
          <Link href="/">
            <span className="group flex flex-col leading-none">
              <span className="font-[Fraunces] text-[1.4rem] font-semibold tracking-[-0.03em] text-[#14292e] transition-colors duration-300 group-hover:text-[#23535c]">
                {profile.name}
              </span>
              <span className="mt-2 text-[0.7rem] uppercase tracking-[0.28em] text-[#5c6a69]">
                {pageLabel}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => {
              const isHash = item.href.includes("#");
              const isActive = !item.external && !isHash && location === item.href;

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm text-[#324644] transition-all duration-300 hover:bg-[#17353b] hover:text-white"
                >
                  {item.label}
                </a>
              ) : isHash ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-[#324644] transition-all duration-300 hover:bg-[#17353b] hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  <span
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-[#17353b] text-white shadow-[0_12px_34px_rgba(20,41,46,0.18)]"
                        : "text-[#324644] hover:bg-[#17353b] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-black/5 bg-[#10292f] text-[#f7f2ea]">
        <div className="container grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#c9b39a]">
              Research profile draft
            </p>
            <h2 className="max-w-xl font-[Fraunces] text-3xl leading-tight text-white md:text-4xl">
              A personal academic website shaped to communicate scholarship with clarity and presence.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-[#c9b39a]">Contact</p>
              <a className="block text-base text-[#f7f2ea] transition hover:text-[#d8aa72]" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <p className="text-sm text-[#d2c6b7]">{profile.affiliation}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-[#c9b39a]">Explore</p>
              <Link href="/publications">
                <span className="inline-flex items-center gap-2 text-base text-[#f7f2ea] transition hover:text-[#d8aa72]">
                  View all publications
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                className="inline-flex items-center gap-2 text-sm text-[#d2c6b7] transition hover:text-white"
                href={profile.scholar}
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar profile
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
