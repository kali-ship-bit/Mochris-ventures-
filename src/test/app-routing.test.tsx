import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";

async function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // The router must finish its initial load before rendering, otherwise
  // RouterProvider paints nothing and every assertion races the router.
  await router.load();
  render(<RouterProvider router={router} />);
  return router;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App routing", () => {
  it("renders the index route", async () => {
    await renderAt("/");

    expect(
      await screen.findByRole("heading", { name: "Five businesses. One company." }),
    ).toBeInTheDocument();
  });

  it("renders a business page with its enquiry link", async () => {
    await renderAt("/agribusiness");

    expect(await screen.findByRole("heading", { name: "Agribusiness" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /enquir/i }).length).toBeGreaterThan(0);
  });

  it("renders the contact form", async () => {
    await renderAt("/contact");

    expect(await screen.findByRole("heading", { name: "Business enquiry" })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address \(optional\)/i)).toBeInTheDocument();
  });

  it("preselects the business named in the contact URL", async () => {
    await renderAt("/contact?service=Agribusiness");

    const select = await screen.findByLabelText(/business area/i);
    await waitFor(() => expect(select).toHaveValue("Agribusiness"));
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await renderAt("/this-route-does-not-exist");

    expect(await screen.findByText(/find that page/i)).toBeInTheDocument();
  });
});
