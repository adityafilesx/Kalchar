import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice, getImagesForColor, type Product } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";

const swatchColors: Record<string, string> = {
  Black: "oklch(0.2 0 0)",
  Ivory: "oklch(0.93 0.02 90)",
  White: "oklch(1 0 0)",
  Camel: "oklch(0.68 0.055 73)",
};

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addItem } = useStore();
  const [hovering, setHovering] = useState(false);
  const [previewColor, setPreviewColor] = useState(product.color);

  const colorImages = getImagesForColor(product, previewColor);
  const primarySrc = colorImages?.src ?? product.image;
  const altSrc = colorImages?.alt;

  // Show alt image on hover if available
  const displaySrc = hovering && altSrc ? altSrc : primarySrc;

  return (
    <article className="product-card">
      <div
        className="product-card-image"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Link
          to="/product/$id"
          params={{ id: String(product.id) }}
          aria-label={`View ${product.name}`}
        >
          <img
            src={displaySrc}
            alt={product.name}
            loading="lazy"
          />
          {/* Preload alt image so hover swap is instant */}
          {altSrc && (
            <img
              src={altSrc}
              alt=""
              aria-hidden
              className="product-card-preload"
            />
          )}
        </Link>
        {product.isNew && <span className="product-tag">NEW</span>}
        <Button
          variant="ghost"
          size="icon"
          className="favorite-button"
          aria-label={
            wishlist.includes(product.id)
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name}`
          }
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={18}
            fill={wishlist.includes(product.id) ? "currentColor" : "none"}
          />
        </Button>

        {/* Quick-add button on hover */}
        <button
          className="quick-add-button"
          aria-label={`Quick add ${product.name}`}
          onClick={() => addItem(product, product.sizes[0] ?? "One Size", previewColor)}
        >
          <ShoppingBag size={14} />
          QUICK ADD
        </button>
      </div>

      <div className="product-card-meta">
        <div>
          <span>{product.category.toUpperCase()}</span>
          <Link
            to="/product/$id"
            params={{ id: String(product.id) }}
          >
            {product.name}
          </Link>
          {/* Color swatches on the card */}
          {product.colors.length > 1 && (
            <div className="card-swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`card-swatch ${previewColor === c ? "active" : ""}`}
                  aria-label={`Preview in ${c}`}
                  title={c}
                  onClick={() => setPreviewColor(c)}
                >
                  <span style={{ background: swatchColors[c] ?? "#888" }} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="prices">
          {product.originalPrice && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
          <strong>{formatPrice(product.price)}</strong>
        </div>
      </div>
    </article>
  );
}
