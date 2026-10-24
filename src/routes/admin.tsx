import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/layout";

// The dashboard is a front-end demo: the sign-in is not real and the data is sample data.
// Until a real login and database exist it must not open on a live site, so every
// /admin page returns the normal 404 unless VITE_ADMIN_DEMO is set to "true"
// (for example only on a private preview deployment).
const adminDemoEnabled = import.meta.env["VITE_ADMIN_DEMO"] === "true";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (!adminDemoEnabled) throw notFound();
  },
  component: AdminLayout,
});
