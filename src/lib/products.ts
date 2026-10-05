/**
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

const catalog: Omit<Product, "id" | "image">[] = [
  {
    "name": "Neon Genesis Bomber",
    "category": "Outerwear",
    "price": 149,
    "color": "Neon Green",
    "colors": [
      "Neon Green",
      "Black"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/mcW42Gi.jpeg",
        "alt": "https://i.imgur.com/cHddUCu.jpeg"
      },
      {
        "color": "Black",
        "src": "https://i.imgur.com/qNOjJje.jpeg",
        "alt": "https://i.imgur.com/cHddUCu.jpeg"
      }
    ],
    "isNew": true,
    "description": "Just landed. The ultimate statement bomber for the season.",
    "details": "Premium nylon with tech lining."
  },
  {
    "name": "Holographic Mini Skirt",
    "category": "Bottoms",
    "price": 85,
    "color": "Cyber Silver",
    "colors": [
      "Cyber Silver"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "images": [
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/HqYqLnW.jpeg",
        "alt": "https://i.imgur.com/cBuLvBi.jpeg"
      }
    ],
    "isNew": true,
    "description": "Reflect your energy. Perfect for night outs and festivals.",
    "details": "Wipe clean only. Do not machine wash."
  },
  {
    "name": "Distressed Knit Sweater",
    "category": "Knitwear",
    "price": 110,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Olive Drab"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/npLfCGq.jpeg",
        "alt": "https://i.imgur.com/Au8J9sX.jpeg"
      },
      {
        "color": "Olive Drab",
        "src": "https://i.imgur.com/62gGzeF.jpeg",
        "alt": "https://i.imgur.com/Au8J9sX.jpeg"
      }
    ],
    "isNew": true,
    "description": "The perfect distressed look, straight out of the archives.",
    "details": "100% Cotton. Hand wash cold."
  },
  {
    "name": "Hyper-Tech Utility Vest",
    "category": "Techwear",
    "price": 135,
    "color": "Black",
    "colors": [
      "Black"
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://i.imgur.com/9qrmE1b.jpeg",
        "alt": "https://i.imgur.com/hKcMNJs.jpeg"
      }
    ],
    "isNew": true,
    "description": "Function meets streetwear. 12 pockets, water resistant.",
    "details": "Ripstop nylon fabric."
  },
  {
    "name": "Chunky Platform Loafers",
    "category": "Shoes",
    "price": 180,
    "color": "Black",
    "colors": [
      "Black",
      "White"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://i.imgur.com/AzAY4Ed.jpeg",
        "alt": "https://i.imgur.com/sC0ztOB.jpeg"
      },
      {
        "color": "White",
        "src": "https://i.imgur.com/hKcMNJs.jpeg",
        "alt": "https://i.imgur.com/sC0ztOB.jpeg"
      }
    ],
    "isNew": true,
    "description": "Elevate your stance. The classic loafer on a 3-inch sole.",
    "details": "Vegan leather construction."
  },
  {
    "name": "Oversized Graphic Tee",
    "category": "Knitwear",
    "price": 49,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Acid Wash",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      },
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/wXuQ7bm.jpeg",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/sC0ztOB.jpeg",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This oversized graphic tee brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Y2K Cargo Pants",
    "category": "Bottoms",
    "price": 99,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue",
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/AzAY4Ed.jpeg",
        "alt": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This y2k cargo pants brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 149
  },
  {
    "name": "Chunky Sneakers",
    "category": "Shoes",
    "price": 249,
    "color": "Cyber Silver",
    "colors": [
      "Cyber Silver"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "images": [
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/cHddUCu.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This chunky sneakers brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 319
  },
  {
    "name": "Distressed Denim Jacket",
    "category": "Outerwear",
    "price": 229,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Olive Drab",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/cHddUCu.jpeg"
      },
      {
        "color": "Olive Drab",
        "src": "https://i.imgur.com/Y54Bt8J.jpeg",
        "alt": "https://i.imgur.com/cHddUCu.jpeg"
      },
      {
        "color": "Black",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
        "alt": "https://i.imgur.com/cHddUCu.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This distressed denim jacket brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 259
  },
  {
    "name": "Cyberpunk Shades",
    "category": "Accessories",
    "price": 209,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This cyberpunk shades brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 249
  },
  {
    "name": "Utility Vest",
    "category": "Accessories",
    "price": 69,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash",
      "Washed Charcoal",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/qNOjJje.jpeg",
        "alt": "https://i.imgur.com/wXuQ7bm.jpeg"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/wXuQ7bm.jpeg"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
        "alt": "https://i.imgur.com/wXuQ7bm.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This utility vest brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "L",
      "M"
    ]
  },
  {
    "name": "Mesh Crop Top",
    "category": "Outerwear",
    "price": 59,
    "color": "Olive Drab",
    "colors": [
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This mesh crop top brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "L"
    ]
  },
  {
    "name": "Baggy Parachute Pants",
    "category": "Bottoms",
    "price": 109,
    "color": "Neon Green",
    "colors": [
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/62gGzeF.jpeg",
        "alt": "https://i.imgur.com/62gGzeF.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This baggy parachute pants brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 189,
    "soldOutSizes": [
      "M",
      "XXL"
    ]
  },
  {
    "name": "Acid Wash Hoodie",
    "category": "Y2K Archives",
    "price": 169,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash",
      "Cobalt Blue",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/9DqEOV5.jpeg"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/R2PN9Wq.jpeg",
        "alt": "https://i.imgur.com/9DqEOV5.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/9DqEOV5.jpeg",
        "alt": "https://i.imgur.com/9DqEOV5.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This acid wash hoodie brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Platform Boots",
    "category": "Shoes",
    "price": 69,
    "color": "Black",
    "colors": [
      "Black"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/62gGzeF.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This platform boots brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "36"
    ]
  },
  {
    "name": "Neon Windbreaker",
    "category": "Outerwear",
    "price": 99,
    "color": "Neon Green",
    "colors": [
      "Neon Green",
      "Black",
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
        "alt": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Black",
        "src": "https://i.imgur.com/Au8J9sX.jpeg",
        "alt": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/sC0ztOB.jpeg",
        "alt": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This neon windbreaker brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Techwear Trousers",
    "category": "Bottoms",
    "price": 199,
    "color": "Olive Drab",
    "colors": [
      "Olive Drab",
      "Neon Green",
      "Acid Wash"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/UsFIvYs.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      },
      {
        "color": "Acid Wash",
        "src": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This techwear trousers brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "S",
      "M"
    ]
  },
  {
    "name": "Velour Tracksuit",
    "category": "Techwear",
    "price": 169,
    "color": "Neon Green",
    "colors": [
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/KeqG6r4.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This velour tracksuit brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Vintage Racing Jacket",
    "category": "Outerwear",
    "price": 29,
    "color": "Black",
    "colors": [
      "Black",
      "Neon Green",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://i.imgur.com/9LFjwpI.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/HqYqLnW.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/ZKGofuB.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This vintage racing jacket brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XS"
    ]
  },
  {
    "name": "Flared Ribbed Leggings",
    "category": "Tops",
    "price": 199,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue",
      "Neon Green",
      "Hot Pink"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/wXuQ7bm.jpeg",
        "alt": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Hot Pink",
        "src": "https://i.imgur.com/UsFIvYs.jpeg",
        "alt": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This flared ribbed leggings brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Fuzzy Bucket Hat",
    "category": "Accessories",
    "price": 159,
    "color": "Black",
    "colors": [
      "Black",
      "Washed Charcoal",
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://i.imgur.com/HqYqLnW.jpeg",
        "alt": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
        "alt": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This fuzzy bucket hat brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Asymmetric Hem Skirt",
    "category": "Bottoms",
    "price": 99,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue",
      "Neon Green",
      "Hot Pink"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/HqYqLnW.jpeg",
        "alt": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This asymmetric hem skirt brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Gorpcore Fleece",
    "category": "Outerwear",
    "price": 59,
    "color": "Black",
    "colors": [
      "Black",
      "Cobalt Blue",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://i.imgur.com/ZKGofuB.jpeg",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/9LFjwpI.jpeg",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This gorpcore fleece brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Skater Boy Jeans",
    "category": "Bottoms",
    "price": 79,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash",
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This skater boy jeans brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "L"
    ]
  },
  {
    "name": "Patchwork Cardigan",
    "category": "Techwear",
    "price": 239,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/R2PN9Wq.jpeg",
        "alt": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This patchwork cardigan brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 269
  },
  {
    "name": "Oversized Puffer Jacket",
    "category": "Outerwear",
    "price": 39,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/Y54Bt8J.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This oversized puffer jacket brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 59,
    "soldOutSizes": [
      "S",
      "XS"
    ]
  },
  {
    "name": "Micro Mini Skirt",
    "category": "Bottoms",
    "price": 49,
    "color": "Hot Pink",
    "colors": [
      "Hot Pink",
      "Cobalt Blue",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/cHddUCu.jpeg",
        "alt": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Black",
        "src": "https://i.imgur.com/cSytoSD.jpeg",
        "alt": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This micro mini skirt brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "S",
      "XL"
    ]
  },
  {
    "name": "Tactical Crossbody Bag",
    "category": "Accessories",
    "price": 129,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Neon Green",
      "Cyber Silver"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/AzAY4Ed.jpeg",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      },
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/R2PN9Wq.jpeg",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This tactical crossbody bag brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 159
  },
  {
    "name": "Dad Sneakers",
    "category": "Shoes",
    "price": 29,
    "color": "Neon Green",
    "colors": [
      "Neon Green",
      "Black",
      "Acid Wash"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Black",
        "src": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/AzAY4Ed.jpeg",
        "alt": "https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This dad sneakers brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Cut-out Bodysuit",
    "category": "Tops",
    "price": 139,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/mcW42Gi.jpeg",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/UsFIvYs.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This cut-out bodysuit brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XL",
      "XS"
    ]
  },
  {
    "name": "Chrome Heart Style Ring",
    "category": "Accessories",
    "price": 69,
    "color": "Cyber Silver",
    "colors": [
      "Cyber Silver"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cyber Silver",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
        "alt": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This chrome heart style ring brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Reflective Track Pants",
    "category": "Bottoms",
    "price": 89,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue",
      "Cyber Silver"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/axsyGpD.jpeg",
        "alt": "https://i.imgur.com/qNOjJje.jpeg"
      },
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/9DqEOV5.jpeg",
        "alt": "https://i.imgur.com/qNOjJje.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This reflective track pants brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 169
  },
  {
    "name": "Tie-Dye Sweatpants",
    "category": "Bottoms",
    "price": 39,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
        "alt": "https://i.imgur.com/R3iobJA.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This tie-dye sweatpants brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Crochet Halter Top",
    "category": "Knitwear",
    "price": 199,
    "color": "Cyber Silver",
    "colors": [
      "Cyber Silver"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/R3iobJA.jpeg",
        "alt": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This crochet halter top brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XL"
    ]
  },
  {
    "name": "Vegan Leather Matrix Coat",
    "category": "Outerwear",
    "price": 39,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/HqYqLnW.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This vegan leather matrix coat brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Layered Chains Necklace",
    "category": "Accessories",
    "price": 199,
    "color": "Cyber Silver",
    "colors": [
      "Cyber Silver",
      "Neon Green",
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cyber Silver",
        "src": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/axsyGpD.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/axsyGpD.jpeg"
      },
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/axsyGpD.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This layered chains necklace brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 249
  },
  {
    "name": "Slouchy Beanie",
    "category": "Accessories",
    "price": 159,
    "color": "Hot Pink",
    "colors": [
      "Hot Pink",
      "Cyber Silver",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      },
      {
        "color": "Cyber Silver",
        "src": "https://i.imgur.com/cHddUCu.jpeg",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This slouchy beanie brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 239
  },
  {
    "name": "Puddle Pants",
    "category": "Bottoms",
    "price": 139,
    "color": "Hot Pink",
    "colors": [
      "Hot Pink"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Hot Pink",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
        "alt": "https://i.imgur.com/KeqG6r4.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This puddle pants brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Seamless Biker Shorts",
    "category": "Bottoms",
    "price": 49,
    "color": "Olive Drab",
    "colors": [
      "Olive Drab",
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Olive Drab",
        "src": "https://i.imgur.com/cBuLvBi.jpeg",
        "alt": "https://i.imgur.com/62gGzeF.jpeg"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/62gGzeF.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This seamless biker shorts brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 89,
    "soldOutSizes": [
      "M",
      "XS"
    ]
  },
  {
    "name": "Varsity Letterman Jacket",
    "category": "Outerwear",
    "price": 39,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/Au8J9sX.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://i.imgur.com/62gGzeF.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This varsity letterman jacket brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XL"
    ]
  },
  {
    "name": "Deconstructed Blazer",
    "category": "Tops",
    "price": 109,
    "color": "Black",
    "colors": [
      "Black",
      "Acid Wash"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Acid Wash",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
        "alt": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This deconstructed blazer brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XXL",
      "S"
    ]
  },
  {
    "name": "Flannel Shacket",
    "category": "Shoes",
    "price": 219,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/hKcMNJs.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This flannel shacket brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "42",
      "38"
    ]
  },
  {
    "name": "Ruched Tube Top",
    "category": "Techwear",
    "price": 69,
    "color": "Olive Drab",
    "colors": [
      "Olive Drab",
      "Washed Charcoal",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Olive Drab",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This ruched tube top brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XL",
      "M"
    ]
  },
  {
    "name": "Knit Balaclava",
    "category": "Accessories",
    "price": 159,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Hot Pink",
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      },
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      },
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This knit balaclava brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 219
  },
  {
    "name": "Checkerboard Slip-ons",
    "category": "Streetwear",
    "price": 119,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Black",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/cSytoSD.jpeg",
        "alt": "https://i.imgur.com/KeqG6r4.jpeg"
      },
      {
        "color": "Black",
        "src": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/KeqG6r4.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/KeqG6r4.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This checkerboard slip-ons brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Low-Rise Baggy Jeans",
    "category": "Bottoms",
    "price": 219,
    "color": "Olive Drab",
    "colors": [
      "Olive Drab",
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Olive Drab",
        "src": "https://i.imgur.com/9DqEOV5.jpeg",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Washed Charcoal",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This low-rise baggy jeans brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 239,
    "soldOutSizes": [
      "XXL",
      "L"
    ]
  },
  {
    "name": "Wraparound Sunglasses",
    "category": "Accessories",
    "price": 59,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/HqYqLnW.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This wraparound sunglasses brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 89
  },
  {
    "name": "Goth Girl Pleated Skirt",
    "category": "Bottoms",
    "price": 169,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Olive Drab"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/UsFIvYs.jpeg",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp"
      },
      {
        "color": "Olive Drab",
        "src": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "alt": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This goth girl pleated skirt brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "XXL",
      "XL"
    ]
  },
  {
    "name": "Waffle Knit Long Sleeve",
    "category": "Y2K Archives",
    "price": 179,
    "color": "Acid Wash",
    "colors": [
      "Acid Wash"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Acid Wash",
        "src": "https://i.imgur.com/npLfCGq.jpeg",
        "alt": "https://i.imgur.com/ZKGofuB.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This waffle knit long sleeve brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "L",
      "S"
    ]
  },
  {
    "name": "Retro Bowling Shirt",
    "category": "Accessories",
    "price": 99,
    "color": "Neon Green",
    "colors": [
      "Neon Green",
      "Cobalt Blue"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This retro bowling shirt brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Utility Belt Bag",
    "category": "Accessories",
    "price": 49,
    "color": "Cobalt Blue",
    "colors": [
      "Cobalt Blue",
      "Hot Pink"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/axsyGpD.jpeg"
      },
      {
        "color": "Hot Pink",
        "src": "https://i.imgur.com/mcW42Gi.jpeg",
        "alt": "https://i.imgur.com/axsyGpD.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This utility belt bag brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Contrast Stitch Carpenters",
    "category": "Bottoms",
    "price": 209,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/mcW42Gi.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This contrast stitch carpenters brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced."
  },
  {
    "name": "Sherpa Lined Denim",
    "category": "Knitwear",
    "price": 199,
    "color": "Hot Pink",
    "colors": [
      "Hot Pink",
      "Cobalt Blue",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Cobalt Blue",
        "src": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "color": "Neon Green",
        "src": "https://i.imgur.com/mcW42Gi.jpeg",
        "alt": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This sherpa lined denim brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 259
  },
  {
    "name": "Metallic Moon Boot",
    "category": "Shoes",
    "price": 79,
    "color": "Black",
    "colors": [
      "Black",
      "Hot Pink",
      "Acid Wash"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "images": [
      {
        "color": "Black",
        "src": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/qNOjJje.jpeg"
      },
      {
        "color": "Hot Pink",
        "src": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/qNOjJje.jpeg"
      },
      {
        "color": "Acid Wash",
        "src": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
        "alt": "https://i.imgur.com/qNOjJje.jpeg"
      }
    ],
    "isNew": false,
    "description": "Absolute grail status. This metallic moon boot brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "originalPrice": 109
  },
  {
    "name": "Subversive Basics Top",
    "category": "Bottoms",
    "price": 79,
    "color": "Washed Charcoal",
    "colors": [
      "Washed Charcoal",
      "Neon Green"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      {
        "color": "Washed Charcoal",
        "src": "https://i.imgur.com/sC0ztOB.jpeg",
        "alt": "https://i.imgur.com/ZKGofuB.jpeg"
      },
      {
        "color": "Neon Green",
        "src": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
        "alt": "https://i.imgur.com/ZKGofuB.jpeg"
      }
    ],
    "isNew": true,
    "description": "Absolute grail status. This subversive basics top brings that early 2000s energy mixed with modern streetwear silhouettes. Don't sleep on this drop.",
    "details": "Care: Cold wash inside out. Hang dry to preserve the graphic/fabric. Responsibly sourced.",
    "soldOutSizes": [
      "L"
    ]
  }
];

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
