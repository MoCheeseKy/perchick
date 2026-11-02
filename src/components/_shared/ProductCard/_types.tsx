export interface ProductInterface {
  id: string;
  name: string;
  category: string;
  categoryName?: string;
  price: number;
  weight: string;
  stock: number;
  rating?: number;
  soldCount?: number;
  image: string;
  description: string;
  ingredients?: string[];
  storage?: string;
  isFeatured?: boolean;
}

export interface CategoryInterface {
  id: string;
  name: string;
  icon?: string;
}

export default interface ProductCardInterface {
  product: ProductInterface;
  className?: string;
  onOrderClick?: (product: ProductInterface) => void;
}
