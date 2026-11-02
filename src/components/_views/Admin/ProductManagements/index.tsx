"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, X, RefreshCw, ExternalLink } from "lucide-react";
import Wrapper from "@/components/_shared/Wrapper";
import { ProductInterface } from "@/components/_shared/ProductCard/_types";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "@/services/api";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductFormData, ProductManagementsViewProps } from "./_types";

const INITIAL_FORM_DATA: ProductFormData = {
  name: "",
  category: "nugget-karaage",
  categoryName: "Nugget & Karaage",
  price: 35000,
  originalPrice: 40000,
  weight: "500 gr",
  stock: 50,
  image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
  description: "",
  isFeatured: false,
};

export default function ProductManagementsView({
  initialProducts,
}: ProductManagementsViewProps) {
  const [products, setProducts] = useState<ProductInterface[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const data = await fetchProducts();
        if (!ignore) {
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || prod.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData(INITIAL_FORM_DATA);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductInterface) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      categoryName: product.categoryName || "",
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      weight: product.weight,
      stock: product.stock,
      image: product.image,
      description: product.description,
      isFeatured: !!product.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const categoryNamesMap: Record<string, string> = {
      "nugget-karaage": "Nugget & Karaage",
      "ayam-ungkep": "Ayam Ungkep & Tradisional",
      "sosis-bakso": "Sosis & Bakso Ayam",
      "dimsum-snack": "Dimsum & Camilan",
      "abon-kering": "Abon & Lauk Kering",
    };

    const payload = {
      ...formData,
      categoryName: categoryNamesMap[formData.category] || formData.category,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }
      await loadData();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Hapus produk "${name}"?`)) {
      try {
        await deleteProduct(id);
        await loadData();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus produk.");
      }
    }
  };

  return (
    <div className="space-y-4">
      <Wrapper backgroundColor="bg-transparent">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 z-10 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val)}
              containerClassName="w-44"
              options={[
                { value: "all", label: "Semua Kategori" },
                { value: "nugget-karaage", label: "Nugget & Karaage" },
                { value: "ayam-ungkep", label: "Ayam Ungkep" },
                { value: "sosis-bakso", label: "Sosis & Bakso" },
                { value: "dimsum-snack", label: "Dimsum" },
                { value: "abon-kering", label: "Abon" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              onClick={loadData}
              disabled={loading}
              className="gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>

            <Button
              size="default"
              onClick={handleOpenCreateModal}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Produk</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="border-b border-neutral-200 bg-neutral-50/80 text-xs font-bold text-neutral-500">
                <tr>
                  <th className="py-3 px-4">Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Berat</th>
                  <th className="py-3 px-4">Stok</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-400">
                      Memuat data produk...
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                            <Image
                              src={prod.image}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900 leading-snug">
                              {prod.name}
                            </div>
                            <span className="text-xs text-neutral-400">
                              #{prod.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">
                          {prod.categoryName || prod.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-bold text-neutral-900">
                        {formatRupiah(prod.price)}
                      </td>
                      <td className="py-3 px-4 text-neutral-600 text-xs">
                        {prod.weight}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={prod.stock < 15 ? "destructive" : "success"}>
                          {prod.stock} pcs
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/products/${prod.id}`}
                            target="_blank"
                            title="Buka Halaman"
                          >
                            <Button variant="ghost" size="icon-sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>

                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleOpenEditModal(prod)}
                            title="Edit"
                            className="hover:text-orange-600 hover:bg-orange-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(prod.id, prod.name)}
                            title="Hapus"
                            className="hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-400">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl border border-neutral-100">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="font-bold text-base text-neutral-900">
                  {editingProduct ? "Ubah Produk" : "Tambah Produk Baru"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Nama Produk *
                  </label>
                  <Input
                    required
                    placeholder="Contoh: Perchick Nugget Keju Crispy"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Kategori *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) =>
                        setFormData({ ...formData, category: val })
                      }
                      options={[
                        { value: "nugget-karaage", label: "Nugget & Karaage" },
                        { value: "ayam-ungkep", label: "Ayam Ungkep" },
                        { value: "sosis-bakso", label: "Sosis & Bakso" },
                        { value: "dimsum-snack", label: "Dimsum" },
                        { value: "abon-kering", label: "Abon" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Berat / Takaran *
                    </label>
                    <Input
                      required
                      placeholder="Contoh: 500 gr"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Harga Jual (Rp) *
                    </label>
                    <Input
                      type="number"
                      required
                      min={0}
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Stok (pcs) *
                    </label>
                    <Input
                      type="number"
                      required
                      min={0}
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    URL Gambar *
                  </label>
                  <Input
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Deskripsi Singkat *
                  </label>
                  <Textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="pt-1">
                  <Checkbox
                    id="isFeatured"
                    label="Tampilkan sebagai Produk Unggulan di Beranda"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFeatured: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
