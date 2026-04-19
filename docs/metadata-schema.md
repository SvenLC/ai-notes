# Metadata schema

Every case file has a YAML frontmatter validated by Zod (`src/content/config.ts`). The build fails if a required field is missing or has the wrong type.

## Identity

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | non-empty string | ✅ | Case title |
| `summary` | non-empty string | ✅ | One-sentence problem + result |
| `date` | date (YYYY-MM-DD) | ✅ | Publication date |

## Classification (machine-readable tags)

All classification fields accept only **kebab-case slugs** (`^[a-z0-9]+(-[a-z0-9]+)*$`). The build fails on an invalid slug (`"Data Normalization"`, `"data_normalization"`, `"RAG"` → rejected; `"data-normalization"`, `"erp-integration"` → accepted).

| Field | Type | Required | Description |
|---|---|---|---|
| `domain` | slug[] (≥1) | ✅ | Business domains (e.g. `["retail", "finance"]`) |
| `problem_type` | slug | ✅ | Problem type (e.g. `"price-reconciliation"`) |
| `input_shape` | slug[] (≥1) | ✅ | Input shape (e.g. `["supplier-tariff-sheet"]`) |
| `desired_outcome` | slug | ✅ | Goal (e.g. `"identify-pricing-discrepancies"`) |

## Roles (tags)

| Field | Type | Required | Description |
|---|---|---|---|
| `ai_role` | slug[] (≥1) | ✅ | What was delegated to the AI |
| `human_role` | slug[] (≥1) | ✅ | What was framed / corrected / validated |

## Operational context

| Field | Type | Required | Description |
|---|---|---|---|
| `tools_used` | string[] (≥1, non-empty) | ✅ | Tools used (common names, no kebab-case constraint — e.g. `["Claude", "Square POS"]`) |
| `constraints` | slug[] | optional | Operational constraints |

## Validation

| Field | Type | Required | Description |
|---|---|---|---|
| `validation_mode` | slug | ✅ | How the output was verified |
| `common_failure_modes` | slug[] | optional | Common failure modes observed |

## Reusability

| Field | Type | Required | Description |
|---|---|---|---|
| `transferability` | `"high"` \| `"medium"` \| `"low"` | ✅ | Transposability level |
| `when_not_to_use` | slug[] | optional | Counter-indications |
| `actionable_takeaways` | non-empty string[] | optional | Concrete, prose takeaways |

## Transparency

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | non-empty string | ✅ | AI model used (e.g. `claude-opus-4-7`, `gpt-5.4`) |
| `human` | non-empty string | ✅ | Human who framed / validated |
| `correction_level` | `"minimal"` \| `"moderate"` \| `"substantial"` | ✅ | Level of human correction |
| `anonymized` | boolean | default `false` | Case is anonymized |

## Technical metadata

| Field | Type | Required | Description |
|---|---|---|---|
| `language` | `"fr"` \| `"en"` | default `"en"` | Content language |
| `type` | `"case-file"` | default `"case-file"` | Content type (extensible later) |

## Publishing

| Field | Type | Required | Description |
|---|---|---|---|
| `draft` | boolean | default `true` | Draft status (unpublished). Fail-closed: a missing flag means unpublished rather than accidentally published. |

## Prose vs tag

| Field class | Expected format |
|---|---|
| Tags / classification (`domain`, `problem_type`, `input_shape`, `desired_outcome`, `ai_role`, `human_role`, `constraints`, `validation_mode`, `common_failure_modes`, `when_not_to_use`) | **kebab-case slugs** — regex-validated, enables agent matching for similar cases |
| Human prose (`title`, `summary`, `actionable_takeaways`) | **natural prose**, human-readable |
| Proper names (`tools_used`, `model`, `human`) | common names as used in the industry, `min(1)` constraint only |

## Example

See `src/content/cases/audit-tarifaire-billaudot-mauvais-champ.mdx` for a complete real case. The template for a new case file lives in `templates/case-file.mdx`.
