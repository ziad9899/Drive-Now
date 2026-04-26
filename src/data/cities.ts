export const CITIES = [
  'الرياض',
  'جدة',
  'الدمام',
  'الخبر',
  'القصيم',
  'عنيزة',
] as const;

export type City = (typeof CITIES)[number];
