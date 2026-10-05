import json
import random

unsplash_ids = [
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

unsplash_urls = [f"https://images.unsplash.com/photo-{x}?auto=format&fit=crop&w=800&q=80" for x in unsplash_ids]

imgur_urls = [
    "https://i.imgur.com/cHddUCu.jpeg", "https://i.imgur.com/R2PN9Wq.jpeg",
    "https://i.imgur.com/cSytoSD.jpeg", "https://i.imgur.com/ZKGofuB.jpeg",
    "https://i.imgur.com/9LFjwpI.jpeg", "https://i.imgur.com/R3iobJA.jpeg",
    "https://i.imgur.com/wXuQ7bm.jpeg", "https://i.imgur.com/cBuLvBi.jpeg",
    "https://i.imgur.com/KeqG6r4.jpeg", "https://i.imgur.com/UsFIvYs.jpeg",
    "https://i.imgur.com/axsyGpD.jpeg", "https://i.imgur.com/Y54Bt8J.jpeg",
    "https://i.imgur.com/9DqEOV5.jpeg", "https://i.imgur.com/qNOjJje.jpeg",
    "https://i.imgur.com/62gGzeF.jpeg", "https://i.imgur.com/9qrmE1b.jpeg",
    "https://i.imgur.com/hKcMNJs.jpeg", "https://i.imgur.com/mcW42Gi.jpeg",
    "https://i.imgur.com/npLfCGq.jpeg", "https://i.imgur.com/HqYqLnW.jpeg",
    "https://i.imgur.com/AzAY4Ed.jpeg", "https://i.imgur.com/Au8J9sX.jpeg",
    "https://i.imgur.com/sC0ztOB.jpeg"
]

dummy_urls = [
    "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
]

all_unique_images = unsplash_urls + imgur_urls + dummy_urls
random.seed(42)
random.shuffle(all_unique_images)
all_unique_images = all_unique_images[:50] # Exactly 50 unique primary images

gen_z_names = [
    "Oversized Graphic Tee", "Y2K Cargo Pants", "Chunky Sneakers", "Distressed Denim Jacket",
    "Cyberpunk Shades", "Utility Vest", "Mesh Crop Top", "Baggy Parachute Pants", 
    "Acid Wash Hoodie", "Platform Boots", "Neon Windbreaker", "Techwear Trousers",
    "Velour Tracksuit", "Vintage Racing Jacket", "Flared Ribbed Leggings", "Fuzzy Bucket Hat",
    "Asymmetric Hem Skirt", "Gorpcore Fleece", "Skater Boy Jeans", "Patchwork Cardigan",
    "Oversized Puffer Jacket", "Micro Mini Skirt", "Tactical Crossbody Bag", "Dad Sneakers",
    "Cut-out Bodysuit", "Chrome Heart Style Ring", "Reflective Track Pants", "Tie-Dye Sweatpants",
    "Crochet Halter Top", "Vegan Leather Matrix Coat", "Layered Chains Necklace",
    "Slouchy Beanie", "Puddle Pants", "Seamless Biker Shorts", "Varsity Letterman Jacket",
    "Deconstructed Blazer", "Flannel Shacket", "Ruched Tube Top", "Knit Balaclava",
    "Checkerboard Slip-ons", "Low-Rise Baggy Jeans", "Wraparound Sunglasses",
    "Goth Girl Pleated Skirt", "Waffle Knit Long Sleeve", "Retro Bowling Shirt",
    "Utility Belt Bag", "Contrast Stitch Carpenters", "Sherpa Lined Denim",
    "Metallic Moon Boot", "Subversive Basics Top"
]

categories = ["Outerwear", "Streetwear", "Y2K Archives", "Tops", "Accessories", "Shoes", "Knitwear", "Bottoms", "Techwear"]
colors = ["Black", "Neon Green", "Cyber Silver", "Hot Pink", "Acid Wash", "Washed Charcoal", "Olive Drab", "Cobalt Blue"]
sizes_clothes = ["XS", "S", "M", "L", "XL", "XXL"]
sizes_shoes = ["36", "37", "38", "39", "40", "41", "42", "43"]

catalog = []

for i in range(50):
    name = gen_z_names[i]
    category = random.choice(categories)
    
    if "Shoe" in name or "Sneaker" in name or "Boot" in name: category = "Shoes"
    elif "Jacket" in name or "Fleece" in name or "Coat" in name or "Puffer" in name or "Windbreaker" in name: category = "Outerwear"
    elif "Pants" in name or "Jeans" in name or "Skirt" in name or "Shorts" in name or "Carpenters" in name or "Sweatpants" in name: category = "Bottoms"
    elif "Bag" in name or "Shades" in name or "Ring" in name or "Necklace" in name or "Hat" in name or "Beanie" in name or "Balaclava" in name or "Sunglasses" in name: category = "Accessories"
    
    price = random.randint(3, 25) * 10 - 1
    has_discount = random.random() > 0.6
    original_price = price + random.randint(2, 8) * 10 if has_discount else None
    
    prod_colors = random.sample(colors, random.randint(1, 3))
    primary_color = prod_colors[0]
    
    sizes = sizes_shoes if category == "Shoes" else sizes_clothes
    sold_out = random.sample(sizes, random.randint(0, 2)) if random.random() > 0.4 else []

    primary_image = all_unique_images[i]
    alt_image = random.choice(all_unique_images)
    
    images_arr = []
    for idx, c in enumerate(prod_colors):
        src = primary_image if idx == 0 else random.choice(all_unique_images)
        images_arr.append({
            "color": c,
            "src": src,
            "alt": alt_image
        })

    desc = f"Absolute grail status. This {name.lower()} brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop."
    details = "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
    is_new = True if random.random() > 0.5 else False

    item = {
        "name": name,
        "category": category,
        "price": price,
        "color": primary_color,
        "colors": prod_colors,
        "sizes": sizes,
        "images": images_arr,
        "isNew": is_new,
        "description": desc,
        "details": details,
    }
    if original_price:
        item["originalPrice"] = original_price
    if sold_out:
        item["soldOutSizes"] = sold_out
        
    catalog.append(item)

products_ts = """/**
 * Kalchar product catalog — Gen Z / Streetwear / Funky Designs.
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

const catalog: Omit<Product, "id" | "image">[] = """ + json.dumps(catalog, indent=2) + """;

export const products: Product[] = catalog.map((item, index) => ({
  ...item,
  id: index + 1,
  image: item.images[0]?.src ?? "",
}));

export const categories = [
  "All",
  "Streetwear",
  "Y2K Archives",
  "Techwear",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Accessories",
  "Shoes",
  "Knitwear",
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
  ],
  shoeHeaders: ["EU", "36", "37", "38", "39", "40", "41", "42"],
  shoeRows: [
    ["US", "6", "7", "7.5", "8.5", "9", "10", "11"],
    ["Foot Length (cm)", "23", "23.5", "24.5", "25", "26", "27", "28"],
  ],
};
"""

with open("src/lib/products.ts", "w") as f:
    f.write(products_ts)
print("Done!")
