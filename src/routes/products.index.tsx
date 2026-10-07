import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { OrderDialog } from "@/components/order-dialog";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicProducts } from "@/lib/products.functions";

const productsQuery = queryOptions({ queryKey: ["public-products"], queryFn: () => getPublicProducts() });

export const Route = createFileRoute("/products/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "Our Products | Anna Essentials" },
      { name: "description", content: "Explore Anna Essentials natural hair oils and essential oils available in Addis Ababa." },
      { property: "og:title", content: "Our Products | Anna Essentials" },
      { property: "og:description", content: "Explore the complete Anna Essentials collection of natural oils." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-primary pb-20 pt-32 text-primary-foreground sm:pb-24 sm:pt-40">
        <SiteHeader onOrder={() => setOrderOpen(true)} showBack />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="eyebrow text-gold">The complete collection</p>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
            <h1 className="max-w-3xl font-display text-5xl leading-none sm:text-7xl">One considered collection.</h1>
            <p className="max-w-lg text-sm leading-7 text-primary-foreground/70 md:pb-2">Natural oils for hair and home rituals, each one presented with care.</p>
          </div>
        </div>
      </section>

      <main className="section-space">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} onOrder={() => setOrderOpen(true)} />)}
          </div>
        </div>
      </main>

      <SiteFooter />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </div>
  );
}