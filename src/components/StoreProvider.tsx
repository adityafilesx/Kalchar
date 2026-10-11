import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NEW_ARRIVALS,
  formatPrice,
  productById,
  productCategories,
  products,
  type Product,
} from "@/lib/products";
import { readStored, storedCartSchema, storedIdsSchema, writeStored } from "@/lib/storage";
import { StoreContext, type CartItem } from "@/lib/store-context";

type Toast = { id: number; message: string };

const CART_KEY = "kalchar_cart";
const WISHLIST_KEY = "kalchar_wishlist";
const RECENT_KEY = "kalchar_recently_viewed";
const MAX_TOASTS = 3;
const MAX_RECENT = 8;

const cartKey = (productId: number, size: string, color: string) => `${productId}-${size}-${color}`;

function loadCart(): CartItem[] {
  return readStored(CART_KEY, storedCartSchema, []).flatMap((entry) => {
    const product = productById(entry.productId);
    if (!product || !product.sizes.includes(entry.size) || !product.colors.includes(entry.color))
      return [];
    return [
      {
        key: cartKey(product.id, entry.size, entry.color),
        product,
        size: entry.size,
        color: entry.color,
        quantity: entry.quantity,
      },
    ];
  });
}

const loadIds = (key: string) => [
  ...new Set(readStored(key, storedIdsSchema, []).filter((id) => productById(id))),
];

const menuCategories = [NEW_ARRIVALS, ...productCategories];

export function StoreProvider({ children }: { children: ReactNode }) {
  // Start empty on both server and client; saved state loads after mount to avoid hydration mismatches.
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    setItems(loadCart());
    setWishlist(loadIds(WISHLIST_KEY));
    setRecentlyViewed(loadIds(RECENT_KEY).slice(0, MAX_RECENT));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStored(
      CART_KEY,
      items.map(({ product, size, color, quantity }) => ({
        productId: product.id,
        size,
        color,
        quantity,
      })),
    );
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) writeStored(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (hydrated) writeStored(RECENT_KEY, recentlyViewed);
  }, [recentlyViewed, hydrated]);

  const anyPanelOpen = cartOpen || wishlistOpen || menuOpen || searchOpen;
  useEffect(() => {
    if (!anyPanelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setCartOpen(false);
      setWishlistOpen(false);
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyPanelOpen]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message }].slice(-MAX_TOASTS));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const addItem = useCallback(
    (product: Product, size: string, color: string) => {
      const key = cartKey(product.id, size, color);
      setItems((current) =>
        current.some((item) => item.key === key)
          ? current.map((item) =>
              item.key === key ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item,
            )
          : [...current, { key, product, size, color, quantity: 1 }],
      );
      setCartOpen(true);
      showToast(`${product.name} added to your bag`);
    },
    [showToast],
  );

  const changeQuantity = useCallback((key: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.min(99, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback(
    (id: number) => {
      const product = productById(id);
      const saved = wishlist.includes(id);
      setWishlist((current) =>
        current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
      );
      if (product) {
        showToast(
          saved ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`,
        );
      }
    },
    [wishlist, showToast],
  );

  const markViewed = useCallback((id: number) => {
    setRecentlyViewed((current) =>
      [id, ...current.filter((value) => value !== id)].slice(0, MAX_RECENT),
    );
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const results = products
    .filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 5);
  const wishlistProducts = wishlist.flatMap((id) => productById(id) ?? []);

  return (
    <StoreContext.Provider
      value={{
        items,
        openCart: () => setCartOpen(true),
        addItem,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        markViewed,
      }}
    >
      <div className="announcement">
        A NEW SEASON OF EXPRESSION <span className="mx-3">·</span> COMPLIMENTARY SHIPPING OVER $200
      </div>

      <header className="site-header">
        <div className="header-inner">
          <div className="header-left">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </Button>
            <nav className="desktop-nav">
              <Link to="/shop">SHOP</Link>
              <Link to="/shop" search={{ category: NEW_ARRIVALS }}>
                NEW ARRIVALS
              </Link>
            </nav>
          </div>
          <Link to="/" className="wordmark" aria-label="Kalchar home">
            KALCHAR
          </Link>
          <div className="header-actions">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Open wishlist, ${wishlist.length} saved`}
              onClick={() => setWishlistOpen(true)}
              className="relative"
            >
              <Heart />
              {wishlist.length > 0 && <span className="bag-count">{wishlist.length}</span>}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingBag />
              {count > 0 && <span className="bag-count">{count}</span>}
            </Button>
          </div>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">KALCHAR</div>
            <p>For the art of being yourself.</p>
          </div>
          <div>
            <h3>EXPLORE</h3>
            <Link to="/shop">Shop all</Link>
            <Link to="/shop" search={{ category: NEW_ARRIVALS }}>
              New arrivals
            </Link>
            <Link to="/shop" search={{ category: "Accessories" }}>
              Accessories
            </Link>
          </div>
          <div>
            <h3>INFORMATION</h3>
            <p>Customer care</p>
            <p>Shipping &amp; returns</p>
            <p>Privacy policy</p>
          </div>
          <div>
            <h3>FOLLOW ALONG</h3>
            <p>Instagram</p>
            <p>Pinterest</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 KALCHAR. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED TO BE REMEMBERED.</span>
        </div>
      </footer>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="side-panel left-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <span className="wordmark panel-wordmark">KALCHAR</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <div className="mobile-links">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home <ArrowRight size={18} />
              </Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                Shop all <ArrowRight size={18} />
              </Link>
              {menuCategories.map((category) => (
                <Link
                  key={category}
                  to="/shop"
                  search={{ category }}
                  onClick={() => setMenuOpen(false)}
                >
                  {category}
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <aside
            className="side-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <h2>Search the collection</h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X />
              </Button>
            </div>
            <input
              className="search-input"
              autoFocus
              aria-label="Search products"
              placeholder="What are you looking for?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <div className="search-results">
                {results.length ? (
                  results.map((product) => (
                    <Link
                      key={product.id}
                      to="/product/$id"
                      params={{ id: String(product.id) }}
                      onClick={() => setSearchOpen(false)}
                    >
                      <img src={product.image} alt="" />
                      <span>
                        {product.name}
                        <small>{formatPrice(product.price)}</small>
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  ))
                ) : (
                  <p>No pieces found.</p>
                )}
              </div>
            )}
          </aside>
        </div>
      )}

      {wishlistOpen && (
        <div className="overlay" onClick={() => setWishlistOpen(false)}>
          <aside
            className="side-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Wishlist"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <h2>
                Wishlist <span>({wishlistProducts.length})</span>
              </h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close wishlist"
                onClick={() => setWishlistOpen(false)}
              >
                <X />
              </Button>
            </div>
            {wishlistProducts.length ? (
              <div className="cart-items">
                {wishlistProducts.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <Link
                      to="/product/$id"
                      params={{ id: String(product.id) }}
                      onClick={() => setWishlistOpen(false)}
                    >
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div>
                      <Link
                        to="/product/$id"
                        params={{ id: String(product.id) }}
                        onClick={() => setWishlistOpen(false)}
                        className="cart-name"
                      >
                        {product.name}
                      </Link>
                      <p>{formatPrice(product.price)}</p>
                      <div className="wishlist-actions">
                        <Link
                          to="/product/$id"
                          params={{ id: String(product.id) }}
                          onClick={() => setWishlistOpen(false)}
                        >
                          CHOOSE SIZE
                        </Link>
                        <button type="button" onClick={() => toggleWishlist(product.id)}>
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <Heart size={32} strokeWidth={1} />
                <h3>Nothing saved yet</h3>
                <p>Tap the heart on any piece to keep it here for later.</p>
                <Button asChild onClick={() => setWishlistOpen(false)}>
                  <Link to="/shop">FIND SOMETHING YOU LOVE</Link>
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="side-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <h2>
                Your bag <span>({count})</span>
              </h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
              >
                <X />
              </Button>
            </div>
            {items.length ? (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div className="cart-item" key={item.key}>
                      <Link
                        to="/product/$id"
                        params={{ id: String(item.product.id) }}
                        onClick={() => setCartOpen(false)}
                      >
                        <img src={item.product.image} alt={item.product.name} />
                      </Link>
                      <div>
                        <Link
                          to="/product/$id"
                          params={{ id: String(item.product.id) }}
                          onClick={() => setCartOpen(false)}
                          className="cart-name"
                        >
                          {item.product.name}
                        </Link>
                        <p>
                          {item.color} / {item.size}
                        </p>
                        <p>{formatPrice(item.product.price)}</p>
                        <div className="quantity-control">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Decrease quantity"
                            onClick={() => changeQuantity(item.key, -1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Increase quantity"
                            onClick={() => changeQuantity(item.key, 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-bottom">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <p>Shipping and taxes calculated at checkout.</p>
                  <Button className="w-full h-12" disabled title="Checkout coming soon">
                    CHECKOUT COMING SOON
                  </Button>
                  <Link to="/shop" onClick={() => setCartOpen(false)} className="continue-link">
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingBag size={32} strokeWidth={1} />
                <h3>Your bag is empty</h3>
                <p>Discover something worth keeping.</p>
                <Button asChild onClick={() => setCartOpen(false)}>
                  <Link to="/shop">EXPLORE THE COLLECTION</Link>
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}

      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <Check size={15} />
            {toast.message}
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}
