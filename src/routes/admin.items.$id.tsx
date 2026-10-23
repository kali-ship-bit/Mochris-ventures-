import { createFileRoute } from "@tanstack/react-router";
import { ItemEditor } from "@/components/admin/items";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/items/$id")({
  head: () => adminHead("Edit item"),
  component: EditItem,
});
function EditItem() {
  const { id } = Route.useParams();
  return <ItemEditor key={id} id={id} />;
}
