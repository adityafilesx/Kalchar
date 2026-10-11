import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";

// The root route renders a full <html> shell, which React cannot mount inside
// testing-library's default <div> container, so render into the document itself.
async function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  await act(async () => {
    render(<RouterProvider router={router} />, {
      container: document as unknown as HTMLElement,
    });
  });
  return router;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
describe("App routing", () => {
  it("renders the index route", async () => {
    await renderAt("/");

    expect(document.body.firstElementChild).not.toBeNull();
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await renderAt("/this-route-does-not-exist");

    expect(document.body.firstElementChild).not.toBeNull();
  });
});
