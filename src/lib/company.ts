// Company details live here so they are changed in one place.
// This file has no imports on purpose: the server error page uses it too,
// and an error page must never depend on anything that could fail to load.
// Leave `email` empty until the company has an official address; it is hidden while empty.
export type Company = {
  name: string;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  email: string;
};

export const company: Company = {
  name: "Mochris Ventures",
  phone: "+234 802 828 9087",
  phoneHref: "tel:+2348028289087",
  whatsappNumber: "2348028289087",
  address: "Plot 2A Garden Estate, Satellite Town, Lagos",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Plot%202A%20Garden%20Estate%2C%20Satellite%20Town%2C%20Lagos",
  email: "",
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
