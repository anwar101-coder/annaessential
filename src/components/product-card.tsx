import { Link } from "@tanstack/react-router";

import type { Product } from "@/lib/products";

export function ProductCard({ product, onOrder }: { product: Product; onOrder: () => void }) {
  const features = product.features ?? [];

  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-[2rem] bg-card">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        aria-label={`View ${product.name}`}
        className="product-showcase relative block aspect-[5/4] overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring"
      >
        <span aria-hidden className="showcase-ring left-[8%] top-[14%] size-14" />
        <span aria-hidden className="showcase-ring bottom-[12%] right-[10%] size-20" />
        <svg aria-hidden viewBox="0 0 60 16" className="absolute bottom-[18%] left-[10%] w-14 text-gold/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 8c5-8 9 8 14 0s9 8 14 0 9 8 14 0 9 8 14 0" />
        </svg>
        <div className="relative flex h-full items-center justify-center p-8">
          <img src={product.image} alt={`${product.name} bottle`} loading="lazy" className="product-card-image h-full max-h-full w-auto max-w-[70%] rounded-[1.25rem] object-cover" />
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-primary shadow-editorial backdrop-blur">
          {product.price.toLocaleString()} ETB
        </span>
      </Link>

      <div className="flex flex-1 flex-col bg-secondary p-5 sm:p-6">
        <div className={features.length ? "grid flex-1 grid-cols-[1.1fr_auto_1fr] gap-4" : "flex-1"}>
          <div className="min-w-0">
            <Link to="/products/$productId" params={{ productId: product.id }} className="font-display text-2xl font-semibold leading-tight text-primary hover:text-gold-deep">
              {product.name}
            </Link>
            <p className="mt-2 line-clamp-3 text-[0.8rem] leading-5 text-muted-foreground">{product.description}</p>
          </div>
          {features.length > 0 && (
            <>
              <span aria-hidden className="w-px bg-gold/50" />
              <ul className="min-w-0 space-y-2.5">
                {features.map((feature) => (
                  <li key={feature.title}>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-primary">{feature.title}</p>
                    <p className="mt-0.5 text-[0.74rem] leading-4 text-muted-foreground">{feature.detail}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={onOrder}
          className="mt-6 min-h-12 w-full rounded-full bg-primary text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-gold hover:text-gold-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Order Now
        </button>
      </div>
    </article>
  );
}
