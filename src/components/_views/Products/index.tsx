"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import Wrapper from "@/components/_shared/Wrapper";
import ProductCard from "@/components/_shared/ProductCard";
import { ProductInterface, CategoryInterface } from "@/components/_shared/ProductCard/_types";
import { fetchProducts, fetchCategories } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductsViewProps } from "./_types";

export default function ProductsView({ initialProducts }: ProductsViewProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [products, setProducts] = useState<ProductInterface[]>(initialProducts || []);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const selectedCategory = userCategory ?? categoryParam;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, catData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setUserCategory("all");
    setSearchQuery("");
    setSortBy("default");
  };

  return (
    <div className="py-8 pb-20">
      <Wrapper backgroundColor="bg-transparent">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Katalog Produk
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Semua olahan ayam pilihan dalam kemasan beku praktis siap masak
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 z-10 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari nugget, ayam ungkep, sosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val)}
                containerClassName="w-44"
                options={[
                  { value: "default", label: "Urutan Standar" },
                  { value: "popular", label: "Terpopuler" },
                  { value: "rating", label: "Rating Tertinggi" },
                  { value: "price-asc", label: "Harga Terendah" },
                ]}
              />

              {(selectedCategory !== "all" || searchQuery || sortBy !== "default") && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleReset}
                  className="gap-1.5 shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isSelected ? "dark" : "outline"}
                  size="sm"
                  onClick={() => setUserCategory(cat.id)}
                  className="whitespace-nowrap rounded-xl"
                >
                  {cat.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 text-xs text-neutral-400">
          Menampilkan <strong className="text-neutral-800">{filteredProducts.length}</strong> produk
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-neutral-200/70 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center border border-dashed border-neutral-200 rounded-2xl bg-white space-y-3">
            <h3 className="font-bold text-sm text-neutral-800">
              Tidak ada produk yang cocok
            </h3>
            <Button
              variant="dark"
              size="sm"
              onClick={handleReset}
              className="mt-2"
            >
              Reset Filter
            </Button>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
