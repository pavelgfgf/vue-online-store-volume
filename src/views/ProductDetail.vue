<template>
  <div class="product-detail">
    <div class="container" v-if="product">
      <div class="product-layout">
        <div class="product-image">
          <img :src="product.images" :alt="product.name" />
        </div>
        
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-description">{{ product.description }}</p>
          
          <div class="product-specs">
            <h3>Характеристики:</h3>
            <ul>
              <li v-for="(value, key) in product.features" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
              </li>
            </ul>
          </div>
          
          <div class="product-price">{{ product.price }} руб.</div>
          
          <button class="btn btn-primary btn-large" @click="addToCart">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>Товар не найден</h2>
      <router-link to="/catalog" class="btn btn-primary">
        Вернуться в каталог
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../lib/products/types'

interface Props {
  products: Product[]
}

interface Emits {
  (e: 'add-to-cart', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const route = useRoute()

const product = computed(() => {
  const productId = parseInt(route.params.id as string)
  return props.products.find(p => p.id === productId)
})

const addToCart = (): void => {
  if (product.value) {
    emit('add-to-cart', product.value)
  }
}
</script>

<style scoped>
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.product-image img {
  max-width: 100%;
  max-height: 400px;
}

.product-info h1 {
  margin-bottom: 0.5rem;
  color: #333;
}

.product-category {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
}

.product-specs {
  margin-bottom: 2rem;
}

.product-specs h3 {
  margin-bottom: 1rem;
  color: #333;
}

.product-specs ul {
  list-style: none;
}

.product-specs li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>