"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, MessageCircle } from "lucide-react";
import Wrapper from "@/components/_shared/Wrapper";
import ProductCard from "@/components/_shared/ProductCard";
import { ProductInterface } from "@/components/_shared/ProductCard/_types";
import { fetchProductById, fetchProducts } from "@/services/api";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DetailProductsViewProps } from "./_types";

export default function DetailProductsView({
  id,
  initialProduct,
}: DetailProductsViewProps) {
  const [product, setProduct] = useState<ProductInterface | null>(
    initialProduct || null
  );
  const [relatedProducts, setRelatedProducts] = useState<ProductInterface[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(!initialProduct);

  useEffect(() => {
    async function loadData() {
      try {
        const [prod, allProds] = await Promise.all([
          fetchProductById(id),
          fetchProducts(),
        ]);
        setProduct(prod);
        if (prod) {
          setRelatedProducts(
            allProds.filter((p) => String(p.id) !== String(id)).slice(0, 4)
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20">
        <Wrapper backgroundColor="bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square bg-neutral-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 w-1/4 rounded" />
              <div className="h-10 bg-neutral-200 w-3/4 rounded" />
              <div className="h-20 bg-neutral-200 rounded" />
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <Wrapper backgroundColor="bg-transparent">
          <div className="max-w-md mx-auto space-y-3">
            <h2 className="text-xl font-bold text-neutral-900">
              Produk Tidak Ditemukan
            </h2>
            <Link href="/products">
              <Button variant="dark">
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Katalog</span>
              </Button>
            </Link>
          </div>
        </Wrapper>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Halo Perchick Store! Saya ingin memesan:\n\n*${product.name}*\n• Jumlah: ${quantity} pcs\n• Berat: ${product.weight}\n• Total: ${formatRupiah(totalPrice)}\n\nApakah stok masih tersedia?`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  return (
    <div className="py-8 pb-20">
      <Wrapper backgroundColor="bg-transparent">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-neutral-600">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Katalog</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-xs">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <Badge variant="secondary" className="bg-orange-50 text-orange-700 font-bold mb-2">
                {product.categoryName || product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Berat Kemasan:</span>
                <span className="font-bold text-neutral-900">{product.weight}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-neutral-100 pt-2">
                <span className="text-neutral-500">Ketersediaan:</span>
                <span className="font-bold text-emerald-600">Stok {product.stock} pcs</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Deskripsi Produk
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">
                  Jumlah Pesanan
                </span>

                <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-0.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-10 text-center font-bold text-sm text-neutral-900">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Subtotal:</span>
                <span className="text-xl font-black text-neutral-900">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              <Button
                size="lg"
                onClick={handleWhatsAppOrder}
                className="w-full text-xs sm:text-sm font-bold"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Pesan Sekarang via WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <h2 className="text-lg font-black text-neutral-900 mb-5">
              Produk Terkait Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
