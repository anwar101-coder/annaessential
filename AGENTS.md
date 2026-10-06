<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use Lovable Cloud `products` as the storefront catalogue source; keep only shared product types in `src/lib/products.ts`, so public and owner views stay synchronized.
- Keep product photos in the private `product-images` bucket and expose only short-lived signed URLs, because workspace policy blocks public buckets and owner uploads must remain controlled.
- Protect product mutations with role-based database policies and a one-time atomic first-owner claim, so client-side state can never grant administrative access.
