"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ExternalLink, ArrowLeft } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-neutral-200 flex flex-col min-h-screen">
      <div className="h-16 px-5 flex items-center border-b border-neutral-100">
        <Link href="/product-managements" className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight text-neutral-900">
            perchick<span className="text-orange-500">.</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
            Admin
          </span>
        </Link>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <nav className="space-y-1">
          <Link
            href="/product-managements"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              pathname.startsWith("/product-managements")
                ? "bg-orange-50 text-orange-700 font-bold"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Produk</span>
          </Link>
        </nav>

        <div className="pt-3 border-t border-neutral-100">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Kembali ke Toko</span>
            </span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
