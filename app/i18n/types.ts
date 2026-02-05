export type Locale = "en" | "pt" | "es";

export type ExperienceJob = {
  company: string;
  period: string;
  subStatus: string;
  log: string;
};

export type AcademicCert = {
  title: string;
  institution: string;
  description: string;
  seal: string;
  degreeType: "bachelor" | "postgrad";
  period?: string;
};

export type ImprovementCase = {
  category: string;
  title: string;
  before: string;
  problem: string;
  after: string;
};

export type FeaturedProject = {
  name: string;
  description: string;
  segment: string;
  language: string;
  languageColor?: string;
  url: string;
  deployUrl?: string;
};

export type TranslationKeys = {
  nav: {
    brand: string;
    profile: string;
    experience: string;
    data: string;
    academic: string;
    contact: string;
    projects: string;
    ariaNav: string;
  };
  profile: {
    terminalTitle: string;
    tagline: string;
    yearsScale: string;
    education: string;
    location: string;
    followGithub: string;
    followLinkedIn: string;
    hireCta: string;
  };
  experience: {
    title: string;
    subtitle: string;
    statusLabel: string;
    statusInProgress: string;
    statusSuccess: string;
    jobs: ExperienceJob[];
  };
  dataProcessing: {
    title: string;
    subtitle: string;
    filename: string;
    processing: string;
    renderedUi: string;
    beforeLabel: string;
    problemLabel: string;
    afterLabel: string;
    cases: ImprovementCase[];
  };
  academic: {
    title: string;
    subtitle: string;
    certs: AcademicCert[];
  };
  projects: {
    title: string;
    subtitle: string;
    featuredLabel: string;
    pinnedLabel: string;
    viewRepo: string;
    viewDemo: string;
    viewOfficialSite: string;
    loading: string;
    error: string;
    featured: FeaturedProject[];
  };
  footer: {
    title: string;
    subtitle: string;
    terminalTitle: string;
    initializing: string;
    location: string;
    email: string;
    phone: string;
    status: string;
  };
};
