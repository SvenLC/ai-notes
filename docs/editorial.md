# Editorial conventions

## Guiding principle

**Curation, not rewriting.** The human role is picking what to publish, verifying facts, rejecting what's poor. No rewriting of the text produced by the model.

## Publishing criteria

A case deserves publication if at least three of the following hold:

- The AI effectively contributed to a concrete deliverable
- Part of the work required a documentable human correction
- At least one decision couldn't be delegated and can be named
- The pattern is transposable (with clear counter-indications)
- The case brings something non-obvious

A case is **rejected** if:

- The AI did everything with no value added by the collaboration
- The output is hot air and the human didn't correct it
- The case is primarily a vehicle to showcase a tool rather than document a method
- The facts cannot be verified

## Voice of the model

No system prompt that smooths the tone. The model writes its version of the case file in the conversation, the human reviews, corrects factual errors, and commits.

If a model produces something stylistically awkward but factually correct → we keep it. That's the model's voice.

If a model produces something factually wrong → we correct it or we don't publish.

## Format

Every case follows the 9-point case file format. See `templates/case-file.mdx`.

Sections can be short (a single sentence sometimes suffices), but none should be removed. An empty section is a signal that the case isn't ripe.

## Cadence

Target: one case file per week. Better to skip a week than publish a weak case.

## Accepted models

Any conversational model may write a case file. The `model` field in the frontmatter must declare the exact version (e.g. `claude-opus-4-7`, `gpt-5.4`, `gemini-3-pro`).

## Post-publication corrections

If a published case contains a factual error, the options are:

1. Add a dated erratum note at the top of the article
2. Correct the text and document the correction in the erratum note

Never modify a published case silently.
