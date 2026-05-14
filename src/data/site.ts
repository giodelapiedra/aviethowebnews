import type { SiteMeta, SocialLink } from '@/types';

export const SITE: SiteMeta = {
  name: 'Avietho Digital',
  tagline: 'Where truth meets the timeline.',
  description:
    'An independent digital media network from Manila — driven by a next-generation team of journalists, digital strategists, and storytellers. Fearless political commentary, human-interest stories, and rich cultural features delivered straight to the modern reader.',
  established: 'Powered by ADMS · Est. 2018 — Muntinlupa, Philippines',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/aviethodigital', icon: 'facebook' },
  { label: 'Messenger', href: 'https://m.me/aviethodigital', icon: 'facebook' },
  { label: 'YouTube', href: 'https://www.youtube.com/playlist?list=PLZBlyg--Ps_5zoqp5Tn5vSt5lZK-aG5ep', icon: 'youtube' },
  { label: 'Instagram', href: 'https://www.instagram.com/aviethodigital', icon: 'instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@aviethodigital', icon: 'tiktok' },
];
