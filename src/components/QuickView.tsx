import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ColorSwatches, SizeSelector } from "@/components/ProductOptions";
import { useStore } from "@/lib/store-context";
import { formatPrice, getImagesForColor, type Product } from "@/lib/products";

export function QuickView({
  product,
  initialColor,
  open,
  onOpenChange,
}: {
  product: Product;
  initialColor: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addItem } = useStore();
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState("");
  const [error, setError] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="quick-view">
        <div className="quick-view-image">
          <img src={getImagesForColor(product, color).src} alt={`${product.name} in ${color}`} />
        </div>
        <div className="quick-view-details">
          <span className="eyebrow text-gold">{product.category.toUpperCase()}</span>
          <DialogTitle className="quick-view-title">{product.name}</DialogTitle>
          <p className="detail-price">
            {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
            {formatPrice(product.price)}
          </p>
          <DialogDescription className="detail-description">
            {product.description}
          </DialogDescription>
          <ColorSwatches product={product} color={color} onChange={setColor} />
          <SizeSelector
            product={product}
            size={size}
            error={error}
            onChange={(value) => {
              setSize(value);
              setError(false);
            }}
          />
          <Button
            className="add-to-bag-btn quick-view-add"
            onClick={() => {
              if (!size) {
                setError(true);
                return;
              }
              addItem(product, size, color);
              onOpenChange(false);
            }}
          >
            ADD TO BAG <ArrowRight size={16} />
          </Button>
          <Link
            to="/product/$id"
            params={{ id: String(product.id) }}
            className="text-link quick-view-link"
            onClick={() => onOpenChange(false)}
          >
            VIEW FULL DETAILS <ArrowRight size={14} />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
