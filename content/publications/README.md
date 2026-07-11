# Publications

Use this folder for structured publication and research records. The publication list document is the authoritative source for metadata. Do not invent titles, journals, years, dates, DOIs, publisher links, abstracts, summaries, keywords, or publication status.

## Folders

- `journal-articles/`: peer-reviewed journal articles.
- `books/`: published books only.
- `book-reviews/`: published book reviews.
- `research-in-progress/`: current work that should not be described as published.

## Journal Article Front Matter

Journal article cards are generated from Markdown files with this structure:

```md
---
title: "Publication title"
journal: "Journal name"
year: "2026"
status: "Published"
doi: "10.xxxx/example"
publisher_url: "https://publisher.example/article"
summary: ""
tags: ["AI Governance", "Assessment Integrity"]
featured: true
---
```

Use `doi` when available. Use `publisher_url` only when there is no DOI or when a publisher page is explicitly provided. Leave `summary` blank until an approved study summary is supplied.

## Book Front Matter

```md
---
title: "Book title"
year: "2024"
publisher: "Publisher"
format: "Book"
link: "https://example.com"
summary: ""
coverImage: ""
---
```
