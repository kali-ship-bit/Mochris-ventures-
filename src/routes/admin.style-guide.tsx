import { createFileRoute } from "@tanstack/react-router";
import { StyleGuide } from "@/components/admin/editors";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/style-guide")({
  head: () => adminHead("Style guide"),
  component: StyleGuide,
});
