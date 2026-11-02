"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Wrapper from "@/components/_shared/Wrapper";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Semua Produk" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      <Wrapper backgroundColor="bg-transparent" className="py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-neutral-950">
              perchick<span className="text-orange-500">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${isActive
                      ? "text-orange-600 font-bold"
                      : "text-neutral-600 hover:text-neutral-950"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/product-managements">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>

            <a
              href="https://wa.me/6281210714320"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm">
                Hubungi Kami
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-neutral-100 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <Link
                href="/product-managements"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="ghost" size="sm">
                  Admin
                </Button>
              </Link>
              <a
                href="https://wa.me/6281210714320"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        )}
      </Wrapper>
    </header>
  );
}
