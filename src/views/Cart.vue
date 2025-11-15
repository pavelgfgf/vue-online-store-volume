<template>
  <div class="cart">
    <div class="container">
      <h1>Корзина</h1>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Корзина пуста</h2>
        <router-link to="/catalog" class="btn btn-primary">
          Перейти к покупкам
        </router-link>
      </div>

      <div v-else>
        <div class="cart-items">
          <CartItem 
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @remove-from-cart="$emit('remove-from-cart', item.id)"
            @update-quantity="$emit('update-quantity', $event)"
          />
        </div>

        <div class="cart-total">
          <h3>Итого: {{ totalPrice }} руб.</h3>
          <button class="btn btn-success btn-large">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CartItem from '../components/CartItem.vue'
import type { CartItem as CartItemType, QuantityUpdate } from '../lib/products/types'

interface Props {
  cartItems: CartItemType[]
}

interface Emits {
  (e: 'remove-from-cart', productId: number): void
  (e: 'update-quantity', update: QuantityUpdate): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})
</script>

<style scoped>
.empty-cart {
  text-align: center;
  padding: 4rem 0;
}

.empty-cart i {
  font-size: 4rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
}

.cart-total {
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.btn-success {
  background: #4CAF50;
  color: white;
}
</style>