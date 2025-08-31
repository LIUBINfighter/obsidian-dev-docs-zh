import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    // 允许缺失 frontmatter.title，方便渐进迁移；Starlight 会从文档首个 H1 推断标题
    title: z.string().optional(),
    description: z.string().optional(),
    template: z.string().optional(),
    hero: z.any().optional(),
    sidebar: z.object({
      hidden: z.boolean().optional(),
      order: z.number().optional(),
      label: z.string().optional(),
      badge: z.any().optional(),
      attrs: z.record(z.any()).optional(),
    }).optional(),
  })
});

export const collections = { docs };
