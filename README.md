# KALCHAR — Modern Streetwear & Y2K Archives

Welcome to the **KALCHAR** e-commerce frontend. This project is a highly dynamic, Gen-Z focused streetwear and Y2K aesthetic clothing brand platform.

Built for high performance and an immaculate user experience, KALCHAR leverages modern web technologies to deliver a flawless shopping experience.

![Kalchar Preview](https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80)

## 🚀 Features

- **Dynamic Product Catalog:** Features 50 unique items curated with a streetwear, Y2K, and techwear aesthetic.
- **Client-Side Persistence:** LocalStorage-based robust Cart and Wishlist functionality that remembers your items across sessions.
- **Rich Aesthetics:** Modern typography, subtle micro-animations, glassmorphism hints, and a tailored color palette built entirely with custom CSS.
- **Responsive Layout:** fully optimized grids and flexbox layouts that scale perfectly across desktop, tablet, and mobile displays.
- **Product Details (PDP):** Interactive color swatches with instant image swapping, size guide modals, and "add to cart" toasts.
- **New Arrivals Showcase:** A 5-column grid layout exclusively highlighting the freshest drops on the home page.
- **Instant Filtering & Sorting:** Category filters dynamically update the main shop catalog without page reloads.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev) via [TanStack Start](https://tanstack.com/start) / [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (file-based routing)
- **Language:** TypeScript
- **Styling:** Custom CSS with [Tailwind CSS v4](https://tailwindcss.com/) integration for utility basics.
- **Icons:** [Lucide React](https://lucide.dev/)

## 💻 Development

### Prerequisites

You need Node.js (v18+) and npm installed.

### Setup

```sh
# 1. Clone the repository
git clone https://github.com/adityafilesx/Kalchar.git

# 2. Navigate to the project directory
cd Kalchar

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080` (or another port if 8080 is taken).

## 📁 Project Structure

- `src/routes/`: Contains the file-based routes (`index.tsx` for home, `shop.tsx` for the catalog, `product.$id.tsx` for the PDP).
- `src/components/`: Reusable React components (e.g., `ProductCard.tsx`, `StoreProvider.tsx` for global state).
- `src/lib/`: Core utilities and data definitions, including the robust `products.ts` catalog.
- `src/styles.css`: The global stylesheet handling the complex grid layouts and theming.

## 🤝 Integration with Lovable

*Note: This project is connected to [Lovable](https://lovable.dev).* 
- Commits pushed to the `main` branch sync back to Lovable and show up in the editor.
- **Important:** Avoid rewriting published git history (force pushing, rebasing, amending, or squashing pushed commits) to prevent losing project history on Lovable's side.

---
*Stay Funky. Stay Y2K. Welcome to KALCHAR.*
