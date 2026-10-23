import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { z } from "zod";

import { businesses, company, whatsappUrl } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/page-sections";

const searchSchema = z.object({ service: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Contact Us — Mochris Ventures" }, { name: "description", content: "Contact Mochris Ventures about automobile dealing, agribusiness, mechanical scrap, security consulting or car hire." },
    { property: "og:title", content: "Contact Mochris Ventures" }, { property: "og:description", content: "Choose a business area and share your enquiry." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ContactPage,
});

type FormValues = { name: string; phone: string; business: string; message: string };
type FormErrors = { name?: string; phone?: string; business?: string; message?: string };
type Channel = "whatsapp" | "email";
type ContactItem = { Icon: typeof Phone; label: string; value: string; href: string; external: boolean };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number with at least 10 digits.";
  if (!values.business) errors.business = "Choose a business area.";
  if (!values.message.trim()) errors.message = "Write a short message.";
  return errors;
}

const emailEnabled = company.email !== "";

function mailtoUrl(values: FormValues): string {
  return `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${values.business}`)}&body=${encodeURIComponent(buildMessage(values))}`;
}

function buildMessage(values: FormValues): string {
  return [
    `Hello ${company.name}, I would like to make an enquiry.`,
    "",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Business: ${values.business}`,
    `Message: ${values.message.trim()}`,
  ].join("\n");
}

const contactItems: ContactItem[] = [
  { Icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref, external: false },
  { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us on WhatsApp", href: whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`), external: true },
  { Icon: MapPin, label: "Office address", value: company.address, href: company.mapsUrl, external: true },
  ...(company.email ? [{ Icon: Mail, label: "Email address", value: company.email, href: `mailto:${company.email}`, external: false }] : []),
];

function ContactPage() {
  const { service } = Route.useSearch();
  const initialBusiness = businesses.some((business) => business.name === service) ? (service ?? "") : "";
  const [values, setValues] = useState<FormValues>({ name: "", phone: "", business: initialBusiness, message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const link = whatsappUrl(buildMessage(values));
    setWhatsappLink(link);
    if (emailEnabled) setEmailLink(mailtoUrl(values));
    if (emailEnabled && channel === "email") {
      window.open(mailtoUrl(values), "_self");
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
    setSent(true);
  }

  return <>
    <section className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><p className="eyebrow text-accent">Contact us</p><h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">Start the right business conversation.</h1><p className="mt-6 max-w-xl leading-8 text-primary-foreground/70">Select a business and tell Mochris Ventures what you would like to discuss.</p></div></section>
    <section className="section-pad bg-secondary"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:px-8"><div><SectionHeading eyebrow="Contact details" title="We’re ready to hear from you." description="Call us, message us on WhatsApp or send an enquiry using the form." /><div className="mt-8 space-y-4">{contactItems.map((item) => <div key={item.label} className="flex gap-4 border-b border-border pb-4"><item.Icon className="size-5 shrink-0 text-accent-strong" /><div><p className="text-sm font-semibold">{item.label}</p><a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary">{item.value}</a></div></div>)}</div></div>
      <div className="bg-background p-6 shadow-sm sm:p-9"><h2 className="font-display text-2xl font-semibold">Business enquiry</h2>{sent ? <div className="mt-8 border border-accent bg-secondary p-7" role="status"><p className="font-display text-2xl font-semibold">Thank you. Your enquiry is ready to send.</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Your app should have opened with your message. If it did not, use a button below to send it.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><a href={whatsappLink} target="_blank" rel="noopener noreferrer">Open WhatsApp</a></Button>{emailLink ? <Button asChild variant="outline"><a href={emailLink}>Send by email</a></Button> : null}<Button variant="ghost" onClick={() => setSent(false)}>Back to form</Button></div></div> : <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate><Field label="Full name" error={errors.name}><Input name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={errors.name ? true : undefined} placeholder="Enter your name" className="h-12" /></Field><Field label="Phone number" error={errors.phone}><Input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={errors.phone ? true : undefined} placeholder="0801 234 5678" className="h-12" /></Field><Field label="Business area" wide error={errors.business}><select name="business" value={values.business} onChange={(event) => update("business", event.target.value)} aria-invalid={errors.business ? true : undefined} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option value="" disabled>Select a business area</option>{businesses.map((business) => <option key={business.path} value={business.name}>{business.name}</option>)}</select></Field><Field label="Your enquiry" wide error={errors.message}><Textarea name="message" value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={errors.message ? true : undefined} placeholder="Tell us what you would like to discuss" className="min-h-36" /></Field>{emailEnabled ? <fieldset className="grid gap-2 sm:col-span-2"><legend className="text-sm font-semibold">Send my enquiry by</legend><div className="mt-2 flex flex-wrap gap-3">{(["whatsapp", "email"] as const).map((option) => <label key={option} className={channel === option ? "flex cursor-pointer items-center gap-2 rounded-md border border-primary bg-secondary px-4 py-3 text-sm font-medium" : "flex cursor-pointer items-center gap-2 rounded-md border border-input px-4 py-3 text-sm font-medium"}><input type="radio" name="channel" value={option} checked={channel === option} onChange={() => setChannel(option)} className="size-4" />{option === "whatsapp" ? "WhatsApp" : "Email"}</label>)}</div></fieldset> : null}<div className="sm:col-span-2"><Button type="submit" size="lg">{emailEnabled && channel === "email" ? "Send by email" : "Send message"} <Send /></Button></div></form>}</div></div></section>
  </>;
}

function Field({ label, wide = false, error, children }: { label: string; wide?: boolean; error?: string | undefined; children: React.ReactNode }) { return <label className={wide ? "grid gap-2 sm:col-span-2" : "grid gap-2"}><span className="text-sm font-semibold">{label}</span>{children}{error ? <span role="alert" className="text-sm text-destructive">{error}</span> : null}</label>; }
