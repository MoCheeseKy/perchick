import ProductsView from "@/components/_views/Products";
import { Suspense } from "react";

export const metadata = {
  title: "Katalog Produk Olahan Ayam - Perchick Store",
  description:
    "Jelajahi berbagai pilihan olahan ayam berkualitas: nugget ayam renyah, ayam ungkep bumbu kuning lengkuas, sosis keju, dan siomay dimsum.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-neutral-500">Memuat katalog produk...</div>}>
      <ProductsView />
    </Suspense>
  );
}
