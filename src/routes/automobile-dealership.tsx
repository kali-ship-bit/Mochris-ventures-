import { createFileRoute } from "@tanstack/react-router";
import { BusinessPage } from "@/components/page-sections";
import { getBusiness } from "@/lib/site-content";
export const Route = createFileRoute("/automobile-dealership")({
  head: () => ({
    meta: [
      { title: "Automobile Dealership — Mochris Ventures" },
      {
        name: "description",
        content:
          "Vehicle sales and dealership enquiries with Mochris Ventures. Tell us what you need and send an enquiry.",
      },
      { property: "og:title", content: "Mochris Ventures Automobile Dealership" },
      { property: "og:description", content: "Vehicle sales and dealership enquiries." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: getBusiness("/automobile-dealership").image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: getBusiness("/automobile-dealership").image },
    ],
  }),
  component: () => <BusinessPage business={getBusiness("/automobile-dealership")} />,
});
