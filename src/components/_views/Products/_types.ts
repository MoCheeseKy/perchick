import { ProductInterface, CategoryInterface } from "@/components/_shared/ProductCard/_types";

export interface ProductsViewProps {
  initialCategory?: string;
  initialProducts?: ProductInterface[];
  categories?: CategoryInterface[];
}
