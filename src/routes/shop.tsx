import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => typeof search["category"] === "string" ? { category: search["category"] } : {},
  head: () => ({ meta: [ { title: "Shop the Collection — KALCHAR" }, { name: "description", content: "Explore Kalchar's considered collection of dresses, tailoring, tops, accessories, and more." }, { property: "og:title", content: "Shop the Collection — KALCHAR" }, { property: "og:description", content: "Explore Kalchar's modern wardrobe of considered fashion." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" } ] }),
  component: Shop,
});
function Shop() {
  const { category } = Route.useSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState("featured");
  const [localCategory, setLocalCategory] = useState<string | null>(null);
  const activeCategory = localCategory ?? category ?? "All";
  const filtered = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && (!size || p.sizes.includes(size)) && (!color || p.colors.includes(color)) && p.price <= maxPrice).sort((a,b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : a.id - b.id);
  return <main><div className="shop-heading editorial-container"><span className="eyebrow text-gold">THE KALCHAR COLLECTION</span><h1>{activeCategory === "All" ? "The Collection" : activeCategory}</h1><p>Considered pieces for wherever life takes you.</p></div><div className="editorial-container"><div className="shop-toolbar"><Button variant="ghost" className="gap-2 px-0 hover:bg-transparent" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/> FILTERS {filtersOpen ? <X size={13}/> : null}</Button><div className="shop-toolbar-right"><span className="hidden sm:inline text-xs text-muted-foreground">{filtered.length} PIECES</span><label className="sr-only" htmlFor="sort">Sort products</label><select id="sort" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">SORT: FEATURED</option><option value="price-low">PRICE: LOW TO HIGH</option><option value="price-high">PRICE: HIGH TO LOW</option><option value="name">NAME: A TO Z</option></select></div></div>{filtersOpen && <div className="filter-panel"><div><label htmlFor="category">CATEGORY</label><select id="category" value={activeCategory} onChange={event => setLocalCategory(event.target.value)}>{categories.map(value => <option key={value} value={value}>{value}</option>)}</select></div><div><label>SIZE</label><div className="filter-options">{["XS", "S", "M", "L", "XL", "One Size"].map(value => <Button key={value} variant="ghost" className={size === value ? "selected" : ""} onClick={() => setSize(size === value ? "" : value)}>{value}</Button>)}</div></div><div><label>COLOR</label><div className="filter-options">{["Black", "Ivory", "White", "Camel"].map(value => <Button key={value} variant="ghost" className={color === value ? "selected" : ""} onClick={() => setColor(color === value ? "" : value)}>{value}</Button>)}</div></div><div><label htmlFor="price">MAX PRICE: ${maxPrice}</label><input id="price" className="price-range" type="range" min="50" max="400" step="10" value={maxPrice} onChange={event => setMaxPrice(Number(event.target.value))}/><Button variant="link" className="h-auto p-0 text-xs" onClick={() => { setSize(""); setColor(""); setMaxPrice(400); setLocalCategory("All"); }}>Clear filters</Button></div></div>}<div className="shop-products"><p className="filter-count">SHOWING {filtered.length} OF {products.length} PIECES</p>{filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard product={product} key={product.id}/>)}</div> : <div className="no-results">No pieces match your selection.</div>}</div></div></main>;
}
