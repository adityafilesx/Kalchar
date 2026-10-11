import { Link } from "@tanstack/react-router";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingImage } from "@/components/LoadingImage";
import { QuickView } from "@/components/QuickView";
import { useStore } from "@/lib/store-context";
import {
  firstAvailableSize,
  formatPrice,
  getImagesForColor,
  swatchColor,
  type Product,
} from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const [hovering, setHovering] = useState(false);
  const [previewColor, setPreviewColor] = useState(product.color);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const { src, hoverSrc } = getImagesForColor(product, previewColor);
  const displaySrc = hovering && hoverSrc ? hoverSrc : src;
  const saved = wishlist.includes(product.id);
  const soldOut = !firstAvailableSize(product);

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
          <LoadingImage src={displaySrc} alt={product.name} loading="lazy" />
          {hoverSrc && (
            <img
              src={hoverSrc}
              alt=""
              aria-hidden
              className="product-card-preload"
              loading="lazy"
            />
          )}
        </Link>
        {product.isNew && <span className="product-tag">NEW</span>}
        <Button
          variant="ghost"
          size="icon"
          className="favorite-button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </Button>

        <button
          type="button"
          className="quick-add-button"
          aria-label={`Quick view ${product.name}`}
          disabled={soldOut}
          onClick={() => setQuickViewOpen(true)}
        >
          {soldOut ? (
            "SOLD OUT"
          ) : (
            <>
              <Eye size={14} />
              QUICK VIEW
            </>
          )}
        </button>
      </div>

      <div className="product-card-meta">
        <div>
          <span>{product.category.toUpperCase()}</span>
          <Link to="/product/$id" params={{ id: String(product.id) }}>
            {product.name}
          </Link>
          {product.colors.length > 1 && (
            <div className="card-swatches">
              {product.colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`card-swatch ${previewColor === c ? "active" : ""}`}
                  aria-label={`Preview in ${c}`}
                  aria-pressed={previewColor === c}
                  title={c}
                  onClick={() => setPreviewColor(c)}
                >
                  <span style={{ background: swatchColor(c) }} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="prices">
          {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
          <strong>{formatPrice(product.price)}</strong>
        </div>
      </div>

      {quickViewOpen && (
        <QuickView
          product={product}
          initialColor={previewColor}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      )}
    </article>
  );
}
