<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.inStock, 'on-sale': product.oldPrice }">
    <div class="card-badges">
      <span v-if="!product.inStock" class="badge stock-badge">🔴 Нет в наличии</span>
      <span v-else-if="product.oldPrice" class="badge sale-badge">🔥 Скидка {{ discountPercentage }}%</span>
      <span v-else-if="isNew" class="badge new-badge">🆕 Новинка</span>
    </div>

    <div class="product-image-section">
      <div class="product-image">
        <img :src="product.images" :alt="product.name" @error="handleImageError" class="product-img" />
      </div>

      <div class="product-brand">
        <span class="brand-logo">🏷️</span>
        {{ product.brand }}
      </div>
    </div>

    <div class="product-info">
      <div class="category-tag">
        {{ product.category }}
      </div>

      <h3 class="product-title">{{ product.name }}</h3>

      <p class="product-description">{{ product.shortDescription }}</p>

      <div class="product-features">
        <div class="features-list">
          <div v-for="(value, key) in limitedFeatures" :key="key" class="feature-item">
            <span class="feature-dot">•</span>
            <span class="feature-text">
              <span>{{ getFeatureLabel(String(key)) }}:</span>
              <span>{{ value }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="rating-section">
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{
              filled: star <= Math.floor(product.rating),
              'half-filled': star === Math.ceil(product.rating) && product.rating % 1 !== 0,
            }"
          >
            ⭐
          </span>
        </div>
        <div class="rating-info">
          <span class="rating-value">{{ product.rating }}</span>
          <span class="reviews-count">({{ product.reviewsCount }} отзывов)</span>
        </div>
      </div>
    </div>

    <div class="product-footer">
      <div class="price-section">
        <div class="price-main">
          <span class="current-price">{{ formattedPrice }} ₽</span>
          <span v-if="product.oldPrice" class="original-price"> {{ formattedOldPrice }} ₽ </span>
        </div>
        <div v-if="monthlyPayment" class="installment-plan">или {{ monthlyPayment }} ₽/мес</div>
      </div>

      <div class="action-buttons">
        <button v-if="product.inStock" class="add-to-cart-btn" @click="handleAddToCart" :disabled="addingToCart">
          <span v-if="addingToCart" class="btn-loading">
            <div class="spinner"></div>
            Добавляем...
          </span>
          <span v-else class="btn-content">
            <span class="cart-icon"></span>
            В корзину
          </span>
        </button>

        <button v-else class="notify-btn" @click="handleNotify">
          <span class="bell-icon"></span>
          Сообщить о поступлении
        </button>

        <button class="wishlist-btn" @click="toggleWishlist" :class="{ 'in-wishlist': isInWishlist }">
          <span class="heart-icon">{{ isInWishlist ? '❤️' : '🤍' }}</span>
        </button>
      </div>

      <router-link :to="`/product/${product.id}`" class="btn-outline">
        <button class="details-btn" @click="goToProductDetail">
          <span class="info-icon"></span>
          Подробнее
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { featureLabels } from '@/lib/products/labels';
import router from '@/router/router';
import { computed, ref } from 'vue';
import type { Product } from '../lib/products/types';

interface Props {
  product: Product;
}

interface Emits {
  (e: 'add-to-cart', product: Product): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Состояния
const addingToCart = ref(false);
const isInWishlist = ref(false);

// Вычисляемые свойства
const discountPercentage = computed(() => {
  if (!props.product.oldPrice) return 0;
  return Math.round((1 - props.product.price / props.product.oldPrice) * 100);
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(props.product.price);
});

const formattedOldPrice = computed(() => {
  if (!props.product.oldPrice) return '';
  return new Intl.NumberFormat('ru-RU').format(props.product.oldPrice);
});

const monthlyPayment = computed(() => {
  const monthly = Math.round(props.product.price / 12);
  return new Intl.NumberFormat('ru-RU').format(monthly);
});

const limitedFeatures = computed(() => {
  const features = { ...props.product.features };
  return Object.fromEntries(Object.entries(features).slice(0, 2));
});

const getFeatureLabel = (key: string): string => {
  return featureLabels[key as keyof typeof featureLabels] || key;
};

const isNew = computed(() => {
  return props.product.id <= 3;
});

// Методы
const handleAddToCart = async () => {
  addingToCart.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  emit('add-to-cart', props.product);
  addingToCart.value = false;
};

const goToProductDetail = (): void => {
  router.push(`/product/${props.product.id}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
};

const handleNotify = () => {
  alert(`Мы уведомим вас, когда "${props.product.name}" появится в наличии!`);
};

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/images/placeholder.jpg';
};
</script>

<style scoped>
.product-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1);
}

.product-card.out-of-stock {
  opacity: 0.85;
}

.product-card.out-of-stock:hover {
  transform: none;
}

/* Бейджи */
.card-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 10;
}

.badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

/* Секция изображения */
.product-image-section {
  position: relative;
  padding: 16px 16px 8px;
}

.product-image {
  position: relative;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  margin-bottom: 12px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.quick-view-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c3e50;
}

.quick-view-btn:hover {
  background: white;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.product-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Информация о товаре */
.product-info {
  padding: 0 20px;
}

.category-tag {
  display: inline-block;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.4;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Характеристики */
.product-features {
  margin-bottom: 16px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.feature-dot {
  color: #3498db;
  font-weight: bold;
}

.feature-text {
  color: #5a6c7d;
  font-weight: 500;
}

/* Рейтинг */
.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(52, 152, 219, 0.05);
  border-radius: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 1rem;
  opacity: 0.3;
  transition: opacity 0.3s ease;
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
  gap: 4px;
  font-size: 0.85rem;
}

.rating-value {
  font-weight: 700;
  color: #2c3e50;
}

.reviews-count {
  color: #7f8c8d;
}

/* Футер */
.product-footer {
  padding: 0 20px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 20px;
}

.price-section {
  margin-bottom: 16px;
}

.price-main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c3e50;
  background: linear-gradient(135deg, #27ae60, #219a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.original-price {
  font-size: 1rem;
  color: #7f8c8d;
  text-decoration: line-through;
  font-weight: 500;
}

.installment-plan {
  font-size: 0.8rem;
  color: #3498db;
  font-weight: 600;
}

/* Кнопки действий */
.action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.add-to-cart-btn,
.notify-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
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
  transform: none;
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
  width: 50px;
  height: 50px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
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

.btn-outline {
  text-decoration: none;
}

.details-btn {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #3498db;
  color: #3498db;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
}

.details-btn:hover {
  background: #3498db;
  color: white;
  transform: translateY(-1px);
}

/* Загрузка */
.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
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

/* Адаптивность */
@media (max-width: 768px) {
  .product-card {
    margin: 0 8px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .wishlist-btn {
    width: 100%;
    height: 44px;
  }

  .product-image {
    height: 160px;
  }

  .product-info {
    padding: 0 16px;
  }

  .product-footer {
    padding: 0 16px 16px;
  }
}

@media (max-width: 480px) {
  .card-badges {
    flex-direction: column;
    gap: 4px;
  }

  .badge {
    font-size: 0.7rem;
    padding: 4px 8px;
  }

  .price-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .rating-section {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
