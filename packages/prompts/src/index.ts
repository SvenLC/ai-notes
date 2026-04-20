export const CANONICAL_PROMPT_KEYS = [
  "conversation_to_case",
  "critique_case_draft",
  "suggest_approach_from_cases"
] as const;

export type CanonicalPromptKey = (typeof CANONICAL_PROMPT_KEYS)[number];
