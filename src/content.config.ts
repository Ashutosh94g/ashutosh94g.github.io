import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const metric = z.object({
  value: z.string(),
  label: z.string(),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    cardTitle: z.string().optional(),
    summary: z.string(),
    cardSummary: z.string().optional(),
    role: z.string(),
    dates: z.string(),
    tags: z.array(z.string()),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    accent: z.enum(['indigo', 'amber', 'emerald']).default('indigo'),
    diagram: z
      .enum(['mermaid-tuxedo', 'mermaid-tuxedo-tpcall', 'none'])
      .default('none'),
    sigil: z.enum(['tuxedo', 'atlas', 'compiler']).optional(),
    metrics: z.array(metric).default([]),
    heroEyebrow: z.string().optional(),
    span: z.enum(['default', 'wide', 'tall']).default('default'),
  }),
});

export const collections = { caseStudies };
