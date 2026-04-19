# Anonymisation

## Quand anonymiser

Un case file doit être anonymisé si :

- Il mentionne un **client** ou un **prospect** par son nom
- Il mentionne un **partenaire ou fournisseur confidentiel** par son nom (lien commercial non public)
- Il contient des données financières identifiables (chiffres d'affaires, prix de vente détaillés, marges par référence)
- Il expose une personne nommée dans un contexte sensible (litige, conflit, erreur)
- Il révèle un avantage compétitif d'une tierce partie

## Ce qu'on peut garder tel quel

- Son propre nom, ses propres projets publics
- Les outils et services utilisés (Linear, Claude, Astro, Supabase, etc.)
- Les **marques publiques** (éditeur, constructeur, SaaS grand public) nommées au même titre que Stripe ou Claude — un lien commercial qui n'a rien de confidentiel est nommable
- Les patterns techniques et méthodologiques
- Les erreurs qu'on a commises soi-même

Exemple : nommer un éditeur de partitions grand public dans un audit tarifaire est OK (catalogue public, tarif public). Nommer un partenaire B2B confidentiel avec qui on a un accord cadre spécifique ne l'est pas.

## Techniques d'anonymisation

- **Remplacement nominal** : "Atelier Pellegrino" → "un luthier partenaire"
- **Agrégation** : "141 écarts de prix" reste, mais les montants individuels sont remplacés par des ordres de grandeur
- **Flou géographique** : "un magasin à Nantes" plutôt que nom et adresse
- **Décalage temporel** : si la date précise identifie, arrondir au mois ou au trimestre

## Marquage

Toujours déclarer dans le frontmatter :

```yaml
anonymized: true
```

Et préciser en fin d'article, dans un bloc court, quel type d'anonymisation a été appliqué :

> **Note d'anonymisation** : les noms de client et les montants ont été remplacés par des catégories génériques. La méthode et les résultats relatifs sont fidèles.

## Interdit

- Fabriquer un cas qui n'a pas eu lieu
- Mélanger des éléments de plusieurs cas réels sans le dire
- Présenter un cas anonymisé sans le mentionner

Si un case file devient inpubliable même anonymisé, on ne le publie pas.
