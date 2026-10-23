import { createFileRoute } from "@tanstack/react-router";
import { BusinessPage } from "@/components/page-sections";
import { getBusiness } from "@/lib/site-content";
export const Route = createFileRoute("/mechanical-scraps")({ head: () => ({ meta: [{ title: "Mechanical Scraps — Mochris Ventures" }, { name: "description", content: "Mechanical scrap enquiries and supply with Mochris Ventures. Describe what you need and send an enquiry." }, { property: "og:title", content: "Mochris Ventures Mechanical Scraps" }, { property: "og:description", content: "Mechanical scrap enquiries and supply." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <BusinessPage business={getBusiness("/mechanical-scraps")} /> });
