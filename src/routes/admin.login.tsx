import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "@/components/admin/login";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/login")({
  head: () => adminHead("Sign in"),
  component: AdminLogin,
});
