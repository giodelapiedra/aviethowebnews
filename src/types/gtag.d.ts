interface GtagConfigParams {
  send_page_view?: boolean;
  page_path?: string;
  page_title?: string;
  page_location?: string;
  [key: string]: unknown;
}

type GtagCommand =
  | ['js', Date]
  | ['config', string, GtagConfigParams?]
  | ['event', string, Record<string, unknown>?]
  | ['set', Record<string, unknown>]
  | ['consent', 'default' | 'update', Record<string, unknown>];

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: GtagCommand | unknown[]) => void;
  }
}

export {};
