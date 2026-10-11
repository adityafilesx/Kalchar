import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import rawCatalog from "@/data/products.json";
import {
  NEW_ARRIVALS,
  allColors,
  allSizes,
  categories,
  matchesCategory,
  priceBounds,
  products,
} from "@/lib/products";
import { readStored, storedCartSchema, storedIdsSchema } from "@/lib/storage";

describe("catalog", () => {
  it("has unique ids", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("every category option matches at least one product", () => {
    for (const category of categories) {
      expect(
        products.some((p) => matchesCategory(p, category)),
        category,
      ).toBe(true);
    }
    expect(categories).toContain(NEW_ARRIVALS);
  });

  it("filter options and price bounds cover the catalog", () => {
    for (const p of products) {
      expect(p.sizes.every((s) => allSizes.includes(s))).toBe(true);
      expect(p.colors.every((c) => allColors.includes(c))).toBe(true);
      expect(p.price).toBeGreaterThanOrEqual(priceBounds.min);
      expect(p.price).toBeLessThanOrEqual(priceBounds.max);
    }
  });

  const imagePaths = (p: (typeof rawCatalog)[number]) =>
    new Set(
      p.images.flatMap((image) =>
        "hoverSrc" in image && image.hoverSrc ? [image.src, image.hoverSrc] : [image.src],
      ),
    );

  it("every referenced image is self-hosted in public/", () => {
    for (const p of rawCatalog) {
      for (const src of imagePaths(p)) {
        expect(fs.existsSync(path.resolve("public", src)), src).toBe(true);
      }
    }
  });

  it("never shares an image between two products", () => {
    const owners = new Map<string, string>();
    for (const p of rawCatalog) {
      for (const src of imagePaths(p)) {
        expect(owners.get(src), `${src} used by ${owners.get(src)} and ${p.name}`).toBeUndefined();
        owners.set(src, p.name);
      }
    }
  });
});

describe("stored state", () => {
  it("falls back when stored JSON is corrupt or the wrong shape", () => {
    localStorage.setItem("cart", "{not json");
    expect(readStored("cart", storedCartSchema, [])).toEqual([]);

    localStorage.setItem(
      "cart",
      JSON.stringify([{ productId: 1, size: "M", color: "Black", quantity: -4 }]),
    );
    expect(readStored("cart", storedCartSchema, [])).toEqual([]);

    localStorage.setItem("ids", JSON.stringify(["1", 2]));
    expect(readStored("ids", storedIdsSchema, [])).toEqual([]);
    localStorage.clear();
  });

  it("reads valid stored state", () => {
    const cart = [{ productId: 1, size: "M", color: "Black", quantity: 2 }];
    localStorage.setItem("cart", JSON.stringify(cart));
    expect(readStored("cart", storedCartSchema, [])).toEqual(cart);
    localStorage.clear();
  });
});
