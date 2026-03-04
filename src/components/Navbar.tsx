"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Achievements", href: "/achievements" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogoClick = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" onClick={handleLogoClick} className="font-heading text-xl font-bold text-foreground">
          Swayam<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full ${pathname === l.href
                  ? "text-primary after:w-full"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <Button id="nav-hire-me" size="sm" asChild className="font-heading font-semibold">
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-6 pb-6 space-y-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block text-sm transition-colors ${pathname === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <Button id="mobile-nav-hire-me" size="sm" asChild className="w-full font-heading font-semibold">
            <Link href="/contact" onClick={() => setOpen(false)}>Hire Me</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
