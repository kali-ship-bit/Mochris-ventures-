import { Link } from "@tanstack/react-router";
import {
  Inbox,
  Package,
  Building2,
  ArrowUpRight,
  ChevronRight,
  Clock3,
  CheckCheck,
} from "lucide-react";
import { useAdmin } from "./store";
import { PageTitle, RequestRows } from "./shared";
import { Button } from "@/components/ui/button";
export function AdminHome() {
  const { requests, items } = useAdmin();
  const active = requests.filter((r) => !r.archived);
  return (
    <>
      <PageTitle title="Welcome back" subtitle="Friday, 23 October 2026" />
      <div className="mb-8 grid grid-cols-3 gap-3 lg:gap-5">
        {(
          [
            { status: "New", label: "New", icon: Inbox },
            { status: "Contacted", label: "Contacted", icon: Clock3 },
            { status: "Closed", label: "Closed", icon: CheckCheck },
          ] as const
        ).map((s) => (
          <Link
            key={s.status}
            to="/admin/requests"
            search={{ status: s.status }}
            className="admin-panel p-3 sm:p-5"
          >
            <span className="flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
              {s.label}
              <s.icon className="hidden size-4 sm:block" />
            </span>
            <span className="mt-3 block text-3xl font-semibold text-primary">
              {active.filter((r) => r.status === s.status).length}
            </span>
            <span className="mt-2 hidden text-xs text-muted-foreground sm:block">requests</span>
          </Link>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="admin-subheading">Latest requests</h2>
        <Button variant="ghost" asChild className="admin-link">
          <Link to="/admin/requests" search={{ status: "All" }}>
            View all
            <ChevronRight />
          </Link>
        </Button>
      </div>
      <RequestRows requests={active.slice(0, 5)} />
      <h2 className="admin-subheading mb-4 mt-8">Your workspace</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          {
            to: "/admin/requests" as const,
            icon: Inbox,
            title: "Requests",
            detail: `${active.filter((r) => r.status === "New").length} waiting for a reply`,
          },
          {
            to: "/admin/items" as const,
            icon: Package,
            title: "Items",
            detail: `${items.filter((i) => i.published).length} published items`,
          },
          {
            to: "/admin/company" as const,
            icon: Building2,
            title: "Company details",
            detail: "Contact details and owner profile",
          },
        ].map((s) => (
          <Link to={s.to} key={s.to} className="admin-panel flex min-h-24 items-center gap-4 p-5">
            <s.icon className="size-6 text-brand" />
            <div className="flex-1">
              <p className="font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
      <p className="mt-7 text-xs text-muted-foreground">
        Sample enquiries and items · Changes reset when this page is refreshed.
      </p>
    </>
  );
}
