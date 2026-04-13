/*
Design reminder for this page:
Editorial modernism with warm academic tones, serif-led hierarchy, image-forward publication cards, and asymmetric composition.
Does this choice reinforce or dilute our design philosophy?
*/

import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { publications, publicationsPage } from "@/lib/siteData";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Publications() {
  return (
    <SiteShell pageLabel="Publications archive">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#f5efe7]">
        <div className="container grid items-end gap-12 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="max-w-2xl font-[Fraunces] text-5xl leading-[0.94] tracking-[-0.04em] text-[#163239] md:text-7xl">
                {publicationsPage.heading}
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#4d5c5b] md:text-lg">
                {publicationsPage.description}
              </p>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#183840]/10 bg-[#163239] p-6 shadow-[0_30px_80px_rgba(22,50,57,0.18)] md:p-8">
            <img
              src="/images/publications-banner.webp"
              alt="Editorial visual banner for the publications archive"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,41,47,0.92),rgba(16,41,47,0.55),rgba(200,138,74,0.15))]" />
            <div className="relative z-10 grid h-full content-between gap-8">
              <div className="flex justify-between gap-4 text-white/80">
                <span className="text-[0.7rem] uppercase tracking-[0.28em]">Curated archive</span>
                <span className="text-[0.7rem] uppercase tracking-[0.28em]">{publications.length} entries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="container space-y-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publications.map((publication) => (
              <a
                key={publication.slug}
                href={publication.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white text-left shadow-[0_24px_70px_rgba(18,39,45,0.08)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={publication.imageUrl}
                    alt={publication.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${publication.accent} opacity-55 mix-blend-multiply`} />
                  <div className="absolute inset-x-4 top-4">
                    <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                      {publication.year}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,23,27,0.88)] via-[rgba(10,23,27,0.5)] to-transparent p-6 text-white">
                    <p className="max-w-[90%] font-[Fraunces] text-2xl leading-tight tracking-[-0.03em]">
                      {publication.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[#6f6e66]">
                    <span>{publication.venue.split(",")[0]}</span>
                  </div>
                  <p className="line-clamp-3 text-sm leading-7 text-[#455655]">{publication.summary}</p>
                  <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                    <p className="text-sm font-medium text-[#17353b]">{publication.theme}</p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#17353b]">
                      Read publication
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[#10292f] py-12 text-[#f6f1e8]">
        <div className="container flex justify-center">
          <Link href="/">
            <Button className="rounded-full bg-[#d5a46d] px-8 py-6 text-sm uppercase tracking-[0.2em] text-[#10292f] hover:bg-[#e3b07a]">
              Back to home
            </Button>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
