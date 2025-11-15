<template>
  <div class="home">
    <div class="container">
      <section class="hero">
        <h1>Лучший автозвук для вашего автомобиля</h1>
        <p>Широкий выбор компонентов от ведущих производителей</p>
        <router-link to="/catalog" class="btn btn-primary">
          Смотреть каталог
        </router-link>
      </section>

      <section class="featured-products">
        <h2>Популярные товары</h2>
        <div class="products-grid">
          <ProductCard 
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', product)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { computed } from 'vue'
import type { Product } from '../lib/products/types'

interface Props {
  products: Product[]
}

interface Emits {
  (e: 'add-to-cart', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const featuredProducts = computed(() => props.products.slice(1, 4))
</script>

<style scoped>
.home {
  min-height: 70vh;
  padding: 50px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background: #45a049;
}

.featured-products h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
</style>