/*
Design reminder for this page:
Editorial modernism with warm academic tones, serif-led hierarchy, asymmetric section rhythm, and publication previews treated as curated artifacts.
Does this choice reinforce or dilute our design philosophy?
*/

import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { consulting, contact, hero, milestones, profile, publications } from "@/lib/siteData";
import {
  ArrowRight,
  Atom,
  BarChart3,
  Brain,
  Dna,
  FlaskConical,
  GraduationCap,
  Mail,
  Microscope,
  Scale,
  Target,
} from "lucide-react";
import { Link } from "wouter";

const themeIcons = [Dna, Scale, GraduationCap, Brain, Atom];
const consultingIcons = [BarChart3, Target, Microscope, FlaskConical];

const featuredSlugs = [
  "polygenic-educational-attainment-east-west-germany",
  "biosocial-perspective-racism-germany",
  "developmental-correlates-epigenetic-polygenic-indices",
];

export default function Home() {
  const featuredPublications = featuredSlugs
    .map((slug) => publications.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <SiteShell pageLabel="Research profile">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#f7f3ec]">
        <div className="container grid gap-12 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
          <div className="relative z-10 space-y-10 lg:py-8">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src="/images/portrait.jpg"
                  alt="Deniz Fraemke"
                  className="h-20 w-20 rounded-full border-2 border-[#17353b]/10 object-cover shadow-[0_8px_30px_rgba(20,41,46,0.12)] md:h-24 md:w-24"
                />
                <h1 className="max-w-3xl font-[Fraunces] text-5xl leading-[0.92] tracking-[-0.05em] text-[#153239] md:text-7xl xl:text-[5.75rem]">
                  Deniz Fraemke
                </h1>
              </div>
              <div className="grid max-w-2xl gap-3 text-[#405553] md:grid-cols-[auto_1fr] md:items-center">
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7a695b]">Current role</p>
                <p className="text-lg leading-8 text-[#324644]">
                  {profile.role}, {profile.affiliation}
                </p>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#4d5c5b] md:text-lg">
                {profile.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/publications">
                <Button className="rounded-full bg-[#17353b] px-7 py-6 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#10292f]">
                  Explore publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={`mailto:${profile.email}`}>
                <Button variant="outline" className="rounded-full border-[#17353b]/20 bg-white/60 px-7 py-6 text-sm uppercase tracking-[0.2em] text-[#17353b] hover:bg-[#17353b] hover:text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </a>
            </div>

          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-[#17353b]/10 bg-[#f7f3ec] shadow-[0_30px_90px_rgba(20,41,46,0.10)] flex items-center justify-center p-4 md:p-6">
            <img
              src="/images/hero-editorial.svg"
              alt="Plate I — a cognitive trajectory crossing a biosocial terrain. Gaussian topography with AGCT loci and a terracotta marker."
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Selected publications */}
      <section className="py-16 md:py-20">
        <div className="container space-y-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7a695b]">Recent work</p>
              <h2 className="font-[Fraunces] text-4xl leading-tight tracking-[-0.04em] text-[#18353b] md:text-5xl">
                Selected publications
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#4f5b59]">
              {profile.publicationsBlurb}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPublications.map((publication) => (
              <a
                key={publication!.slug}
                href={publication!.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_70px_rgba(18,39,45,0.08)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative h-60 overflow-hidden bg-[#f7f3ec] flex items-center justify-center p-3">
                  <img
                    src={publication!.imageUrl}
                    alt={publication!.title}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-[#7a695b]">
                    <span>{publication!.year}</span>
                    <span className="truncate">{publication!.theme}</span>
                  </div>
                  <h3 className="font-[Fraunces] text-2xl leading-tight tracking-[-0.03em] text-[#18353b]">
                    {publication!.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#4f5b59]">{publication!.venue}</p>
                </div>
              </a>
            ))}
          </div>

          <Link href="/publications">
            <Button className="rounded-full bg-[#17353b] px-7 py-6 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#10292f]">
              View all publications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="relative border-y border-black/5 bg-[#f7f3ec] py-16 md:py-20">
        <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7a695b]">About</p>
              <h2 className="font-[Fraunces] text-4xl leading-tight tracking-[-0.04em] text-[#18353b] md:text-5xl">
                {profile.aboutHeadline}
              </h2>
            </div>
            <p className="text-base leading-8 text-[#4f5b59] md:text-lg">{profile.bio}</p>
            <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(22,50,57,0.08)]">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7a695b]">Institutional context</p>
              <p className="mt-4 text-base leading-8 text-[#324644]">{profile.group}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile.focus.map((theme, index) => {
              const Icon = themeIcons[index % themeIcons.length];

              return (
                <div
                  key={theme}
                  className="group rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(22,50,57,0.08)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17353b]/8 text-[#17353b]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-[Fraunces] text-2xl leading-tight tracking-[-0.03em] text-[#18353b]">
                    {theme}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic trajectory */}
      <section className="border-b border-black/5 bg-[#efe8dd] py-16 md:py-20">
        <div className="container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-black/5 bg-[#17353b] shadow-[0_25px_70px_rgba(22,50,57,0.14)]">
            <img
              src="/images/research-themes.webp"
              alt="Abstract atlas-like image representing connected research themes"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(247,243,236,0.08),rgba(16,41,47,0.35),rgba(16,41,47,0.78))]" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
              <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#d7c7b7]">Background</p>
              <h2 className="mt-4 max-w-lg font-[Fraunces] text-4xl leading-tight tracking-[-0.035em] text-white md:text-5xl">
                Academic trajectory
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone) => (
              <div key={milestone.period} className="grid gap-2 border-b border-[#17353b]/8 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[140px_1fr]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#7a695b]">{milestone.period}</p>
                <div>
                  <h3 className="font-[Fraunces] text-2xl leading-tight tracking-[-0.03em] text-[#18353b]">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-[#4f5b59]">{milestone.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistical consulting */}
      <section id="consulting" className="relative py-16 md:py-20">
        <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7a695b]">Applied expertise</p>
              <h2 className="font-[Fraunces] text-4xl leading-tight tracking-[-0.04em] text-[#18353b] md:text-5xl">
                {consulting.headline}
              </h2>
            </div>
            <p className="text-base leading-8 text-[#4f5b59] md:text-lg">{consulting.description}</p>
            <p className="text-sm leading-7 text-[#7a695b] italic">{consulting.subtitle}</p>
            <Button
              className="rounded-full bg-[#17353b] px-7 py-6 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#10292f]"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get in touch
            </Button>
            <p className="text-xs leading-6 text-[#7a695b]/70">{consulting.disclaimer}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {consulting.areas.map((area, index) => {
              const Icon = consultingIcons[index % consultingIcons.length];

              return (
                <div
                  key={area.title}
                  className="group rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(22,50,57,0.08)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17353b]/8 text-[#17353b]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-[Fraunces] text-2xl leading-tight tracking-[-0.03em] text-[#18353b]">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5b59]">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactForm />
    </SiteShell>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqewkedl", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-black/5 bg-[#f7f3ec] py-16 md:py-20">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="space-y-6">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7a695b]">Get in touch</p>
          <h2 className="font-[Fraunces] text-4xl leading-tight tracking-[-0.04em] text-[#18353b] md:text-5xl">
            {contact.heading}
          </h2>
          <p className="text-base leading-8 text-[#4f5b59] md:text-lg">
            {contact.description}
          </p>
          <p className="text-sm leading-7 text-[#7a695b]">
            Or reach me directly at{" "}
            <a href={`mailto:${profile.email}`} className="text-[#17353b] underline underline-offset-4 hover:text-[#10292f]">
              {profile.email}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7a695b]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border border-black/8 bg-white/80 px-5 py-4 text-base text-[#18353b] shadow-sm outline-none transition-shadow placeholder:text-[#7a695b]/50 focus:border-[#17353b]/20 focus:ring-2 focus:ring-[#17353b]/10"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7a695b]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-black/8 bg-white/80 px-5 py-4 text-base text-[#18353b] shadow-sm outline-none transition-shadow placeholder:text-[#7a695b]/50 focus:border-[#17353b]/20 focus:ring-2 focus:ring-[#17353b]/10"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7a695b]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-2xl border border-black/8 bg-white/80 px-5 py-4 text-base text-[#18353b] shadow-sm outline-none transition-shadow placeholder:text-[#7a695b]/50 focus:border-[#17353b]/20 focus:ring-2 focus:ring-[#17353b]/10"
              placeholder="Briefly describe your project or question..."
            />
          </div>

          <Button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-[#17353b] px-7 py-6 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#10292f] disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {status === "sent" && (
            <p className="text-sm text-[#2e6a4a]">Thank you! I'll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-[#a04040]">Something went wrong. Please try emailing me directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}
