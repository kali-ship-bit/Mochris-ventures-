import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

import vehiclesImage from "@/assets/mochris-vehicles.jpg";
import agricultureImage from "@/assets/mochris-agriculture.jpg";
import securityImage from "@/assets/mochris-security.jpg";
import { businesses, company, whatsappUrl } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { ContactCta, SectionHeading } from "@/components/page-sections";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Mochris Ventures — Five Businesses in Lagos, Nigeria" },
    { name: "description", content: "Mochris Ventures is a Lagos company with five businesses: automobile dealing, agribusiness, mechanical scrap, security consulting and car hire." },
    { property: "og:title", content: "Mochris Ventures — Five Businesses in Lagos, Nigeria" },
    { property: "og:description", content: "Automobile dealing, agribusiness, mechanical scrap, security consulting and car hire from one company in Lagos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-primary text-primary-foreground">
        <img src={vehiclesImage} alt="Executive vehicles outside a modern business centre" className="absolute inset-0 h-full w-full object-cover object-center" width={1600} height={1000} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-5 pb-14 pt-28 lg:px-8 lg:pb-20">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow text-accent">Lagos, Nigeria</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.03] sm:text-6xl lg:text-7xl">Five businesses. One company.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80 sm:text-lg">Mochris Ventures brings automobile dealing, agribusiness, mechanical scrap, security consulting and car hire together under one name. Choose the one you need.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" variant="hero"><a href="#businesses">Explore Our Businesses <ArrowRight /></a></Button><Button asChild size="lg" variant="heroOutline"><a href={company.phoneHref}><Phone />Call {company.phone}</a></Button></div>
          </div>
        </div>
      </section>

      <section className="bg-brand text-brand-foreground" aria-label="Company at a glance"><div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 lg:px-8">{[
        { label: "Divisions", value: "Five businesses", href: "#businesses", external: false },
        { label: "Office", value: company.address, href: company.mapsUrl, external: true },
        { label: "Call", value: company.phone, href: company.phoneHref, external: false },
        { label: "WhatsApp", value: "Chat with us", href: whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`), external: true },
      ].map((item) => <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="flex flex-col gap-1 border-b border-brand-foreground/15 px-5 py-5 transition-colors hover:bg-white/5 lg:border-b-0 lg:border-l lg:first:border-l-0"><span className="text-xs font-semibold text-brand-foreground/65">{item.label}</span><span className="text-sm font-semibold sm:text-base">{item.value}</span></a>)}</div></section>

      <section className="section-pad bg-background"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div className="relative"><img src={agricultureImage} alt="Agricultural professionals inspecting crops" loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]" width={1400} height={1000} /><div className="absolute -bottom-5 right-0 bg-accent px-6 py-5 text-accent-foreground sm:right-6"><p className="eyebrow">Five business areas</p></div></div><div><SectionHeading eyebrow="About Mochris Ventures" title="A diversified company with a clear, professional approach." description="Mochris Ventures operates across five distinct sectors, providing one recognisable point of contact for clients, partners, and organisations with varied needs." /><p className="mt-5 leading-7 text-muted-foreground">From mobility and agriculture to industrial materials and security advisory, each division is designed to make business enquiries direct and understandable.</p><Button asChild variant="outline" size="lg" className="mt-7"><Link to="/about">Learn More <ArrowRight /></Link></Button></div></div></section>

      <section id="businesses" className="section-pad bg-secondary scroll-mt-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Our businesses" title="Capability across essential sectors" description="Explore each division and use its dedicated page to make a focused enquiry." /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{businesses.map((business, index) => <article key={business.path} className={index === 0 || index === 4 ? "group relative min-h-[430px] overflow-hidden lg:col-span-2" : "group relative min-h-[430px] overflow-hidden"}><img src={business.image} alt={business.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" width={1400} height={1000} /><div className="absolute inset-0 bg-card-overlay" /><div className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: business.accent }} aria-hidden="true" /><div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground sm:p-8"><business.icon className="size-7 text-accent" /><h3 className="mt-4 font-display text-2xl font-semibold">{business.name}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-primary-foreground/75">{business.description}</p><Button asChild variant="link" className="mt-4 h-auto p-0 text-accent"><Link to={business.path}>Explore More <ArrowRight /></Link></Button></div></article>)}</div></div></section>

      <section className="overflow-hidden bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl lg:grid-cols-2"><img src={vehiclesImage} alt="Modern vehicles available for car hire enquiries" loading="lazy" className="h-full min-h-[360px] w-full object-cover" width={1600} height={1000} /><div className="flex items-center px-5 py-16 lg:px-16"><div><p className="eyebrow text-accent">Bus &amp; car hire</p><h2 className="mt-4 font-display text-4xl font-semibold">Hire a car, SUV, bus or van.</h2><p className="mt-5 leading-8 text-primary-foreground/70">Saloon cars, SUVs, buses and vans for hire, with value for your money.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild variant="hero" size="lg"><Link to="/car-hire">See vehicles</Link></Button><Button asChild variant="heroOutline" size="lg"><Link to="/contact" search={{ service: "Bus & Car Hire" }}>Make an Enquiry</Link></Button></div></div></div></div></section>
      <ContactCta />
    </>
  );
}
