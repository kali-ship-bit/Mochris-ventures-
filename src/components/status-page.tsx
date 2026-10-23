import type { ReactNode } from "react";

import logoImage from "@/assets/mochris-logo.jpg";
import { company, whatsappUrl } from "@/lib/company";

type StatusPageProps = {
  code: string;
  title: string;
  message: string;
  // Use true when the page replaces the whole site (no header or footer around it).
  fullScreen?: boolean;
  children: ReactNode;
};

// Shared layout for the 404 and 500 pages so both look like the rest of the site.
export function StatusPage({
  code,
  title,
  message,
  fullScreen = false,
  children,
}: StatusPageProps) {
  return (
    <section
      className={`flex items-center bg-primary text-primary-foreground ${fullScreen ? "min-h-screen" : "min-h-[60vh]"}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
        {fullScreen ? (
          <div className="mb-12 flex items-center gap-3">
            <img
              src={logoImage}
              alt=""
              className="h-12 w-12 rounded-sm object-cover"
              width={48}
              height={48}
            />
            <span className="font-display text-lg font-semibold">{company.name}</span>
          </div>
        ) : null}
        <p className="eyebrow text-accent">{code}</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl leading-8 text-primary-foreground/75">{message}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>
        <p className="mt-10 text-sm text-primary-foreground/65">
          Need help now? Call{" "}
          <a href={company.phoneHref} className="underline underline-offset-4 hover:text-accent">
            {company.phone}
          </a>{" "}
          or{" "}
          <a
            href={whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-accent"
          >
            chat on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
