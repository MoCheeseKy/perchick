import { ProductInterface } from "@/components/_shared/ProductCard/_types";

export interface DetailProductsViewProps {
  id: string;
  initialProduct?: ProductInterface | null;
}
