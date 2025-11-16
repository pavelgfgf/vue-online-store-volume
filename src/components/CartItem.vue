<template>
  <div class="cart-item">
    <div class="item-info">
      <div class="item-image">
        <img :src="item.images" :alt="item.name" />
      </div>
      <div class="item-details">
        <h3>{{ item.name }}</h3>
        <p class="item-category">{{ item.category }}</p>
        <p class="item-price">{{ item.price }} руб.</p>
      </div>
    </div>
    
    <div class="item-controls">
      <div class="quantity-control">
        <button 
          class="quantity-btn" 
          @click="decreaseQuantity"
          :disabled="item.quantity <= 1"
        >
          -
        </button>
        <span class="quantity">{{ item.quantity }}</span>
        <button class="quantity-btn" @click="increaseQuantity">+</button>
      </div>
      
      <button class="remove-btn" @click="$emit('remove-from-cart')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem as CartItemType, QuantityUpdate } from '../lib/products/types'

interface Props {
  item: CartItemType
}

interface Emits {
  (e: 'remove-from-cart'): void
  (e: 'update-quantity', update: QuantityUpdate): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const increaseQuantity = (): void => {
  emit('update-quantity', {
    productId: props.item.id,
    quantity: props.item.quantity + 1
  })
}

const decreaseQuantity = (): void => {
  if (props.item.quantity > 1) {
    emit('update-quantity', {
      productId: props.item.id,
      quantity: props.item.quantity - 1
    })
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.item-image {
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
}

.item-details h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.item-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.item-price {
  font-weight: bold;
  color: #2c3e50;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .item-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>