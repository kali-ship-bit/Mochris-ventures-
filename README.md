# Mochris Ventures website

Company website for Mochris Ventures: automobile dealership, agribusiness, mechanical scraps, security consulting and bus & car hire.

Built with TanStack Start, React, TypeScript and Tailwind CSS.

## Run locally

```sh
bun install   # or: npm install
bun run dev   # or: npm run dev
```

## Where to change things

- Company details (phone, WhatsApp number, address, email): `src/lib/company.ts`.
- Business names, descriptions and page copy: `src/lib/site-content.ts`.
- Home, About and Contact page text: `src/routes/`.
- Colors and fonts: `src/styles.css`.
- Images: `src/assets/`.
- Favicons: `public/`.

## Deploy

The site can be hosted on Vercel, Netlify, Cloudflare or another host that supports TanStack Start.
The build target comes from the Lovable Vite config (Cloudflare by default), so always run a preview
deployment on the chosen host and check it before going live.

Security headers are included for each host: `vercel.json` for Vercel and `public/_headers` for
Netlify and Cloudflare.

## Environment variables

Copy `.env.example` to `.env` for local work and set the same values in the host's settings.
Never commit `.env`. See `SECURITY.md`.

## Admin dashboard demo

The screens under `/admin` are a front-end demo: the sign-in is not real and all data is sample
data kept in the browser. They return the normal 404 page unless `VITE_ADMIN_DEMO=true` is set at
build time, so they stay closed on the live site. Set that variable on a private preview only.
Replace the demo with a real login and database before using it with real enquiries.
