import { CarFront, Leaf, Recycle, ShieldCheck, KeyRound, type LucideIcon } from "lucide-react";

import vehiclesImage from "@/assets/mochris-vehicles.jpg";
import agricultureImage from "@/assets/mochris-agriculture.jpg";
import scrapsImage from "@/assets/mochris-scraps.jpg";
import securityImage from "@/assets/mochris-security.jpg";

// Company details (phone, WhatsApp, address, email) now live in ./company.
export { company, whatsappUrl, type Company } from "./company";

export type Business = {
  name: string;
  shortName: string;
  path:
    | "/automobile-dealership"
    | "/agribusiness"
    | "/mechanical-scraps"
    | "/security-consulting"
    | "/car-hire";
  image: string;
  icon: LucideIcon;
  accent: string;
  eyebrow: string;
  description: string;
  intro: string;
  areas: { title: string; description: string }[];
};

export const businesses: Business[] = [
  {
    name: "Automobile Dealership",
    shortName: "Automobile",
    path: "/automobile-dealership",
    image: vehiclesImage,
    icon: CarFront,
    accent: "#1d5bd6",
    eyebrow: "Mobility solutions",
    description: "Vehicle sales and dealership enquiries.",
    intro:
      "Talk to the Mochris Ventures team about the vehicle you need, ask about availability and start a purchase enquiry.",
    areas: [
      {
        title: "Vehicle enquiries",
        description: "Tell us the kind of vehicle you are looking for and the team will respond.",
      },
      {
        title: "Availability and pricing",
        description: "Ask what is currently available and what it costs.",
      },
      {
        title: "Purchase discussions",
        description: "Talk through your budget, timing and requirements with the team.",
      },
    ],
  },
  {
    name: "Agribusiness",
    shortName: "Agribusiness",
    path: "/agribusiness",
    image: agricultureImage,
    icon: Leaf,
    accent: "#2f855a",
    eyebrow: "Agricultural enterprise",
    description: "Agricultural business enquiries and partnerships.",
    intro:
      "The Mochris Ventures agribusiness division is the place to discuss agricultural activities, supply and partnership opportunities.",
    areas: [
      {
        title: "Agricultural enquiries",
        description: "Ask about the agricultural products and services the company offers.",
      },
      {
        title: "Business partnerships",
        description:
          "Start a conversation about working with the company as a buyer, supplier or partner.",
      },
      {
        title: "Bulk and supply requests",
        description: "Describe the quantities and timing you need.",
      },
    ],
  },
  {
    name: "Mechanical Scraps",
    shortName: "Mechanical Scraps",
    path: "/mechanical-scraps",
    image: scrapsImage,
    icon: Recycle,
    accent: "#c26a12",
    eyebrow: "Industrial materials",
    description: "Mechanical scrap enquiries and supply.",
    intro:
      "Use this page to discuss mechanical scrap, material availability and supply arrangements with the Mochris Ventures team.",
    areas: [
      {
        title: "Material enquiries",
        description: "Describe the mechanical or industrial scrap you want to buy or supply.",
      },
      {
        title: "Collection and delivery",
        description: "Ask about arrangements for collection or delivery.",
      },
      { title: "Business supply", description: "Discuss regular or project-based requirements." },
    ],
  },
  {
    name: "Security Consulting",
    shortName: "Security",
    path: "/security-consulting",
    image: securityImage,
    icon: ShieldCheck,
    accent: "#b3382c",
    eyebrow: "Security advisory",
    description: "Security advice and consulting enquiries.",
    intro:
      "Talk to Mochris Ventures about your security needs, from risk and planning to practical advice.",
    areas: [
      {
        title: "Needs assessment",
        description: "A first conversation to understand your situation, priorities and concerns.",
      },
      {
        title: "Security planning",
        description: "Advice on planning security for your property or operations.",
      },
      {
        title: "Professional consultation",
        description: "Discuss the scope of the consulting support you need.",
      },
    ],
  },
  {
    name: "Bus & Car Hire",
    shortName: "Bus & Car Hire",
    path: "/car-hire",
    image: vehiclesImage,
    icon: KeyRound,
    accent: "#0e8f9b",
    eyebrow: "Flexible mobility",
    description: "Saloon cars, SUVs, buses and vans for hire, with value for your money.",
    intro:
      "Hire a saloon car, SUV, bus or van from Mochris Ventures. Send your dates, destination and vehicle preference for a tailored response.",
    areas: [
      { title: "Saloon cars", description: "Comfortable cars for personal and business trips." },
      { title: "SUVs", description: "Roomy and comfortable for longer journeys." },
      { title: "Buses and vans", description: "Flexible space for groups and small teams." },
    ],
  },
];

export function getBusiness(path: Business["path"]): Business {
  const business = businesses.find((item) => item.path === path);
  if (!business) throw new Error(`Missing business content for ${path}`);
  return business;
}
