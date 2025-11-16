<template>
  <div class="catalog">
    <div class="container">
      <!-- Хедер каталога -->
      <div class="catalog-header">
        <h1 class="catalog-title">Каталог автозвука</h1>
        <div class="catalog-stats" v-if="filteredProducts.length !== products.length">
          Найдено: {{ filteredProducts.length }} из {{ products.length }} товаров
        </div>
      </div>

      <!-- Панель фильтров -->
      <div class="filters-panel">
        <div class="filters-header">
          <h3>Фильтры</h3>
          <button @click="toggleFilters" class="toggle-filters-btn">
            {{ showFilters ? 'Скрыть' : 'Показать' }} фильтры
          </button>
        </div>

        <div v-if="showFilters" class="filters-grid">
          <!-- Фильтр по категории -->
          <div class="filter-group">
            <label class="filter-label">Категория</label>
            <select v-model="selectedCategory" class="filter-select">
              <option value="">Все категории</option>
              <option value="Акустика">Акустика</option>
              <option value="Головные Устройства">Головные устройства</option>
              <option value="Сабвуферы">Сабвуферы</option>
              <option value="Усилители">Усилители</option>
            </select>
          </div>

          <!-- Фильтр по бренду -->
          <div class="filter-group">
            <label class="filter-label">Бренд</label>
            <select v-model="selectedBrand" class="filter-select">
              <option value="">Все бренды</option>
              <option value="Pioneer">Pioneer</option>
              <option value="Pride">Pride</option>
              <option value="Kenwood">Kenwood</option>
              <option value="JBL">JBL</option>
              <option value="Hertz">Hertz</option>
            </select>
          </div>

          <!-- Фильтр по цене -->
          <div class="filter-group price-filter-group">
            <label class="filter-label">Цена, руб.</label>
            <div class="price-inputs">
              <div class="price-field">
                <input type="number" v-model="minPrice" placeholder="0" class="price-input" />
                <span class="price-label">от</span>
              </div>
              <div class="price-field">
                <input type="number" v-model="maxPrice" placeholder="50000" class="price-input" />
                <span class="price-label">до</span>
              </div>
            </div>
          </div>

          <!-- Фильтр по рейтингу -->
          <div class="filter-group">
            <label class="filter-label">Рейтинг</label>
            <select v-model="minRating" class="filter-select">
              <option value="0">⭐ Любой рейтинг</option>
              <option value="4.5">⭐⭐⭐⭐⭐ 4.5+</option>
              <option value="4.0">⭐⭐⭐⭐☆ 4.0+</option>
              <option value="3.5">⭐⭐⭐☆☆ 3.5+</option>
            </select>
          </div>

          <!-- Фильтр по наличию -->
          <div class="filter-group checkbox-group">
            <label class="filter-label">Наличие</label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="onlyInStock" />
              <span class="checkmark"></span>
              Только в наличии
            </label>
          </div>

          <!-- Фильтр по скидке -->
          <div class="filter-group checkbox-group">
            <label class="filter-label">Акции</label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="onlyOnSale" />
              <span class="checkmark"></span>
              Товары со скидкой
            </label>
          </div>

          <!-- Кнопки управления -->
          <div class="filter-actions">
            <button @click="resetFilters" class="btn btn-secondary">Сбросить фильтры</button>
            <button @click="applyFilters" class="btn btn-primary">Применить</button>
          </div>
        </div>
      </div>

      <!-- Быстрые фильтры -->
      <div class="quick-filters">
        <button
          v-for="filter in quickFilters"
          :key="filter.key"
          @click="applyQuickFilter(filter)"
          class="quick-filter-btn"
          :class="{ active: isQuickFilterActive(filter) }"
        >
          {{ filter.emoji }} {{ filter.label }}
        </button>
      </div>

      <!-- Сортировка -->
      <div class="sorting">
        <label class="sort-label">Сортировка:</label>
        <select v-model="sortBy" class="sort-select">
          <option value="default">По умолчанию</option>
          <option value="price_asc">Цена ↑</option>
          <option value="price_desc">Цена ↓</option>
          <option value="rating">По рейтингу</option>
          <option value="name">По названию</option>
        </select>
      </div>

      <!-- Сетка товаров -->
      <div class="products-section">
        <div v-if="loading" class="loading-products">
          <div class="spinner"></div>
          <p>Загружаем товары...</p>
        </div>

        <template v-else>
          <div class="products-grid">
            <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="$emit('add-to-cart', product)"
            />
          </div>

          <!-- Пустой результат -->
          <div v-if="sortedProducts.length === 0" class="no-products">
            <div class="no-products-icon">😔</div>
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры фильтрации</p>
            <button @click="resetFilters" class="btn btn-primary">Показать все товары</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import type { Product } from '../lib/products/types';

interface Props {
  products: Product[];
}

interface Emits {
  (e: 'add-to-cart', product: Product): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Состояния фильтров
const showFilters = ref(true);
const selectedCategory = ref<string>('');
const selectedBrand = ref<string>('');
const onlyInStock = ref<boolean>(false);
const onlyOnSale = ref<boolean>(false);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const minRating = ref<number>(0);
const sortBy = ref<string>('default');
const loading = ref(false);

// Быстрые фильтры
const quickFilters = [
  { key: 'in_stock', label: 'В наличии', emoji: '✅', filter: { onlyInStock: true } },
  { key: 'sale', label: 'Со скидкой', emoji: '🔥', filter: { onlyOnSale: true } },
  { key: 'top_rated', label: 'Топ рейтинг', emoji: '⭐', filter: { minRating: 4.5 } },
  { key: 'budget', label: 'Бюджетные', emoji: '💰', filter: { maxPrice: 15000 } },
];

// Отфильтрованные продукты
const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    if (selectedCategory.value && product.category !== selectedCategory.value) return false;
    if (selectedBrand.value && product.brand !== selectedBrand.value) return false;
    if (onlyInStock.value && !product.inStock) return false;
    if (onlyOnSale.value && !product.oldPrice) return false;
    if (minPrice.value && product.price < minPrice.value) return false;
    if (maxPrice.value && product.price > maxPrice.value) return false;
    if (minRating.value && product.rating < minRating.value) return false;
    return true;
  });
});

// Отсортированные продукты
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value];

  switch (sortBy.value) {
    case 'price_asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return products.sort((a, b) => b.price - a.price);
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
});

// Методы
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const applyQuickFilter = (filter: any) => {
  if (filter.filter.onlyInStock !== undefined) {
    onlyInStock.value = filter.filter.onlyInStock;
  }
  if (filter.filter.onlyOnSale !== undefined) {
    onlyOnSale.value = filter.filter.onlyOnSale;
  }
  if (filter.filter.minRating !== undefined) {
    minRating.value = filter.filter.minRating;
  }
  if (filter.filter.maxPrice !== undefined) {
    maxPrice.value = filter.filter.maxPrice;
  }
};

const isQuickFilterActive = (filter: any) => {
  if (filter.filter.onlyInStock !== undefined) {
    return onlyInStock.value === filter.filter.onlyInStock;
  }
  if (filter.filter.onlyOnSale !== undefined) {
    return onlyOnSale.value === filter.filter.onlyOnSale;
  }
  if (filter.filter.minRating !== undefined) {
    return minRating.value === filter.filter.minRating;
  }
  if (filter.filter.maxPrice !== undefined) {
    return maxPrice.value === filter.filter.maxPrice;
  }
  return false;
};

const resetFilters = () => {
  selectedCategory.value = '';
  selectedBrand.value = '';
  onlyInStock.value = false;
  onlyOnSale.value = false;
  minPrice.value = null;
  maxPrice.value = null;
  minRating.value = 0;
  sortBy.value = 'default';
};

const applyFilters = () => {
  // Фильтры применяются автоматически через computed
  showFilters.value = false;
};

// Автоматическое скрытие фильтров на мобильных
watch(
  () => props.products,
  () => {
    if (window.innerWidth < 768) {
      showFilters.value = false;
    }
  }
);
</script>

<style scoped>
.catalog {
  padding: 1rem 0 3rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.catalog-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.catalog-stats {
  background: #3498db;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Панель фильтров */
.filters-panel {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  overflow: hidden;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
}

.filters-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.toggle-filters-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.toggle-filters-btn:hover {
  background: #5a6268;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.filter-select {
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.filter-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.price-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.price-separator {
  color: #6c757d;
  font-weight: 600;
}

.price-filter-group {
  grid-column: span 2;
}

.price-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.price-field {
  position: relative;
  display: flex;
  flex-direction: column;
}

.price-input {
  padding: 10px 12px 10px 40px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
  width: 100%;
}

.price-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.price-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 500;
  pointer-events: none;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* Адаптивность для фильтров */
@media (max-width: 1024px) {
  .price-filter-group {
    grid-column: span 1;
  }

  .price-inputs {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }

  .price-filter-group {
    grid-column: span 1;
  }

  .price-inputs {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .price-inputs {
    grid-template-columns: 1fr;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: #3498db;
  border-color: #3498db;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filter-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

/* Быстрые фильтры */
.quick-filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.quick-filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.quick-filter-btn:hover {
  border-color: #3498db;
  transform: translateY(-1px);
}

.quick-filter-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* Сортировка */
.sorting {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.sort-label {
  font-weight: 600;
  color: #495057;
  white-space: nowrap;
}

.sort-select {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  min-width: 150px;
}

/* Сетка товаров */
.products-section {
  position: relative;
}

.loading-products {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.no-products-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-products h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.no-products p {
  color: #6c757d;
  margin-bottom: 2rem;
}

/* Кнопки */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .catalog-title {
    font-size: 2rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .filters-header {
    padding: 1rem 1.5rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .sorting {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .quick-filters {
    justify-content: center;
  }

  .filter-actions {
    justify-content: stretch;
  }

  .filter-actions .btn {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }

  .catalog-title {
    font-size: 1.75rem;
  }

  .filters-grid {
    padding: 1rem;
  }
}
</style>
