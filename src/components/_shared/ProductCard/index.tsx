"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import ProductCardInterface from "./_types";
import { formatRupiah, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({
  product,
  className = "",
}: ProductCardInterface) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between bg-white border border-neutral-200/80 rounded-2xl p-3.5 transition-all duration-200 hover:shadow-md hover:border-neutral-300",
        className
      )}
    >
      <div>
        <Link
          href={`/products/${product.id}`}
          className="block relative aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-100"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge variant="default">
                Favorit
              </Badge>
            )}
          </div>

          <div className="absolute bottom-2.5 right-2.5">
            <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {product.weight}
            </span>
          </div>
        </Link>

        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-semibold text-orange-600">
              {product.categoryName || product.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-600 font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || "5.0"}</span>
            </div>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-sm text-neutral-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-neutral-500 line-clamp-2 pt-0.5 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <div className="text-base font-extrabold text-neutral-950">
            {formatRupiah(product.price)}
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <Button size="sm">
            Lihat
          </Button>
        </Link>
      </div>
    </div>
  );
}
