import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { company } from "@/lib/company";

const lastUpdated = "23 October 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Mochris Ventures" },
      {
        name: "description",
        content:
          "How Mochris Ventures handles the details you share when you send an enquiry, including cookies and third-party services.",
      },
      { property: "og:title", content: "Privacy Policy — Mochris Ventures" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-4 leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="eyebrow text-accent">Legal</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-xl leading-8 text-primary-foreground/75">
            What we collect when you contact us, how we use it, and the choices you have. Last
            updated {lastUpdated}.
          </p>
        </div>
      </section>

      <article className="section-pad bg-background">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Section title="Who we are">
            <p>
              {company.name} is a company based in Lagos, Nigeria. This website presents our
              business areas and lets you send us an enquiry. In this policy, “we” and “us” mean{" "}
              {company.name}.
            </p>
          </Section>

          <Section title="What we collect">
            <p>We only collect what you choose to type into the enquiry form:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>your name</li>
              <li>your phone number</li>
              <li>your email address, if you choose to give it</li>
              <li>the business area you are asking about</li>
              <li>the message you write</li>
            </ul>
            <p>
              There are no user accounts on this website, and we do not ask for payment details.
            </p>
          </Section>

          <Section title="How the enquiry form works">
            <p>
              The form does not send your details to our servers. It prepares your message and opens
              WhatsApp or your email app, and you choose whether to send it. Once you send it,
              WhatsApp or your email provider handles the message under their own privacy policies.
            </p>
          </Section>

          <Section title="How we use your details">
            <ul className="list-disc space-y-2 pl-6">
              <li>to reply to your enquiry and discuss what you need</li>
              <li>to keep a record of the conversation for our business</li>
            </ul>
            <p>We do not sell your details, and we do not share them with others for marketing.</p>
          </Section>

          <Section title="Cookies and tracking">
            <p>
              This website does not set cookies and does not use analytics or advertising tools. If
              that changes, we will update this page and ask for your consent where the law requires
              it.
            </p>
          </Section>

          <Section title="Other services this website uses">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-foreground">Google Fonts.</strong> Your
                browser loads our fonts from Google, which means Google receives your IP address and
                basic browser details.
              </li>
              <li>
                <strong className="font-semibold text-foreground">WhatsApp and email.</strong> Used
                only when you choose to send an enquiry or tap a contact link.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Google Maps.</strong> Opened only
                when you tap the address link.
              </li>
            </ul>
            <p>
              These services have their own privacy policies, and we do not control how they use
              data.
            </p>
          </Section>

          <Section title="How long we keep your details">
            <p>
              We keep enquiry messages only for as long as we need them to deal with your request
              and to keep proper business records. You can ask us to delete your messages at any
              time.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under the Nigeria Data Protection Act 2023, you can ask us to show you the personal
              data we hold about you, correct it, or delete it, and you can object to how we use it.
              If you are unhappy with how we handle your data, you can complain to the Nigeria Data
              Protection Commission.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This website is for businesses and adults. We do not knowingly collect details from
              children.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change how we handle your details, we will update this page and the date at the
              top.
            </p>
          </Section>

          <Section title="Contact us">
            <p>To ask about your data or this policy, contact us:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Phone:{" "}
                <a
                  href={company.phoneHref}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {company.phone}
                </a>
              </li>
              {company.email ? (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {company.email}
                  </a>
                </li>
              ) : null}
              <li>Address: {company.address}</li>
            </ul>
          </Section>
        </div>
      </article>
    </>
  );
}
