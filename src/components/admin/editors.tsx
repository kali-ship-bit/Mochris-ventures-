import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, PanelsTopLeft, ArrowUpRight } from "lucide-react";
import { toast } from "./toast";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./store";
import { PageTitle, Field, PhotoUpload } from "./shared";
import { divisions, validateCompany, type DivisionId, type BusinessPage } from "@/lib/admin/data";
export function BusinessPagesEditor() {
  const { pages, setPages } = useAdmin();
  const [selected, setSelected] = useState<DivisionId>("automobile");
  const initial = pages.find((p) => p.business === selected) ?? pages[0];
  const [draft, setDraft] = useState<BusinessPage>(
    initial ?? { business: "automobile", name: "", intro: "", image: "", services: [] },
  );
  const [error, setError] = useState("");
  const patch = (p: Partial<BusinessPage>) => setDraft((d) => ({ ...d, ...p }));
  function change(id: DivisionId) {
    const page = pages.find((p) => p.business === id);
    if (page) {
      setSelected(id);
      setDraft(page);
      setError("");
    }
  }
  return (
    <>
      <PageTitle
        title="Business pages"
        subtitle="Edit the introduction, photos and service blocks for each division."
      />
      <div className="admin-tabs mb-6" role="tablist" aria-label="Business pages">
        {divisions.map((d) => (
          <Button
            variant="ghost"
            role="tab"
            aria-selected={selected === d.id}
            data-active={selected === d.id}
            key={d.id}
            onClick={() => change(d.id)}
          >
            {d.short}
          </Button>
        ))}
      </div>
      <form
        className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.name.trim()) {
            setError("Enter a business name.");
            return;
          }
          setPages((prev) => prev.map((p) => (p.business === selected ? draft : p)));
          setError("");
          toast.success("Saved");
        }}
        noValidate
      >
        <section className="admin-panel space-y-5 p-5 sm:p-6">
          <h2 className="admin-subheading">Page details</h2>
          <Field label="Business name" error={error}>
            <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} />
          </Field>
          <Field label="Introduction">
            <textarea
              className="!min-h-36"
              value={draft.intro}
              onChange={(e) => patch({ intro: e.target.value })}
            />
          </Field>
          <PhotoUpload
            image={draft.image}
            label="Hero photo"
            onChange={(image) => patch({ image })}
          />
        </section>
        <section className="admin-panel p-5 sm:p-6">
          <h2 className="admin-subheading mb-5">Service blocks</h2>
          <div className="space-y-6">
            {draft.services.map((s, i) => (
              <div className={i ? "border-t pt-6" : ""} key={i}>
                <p className="mb-4 text-sm font-semibold text-brand">Service {i + 1}</p>
                <div className="space-y-4">
                  <Field label="Title">
                    <input
                      value={s.title}
                      onChange={(e) =>
                        patch({
                          services: draft.services.map((b, j) =>
                            j === i ? { ...b, title: e.target.value } : b,
                          ),
                        })
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      value={s.description}
                      onChange={(e) =>
                        patch({
                          services: draft.services.map((b, j) =>
                            j === i ? { ...b, description: e.target.value } : b,
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <Button type="submit" className="mt-6 w-full sm:w-auto">
            <Check />
            Save changes
          </Button>
        </section>
      </form>
    </>
  );
}
export function CompanyEditor() {
  const { company, setCompany } = useAdmin();
  const [draft, setDraft] = useState(company);
  const [errors, setErrors] = useState({ phone: "", whatsapp: "", email: "" });
  return (
    <>
      <PageTitle title="Company details" subtitle="Your contact information and owner profile." />
      <form
        className="grid items-start gap-6 lg:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const next = validateCompany(draft);
          setErrors(next);
          if (Object.values(next).some(Boolean)) return;
          setCompany(draft);
          toast.success("Saved");
        }}
        noValidate
      >
        <section className="admin-panel space-y-5 p-5 sm:p-6">
          <h2 className="admin-subheading">Contact information</h2>
          <Field label="Phone number" error={errors.phone}>
            <input
              type="tel"
              value={draft.phone}
              onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
            />
          </Field>
          <Field
            label="WhatsApp number"
            hint="Include the country code, e.g. 2348028289087."
            error={errors.whatsapp}
          >
            <input
              type="tel"
              value={draft.whatsapp}
              onChange={(e) => setDraft((d) => ({ ...d, whatsapp: e.target.value }))}
            />
          </Field>
          <Field label="Office address">
            <textarea
              value={draft.address}
              onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
            />
          </Field>
          <Field label="Email address" error={errors.email}>
            <input
              type="email"
              value={draft.email}
              placeholder="Not provided"
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
            />
          </Field>
          <Field label="Registration number">
            <input
              value={draft.registration}
              placeholder="Not provided"
              onChange={(e) => setDraft((d) => ({ ...d, registration: e.target.value }))}
            />
          </Field>
        </section>
        <section className="admin-panel space-y-5 p-5 sm:p-6">
          <h2 className="admin-subheading">Owner profile</h2>
          <Field label="Owner name">
            <input
              value={draft.owner}
              placeholder="Not provided"
              onChange={(e) => setDraft((d) => ({ ...d, owner: e.target.value }))}
            />
          </Field>
          <Field label="Title">
            <input
              value={draft.title}
              placeholder="Not provided"
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
          </Field>
          <PhotoUpload
            label="Owner photo"
            image={draft.photo}
            onChange={(photo) => setDraft((d) => ({ ...d, photo }))}
          />
          <Button type="submit" className="w-full sm:w-auto">
            <Check />
            Save changes
          </Button>
        </section>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <Button variant="ghost" asChild className="admin-link">
          <Link to="/admin/business-pages">
            <PanelsTopLeft />
            Business pages
            <ArrowUpRight />
          </Link>
        </Button>
        <Button variant="ghost" asChild className="admin-link">
          <Link to="/admin/style-guide">
            Style guide
            <ArrowUpRight />
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/admin/login">Sign out</Link>
        </Button>
      </div>
    </>
  );
}
export function StyleGuide() {
  return (
    <>
      <PageTitle title="Style guide" subtitle="Mochris Ventures · Owner dashboard" />
      <section className="mb-8">
        <h2 className="admin-subheading mb-4">Colours</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Navy", "#002856", "navy"],
            ["Cobalt", "#0B4FB8", "cobalt"],
            ["Teal", "#21D1CA", "teal"],
            ["Page background", "#F2F6FA", "page"],
            ["Card border", "#D6DFE9", "border"],
            ["WhatsApp", "#188A4C", "whatsapp"],
            ["Automobile", "#1D5BD6", "auto"],
            ["Agribusiness", "#2F855A", "agri"],
            ["Mechanical scraps", "#C26A12", "scraps"],
            ["Security", "#B3382C", "security"],
            ["Bus & car hire", "#0E8F9B", "hire"],
          ].map(([name, value, token]) => (
            <div className="admin-panel overflow-hidden" key={name}>
              <div className={`admin-swatch admin-swatch-${token} h-16`} />
              <div className="p-3">
                <p className="text-sm font-semibold">{name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="admin-subheading mb-4">Typography</h2>
          <dl className="divide-y border-y">
            <div className="py-4">
              <dt className="font-display text-3xl">DM Serif Display</dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                Page titles: 30 px phone / 32 px desktop
                <br />
                Section titles: 23 px
              </dd>
            </div>
            <div className="py-4">
              <dt className="font-semibold">Manrope</dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                Body and controls: 16 px
                <br />
                Field labels and secondary text: 14 px
                <br />
                Metadata: 12–13 px
              </dd>
            </div>
          </dl>
        </section>
        <section>
          <h2 className="admin-subheading mb-4">Spacing & shape</h2>
          <dl className="space-y-4 border-y py-4">
            <div>
              <dt className="font-semibold">Spacing scale</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                4, 8, 12, 16, 20, 24, 32, 40, 48 px
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Page margins</dt>
              <dd className="mt-1 text-sm text-muted-foreground">20 px phone · 40 px desktop</dd>
            </div>
            <div>
              <dt className="font-semibold">Surfaces & controls</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                6 px corners · 1 px borders · No shadows
                <br />
                Minimum 48 px touch targets
              </dd>
            </div>
          </dl>
        </section>
      </div>
      <section className="mt-8">
        <h2 className="admin-subheading mb-4">Request status</h2>
        <div className="flex gap-3">
          {["New", "Contacted", "Closed"].map((s) => (
            <span className="admin-status" data-status={s} key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
