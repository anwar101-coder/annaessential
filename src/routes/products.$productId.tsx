import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { OrderDialog } from "@/components/order-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getPublicProducts } from "@/lib/products.functions";

const productsQuery = queryOptions({ queryKey: ["public-products"], queryFn: () => getPublicProducts() });

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ context, params }) => {
    const products = await context.queryClient.ensureQueryData(productsQuery);
    const product = products.find((item) => item.id === params.productId);
    if (!product) throw notFound();
    return { name: product.name, description: product.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} | Anna Essentials` },
      { name: "description", content: loaderData?.description ?? "Natural oils from Anna Essentials." },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} | Anna Essentials` },
      { property: "og:description", content: loaderData?.description ?? "Natural oils from Anna Essentials." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center bg-secondary px-5 text-center">
      <div><h1 className="font-display text-4xl">Product not found</h1><Button asChild variant="outline" className="mt-6"><Link to="/products">See all products</Link></Button></div>
    </main>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const [orderOpen, setOrderOpen] = useState(false);
  const { data: products } = useSuspenseQuery(productsQuery);
  const product = products.find((item) => item.id === productId)!;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-primary pt-20 lg:pt-24">
        <SiteHeader onOrder={() => setOrderOpen(true)} showBack />
      </section>
      <main className="section-space">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="product-card-media rounded-[2rem] p-6 sm:p-10">
            <img src={product.image} alt={`${product.name} bottle`} className="mx-auto max-h-[560px] w-full rounded-[1.25rem] object-contain" />
          </div>
          <div>
            <p className="eyebrow">{product.size}</p>
            <h1 className="section-title mt-3 text-primary">{product.name}</h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">{product.description}</p>
            <p className="mt-8 text-lg font-medium tracking-[0.04em]">{product.price.toLocaleString()} ETB</p>
            <Button variant="primary" className="mt-8" onClick={() => setOrderOpen(true)}>Order now <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </main>
      <SiteFooter />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </div>
  );
}
