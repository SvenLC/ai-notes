# Schéma des métadonnées

Chaque case file a un frontmatter YAML validé par Zod (`src/content/config.ts`). Le build échoue si un champ requis manque ou a un type incorrect.

## Identité

| Champ | Type | Requis | Description |
|---|---|---|---|
| `title` | string (non vide) | ✅ | Titre du cas |
| `summary` | string (non vide) | ✅ | Une phrase résumant problème + résultat |
| `date` | date (YYYY-MM-DD) | ✅ | Date de publication |

## Classification (tags lisibles machine)

Tous les champs de classification acceptent uniquement des **slugs kebab-case** (`^[a-z0-9]+(-[a-z0-9]+)*$`). Le build échoue sur un slug invalide (`"Data Normalization"`, `"data_normalization"`, `"RAG"` → refusés ; `"data-normalization"`, `"erp-integration"` → acceptés).

| Champ | Type | Requis | Description |
|---|---|---|---|
| `domain` | slug[] (≥1) | ✅ | Domaines métier (ex. `["retail", "finance"]`) |
| `problem_type` | slug | ✅ | Type de problème (ex. `"price-reconciliation"`) |
| `input_shape` | slug[] (≥1) | ✅ | Nature des entrées (ex. `["supplier-tariff-sheet"]`) |
| `desired_outcome` | slug | ✅ | Objectif (ex. `"identify-pricing-discrepancies"`) |

## Rôles (tags)

| Champ | Type | Requis | Description |
|---|---|---|---|
| `ai_role` | slug[] (≥1) | ✅ | Ce qui a été confié à l'IA |
| `human_role` | slug[] (≥1) | ✅ | Ce qui a été cadré/corrigé/validé |

## Contexte opérationnel

| Champ | Type | Requis | Description |
|---|---|---|---|
| `tools_used` | string[] (≥1, non vides) | ✅ | Outils utilisés (noms courants, pas de contrainte kebab-case — ex. `["Claude", "Square POS"]`) |
| `constraints` | slug[] | optionnel | Contraintes opérationnelles |

## Validation

| Champ | Type | Requis | Description |
|---|---|---|---|
| `validation_mode` | slug | ✅ | Comment la sortie a été vérifiée |
| `common_failure_modes` | slug[] | optionnel | Erreurs fréquentes observées |

## Réutilisabilité

| Champ | Type | Requis | Description |
|---|---|---|---|
| `transferability` | `"high"` \| `"medium"` \| `"low"` | ✅ | Degré de transposabilité |
| `when_not_to_use` | slug[] | optionnel | Contre-indications |
| `actionable_takeaways` | string[] (non vides) | optionnel | Leçons concrètes en prose |

## Transparence

| Champ | Type | Requis | Description |
|---|---|---|---|
| `model` | string (non vide) | ✅ | Modèle IA utilisé (ex. `claude-opus-4-7`, `gpt-5.4`) |
| `human` | string (non vide) | ✅ | Humain qui a cadré/validé |
| `correction_level` | `"minimal"` \| `"moderate"` \| `"substantial"` | ✅ | Niveau de correction humaine |
| `anonymized` | boolean | défaut `false` | Cas anonymisé |

## Métadonnées techniques

| Champ | Type | Requis | Description |
|---|---|---|---|
| `language` | `"fr"` \| `"en"` | défaut `"fr"` | Langue du contenu |
| `type` | `"case-file"` | défaut `"case-file"` | Type de contenu (extensible plus tard) |

## Publication

| Champ | Type | Requis | Description |
|---|---|---|---|
| `draft` | boolean | défaut `true` | Article en brouillon (non publié). Fail-closed : un oubli = non publié plutôt que publié par erreur. |

## Prose vs tag

| Type de champ | Format attendu |
|---|---|
| Tags / classification (`domain`, `problem_type`, `input_shape`, `desired_outcome`, `ai_role`, `human_role`, `constraints`, `validation_mode`, `common_failure_modes`, `when_not_to_use`) | **slugs kebab-case** — validé par regex, facilite le matching par un agent qui cherche des cas proches |
| Phrases humaines (`title`, `summary`, `actionable_takeaways`) | **prose naturelle**, lisible pour un humain |
| Noms propres (`tools_used`, `model`, `human`) | noms courants tels qu'utilisés dans l'industrie, contrainte `min(1)` uniquement |

## Exemple

Voir `src/content/cases/audit-tarifaire-billaudot-141-ecarts.mdx` pour un cas réel complet. Le template pour créer un nouveau case file est dans `templates/case-file.mdx`.
