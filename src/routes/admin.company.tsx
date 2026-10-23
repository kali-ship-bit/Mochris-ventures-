import { createFileRoute } from "@tanstack/react-router";
import { CompanyEditor } from "@/components/admin/editors";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/company")({
  head: () => adminHead("Company details"),
  component: CompanyEditor,
});
