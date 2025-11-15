// hooks/useProducts.ts
import { ref, computed, readonly, type Ref } from 'vue';
import type { Product, ProductFilters } from './types';
import { mockProducts } from './mocks';

export function useProducts() {
  // State
  const products: Ref<Product[]> = ref(mockProducts);
  const loading = ref(false);
  const filters: Ref<ProductFilters> = ref({});

  // Computed products with filters
  const filteredProducts = computed<Product[]>(() => {
    return products.value.filter(product => {
      const {
        category,
        brand,
        minPrice,
        maxPrice,
        inStock,
        minRating,
        subcategory
      } = filters.value;

      if (category && product.category !== category) return false;
      if (brand && product.brand !== brand) return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      if (inStock !== undefined && product.inStock !== inStock) return false;
      if (minRating && product.rating < minRating) return false;
      if (subcategory && product.subcategory !== subcategory) return false;

      return true;
    });
  });

  // Computed featured products (high rating)
  const featuredProducts = computed<Product[]>(() => 
    products.value
      .filter(product => product.rating >= 4.5)
      .slice(0, 6)
  );

  // Computed new arrivals (by ID descending)
  const newArrivals = computed<Product[]>(() => 
    [...products.value]
      .sort((a, b) => b.id - a.id)
      .slice(0, 8)
  );

  // Computed products on sale
  const saleProducts = computed<Product[]>(() =>
    products.value
      .filter(product => product.oldPrice !== null)
      .sort((a, b) => {
        const discountA = ((a.oldPrice! - a.price) / a.oldPrice!) * 100;
        const discountB = ((b.oldPrice! - b.price) / b.oldPrice!) * 100;
        return discountB - discountA;
      })
  );

  // Computed in-stock products
  const inStockProducts = computed<Product[]>(() =>
    products.value.filter(product => product.inStock)
  );

  // Computed unique categories
  const categories = computed<string[]>(() => {
    const uniqueCategories = new Set(products.value.map(p => p.category));
    return Array.from(uniqueCategories);
  });

  // Computed unique brands
  const brands = computed<string[]>(() => {
    const uniqueBrands = new Set(products.value.map(p => p.brand));
    return Array.from(uniqueBrands);
  });

  // Computed unique subcategories
  const subcategories = computed<string[]>(() => {
    const uniqueSubcategories = new Set(products.value.map(p => p.subcategory));
    return Array.from(uniqueSubcategories);
  });

  // Methods
  const setFilters = (newFilters: ProductFilters): void => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = (): void => {
    filters.value = {};
  };

  const getProductById = (id: number): Product | undefined => {
    return products.value.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.value.filter(product => product.category === category);
  };

  const getProductsByBrand = (brand: string): Product[] => {
    return products.value.filter(product => product.brand === brand);
  };

  const getProductsBySubcategory = (subcategory: string): Product[] => {
    return products.value.filter(product => product.subcategory === subcategory);
  };

  const searchProducts = (query: string): Product[] => {
    const searchTerm = query.toLowerCase();
    return products.value.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.shortDescription.toLowerCase().includes(searchTerm)
    );
  };

  const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    return products.value
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || p.brand === product.brand)
      )
      .slice(0, limit);
  };

  const getTopRatedProducts = (limit: number = 5): Product[] => {
    return [...products.value]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  const getProductsWithDiscount = (minDiscountPercent: number = 10): Product[] => {
    return products.value.filter(product => {
      if (!product.oldPrice) return false;
      const discount = ((product.oldPrice - product.price) / product.oldPrice) * 100;
      return discount >= minDiscountPercent;
    });
  };

  const refreshProducts = async (): Promise<void> => {
    loading.value = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, you would fetch new data here
      // products.value = await fetchProducts();
    } finally {
      loading.value = false;
    }
  };

  return {
    // Data
    products: filteredProducts,
    allProducts: readonly(products),
    featuredProducts,
    newArrivals,
    saleProducts,
    inStockProducts,
    loading: readonly(loading),
    filters: readonly(filters),
    categories,
    brands,
    subcategories,
    
    // Methods
    setFilters,
    clearFilters,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    getProductsBySubcategory,
    searchProducts,
    getRelatedProducts,
    getTopRatedProducts,
    getProductsWithDiscount,
    refreshProducts
  };
}

export type UseProductsReturn = ReturnType<typeof useProducts>;