export type Publication = {
  slug: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  citations: string;
  summary: string;
  theme: string;
  accent: string;
  imageUrl: string;
  externalUrl: string;
};

export const profile = {
  name: "Deniz Fraemke",
  role: "Predoctoral Fellow",
  affiliation: "Max Planck Institute for Human Development",
  group: "Max Planck Research Group Biosocial – Biology, Social Disparities, and Development",
  email: "fraemke@mpib-berlin.mpg.de",
  homepage: "https://www.mpib-berlin.mpg.de/staff/deniz-fraemke",
  scholar: "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  focus: [
    "Gene–Environment Interplay",
    "Social Inequality",
    "Educational Attainment",
    "Cognitive Development",
    "Epigenetics",
  ],
  intro:
    "Deniz Fraemke's research sits at the intersection of biosocial development, educational inequality, and cognitive trajectories across the life course. This website draft presents a personal academic identity that feels contemporary and authored, while remaining grounded in rigorous scholarly communication.",
  bio:
    "Based at the Max Planck Institute for Human Development, Deniz Fraemke works on questions connecting biology, development, and socio-economic environments. The draft site emphasizes a modern research profile with strong visual identity, clear thematic framing, and publication discovery designed for collaborators, institutions, and broader academic audiences.",
};

export const milestones = [
  {
    period: "Since 2023",
    title: "PhD Candidate",
    detail: "MPRG Biosocial, Max Planck Institute for Human Development & IMPRS LIFE",
  },
  {
    period: "2022–2023",
    title: "Research Assistant",
    detail: "MPRG Biosocial, Max Planck Institute for Human Development",
  },
  {
    period: "2021–2022",
    title: "Research Intern",
    detail: "Department of Psychology, Max Planck Institute for Cognitive and Brain Sciences",
  },
  {
    period: "2020–2022",
    title: "Research Master (MSc)",
    detail: "Cognitive and Clinical Neuroscience, Maastricht University",
  },
  {
    period: "2017–2020",
    title: "Psychology (BSc)",
    detail: "University of Hamburg",
  },
];

export const statistics = [
  { label: "Scholar citations", value: "55" },
  { label: "h-index", value: "6" },
  { label: "Recent publication years", value: "2022–2026" },
];

export const consulting = {
  headline: "Statistical consulting for complex problems",
  description:
    "Beyond my academic research, I offer statistical consulting for researchers, institutions, and organizations facing complex analytical challenges. Whether you need guidance on study design, advanced modeling, or help making sense of your data — I'm happy to have a conversation about how I can help.",
  areas: [
    {
      title: "Multilevel & Longitudinal Modeling",
      description: "Mixed-effects models, growth curves, and repeated-measures designs for nested or panel data.",
    },
    {
      title: "Causal Inference & Study Design",
      description: "Matching, instrumental variables, difference-in-differences, and experimental design strategies.",
    },
    {
      title: "Genomic & Epigenetic Data Analysis",
      description: "Polygenic scores, DNA-methylation analyses, gene-environment interaction models, and GWAS pipelines.",
    },
    {
      title: "Power Analysis & Statistical Review",
      description: "Sample size planning, simulation-based power analyses, and pre-registration support for grant applications.",
    },
  ],
  disclaimer: "Independent scientific consulting (freiberufliche wissenschaftliche Beratung)",
};

export const publications: Publication[] = [
  {
    slug: "self-control-biological-aging",
    year: "2024",
    title:
      "Self-control is associated with health-relevant disparities in buccal DNA-methylation measures of biological aging in older adults",
    authors:
      "YE Willems, A deSteiguer, PT Tanksley, L Vinnik, D Fraemke, A Okbay, and colleagues",
    venue: "Clinical Epigenetics 16 (1), 22",
    citations: "12 citations",
    summary:
      "A study connecting self-control with disparities in DNA-methylation indicators of biological aging, illustrating how behavioral and health processes intersect in later life.",
    theme: "Aging, epigenetics, health disparities",
    accent: "from-[#0f3f46] via-[#1f5c63] to-[#c88a4a]",
    imageUrl:
      "/images/card-texture.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "biosocial-perspective-racism-germany",
    year: "2024",
    title:
      "Beyond a shared history: A biosocial perspective on sociogenomics and racism in Germany",
    authors: "MAN Aikins, YE Willems, D Fraemke, L Raffington",
    venue: "KZfSS Kölner Zeitschrift für Soziologie und Sozialpsychologie 76 (3), 573–602",
    citations: "9 citations",
    summary:
      "An intervention into sociogenomics and racism in Germany from a biosocial perspective, emphasizing historical context and social inequality.",
    theme: "Racism, sociogenomics, biosocial theory",
    accent: "from-[#182631] via-[#34495e] to-[#bd6b4d]",
    imageUrl:
      "/images/publications-banner.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "acute-stress-safety-goals",
    year: "2024",
    title: "Acute stress promotes effort mobilization for safety-related goals",
    authors:
      "K Pavlíčková, J Gärtner, SD Voulgaropoulou, D Fraemke, E Adams, and colleagues",
    venue: "Communications Psychology 2 (1), 50",
    citations: "9 citations",
    summary:
      "A psychological study on stress and goal-directed effort, showing how acute stress can intensify mobilization under safety-relevant conditions.",
    theme: "Stress, motivation, psychological processes",
    accent: "from-[#20303c] via-[#41606d] to-[#d29d63]",
    imageUrl:
      "/images/hero-editorial.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "visual-cortex-deaf-hearing-signers",
    year: "2022",
    title:
      "Developmental experiences alter the temporal processing characteristics of the visual cortex: Evidence from deaf and hearing native signers",
    authors:
      "AL Stroh, K Grin, F Rösler, D Bottari, J Ossandon, B Rossion, B Röder",
    venue: "European Journal of Neuroscience 55 (6), 1629–1644",
    citations: "9 citations",
    summary:
      "A neuroscience contribution examining how developmental experience shapes temporal processing in the visual cortex.",
    theme: "Development, sensory processing, neuroscience",
    accent: "from-[#214142] via-[#578080] to-[#c9a257]",
    imageUrl:
      "/images/research-themes.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "racial-disparities-mental-health-aging",
    year: "2025",
    title:
      "Linked emergence of racial disparities in mental health and epigenetic biological aging across childhood and adolescence",
    authors:
      "M Aikins, Y Willems, D Fraemke, C Mitchell, B Goosby, L Raffington",
    venue: "Molecular Psychiatry 30 (9), 4296–4306",
    citations: "8 citations",
    summary:
      "Research on the linked development of racial disparities in mental health and epigenetic biological aging during childhood and adolescence.",
    theme: "Mental health, inequality, biological aging",
    accent: "from-[#15333b] via-[#2e6a73] to-[#cc7f5f]",
    imageUrl:
      "/images/card-texture.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "polygenic-educational-attainment-east-west-germany",
    year: "2025",
    title:
      "Polygenic Associations With Educational Attainment in East Versus West Germany: Differences Emerge After Reunification",
    authors:
      "D Fraemke, YE Willems, A Okbay, U Lindenberger, S Zinn, G Wagner, and colleagues",
    venue: "Psychological Science 36 (7), 559–573",
    citations: "8 citations",
    summary:
      "A study of how polygenic associations with educational attainment differ across East and West Germany in the post-reunification context.",
    theme: "Educational attainment, reunification, sociogenomics",
    accent: "from-[#21303d] via-[#4f6f82] to-[#ba7850]",
    imageUrl:
      "/images/publications-banner.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "end-of-cognitive-meritocracy",
    year: "2026",
    title: "The end of cognitive meritocracy",
    authors: "D Fraemke",
    venue: "AI & SOCIETY, 1–2",
    citations: "Recent work",
    summary:
      "A recent single-author contribution positioning cognitive meritocracy as a critical concept for contemporary debate.",
    theme: "Meritocracy, social critique, cognition",
    accent: "from-[#352723] via-[#7d503c] to-[#d8b47c]",
    imageUrl:
      "/images/hero-editorial.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "developmental-correlates-epigenetic-polygenic-indices",
    year: "2026",
    title:
      "Developmental Correlates of Epigenetic and Polygenic Indices of Cognition and Educational Attainment from Birth to Young Adulthood",
    authors:
      "D Fraemke, L Paulus, I Schuurmans, JH Walter, D Czamara, AM Schowe, and colleagues",
    venue: "bioRxiv, 2026.04.01.715866",
    citations: "Preprint",
    summary:
      "A developmental preprint connecting epigenetic and polygenic indices with cognition and educational attainment from birth into young adulthood.",
    theme: "Development, genetics, cognition, education",
    accent: "from-[#24353f] via-[#3b6770] to-[#dd9b67]",
    imageUrl:
      "/images/research-themes.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
  {
    slug: "dna-methylation-cognition-scores",
    year: "2024",
    title:
      "Associations of DNA-Methylation Profile Scores of Cognition with Cognitive Development, Academic Performance, and Socioeconomic Attainments",
    authors:
      "D Fraemke, JH Walter, KP Harden, M Malanchini, EM Tucker-Drob, and colleagues",
    venue: "Behavior Genetics 54 (6), 500–500",
    citations: "Conference abstract",
    summary:
      "A contribution on DNA-methylation profile scores of cognition and their associations with developmental and academic outcomes.",
    theme: "DNA methylation, cognition, socioeconomic outcomes",
    accent: "from-[#16313a] via-[#36656d] to-[#c98e54]",
    imageUrl:
      "/images/card-texture.webp",
    externalUrl:
      "https://scholar.google.com/citations?user=M_n5idUAAAAJ&hl=en&inst=1704897519255937060",
  },
];
