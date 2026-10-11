import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { isSoldOut, swatchColor, type Product } from "@/lib/products";

export function ColorSwatches({
  product,
  color,
  onChange,
}: {
  product: Product;
  color: string;
  onChange: (color: string) => void;
}) {
  return (
    <>
      <p className="selection-label">
        COLOR <span>— {color}</span>
      </p>
      <div className="swatches" role="radiogroup" aria-label="Color">
        {product.colors.map((value) => (
          <Button
            variant="ghost"
            key={value}
            role="radio"
            aria-checked={color === value}
            className={`swatch ${color === value ? "active" : ""}`}
            aria-label={value}
            title={value}
            onClick={() => onChange(value)}
          >
            <span
              className="swatch-inner"
              style={{ "--swatch-color": swatchColor(value) } as CSSProperties}
            />
          </Button>
        ))}
      </div>
    </>
  );
}

export function SizeSelector({
  product,
  size,
  onChange,
  error,
  labelExtra,
}: {
  product: Product;
  size: string;
  onChange: (size: string) => void;
  error: boolean;
  labelExtra?: ReactNode;
}) {
  return (
    <>
      <p className="selection-label">
        SELECT SIZE <span>— {size || "Choose your size"}</span>
        {labelExtra}
      </p>
      <div className="size-options" role="radiogroup" aria-label="Size">
        {product.sizes.map((value) => {
          const soldOut = isSoldOut(product, value);
          return (
            <Button
              variant="ghost"
              key={value}
              role="radio"
              aria-checked={size === value}
              className={`${size === value ? "active" : ""} ${soldOut ? "sold-out" : ""}`}
              disabled={soldOut}
              onClick={() => onChange(value)}
              title={soldOut ? `${value} — Sold out` : value}
            >
              {value}
              {soldOut && <span className="sold-out-line" />}
            </Button>
          );
        })}
      </div>
      {error && (
        <p className="size-error" role="alert">
          Please select a size first.
        </p>
      )}
    </>
  );
}
