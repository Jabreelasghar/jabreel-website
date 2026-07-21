# Publishing an Insights editorial

The ten-part series is managed from `src/data/editorials.json`. Each record controls its index entry, route, metadata, series navigation and PDF source.

## Publish the next editorial

1. Find its record in `src/data/editorials.json`.
2. Add `subtitle`, `authorDisplayName` (`Dr Jabreel Asghar`), `citationAuthor` (`Asghar, J.`), ISO `publicationDate`, `publicationYear`, `displayDate`, `description`, `pdf`, `canonicalUrl`, article-specific `about`, and the complete article body in `paragraphs`.
3. Change `status` from `forthcoming` to `published`. Keep `seriesNumber`, `seriesTotal`, `series`, `slug` and `title` accurate.
4. Generate the PDF:

   ```powershell
   python scripts/generate-insight-pdf.py <editorial-slug>
   ```

5. Validate:

   ```powershell
   pnpm exec tsc --noEmit
   pnpm run build
   ```

Publishing status automatically controls whether the Insights index title and actions are clickable, whether the route is statically generated, and how previous/next navigation is presented. The shared editorial page generates the byline, reading time, APA citation, copyright notice, series position, metadata and Open Graph data. The PDF generator reads the same body and publication data; do not maintain a second copy of the article text.
