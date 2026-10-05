import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/kalchar-hero.jpg";
import ready from "@/assets/category-ready.jpg";
import accessories from "@/assets/category-accessories.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [ { title: "KALCHAR — Modern Luxury, Made Yours" }, { name: "description", content: "Discover considered fashion for every expression. Shop Kalchar's modern wardrobe of dresses, tailoring, and accessories." }, { property: "og:title", content: "KALCHAR — Modern Luxury, Made Yours" }, { property: "og:description", content: "Discover considered fashion for every expression at Kalchar." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" } ] }),
  component: Home,
});
function Home() {
  const [remaining, setRemaining] = useState(60 * 60 * 8 + 23 * 60 + 41);
  useEffect(() => { const id = window.setInterval(() => setRemaining(current => Math.max(0, current - 1)), 1000); return () => window.clearInterval(id); }, []);
  const hours = String(Math.floor(remaining / 3600)).padStart(2, "0"), minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0"), seconds = String(remaining % 60).padStart(2, "0");
  return <main>
    <section className="hero"><img src={hero} alt="Kalchar editorial campaign featuring a sculptural ivory dress and tailored black coat" className="hero-image" width={1600} height={1056}/><div className="hero-content"><span className="eyebrow">THE NEW SEASON · 2026</span><h1>Style is<br/><em>an expression.</em></h1><p>Pieces to live in. Moments to remember. Discover a wardrobe that moves with you.</p><Link to="/shop" className="hero-button">EXPLORE THE COLLECTION <ArrowRight size={16}/></Link></div><div className="hero-counter">01 <span/> 03</div></section>
    <div className="intro-strip">Website is starting soon.</div>
    <section className="section editorial-container"><div className="section-header"><div><span className="eyebrow text-gold">THE EDIT</span><h2>Explore by category</h2></div><Link to="/shop" className="text-link">VIEW ALL <ArrowRight size={16}/></Link></div><div className="category-grid"><Link to="/shop" search={{ category: "Dresses" }} className="category-tile"><img src={ready} alt="Kalchar ready-to-wear dresses" loading="lazy" width={864} height={1104}/><div className="category-label"><h3>Ready to Wear</h3><span>DISCOVER <ArrowRight size={13} className="inline ml-2"/></span></div></Link><Link to="/shop" search={{ category: "Accessories" }} className="category-tile"><img src={accessories} alt="Kalchar handbag and heels" loading="lazy" width={864} height={1104}/><div className="category-label"><h3>Accessories</h3><span>DISCOVER <ArrowRight size={13} className="inline ml-2"/></span></div></Link></div></section>
    <section className="section editorial-container pt-0"><div className="section-header"><div><span className="eyebrow text-gold">JUST LANDED</span><h2>New arrivals</h2></div><Link to="/shop" className="text-link">SHOP ALL <ArrowRight size={16}/></Link></div><div className="product-grid home-product-grid">{products.slice(0, 5).map(product => <ProductCard key={product.id} product={product}/>)}</div></section>
    <section className="sale-band"><span className="eyebrow text-gold">A MOMENT WORTH WAITING FOR</span><h2>The private edit</h2><p>Selected pieces, for a limited time.</p><div className="timer"><div className="timer-block"><strong>{hours}</strong><span>HOURS</span></div><span className="timer-colon">:</span><div className="timer-block"><strong>{minutes}</strong><span>MINUTES</span></div><span className="timer-colon">:</span><div className="timer-block"><strong>{seconds}</strong><span>SECONDS</span></div></div><Link to="/shop" className="hero-button">DISCOVER THE EDIT <ArrowRight size={16}/></Link></section>
    <section className="newsletter"><span className="eyebrow text-gold">THE KALCHAR LETTER</span><h2>A little something, just for you.</h2><p>Our newsletter is coming soon.</p></section>
  </main>;
}
