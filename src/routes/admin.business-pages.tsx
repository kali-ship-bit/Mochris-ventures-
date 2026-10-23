import { createFileRoute } from "@tanstack/react-router";
import { BusinessPagesEditor } from "@/components/admin/editors";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/business-pages")({
  head: () => adminHead("Business pages"),
  component: BusinessPagesEditor,
});
