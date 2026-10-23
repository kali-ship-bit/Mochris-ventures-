import { useEffect, useState } from "react";
import { Check, CircleAlert } from "lucide-react";

// Minimal toast for the admin demo, matching the "Saved" toast in the design
// spec. Kept dependency-free so the admin area needs no extra packages.
type ToastItem = { id: number; text: string; variant: "success" | "error" };

let pushToast: ((text: string, variant: ToastItem["variant"]) => void) | null = null;

export const toast = {
  success: (text: string) => {
    pushToast?.(text, "success");
  },
  error: (text: string) => {
    pushToast?.(text, "error");
  },
};

export function AdminToaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    pushToast = (text: string, variant: ToastItem["variant"]) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, text, variant }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 2600);
    };
    return () => {
      pushToast = null;
    };
  }, []);

  if (!items.length) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col items-end gap-2"
      aria-live="polite"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="admin-panel flex items-center gap-2 px-4 py-3 text-sm font-semibold"
        >
          {item.variant === "success" ? (
            <Check
              className="size-4"
              style={{ color: "var(--admin-whatsapp)" }}
              aria-hidden="true"
            />
          ) : (
            <CircleAlert
              className="size-4"
              style={{ color: "var(--admin-security)" }}
              aria-hidden="true"
            />
          )}
          {item.text}
        </div>
      ))}
    </div>
  );
}
