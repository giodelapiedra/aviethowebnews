export interface ContactChannel {
  type: 'landline' | 'cellphone' | 'email' | 'address' | 'website';
  label: string;
  value: string;
  href?: string;
  secondary?: string;
}

export interface ServicePillar {
  title: string;
  body: string;
}

export const COMPANY = {
  name: 'Avietho Digital',
  parent: 'Avietho Digital Marketing Services (ADMS)',
  parentEstablished: 2018,
  vision:
    'To redefine modern journalism by becoming the premier independent digital media network, where truth meets the timeline, empowering an informed, engaged, and culturally connected society.',
  mission:
    'To leverage the speed, reach, and interactivity of social media to deliver fearless political commentary, compelling human-interest stories, and rich cultural features. Driven by a young, forward-thinking editorial team, we are committed to providing uncompromising journalism that holds power to account while celebrating the people and places that inspire us.',
  intro:
    'Avietho Digital is an independent digital media network driven by a dynamic, next-generation team of journalists, digital strategists, and storytellers. Unbound by the traditional structures of legacy publishers, our small but agile organization is committed to delivering authentic, digital-first content directly to the modern reader.',
  modernNewsroom:
    'In an era where the public square has moved online, traditional publishing models are no longer enough. Avietho Digital utilizes social media not merely as a promotional tool, but as our primary platform for journalism and editorial content. By publishing directly to the feeds where audiences live, work, and engage, we bypass traditional gatekeepers to deliver immediate, high-impact news and commentary.',
  editorialFocus:
    'Our news desk is dedicated to the narratives that shape our society, governance, and culture. We bring a sharp, investigative lens to our coverage of politics and government affairs, driving critical conversations on transparency, policy, and public leadership. Beyond the political arena, we capture the human experience through deeply reported feature articles and life stories. We also celebrate local pride, heritage, and culture with our vibrant coverage of tourism and the dynamic world of pageantry.',
  poweredBy:
    'The Avietho Digital Media Network is proudly powered by Avietho Digital Marketing Services, a legally registered sole proprietorship in the Philippines.',
  marketingWebsite: 'https://www.marketing.aviethodigital.com',
  marketingFacebook: 'https://www.facebook.com/aviethodigitalmarketing',
  marketingMessenger: 'https://m.me/aviethodigitalmarketing',
  newsFacebook: 'https://www.facebook.com/aviethodigital',
  newsMessenger: 'https://m.me/aviethodigital',
} as const;

export const CONTACTS: ContactChannel[] = [
  {
    type: 'landline',
    label: 'Landline',
    value: '+63 2 7000 1366',
    href: 'tel:+63270001366',
  },
  {
    type: 'cellphone',
    label: 'Cellphone',
    value: '+63 9783 1987',
    href: 'tel:+6397831987',
  },
  {
    type: 'email',
    label: 'General Inquiries',
    value: 'aviethodigital@gmail.com',
    href: 'mailto:aviethodigital@gmail.com',
  },
  {
    type: 'email',
    label: 'Marketing & Partnerships',
    value: 'marketing.avietho@gmail.com',
    href: 'mailto:marketing.avietho@gmail.com',
  },
];

export const OFFICE = {
  building: 'Admiralty Bldg. 1101',
  street: 'Alabang-Zapote Rd.',
  district: 'Madrigal Business Park',
  barangay: 'Brgy. Ayala Alabang',
  city: 'Muntinlupa City',
  country: 'Philippines',
};

export const OFFICE_LINES: string[] = [
  OFFICE.building,
  OFFICE.street,
  OFFICE.district,
  OFFICE.barangay,
  `${OFFICE.city}, ${OFFICE.country}`,
];

export const ADMS_INTRO =
  'Established in 2018, Avietho Digital Marketing Services (ADMS) operates at the forefront of the dynamic digital landscape. We are a specialized agency committed to staying ahead of the curve, consistently adapting our strategies to meet the evolving demands of the Philippine market. We deliver tailored, high-impact digital solutions for a diverse clientele that includes political figures, government agencies, private enterprises, and high-profile individuals.';

export const ADMS_APPROACH =
  'We understand that in today’s interconnected world, perception is reality. Our team — creative strategists, data-driven analysts, skilled web developers, certified social media experts, and digital PR professionals — works to build and protect your online presence. We employ a sophisticated blend of advanced social listening, media analysis, and targeted content creation, crafting ethical, effective communication strategies that resonate with target audiences, manage complex public narratives, and foster genuine transparency across all sectors.';

export const ADMS_MULTIMEDIA =
  'Going beyond traditional digital marketing, ADMS provides fully integrated multimedia production. Our creative team collaborates directly with our digital strategists to produce high-quality videos, dynamic graphics, and interactive content — ensuring every piece of media we produce captivates the audience and maximizes your core brand messaging.';

export const ADMS_SERVICES: ServicePillar[] = [
  {
    title: 'Digital PR',
    body: 'Strategic reputation management, online crisis communication, and narrative shaping to build positive public perception and stakeholder trust.',
  },
  {
    title: 'Digital & Social Media Marketing',
    body: 'Data-driven, targeted campaigns designed to engage your specific audience, drive growth, and amplify your message across all major platforms.',
  },
  {
    title: 'Website Development',
    body: 'Robust, secure, and user-friendly digital hubs that serve as the foundation of your online identity and operational transparency.',
  },
  {
    title: 'Multimedia & Branding',
    body: 'Comprehensive brand identity development, graphic design, and the creation of compelling visual assets that make your campaigns stand out.',
  },
  {
    title: 'Video & Live Streaming',
    body: 'Professional-grade video production and real-time broadcasting capabilities to connect with audiences directly, transparently, and powerfully.',
  },
];
