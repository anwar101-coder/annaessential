import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import logoLight from "@/assets/anna-essentials-logo-light.png";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/" as const, hash: "about" },
  { label: "Products", to: "/products" as const },
  { label: "Contact", to: "/" as const, hash: "contact" },
];

export function SiteHeader({ onOrder, showBack = false }: { onOrder: () => void; showBack?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-hero-line text-hero-foreground">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-24 lg:grid-cols-[auto_1fr_auto] lg:px-10">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          {showBack && <BackButton />}
          <Link to="/" aria-label="Anna Essentials home" className="block w-24 shrink-0 lg:w-28">
            <img src={logoLight} alt="Anna Essentials" className="h-16 w-full object-contain lg:h-20" />
          </Link>
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className="nav-link text-[0.7rem] font-medium uppercase tracking-[0.16em]"
              activeProps={{ className: "nav-link nav-link-active text-[0.7rem] font-medium uppercase tracking-[0.16em]" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant="gold" size="sm" onClick={onOrder}>
            <Phone className="size-3.5" /> Order now
          </Button>
        </div>

        <Button
          variant="icon"
          size="icon"
          className="border-hero-line bg-transparent text-hero-foreground hover:border-gold hover:bg-transparent hover:text-gold lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-hero-line bg-primary px-5 py-6 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-hero-line py-4 text-sm uppercase tracking-[0.16em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant="gold" className="mt-6 w-full" onClick={() => { setOpen(false); onOrder(); }}>
            Order now
          </Button>
        </div>
      )}
    </header>
  );
}