# Minimal Portfolio

A clean, single-viewport portfolio built with Next.js 16 and Tailwind CSS 4. Features light/dark themes, colorful highlight syntax, and a single source of truth for all content.

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000)

## Customization

All content lives in **`src/content/data.ts`**. Edit this file to customize:

- Profile info (name, title, email, social links)
- Bio with highlight syntax
- Experience entries
- Achievements & projects
- Navigation links

### Highlight Syntax

Use `{text|color}` in any text field:

```ts
"I build {intelligent systems|orange} at {Microsoft|blue}"
```

Available colors: `blue`, `green`, `orange`, `purple`, `pink`, `yellow`

## Structure

```
src/
├── app/
│   ├── page.tsx         # Homepage
│   ├── work/page.tsx    # Work & projects
│   └── blog/page.tsx    # Blog (placeholder)
├── content/
│   └── data.ts          # ← All editable content
└── lib/
    ├── theme.tsx        # Theme provider
    └── utils.tsx        # Highlight parser
```

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) or any Node.js host.

## License

MIT
