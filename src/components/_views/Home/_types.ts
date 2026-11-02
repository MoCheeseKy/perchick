import { ProductInterface, CategoryInterface } from "@/components/_shared/ProductCard/_types";

export interface HomeViewProps {
  initialProducts?: ProductInterface[];
  categories?: CategoryInterface[];
}
