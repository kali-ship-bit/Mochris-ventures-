import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";

import logoImage from "@/assets/mochris-logo.jpg";
import { businesses, company, whatsappUrl } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const businessLinks = businesses.filter((business) => business.path !== "/car-hire");

const navClass = "text-sm font-medium text-foreground/75 transition-colors hover:text-primary data-[status=active]:text-primary";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="h-1" style={{ background: "linear-gradient(90deg, #5bdfe4, #0b4fb8)" }} aria-hidden="true" />
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Mochris Ventures home">
          <img src={logoImage} alt="" className="h-12 w-12 shrink-0 rounded-sm object-cover" width={48} height={48} />
          <span className="truncate font-display text-lg font-semibold text-primary">Mochris Ventures</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <Link to="/" activeOptions={{ exact: true }} className={navClass}>Home</Link>
          <Link to="/about" className={navClass}>About Us</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto gap-1 p-0 text-sm font-medium text-foreground/75 shadow-none hover:bg-transparent hover:text-primary">
                Our Businesses <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64 border-border bg-popover p-2 shadow-xl">
              {businessLinks.map((business) => (
                <DropdownMenuItem key={business.path} asChild className="cursor-pointer px-3 py-2.5 focus:bg-secondary">
                  <Link to={business.path}>{business.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/car-hire" className={navClass}>Bus & Car Hire</Link>
          <Link to="/contact" className={navClass}>Contact Us</Link>
          <Button asChild size="lg"><a href={company.phoneHref}><Phone />Call us</a></Button>
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="w-[88%] border-border bg-background p-0">
              <SheetHeader className="border-b border-border px-6 py-7 text-left">
                <SheetTitle className="font-display text-xl text-primary">Mochris Ventures</SheetTitle>
                <SheetDescription>Navigate our company and business areas.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-4" aria-label="Mobile navigation">
                <MobileLink to="/">Home</MobileLink>
                <MobileLink to="/about">About Us</MobileLink>
                <p className="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Our businesses</p>
                {businesses.map((business) => <MobileLink key={business.path} to={business.path}>{business.name}</MobileLink>)}
                <MobileLink to="/contact">Contact Us</MobileLink>
                <SheetClose asChild><Button asChild size="lg" className="mt-5"><a href={company.phoneHref}><Phone />Call us</a></Button></SheetClose>
                <SheetClose asChild><Button asChild size="lg" variant="outline" className="mt-3"><a href={whatsappUrl(`Hello ${company.name}, I would like to make an enquiry.`)} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button></SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLink({ to, children }: { to: "/" | "/about" | "/automobile-dealership" | "/agribusiness" | "/mechanical-scraps" | "/security-consulting" | "/car-hire" | "/contact"; children: React.ReactNode }) {
  return <SheetClose asChild><Link to={to} className="border-b border-border/70 px-3 py-3.5 font-medium text-foreground/80 data-[status=active]:text-primary">{children}</Link></SheetClose>;
}
