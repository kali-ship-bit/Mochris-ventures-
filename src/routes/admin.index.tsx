import { createFileRoute } from "@tanstack/react-router";
import { AdminHome } from "@/components/admin/home";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/")({
  head: () => adminHead("Home"),
  component: AdminHome,
});
