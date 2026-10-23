import { createFileRoute } from "@tanstack/react-router";
import { RequestDetail } from "@/components/admin/requests";
import { adminHead } from "@/components/admin/shared";
export const Route = createFileRoute("/admin/requests/$id")({
  head: () => adminHead("Request details"),
  component: DetailPage,
});
function DetailPage() {
  const { id } = Route.useParams();
  return <RequestDetail key={id} id={id} />;
}
