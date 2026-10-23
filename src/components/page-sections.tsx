import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ImagePlus, Phone } from "lucide-react";

import { company, type Business } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  service,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  // Business name to preselect on the contact form. Only business pages pass
  // this; other pages (e.g. About) must not send their page title as a service.
  service?: string;
}) {
  return (
    <section className="relative isolate min-h-[500px] overflow-hidden bg-primary text-primary-foreground">
      <img
        src={image}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={1000}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-5 pb-16 pt-28 lg:px-8 lg:pb-20">
        <div className="max-w-3xl animate-rise">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80 sm:text-lg">
            {description}
          </p>
          <Button asChild size="lg" variant="hero" className="mt-8">
            <Link to="/contact" search={service ? { service } : {}}>
              Make an enquiry <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      <h2
        className={
          eyebrow
            ? "mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            : "font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
        }
      >
        {title}
      </h2>
      {description && <p className="mt-5 leading-7 text-muted-foreground">{description}</p>}
    </div>
  );
}

export function BusinessGallery({ business }: { business: Business }) {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={`${business.name} in pictures`}
          description="A look at the work. Empty spaces are kept for new pictures, which are added as they become available."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {business.gallery.map((photo, index) =>
            photo.src ? (
              <figure
                key={photo.caption}
                className={
                  index === 0
                    ? "relative overflow-hidden bg-card shadow-sm sm:col-span-2"
                    : "relative overflow-hidden bg-card shadow-sm"
                }
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-white">
                  {photo.caption}
                </figcaption>
              </figure>
            ) : (
              <div
                key={photo.caption}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-secondary/60 px-6 text-center"
              >
                <ImagePlus className="size-8 text-muted-foreground" aria-hidden="true" />
                <p className="font-display text-base font-semibold text-foreground">
                  {photo.caption}
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Photo coming soon
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function BusinessPage({ business }: { business: Business }) {
  return (
    <>
      <PageHero
        eyebrow={business.eyebrow}
        title={business.name}
        description={business.intro}
        image={business.image}
        service={business.name}
      />
      <div className="h-1.5" style={{ backgroundColor: business.accent }} aria-hidden="true" />
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            title="Start with the area closest to your need"
            description="Pick the topic nearest to what you need, then send an enquiry. The team will reply with the next step."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {business.areas.map((area, index) => (
              <article
                key={area.title}
                className="border-t-4 bg-card p-7 shadow-sm"
                style={{ borderTopColor: business.accent }}
              >
                <span className="font-display text-3xl text-primary/25">0{index + 1}</span>
                <h3 className="mt-7 font-display text-xl font-semibold">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BusinessGallery business={business} />
      <section className="section-pad bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              title="Tell us what you need"
              description="Choose this business on the contact page, share a few details, and the team will get back to you."
            />
            <ul className="mt-7 space-y-4">
              {[
                "Select the relevant business area",
                "Describe your requirement or question",
                "Add your phone number so we can reach you",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary p-8 text-primary-foreground sm:p-10">
            <p className="eyebrow text-accent">Enquire now</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">
              Start {/^[aeiou]/i.test(business.shortName) ? "an" : "a"}{" "}
              {business.shortName.toLowerCase()} conversation.
            </h2>
            <p className="mt-4 leading-7 text-primary-foreground/70">
              Send an enquiry online or call us directly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact" search={{ service: business.name }}>
                  Open enquiry form <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <a href={company.phoneHref}>
                  <Phone />
                  Call {company.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactCta() {
  return (
    <section className="bg-accent">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="eyebrow text-accent-foreground/65">Let’s talk</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-accent-foreground">
            Have an enquiry for Mochris Ventures?
          </h2>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/contact">
            Contact Us <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
