import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Archive,
  Trash2,
  Plus,
  Inbox,
} from "lucide-react";
import { toast } from "./toast";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./store";
import {
  PageTitle,
  RequestRows,
  EmptyState,
  BackLink,
  DivisionLabel,
  StatusChip,
  DeleteDialog,
  Field,
} from "./shared";
import { filterRequests, type Status } from "@/lib/admin/data";
export function RequestsList({ initialStatus = "New" }: { initialStatus?: string }) {
  const { requests } = useAdmin();
  const [status, setStatus] = useState(initialStatus);
  const [search, setSearch] = useState("");
  const rows = filterRequests(requests, status, search);
  return (
    <>
      <PageTitle title="Requests" subtitle="Customer enquiries across all five businesses." />
      <div className="admin-tabs mb-5" role="tablist" aria-label="Request status">
        {["New", "Contacted", "Closed", "All"].map((s) => (
          <Button
            variant="ghost"
            role="tab"
            aria-selected={status === s}
            data-active={status === s}
            key={s}
            onClick={() => setStatus(s)}
          >
            {s}
            <span className="ml-1 rounded-sm bg-secondary px-1.5 text-xs text-secondary-foreground">
              {filterRequests(requests, s, "").length}
            </span>
          </Button>
        ))}
      </div>
      <div className="relative mb-5 max-w-lg">
        <Search className="absolute left-4 top-4 size-5 text-muted-foreground" />
        <input
          className="!pl-12 !pr-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone"
          aria-label="Search requests"
        />
        {search && (
          <Button
            className="absolute right-0 top-0"
            size="icon"
            variant="ghost"
            aria-label="Clear search"
            onClick={() => setSearch("")}
          >
            <X />
          </Button>
        )}
      </div>
      <div className="mb-3 flex justify-between text-sm text-muted-foreground">
        <span>
          {rows.length} {rows.length === 1 ? "request" : "requests"}
        </span>
        <span>Newest first</span>
      </div>
      {rows.length ? (
        <RequestRows requests={rows} />
      ) : (
        <EmptyState
          title="No requests found"
          description={
            search
              ? "Try a different name or phone number."
              : `There are no ${status === "All" ? "" : status.toLowerCase()} requests right now.`
          }
        >
          {search && (
            <Button variant="outline" onClick={() => setSearch("")}>
              Clear search
            </Button>
          )}
        </EmptyState>
      )}
    </>
  );
}
function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
}
export function RequestDetail({ id }: { id: string }) {
  const { requests, setRequests } = useAdmin();
  const navigate = useNavigate();
  const request = requests.find((r) => r.id === id);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  if (!request)
    return (
      <EmptyState title="Request not found" description="This request may have been deleted.">
        <Button asChild>
          <Link to="/admin/requests" search={{ status: "All" }}>
            Back to requests
          </Link>
        </Button>
      </EmptyState>
    );
  const update = (patch: Partial<typeof request>) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  return (
    <>
      <BackLink to="/admin/requests" label="Requests" />
      <PageTitle
        title={request.name}
        subtitle={`${request.id} · ${request.time}`}
        action={<StatusChip status={request.status} />}
      />
      <div className="grid items-start gap-6 xl:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6">
          <section className="admin-panel p-5 sm:p-6">
            <h2 className="admin-subheading mb-5">Request details</h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-muted-foreground">Phone number</dt>
                <dd className="mt-1 font-semibold">
                  <a className="admin-link" href={`tel:+${phoneHref(request.phone)}`}>
                    {request.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Business</dt>
                <dd className="mt-2">
                  <DivisionLabel business={request.business} />
                </dd>
              </div>
              {request.email && (
                <div>
                  <dt className="text-sm text-muted-foreground">Email address</dt>
                  <dd className="mt-1 break-all">{request.email}</dd>
                </div>
              )}
              <div className="border-t pt-5">
                <dt className="mb-3 text-sm font-semibold">Message</dt>
                <dd className="leading-7">{request.message}</dd>
              </div>
            </dl>
            <div className="mt-6 grid gap-3">
              <Button asChild className="admin-whatsapp">
                <a
                  href={`https://wa.me/${phoneHref(request.phone)}?text=${encodeURIComponent(`Hello ${request.name.split(" ")[0]}, thank you for your enquiry to Mochris Ventures. `)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  Reply on WhatsApp
                </a>
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="outline">
                  <a href={`tel:+${phoneHref(request.phone)}`}>
                    <Phone />
                    Call
                  </a>
                </Button>
                {request.email ? (
                  <Button asChild variant="outline">
                    <a
                      href={`mailto:${request.email}?subject=${encodeURIComponent("Your Mochris Ventures enquiry")}`}
                    >
                      <Mail />
                      Reply by email
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" disabled title="No email address provided">
                    <Mail />
                    Reply by email
                  </Button>
                )}
              </div>
              {!request.email && (
                <p className="text-xs text-muted-foreground">No email address provided.</p>
              )}
            </div>
          </section>
          <div className="flex flex-wrap justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => {
                update({ archived: !request.archived });
                toast.success(request.archived ? "Request restored" : "Request archived");
                if (!request.archived)
                  navigate({ to: "/admin/requests", search: { status: "All" } });
              }}
            >
              <Archive />
              {request.archived ? "Restore request" : "Archive"}
            </Button>
            <Button variant="ghost" className="text-destructive" onClick={() => setConfirm(true)}>
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <section className="admin-panel p-5 sm:p-6">
            <Field label="Status">
              <select
                value={request.status}
                onChange={(e) => {
                  update({ status: e.target.value as Status });
                  toast.success("Status updated");
                }}
              >
                {["New", "Contacted", "Closed"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </section>
          <section className="admin-panel p-5 sm:p-6">
            <h2 className="admin-subheading mb-5">Notes</h2>
            {request.notes.length ? (
              <div className="mt-3">
                {request.notes.map((n, i) => (
                  <div className="admin-note" key={i}>
                    <p className="mb-2 text-xs text-muted-foreground">{n.time}</p>
                    <p className="leading-6">{n.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mb-6 text-sm text-muted-foreground">No notes yet.</p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!note.trim()) {
                  setError("Write a note before adding it.");
                  return;
                }
                update({
                  notes: [
                    ...request.notes,
                    {
                      text: note.trim(),
                      time: new Date().toLocaleString("en-NG", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      }),
                    },
                  ],
                });
                setNote("");
                setError("");
                toast.success("Note added");
              }}
            >
              <Field label="Add a note" error={error}>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Record a call, follow-up or next step…"
                />
              </Field>
              <Button className="mt-3" type="submit">
                <Plus />
                Add note
              </Button>
            </form>
          </section>
        </div>
      </div>
      <DeleteDialog
        open={confirm}
        onOpenChange={setConfirm}
        name="this request"
        onDelete={() => {
          setRequests((prev) => prev.filter((r) => r.id !== id));
          toast.success("Request deleted");
          navigate({ to: "/admin/requests", search: { status: "All" } });
        }}
      />
    </>
  );
}
