import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  ShoppingBag,
  X,
  Minus,
  Plus,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, products, type Product } from "@/lib/products";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CartItem = {
  key: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type Toast = { id: number; message: string };

type StoreContextValue = {
  items: CartItem[];
  openCart: () => void;
  addItem: (product: Product, size: string, color: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store unavailable");
  return store;
}

// ---------------------------------------------------------------------------
// LocalStorage helpers
// ---------------------------------------------------------------------------

const CART_KEY = "kalchar_cart";
const WISHLIST_KEY = "kalchar_wishlist";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as {
      productId: number;
      size: string;
      color: string;
      quantity: number;
    }[];
    return parsed
      .map((entry) => {
        const product = products.find((p) => p.id === entry.productId);
        if (!product) return null;
        return {
          key: `${entry.productId}-${entry.size}-${entry.color}`,
          product,
          size: entry.size,
          color: entry.color,
          quantity: entry.quantity,
        } as CartItem;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
      ),
    );
  } catch {
    /* quota exceeded — silently degrade */
  }
}

function loadWishlist(): number[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: number[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    /* silently degrade */
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

const categoriesMenu = [
  "Dresses",
  "Tops",
  "Tailoring",
  "Outerwear",
  "Accessories",
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>(() => loadWishlist());
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist cart to localStorage on every change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Persist wishlist to localStorage on every change
  useEffect(() => {
    saveWishlist(wishlist);
  }, [wishlist]);

  // Toast helper
  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const addItem = useCallback(
    (product: Product, size: string, color: string) => {
      const key = `${product.id}-${size}-${color}`;
      setItems((current) =>
        current.some((item) => item.key === key)
          ? current.map((item) =>
              item.key === key
                ? { ...item, quantity: item.quantity + 1 }
                : item,
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
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback(
    (id: number) => {
      setWishlist((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );
      const product = products.find((p) => p.id === id);
      if (product) {
        const isAdding = !wishlist.includes(id);
        showToast(
          isAdding
            ? `${product.name} saved to wishlist`
            : `${product.name} removed from wishlist`,
        );
      }
    },
    [wishlist, showToast],
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
  const results = products
    .filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 5);

  return (
    <StoreContext.Provider
      value={{
        items,
        openCart: () => setCartOpen(true),
        addItem,
        wishlist,
        toggleWishlist,
      }}
    >
      {/* Announcement bar */}
      <div className="announcement">
        A NEW SEASON OF EXPRESSION{" "}
        <span className="mx-3">·</span> COMPLIMENTARY SHIPPING OVER $200
      </div>

      {/* Header */}
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
              <Link to="/shop" search={{ category: "Dresses" }}>
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
              aria-label={`Open bag, ${count} items`}
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingBag />
              {count > 0 && <span className="bag-count">{count}</span>}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      {children}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">KALCHAR</div>
            <p>For the art of being yourself.</p>
          </div>
          <div>
            <h3>EXPLORE</h3>
            <Link to="/shop">Shop all</Link>
            <Link to="/shop" search={{ category: "Dresses" }}>
              Dresses
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

      {/* ---- Overlays / Drawers ---- */}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="side-panel left-panel"
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
              {categoriesMenu.map((category) => (
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

      {/* Search panel */}
      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <aside
            className="side-panel"
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

      {/* Cart drawer */}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="side-panel"
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
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                        />
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
                  <Button
                    className="w-full h-12"
                    disabled
                    title="Checkout coming soon"
                  >
                    CHECKOUT COMING SOON
                  </Button>
                  <Link
                    to="/shop"
                    onClick={() => setCartOpen(false)}
                    className="continue-link"
                  >
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

      {/* Toast notifications */}
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
