import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function ProductCard({ product, onOrder }: { product: Product; onOrder: () => void }) {
  return (
    <article className="product-card group">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 bg-background/92 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
          {product.size}
        </span>
      </div>
      <div className="px-1 pt-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <h3 className="min-w-0 font-display text-2xl leading-tight text-foreground">{product.name}</h3>
          <p className="shrink-0 text-sm font-semibold text-primary">{product.price.toLocaleString()} birr</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <Button variant="ghost" className="mt-3 -ml-3" onClick={onOrder}>
          Order product <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </article>
  );
}