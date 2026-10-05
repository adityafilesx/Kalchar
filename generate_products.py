import random

valid_ids = [
    '1594938298603-c8148c4dae35', '1591369822096-ffd140ec948f', '1506629082955-511b1aa562c8', 
    '1434389677669-e08b4cac3105', '1614179689702-355944cd0918', '1551489186-cf8726f514f8', 
    '1515886657613-9f3515b0c78f', '1539008835657-9e8e9680c956', '1496747611176-843222e1e57c', 
    '1518622358385-8ea7d0794bf6', '1485462537746-965f33f7f6a7', '1584917865442-de89df76afd3', 
    '1543163521-1bf539c55dd2', '1618354691373-d851c5c3a990', '1604695573706-53170668f6a6', 
    '1594223274512-ad4803739b7c', '1551488831-00ddcb6c6bd3', '1591561954557-26941169b49e', 
    '1509631179647-0177331693ae', '1544022613-e87ca75a784a', '1591047139829-d91aecb6caea', 
    '1469334031218-e382a71b716b', '1552374196-c4e7ffc6e126', '1525507119028-ed4c629a60a3', 
    '1521223890158-f9f7c3d5d504'
]

adjectives = ["Soft", "Structured", "Modern", "Classic", "Essential", "Elevated", "Oversized", "Tailored", "Relaxed", "Ribbed", "Pleated", "Fluid", "Sculpted", "Draped"]
nouns = ["Coat", "Blazer", "Trouser", "Knit", "Dress", "Shirt", "Jacket", "Tote", "Shoulder Bag", "Heel", "Skirt", "Top", "Sweater", "Cardigan", "Vest"]
categories = ["Outerwear", "Tailoring", "Dresses", "Tops", "Accessories", "Shoes", "Knitwear", "Bottoms", "Sets"]
colors = ["Black", "Ivory", "Camel", "White", "Navy", "Charcoal", "Olive", "Burgundy"]
sizes_clothes = ["XS", "S", "M", "L", "XL"]
sizes_shoes = ["36", "37", "38", "39", "40", "41"]
sizes_bags = ["One Size"]

products_ts = """/**
 * Kalchar product catalog — generated with valid images.
 */

export type ProductImage = {
  color: string;
  src: string;
  alt?: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  color: string;
  colors: string[];
  sizes: string[];
  images: ProductImage[];
  image: string;
  isNew?: boolean;
  description: string;
  details: string;
  soldOutSizes?: string[];
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const catalog: Omit<Product, "id" | "image">[] = [
"""

random.seed(42) # For reproducibility

for i in range(50):
    name = f"{random.choice(adjectives)} {random.choice(nouns)}"
    category = random.choice(categories)
    
    # Adjust category based on noun for realism
    if "Coat" in name or "Jacket" in name: category = "Outerwear"
    elif "Blazer" in name or "Trouser" in name: category = "Tailoring"
    elif "Dress" in name or "Skirt" in name: category = "Dresses" if "Dress" in name else "Bottoms"
    elif "Top" in name or "Shirt" in name: category = "Tops"
    elif "Bag" in name or "Tote" in name: category = "Accessories"
    elif "Heel" in name: category = "Shoes"
    elif "Knit" in name or "Sweater" in name or "Cardigan" in name: category = "Knitwear"

    price = random.randint(8, 45) * 10
    has_discount = random.random() > 0.7
    original_price = price + random.randint(2, 10) * 10 if has_discount else None
    
    prod_colors = random.sample(colors, random.randint(1, 3))
    primary_color = prod_colors[0]
    
    if category == "Shoes": sizes = sizes_shoes
    elif category == "Accessories": sizes = sizes_bags
    else: sizes = sizes_clothes
    
    sold_out = random.sample(sizes, random.randint(0, 2)) if random.random() > 0.5 and len(sizes) > 1 else []

    images_str = "[\n"
    for c in prod_colors:
        id1 = random.choice(valid_ids)
        id2 = random.choice(valid_ids)
        images_str += f'      {{ color: "{c}", src: img("{id1}"), alt: img("{id2}") }},\n'
    images_str += "    ]"

    desc = f"A beautiful {name.lower()} perfect for any occasion. Crafted with care and designed for the modern wardrobe."
    details = "Composition: High-quality materials. Care: See label for instructions. Imported."
    
    is_new = "true" if random.random() > 0.6 else "false"

    products_ts += f"""  {{
    name: "{name}",
    category: "{category}",
    price: {price},
"""
    if original_price:
        products_ts += f"    originalPrice: {original_price},\n"
    products_ts += f"""    color: "{primary_color}",
    colors: {prod_colors},
    sizes: {sizes},
    images: {images_str},
    isNew: {is_new},
    description: "{desc}",
    details: "{details}",
"""
    if sold_out:
        products_ts += f"    soldOutSizes: {sold_out},\n"
    products_ts += "  },\n"

products_ts += """];

export const products: Product[] = catalog.map((item, index) => ({
  ...item,
  id: index + 1,
  image: item.images[0]?.src ?? "",
}));

export const categories = [
  "All",
  "Dresses",
  "Tops",
  "Tailoring",
  "Outerwear",
  "Accessories",
  "Knitwear",
  "Bottoms",
  "Shoes",
  "Sets",
];

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export function getImagesForColor(product: Product, color: string): ProductImage | undefined {
  return product.images.find((img) => img.color === color) ?? product.images[0];
}

export const sizeGuide = {
  headers: ["", "XS", "S", "M", "L", "XL"],
  rows: [
    ["Bust (cm)", "80–84", "85–89", "90–94", "95–99", "100–104"],
    ["Waist (cm)", "62–66", "67–71", "72–76", "77–81", "82–86"],
    ["Hip (cm)", "88–92", "93–97", "98–102", "103–107", "108–112"],
    ["Shoulder (cm)", "36", "37.5", "39", "40.5", "42"],
  ],
  shoeHeaders: ["EU", "36", "37", "38", "39", "40"],
  shoeRows: [
    ["US", "6", "7", "7.5", "8.5", "9"],
    ["UK", "3", "4", "4.5", "5.5", "6"],
    ["Foot Length (cm)", "23", "23.5", "24.5", "25", "26"],
  ],
};
"""

with open("src/lib/products.ts", "w") as f:
    f.write(products_ts)
print("Generated 50 products successfully.")
