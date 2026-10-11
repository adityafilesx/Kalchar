import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ArrowRight, Heart, PackageCheck, RotateCcw, Ruler, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ColorSwatches, SizeSelector } from "@/components/ProductOptions";
import { useStore } from "@/lib/store-context";
import {
  formatPrice,
  getImagesForColor,
  productById,
  products,
  sizeGuide,
  type Product,
} from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = productById(Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.product.name} — KALCHAR` : "Product Not Found — KALCHAR",
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
  component: ProductRoute,
});

function ProductRoute() {
  const { product } = Route.useLoaderData();
  // Keyed so colour/size/gallery state resets when navigating between products.
  return <ProductPage key={product.id} product={product} />;
}

function ProductPage({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.color);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const { addItem, wishlist, toggleWishlist, recentlyViewed, markViewed } = useStore();
  const saved = wishlist.includes(product.id);

  useEffect(() => {
    markViewed(product.id);
  }, [product.id, markViewed]);

  useEffect(() => {
    const target = actionsRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sizeGuideOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSizeGuideOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sizeGuideOpen]);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const recent = recentlyViewed
    .filter((id) => id !== product.id)
    .flatMap((id) => productById(id) ?? [])
    .slice(0, 4);

  const colorImages = getImagesForColor(product, color);
  const images = colorImages.hoverSrc ? [colorImages.src, colorImages.hoverSrc] : [colorImages.src];

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setActiveImage(0);
  };

  const handleZoomMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAdd = () => {
    if (!size) {
      setError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addItem(product, size, color);
  };

  const isShoeCategory = product.category === "Shoes";

  return (
    <main>
      <div className="editorial-container product-layout">
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
                ? ({ "--zoom-x": `${zoomPos.x}%`, "--zoom-y": `${zoomPos.y}%` } as CSSProperties)
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
                  type="button"
                  key={image}
                  className={activeImage === index ? "active" : ""}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details">
          <span className="eyebrow text-gold">{product.category.toUpperCase()} · KALCHAR</span>
          <h1>{product.name}</h1>
          <p className="detail-price">
            {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
            {formatPrice(product.price)}
          </p>
          <p className="detail-description">{product.description}</p>

          <ColorSwatches product={product} color={color} onChange={handleColorChange} />

          <div ref={sizeRef}>
            <SizeSelector
              product={product}
              size={size}
              error={error}
              onChange={(value) => {
                setSize(value);
                setError(false);
              }}
              labelExtra={
                <button
                  type="button"
                  className="size-guide-link"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  <Ruler size={14} />
                  Size Guide
                </button>
              }
            />
          </div>

          <div className="detail-actions" ref={actionsRef}>
            <Button onClick={handleAdd} className="add-to-bag-btn">
              ADD TO BAG <ArrowRight size={16} />
            </Button>
            <Button
              variant="ghost"
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={saved}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={19} fill={saved ? "currentColor" : "none"} />
            </Button>
          </div>

          <div className="detail-benefits">
            <p>
              <PackageCheck size={17} /> Complimentary shipping on orders over $200
            </p>
            <p>
              <RotateCcw size={17} /> Easy returns within 30 days
            </p>
          </div>

          <details className="detail-accordion">
            <summary>THE DETAILS</summary>
            <p>{product.details}</p>
          </details>
          <details className="detail-accordion">
            <summary>SHIPPING &amp; RETURNS</summary>
            <p>
              Complimentary shipping on orders over $200. Standard delivery takes 3–5 business days.
              Express delivery available at checkout. Returns accepted within 30 days of delivery —
              items must be unworn, unwashed, and in their original packaging.
            </p>
          </details>
          <details className="detail-accordion">
            <summary>REVIEWS</summary>
            <p>No reviews yet. Be the first to share your thoughts when the full store opens.</p>
          </details>
        </div>
      </div>

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

      {recent.length > 0 && (
        <section className="editorial-container related">
          <div className="section-header">
            <div>
              <span className="eyebrow text-gold">PICK UP WHERE YOU LEFT OFF</span>
              <h2>Recently viewed</h2>
            </div>
          </div>
          <div className="product-grid">
            {recent.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div
        className={`sticky-add-bar ${showStickyBar ? "visible" : ""}`}
        aria-hidden={!showStickyBar}
      >
        <div className="sticky-add-info">
          <strong>{product.name}</strong>
          <span>
            {formatPrice(product.price)} · {color}
            {size ? ` / ${size}` : ""}
          </span>
        </div>
        <Button onClick={handleAdd} tabIndex={showStickyBar ? 0 : -1}>
          {size ? "ADD TO BAG" : "SELECT SIZE"}
        </Button>
      </div>

      {sizeGuideOpen && (
        <div className="overlay" onClick={() => setSizeGuideOpen(false)}>
          <div
            className="size-guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
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
              <h3 className="size-guide-subtitle">{isShoeCategory ? "Shoe Sizes" : "Clothing"}</h3>
              <div className="size-guide-table-wrap">
                <table className="size-guide-table">
                  <thead>
                    <tr>
                      {(isShoeCategory ? sizeGuide.shoeHeaders : sizeGuide.headers).map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(isShoeCategory ? sizeGuide.shoeRows : sizeGuide.rows).map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="size-guide-note">
                Measurements are in centimeters and are approximate. For the best fit, we recommend
                comparing these measurements with a garment you already own.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
