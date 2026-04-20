import SiteShell from "@/components/SiteShell";
import { publications } from "@/lib/siteData";
import { Link } from "wouter";

const TEAL = "#17353b";
const TERRA = "#c88a4a";
const ITALIC_BODY = "#3a4a4d";

export default function Publications() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1440px] px-[22px] pt-8 pb-14 md:px-[64px] md:pt-14 md:pb-20">
        {/* Page kicker */}
        <div
          className="flex items-baseline justify-between border-t border-[rgba(23,53,59,0.32)] font-mono text-[9.5px] tracking-[2.5px] md:text-[11px] md:tracking-[3px] pt-3.5 pb-10 md:pt-5 md:pb-14"
          style={{ color: TEAL }}
        >
          <span>§ PUBLICATIONS · COMPLETE ATLAS</span>
          <span className="opacity-65">PLATES I–VIII</span>
        </div>

        {/* Page heading */}
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-16 md:items-end mb-10 md:mb-16">
          <h1
            className="font-serif font-light leading-[0.98] tracking-[-0.025em] text-[52px] md:text-[88px]"
            style={{ color: TEAL }}
          >
            Publications.
          </h1>
          <p
            className="max-w-[520px] font-serif text-[16px] leading-[1.55] md:text-[18px]"
            style={{ color: TEAL }}
          >
            Published and forthcoming work, spanning biosocial science,
            educational inequality, developmental epigenetics, and
            gene–environment interplay.
          </p>
        </div>

        {/* Publication grid — 2 columns for bigger plates */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {publications.map((p) => (
            <a
              key={p.slug}
              href={p.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4"
            >
              <div className="overflow-hidden border border-[rgba(23,53,59,0.18)] bg-[#f7f3ec]">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <h3
                className="m-0 font-serif text-[22px] font-normal leading-[1.22] tracking-[-0.01em]"
                style={{ color: TEAL }}
              >
                {p.title}
              </h3>
              <p
                className="m-0 font-serif text-[14px] italic leading-[1.5] opacity-85"
                style={{ color: ITALIC_BODY }}
              >
                {p.venue}
              </p>
              <p
                className="m-0 font-serif text-[15px] leading-[1.55]"
                style={{ color: TEAL }}
              >
                {p.summary}
              </p>
              <div
                className="mt-1 font-mono text-[10px] tracking-[2px] group-hover:underline"
                style={{ color: TERRA }}
              >
                ↳ READ PUBLICATION
              </div>
            </a>
          ))}
        </div>

        {/* Back to home */}
        <div className="mt-16 md:mt-24 border-t border-[rgba(23,53,59,0.32)] pt-6">
          <Link href="/">
            <a className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[3px] hover:text-[#c88a4a]" style={{ color: TEAL }}>
              ← BACK TO HOME
            </a>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

