<template>
  <div class="catalog">
    <div class="container">
      <h1>Каталог автозвука</h1>
      
      <div class="filters">
        <!-- Фильтр по категории -->
        <select v-model="selectedCategory" class="filter-select">
          <option value="">Все категории</option>
          <option value="акустика">Акустика</option>
          <option value="головныеУстройства">Головные устройства</option>
          <option value="сабвуферы">Сабвуферы</option>
          <option value="усилители">Усилители</option>
        </select>

        <!-- Фильтр по бренду -->
        <select v-model="selectedBrand" class="filter-select">
          <option value="">Все бренды</option>
          <option value="Pioneer">Pioneer</option>
          <option value="Pride">Pride</option>
          <option value="Kenwood">Kenwood</option>
          <option value="JBL">JBL</option>
          <option value="Hertz">Hertz</option>
        </select>

        <!-- Фильтр по наличию -->
        <label class="filter-checkbox">
          <input type="checkbox" v-model="onlyInStock">
          Только в наличии
        </label>

        <!-- Фильтр по цене -->
        <div class="price-filter">
          <input 
            type="number" 
            v-model="minPrice" 
            placeholder="Мин. цена" 
            class="price-input"
          >
          <span>-</span>
          <input 
            type="number" 
            v-model="maxPrice" 
            placeholder="Макс. цена" 
            class="price-input"
          >
        </div>

        <!-- Фильтр по рейтингу -->
        <select v-model="minRating" class="filter-select">
          <option value="0">Любой рейтинг</option>
          <option value="4.5">4.5+ ★</option>
          <option value="4.0">4.0+ ★</option>
          <option value="3.5">3.5+ ★</option>
        </select>

        <!-- Сброс фильтров -->
        <button @click="resetFilters" class="reset-btn">
          Сбросить фильтры
        </button>
      </div>

      <!-- Статистика -->
      <div class="filter-stats" v-if="filteredProducts.length !== products.length">
        Найдено товаров: {{ filteredProducts.length }} из {{ products.length }}
      </div>

      <div class="products-grid">
        <ProductCard 
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="$emit('add-to-cart', product)"
        />
      </div>

      <!-- Пустой результат -->
      <div v-if="filteredProducts.length === 0" class="no-products">
        <p>Товары по выбранным фильтрам не найдены</p>
        <button @click="resetFilters" class="reset-btn">Показать все товары</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../lib/products/types'

interface Props {
  products: Product[]
}

interface Emits {
  (e: 'add-to-cart', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Фильтры
const selectedCategory = ref<string>('')
const selectedBrand = ref<string>('')
const onlyInStock = ref<boolean>(false)
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const minRating = ref<number>(0)

// Отфильтрованные продукты
const filteredProducts = computed(() => {
  return props.products.filter(product => {
    // Фильтр по категории
    if (selectedCategory.value && product.category !== selectedCategory.value) {
      return false
    }

    // Фильтр по бренду
    if (selectedBrand.value && product.brand !== selectedBrand.value) {
      return false
    }

    // Фильтр по наличию
    if (onlyInStock.value && !product.inStock) {
      return false
    }

    // Фильтр по минимальной цене
    if (minPrice.value && product.price < minPrice.value) {
      return false
    }

    // Фильтр по максимальной цене
    if (maxPrice.value && product.price > maxPrice.value) {
      return false
    }

    // Фильтр по рейтингу
    if (minRating.value && product.rating < minRating.value) {
      return false
    }

    return true
  })
})

// Сброс всех фильтров
const resetFilters = () => {
  selectedCategory.value = ''
  selectedBrand.value = ''
  onlyInStock.value = false
  minPrice.value = null
  maxPrice.value = null
  minRating.value = 0
}
</script>

<style scoped>
.catalog {
  padding: 2rem 0;
}

.filters {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  min-width: 150px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.price-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  width: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.reset-btn {
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.reset-btn:hover {
  background: #5a6268;
}

.filter-stats {
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.no-products {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.no-products p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select,
  .price-input {
    width: 100%;
  }
  
  .price-filter {
    justify-content: space-between;
  }
}
</style>