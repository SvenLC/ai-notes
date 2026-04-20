import { z } from "zod";

export const caseFileSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  context: z.string().min(1),
  why_ai_applicable: z.string().min(1),
  delegable_work: z.string().min(1),
  non_delegable_work: z.string().min(1),
  critical_invariant: z.string().min(1),
  failure_mode: z.string().min(1),
  correction_applied: z.string().min(1),
  observed_outcome: z.string().min(1),
  reusable_pattern: z.string().min(1),
  do_not_reuse_when: z.string().min(1),
  unknowns: z.array(z.string()),
  tags: z.array(z.string())
});

export type CaseFile = z.infer<typeof caseFileSchema>;

export const caseStatusSchema = z.enum([
  "draft",
  "review",
  "published",
  "archived"
]);

export type CaseStatus = z.infer<typeof caseStatusSchema>;
