export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  benefits: string[];
  rating: number;
  reviews: number;
  ingredients: string[];
  sizes: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}
