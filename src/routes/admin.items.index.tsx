import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@/components/admin/items";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/items/")({
  head: () => adminHead("Items"),
  component: ItemsList,
});
