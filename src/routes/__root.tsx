import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { company } from "../lib/company";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StatusPage } from "@/components/status-page";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <StatusPage
      code="Error 404"
      title="We can’t find that page."
      message="The link may be old or mistyped. Go back to the home page, or contact us and tell us what you were looking for."
    >
      <Button asChild size="lg" variant="hero">
        <Link to="/">Go to home page</Link>
      </Button>
      <Button asChild size="lg" variant="heroOutline">
        <Link to="/contact">Contact us</Link>
      </Button>
    </StatusPage>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  // This page replaces the whole site, so it avoids router links and uses plain ones.
  return (
    <StatusPage
      fullScreen
      code="Error 500"
      title="This page didn’t load."
      message="Something went wrong on our side. Try again, or go back to the home page."
    >
      <Button
        size="lg"
        variant="hero"
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Try again
      </Button>
      <Button asChild size="lg" variant="heroOutline">
        <a href="/">Go to home page</a>
      </Button>
    </StatusPage>
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 2A Garden Estate, Satellite Town",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Mochris Ventures" },
      { name: "theme-color", content: "#002856" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Admin pages carry their own layout (header, bottom navigation), so the
  // public site chrome is not rendered around them.
  const admin = useLocation({
    select: (location) => location.pathname === "/admin" || location.pathname.startsWith("/admin/"),
  });

  if (admin) return <Outlet />;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
