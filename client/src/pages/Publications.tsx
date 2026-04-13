/*
Design reminder for this page:
Editorial modernism with warm academic tones, serif-led hierarchy, image-forward publication previews, and asymmetric composition.
Does this choice reinforce or dilute our design philosophy?
*/

import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { profile, publications } from "@/lib/siteData";
import { ArrowUpRight, Quote } from "lucide-react";
import { Link } from "wouter";

export default function Publications() {
  return (
    <SiteShell pageLabel="Publications archive">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#f5efe7]">
        <div className="container grid items-end gap-12 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-[#1e4148]/10 bg-white/70 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-[#526461] shadow-sm">
              Research outputs
            </span>
            <div className="space-y-5">
              <h1 className="max-w-2xl font-[Fraunces] text-5xl leading-[0.94] tracking-[-0.04em] text-[#163239] md:text-7xl">
                Every publication presented as a visual research preview.
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#4d5c5b] md:text-lg">
                This page turns the publication record into a browsable editorial gallery. Each card combines a visual preview, title, venue, and thematic framing, then opens into a fuller research snapshot.
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
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Biosocial development",
                  "Inequality and attainment",
                  "Epigenetics and cognition",
                ].map((theme) => (
                  <div key={theme} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#d6c6b8]">Theme</p>
                    <p className="mt-3 text-sm leading-6 text-white">{theme}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="container space-y-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#7a695b]">Publication preview gallery</p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#4f5b59]">
              Each card can be opened to reveal the project theme, publication context, and a direct path to the Scholar profile. This creates a more approachable experience for visitors who want a quick visual orientation before reading in detail.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publications.map((publication, index) => (
              <Dialog key={publication.slug}>
                <DialogTrigger asChild>
                  <button className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white text-left shadow-[0_24px_70px_rgba(18,39,45,0.08)] transition-transform duration-500 hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={publication.imageUrl}
                        alt={publication.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${publication.accent} opacity-55 mix-blend-multiply`} />
                      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                          {publication.year}
                        </span>
                        <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                          Preview {index + 1}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,23,27,0.88)] via-[rgba(10,23,27,0.5)] to-transparent p-6 text-white">
                        <p className="max-w-[90%] font-[Fraunces] text-2xl leading-tight tracking-[-0.03em]">
                          {publication.title}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 p-6">
                      <div className="flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-[#6f6e66]">
                        <span>{publication.citations}</span>
                        <span>{publication.venue.split(",")[0]}</span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-7 text-[#455655]">{publication.summary}</p>
                      <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                        <p className="text-sm font-medium text-[#17353b]">{publication.theme}</p>
                        <span className="inline-flex items-center gap-2 text-sm text-[#17353b]">
                          Open preview
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-3xl border border-black/10 bg-[#faf6f0] p-0 shadow-[0_30px_100px_rgba(10,23,27,0.22)]">
                  <div className="grid overflow-hidden md:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[300px] md:min-h-full">
                      <img
                        src={publication.imageUrl}
                        alt={publication.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${publication.accent} opacity-60 mix-blend-multiply`} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,41,47,0.05),rgba(16,41,47,0.88))]" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/70">Research theme</p>
                        <p className="mt-3 font-[Fraunces] text-3xl leading-tight tracking-[-0.03em]">{publication.theme}</p>
                      </div>
                    </div>

                    <div className="space-y-8 p-8 md:p-10">
                      <DialogHeader className="space-y-5 text-left">
                        <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-[#6a645f]">
                          <span>{publication.year}</span>
                          <span>•</span>
                          <span>{publication.citations}</span>
                        </div>
                        <DialogTitle className="font-[Fraunces] text-3xl leading-tight tracking-[-0.035em] text-[#18353b] md:text-4xl">
                          {publication.title}
                        </DialogTitle>
                        <DialogDescription className="text-base leading-8 text-[#4f5b59]">
                          {publication.summary}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-6 rounded-[1.5rem] border border-black/5 bg-white/70 p-6">
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7b6b5c]">Authors</p>
                          <p className="mt-3 text-sm leading-7 text-[#324644]">{publication.authors}</p>
                        </div>
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7b6b5c]">Venue</p>
                          <p className="mt-3 text-sm leading-7 text-[#324644]">{publication.venue}</p>
                        </div>
                        <blockquote className="border-l border-[#c88a4a]/40 pl-4 text-sm leading-7 text-[#4a5857]">
                          <Quote className="mb-3 h-4 w-4 text-[#c88a4a]" />
                          This preview card is designed to help visitors understand the publication's terrain at a glance before moving to the full scholarly record.
                        </blockquote>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Button className="rounded-full bg-[#17353b] px-6 text-white hover:bg-[#10292f]" asChild>
                          <a href={publication.externalUrl} target="_blank" rel="noreferrer">
                            Open Scholar entry
                          </a>
                        </Button>
                        <Button variant="outline" className="rounded-full border-[#17353b]/20 px-6 text-[#17353b] hover:bg-[#17353b] hover:text-white" asChild>
                          <a href={profile.homepage} target="_blank" rel="noreferrer">
                            Institutional profile
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[#10292f] py-16 text-[#f6f1e8] md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8b39a]">Back to overview</p>
            <h2 className="max-w-2xl font-[Fraunces] text-3xl leading-tight tracking-[-0.03em] text-white md:text-5xl">
              Return to the main profile page for research themes, biography, and academic trajectory.
            </h2>
          </div>
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
