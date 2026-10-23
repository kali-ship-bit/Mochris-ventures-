import { createFileRoute } from "@tanstack/react-router";
import { RequestsList } from "@/components/admin/requests";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/requests/")({
  head: () => adminHead("Requests"),
  validateSearch: (search: Record<string, unknown>) => {
    const status = search["status"];
    return {
      status:
        typeof status === "string" && ["New", "Contacted", "Closed", "All"].includes(status)
          ? status
          : "New",
    };
  },
  component: RequestsPage,
});
function RequestsPage() {
  const { status } = Route.useSearch();
  return <RequestsList initialStatus={status} />;
}
