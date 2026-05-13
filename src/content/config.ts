// src/content/config.ts
// Astro Content Collections configuration with Zod schemas

import { defineCollection, z } from 'astro:content';

// Reusable record shape — W/L/D/KO per discipline
const disciplineRecord = z.object({
  wins: z.number(),
  losses: z.number(),
  draws: z.number(),
  kos: z.number(),
});

const fighters = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string(),
    style: z.string(),
    weightClass: z.string(),
    kunKhmerRecord: disciplineRecord.optional(),
    mmaRecord: disciplineRecord.optional(),
    heroImage: image(),
  }),
});

export const collections = {
  fighters,
};
