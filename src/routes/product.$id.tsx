import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, Heart, PackageCheck, RotateCcw, X, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/StoreProvider";
import {
  formatPrice,
  getImagesForColor,
  products,
  sizeGuide,
} from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.product.name} — KALCHAR`
          : "Product Not Found — KALCHAR",
      },
      {
        name: "description",
        content: loaderData
          ? `Discover the ${loaderData.product.name} at Kalchar. Considered style for the modern wardrobe.`
          : "Explore the Kalchar collection.",
      },
      {
        property: "og:title",
        content: loaderData
          ? `${loaderData.product.name} — KALCHAR`
          : "Product Not Found — KALCHAR",
      },
      {
        property: "og:description",
        content: loaderData
          ? `Discover the ${loaderData.product.name} at Kalchar.`
          : "Explore the Kalchar collection.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => (
    <div className="editorial-container section text-center">
      <h1 className="section-title">This piece could not be found.</h1>
      <Link to="/shop" className="text-link mt-8">
        EXPLORE THE COLLECTION <ArrowRight size={16} />
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="editorial-container section text-center">
      <h1 className="section-title">This piece is unavailable.</h1>
      <Link to="/shop" className="text-link mt-8">
        EXPLORE THE COLLECTION <ArrowRight size={16} />
      </Link>
    </div>
  ),
  component: ProductPage,
});

const swatchColors: Record<string, string> = {
  Black: "oklch(0.2 0 0)",
  Ivory: "oklch(0.93 0.02 90)",
  White: "oklch(1 0 0)",
  Camel: "oklch(0.68 0.055 73)",
};

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.color);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { addItem, wishlist, toggleWishlist } = useStore();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Build the gallery from the selected color's images
  const colorImages = getImagesForColor(product, color);
  const images: string[] = [];
  if (colorImages) {
    images.push(colorImages.src);
    if (colorImages.alt) images.push(colorImages.alt);
  } else {
    images.push(product.image);
  }

  // Reset active image when color changes
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setActiveImage(0);
  };

  // Zoom on hover
  const handleZoomMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const isSoldOut = (s: string) =>
    product.soldOutSizes?.includes(s) ?? false;

  const isShoeCategory = product.category === "Shoes";

  return (
    <main>
      <div className="editorial-container product-layout">
        {/* Left: Gallery */}
        <div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
            <Link to="/shop" search={{ category: product.category }}>
              {product.category}
            </Link>{" "}
            / {product.name}
          </div>
          <div
            className={`gallery-main ${zooming ? "gallery-zooming" : ""}`}
            ref={imgRef}
            onMouseEnter={() => setZooming(true)}
            onMouseLeave={() => setZooming(false)}
            onMouseMove={handleZoomMove}
            style={
              zooming
                ? ({
                    "--zoom-x": `${zoomPos.x}%`,
                    "--zoom-y": `${zoomPos.y}%`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            <img
              src={images[activeImage]}
              alt={`${product.name} — ${color}, view ${activeImage + 1}`}
            />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={activeImage === index ? "active" : ""}
                  aria-label={`View image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product details */}
        <div className="product-details">
          <span className="eyebrow text-gold">
            {product.category.toUpperCase()} · KALCHAR
          </span>
          <h1>{product.name}</h1>
          <p className="detail-price">
            {product.originalPrice && (
              <del>{formatPrice(product.originalPrice)}</del>
            )}
            {formatPrice(product.price)}
          </p>
          <p className="detail-description">{product.description}</p>

          {/* Color selection */}
          <p className="selection-label">
            COLOR <span>— {color}</span>
          </p>
          <div className="swatches">
            {product.colors.map((value) => (
              <Button
                variant="ghost"
                key={value}
                className={`swatch ${color === value ? "active" : ""}`}
                aria-label={`Select ${value}`}
                title={value}
                onClick={() => handleColorChange(value)}
              >
                <span
                  className="swatch-inner"
                  style={
                    {
                      "--swatch-color": swatchColors[value],
                    } as React.CSSProperties
                  }
                />
              </Button>
            ))}
          </div>

          {/* Size selection */}
          <p className="selection-label">
            SELECT SIZE <span>— {size || "Choose your size"}</span>
            <button
              className="size-guide-link"
              onClick={() => setSizeGuideOpen(true)}
            >
              <Ruler size={14} />
              Size Guide
            </button>
          </p>
          <div className="size-options">
            {product.sizes.map((value) => {
              const soldOut = isSoldOut(value);
              return (
                <Button
                  variant="ghost"
                  key={value}
                  className={`${size === value ? "active" : ""} ${soldOut ? "sold-out" : ""}`}
                  disabled={soldOut}
                  onClick={() => {
                    setSize(value);
                    setError(false);
                  }}
                  title={soldOut ? `${value} — Sold out` : value}
                >
                  {value}
                  {soldOut && <span className="sold-out-line" />}
                </Button>
              );
            })}
          </div>
          {error && (
            <p className="size-error">Please select a size first.</p>
          )}

          {/* Actions */}
          <div className="detail-actions">
            <Button
              onClick={() => {
                if (!size) {
                  setError(true);
                  return;
                }
                addItem(product, size, color);
              }}
              className="add-to-bag-btn"
            >
              ADD TO BAG <ArrowRight size={16} />
            </Button>
            <Button
              variant="ghost"
              aria-label={
                wishlist.includes(product.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                size={19}
                fill={
                  wishlist.includes(product.id) ? "currentColor" : "none"
                }
              />
            </Button>
          </div>

          {/* Benefits */}
          <div className="detail-benefits">
            <p>
              <PackageCheck size={17} /> Complimentary shipping on orders over
              $200
            </p>
            <p>
              <RotateCcw size={17} /> Easy returns within 30 days
            </p>
          </div>

          {/* Accordions — unique data */}
          <details className="detail-accordion">
            <summary>THE DETAILS</summary>
            <p>{product.details}</p>
          </details>
          <details className="detail-accordion">
            <summary>SHIPPING &amp; RETURNS</summary>
            <p>
              Complimentary shipping on orders over $200. Standard delivery
              takes 3–5 business days. Express delivery available at checkout.
              Returns accepted within 30 days of delivery — items must be
              unworn, unwashed, and in their original packaging.
            </p>
          </details>
          <details className="detail-accordion">
            <summary>REVIEWS</summary>
            <p>
              No reviews yet. Be the first to share your thoughts when the
              full store opens.
            </p>
          </details>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="editorial-container related">
          <div className="section-header">
            <div>
              <span className="eyebrow text-gold">CURATED FOR YOU</span>
              <h2>You may also like</h2>
            </div>
            <Link to="/shop" className="text-link">
              SHOP ALL <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="overlay" onClick={() => setSizeGuideOpen(false)}>
          <div
            className="size-guide-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-heading">
              <h2>Size Guide</h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close size guide"
                onClick={() => setSizeGuideOpen(false)}
              >
                <X />
              </Button>
            </div>
            <div className="size-guide-content">
              {isShoeCategory ? (
                <>
                  <h3 className="size-guide-subtitle">Shoe Sizes</h3>
                  <div className="size-guide-table-wrap">
                    <table className="size-guide-table">
                      <thead>
                        <tr>
                          {sizeGuide.shoeHeaders.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide.shoeRows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={i}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="size-guide-subtitle">Clothing</h3>
                  <div className="size-guide-table-wrap">
                    <table className="size-guide-table">
                      <thead>
                        <tr>
                          {sizeGuide.headers.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={i}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <p className="size-guide-note">
                Measurements are in centimeters and are approximate. For the
                best fit, we recommend comparing these measurements with a
                garment you already own.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
