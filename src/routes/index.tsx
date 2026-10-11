import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/kalchar-hero.jpg";
import ready from "@/assets/category-ready.jpg";
import accessories from "@/assets/category-accessories.jpg";
import { ProductCard } from "@/components/ProductCard";
import { NEW_ARRIVALS, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KALCHAR — Streetwear, Y2K Archives & Techwear" },
      {
        name: "description",
        content:
          "Shop Kalchar's streetwear, Y2K archives, techwear and accessories. New drops every season.",
      },
      { property: "og:title", content: "KALCHAR — Streetwear, Y2K Archives & Techwear" },
      {
        property: "og:description",
        content: "Streetwear, Y2K archives and techwear from Kalchar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PRIVATE_EDIT_ENDS_AT = Date.parse("2026-11-30T23:59:59Z");

const newArrivals = products.filter((product) => product.isNew).slice(0, 5);

function useCountdown(deadline: number) {
  // null until mounted so server and client render the same markup.
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);
  return remaining;
}

const pad = (value: number) => String(value).padStart(2, "0");

function Home() {
  const remaining = useCountdown(PRIVATE_EDIT_ENDS_AT);
  const ended = remaining === 0;
  const unit = (compute: (seconds: number) => number) =>
    remaining === null ? "--" : pad(compute(remaining));
  const units = [
    { label: "DAYS", value: unit((s) => Math.floor(s / 86400)) },
    { label: "HOURS", value: unit((s) => Math.floor((s % 86400) / 3600)) },
    { label: "MINUTES", value: unit((s) => Math.floor((s % 3600) / 60)) },
    { label: "SECONDS", value: unit((s) => s % 60) },
  ];

  return (
    <main>
      <section className="hero">
        <img
          src={hero}
          alt="Kalchar editorial campaign"
          className="hero-image"
          width={1600}
          height={1056}
        />
        <div className="hero-content">
          <span className="eyebrow">THE NEW SEASON · 2026</span>
          <h1>
            Style is
            <br />
            <em>an expression.</em>
          </h1>
          <p>Pieces to live in. Moments to remember. Discover a wardrobe that moves with you.</p>
          <Link to="/shop" className="hero-button">
            EXPLORE THE COLLECTION <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-counter">
          01 <span /> 03
        </div>
      </section>
      <div className="intro-strip">Website is starting soon.</div>
      <section className="section editorial-container">
        <div className="section-header">
          <div>
            <span className="eyebrow text-gold">THE EDIT</span>
            <h2>Explore by category</h2>
          </div>
          <Link to="/shop" className="text-link">
            VIEW ALL <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          <Link to="/shop" search={{ category: NEW_ARRIVALS }} className="category-tile">
            <img
              src={ready}
              alt="Kalchar new season looks"
              loading="lazy"
              width={864}
              height={1104}
            />
            <div className="category-label">
              <h3>New Arrivals</h3>
              <span>
                DISCOVER <ArrowRight size={13} className="inline ml-2" />
              </span>
            </div>
          </Link>
          <Link to="/shop" search={{ category: "Accessories" }} className="category-tile">
            <img
              src={accessories}
              alt="Kalchar handbag and heels"
              loading="lazy"
              width={864}
              height={1104}
            />
            <div className="category-label">
              <h3>Accessories</h3>
              <span>
                DISCOVER <ArrowRight size={13} className="inline ml-2" />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="section editorial-container pt-0">
        <div className="section-header">
          <div>
            <span className="eyebrow text-gold">JUST LANDED</span>
            <h2>New arrivals</h2>
          </div>
          <Link to="/shop" search={{ category: NEW_ARRIVALS }} className="text-link">
            SHOP ALL <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid home-product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="sale-band">
        <span className="eyebrow text-gold">A MOMENT WORTH WAITING FOR</span>
        <h2>The private edit</h2>
        {ended ? (
          <p>The private edit has ended. Thank you for shopping with us.</p>
        ) : (
          <>
            <p>Selected pieces, until 30 November.</p>
            <div className="timer" role="timer" aria-label="Time left in the private edit">
              {units.map(({ label, value }, index) => (
                <div className="timer-group" key={label}>
                  {index > 0 && <span className="timer-colon">:</span>}
                  <div className="timer-block">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <Link to="/shop" className="hero-button">
          DISCOVER THE EDIT <ArrowRight size={16} />
        </Link>
      </section>
      <section className="newsletter">
        <span className="eyebrow text-gold">THE KALCHAR LETTER</span>
        <h2>A little something, just for you.</h2>
        <p>Our newsletter is coming soon.</p>
      </section>
    </main>
  );
}
