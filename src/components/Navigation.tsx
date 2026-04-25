"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locations } from "@/data/photos";

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Site name */}
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.2em] uppercase"
        >
          Portfolio
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-xs tracking-[0.15em] uppercase transition-colors ${
              pathname === "/"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            Home
          </Link>
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/location/${loc.slug}`}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${
                pathname === `/location/${loc.slug}`
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {loc.name}
            </Link>
          ))}
          <Link
            href="/about"
            className={`text-xs tracking-[0.15em] uppercase transition-colors ${
              pathname === "/about"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            About
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase"
            >
              Home
            </Link>
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/location/${loc.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.15em] uppercase"
              >
                {loc.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
