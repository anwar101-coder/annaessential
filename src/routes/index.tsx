import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Leaf, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

import castorAsset from "@/assets/Anna_Castor_Oil_Botanical_Display.png.asset.json";
import myrrhAsset from "@/assets/Anna_Myrrah_Essential_Oil_Still_Life.png.asset.json";
import rosemaryAsset from "@/assets/Natural_Rosemary_Hair_Oil_with_Dropper_Cap.png.asset.json";
import { OrderDialog } from "@/components/order-dialog";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anna Essentials | Natural Oils in Addis Ababa" },
      { name: "description", content: "Discover Anna Essentials’ natural hair and essential oils, available from Star City Mall in Addis Ababa." },
      { property: "og:title", content: "Anna Essentials | Natural Oils in Addis Ababa" },
      { property: "og:description", content: "Thoughtfully presented natural oils for everyday rituals, created by an Ethiopian woman entrepreneur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [orderOpen, setOrderOpen] = useState(false);
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="min-h-screen bg-background">
      <section className="hero-shell relative flex min-h-[720px] items-end overflow-hidden pt-24 text-hero-foreground lg:min-h-[820px]">
        <img src={castorAsset.url} alt="Anna Castor Oil surrounded by natural botanicals" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="hero-shade absolute inset-0" />
        <SiteHeader onOrder={() => setOrderOpen(true)} />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 text-center lg:px-10 lg:pb-20">
          <p className="mb-5 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> Natural care, thoughtfully made <span className="h-px w-8 bg-gold" />
          </p>
          <h1 className="max-w-4xl font-display text-5xl leading-[0.98] text-hero-foreground sm:text-6xl lg:text-8xl">
            Nature, bottled with intention.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-hero-muted sm:text-base">
            Discover Anna Essentials’ collection of natural hair and essential oils, created to bring care and simplicity to everyday rituals.
          </p>
          <Button variant="gold" className="mt-8" onClick={() => setOrderOpen(true)}>
            Order now <ArrowRight className="size-4" />
          </Button>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 border-y border-hero-line py-5 text-left">
            <div className="border-r border-hero-line px-3 sm:px-7">
              <p className="hero-stat">05</p><p className="hero-stat-label">Real products</p>
            </div>
            <div className="border-r border-hero-line px-3 sm:px-7">
              <p className="hero-stat">100%</p><p className="hero-stat-label">Natural focus</p>
            </div>
            <div className="px-3 sm:px-7">
              <p className="hero-stat">AA</p><p className="hero-stat-label">Addis Ababa</p>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section id="products" className="section-space scroll-mt-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end lg:mb-14">
              <div>
                <p className="eyebrow">The collection</p>
                <h2 className="section-title mt-3">Our essential selection</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-right">
                Five natural oils, presented with care. Explore three customer favourites or discover the complete collection.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-3 md:gap-5 lg:gap-8">
              {featuredProducts.map((product) => <ProductCard key={product.id} product={product} onOrder={() => setOrderOpen(true)} />)}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline"><Link to="/products">View more products <ArrowRight className="size-4" /></Link></Button>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-secondary">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="relative min-h-[480px] overflow-hidden lg:min-h-[680px]">
              <img src={rosemaryAsset.url} alt="Anna Rosemary Hair Oil" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-5 left-5 bg-background px-5 py-4 shadow-editorial sm:bottom-8 sm:left-8">
                <p className="font-display text-2xl text-primary">Made with purpose</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Built in Ethiopia</p>
              </div>
            </div>
            <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
              <div className="max-w-xl">
                <p className="eyebrow">About Anna Essentials</p>
                <h2 className="section-title mt-3">A woman’s vision, growing with every bottle.</h2>
                <p className="mt-7 text-base leading-8 text-muted-foreground">
                  Anna Essentials is the story of a determined Ethiopian woman entrepreneur building a brand rooted in care, confidence, and opportunity. Every product reflects a belief that thoughtful everyday rituals can feel both natural and refined.
                </p>
                <div className="mt-9 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
                  <div><Leaf className="size-5 text-primary" /><h3 className="mt-4 font-display text-xl">Our approach</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A focused collection with natural ingredients at its heart.</p></div>
                  <div><Sparkles className="size-5 text-primary" /><h3 className="mt-4 font-display text-xl">Our mission</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">To inspire women to build strength in Ethiopia and across Africa.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="publications" className="section-space scroll-mt-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">The journal</p>
              <h2 className="section-title mt-3">Simple guidance for mindful rituals.</h2>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {[
                ["01", "Understanding botanical oils", "A clear introduction to choosing and using natural oils with intention."],
                ["02", "Building a consistent ritual", "Simple ideas for making personal-care moments feel calm and considered."],
                ["03", "Caring for every bottle", "Practical storage tips to keep your oils protected and easy to use."],
              ].map(([number, title, copy]) => (
                <article key={number} className="bg-background p-7 sm:p-9">
                  <div className="flex items-center justify-between"><span className="text-xs font-semibold text-gold-deep">{number}</span><BookOpen className="size-4 text-primary" /></div>
                  <h3 className="mt-12 font-display text-2xl">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p>
                  <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">Coming soon</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex items-center px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
              <div>
                <p className="eyebrow text-gold">Visit us</p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Find Anna Essentials in Addis Ababa.</h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/70">Jemo Michael, Star City Mall, ground floor, Addis Ababa.</p>
                <Button asChild variant="gold" className="mt-8"><a href="https://www.google.com/maps/search/?api=1&query=Star+City+Mall+Jemo+Michael+Addis+Ababa" target="_blank" rel="noreferrer"><MapPin className="size-4" /> Open in Google Maps</a></Button>
              </div>
            </div>
            <iframe
              title="Anna Essentials location at Star City Mall"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[500px]"
              src="https://www.google.com/maps?q=Star%20City%20Mall%20Jemo%20Michael%20Addis%20Ababa&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section id="contact" className="section-space scroll-mt-20 overflow-hidden bg-secondary">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <p className="eyebrow">Let’s connect</p>
              <h2 className="section-title mt-3">Personal service, one message away.</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">Ask about a product, place an order, or learn where to find Anna Essentials at selected holiday exhibitions.</p>
              <Button variant="primary" className="mt-8" onClick={() => setOrderOpen(true)}>Contact Anna Essentials <ArrowRight className="size-4" /></Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={myrrhAsset.url} alt="Anna Myrrh Essential Oil display" className="h-full w-full object-cover object-[center_58%]" loading="lazy" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </div>
  );
}
