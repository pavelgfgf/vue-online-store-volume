<template>
  <div class="cart">
    <div class="container">
      <div class="cart-header">
        <h1 class="cart-title">Корзина</h1>
        <div class="cart-stats" v-if="cartItems.length > 0">
          <span class="items-count">{{ totalItems }} товар(а)</span>
        </div>
      </div>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-icon">📭</div>
        <h2 class="empty-cart-title">Ваша корзина пуста</h2>
        <p class="empty-cart-text">Добавьте товары из каталога, чтобы сделать заказ</p>
        <router-link to="/catalog" class="btn btn-primary btn-large">
          🎧 Перейти к покупкам
        </router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <CartItem 
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @remove-from-cart="$emit('remove-from-cart', item.id)"
            @update-quantity="$emit('update-quantity', $event)"
          />
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3 class="summary-title">Детали заказа</h3>
            
            <div class="summary-row">
              <span>Товары ({{ totalItems }})</span>
              <span>{{ totalPrice }} руб.</span>
            </div>
            
            <div class="summary-row">
              <span>Доставка</span>
              <span class="free-shipping">Бесплатно</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-total">
              <span>Итого к оплате:</span>
              <span class="total-amount">{{ totalPrice }} руб.</span>
            </div>

            <button class="btn btn-success btn-order">
              Оформить заказ
            </button>
            
            <router-link to="/catalog" class="continue-shopping">
              ← Продолжить покупки
            </router-link>
          </div>
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

const totalItems = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0)
})
</script>

<style scoped>
.cart {
  padding: 2rem 0;
  min-height: 85vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e1e8ed;
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.cart-stats {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin: 2rem 0;
}

.empty-cart-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.empty-cart-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-cart-text {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-summary {
  position: sticky;
  top: 2rem;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border: 1px solid #e1e8ed;
}

.summary-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f3f4;
}

.summary-row:last-child {
  border-bottom: none;
}

.free-shipping {
  color: #27ae60;
  font-weight: 600;
}

.summary-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #3498db, transparent);
  margin: 1rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 0;
  color: #2c3e50;
}

.total-amount {
  font-size: 1.4rem;
  color: #e74c3c;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #27ae60, #219a52);
  color: white;
  font-size: 1.1rem;
  padding: 15px;
  margin-bottom: 1rem;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
}

.btn-order {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  font-size: 1.1rem;
  padding: 16px;
  margin-top: 1rem;
}

.btn-order:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: color 0.3s ease;
}

.continue-shopping:hover {
  color: #2980b9;
}

/* Анимации */
.empty-cart {
  animation: fadeInUp 0.6s ease;
}

.cart-content {
  animation: fadeIn 0.8s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cart-summary {
    position: static;
    order: -1;
  }
  
  .cart-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .cart-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .cart {
    padding: 1rem 0;
  }
  
  .summary-card {
    padding: 1.5rem;
  }
  
  .empty-cart {
    padding: 3rem 1rem;
    margin: 1rem 0;
  }
}
</style>