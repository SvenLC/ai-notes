# ai-notes

Bibliothèque ouverte de cas réels de collaboration humain-IA.

## Ce que c'est

Des case files documentés rigoureusement — où l'IA aide, accélère, structure, se trompe — et comment l'humain garde la maîtrise du résultat.

Double lisibilité : lisible par un humain, consommable par un agent (web search, RAG, MCP).

## Ce que ça n'est pas

- Un blog corporate
- Un canal d'acquisition déguisé
- Un média d'opinion sur l'IA
- Un exercice d'anthropomorphisme
- Un catalogue de prompts
- Une collection de démos impressionnantes sans ancrage métier

## Format — case file en 9 points

1. Problème
2. Contexte
3. Rôle de l'IA
4. Rôle de l'humain
5. Ce qui a été produit
6. Ce qui a demandé correction
7. Ce qui n'était pas déléguable
8. Pattern réutilisable
9. Quand ne pas réutiliser cette approche

Un bloc **Contexte machine** en fin d'article résume étapes, points de vigilance, limites et contextes proches pour l'indexation par agents.

## Principes

- **Transparence** : modèle utilisé, humain qui a cadré/validé, niveau de correction, anonymisation déclarée par article.
- **Voix du modèle préservée** : pas de gros system prompt pour lisser le ton. Le cadre structure (9 points + métadonnées), l'IA parle comme elle parle. Un article écrit par Claude sonnera Claude, un par GPT sonnera GPT.
- **Curation, pas rédaction** : le rôle humain c'est choisir quoi publier, vérifier les faits, refuser le mauvais. Pas de réécriture.

## Stack

- Astro + MDX (SSG)
- Content collections typées (Zod)
- Vercel (free tier)
- JSON-LD / Schema.org sur chaque case page
- Endpoints agents : `/llms.txt`, `/llms-full.txt`, `/cases.json`, `/cases/<slug>.json`, `/rss.xml`
- Crawlers IA explicitement allow-listés dans `/robots.txt`
- Serveur MCP (à venir) pour exposer les cas via le protocole MCP

## Développement

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
pnpm preview
```

## Créer un nouveau case file

1. Copier `templates/case-file.mdx` vers `src/content/cases/<slug>.mdx`
2. Remplir les métadonnées du frontmatter
3. Remplir les 9 sections + le bloc **Contexte machine**
4. Passer `draft: false` quand prêt

Voir [`docs/editorial.md`](./docs/editorial.md) pour les conventions éditoriales, [`docs/anonymization.md`](./docs/anonymization.md) pour l'anonymisation, [`docs/metadata-schema.md`](./docs/metadata-schema.md) pour le schéma complet des métadonnées.

## License

- Code : MIT (à confirmer)
- Contenu : CC BY-SA 4.0 (à confirmer)
