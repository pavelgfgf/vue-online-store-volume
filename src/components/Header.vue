<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <i class="fas fa-volume-up"></i>
          <h1>Auto<span>Sound</span></h1>
        </router-link>
        
        <nav class="navigation">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/catalog" class="nav-link">Каталог</router-link>
          <router-link to="/cart" class="nav-link cart-link">
            Корзина
            <span v-if="cartItems.length > 0" class="cart-badge">
              {{ cartItems.length }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { CartItem } from '../lib/products/types'

interface Props {
  cartItems: CartItem[]
}

defineProps<Props>()
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1a2a6c, #2a3a7c);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
}

.logo i {
  font-size: 2rem;
  color: #4CAF50;
}

.logo h1 {
  font-size: 1.8rem;
}

.logo span {
  color: #4CAF50;
}

.navigation {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.1);
}

.cart-badge {
  background: #e74c3c;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  margin-left: 5px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>