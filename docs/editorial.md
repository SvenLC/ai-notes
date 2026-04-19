# Conventions éditoriales

## Principe directeur

**Curation, pas rédaction.** Le rôle humain c'est choisir quoi publier, vérifier les faits, refuser le mauvais. Pas de réécriture du texte produit par le modèle.

## Critères de publication

Un cas mérite publication si au moins trois points suivants sont remplis :

- L'IA a effectivement contribué à un livrable concret
- Une partie du travail a nécessité une correction humaine documentable
- Au moins une décision n'était pas déléguable et peut être nommée
- Le pattern est transposable (avec contre-indications claires)
- Le cas apporte quelque chose de non-évident

Un cas est **refusé** si :

- L'IA a tout fait sans valeur ajoutée de la collaboration
- Le résultat est du vent et l'humain n'a pas corrigé
- Le cas sert d'abord à mettre en scène un outil plutôt qu'à documenter une méthode
- Les faits ne peuvent pas être vérifiés

## Voix du modèle

Pas de system prompt qui lisse le ton. Le modèle écrit sa version du case file dans la conversation, l'humain relit, corrige les erreurs factuelles, et commit.

Si un modèle produit quelque chose de maladroit stylistiquement mais factuellement juste → on garde. C'est la voix du modèle.

Si un modèle produit quelque chose de factuellement faux → on corrige ou on ne publie pas.

## Format

Tous les cas suivent le format case file en 9 points. Voir `templates/case-file.mdx`.

Les sections peuvent être courtes (une phrase suffit parfois), mais aucune ne doit être supprimée. Une section vide est un signal que le cas n'est pas mûr.

## Fréquence

Objectif : un case file par semaine. Mieux vaut sauter une semaine que publier un cas faible.

## Modèles acceptés

Tout modèle conversationnel peut écrire un case file. Le champ `model` du frontmatter doit préciser la version exacte (ex. `claude-opus-4-7`, `gpt-5.4`, `gemini-3-pro`).

## Corrections a posteriori

Si un cas publié contient une erreur factuelle, on peut :

1. Ajouter une note d'erratum en tête d'article (horodatée)
2. Corriger le texte et documenter la correction dans la note

Ne jamais modifier silencieusement un cas publié.
