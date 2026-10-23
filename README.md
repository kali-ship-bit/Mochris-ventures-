# Mochris Ventures website

Company website for Mochris Ventures: automobile dealership, agribusiness, mechanical scraps, security consulting and bus & car hire.

Built with TanStack Start, React, TypeScript and Tailwind CSS.

## Run locally

```sh
bun install   # or: npm install
bun run dev   # or: npm run dev
```

## Where to change things

- Company details (phone, WhatsApp number, address, email): `src/lib/site-content.ts`, the `company` object.
- Business names, descriptions and page copy: `src/lib/site-content.ts`.
- Home, About and Contact page text: `src/routes/`.
- Colors and fonts: `src/styles.css`.
- Images: `src/assets/`.
- Favicons: `public/`.

## Deploy

Import the repository into Vercel. The framework is detected automatically.
