import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import {
  ALL,
  allColors,
  allSizes,
  categories,
  matchesCategory,
  priceBounds,
  products,
  swatchColor,
} from "@/lib/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string | undefined } => {
    const category = search["category"];
    // Explicit undefined: raw search params are merged in, so omitting the key would keep a bad value.
    return {
      category:
        typeof category === "string" && categories.includes(category) ? category : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop the Collection — KALCHAR" },
      {
        name: "description",
        content:
          "Shop Kalchar's streetwear, Y2K archives, techwear, outerwear, shoes and accessories.",
      },
      { property: "og:title", content: "Shop the Collection — KALCHAR" },
      {
        property: "og:description",
        content: "Streetwear, Y2K archives and techwear from Kalchar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const sortOptions = [
  { value: "featured", label: "SORT: FEATURED" },
  { value: "price-low", label: "PRICE: LOW TO HIGH" },
  { value: "price-high", label: "PRICE: HIGH TO LOW" },
  { value: "name", label: "NAME: A TO Z" },
];

function Shop() {
  const { category = ALL } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState("featured");

  const setCategory = (value: string) =>
    navigate({ search: value === ALL ? {} : { category: value }, replace: true });

  const filtered = products
    .filter(
      (p) =>
        matchesCategory(p, category) &&
        (!size || p.sizes.includes(size)) &&
        (!color || p.colors.includes(color)) &&
        p.price <= maxPrice,
    )
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  const chips = [
    category !== ALL && { label: category, clear: () => setCategory(ALL) },
    size && { label: `Size ${size}`, clear: () => setSize("") },
    color && { label: color, clear: () => setColor("") },
    maxPrice < priceBounds.max && {
      label: `Under $${maxPrice}`,
      clear: () => setMaxPrice(priceBounds.max),
    },
  ].filter((chip): chip is { label: string; clear: () => void } => Boolean(chip));

  const clearAll = () => {
    setSize("");
    setColor("");
    setMaxPrice(priceBounds.max);
    setCategory(ALL);
  };

  return (
    <main>
      <div className="shop-heading editorial-container">
        <span className="eyebrow text-gold">THE KALCHAR COLLECTION</span>
        <h1>{category === ALL ? "The Collection" : category}</h1>
        <p>Considered pieces for wherever life takes you.</p>
      </div>
      <div className="editorial-container">
        <div className="shop-toolbar">
          <Button
            variant="ghost"
            className="gap-2 px-0 hover:bg-transparent"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={16} /> FILTERS {filtersOpen ? <X size={13} /> : null}
          </Button>
          <div className="shop-toolbar-right">
            <span className="hidden sm:inline text-xs text-muted-foreground">
              {filtered.length} PIECES
            </span>
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filtersOpen && (
          <div className="filter-panel">
            <div>
              <label htmlFor="category">CATEGORY</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label id="size-filter">SIZE</label>
              <div className="filter-options" role="group" aria-labelledby="size-filter">
                {allSizes.map((value) => (
                  <Button
                    key={value}
                    variant="ghost"
                    aria-pressed={size === value}
                    className={size === value ? "selected" : ""}
                    onClick={() => setSize(size === value ? "" : value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label id="color-filter">COLOR</label>
              <div className="filter-options" role="group" aria-labelledby="color-filter">
                {allColors.map((value) => (
                  <Button
                    key={value}
                    variant="ghost"
                    aria-pressed={color === value}
                    className={`color-filter ${color === value ? "selected" : ""}`}
                    onClick={() => setColor(color === value ? "" : value)}
                  >
                    <span className="color-dot" style={{ background: swatchColor(value) }} />
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="price">MAX PRICE: ${maxPrice}</label>
              <input
                id="price"
                className="price-range"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step="10"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <Button variant="link" className="h-auto p-0 text-xs" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          </div>
        )}
        {chips.length > 0 && (
          <div className="filter-chips" aria-label="Active filters">
            {chips.map((chip) => (
              <button
                type="button"
                key={chip.label}
                className="filter-chip"
                onClick={chip.clear}
                aria-label={`Remove filter ${chip.label}`}
              >
                {chip.label} <X size={12} />
              </button>
            ))}
            {chips.length > 1 && (
              <button type="button" className="filter-chip-clear" onClick={clearAll}>
                CLEAR ALL
              </button>
            )}
          </div>
        )}
        <div className="shop-products">
          <p className="filter-count">
            SHOWING {filtered.length} OF {products.length} PIECES
          </p>
          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              No pieces match your selection.
              <Button variant="link" className="block mx-auto mt-4 text-xs" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
