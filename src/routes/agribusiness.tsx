import { createFileRoute } from "@tanstack/react-router";
import { BusinessPage } from "@/components/page-sections";
import { getBusiness } from "@/lib/site-content";
export const Route = createFileRoute("/agribusiness")({
  head: () => ({
    meta: [
      { title: "Agribusiness — Mochris Ventures" },
      {
        name: "description",
        content:
          "Agricultural business enquiries and partnerships with Mochris Ventures. Tell us what you need and send an enquiry.",
      },
      { property: "og:title", content: "Mochris Ventures Agribusiness" },
      { property: "og:description", content: "Agricultural business enquiries and partnerships." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: getBusiness("/agribusiness").image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: getBusiness("/agribusiness").image },
    ],
  }),
  component: () => <BusinessPage business={getBusiness("/agribusiness")} />,
});
