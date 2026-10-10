import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ImagePlus, LogOut, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import logoDark from "@/assets/anna-essentials-logo-transparent.png";
import { BackButton } from "@/components/back-button";
import logoLight from "@/assets/anna-essentials-logo-light.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ProductRow = Tables<"products">;
type Draft = Pick<ProductRow, "id" | "slug" | "name" | "description" | "short_description" | "price" | "size" | "image_url" | "image_path" | "featured" | "available" | "status" | "sort_order" | "features">;
const emptyDraft: Draft = { id: "", slug: "", name: "", description: "", short_description: "", price: 0, size: "", image_url: "", image_path: null, featured: false, available: true, status: "draft", sort_order: 0, features: "" };

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [
    { title: "Product Management | Anna Essentials" },
    { name: "description", content: "Manage Anna Essentials products, availability, prices, and photos." },
    { property: "og:title", content: "Product Management | Anna Essentials" },
    { property: "og:description", content: "Private Anna Essentials product management." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    let { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) ({ data: isAdmin } = await supabase.rpc("claim_first_admin"));
    setAuthorized(Boolean(isAdmin));
    if (!isAdmin) return;
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (error) { setNotice(error.message); return; }
    const rows = data ?? [];
    const withPhotos = await Promise.all(rows.map(async (product) => {
      if (!product.image_path) return product;
      const { data: signed } = await supabase.storage.from("product-images").createSignedUrl(product.image_path, 3600);
      return { ...product, image_url: signed?.signedUrl ?? product.image_url };
    }));
    setProducts(withPhotos);
  }
  useEffect(() => { void load(); }, []);

  function edit(product?: ProductRow) {
    const next = product ? { ...product } : { ...emptyDraft, sort_order: products.length + 1 };
    setDraft(next); setPreview(next.image_url); setFile(null); setNotice("");
  }

  async function save(event: FormEvent) {
    event.preventDefault(); if (!draft) return; setBusy(true); setNotice("");
    let imagePath = draft.image_path;
    let imageUrl = draft.image_url;
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${extension}`;
      const upload = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type, upsert: false });
      if (upload.error) { setNotice(`Photo upload failed: ${upload.error.message}. The existing product was not changed.`); setBusy(false); return; }
      imagePath = path; imageUrl = "";
    }
    const slug = draft.slug || draft.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { slug, name: draft.name, description: draft.description, short_description: draft.short_description, features: draft.features, price: Number(draft.price), size: draft.size, image_url: imageUrl, image_path: imagePath, featured: draft.featured, available: draft.available, status: draft.status, sort_order: Number(draft.sort_order) };
    const result = draft.id ? await supabase.from("products").update(payload).eq("id", draft.id) : await supabase.from("products").insert(payload);
    if (result.error) { if (file && imagePath) await supabase.storage.from("product-images").remove([imagePath]); setNotice(result.error.message); setBusy(false); return; }
    if (file && draft.image_path) await supabase.storage.from("product-images").remove([draft.image_path]);
    setDraft(null); setBusy(false); setNotice("Product saved."); await load();
  }

  async function remove(product: ProductRow) {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (error) { setNotice(error.message); return; }
    if (product.image_path) await supabase.storage.from("product-images").remove([product.image_path]);
    setNotice("Product deleted."); await load();
  }

  async function signOut() {
    await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true });
  }

  if (authorized === null) return <main className="grid min-h-screen place-items-center bg-secondary"><p className="text-sm text-muted-foreground">Opening product management…</p></main>;
  if (!authorized) return <main className="grid min-h-screen place-items-center bg-secondary px-5"><section className="max-w-md bg-background p-8 text-center shadow-editorial"><h1 className="font-display text-4xl">Access restricted</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">An owner account already exists. Ask the owner to grant access.</p><Button className="mt-7" onClick={signOut}>Sign out</Button></section></main>;

  return <div className="min-h-screen bg-secondary">
    <header className="border-b border-border bg-primary text-primary-foreground"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10"><div className="flex items-center gap-4"><BackButton /><Link to="/"><img src={logoLight} alt="Anna Essentials" className="h-16 w-24 object-contain" /></Link></div><Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={signOut}><LogOut className="size-4" /> Sign out</Button></div></header>
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Private workspace</p><h1 className="mt-2 font-display text-4xl sm:text-5xl">Product management</h1></div><Button onClick={() => edit()}><Plus className="size-4" /> Add product</Button></div>
      {notice && <p className="mt-6 border-l-2 border-gold bg-background px-4 py-3 text-sm" role="status">{notice}</p>}
      <div className="mt-10 grid gap-4">
        {products.map((product) => <article key={product.id} className="grid gap-5 border border-border bg-background p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
          <img src={product.image_url || preview || logoDark} alt="" className="aspect-square w-24 object-contain" />
          <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-2xl">{product.name}</h2><span className="border border-border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]">{product.status}</span></div><p className="mt-1 text-sm text-muted-foreground">{product.price.toLocaleString()} birr · {product.size} · {product.available ? "Available" : "Unavailable"}</p></div>
          <div className="flex gap-2"><Button variant="icon" size="icon" aria-label={`Edit ${product.name}`} title="Edit product" onClick={() => edit(product)}><Pencil className="size-4" /></Button><Button variant="icon" size="icon" aria-label={`Delete ${product.name}`} title="Delete product" onClick={() => void remove(product)}><Trash2 className="size-4" /></Button></div>
        </article>)}
      </div>
    </main>
    {draft && <div className="fixed inset-0 z-50 overflow-y-auto bg-overlay p-4 sm:p-8"><form onSubmit={save} className="mx-auto max-w-2xl bg-background p-6 shadow-editorial sm:p-9"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Catalogue editor</p><h2 className="mt-2 font-display text-4xl">{draft.id ? "Edit product" : "Add product"}</h2></div><Button type="button" variant="icon" size="icon" aria-label="Close editor" onClick={() => setDraft(null)}><X className="size-5" /></Button></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="space-y-2 sm:col-span-2"><Label htmlFor="name">Product name</Label><Input id="name" required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="price">Price (birr)</Label><Input id="price" type="number" min="0" required value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="size">Size</Label><Input id="size" required value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value })} /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="description">Description</Label><Textarea id="description" className="min-h-28" required value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="short_description">Short description (shown under the product name — keep to about two lines)</Label><Textarea id="short_description" className="min-h-16" value={draft.short_description} onChange={(e) => setDraft({ ...draft, short_description: e.target.value })} /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="features">Highlights (up to 3, one per line as Title: detail)</Label><Textarea id="features" className="min-h-24" placeholder={"Scalp care: Nourishes the scalp"} value={draft.features} onChange={(e) => setDraft({ ...draft, features: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="sort">Display order</Label><Input id="sort" type="number" min="0" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="status">Visibility</Label><select id="status" className="h-9 w-full border border-input bg-background px-3 text-sm" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Draft["status"] })}><option value="draft">Draft</option><option value="published">Published</option></select></div></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-[160px_1fr]"><div className="aspect-square overflow-hidden bg-muted">{preview ? <img src={preview} alt="Product preview" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center"><ImagePlus className="size-7 text-muted-foreground" /></div>}</div><div className="space-y-2"><Label htmlFor="photo">Product photo</Label><Input id="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const next = e.target.files?.[0] ?? null; setFile(next); if (next) setPreview(URL.createObjectURL(next)); }} /><p className="text-xs leading-5 text-muted-foreground">JPG, PNG, or WebP. Maximum 8 MB.</p></div></div>
      <div className="mt-7 grid gap-4 border-y border-border py-5 sm:grid-cols-2"><Label className="flex items-center justify-between gap-4">Available <Switch checked={draft.available} onCheckedChange={(value) => setDraft({ ...draft, available: value })} /></Label><Label className="flex items-center justify-between gap-4">Feature on home page <Switch checked={draft.featured} onCheckedChange={(value) => setDraft({ ...draft, featured: value })} /></Label></div>
      <div className="mt-7 flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => setDraft(null)}>Cancel</Button><Button type="submit" disabled={busy}><Save className="size-4" /> {busy ? "Saving" : "Save product"}</Button></div>
    </form></div>}
  </div>;
}