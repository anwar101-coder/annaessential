import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";

import type { Database } from "@/integrations/supabase/types";
import type { Product } from "@/lib/products";

export const getPublicProducts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Product catalogue is unavailable.");

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  const { data, error } = await client
    .from("products")
    .select("id, name, price, size, description, image_url, image_path, featured, available, status, sort_order")
    .eq("status", "published")
    .eq("available", true)
    .order("sort_order");
  if (error) throw new Error("Product catalogue is unavailable.");

  const privatePaths = data.filter((item) => item.image_path).map((item) => item.image_path as string);
  let signedUrls: Record<string, string> = {};
  if (privatePaths.length > 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed } = await supabaseAdmin.storage.from("product-images").createSignedUrls(privatePaths, 3600);
    signedUrls = Object.fromEntries((signed ?? []).flatMap((item) => item.signedUrl ? [[item.path, item.signedUrl]] : []));
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    size: item.size,
    description: item.description,
    image: item.image_path ? (signedUrls[item.image_path] ?? item.image_url) : item.image_url,
    imagePath: item.image_path,
    featured: item.featured,
    available: item.available,
    status: item.status,
    sortOrder: item.sort_order,
  }));
});