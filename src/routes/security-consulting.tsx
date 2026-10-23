import { createFileRoute } from "@tanstack/react-router";
import { BusinessPage } from "@/components/page-sections";
import { getBusiness } from "@/lib/site-content";
export const Route = createFileRoute("/security-consulting")({
  head: () => ({
    meta: [
      { title: "Security Consulting — Mochris Ventures" },
      {
        name: "description",
        content:
          "Security advice and consulting enquiries with Mochris Ventures. Talk to us about your security needs.",
      },
      { property: "og:title", content: "Mochris Ventures Security Consulting" },
      { property: "og:description", content: "Security advice and consulting enquiries." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: getBusiness("/security-consulting").image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: getBusiness("/security-consulting").image },
    ],
  }),
  component: () => <BusinessPage business={getBusiness("/security-consulting")} />,
});
