export type SocialLink = {
  label: string;
  url: string;
  type: "external" | "mailto" | "copy" | "modal";
  visible: boolean;
  order: number;
};

export type Profile = {
  name: string;
  englishName?: string;
  title: string;
  tagline: string;
  location: string;
  bio: string;
  email: string;
  resumeUrl: string;
  availability: string;
  socialLinks: SocialLink[];
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  startDate: string;
  endDate: string;
  status: string;
  techStack: string[];
  highlights: string[];
  metrics: string[];
  websiteUrl: string;
  githubUrl: string;
  priority: number;
  tags: string[];
  featured: boolean;
};

export type TimelineEntry = {
  title: string;
  subtitle: string;
  date: string;
  type: string;
  description: string;
  links: Array<{ label: string; url: string }>;
  tags: string[];
  order: number;
};
