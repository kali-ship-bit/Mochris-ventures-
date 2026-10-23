import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Inbox, Upload, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "./toast";
import { division, type Request, type DivisionId } from "@/lib/admin/data";
export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="admin-heading">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-sm text-muted-foreground">{hint}</span>}
      {error && (
        <span role="alert" className="admin-error block">
          {error}
        </span>
      )}
    </label>
  );
}
export function StatusChip({ status }: { status: Request["status"] }) {
  return (
    <span className="admin-status" data-status={status}>
      {status}
    </span>
  );
}
export function DivisionLabel({ business }: { business: DivisionId }) {
  return (
    <span className="admin-division inline-flex items-center gap-2" data-division={business}>
      <span className="admin-dot" />
      {division(business).name}
    </span>
  );
}
export function RequestRows({
  requests,
  headers = true,
}: {
  requests: Request[];
  headers?: boolean;
}) {
  return (
    <div className="admin-panel overflow-hidden">
      {headers && (
        <div className="admin-request-row admin-request-labels">
          <span>Customer</span>
          <span>Business</span>
          <span>Received</span>
          <span>Status</span>
          <span />
        </div>
      )}
      {requests.map((r) => (
        <Link
          to="/admin/requests/$id"
          params={{ id: r.id }}
          className="admin-request-row"
          key={r.id}
        >
          <div className="admin-request-person flex min-w-0 items-center gap-3">
            <span className="admin-avatar">
              {r.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="font-semibold">{r.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.phone}</p>
            </div>
          </div>
          <div className="admin-request-business text-sm">
            <DivisionLabel business={r.business} />
          </div>
          <span className="admin-request-time text-sm text-muted-foreground">{r.time}</span>
          <div className="admin-request-status">
            <StatusChip status={r.status} />
          </div>
          <ChevronRight className="admin-request-arrow size-4 text-muted-foreground" />
        </Link>
      ))}
    </div>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="py-16 text-center">
      <Inbox className="mx-auto mb-4 size-9 text-muted-foreground" />
      <h2 className="admin-subheading">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
export function BackLink({
  to,
  label = "Back",
}: {
  to: "/admin/items" | "/admin/requests" | "/admin/company";
  label?: string;
}) {
  return (
    <Button variant="ghost" asChild className="mb-4 -ml-3 admin-link">
      <Link to={to}>
        <ArrowLeft />
        {label}
      </Link>
    </Button>
  );
}
export function PublishedSwitch({
  checked,
  onChange,
  label = "Published",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3">
      <span className="text-sm font-medium">{label}</span>
      <span className="flex min-h-12 min-w-12 items-center justify-end">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          onClick={() => onChange(!checked)}
          className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors"
          style={{ backgroundColor: checked ? "var(--admin-navy)" : "var(--admin-border)" }}
        >
          <span
            className="inline-block size-5 transform rounded-full bg-white transition-transform"
            style={{ transform: checked ? "translateX(24px)" : "translateX(4px)" }}
          />
        </button>
      </span>
    </label>
  );
}
export function PhotoUpload({
  image,
  onChange,
  label = "Photo",
}: {
  image: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="admin-photo">
        {image ? (
          <img src={image} alt={`${label} preview`} />
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-3 text-muted-foreground">
            <ImagePlus className="size-8" />
            <span>No photo selected</span>
          </div>
        )}
      </div>
      <input
        ref={input}
        className="hidden"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label={`Upload ${label.toLowerCase()}`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            toast.error("Choose a JPG, PNG or WebP image.");
            return;
          }
          if (file.size > 10 * 1024 * 1024) {
            toast.error("Choose a photo smaller than 10 MB.");
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") onChange(reader.result);
          };
          reader.readAsDataURL(file);
          e.target.value = "";
        }}
      />
      <div className="mt-3 flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={() => input.current?.click()}>
          <Upload />
          {image ? "Replace photo" : "Upload photo"}
        </Button>
        {image && (
          <Button type="button" variant="ghost" onClick={() => onChange("")}>
            <Trash2 />
            Remove
          </Button>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">JPG, PNG or WebP · Up to 10 MB</p>
    </div>
  );
}
export function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  name,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onDelete: () => void;
  name: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-theme max-w-[calc(100%-32px)] rounded-md sm:max-w-md">
        <DialogTitle className="admin-subheading">Delete {name}?</DialogTitle>
        <DialogDescription>
          This will remove it from this demo. This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function adminHead(title: string) {
  return {
    meta: [
      { title: `${title} — Mochris Ventures Admin` },
      { name: "description", content: `${title} for the Mochris Ventures owner dashboard.` },
      { property: "og:title", content: `${title} — Mochris Ventures Admin` },
      { property: "og:description", content: `Manage ${title.toLowerCase()} at Mochris Ventures.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}
