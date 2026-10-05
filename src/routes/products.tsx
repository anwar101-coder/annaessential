import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { OrderDialog } from "@/components/order-dialog";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products | Anna Essentials" },
      { name: "description", content: "Explore all five Anna Essentials natural hair oils and essential oils available in Addis Ababa." },
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

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-primary pb-20 pt-32 text-primary-foreground sm:pb-24 sm:pt-40">
        <SiteHeader onOrder={() => setOrderOpen(true)} />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="eyebrow text-gold">The complete collection</p>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
            <h1 className="max-w-3xl font-display text-5xl leading-none sm:text-7xl">Five oils. One considered collection.</h1>
            <p className="max-w-lg text-sm leading-7 text-primary-foreground/70 md:pb-2">Browse every Anna Essentials product currently available. Product details are temporary while the final catalogue is prepared.</p>
          </div>
        </div>
      </section>

      <main className="section-space">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} onOrder={() => setOrderOpen(true)} />)}
          </div>
          <p className="mt-14 border-l-2 border-gold pl-5 text-sm leading-7 text-muted-foreground">Descriptions shown are temporary and will be updated when the final product information is confirmed.</p>
        </div>
      </main>

      <SiteFooter />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </div>
  );
}