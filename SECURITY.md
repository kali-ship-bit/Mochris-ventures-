# Security

## Reporting a problem

If you find a security problem on this website, contact the site owner by phone or WhatsApp
(see the Contact page) rather than posting it publicly. Include what you found and how to repeat it.

## Rules for this repository

- Never commit passwords, API keys, tokens or `.env` files. Use `.env.example` to list the names only.
- Set real values in your hosting provider's environment variable settings.
- Keys that start with `VITE_` are visible to every visitor. Secret keys must never start with `VITE_`.
- If a secret is ever committed, treat it as leaked: replace it with a new one straight away.
  Deleting the file from GitHub is not enough because the old commit still contains it.
- Keep GitHub, hosting and database accounts protected with two-factor authentication.
