"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
      <div className="font-bold text-sm text-neutral-800">
        Kelola Produk
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-orange-600 transition-colors"
        >
          <span>Buka Toko</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
