import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const destinos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/destinos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    region: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    draft: z.boolean().default(true),
  }),
});
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});
export const collections = { destinos, blog };
