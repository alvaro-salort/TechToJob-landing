export interface NavLink {
  label: string;
  href: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface TalentFeature {
  title: string;
  description: string;
}

export interface CompanyFeature {
  title: string;
  description: string;
}

export interface TournamentFeature {
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  linkedIn: string;
}

export interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
