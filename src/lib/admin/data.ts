import vehicles from "@/assets/mochris-vehicles.jpg";
import agriculture from "@/assets/mochris-agriculture.jpg";
import scraps from "@/assets/mochris-scraps.jpg";
import security from "@/assets/mochris-security.jpg";

export const divisions = [
  { id: "automobile", name: "Automobile Dealership", short: "Automobile", image: vehicles },
  { id: "agriculture", name: "Agribusiness", short: "Agribusiness", image: agriculture },
  { id: "scraps", name: "Mechanical Scraps", short: "Scraps", image: scraps },
  { id: "security", name: "Security Consulting", short: "Security", image: security },
  { id: "hire", name: "Bus & Car Hire", short: "Bus & car hire", image: vehicles },
] as const;
export type DivisionId = (typeof divisions)[number]["id"];
export type Status = "New" | "Contacted" | "Closed";
export type Request = {
  id: string;
  name: string;
  phone: string;
  email: string;
  business: DivisionId;
  time: string;
  message: string;
  status: Status;
  archived: boolean;
  notes: { text: string; time: string }[];
};
export type Item = {
  id: string;
  business: DivisionId;
  name: string;
  description: string;
  price: string;
  image: string;
  published: boolean;
};
export type BusinessPage = {
  business: DivisionId;
  name: string;
  intro: string;
  image: string;
  services: { title: string; description: string }[];
};
export type CompanyDetails = {
  phone: string;
  whatsapp: string;
  address: string;
  email: string;
  registration: string;
  owner: string;
  title: string;
  photo: string;
};
export const initialCompany: CompanyDetails = {
  phone: "+234 802 828 9087",
  whatsapp: "2348028289087",
  address: "Plot 2A Garden Estate, Satellite Town, Lagos",
  email: "",
  registration: "",
  owner: "",
  title: "",
  photo: "",
};
export const initialRequests: Request[] = [
  {
    id: "MV-1024",
    name: "Adaeze Okafor",
    phone: "0803 123 4567",
    email: "adaeze@example.com",
    business: "hire",
    time: "Today, 10:42 am",
    message:
      "Good morning. I need a 14-seater bus for a wedding on 12 December. Pickup is in Surulere at 8 am, going to Lekki. Please let me know the cost and if a driver is included. Thank you.",
    status: "New",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1023",
    name: "Tunde Bello",
    phone: "0805 672 1190",
    email: "tunde@example.com",
    business: "automobile",
    time: "Today, 9:18 am",
    message:
      "I am looking for a Toyota Corolla, preferably 2015 or newer. My budget is ₦12 million. What do you have available?",
    status: "New",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1022",
    name: "Chiamaka Eze",
    phone: "0812 445 8901",
    email: "",
    business: "agriculture",
    time: "Today, 8:05 am",
    message:
      "I would like to discuss a supply partnership for my shop in Festac. Can we arrange a call this week?",
    status: "New",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1021",
    name: "Ibrahim Yusuf",
    phone: "0809 331 2084",
    email: "ibrahim@example.com",
    business: "security",
    time: "Yesterday, 4:30 pm",
    message:
      "We need a security assessment for our warehouse in Apapa. Please send details of your consultation process.",
    status: "Contacted",
    archived: false,
    notes: [
      {
        text: "Called Ibrahim. He will send the warehouse address on WhatsApp.",
        time: "Yesterday, 5:10 pm",
      },
    ],
  },
  {
    id: "MV-1020",
    name: "Funmilayo Adeyemi",
    phone: "0703 881 5620",
    email: "",
    business: "scraps",
    time: "Yesterday, 2:15 pm",
    message:
      "We have mechanical scrap from a workshop clearance in Ikeja. Are you available to discuss collection?",
    status: "New",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1019",
    name: "Emeka Nwosu",
    phone: "0806 220 4931",
    email: "emeka@example.com",
    business: "hire",
    time: "Yesterday, 11:20 am",
    message:
      "I need an SUV for a three-day business visit in Lagos next week. What are your hire rates?",
    status: "Contacted",
    archived: false,
    notes: [{ text: "Sent hire options. Waiting for travel dates.", time: "Yesterday, 12:00 pm" }],
  },
  {
    id: "MV-1018",
    name: "Aisha Mohammed",
    phone: "0816 908 3372",
    email: "",
    business: "automobile",
    time: "21 Oct, 3:40 pm",
    message: "Can I come to inspect the saloon cars on Saturday morning?",
    status: "Contacted",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1017",
    name: "Olumide Adebayo",
    phone: "0802 714 6059",
    email: "olumide@example.com",
    business: "agriculture",
    time: "21 Oct, 10:15 am",
    message:
      "Thank you for speaking with me about the partnership. I will be in touch when our order is ready.",
    status: "Closed",
    archived: false,
    notes: [
      {
        text: "Discussion complete. Customer will contact us for the next order.",
        time: "22 Oct, 9:00 am",
      },
    ],
  },
  {
    id: "MV-1016",
    name: "Ngozi Nnamdi",
    phone: "0706 449 8123",
    email: "",
    business: "hire",
    time: "20 Oct, 1:45 pm",
    message: "Thank you for confirming the bus for our team outing. Everything is sorted.",
    status: "Closed",
    archived: false,
    notes: [],
  },
  {
    id: "MV-1015",
    name: "Seyi Bakare",
    phone: "0807 556 0182",
    email: "",
    business: "scraps",
    time: "20 Oct, 8:30 am",
    message: "Please call me about a regular scrap supply arrangement for our workshop.",
    status: "New",
    archived: false,
    notes: [],
  },
];
export const initialItems: Item[] = [
  {
    id: "corolla",
    business: "automobile",
    name: "Toyota Corolla",
    description: "A comfortable saloon car for everyday journeys. Ask about available models.",
    price: "Call for price",
    image: vehicles,
    published: true,
  },
  {
    id: "suv",
    business: "automobile",
    name: "Family SUV",
    description: "Spacious vehicle options for family and business use.",
    price: "Call for price",
    image: vehicles,
    published: true,
  },
  {
    id: "saloon",
    business: "automobile",
    name: "Executive saloon",
    description: "Enquire about current saloon car availability.",
    price: "Call for price",
    image: vehicles,
    published: false,
  },
  {
    id: "supply",
    business: "agriculture",
    name: "Agricultural supply enquiry",
    description: "Discuss quantities, timing and availability with our team.",
    price: "Request a quote",
    image: agriculture,
    published: true,
  },
  {
    id: "partnership",
    business: "agriculture",
    name: "Supply partnerships",
    description: "Talk to us about a regular supply partnership.",
    price: "Contact us",
    image: agriculture,
    published: true,
  },
  {
    id: "workshop",
    business: "scraps",
    name: "Workshop scrap",
    description: "Enquiries about mechanical materials and workshop clearances.",
    price: "Call for price",
    image: scraps,
    published: true,
  },
  {
    id: "industrial",
    business: "scraps",
    name: "Industrial scrap enquiry",
    description: "Discuss project-based material requirements.",
    price: "Request a quote",
    image: scraps,
    published: false,
  },
  {
    id: "assessment",
    business: "security",
    name: "Security assessment",
    description: "A consultation about your property and priorities.",
    price: "Request a consultation",
    image: security,
    published: true,
  },
  {
    id: "planning",
    business: "security",
    name: "Security planning",
    description: "Practical planning discussions for your operations.",
    price: "Contact us",
    image: security,
    published: true,
  },
  {
    id: "bus",
    business: "hire",
    name: "14-seater bus hire",
    description: "Group travel for weddings, outings and team trips.",
    price: "Request a quote",
    image: vehicles,
    published: true,
  },
  {
    id: "suv-hire",
    business: "hire",
    name: "SUV hire",
    description: "Comfortable travel for personal and business journeys.",
    price: "Call for price",
    image: vehicles,
    published: true,
  },
];
export const initialPages: BusinessPage[] = divisions.map((d) => ({
  business: d.id,
  name: d.name,
  intro:
    d.id === "hire"
      ? "Hire a saloon car, SUV, bus or van from Mochris Ventures. Send your dates, destination and vehicle preference for a tailored response."
      : `Talk to the Mochris Ventures team about ${d.name.toLowerCase()} enquiries and opportunities.`,
  image: d.image,
  services: (d.id === "hire"
    ? ["Saloon cars", "SUVs", "Buses and vans"]
    : d.id === "automobile"
      ? ["Vehicle enquiries", "Availability and pricing", "Purchase discussions"]
      : d.id === "agriculture"
        ? ["Agricultural enquiries", "Business partnerships", "Bulk and supply requests"]
        : d.id === "scraps"
          ? ["Material enquiries", "Collection and delivery", "Business supply"]
          : ["Needs assessment", "Security planning", "Professional consultation"]
  ).map((title) => ({
    title,
    description: "Describe your requirements and discuss the options with our team.",
  })),
}));
export function division(id: DivisionId) {
  return divisions.find((d) => d.id === id) ?? divisions[0];
}
export function filterRequests(requests: Request[], status: string, search: string) {
  const term = search.trim().toLowerCase();
  const digits = term.replace(/\D/g, "");
  return requests.filter(
    (r) =>
      !r.archived &&
      (status === "All" || r.status === status) &&
      (!term ||
        r.name.toLowerCase().includes(term) ||
        (digits.length > 0 && r.phone.replace(/\D/g, "").includes(digits))),
  );
}
export function validateItem(item: Pick<Item, "name" | "description">) {
  return {
    name: item.name.trim() ? "" : "Enter an item name.",
    description:
      item.description.length > 240 ? "Keep the description to 240 characters or fewer." : "",
  };
}
export function validateCompany(company: CompanyDetails) {
  return {
    phone:
      company.phone.replace(/\D/g, "").length >= 10
        ? ""
        : "Enter a phone number with at least 10 digits.",
    whatsapp:
      company.whatsapp.replace(/\D/g, "").length >= 10
        ? ""
        : "Enter a WhatsApp number with at least 10 digits.",
    email:
      !company.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email)
        ? ""
        : "Enter a valid email address.",
  };
}
