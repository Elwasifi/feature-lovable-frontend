# Translate database content into all 9 languages

Right now the language switcher only translates interface text. The actual content — governorate stories, heritage items held abroad, research programmes, traveller stories, museums, events, products and the rest — stays in English. This adds a stored translation for every one of those records in all 8 non-English languages, so switching language changes the content too.

## What gets translated

| Content | Records |
|---|---|
| Providers | 389 |
| Countries | 194 |
| Destinations | 125 |
| Investment opportunities | 81 |
| Properties | 81 |
| Heritage sites | 74 |
| Products | 73 |
| Research programmes | 53 |
| Events | 36 |
| Governorates | 27 |
| Museums | 27 |
| Rulers | 24 |
| Heritage held abroad | 22 |
| Traveller stories | 18 |
| Eras | 11 |
| Offers | 8 |

1,243 records, translated into Arabic, French, German, Spanish, Italian, Russian, Chinese and Hindi — roughly 9,900 translated records in total.

Only descriptive text is translated: names, summaries, descriptions, and short descriptive lists (highlights, tags, achievements). Codes, slugs, prices, dates, coordinates, licence references and people's proper names in Latin script stay as they are.

## How it works

A single translations store holds one row per record, per language, keeping the translated fields together. The site reads the visitor's language and swaps in the translated text where it exists, falling back to English if a translation is missing — so nothing ever renders blank.

Because this is a large volume of machine translation, it runs in batches as a one-off job. Progress is reported as it goes.

## Technical detail

- New table `public.content_translations` (`table_name`, `row_id`, `lang`, `fields jsonb`, `updated_at`), primary key on the three-part identity, public `SELECT` grant to `anon`/`authenticated`, writes restricted to service role.
- A server-side batch script calls the Lovable AI Gateway (Gemini 2.5 Flash) with a JSON-in/JSON-out contract, chunked per table and language, and upserts results.
- A shared `useLocalizedRows()` helper in `src/lib/` fetches translations for the visible ids in the current locale and merges them over the base rows in the route loaders/components — one extra query per page, no route rewrites.
- English requires no rows; it is the source.

## Order of work

1. Create the translations table.
2. Run the translation job table by table, smallest first, so the pattern is verified on a small set before the 389-row provider table.
3. Wire the merge helper into the content pages.
4. Report a table of what was translated (tables, rows, languages) for review.
5. Publish only after your approval.
