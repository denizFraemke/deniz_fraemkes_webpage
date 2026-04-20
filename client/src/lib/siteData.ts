export type Publication = {
  slug: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  summary: string;
  theme: string;
  accent: string;
  imageUrl: string;
  externalUrl: string;
};

/** Convert an Arabic-numeral year (e.g. "2026") to a Roman numeral ("MMXXVI"). */
export function yearToRoman(year: string): string {
  const n = parseInt(year, 10);
  if (isNaN(n)) return year;
  const table: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let rest = n;
  for (const [v, s] of table) {
    while (rest >= v) { out += s; rest -= v; }
  }
  return out;
}

export const profile = {
  name: "Deniz Fraemke",
  role: "Predoctoral Fellow",
  affiliation: "Max Planck Institute for Human Development",
  group: "Max Planck Research Group Biosocial – Biology, Social Disparities, and Development",
  email: "fraemke@mpib-berlin.mpg.de",
  homepage: "https://www.mpib-berlin.mpg.de/staff/deniz-fraemke",
  scholar: "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  orcid: "0009-0007-3446-9367",
  orcidUrl: "https://orcid.org/0009-0007-3446-9367",
  office: "BY APPOINTMENT · TUE/THU",
  github: "@denizFraemke",
  githubUrl: "https://github.com/denizFraemke",
  bluesky: "@denizfraemke.bsky.social",
  blueskyUrl: "https://bsky.app/profile/denizfraemke.bsky.social",
  focus: [
    "Gene–Environment Interplay",
    "Social Inequality",
    "Educational Attainment",
    "Cognitive Development",
    "Developmental Epigenetics",
  ],
  intro:
    "I study how genetic and epigenetic variation relates to cognitive development and educational attainment — and how these processes unfold across unequal social and institutional contexts. My work sits at the intersection of behavioral genetics, epigenetics, and the social sciences, exploring what genomic data can and cannot tell us about human development.",
  bioParagraphs: [
    "I am a predoctoral fellow at the Max Planck Institute for Human Development in Berlin, working within the research group 'Biosocial' — Biology, Social Disparities, and Development led by Dr. Laurel Raffington.",
    "My doctoral work uses molecular-genetic and epigenetic data — polygenic scores, DNA methylation, genome-wide summary statistics — to ask how biological variation becomes consequential inside particular social arrangements: schools, labour markets, regional histories.",
    "I am especially interested in places where a single number (a score, an estimate, a prediction) cannot do justice to the underlying terrain — where the atlas needs more than one plate.",
  ],
  bio:
    "I am a predoctoral fellow at the Max Planck Institute for Human Development in Berlin, within the Biosocial Group. I also hold affiliations with Humboldt-Universität zu Berlin and the German Center for Integrative Biodiversity Research. My doctoral work uses molecular-genetic and epigenetic data — polygenic scores, DNA methylation, genome-wide summary statistics — to ask how biological variation becomes consequential inside particular social arrangements: schools, labour markets, regional histories. I am especially interested in places where a single number cannot do justice to the underlying terrain — where the atlas needs more than one plate.",
  aboutHeadline:
    "Research at the intersection of genomics, social science, and human development.",
  publicationsBlurb:
    "A selection of recent and forthcoming work on gene–environment interplay, cognitive development, and the social dimensions of genomic research.",
};

export const hero = {
  pills: ["Gene–environment interplay", "Educational and cognitive inequality"],
  overlayLabel: "Research focus",
  overlayHeading: "Biosocial perspectives on cognitive development, inequality, and education.",
  overlayDescription: "",
};

export const contact = {
  heading: "Write to me.",
  description:
    "For collaborations, consulting enquiries, speaking invitations, or to send me your work to read.",
};

export const footer = {
  label: "Deniz Fraemke",
  tagline: "Biosocial research on cognitive development, inequality, and education.",
};

export const publicationsPage = {
  heading: "Publications",
  description:
    "An overview of published and forthcoming work, spanning biosocial science, educational inequality, developmental epigenetics, and gene–environment interplay.",
  bannerThemes: ["Biosocial development", "Polygenic and epigenetic methods", "Inequality and cognition"],
  galleryDescription:
    "Select a publication to view authors, venue, and a brief summary. Each card links directly to the full text or publisher's page.",
  backToHomeText:
    "Return to the main page for research themes, biography, and consulting.",
};

export const milestones = [
  {
    period: "Since 2023",
    title: "PhD Candidate",
    detail: "MPRG Biosocial, Max Planck Institute for Human Development & IMPRS LIFE",
    note: "[TOPIC — e.g. DNA methylation, polygenic prediction, life-course inequality]",
  },
  {
    period: "2022–2023",
    title: "Research Assistant",
    detail: "MPRG Biosocial, Max Planck Institute for Human Development",
    note: "[TOPIC]",
  },
  {
    period: "2021–2022",
    title: "Research Intern",
    detail: "Department of Psychology, Max Planck Institute for Cognitive and Brain Sciences",
    note: "[TOPIC]",
  },
  {
    period: "2020–2022",
    title: "Research Master (MSc)",
    detail: "Cognitive and Clinical Neuroscience, Maastricht University",
    note: "[TOPIC]",
  },
  {
    period: "2017–2020",
    title: "Psychology (BSc)",
    detail: "University of Hamburg",
    note: "[TOPIC]",
  },
];

export const consulting = {
  headline: "Statistical consulting",
  subtitle: "Statistische Beratung und Datenanalyse für Forschung, Unternehmen und Organisationen.",
  description:
    "Beyond my academic research, I offer statistical consulting for researchers, institutions, and organizations facing complex analytical challenges. Whether you need guidance on study design, advanced modeling, or help making sense of your data — I'm happy to have a conversation about how I can help.",
  areas: [
    {
      title: "Data Analysis & Modeling",
      description: "From survey data to large-scale behavioral studies — regression, multilevel models, and structural equation models tailored to your question.",
    },
    {
      title: "Study Design & Strategy",
      description: "Sample size planning, experimental design, and analytical strategies — for dissertations, master's theses, or applied research projects.",
    },
    {
      title: "Data Visualization & Reporting",
      description: "Clear, publication-ready figures and dashboards that make complex results accessible to any audience.",
    },
    {
      title: "Statistical Review & Second Opinion",
      description: "Independent review of analyses, methods sections, or results — for manuscripts, reports, or internal decision-making.",
    },
  ],
  disclaimer: "Consulting is offered in a private capacity and is not affiliated with the Max Planck Society.",
};

export const publications: Publication[] = [
  // --- 2026 — first author ---
  {
    slug: "end-of-cognitive-meritocracy",
    year: "2026",
    title: "The end of cognitive meritocracy",
    authors: "D Fraemke",
    venue: "AI & SOCIETY, 1–2",
    summary:
      "A recent single-author contribution positioning cognitive meritocracy as a critical concept for contemporary debate.",
    theme: "Meritocracy, social critique, cognition",
    accent: "from-[#352723] via-[#7d503c] to-[#d8b47c]",
    imageUrl: "/images/publications/end-of-cognitive-meritocracy.svg",
    externalUrl: "https://doi.org/10.1007/s00146-026-02856-7",
  },
  {
    slug: "developmental-correlates-epigenetic-polygenic-indices",
    year: "2026",
    title:
      "Developmental Correlates of Epigenetic and Polygenic Indices of Cognition and Educational Attainment from Birth to Young Adulthood",
    authors:
      "D Fraemke, L Paulus, I Schuurmans, JH Walter, D Czamara, AM Schowe, and colleagues",
    venue: "bioRxiv, 2026.04.01.715866",
    summary:
      "A developmental preprint connecting epigenetic and polygenic indices with cognition and educational attainment from birth into young adulthood.",
    theme: "Development, genetics, cognition, education",
    accent: "from-[#24353f] via-[#3b6770] to-[#dd9b67]",
    imageUrl: "/images/publications/developmental-correlates-epigenetic-polygenic-indices.svg",
    externalUrl: "https://doi.org/10.64898/2026.04.01.715866",
  },
  // --- 2025 — first author ---
  {
    slug: "polygenic-educational-attainment-east-west-germany",
    year: "2025",
    title:
      "Polygenic Associations With Educational Attainment in East Versus West Germany: Differences Emerge After Reunification",
    authors:
      "D Fraemke, YE Willems, A Okbay, U Lindenberger, S Zinn, G Wagner, and colleagues",
    venue: "Psychological Science 36 (7), 559–573",
    summary:
      "A study of how polygenic associations with educational attainment differ across East and West Germany in the post-reunification context.",
    theme: "Educational attainment, reunification, sociogenomics",
    accent: "from-[#21303d] via-[#4f6f82] to-[#ba7850]",
    imageUrl: "/images/publications/polygenic-educational-attainment-east-west-germany.svg",
    externalUrl: "https://doi.org/10.1177/09567976251350965",
  },
  // --- 2025 — co-authored ---
  {
    slug: "racial-disparities-mental-health-aging",
    year: "2025",
    title:
      "Linked emergence of racial disparities in mental health and epigenetic biological aging across childhood and adolescence",
    authors:
      "M Aikins, Y Willems, D Fraemke, C Mitchell, B Goosby, L Raffington",
    venue: "Molecular Psychiatry 30 (9), 4296–4306",
    summary:
      "Research on the linked development of racial disparities in mental health and epigenetic biological aging during childhood and adolescence.",
    theme: "Mental health, inequality, biological aging",
    accent: "from-[#15333b] via-[#2e6a73] to-[#cc7f5f]",
    imageUrl: "/images/publications/racial-disparities-mental-health-aging.svg",
    externalUrl: "https://doi.org/10.1038/s41380-025-03010-3",
  },
  // --- 2024 — co-authored ---
  {
    slug: "biosocial-perspective-racism-germany",
    year: "2024",
    title:
      "Beyond a shared history: A biosocial perspective on sociogenomics and racism in Germany",
    authors: "MAN Aikins, YE Willems, D Fraemke, L Raffington",
    venue: "KZfSS Kölner Zeitschrift für Soziologie und Sozialpsychologie 76 (3), 573–602",
    summary:
      "An intervention into sociogenomics and racism in Germany from a biosocial perspective, emphasizing historical context and social inequality.",
    theme: "Racism, sociogenomics, biosocial theory",
    accent: "from-[#182631] via-[#34495e] to-[#bd6b4d]",
    imageUrl: "/images/publications/biosocial-perspective-racism-germany.svg",
    externalUrl: "https://doi.org/10.1007/s11577-024-00934-6",
  },
  {
    slug: "self-control-biological-aging",
    year: "2024",
    title:
      "Self-control is associated with health-relevant disparities in buccal DNA-methylation measures of biological aging in older adults",
    authors:
      "YE Willems, A deSteiguer, PT Tanksley, L Vinnik, D Fraemke, A Okbay, and colleagues",
    venue: "Clinical Epigenetics 16 (1), 22",
    summary:
      "A study connecting self-control with disparities in DNA-methylation indicators of biological aging, illustrating how behavioral and health processes intersect in later life.",
    theme: "Aging, epigenetics, health disparities",
    accent: "from-[#0f3f46] via-[#1f5c63] to-[#c88a4a]",
    imageUrl: "/images/publications/self-control-biological-aging.svg",
    externalUrl: "https://doi.org/10.1186/s13148-024-01637-7",
  },
  {
    slug: "acute-stress-safety-goals",
    year: "2024",
    title: "Acute stress promotes effort mobilization for safety-related goals",
    authors:
      "K Pavlíčková, J Gärtner, SD Voulgaropoulou, D Fraemke, E Adams, and colleagues",
    venue: "Communications Psychology 2 (1), 50",
    summary:
      "A psychological study on stress and goal-directed effort, showing how acute stress can intensify mobilization under safety-relevant conditions.",
    theme: "Stress, motivation, psychological processes",
    accent: "from-[#20303c] via-[#41606d] to-[#d29d63]",
    imageUrl: "/images/publications/acute-stress-safety-goals.svg",
    externalUrl: "https://doi.org/10.1038/s44271-024-00103-7",
  },
  // --- 2022 — co-authored (published under previous name) ---
  {
    slug: "visual-cortex-deaf-hearing-signers",
    year: "2022",
    title:
      "Developmental experiences alter the temporal processing characteristics of the visual cortex: Evidence from deaf and hearing native signers",
    authors:
      "AL Stroh, K Grin, F Rösler, D Bottari, J Ossandon, B Rossion, B Röder",
    venue: "European Journal of Neuroscience 55 (6), 1629–1644",
    summary:
      "A neuroscience contribution examining how developmental experience shapes temporal processing in the visual cortex.",
    theme: "Development, sensory processing, neuroscience",
    accent: "from-[#214142] via-[#578080] to-[#c9a257]",
    imageUrl: "/images/publications/visual-cortex-deaf-hearing-signers.svg",
    externalUrl: "https://doi.org/10.1111/ejn.15629",
  },
];
