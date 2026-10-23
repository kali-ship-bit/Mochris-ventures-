import { createFileRoute } from "@tanstack/react-router";
import { BusinessPage } from "@/components/page-sections";
import { getBusiness } from "@/lib/site-content";
export const Route = createFileRoute("/car-hire")({
  head: () => ({
    meta: [
      { title: "Bus & Car Hire — Mochris Ventures" },
      {
        name: "description",
        content:
          "Saloon cars, SUVs, buses and vans for hire from Mochris Ventures. Send your dates and vehicle preference in a hire enquiry.",
      },
      { property: "og:title", content: "Mochris Ventures Bus & Car Hire" },
      { property: "og:description", content: "Saloon cars, SUVs, buses and vans for hire." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: getBusiness("/car-hire").image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: getBusiness("/car-hire").image },
    ],
  }),
  component: () => <BusinessPage business={getBusiness("/car-hire")} />,
});
