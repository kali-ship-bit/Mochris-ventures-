import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  Home,
  Inbox,
  Package,
  Building2,
  PanelsTopLeft,
  ArrowUpRight,
  LogOut,
  Palette,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/mochris-logo.jpg";
import { AdminProvider } from "./store";
import { Button } from "@/components/ui/button";
import { AdminToaster } from "./toast";
import "./admin.css";
const nav = [
  { to: "/admin", label: "Home", icon: Home },
  { to: "/admin/requests", label: "Requests", icon: Inbox },
  { to: "/admin/items", label: "Items", icon: Package },
  { to: "/admin/business-pages", label: "Business pages", icon: PanelsTopLeft },
  { to: "/admin/company", label: "Company details", icon: Building2 },
] as const;
export function AdminLayout() {
  const path = useLocation({ select: (l) => l.pathname });
  const login = path === "/admin/login";
  const active = (to: string) =>
    to === "/admin" ? path === "/admin" || path === "/admin/" : path.startsWith(to);
  const current = nav.find((n) => active(n.to));
  return (
    <AdminProvider>
      <div className="admin-theme">
        {login ? (
          <Outlet />
        ) : (
          <div className="admin-shell">
            <aside className="admin-sidebar">
              <Link to="/admin" className="mb-7 !p-0">
                <img
                  src={logo}
                  alt="Mochris Ventures"
                  className="h-14 w-14 rounded-md object-cover"
                />
                <span className="text-sm font-semibold">
                  Mochris Ventures
                  <span className="mt-1 block text-xs font-normal text-primary-foreground/70">
                    Owner dashboard
                  </span>
                </span>
              </Link>
              <nav className="space-y-2">
                {nav.map((n) => (
                  <Link key={n.to} to={n.to} data-active={active(n.to)}>
                    <n.icon className="size-5" />
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-2 border-t border-primary-foreground/15 pt-5">
                <Link to="/admin/style-guide">
                  <Palette className="size-5" />
                  Style guide
                </Link>
                <Link to="/">
                  <ArrowUpRight className="size-5" />
                  View website
                </Link>
                <Link to="/admin/login">
                  <LogOut className="size-5" />
                  Sign out
                </Link>
                <p className="px-3 pt-3 text-xs text-primary-foreground/65">Demo workspace</p>
              </div>
            </aside>
            <div className="admin-main">
              <header className="admin-topbar">
                <div className="admin-mobile-brand flex items-center gap-3">
                  <img src={logo} alt="Mochris Ventures" className="size-10 rounded-md" />
                  <span className="text-sm font-semibold">Mochris Ventures</span>
                </div>
                <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
                  Workspace
                  <ChevronRight className="size-4" />
                  <span className="font-semibold text-foreground">
                    {current?.label ?? "Style guide"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="admin-demo">Demo</span>
                  <span className="hidden text-sm lg:block">Owner</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden lg:inline-flex"
                    title="Sign out"
                    aria-label="Sign out"
                    asChild
                  >
                    <Link to="/admin/login">
                      <LogOut />
                    </Link>
                  </Button>
                </div>
              </header>
              <main className="admin-content">
                <Outlet />
              </main>
            </div>
            <nav className="admin-bottom" aria-label="Admin navigation">
              {nav
                .filter((n) => n.to !== "/admin/business-pages")
                .map((n) => (
                  <Link to={n.to} key={n.to} data-active={active(n.to)}>
                    <n.icon className="size-5" />
                    {n.to === "/admin/company" ? "Company" : n.label}
                  </Link>
                ))}
            </nav>
          </div>
        )}
        <AdminToaster />
      </div>
    </AdminProvider>
  );
}
