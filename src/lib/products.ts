import { z } from "zod";
import rawCatalog from "@/data/products.json";

const productImageSchema = z.object({
  color: z.string(),
  src: z.string(),
  hoverSrc: z.string().optional(),
});

const productSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  category: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  color: z.string(),
  colors: z.array(z.string()).nonempty(),
  sizes: z.array(z.string()).nonempty(),
  images: z.array(productImageSchema).nonempty(),
  isNew: z.boolean().optional(),
  description: z.string(),
  details: z.string(),
  soldOutSizes: z.array(z.string()).optional(),
});

export type ProductImage = z.infer<typeof productImageSchema>;
export type Product = z.infer<typeof productSchema> & { image: string };

// Single swap point for image hosting: point this at a CDN or storage bucket later.
export const assetUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`;

export const products: Product[] = z
  .array(productSchema)
  .parse(rawCatalog)
  .map((product) => {
    const images = product.images.map((image) => ({
      ...image,
      src: assetUrl(image.src),
      ...(image.hoverSrc ? { hoverSrc: assetUrl(image.hoverSrc) } : {}),
    })) as Product["images"];
    return { ...product, images, image: images[0].src };
  });

export const productById = (id: number) => products.find((product) => product.id === id);

export const ALL = "All";
export const NEW_ARRIVALS = "New Arrivals";

export const productCategories = [...new Set(products.map((p) => p.category))].sort();
export const categories = [ALL, NEW_ARRIVALS, ...productCategories];

export const matchesCategory = (product: Product, category: string) =>
  category === ALL ||
  (category === NEW_ARRIVALS ? Boolean(product.isNew) : product.category === category);

const CLOTHING_SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];
const sizeRank = (size: string) => {
  const index = CLOTHING_SIZE_ORDER.indexOf(size);
  return index === -1 ? 100 + Number(size) : index;
};

export const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort(
  (a, b) => sizeRank(a) - sizeRank(b),
);
export const allColors = [...new Set(products.flatMap((p) => p.colors))].sort();

const prices = products.map((p) => p.price);
export const priceBounds = {
  min: Math.floor(Math.min(...prices) / 10) * 10,
  max: Math.ceil(Math.max(...prices) / 10) * 10,
};

const swatchColors: Record<string, string> = {
  Black: "oklch(0.2 0 0)",
  White: "oklch(1 0 0)",
  "Neon Green": "oklch(0.87 0.25 140)",
  "Cyber Silver": "oklch(0.82 0.01 250)",
  "Washed Charcoal": "oklch(0.4 0.005 250)",
  "Olive Drab": "oklch(0.5 0.07 120)",
  "Acid Wash": "oklch(0.72 0.04 240)",
  "Cobalt Blue": "oklch(0.48 0.2 262)",
  "Hot Pink": "oklch(0.68 0.24 350)",
};
export const swatchColor = (color: string) => swatchColors[color] ?? "oklch(0.6 0 0)";

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export function getImagesForColor(product: Product, color: string): ProductImage {
  return product.images.find((img) => img.color === color) ?? product.images[0];
}

export const isSoldOut = (product: Product, size: string) =>
  product.soldOutSizes?.includes(size) ?? false;

export const firstAvailableSize = (product: Product) =>
  product.sizes.find((size) => !isSoldOut(product, size));

export const sizeGuide = {
  headers: ["", "XS", "S", "M", "L", "XL", "XXL"],
  rows: [
    ["Bust (cm)", "80–84", "85–89", "90–94", "95–99", "100–104", "105–109"],
    ["Waist (cm)", "62–66", "67–71", "72–76", "77–81", "82–86", "87–91"],
    ["Hip (cm)", "88–92", "93–97", "98–102", "103–107", "108–112", "113–117"],
  ],
  shoeHeaders: ["EU", "36", "37", "38", "39", "40", "41", "42", "43"],
  shoeRows: [
    ["US", "6", "7", "7.5", "8.5", "9", "10", "11", "11.5"],
    ["Foot Length (cm)", "23", "23.5", "24.5", "25", "26", "27", "28", "28.5"],
  ],
};
