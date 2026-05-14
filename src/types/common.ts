export interface NavLink {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin';
}

export interface SiteMeta {
  name: string;
  tagline: string;
  description: string;
  established: string;
}
