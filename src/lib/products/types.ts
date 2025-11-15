// types/index.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice: number | null;
  brand: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  images: string;
  features: Record<string, string>;
  description: string;
  shortDescription: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  minRating?: number;
  subcategory?: string;
}

export interface CartItem extends Product {
  quantity: number
}

export interface QuantityUpdate {
  productId: number
  quantity: number
}