"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { regions, getSubLocationsByRegion } from "@/data/photos";

function DropdownMenu({
  region,
  isOpen,
  onToggle,
  onClose,
}: {
  region: (typeof regions)[0];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const subs = getSubLocationsByRegion(region.slug);

  const isActive =
    pathname === `/region/${region.slug}` ||
    subs.some((s) => pathname === `/location/${s.slug}`);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`text-xs tracking-[0.15em] uppercase transition-colors flex items-center gap-1 ${
          isActive ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        {region.name}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M2 4l3 3 3-3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 bg-white border border-border shadow-sm min-w-[160px] py-2 animate-fade-in">
          <Link
            href={`/region/${region.slug}`}
            onClick={onClose}
            className="block px-4 py-2 text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
          >
            All {region.name}
          </Link>
          <div className="border-t border-border my-1" />
          {subs.map((sub) => (
            <Link
              key={sub.slug}
              href={`/location/${sub.slug}`}
              onClick={onClose}
              className={`block px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:bg-gray-50 ${
                pathname === `/location/${sub.slug}`
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.2em] uppercase"
        >
          Roam Shoot Repeat
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
          {regions.map((region) => (
            <DropdownMenu
              key={region.slug}
              region={region}
              isOpen={openDropdown === region.slug}
              onToggle={() =>
                setOpenDropdown(
                  openDropdown === region.slug ? null : region.slug
                )
              }
              onClose={() => setOpenDropdown(null)}
            />
          ))}
          <Link
            href="/prints"
            className={`text-xs tracking-[0.15em] uppercase transition-colors ${
              pathname === "/prints"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            Prints
          </Link>
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
          {/* Cart */}
          <button className="snipcart-checkout text-muted hover:text-foreground transition-colors relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="snipcart-items-count absolute -top-1.5 -right-2 bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center" />
          </button>
        </div>

        {/* Cart + Mobile hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <button className="snipcart-checkout text-muted hover:text-foreground transition-colors relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="snipcart-items-count absolute -top-1.5 -right-2 bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center" />
          </button>
        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2"
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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase py-2"
            >
              Home
            </Link>

            {regions.map((region) => {
              const subs = getSubLocationsByRegion(region.slug);
              const isExpanded = mobileExpanded === region.slug;
              return (
                <div key={region.slug}>
                  <button
                    onClick={() =>
                      setMobileExpanded(isExpanded ? null : region.slug)
                    }
                    className="text-xs tracking-[0.15em] uppercase py-2 w-full text-left flex items-center justify-between"
                  >
                    {region.name}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="M2 4l3 3 3-3" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="pl-4 flex flex-col gap-1 pb-2">
                      <Link
                        href={`/region/${region.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="text-xs tracking-[0.1em] uppercase text-muted py-1"
                      >
                        All {region.name}
                      </Link>
                      {subs.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/location/${sub.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="text-xs tracking-[0.1em] uppercase text-muted py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/prints"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase py-2"
            >
              Prints
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase py-2"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
