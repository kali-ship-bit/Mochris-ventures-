import { createFileRoute } from "@tanstack/react-router";
import { ItemEditor } from "@/components/admin/items";
import { adminHead } from "@/components/admin/shared";
import { divisions, type DivisionId } from "@/lib/admin/data";
export const Route = createFileRoute("/admin/items/new")({
  head: () => adminHead("Add item"),
  validateSearch: (search: Record<string, unknown>) => {
    const business = search["business"];
    return {
      business: divisions.some((d) => d.id === business)
        ? (business as DivisionId)
        : ("automobile" as DivisionId),
    };
  },
  component: NewItem,
});
function NewItem() {
  const { business } = Route.useSearch();
  return <ItemEditor business={business} />;
}
