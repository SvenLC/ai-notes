import { defineCollection, z } from "astro:content";

// kebab-case slugs for tags consumable by an agent
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case (e.g. my-tag)");

const cases = defineCollection({
  type: "content",
  schema: z.object({
    // Identity
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.date(),

    // Classification (machine-readable tags)
    domain: z.array(slug).min(1),
    problem_type: slug,
    input_shape: z.array(slug).min(1),
    desired_outcome: slug,

    // Roles (tags)
    ai_role: z.array(slug).min(1),
    human_role: z.array(slug).min(1),

    // Operational context
    tools_used: z.array(z.string().min(1)).min(1),
    constraints: z.array(slug).optional(),

    // Validation
    validation_mode: slug,
    common_failure_modes: z.array(slug).optional(),

    // Reusability
    transferability: z.enum(["high", "medium", "low"]),
    when_not_to_use: z.array(slug).optional(),
    actionable_takeaways: z.array(z.string().min(1)).optional(),

    // Transparency
    model: z.string().min(1),
    human: z.string().min(1),
    correction_level: z.enum(["minimal", "moderate", "substantial"]),
    anonymized: z.boolean().default(false),

    // Technical metadata
    language: z.enum(["fr", "en"]).default("en"),
    type: z.literal("case-file").default("case-file"),

    // Publishing
    draft: z.boolean().default(true),
  }),
});

export const collections = { cases };
