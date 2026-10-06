import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import logoAsset from "@/assets/Anna_Essential_Botanical_Logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.3fr_0.7fr_1fr] lg:px-10 lg:py-20">
        <div>
          <img src={logoAsset.url} alt="Anna Essentials" className="h-20 w-44 bg-logo object-cover object-center" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/70">
            Thoughtfully presented natural oils for everyday rituals, built by an Ethiopian woman entrepreneur with a vision for women across Africa.
          </p>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/70">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/" hash="about">Our story</Link>
            <Link to="/" hash="publications">Journal</Link>
            <Link to="/auth">Owner access</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <div className="mt-5 space-y-4 text-sm text-primary-foreground/70">
            <a href="tel:+251911346077" className="flex items-center gap-3"><Phone className="size-4 text-gold" /> 0911 346 077</a>
            <a href="https://t.me/teybahh" target="_blank" rel="noreferrer" className="flex items-center gap-3"><MessageCircle className="size-4 text-gold" /> Telegram</a>
            <a href="https://www.tiktok.com/@teyba886?_r=1&_t=ZS-9AGoDLIAR0u" target="_blank" rel="noreferrer" className="flex items-center gap-3"><Instagram className="size-4 text-gold" /> TikTok</a>
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> Jemo Michael, Star City Mall, ground floor, Addis Ababa</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/55">
        © 2026 Anna Essentials. All rights reserved.
      </div>
    </footer>
  );
}