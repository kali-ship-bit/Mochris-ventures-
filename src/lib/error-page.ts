import { company, whatsappUrl } from "./company";

// Plain HTML shown when the server itself fails. It uses no images, fonts or other
// outside files on purpose, so it can still show when everything else is broken.
export function renderErrorPage(): string {
  const whatsapp = whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn’t load — ${company.name}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: flex; align-items: center; background: #002856; color: #f4f8fb; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
      main { width: 100%; max-width: 72rem; margin: 0 auto; padding: 4rem 1.25rem; }
      .brand { margin: 0 0 3rem; font: 600 1.125rem Georgia, "Times New Roman", serif; }
      .code { margin: 0; color: #5bdfe4; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
      h1 { margin: 1.25rem 0 0; max-width: 40rem; font: 600 clamp(2.25rem, 7vw, 3.75rem)/1.05 Georgia, "Times New Roman", serif; }
      p.message { margin: 1.5rem 0 0; max-width: 32rem; line-height: 1.8; color: rgba(244, 248, 251, 0.78); }
      .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; }
      .actions a, .actions button { display: inline-block; padding: 0.8rem 1.6rem; border-radius: 0.375rem; font: 600 0.875rem system-ui, sans-serif; text-decoration: none; cursor: pointer; border: 1px solid transparent; }
      .primary { background: #5bdfe4; color: #0b1f3a; }
      .secondary { background: transparent; color: #f4f8fb; border-color: rgba(244, 248, 251, 0.55) !important; }
      .help { margin-top: 2.5rem; font-size: 0.875rem; color: rgba(244, 248, 251, 0.68); }
      .help a { color: inherit; text-underline-offset: 4px; }
      a:focus-visible, button:focus-visible { outline: 2px solid #5bdfe4; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <p class="brand">${company.name}</p>
      <p class="code">Error 500</p>
      <h1>This page didn’t load.</h1>
      <p class="message">Something went wrong on our side. Try again, or go back to the home page.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go to home page</a>
      </div>
      <p class="help">Need help now? Call <a href="${company.phoneHref}">${company.phone}</a> or <a href="${whatsapp}">chat on WhatsApp</a>.</p>
    </main>
  </body>
</html>`;
}
