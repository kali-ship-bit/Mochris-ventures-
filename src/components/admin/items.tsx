import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Pencil, ImageIcon, Trash2, Check } from "lucide-react";
import { toast } from "./toast";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./store";
import {
  PageTitle,
  EmptyState,
  PublishedSwitch,
  BackLink,
  Field,
  PhotoUpload,
  DeleteDialog,
} from "./shared";
import { divisions, division, validateItem, type DivisionId, type Item } from "@/lib/admin/data";
export function ItemsList() {
  const { items, setItems } = useAdmin();
  const [business, setBusiness] = useState<DivisionId>("automobile");
  const rows = items.filter((i) => i.business === business);
  return (
    <>
      <PageTitle
        title="Items"
        subtitle="Manage the names, photos and availability on your website."
        action={
          <Button asChild>
            <Link to="/admin/items/new" search={{ business }}>
              <Plus />
              Add item
            </Link>
          </Button>
        }
      />
      <div className="admin-tabs mb-6" role="tablist" aria-label="Business division">
        {divisions.map((d) => (
          <Button
            variant="ghost"
            key={d.id}
            role="tab"
            aria-selected={business === d.id}
            data-active={business === d.id}
            onClick={() => setBusiness(d.id)}
          >
            <span className="admin-division" data-division={d.id}>
              <span className="admin-dot block" />
            </span>
            {d.short}
          </Button>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">{division(business).name}</h2>
        <span className="text-sm text-muted-foreground">{rows.length} items</span>
      </div>
      {rows.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((item) => (
            <article
              className="admin-panel admin-item admin-division"
              data-division={business}
              key={item.id}
            >
              <Link to="/admin/items/$id" params={{ id: item.id }} className="block">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                    <ImageIcon className="size-8 text-muted-foreground" />
                  </div>
                )}
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to="/admin/items/$id" params={{ id: item.id }} className="font-semibold">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.price || "No price set"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    title={`Edit ${item.name}`}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Link to="/admin/items/$id" params={{ id: item.id }}>
                      <Pencil />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 border-t pt-2">
                  <PublishedSwitch
                    checked={item.published}
                    onChange={(v) => {
                      setItems((prev) =>
                        prev.map((i) => (i.id === item.id ? { ...i, published: v } : i)),
                      );
                      toast.success(v ? "Item published" : "Item unpublished");
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No items yet" description="Add the first item for this business.">
          <Button asChild>
            <Link to="/admin/items/new" search={{ business }}>
              <Plus />
              Add item
            </Link>
          </Button>
        </EmptyState>
      )}
      <p className="mt-6 text-xs text-muted-foreground">
        Sample items and illustrative photos. Public website content is unchanged.
      </p>
    </>
  );
}
export function ItemEditor({
  id,
  business = "automobile",
}: {
  id?: string;
  business?: DivisionId;
}) {
  const { items, setItems } = useAdmin();
  const navigate = useNavigate();
  const existing = items.find((i) => i.id === id);
  const [draft, setDraft] = useState<Item>(
    existing ?? {
      id: "",
      business,
      name: "",
      description: "",
      price: "Call for price",
      image: "",
      published: false,
    },
  );
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [confirm, setConfirm] = useState(false);
  const patch = (p: Partial<Item>) => setDraft((d) => ({ ...d, ...p }));
  if (id && !existing)
    return (
      <EmptyState title="Item not found" description="This item may have been removed.">
        <Button asChild>
          <Link to="/admin/items">Back to items</Link>
        </Button>
      </EmptyState>
    );
  return (
    <>
      <BackLink to="/admin/items" label="Items" />
      <PageTitle title={id ? "Edit item" : "Add item"} subtitle={division(draft.business).name} />
      <form
        className="grid items-start gap-6 lg:grid-cols-[1fr_1.15fr]"
        onSubmit={(e) => {
          e.preventDefault();
          const next = validateItem(draft);
          setErrors(next);
          if (next.name || next.description) return;
          const saved = { ...draft, name: draft.name.trim(), id: id ?? `item-${Date.now()}` };
          setItems((prev) => (id ? prev.map((i) => (i.id === id ? saved : i)) : [...prev, saved]));
          toast.success("Saved");
          navigate({ to: "/admin/items" });
        }}
        noValidate
      >
        <section className="admin-panel p-5 sm:p-6">
          <PhotoUpload image={draft.image} onChange={(image) => patch({ image })} />
        </section>
        <section className="admin-panel space-y-5 p-5 sm:p-6">
          <Field label="Business">
            <select
              value={draft.business}
              onChange={(e) => patch({ business: e.target.value as DivisionId })}
            >
              {divisions.map((d) => (
                <option value={d.id} key={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Item name" error={errors.name}>
            <input
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="e.g. Toyota Corolla"
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
          <Field label="Short description" error={errors.description}>
            <textarea
              value={draft.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder="A short description of this item"
            />
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {draft.description.length}/240
            </span>
          </Field>
          <Field label="Price text">
            <input
              value={draft.price}
              onChange={(e) => patch({ price: e.target.value })}
              placeholder="Call for price"
            />
          </Field>
          <div className="border-y py-2">
            <PublishedSwitch
              checked={draft.published}
              onChange={(published) => patch({ published })}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">
              <Check />
              Save item
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/items">Cancel</Link>
            </Button>
            {id && (
              <Button
                type="button"
                variant="ghost"
                className="ml-auto text-destructive"
                onClick={() => setConfirm(true)}
                aria-label="Delete item"
                title="Delete item"
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </section>
      </form>
      <DeleteDialog
        open={confirm}
        onOpenChange={setConfirm}
        name="this item"
        onDelete={() => {
          setItems((prev) => prev.filter((i) => i.id !== id));
          toast.success("Item deleted");
          navigate({ to: "/admin/items" });
        }}
      />
    </>
  );
}
