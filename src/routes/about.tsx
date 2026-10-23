import { createFileRoute } from "@tanstack/react-router";
import { Compass, Handshake, Scale, Sparkles } from "lucide-react";

import securityImage from "@/assets/mochris-security.jpg";
import agricultureImage from "@/assets/mochris-agriculture.jpg";
import { businesses } from "@/lib/site-content";
import { ContactCta, PageHero, SectionHeading } from "@/components/page-sections";

const values = [
  { icon: Compass, label: "Clarity", text: "Plain answers and a clear next step for every enquiry." },
  { icon: Handshake, label: "Customer focus", text: "We start by understanding what you need." },
  { icon: Scale, label: "Responsible practice", text: "Doing business properly and openly." },
  { icon: Sparkles, label: "Quality minded", text: "Care in the work we do for every client." },
];

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Mochris Ventures" }, { name: "description", content: "Learn about Mochris Ventures and its five businesses: automobile dealing, agribusiness, mechanical scrap, security consulting and car hire." },
    { property: "og:title", content: "About Mochris Ventures" }, { property: "og:description", content: "A Lagos company serving clients across five business areas." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: AboutPage,
});

function AboutPage() { return <>
  <PageHero eyebrow="About the company" title="One enterprise. Five focused business areas." description="Mochris Ventures brings several business interests together within a clear, professional company identity." image={securityImage} />
  <section className="section-pad bg-background"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8"><div><SectionHeading eyebrow="Company overview" title="Built to connect opportunity with practical business conversations." /><p className="mt-6 leading-8 text-muted-foreground">Mochris Ventures operates across automobile dealership, agribusiness, mechanical scraps, security consulting, and car hire. This website provides a structured introduction to each area and a direct way to enquire.</p></div><img src={agricultureImage} alt="Agricultural fieldwork" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" width={1400} height={1000} /></div></section>
  <section className="section-pad bg-secondary"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Our portfolio" title="Five divisions, clearly presented" /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{businesses.map((b) => <article key={b.path} className="border-t-4 bg-background p-6" style={{ borderTopColor: b.accent }}><b.icon className="size-7 text-accent-strong" /><h3 className="mt-5 font-display text-lg font-semibold">{b.name}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{b.description}</p></article>)}</div></div></section>
  <section className="section-pad bg-background"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Company values" title="A professional foundation for every division" center /><div className="mt-12 grid gap-8 md:grid-cols-4">{values.map(({ icon: Icon, label, text }) => <div key={label} className="text-center"><Icon className="mx-auto size-8 text-accent-strong" /><h3 className="mt-4 font-display text-xl font-semibold">{label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></div></section>
  <ContactCta />
</>; }
