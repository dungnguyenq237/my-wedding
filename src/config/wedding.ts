import type { WeddingConfig } from "../types/wedding";

export const assetUrl = (path: string): string => {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

export const weddingConfig = {
  couple: {
    bride: {
      name: "Anna Nguyen",
      role: "bride",
      father: "Nguyen Van A",
      mother: "Tran Thi B",
      photo: assetUrl("images/bride.jpg"),
    },
    groom: {
      name: "James Tran",
      role: "groom",
      father: "Tran Van C",
      mother: "Le Thi D",
      photo: assetUrl("images/groom.jpg"),
    },
  },
  date: "2026-12-12",
  displayDate: "12 · 12 · 2026",
  dateDetails: {
    weekday: "Saturday",
    day: "12",
    month: "December",
    year: "2026",
  },
  ceremony: {
    time: "4:00 PM",
    venue: "The Garden Wedding Venue",
    location: "Ho Chi Minh City, Vietnam",
    mapUrl: "https://maps.google.com",
  },
  reception: {
    time: "6:00 PM",
    venue: "The Garden Wedding Venue",
    location: "Ho Chi Minh City, Vietnam",
    mapUrl: "https://maps.google.com",
    dressCode: ["Beige", "Cream", "Earth Tones"],
  },
  story: [
    { year: "2019", title: "The Day We Met" },
    { year: "2022", title: "Our First Journey" },
    { year: "2025", title: "The Proposal" },
    { year: "2026", title: "Our Wedding" },
  ],
  gallery: [
    assetUrl("images/couple-01.jpg"),
    assetUrl("images/couple-02.jpg"),
    assetUrl("images/couple-03.jpg"),
    assetUrl("images/couple-04.jpg"),
  ],
  audio: assetUrl("audio/ambient.mp3"),
  pages: [
    { id: "invitation", label: "Invitation" },
    { id: "story", label: "Our Story" },
    { id: "ceremony", label: "Ceremony" },
    { id: "reception", label: "Reception" },
    { id: "gallery", label: "Gallery" },
    { id: "rsvp", label: "RSVP" },
  ],
} as const satisfies WeddingConfig;

export const coupleInitials = `${weddingConfig.couple.bride.name[0]} & ${weddingConfig.couple.groom.name[0]}`;
