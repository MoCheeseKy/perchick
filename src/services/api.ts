import { ProductInterface, CategoryInterface } from "@/components/_shared/ProductCard/_types";
import initialData from "../../data.json";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

let memoryProducts: ProductInterface[] = [...(initialData.products as ProductInterface[])];

export async function fetchProducts(): Promise<ProductInterface[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch from server");
    const data = await res.json();
    memoryProducts = data;
    return data;
  } catch {
    return memoryProducts;
  }
}

export async function fetchProductById(id: string): Promise<ProductInterface | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch {
    const found = memoryProducts.find((p) => String(p.id) === String(id));
    return found || null;
  }
}

export async function fetchCategories(): Promise<CategoryInterface[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch {
    return initialData.categories;
  }
}

export async function createProduct(
  newProduct: Omit<ProductInterface, "id">
): Promise<ProductInterface> {
  const productWithId: ProductInterface = {
    ...newProduct,
    id: String(Date.now()),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productWithId),
    });
    if (!res.ok) throw new Error("Failed to create product on json-server");
    const data = await res.json();
    memoryProducts.unshift(data);
    return data;
  } catch {
    memoryProducts.unshift(productWithId);
    return productWithId;
  }
}

export async function updateProduct(
  id: string,
  updatedData: Partial<ProductInterface>
): Promise<ProductInterface> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update product on json-server");
    const data = await res.json();
    memoryProducts = memoryProducts.map((p) => (String(p.id) === String(id) ? data : p));
    return data;
  } catch {
    memoryProducts = memoryProducts.map((p) =>
      String(p.id) === String(id) ? { ...p, ...updatedData } : p
    );
    const updated = memoryProducts.find((p) => String(p.id) === String(id));
    return updated!;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product on json-server");
    memoryProducts = memoryProducts.filter((p) => String(p.id) !== String(id));
    return true;
  } catch {
    memoryProducts = memoryProducts.filter((p) => String(p.id) !== String(id));
    return true;
  }
}
