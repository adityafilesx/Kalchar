# KALCHAR — Streetwear, Y2K Archives & Techwear

The **KALCHAR** storefront: a Gen-Z streetwear and Y2K-inspired fashion shop. This is the frontend only — there is no backend yet, so the bag, wishlist and recently-viewed list live in the browser and checkout is disabled.

## Features

- **Product catalog:** 55 pieces across streetwear, Y2K archives, techwear, outerwear, tops, bottoms, knitwear, shoes and accessories.
- **Shop filters and sorting:** filter by category (including New Arrivals), size, colour and price, with removable filter chips. The filter options are generated from the catalog, so every option matches real products.
- **Product pages:** colour swatches that swap the gallery, hover zoom, size guide (clothing and shoes), sold-out sizes, a sticky add-to-bag bar on mobile and a recently-viewed strip.
- **Quick view:** pick a colour and size and add to bag from any product card without leaving the grid.
- **Bag and wishlist:** saved in `localStorage` and validated on load, so corrupt data falls back to an empty state instead of breaking the page.
- **Responsive layout** for desktop, tablet and mobile.

## Tech stack

- **Framework:** [React 19](https://react.dev) with [TanStack Start](https://tanstack.com/start) (SSR) on [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (file-based)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) primitives, plus custom CSS in `src/styles.css`
- **Validation:** [Zod](https://zod.dev) for the catalog and stored state
- **Icons:** [Lucide](https://lucide.dev/)
- **Tests:** [Vitest](https://vitest.dev/) and Testing Library

## Development

Requires **Node.js 22.12+** and **npm** (the project uses `package-lock.json`; do not commit other lockfiles).

```sh
git clone https://github.com/adityafilesx/Kalchar.git
cd Kalchar
nvm use      # reads .nvmrc (Node 22.12)
npm ci
npm run dev
```

The app runs at `http://localhost:8080` (or the next free port).

| Command          | What it does                   |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start the dev server           |
| `npm run build`  | Production build               |
| `npm test`       | Run the test suite             |
| `npm run lint`   | Lint and check formatting      |
| `npm run format` | Format all files with Prettier |

## Project structure

- `src/routes/` — file-based routes: `index.tsx` (home), `shop.tsx` (catalog), `product.$id.tsx` (product page).
- `src/components/` — `StoreProvider.tsx` (header, footer, bag, wishlist, search), `ProductCard.tsx`, `QuickView.tsx`, `ProductOptions.tsx` and shadcn primitives in `ui/`.
- `src/data/products.json` — the catalog data. Each product has a stable `id`; images are paths under `public/`.
- `src/lib/products.ts` — validates the catalog and derives categories, sizes, colours and price bounds from it.
- `src/lib/storage.ts` — validated `localStorage` reads and writes.
- `public/products/` — self-hosted product images.

### Adding a product

Add an entry to `src/data/products.json` with the next unused `id`, put its images in `public/products/`, and run `npm test` — the tests check that ids are unique and every image file exists.

## Lovable

This project is connected to [Lovable](https://lovable.dev). Commits pushed to `main` sync back to the Lovable editor, so keep `main` working, and never rewrite pushed history (no force pushes, rebases, amends or squashes of pushed commits).
