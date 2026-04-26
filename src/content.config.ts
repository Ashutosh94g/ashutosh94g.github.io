import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    dates: z.string(),
    tags: z.array(z.string()),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    accent: z.enum(['indigo', 'amber', 'emerald']).default('indigo'),
    diagram: z.enum(['mermaid-tuxedo', 'none']).default('none'),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { caseStudies, writing };
