import { ProductInterface } from "@/components/_shared/ProductCard/_types";

export interface ProductFormData {
  name: string;
  category: string;
  categoryName?: string;
  price: number;
  originalPrice?: number;
  weight: string;
  stock: number;
  image: string;
  description: string;
  isFeatured: boolean;
}

export interface ProductManagementsViewProps {
  initialProducts?: ProductInterface[];
}
