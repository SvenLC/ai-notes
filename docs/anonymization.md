# Anonymization

## When to anonymize

A case file must be anonymized if:

- It names a **client** or a **prospect**
- It names a **confidential partner or supplier** (a commercial relationship that isn't public)
- It contains identifiable financial data (revenue figures, detailed sale prices, per-SKU margins)
- It exposes a named person in a sensitive context (litigation, conflict, error)
- It reveals a third party's competitive advantage

## What can stay as-is

- Your own name, your own public projects
- Tools and services used (Linear, Claude, Astro, Supabase, etc.)
- **Public brands** (publisher, manufacturer, consumer SaaS) named the same way you'd name Stripe or Claude — a commercial relationship with nothing confidential about it is nameable
- Technical and methodological patterns
- Mistakes you made yourself

Example: naming a public sheet-music publisher in a tariff audit is OK (public catalog, public tariff). Naming a confidential B2B partner you have a specific framework agreement with is not.

## Anonymization techniques

- **Name replacement**: "Pellegrino Workshop" → "a partner luthier"
- **Aggregation**: "141 price discrepancies" stays, but individual amounts are replaced by orders of magnitude
- **Geographic blur**: "a store in Nantes" rather than name and address
- **Temporal shift**: if the exact date identifies, round to month or quarter

## Marking

Always declare in the frontmatter:

```yaml
anonymized: true
```

And note at the end of the article, in a short block, which type of anonymization was applied:

> **Anonymization note**: client names and amounts were replaced by generic categories. The method and relative results are faithful.

## Forbidden

- Fabricating a case that didn't happen
- Mixing elements of several real cases without saying so
- Presenting an anonymized case without mentioning it

If a case file becomes unpublishable even anonymized, we don't publish it.
