import type { SectionSlug } from '@/types';

export interface SectionMeta {
  slug: SectionSlug;
  title: string;
  kicker: string;
  description: string;
  href: string;
  cover: string;
  accent: 'gold' | 'crimson' | 'ink' | 'bone';
}

export interface SubCategory {
  key: string;
  label: string;
  description?: string;
}

export const SECTION_META: Record<SectionSlug, SectionMeta> = {
  spotlight: {
    slug: 'spotlight',
    title: 'Spotlight',
    kicker: 'A long-form digital magazine',
    description:
      'Headlines, features, and the people moving the conversation — told slowly, and told well.',
    href: '/spotlight',
    cover:
      'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?auto=format&fit=crop&w=2400&q=85',
    accent: 'gold',
  },
  government: {
    slug: 'government',
    title: 'Government & Politics',
    kicker: 'The decisions shaping the nation',
    description:
      'Reporting from the capitol, the city hall, and the precinct. We follow national policy, local governance, and the elections that decide what comes next.',
    href: '/government',
    cover:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=2400&q=85',
    accent: 'crimson',
  },
  kaladkain: {
    slug: 'kaladkain',
    title: 'Kaladkain',
    kicker: 'Food · Travel · Culture',
    description:
      'Melding the Filipino culture of spontaneous adventure (kaladkad) with a deep appreciation for local gastronomy (kain) — our platform for championing tourism, culinary culture, and the small enterprises that keep local heritage alive.',
    href: '/kaladkain',
    cover:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85',
    accent: 'gold',
  },
  editorial: {
    slug: 'editorial',
    title: 'The Editorial Desk',
    kicker: 'The intellectual core of Avietho Digital',
    description:
      "Sharp opinions, critical analysis, and diverse perspectives on the week’s most pressing issues — Editor’s Picks, Contributor voices, Say What takes, and Gen Speaks.",
    href: '/editorial',
    cover:
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2400&q=85',
    accent: 'ink',
  },
};

export const SECTION_LIST: SectionMeta[] = [
  SECTION_META.spotlight,
  SECTION_META.government,
  SECTION_META.kaladkain,
  SECTION_META.editorial,
];

export const GOVERNMENT_SUBCATEGORIES: SubCategory[] = [
  { key: 'national', label: 'National', description: 'Policy, power, and the wider story of the state.' },
  { key: 'local', label: 'Local', description: 'City halls, councils, and the work close to home.' },
  { key: 'politics', label: 'Politics', description: 'Power, parties, and the long road to office.' },
  { key: 'elections', label: 'Elections', description: 'Campaigns and the count.' },
  { key: 'senate', label: 'Senate' },
  { key: 'house-of-representatives', label: 'House' },
  { key: 'judiciary', label: 'Judiciary' },
  { key: 'executive', label: 'Executive' },
  { key: 'good-governance', label: 'Good Governance' },
];

export const EDITORIAL_SUBCATEGORIES: SubCategory[] = [
  { key: 'editors-picks-editors-lens', label: "Editor's Pick", description: 'Stories our editors keep returning to.' },
  { key: 'contributor', label: 'Contributor', description: 'Voices from outside the masthead.' },
  { key: 'say-what', label: 'Say What', description: 'Sharp takes on the week\'s most-talked-about stories.' },
  { key: 'gen-speaks', label: 'Gen Speaks', description: 'The next generation\'s perspective on what matters.' },
];

export const SPOTLIGHT_SUBCATEGORIES: SubCategory[] = [
  { key: 'headlines', label: 'Headlines' },
  { key: 'feature', label: 'Features' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'celebrity-news', label: 'Celebrity' },
  { key: 'lifestyle-and-entertainment', label: 'Lifestyle' },
  { key: 'entertainment-sports', label: 'Sports' },
  { key: 'youth-student-corner', label: 'Youth & Student' },
];

export const KALADKAIN_SUBCATEGORIES: SubCategory[] = [
  { key: 'food-travel', label: 'Food & Travel' },
  { key: 'food-and-beverages', label: 'Food & Beverages' },
  { key: 'travel-and-tourism', label: 'Travel & Tourism' },
  { key: 'style-and-beauty', label: 'Style & Beauty' },
  { key: 'heritage-tradition', label: 'Heritage' },
];
