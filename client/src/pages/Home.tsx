import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import {
  consulting,
  contact,
  milestones,
  profile,
  publications,
} from "@/lib/siteData";
import { Link } from "wouter";

// --- Atlas design constants ---
const TEAL = "#17353b";
const TERRA = "#c88a4a";
const ITALIC_BODY = "#3a4a4d";

// --- Which 3 publications to feature on the homepage ---
const FEATURED_SLUGS = [
  "polygenic-educational-attainment-east-west-germany",
  "biosocial-perspective-racism-germany",
  "developmental-correlates-epigenetic-polygenic-indices",
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) =>
    publications.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof publications;

  return (
    <SiteShell>
      <Hero />
      <FeaturedPublications featured={featured} />
      <About />
      <Research />
      <Trajectory />
      <Consulting />
      <Contact />
    </SiteShell>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// HERO
// ───────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-[22px] pt-6 pb-10 md:px-[64px] md:pt-9 md:pb-16">
      {/* Mobile: plate on top, then title, role, intro, links */}
      <div className="md:hidden">
        {/* Hero plate: portrait-aspect variant that stretches to fill 4:5 frame */}
        <div
          className="w-full overflow-hidden border border-[rgba(23,53,59,0.18)] bg-[#f7f3ec]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <img
            src="/images/hero-editorial-mobile.svg?v=2"
            alt="Plate I — a cognitive trajectory crossing a biosocial terrain."
            className="block h-full w-full"
          />
        </div>
        <h1
          className="mt-7 font-serif text-[60px] font-light leading-[0.95] tracking-[-0.025em]"
          style={{ color: TEAL }}
        >
          Deniz
          <br />
          <span className="italic" style={{ color: TERRA }}>
            Fraemke.
          </span>
        </h1>
        <div
          className="mt-3.5 font-mono text-[10px] tracking-[2px]"
          style={{ color: TEAL }}
        >
          PREDOCTORAL FELLOW
          <br />
          MPIB · BERLIN
        </div>
        <p
          className="mt-5 font-serif text-[16.5px] leading-[1.5]"
          style={{ color: TEAL }}
        >
          {profile.intro}
        </p>
        <div className="mt-6 flex flex-col font-mono text-[10.5px] tracking-[2px]" style={{ color: TEAL }}>
          <a
            href="#research"
            className="flex items-center justify-between border-t border-[rgba(23,53,59,0.18)] py-3.5"
          >
            <span>↳ RESEARCH</span>
            <span style={{ color: TERRA }}>§ 03</span>
          </a>
          <Link href="/publications">
            <a className="flex items-center justify-between border-t border-[rgba(23,53,59,0.18)] py-3.5">
              <span>↳ PUBLICATIONS</span>
              <span style={{ color: TERRA }}>§ 01</span>
            </a>
          </Link>
          <a
            href="#vita"
            className="flex items-center justify-between border-t border-b border-[rgba(23,53,59,0.18)] py-3.5"
          >
            <span>↳ VITA</span>
            <span style={{ color: TERRA }}>§ 04</span>
          </a>
        </div>
      </div>

      {/* Desktop: two-column folio — title/intro/links on left, plate on right */}
      <div className="hidden md:grid md:grid-cols-[0.75fr_1.25fr] md:gap-12 md:items-stretch">
        <div className="flex flex-col md:justify-end">
          <h1
            className="font-serif font-light leading-[0.95] tracking-[-0.025em] text-[60px] xl:text-[80px]"
            style={{ color: TEAL }}
          >
            Deniz
            <br />
            <span className="italic" style={{ color: TERRA }}>
              Fraemke.
            </span>
          </h1>
          <div
            className="mt-5 font-mono text-[11px] tracking-[2px]"
            style={{ color: TEAL }}
          >
            PREDOCTORAL FELLOW · MPIB · BERLIN
          </div>
          <p
            className="mt-7 max-w-[480px] font-serif text-[16.5px] leading-[1.55]"
            style={{ color: TEAL }}
          >
            {profile.intro}
          </p>
          <div className="mt-8 flex gap-5 font-mono text-[10.5px] tracking-[2px]" style={{ color: TEAL }}>
            <a href="#research" className="no-underline hover:text-[#c88a4a]">↳ RESEARCH</a>
            <Link href="/publications">
              <a className="no-underline hover:text-[#c88a4a]">↳ PUBLICATIONS</a>
            </Link>
            <a href="#vita" className="no-underline hover:text-[#c88a4a]">
              ↳ VITA
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full overflow-hidden border border-[rgba(23,53,59,0.18)] bg-[#f7f3ec]">
            <img
              src="/images/hero-editorial.svg?v=2"
              alt="Plate I — a cognitive trajectory crossing a biosocial terrain."
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SECTION KICKER
// ───────────────────────────────────────────────────────────────────────────

function Kicker({
  num,
  label,
  right,
}: {
  num: string;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-baseline justify-between border-t border-[rgba(23,53,59,0.32)] font-mono tracking-[2.5px] md:tracking-[3px] text-[9.5px] md:text-[11px] pt-3.5 pb-4 md:pt-5 md:pb-8"
      style={{ color: TEAL }}
    >
      <span>§ {num} · {label}</span>
      {right && <span className="opacity-65">{right}</span>}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §01 — SELECTED PUBLICATIONS
// ───────────────────────────────────────────────────────────────────────────

function FeaturedPublications({ featured }: { featured: typeof publications }) {
  return (
    <section id="publications" className="mx-auto max-w-[1440px] px-[22px] pb-14 md:px-[64px] md:pb-20">
      <Kicker
        num="01"
        label="SELECTED PUBLICATIONS"
        right={
          <Link href="/publications">
            <a className="no-underline hover:text-[#c88a4a]">3 OF 8 · SEE ALL →</a>
          </Link>
        }
      />
      <div className="grid gap-9 md:grid-cols-3">
        {featured.map((p) => (
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
              <span className="font-mono not-italic tracking-[1.5px]">
                {p.year}
              </span>
              {" · "}
              {p.venue.split(",")[0]}
            </p>
            <p
              className="m-0 font-serif text-[15px] italic leading-[1.5]"
              style={{ color: ITALIC_BODY }}
            >
              {p.summary}
            </p>
            <div className="font-mono text-[10px] tracking-[2px] group-hover:underline" style={{ color: TERRA }}>
              ↳ READ
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §02 — ABOUT
// ───────────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-[22px] pb-14 md:px-[64px] md:pb-24">
      <Kicker num="02" label="ABOUT" right="BIO · CONTEXT" />
      <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:gap-[72px]">
        <div>
          <div
            className="overflow-hidden border border-[rgba(23,53,59,0.18)] bg-[#f7f3ec]"
            style={{ aspectRatio: "4 / 5" }}
          >
            <img
              src="/images/portrait.jpg"
              alt="Deniz Fraemke"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="mt-3.5 font-mono text-[10px] tracking-[2px] opacity-70 md:mt-4"
            style={{ color: TEAL }}
          >
            FIG. II · {profile.affiliation.toUpperCase()}
          </div>
        </div>
        <div className="font-serif text-[16.5px] leading-[1.55] md:text-[20px]" style={{ color: TEAL }}>
          {profile.bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "mt-0 mb-5" : "mb-5"}>
              {p}
            </p>
          ))}
          <div
            className="mt-8 grid grid-cols-2 gap-5 font-mono text-[10px] tracking-[1.8px] md:text-[11px] md:tracking-[2px] md:gap-6"
            style={{ color: TEAL }}
          >
            <Meta k="AFFILIATION" v="MPIB · BIOSOCIAL GROUP" />
            <Meta k="LOCATION" v="BERLIN, DE" />
            <Meta
              k="EMAIL"
              v={
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-[#c88a4a]"
                >
                  {profile.email.toUpperCase()}
                </a>
              }
            />
            <Meta
              k="ORCID"
              v={
                <a
                  href={profile.orcidUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#c88a4a]"
                >
                  {profile.orcid}
                </a>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({
  k,
  v,
  span2 = false,
}: {
  k: string;
  v: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "col-span-2" : undefined}>
      <div className="mb-1 opacity-60">{k}</div>
      {v}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §03 — RESEARCH FOCUS
// ───────────────────────────────────────────────────────────────────────────

type MotifKind = "fault" | "strata" | "timeline" | "bands" | "isobars";

const FOCUS: { num: string; title: string; blurb: string; motif: MotifKind }[] = [
  {
    num: "i",
    title: "Gene–Environment Interplay",
    blurb:
      "How genetic effects are amplified, muted, or re-routed by social context.",
    motif: "fault",
  },
  {
    num: "ii",
    title: "Social Inequality",
    blurb:
      "Structural stratification as the medium through which biology acts.",
    motif: "strata",
  },
  {
    num: "iii",
    title: "Educational Attainment",
    blurb:
      "Schools as sorting machines — who passes, who doesn\u2019t, and why.",
    motif: "timeline",
  },
  {
    num: "iv",
    title: "Cognitive Development",
    blurb:
      "Trajectories from birth to young adulthood and their biosocial correlates.",
    motif: "bands",
  },
  {
    num: "v",
    title: "Developmental Epigenetics",
    blurb:
      "DNA methylation as a witness mark of environments past.",
    motif: "isobars",
  },
];

function Research() {
  return (
    <section id="research" className="mx-auto max-w-[1440px] px-[22px] pb-14 md:px-[64px] md:pb-24">
      <Kicker num="03" label="RESEARCH FOCUS" right="5 AREAS" />
      <div className="grid gap-7 md:grid-cols-5 md:gap-6">
        {FOCUS.map((f) => (
          <article
            key={f.num}
            className="flex flex-col gap-3 border-t border-[rgba(23,53,59,0.18)] pt-[18px]"
          >
            <div className="font-mono text-[10px] tracking-[2.5px]" style={{ color: TERRA }}>
              {f.num.toUpperCase()}
            </div>
            <div
              className="overflow-hidden border border-[rgba(23,53,59,0.18)] bg-[#f7f3ec]"
              style={{ aspectRatio: "16 / 10" }}
            >
              <Motif kind={f.motif} />
            </div>
            <h4
              className="m-0 font-serif text-[17px] font-normal leading-[1.25] tracking-[-0.005em]"
              style={{ color: TEAL }}
            >
              {f.title}
            </h4>
            <p
              className="m-0 font-serif text-[13.5px] italic leading-[1.5]"
              style={{ color: ITALIC_BODY }}
            >
              {f.blurb}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Motif({ kind }: { kind: MotifKind }) {
  const W = 220, H = 140;
  if (kind === "fault") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`l${i}`} cx="70" cy="70" rx={30 + i * 14} ry={18 + i * 9} fill="none" stroke={TEAL} strokeWidth="0.5" opacity={0.8 - i * 0.15} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`r${i}`} cx="160" cy="70" rx={28 + i * 13} ry={17 + i * 8} fill="none" stroke={TEAL} strokeWidth="0.5" opacity={0.8 - i * 0.15} />
        ))}
        <line x1="115" y1="10" x2="115" y2="130" stroke={TEAL} strokeWidth="1" opacity="0.7" />
        <circle cx="115" cy="70" r="3" fill={TERRA} />
      </svg>
    );
  }
  if (kind === "strata") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        {[25, 45, 65, 85, 105].map((y, i) => {
          const pts: string[] = [];
          for (let x = 0; x <= W; x += 4) pts.push(`${x},${y + Math.sin(x * 0.02 + i) * 2}`);
          return (
            <polyline
              key={i}
              points={pts.join(" ")}
              fill="none"
              stroke={i === 2 ? TERRA : TEAL}
              strokeWidth={i === 2 ? 1 : 0.5}
              opacity={i === 2 ? 0.95 : 0.55}
            />
          );
        })}
      </svg>
    );
  }
  if (kind === "timeline") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        <line x1="10" y1="70" x2="210" y2="70" stroke={TEAL} strokeWidth="0.5" opacity="0.5" />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1={10 + t * 200} y1="65" x2={10 + t * 200} y2="75" stroke={TEAL} strokeWidth="0.6" opacity="0.6" />
        ))}
        {[0.1, 0.25, 0.4].map((s, i) => {
          const up: string[] = [], dn: string[] = [];
          for (let x = 0; x <= 200; x += 4) {
            const k = x / 200;
            const sp = Math.pow(k, 1.2) * 30 * (s + 0.1);
            up.push(`${10 + x},${70 - sp}`);
            dn.push(`${10 + x},${70 + sp}`);
          }
          return (
            <g key={i}>
              <polyline
                points={up.join(" ")}
                fill="none"
                stroke={i === 1 ? TERRA : TEAL}
                strokeWidth={i === 1 ? 0.9 : 0.5}
                opacity="0.8"
              />
              <polyline points={dn.join(" ")} fill="none" stroke={TEAL} strokeWidth="0.5" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    );
  }
  if (kind === "bands") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const pts: string[] = [];
          for (let x = 0; x <= W; x += 3) {
            const amp = 10 - i * 1.4;
            pts.push(`${x},${70 + Math.sin(x * 0.03 + i * 0.6) * amp}`);
          }
          return (
            <polyline
              key={i}
              points={pts.join(" ")}
              fill="none"
              stroke={i === 0 ? TERRA : TEAL}
              strokeWidth={i === 0 ? 1.1 : 0.5}
              opacity={0.75 - i * 0.1}
            />
          );
        })}
        <circle cx="130" cy="70" r="3" fill={TERRA} />
      </svg>
    );
  }
  // isobars
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
      {[1, 2, 3, 4, 5, 6, 7].map((k) => {
        const r = 10 + k * 8;
        const pts: string[] = [];
        const n = 60;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          pts.push(`${110 + Math.cos(a) * r * 1.2},${70 + Math.sin(a) * r * 0.85}`);
        }
        return <polygon key={k} points={pts.join(" ")} fill="none" stroke={TEAL} strokeWidth="0.5" opacity={0.8 - k * 0.08} />;
      })}
      <text x="110" y="73" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="14" fill={TEAL} opacity="0.75">
        L
      </text>
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §04 — ACADEMIC TRAJECTORY
// ───────────────────────────────────────────────────────────────────────────

function Trajectory() {
  return (
    <section id="vita" className="mx-auto max-w-[1440px] px-[22px] pb-14 md:px-[64px] md:pb-24">
      <Kicker num="04" label="ACADEMIC TRAJECTORY" right={`${milestones[milestones.length - 1].period.split("–")[0]} → PRESENT`} />
      <div>
        {milestones.map((t) => (
          <div
            key={t.period}
            className="grid gap-2 border-b border-[rgba(23,53,59,0.18)] py-5 md:grid-cols-[140px_1fr] md:gap-10 md:py-[26px] md:items-baseline"
          >
            <div className="font-mono text-[11px] tracking-[2px] md:text-[12px]" style={{ color: TERRA }}>
              {t.period}
            </div>
            <div>
              <div className="font-serif text-[18px] tracking-[-0.005em] md:text-[19px]" style={{ color: TEAL }}>
                {t.title}
              </div>
              <div
                className="mt-1 font-mono text-[10px] uppercase tracking-[1.8px] opacity-70 md:text-[10.5px]"
                style={{ color: TEAL }}
              >
                {t.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §05 — STATISTICAL CONSULTING
// ───────────────────────────────────────────────────────────────────────────

function Consulting() {
  return (
    <section
      id="consulting"
      className="border-t border-b border-[rgba(23,53,59,0.18)] bg-[#ecebe3] px-[22px] py-14 md:px-[64px] md:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className="flex items-baseline justify-between border-t border-[rgba(23,53,59,0.32)] pt-4 mb-8 font-mono text-[9.5px] tracking-[2.5px] md:text-[11px] md:tracking-[3px] md:pt-5 md:mb-9"
          style={{ color: TEAL }}
        >
          <span>§ 05 · STATISTICAL CONSULTING</span>
          <span className="opacity-65">FOR RESEARCHERS &amp; ORGANISATIONS</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-[72px] md:items-start md:mb-14">
          <div>
            <h2
              className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[44px] md:text-[68px]"
              style={{ color: TEAL }}
            >
              {consulting.headline}
            </h2>
            <p
              className="mt-4 font-serif italic opacity-75 text-[15px] md:text-[20px]"
              style={{ color: TEAL }}
            >
              {consulting.subtitle}
            </p>
          </div>
          <p
            className="max-w-[540px] font-serif text-[16px] leading-[1.55] md:text-[17px]"
            style={{ color: TEAL }}
          >
            {consulting.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 md:gap-7 md:mb-10">
          {consulting.areas.map((s, i) => (
            <div
              key={s.title}
              className="border-t border-[rgba(23,53,59,0.32)] pt-[18px]"
            >
              <div className="mb-2 font-mono text-[10px] tracking-[2.5px]" style={{ color: TERRA }}>
                {["i", "ii", "iii", "iv"][i].toUpperCase()}
              </div>
              <h5
                className="m-0 mb-2.5 font-serif text-[19px] font-normal tracking-[-0.005em] md:text-[20px]"
                style={{ color: TEAL }}
              >
                {s.title}
              </h5>
              <p
                className="m-0 font-serif italic text-[14px] leading-[1.5] md:text-[14.5px]"
                style={{ color: ITALIC_BODY }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex flex-col gap-2 border-t border-[rgba(23,53,59,0.18)] pt-4 font-mono text-[10px] tracking-[2px] opacity-65 md:flex-row md:items-baseline md:justify-between md:mt-0 md:pt-[18px] md:text-[10.5px]"
          style={{ color: TEAL }}
        >
          <span className="uppercase">{consulting.disclaimer}</span>
          <a href="#contact" className="hover:underline" style={{ color: TERRA }}>
            ↳ ENQUIRE
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// §06 — CONTACT
// ───────────────────────────────────────────────────────────────────────────

function Contact() {
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
    <section id="contact" className="mx-auto max-w-[1440px] px-[22px] pt-14 pb-16 md:px-[64px] md:pt-24 md:pb-20">
      <Kicker num="06" label="CONTACT" right="CORRESPONDENCE" />
      <div className="grid gap-10 md:grid-cols-2 md:gap-[72px]">
        <div>
          <h2
            className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[44px] md:text-[60px]"
            style={{ color: TEAL }}
          >
            {contact.heading}
          </h2>
          <p
            className="mt-5 max-w-[480px] font-serif text-[16px] leading-[1.55] md:text-[17px]"
            style={{ color: TEAL }}
          >
            {contact.description}
          </p>
          <div
            className="mt-9 grid gap-4 font-mono text-[11.5px] tracking-[2px] md:grid-cols-[auto_1fr] md:gap-x-7 md:gap-y-4"
            style={{ color: TEAL }}
          >
            <span className="opacity-60">EMAIL</span>
            <a href={`mailto:${profile.email}`} className="hover:text-[#c88a4a]">
              {profile.email.toUpperCase()}
            </a>
            <span className="opacity-60">POST</span>
            <span>MAX-PLANCK-INSTITUT FÜR BILDUNGSFORSCHUNG · LENTZEALLEE 94 · 14195 BERLIN</span>
            <span className="opacity-60">OFFICE</span>
            <span>{profile.office}</span>
            <span className="opacity-60">SCHOLAR</span>
            <a
              href={profile.scholar}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c88a4a]"
            >
              GOOGLE SCHOLAR PROFILE
            </a>
            <span className="opacity-60">GITHUB</span>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c88a4a]"
            >
              {profile.github.toUpperCase()}
            </a>
            <span className="opacity-60">BLUESKY</span>
            <a
              href={profile.blueskyUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c88a4a]"
            >
              {profile.bluesky.toUpperCase()}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 border-t border-[rgba(23,53,59,0.32)] pt-7"
        >
          {[
            { k: "NAME", name: "name", type: "text", required: true },
            { k: "EMAIL", name: "email", type: "email", required: true },
            { k: "AFFILIATION", name: "affiliation", type: "text", required: false },
          ].map((f) => (
            <label key={f.k} className="flex flex-col gap-1.5">
              <span
                className="font-mono text-[10px] tracking-[2.5px] opacity-70"
                style={{ color: TEAL }}
              >
                {f.k}
              </span>
              <input
                type={f.type}
                name={f.name}
                required={f.required}
                className="border-0 border-b border-[rgba(23,53,59,0.32)] bg-transparent py-2 font-serif text-[18px] outline-none focus:border-[#c88a4a]"
                style={{ color: TEAL }}
              />
            </label>
          ))}
          <label className="flex flex-col gap-1.5">
            <span
              className="font-mono text-[10px] tracking-[2.5px] opacity-70"
              style={{ color: TEAL }}
            >
              MESSAGE
            </span>
            <textarea
              name="message"
              rows={5}
              required
              className="resize-y border border-[rgba(23,53,59,0.32)] bg-transparent p-3.5 font-serif text-[17px] leading-[1.5] outline-none focus:border-[#c88a4a]"
              style={{ color: TEAL }}
            />
          </label>
          <div className="flex items-center justify-end mt-2.5">
            <button
              type="submit"
              disabled={status === "sending"}
              className="border-0 bg-[#17353b] px-7 py-3.5 font-mono text-[11px] tracking-[3px] text-[#f7f3ec] disabled:opacity-60 hover:bg-[#0f2428]"
            >
              {status === "sending" ? "SENDING…" : "SEND ↳"}
            </button>
          </div>
          {status === "sent" && (
            <p className="font-mono text-[11px] tracking-[1.5px]" style={{ color: TERRA }}>
              ✓ THANK YOU — I WILL BE IN TOUCH.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-[11px] tracking-[1.5px]" style={{ color: TERRA }}>
              SOMETHING WENT WRONG. PLEASE EMAIL DIRECTLY.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
