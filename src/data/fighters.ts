// src/data/fighters.ts
// Stub fighter data for Sitemap.tsx compatibility

export interface DisciplineRecord {
  wins: number;
  losses: number;
  draws: number;
  kos: number;
}

export interface Fighter {
  id: string;
  name: string;
  nameKhmer?: string;
  style: string;
  weightClass: string;
  kunKhmerRecord?: DisciplineRecord;
  mmaRecord?: DisciplineRecord;
  heroImage: string;
}

export const fighters: Record<string, Fighter> = {
  "prom-samnang": {
    id: "prom-samnang",
    name: "Prom Samnang",
    nameKhmer: "ប្រុម សំណាង",
    style: "Kun Khmer",
    weightClass: "Welterweight",
    kunKhmerRecord: { wins: 24, losses: 3, draws: 1, kos: 14 },
    heroImage: "/fighters/prom-samnang.jpg",
  },
  "sok-thy": {
    id: "sok-thy",
    name: "Sok Thy",
    nameKhmer: "សុខ ធី",
    style: "MMA",
    weightClass: "Lightweight",
    kunKhmerRecord: { wins: 12, losses: 4, draws: 1, kos: 6 },
    mmaRecord: { wins: 18, losses: 5, draws: 0, kos: 4 },
    heroImage: "/fighters/sok-thy.jpg",
  },
};
