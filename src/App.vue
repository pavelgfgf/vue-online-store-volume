<template>
  <div id="app">
    <Header :cart-items="cartItems" />
    <main>
      <router-view 
        :products="products" 
        :cart-items="cartItems"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
      />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { mockProducts } from './lib/products/mocks'
import type { CartItem, Product, QuantityUpdate } from './lib/products/types'

const cartItems = ref<CartItem[]>([])
const products = ref<Product[]>(mockProducts)

const addToCart = (product: Product): void => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    })
  }
}

const removeFromCart = (productId: number): void => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
}

const updateQuantity = ({ productId, quantity }: QuantityUpdate): void => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    item.quantity = quantity
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px 0;
}
</style>