import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, ChevronDown, Menu, X } from "lucide-react";

const galleries = [
  { to: "/gallery/maternity", label: "Maternity" },
  { to: "/gallery/newborns", label: "Newborns" },
  { to: "/gallery/birding-wildlife", label: "Birding & Wildlife" },
  { to: "/gallery/flowers", label: "Flower Project" },
  { to: "/gallery/boats", label: "Boats and Saltlife" },
  { to: "/gallery/konstruction-character", label: "Konstruction & Character" },
  { to: "/gallery/travel", label: "Travel" },
  { to: "/gallery/texture-form", label: "Texture & Form" },
  { to: "/gallery/the-collective", label: "Strays & Stragglers" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <Camera className="h-5 w-5 text-primary" />
          <span className="font-display text-xl font-light tracking-wide">MissKonstruction</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/" className="hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>About</Link>

          <div className="relative" onMouseEnter={() => setGalleryOpen(true)} onMouseLeave={() => setGalleryOpen(false)}>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              Gallery <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {galleryOpen && (
              <ul className="absolute top-full left-0 pt-2 min-w-[220px]">
                <div className="bg-card border border-border rounded-md shadow-xl py-2">
                  {galleries.map((g) => (
                    <li key={g.to}>
                      <Link to={g.to} className="block px-4 py-2 hover:text-primary hover:bg-secondary transition-colors">
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </div>

          <Link to="/contact" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Contact</Link>
          <Link to="/blog" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Journal</Link>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <div className="pl-2 border-l border-border flex flex-col gap-2">
            <span className="text-muted-foreground text-xs uppercase tracking-wide">Gallery</span>
            {galleries.map((g) => (
              <Link key={g.to} to={g.to} onClick={() => setOpen(false)}>{g.label}</Link>
            ))}
          </div>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Journal</Link>
        </nav>
      )}
    </header>
  );
}
