export const weddingPageIds = [
  "invitation",
  "story",
  "ceremony",
  "reception",
  "gallery",
  "rsvp",
] as const;

export type WeddingPageId = (typeof weddingPageIds)[number];

export interface PersonConfig {
  name: string;
  role: "bride" | "groom";
  father: string;
  mother: string;
  photo: string;
}

export interface EventConfig {
  time: string;
  venue: string;
  location: string;
  mapUrl: string;
}

export interface StoryMoment {
  year: string;
  title: string;
}

export interface WeddingPageConfig {
  id: WeddingPageId;
  label: string;
}

export interface WeddingConfig {
  couple: {
    bride: PersonConfig;
    groom: PersonConfig;
  };
  date: string;
  displayDate: string;
  dateDetails: {
    weekday: string;
    day: string;
    month: string;
    year: string;
  };
  ceremony: EventConfig;
  reception: EventConfig & {
    dressCode: readonly string[];
  };
  story: readonly StoryMoment[];
  gallery: readonly string[];
  audio: string;
  pages: readonly WeddingPageConfig[];
}
