import json

with open("src/lib/products.ts", "r") as f:
    content = f.read()

prefix = 'const catalog: Omit<Product, "id" | "image">[] = '
start_idx = content.find(prefix) + len(prefix)
end_idx = content.find("];", start_idx) + 1

json_str = content[start_idx:end_idx]

catalog = json.loads(json_str)

new_items = [
    {
        "name": "Neon Genesis Bomber",
        "category": "Outerwear",
        "price": 149,
        "color": "Neon Green",
        "colors": ["Neon Green", "Black"],
        "sizes": ["S", "M", "L", "XL"],
        "images": [
            {"color": "Neon Green", "src": "https://i.imgur.com/mcW42Gi.jpeg", "alt": "https://i.imgur.com/cHddUCu.jpeg"},
            {"color": "Black", "src": "https://i.imgur.com/qNOjJje.jpeg", "alt": "https://i.imgur.com/cHddUCu.jpeg"}
        ],
        "isNew": True,
        "description": "Just landed. The ultimate statement bomber for the season.",
        "details": "Premium nylon with tech lining."
    },
    {
        "name": "Holographic Mini Skirt",
        "category": "Bottoms",
        "price": 85,
        "color": "Cyber Silver",
        "colors": ["Cyber Silver"],
        "sizes": ["XS", "S", "M", "L"],
        "images": [
            {"color": "Cyber Silver", "src": "https://i.imgur.com/HqYqLnW.jpeg", "alt": "https://i.imgur.com/cBuLvBi.jpeg"}
        ],
        "isNew": True,
        "description": "Reflect your energy. Perfect for night outs and festivals.",
        "details": "Wipe clean only. Do not machine wash."
    },
    {
        "name": "Distressed Knit Sweater",
        "category": "Knitwear",
        "price": 110,
        "color": "Washed Charcoal",
        "colors": ["Washed Charcoal", "Olive Drab"],
        "sizes": ["S", "M", "L", "XL"],
        "images": [
            {"color": "Washed Charcoal", "src": "https://i.imgur.com/npLfCGq.jpeg", "alt": "https://i.imgur.com/Au8J9sX.jpeg"},
            {"color": "Olive Drab", "src": "https://i.imgur.com/62gGzeF.jpeg", "alt": "https://i.imgur.com/Au8J9sX.jpeg"}
        ],
        "isNew": True,
        "description": "The perfect distressed look, straight out of the archives.",
        "details": "100% Cotton. Hand wash cold."
    },
    {
        "name": "Hyper-Tech Utility Vest",
        "category": "Techwear",
        "price": 135,
        "color": "Black",
        "colors": ["Black"],
        "sizes": ["M", "L", "XL"],
        "images": [
            {"color": "Black", "src": "https://i.imgur.com/9qrmE1b.jpeg", "alt": "https://i.imgur.com/hKcMNJs.jpeg"}
        ],
        "isNew": True,
        "description": "Function meets streetwear. 12 pockets, water resistant.",
        "details": "Ripstop nylon fabric."
    },
    {
        "name": "Chunky Platform Loafers",
        "category": "Shoes",
        "price": 180,
        "color": "Black",
        "colors": ["Black", "White"],
        "sizes": ["37", "38", "39", "40", "41"],
        "images": [
            {"color": "Black", "src": "https://i.imgur.com/AzAY4Ed.jpeg", "alt": "https://i.imgur.com/sC0ztOB.jpeg"},
            {"color": "White", "src": "https://i.imgur.com/hKcMNJs.jpeg", "alt": "https://i.imgur.com/sC0ztOB.jpeg"}
        ],
        "isNew": True,
        "description": "Elevate your stance. The classic loafer on a 3-inch sole.",
        "details": "Vegan leather construction."
    }
]

catalog = new_items + catalog

new_json_str = json.dumps(catalog, indent=2)

new_content = content[:start_idx] + new_json_str + content[end_idx:]
with open("src/lib/products.ts", "w") as f:
    f.write(new_content)
print("Done")
