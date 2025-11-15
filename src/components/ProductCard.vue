<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.images" :alt="product.name" class="product-img" />
    </div>
    <div class="product-info">
      <span class="product-category">{{ product.category }}</span>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">{{ product.price }} руб.</div>
      <div class="product-actions">
        <router-link :to="`/product/${product.id}`" class="btn btn-outline">
          Подробнее
        </router-link>
        <button class="btn btn-primary" @click="$emit('add-to-cart')">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../lib/products/types';

interface Props {
  product: Product
}

interface Emits {
  (e: 'add-to-cart'): void
}

defineProps<Props>()
defineEmits<Emits>()

</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 250px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-img {
  transform: scale(1);
}

.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-name {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
  line-height: 1.3;
  flex: 1;
}

.product-description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  flex: 1;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  flex: 1;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-outline {
  background: transparent;
  border: 2px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}
</style>