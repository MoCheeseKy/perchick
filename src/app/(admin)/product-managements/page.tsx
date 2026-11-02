import ProductManagementsView from "@/components/_views/Admin/ProductManagements";

export const metadata = {
  title: "Manajemen Produk - Admin Perchick Store",
  description: "Kelola produk olahan ayam, stok, harga, dan kategori di Perchick Store.",
};

export default function AdminProductManagementsPage() {
  return <ProductManagementsView />;
}
