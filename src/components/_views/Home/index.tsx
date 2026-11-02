"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Wrapper from "@/components/_shared/Wrapper";
import ProductCard from "@/components/_shared/ProductCard";
import { ProductInterface } from "@/components/_shared/ProductCard/_types";
import { fetchProducts } from "@/services/api";
import { Button } from "@/components/ui/button";
import { HomeViewProps } from "./_types";

export default function HomeView({ initialProducts }: HomeViewProps) {
  const [products, setProducts] = useState<ProductInterface[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    async function loadData() {
      try {
        const prodData = await fetchProducts();
        setProducts(prodData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.soldCount || 0) - (a.soldCount || 0);
      })
      .slice(0, 4);
  }, [products]);

  return (
    <div className="flex flex-col gap-12 py-6 pb-20">
      <section>
        <Wrapper backgroundColor="bg-transparent">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-8 sm:p-12 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Lauk Lezat Siap Masak Dalam 5 Menit
                </h1>
                <p className="text-sm sm:text-base text-orange-50 max-w-lg leading-relaxed">
                  Pilihan nugget renyah, ayam ungkep bumbu kuning, dan sosis keju lumer. Higienis, bergizi, dan tanpa bahan pengawet sintesis.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="bg-white text-orange-700 hover:bg-neutral-100 font-extrabold shadow-sm"
                    >
                      <span>Belanja Sekarang</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="dark"
                      className="bg-black/20 hover:bg-black/30 backdrop-blur-xs border border-white/20 text-white"
                    >
                      <span>Order via WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <div className="relative aspect-square w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80"
                    alt="Olahan Ayam Perchick"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>

      <section>
        <Wrapper backgroundColor="bg-transparent">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                Top Products
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Menu olahan ayam terfavorit dengan rating tertinggi dan paling laris
              </p>
            </div>

            <Link href="/products" className="hidden sm:inline-flex">
              <Button
                variant="outline"
                className="group font-bold text-neutral-800 hover:text-orange-600 hover:border-orange-200 gap-1.5 rounded-xl"
              >
                <span>Lihat Semua Produk</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-neutral-200/70 animate-pulse" />
              ))}
            </div>
          ) : topProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {topProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              <div className="mt-6 flex justify-center sm:hidden">
                <Link href="/products" className="w-full">
                  <Button variant="outline" className="w-full justify-center group font-bold rounded-xl">
                    <span>Lihat Semua Produk ({products.length})</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-neutral-200">
              <p className="text-sm font-semibold text-neutral-500">
                Belum ada produk unggulan saat ini.
              </p>
            </div>
          )}
        </Wrapper>
      </section>

      <section>
        <Wrapper backgroundColor="bg-transparent">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 border border-neutral-800">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-orange-400">
                  Katalog Lengkap Perchick
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Cari Varian Menu Olahan Ayam Lainnya?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Jelajahi berbagai pilihan nugget renyah, sosis keju lumer, bakso kenyal, siomay dimsum, hingga abon ayam non-MSG untuk seluruh keluarga.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-md"
                  >
                    <span>Buka Katalog Produk</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 rounded-xl"
                  >
                    <span>Tanya via WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
