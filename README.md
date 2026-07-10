# Dr Jabreel Asghar Thought Leadership Website

A professional academic thought-leadership website built with Next.js App Router, TypeScript, Tailwind CSS, and file-based Markdown/MDX content.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Content Editing

Update content by editing files in:

- `content/publications`
- `content/resources`
- `content/insights`
- `content/teaching`

Each file uses front matter at the top:

```mdx
---
title: "Example Title"
date: "2026-01-15"
summary: "Short summary for cards and search results."
tags: ["AI Governance", "Assessment"]
---
```

Resource downloads live in `public/downloads`. Replace the placeholder `.txt` files with PDFs or templates when ready, then update each resource file's `downloadUrl`.

## Project Structure

- `src/app`: App Router pages and metadata
- `src/components`: Reusable UI components
- `src/lib`: Content parsing and shared data helpers
- `content`: Markdown/MDX source files
- `public/downloads`: Downloadable resources

## Notes

This initial version intentionally avoids a heavy CMS or complex MDX rendering pipeline. It gives you a clean, working foundation that is easy to extend later.
