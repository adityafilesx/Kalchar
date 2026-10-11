import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { products } from "@/lib/products";

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
});

describe("storefront", () => {
  it("restores a saved bag after mount and drops invalid entries", async () => {
    const product = products[0]!;
    localStorage.setItem(
      "kalchar_cart",
      JSON.stringify([
        { productId: product.id, size: product.sizes[0], color: product.color, quantity: 2 },
        { productId: 99999, size: "M", color: "Black", quantity: 1 },
      ]),
    );
    await renderAt("/");

    expect(screen.getByRole("button", { name: "Open bag, 2 items" })).toBeInTheDocument();
  });

  it("adds to bag from quick view only after a size is chosen", async () => {
    await renderAt("/shop");
    const product = products.find((p) => p.sizes.some((s) => !p.soldOutSizes?.includes(s)))!;
    const size = product.sizes.find((s) => !product.soldOutSizes?.includes(s))!;

    fireEvent.click(screen.getAllByRole("button", { name: `Quick view ${product.name}` })[0]!);
    const dialog = await screen.findByRole("dialog");

    fireEvent.click(within(dialog).getByRole("button", { name: /ADD TO BAG/ }));
    expect(within(dialog).getByRole("alert")).toHaveTextContent("Please select a size first.");

    fireEvent.click(within(dialog).getByRole("radio", { name: size }));
    fireEvent.click(within(dialog).getByRole("button", { name: /ADD TO BAG/ }));

    expect(screen.getByRole("button", { name: "Open bag, 1 item" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("kalchar_cart")!)).toEqual([
      { productId: product.id, size, color: product.color, quantity: 1 },
    ]);
  });

  it("shows an empty wishlist state, then saved pieces", async () => {
    await renderAt("/shop");

    fireEvent.click(screen.getByRole("button", { name: "Open wishlist, 0 saved" }));
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close wishlist" }));

    const product = products[0]!;
    fireEvent.click(screen.getAllByRole("button", { name: `Save ${product.name}` })[0]!);
    fireEvent.click(screen.getByRole("button", { name: "Open wishlist, 1 saved" }));

    const drawer = screen.getByRole("dialog", { name: "Wishlist" });
    expect(within(drawer).getByText(product.name)).toBeInTheDocument();
  });

  it("shows a removable chip for the active category", async () => {
    const router = await renderAt("/shop?category=Shoes");

    const chip = screen.getByRole("button", { name: "Remove filter Shoes" });
    await act(async () => {
      fireEvent.click(chip);
    });

    expect(router.state.location.search).toEqual({});
    expect(screen.queryByRole("button", { name: "Remove filter Shoes" })).toBeNull();
  });
});
