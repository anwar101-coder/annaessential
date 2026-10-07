import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/products";

export function ProductCard({ product, onOrder }: { product: Product; onOrder: () => void }) {
  return (
    <article className="product-card group flex h-full flex-col">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        aria-label={`View ${product.name}`}
        className="product-card-media block rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="flex aspect-[4/5] items-center justify-center p-5 sm:p-7">
          <img
            src={product.image}
            alt={`${product.name} bottle`}
            className="product-card-image max-h-full w-full rounded-[1.1rem] object-contain"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-6">
        <Link to="/products/$productId" params={{ productId: product.id }} className="font-display text-[1.65rem] leading-tight text-primary hover:text-gold-deep">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <p className="text-sm font-medium tracking-[0.04em] text-foreground">{product.price.toLocaleString()} ETB</p>
          <button type="button" onClick={onOrder} className="order-link inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
            Order now <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
