<template>
  <div class="product-detail">
    <div class="container" v-if="product">
      <!-- Хлебные крошки -->
      <nav class="breadcrumbs">
        <router-link to="/" class="breadcrumb-link">Главная</router-link>
        <span class="breadcrumb-separator">›</span>
        <router-link to="/catalog" class="breadcrumb-link">Каталог</router-link>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">{{ product.category }}</span>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">{{ product.name }}</span>
      </nav>

      <div class="product-layout">
        <!-- Галерея изображений -->
        <div class="product-gallery">
          <div class="main-image">
            <img :src="product.images" :alt="product.name" class="product-main-img" />
            <div class="image-badges">
              <span v-if="!product.inStock" class="badge stock-badge">🔴 Нет в наличии</span>
              <span v-if="product.oldPrice" class="badge sale-badge">🔥 Скидка {{ discountPercentage }}%</span>
              <span v-if="isNew" class="badge new-badge">🆕 Новинка</span>
            </div>
          </div>
        </div>

        <!-- Основная информация -->
        <div class="product-main-info">
          <div class="product-header">
            <div class="category-tag">{{ product.category }}</div>
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="product-brand">
              <span class="brand-icon">🏷️</span>
              Бренд: <strong>{{ product.brand }}</strong>
            </div>
          </div>

          <!-- Рейтинг и отзывы -->
          <div class="rating-section">
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star" :class="{
                'filled': star <= Math.floor(product.rating),
                'half-filled': star === Math.ceil(product.rating) && product.rating % 1 !== 0
              }">
                ⭐
              </span>
            </div>
            <div class="rating-info">
              <span class="rating-value">{{ product.rating }}</span>
              <span class="reviews-count">({{ product.reviewsCount }} отзывов)</span>
              <a href="#reviews" class="reviews-link">Посмотреть отзывы</a>
            </div>
          </div>

          <!-- Описание -->
          <div class="description-section">
            <h3>📝 Описание</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-short-description">{{ product.shortDescription }}</p>
          </div>

          <!-- Цена и покупка -->
          <div class="purchase-section">
            <div class="price-block">
              <div class="price-main">
                <span class="current-price">{{ formattedPrice }} ₽</span>
                <span v-if="product.oldPrice" class="original-price">
                  {{ formattedOldPrice }} ₽
                </span>
              </div>
              <div v-if="monthlyPayment" class="installment-plan">
                💳 или {{ monthlyPayment }} ₽/мес в рассрочку
              </div>
            </div>

            <div class="action-buttons">
              <button v-if="product.inStock" class="add-to-cart-btn" @click="addToCart" :disabled="addingToCart">
                <span v-if="addingToCart" class="btn-loading">
                  <div class="spinner"></div>
                  Добавляем...
                </span>
                <span v-else class="btn-content">
                  🛒 Добавить в корзину
                </span>
              </button>

              <button v-else class="notify-btn" @click="handleNotify">
                🔔 Уведомить о поступлении
              </button>

              <button class="wishlist-btn" @click="toggleWishlist" :class="{ 'in-wishlist': isInWishlist }">
                {{ isInWishlist ? '❤️' : '🤍' }}
              </button>
            </div>

            <div class="delivery-info">
              <div class="delivery-item">
                <span class="delivery-icon">🚚</span>
                <div class="delivery-text">
                  <strong>Бесплатная доставка</strong>
                  <span>по Москве за 1-2 дня</span>
                </div>
              </div>
              <div class="delivery-item">
                <span class="delivery-icon">🔄</span>
                <div class="delivery-text">
                  <strong>Легкий возврат</strong>
                  <span>в течение 14 дней</span>
                </div>
              </div>
              <div class="delivery-item">
                <span class="delivery-icon">🛡️</span>
                <div class="delivery-text">
                  <strong>Гарантия 2 года</strong>
                  <span>официальная гарантия</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Детальная информация -->
      <div class="product-details">
        <div class="details-tabs">
          <button v-for="tab in tabs" :key="tab.id" :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id">
            {{ tab.icon }} {{ tab.title }}
          </button>
        </div>

        <div class="tab-content">
          <!-- Характеристики -->
          <div v-if="activeTab === 'specs'" class="specs-grid">
            <div v-for="(value, key) in product.features" :key="key" class="spec-item">
              <span class="spec-name">{{ getFeatureLabel(key) }}</span>
              <span class="spec-value">{{ value }}</span>
            </div>
          </div>

          <!-- Описание -->
          <div v-else-if="activeTab === 'description'" class="description-content">
            <h3>Подробное описание</h3>
            <p>{{ product.description }}</p>
            <div class="features-list">
              <h4>Основные характеристики:</h4>
              <ul>
                <li v-for="(value, key) in product.features" :key="key">
                  <strong>{{ getFeatureLabel(key) }}:</strong> {{ value }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Отзывы -->
          <div v-else-if="activeTab === 'reviews'" class="reviews-content" id="reviews">
            <div class="reviews-summary">
              <div class="overall-rating">
                <div class="rating-big">{{ product.rating }}</div>
                <div class="stars-big">
                  <span v-for="star in 5" :key="star" class="star"
                    :class="{ 'filled': star <= Math.floor(product.rating) }">
                    ⭐
                  </span>
                </div>
                <div class="reviews-count-big">{{ product.reviewsCount }} отзывов</div>
              </div>
            </div>
            <div class="no-reviews">
              <p>😊 Будьте первым, кто оставит отзыв об этом товаре!</p>
              <button class="btn btn-primary">Написать отзыв</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Похожие товары -->
      <div class="related-products">
        <h2>🎯 Похожие товары</h2>
        <div class="related-grid">
          <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct"
            @add-to-cart="$emit('add-to-cart', relatedProduct)" />
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="not-found-content">
        <div class="not-found-icon">😕</div>
        <h2>Товар не найден</h2>
        <p>Возможно, товар был удален или перемещен</p>
        <router-link to="/catalog" class="btn btn-primary">
          🎧 Вернуться в каталог
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../lib/products/types'
import { featureLabels } from '@/lib/products/labels'

interface Props {
  products: Product[]
}

interface Emits {
  (e: 'add-to-cart', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const route = useRoute()

// Состояния
const activeTab = ref('specs')
const addingToCart = ref(false)
const isInWishlist = ref(false)

// Табы
const tabs = [
  { id: 'specs', title: 'Характеристики', icon: '⚙️' },
  { id: 'description', title: 'Описание', icon: '📝' },
  { id: 'reviews', title: 'Отзывы', icon: '⭐' }
]

// Вычисляемые свойства
const product = computed(() => {
  const productId = parseInt(route.params.id as string)
  return props.products.find(p => p.id === productId)
})

const discountPercentage = computed(() => {
  if (!product.value?.oldPrice) return 0
  return Math.round((1 - product.value.price / product.value.oldPrice) * 100)
})

const formattedPrice = computed(() => {
  return product.value ? new Intl.NumberFormat('ru-RU').format(product.value.price) : '0'
})

const formattedOldPrice = computed(() => {
  if (!product.value?.oldPrice) return ''
  return new Intl.NumberFormat('ru-RU').format(product.value.oldPrice)
})

const monthlyPayment = computed(() => {
  if (!product.value) return ''
  const monthly = Math.round(product.value.price / 12)
  return new Intl.NumberFormat('ru-RU').format(monthly)
})

const isNew = computed(() => {
  return product.value ? product.value.id <= 3 : false
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return props.products
    .filter(p => p.id !== product.value!.id && p.category === product.value!.category)
    .slice(0, 4)
})

// Методы
const addToCart = async (): Promise<void> => {
  if (!product.value) return

  addingToCart.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  emit('add-to-cart', product.value)
  addingToCart.value = false
}

const handleNotify = (): void => {
  if (product.value) {
    alert(`Мы уведомим вас, когда "${product.value.name}" появится в наличии!`)
  }
}

const toggleWishlist = (): void => {
  isInWishlist.value = !isInWishlist.value
}

const getFeatureLabel = (key: string): string => {
  return featureLabels[key as keyof typeof featureLabels] || key;
}
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Хлебные крошки */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #2980b9;
}

.breadcrumb-separator {
  color: #7f8c8d;
}

.breadcrumb-current {
  color: #2c3e50;
  font-weight: 600;
}

/* Основной layout */
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

/* Галерея */
.product-gallery {
  position: relative;
}

.main-image {
  position: relative;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.product-main-img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.image-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge {
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stock-badge {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.sale-badge {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
}

.new-badge {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

/* Основная информация */
.product-main-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-header {
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 1rem;
}

.category-tag {
  display: inline-block;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.product-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 1rem;
}

/* Рейтинг */
.rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(52, 152, 219, 0.05);
  border-radius: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 1.2rem;
  opacity: 0.3;
}

.star.filled {
  opacity: 1;
  color: #ffc107;
}

.star.half-filled {
  opacity: 1;
  background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.rating-value {
  font-weight: 700;
  color: #2c3e50;
}

.reviews-count {
  color: #7f8c8d;
}

.reviews-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.reviews-link:hover {
  text-decoration: underline;
}

/* Описание */
.description-section h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.product-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #5a6c7d;
  margin-bottom: 0.5rem;
}

.product-short-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  font-style: italic;
}

/* Покупка */
.purchase-section {
  background: rgba(52, 152, 219, 0.03);
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid rgba(52, 152, 219, 0.1);
}

.price-block {
  margin-bottom: 1.5rem;
}

.price-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  background: linear-gradient(135deg, #27ae60, #219a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.original-price {
  font-size: 1.5rem;
  color: #7f8c8d;
  text-decoration: line-through;
  font-weight: 500;
}

.installment-plan {
  font-size: 0.9rem;
  color: #3498db;
  font-weight: 600;
}

/* Кнопки действий */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.add-to-cart-btn,
.notify-btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1rem;
}

.add-to-cart-btn {
  background: linear-gradient(135deg, #27ae60, #219a52);
  color: white;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
}

.add-to-cart-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.notify-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.notify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.wishlist-btn {
  width: 60px;
  height: 60px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.wishlist-btn:hover {
  border-color: #e74c3c;
  transform: scale(1.1);
}

.wishlist-btn.in-wishlist {
  background: #e74c3c;
  border-color: #e74c3c;
  color: white;
}

/* Информация о доставке */
.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.delivery-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.delivery-icon {
  font-size: 1.5rem;
}

.delivery-text {
  display: flex;
  flex-direction: column;
}

.delivery-text strong {
  color: #2c3e50;
  font-size: 0.9rem;
}

.delivery-text span {
  color: #7f8c8d;
  font-size: 0.8rem;
}

/* Детальная информация */
.product-details {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.details-tabs {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.tab-btn {
  flex: 1;
  padding: 1.5rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  background: rgba(52, 152, 219, 0.05);
  color: #3498db;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
  background: white;
}

.tab-content {
  padding: 2rem;
}

/* Характеристики */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.spec-name {
  font-weight: 600;
  color: #2c3e50;
}

.spec-value {
  color: #5a6c7d;
  font-weight: 500;
}

/* Отзывы */
.reviews-summary {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  border-radius: 16px;
  color: white;
}

.overall-rating {
  text-align: center;
}

.rating-big {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stars-big {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.stars-big .star {
  font-size: 1.5rem;
}

.reviews-count-big {
  font-size: 1.1rem;
}

.no-reviews {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.no-reviews p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* Похожие товары */
.related-products {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.related-products h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Страница не найдена */
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.not-found-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.not-found p {
  color: #6c757d;
  margin-bottom: 2rem;
}

/* Загрузка */
.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Кнопки */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
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

/* Адаптивность */
@media (max-width: 968px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .details-tabs {
    flex-direction: column;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .product-layout {
    padding: 1.5rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .wishlist-btn {
    width: 100%;
    height: 50px;
  }

  .current-price {
    font-size: 2rem;
  }

  .original-price {
    font-size: 1.2rem;
  }

  .tab-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }

  .product-layout {
    padding: 1rem;
  }

  .breadcrumbs {
    font-size: 0.8rem;
  }

  .delivery-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>