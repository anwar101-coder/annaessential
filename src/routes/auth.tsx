import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";

import logoDark from "@/assets/anna-essentials-logo-transparent.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Owner Sign In | Anna Essentials" },
    { name: "description", content: "Secure owner access for Anna Essentials product management." },
    { property: "og:title", content: "Owner Sign In | Anna Essentials" },
    { property: "og:description", content: "Secure owner access for Anna Essentials." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "register">("sign-in");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { void supabase.auth.getUser().then(({ data }) => { if (data.user) void navigate({ to: "/admin" }); }); }, [navigate]);

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const result = mode === "sign-in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (result.data.session) await navigate({ to: "/admin" });
    else setMessage("Check your email to confirm your account, then sign in.");
  }

  async function googleSignIn() {
    setBusy(true); setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
    if (result.error) { setMessage(result.error.message); setBusy(false); return; }
    if (!result.redirected) await navigate({ to: "/admin" });
  }

  return <main className="grid min-h-screen place-items-center bg-secondary px-5 py-12">
    <section className="w-full max-w-md border border-border bg-background p-7 shadow-editorial sm:p-10">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><ArrowLeft className="size-4" /> Storefront</Link>
      <img src={logoDark} alt="Anna Essentials" className="h-24 w-40 object-contain object-left" />
      <h1 className="mt-8 font-display text-4xl">Owner access</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in to manage the Anna Essentials collection.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" minLength={8} autoComplete={mode === "sign-in" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {message && <p className="text-sm leading-6 text-muted-foreground" role="status">{message}</p>}
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait" : mode === "sign-in" ? "Sign in" : "Create owner account"}</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground"><span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" /></div>
      <Button variant="outline" className="w-full" onClick={googleSignIn} disabled={busy}>Continue with Google</Button>
      <button type="button" className="mt-6 w-full text-sm text-muted-foreground underline underline-offset-4" onClick={() => { setMode(mode === "sign-in" ? "register" : "sign-in"); setMessage(""); }}>{mode === "sign-in" ? "Create the owner account" : "Already registered? Sign in"}</button>
    </section>
  </main>;
}