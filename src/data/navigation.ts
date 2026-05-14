import type { NavLink } from '@/types';

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Spotlight', href: '/spotlight', description: 'Long-form portraits and human journeys.' },
  {
    label: 'Government & Politics',
    href: '/government',
    description: 'The decisions shaping the nation.',
    children: [
      { label: 'National', href: '/government/national' },
      { label: 'Local', href: '/government/local' },
      { label: 'Politics', href: '/government/politics' },
      { label: 'Elections', href: '/government/elections' },
    ],
  },
  {
    label: 'Kaladkain',
    href: '/kaladkain',
    description: 'Travel, food, and the soul of the Philippines.',
    children: [
      { label: 'Food & Travel', href: '/kaladkain/food-travel' },
      { label: 'Travel & Tourism', href: '/kaladkain/travel-and-tourism' },
      { label: 'Food & Beverages', href: '/kaladkain/food-and-beverages' },
      { label: 'Style & Beauty', href: '/kaladkain/style-and-beauty' },
      { label: 'Heritage', href: '/kaladkain/heritage-tradition' },
    ],
  },
  {
    label: 'The Editorial Desk',
    href: '/editorial',
    description: 'Where our voices come together.',
    children: [
      { label: "Editor's Pick", href: '/editorial/editors-picks-editors-lens' },
      { label: 'Contributor', href: '/editorial/contributor' },
      { label: "Editor's Lens", href: '/editorial/editors-lens' },
    ],
  },
  { label: 'Sports', href: '/sports', description: 'On the field, on the court, on the record.' },
  { label: 'Press Release', href: '/press-release', description: 'Official statements and partner announcements.' },
  { label: 'Watch', href: '/#watch', description: 'The Avietho informative series.' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Sections',
    links: [
      { label: 'Spotlight', href: '/spotlight' },
      { label: 'Government & Politics', href: '/government' },
      { label: 'Kaladkain', href: '/kaladkain' },
      { label: 'The Editorial Desk', href: '/editorial' },
      { label: 'Sports', href: '/sports' },
      { label: 'Press Release', href: '/press-release' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Masthead', href: '/about#masthead' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/about#privacy' },
      { label: 'Terms of Use', href: '/about#terms' },
      { label: 'Editorial Standards', href: '/about#standards' },
      { label: 'Advertise', href: '/contact#advertise' },
    ],
  },
];
