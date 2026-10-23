import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import logoImage from "@/assets/mochris-logo.jpg";
import { businesses, company, whatsappUrl } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div
        className="h-1"
        style={{ background: "linear-gradient(90deg, #5bdfe4, #0b4fb8)" }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt=""
              loading="lazy"
              className="h-14 w-14 rounded-sm object-cover"
              width={56}
              height={56}
            />
            <p className="font-display text-xl font-semibold">Mochris Ventures</p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/70">
            A multi-sector company connecting clients with automobile, agriculture, mechanical
            scrap, security consulting, and car-hire solutions.
          </p>
        </div>
        <FooterGroup
          title="Company"
          links={[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Contact Us", to: "/contact" },
          ]}
        />
        <FooterGroup
          title="Our Businesses"
          links={businesses.map((item) => ({ label: item.name, to: item.path }))}
        />
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/55">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <li>
              <a href={company.phoneHref} className="transition-colors hover:text-accent">
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {company.address}
              </a>
            </li>
            {company.email ? (
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">
                  {company.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link
              to="/privacy"
              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Privacy Policy
            </Link>
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/55">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/75 transition-colors hover:text-accent"
            >
              {link.label}
              <ArrowUpRight className="size-3" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
