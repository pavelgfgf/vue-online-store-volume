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
          Перейти к покупкам
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

            <button class="btn btn-success btn-order" @click="showOrderConfirmation">
              Оформить заказ
            </button>
            
            <router-link to="/catalog" class="continue-shopping">
              ← Продолжить покупки
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения заказа -->
    <div v-if="showConfirmationModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Подтверждение заказа</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        
        <div class="order-details">
          <h4>Детали заказа:</h4>
          <div class="order-items">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="order-item"
            >
              <span class="item-name">{{ item.name }}</span>
              <span class="item-quantity">{{ item.quantity }} шт.</span>
              <span class="item-price">{{ item.price * item.quantity }} руб.</span>
            </div>
          </div>
          
          <div class="order-total">
            <div class="total-row">
              <span>Итого:</span>
              <span class="total-amount">{{ totalPrice }} руб.</span>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="closeModal">
            Отменить
          </button>
          <button class="btn btn-success" @click="confirmOrder">
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно успешного оформления -->
    <div v-if="showSuccessModal" class="modal-overlay success-overlay">
      <div class="modal-content success-content">
        <div class="success-icon">✅</div>
        <h3 class="success-title">Заказ успешно оформлен!</h3>
        
        <div class="order-info">
          <p><strong>Номер заказа:</strong> #{{ orderNumber }}</p>
          <p>С вами свяжется наш менеджер для подтверждения.</p>
        </div>

        <button class="btn btn-primary" @click="closeSuccessModal">
          Продолжить покупки
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CartItem from '../components/CartItem.vue'
import type { CartItem as CartItemType, QuantityUpdate } from '../lib/products/types'

interface Props {
  cartItems: CartItemType[]
}

interface Emits {
  (e: 'remove-from-cart', productId: number): void
  (e: 'update-quantity', update: QuantityUpdate): void
  (e: 'clear-cart'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

// Реактивные переменные для модальных окон
const showConfirmationModal = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const totalItems = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0)
})

// Показать модальное окно подтверждения
const showOrderConfirmation = () => {
  showConfirmationModal.value = true
}

// Закрыть модальное окно
const closeModal = () => {
  showConfirmationModal.value = false
}

// Подтвердить заказ
const confirmOrder = () => {
  // Генерация номера заказа
  orderNumber.value = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Закрыть окно подтверждения и показать окно успеха
  showConfirmationModal.value = false
  showSuccessModal.value = true
  
  // Очистка корзины
  emit('clear-cart')
}

// Закрыть окно успеха и перейти на главную
const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push('/')
}
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 10px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #333;
  background-color: #f5f5f5;
  border-radius: 50%;
}

.order-details {
  padding: 24px;
}

.order-details h4 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  color: #333;
}

.order-items {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-name {
  flex: 1;
  font-weight: 500;
}

.item-quantity {
  margin: 0 16px;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #2e7d32;
}

.order-total {
  border-top: 2px solid #e5e5e5;
  padding-top: 16px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e5e5;
  background-color: #fafafa;
}

.modal-actions .btn {
  flex: 1;
}

/* Стили для модального окна успеха */
.success-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

.success-content {
  text-align: center;
  max-width: 400px;
  padding: 20px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.success-title {
  color: #2e7d32;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.order-info {
  margin-bottom: 24px;
  text-align: left;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.order-info p {
  margin: 8px 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .modal-content {
    margin: 20px;
    max-height: calc(100vh - 40px);
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .item-quantity {
    margin: 0;
  }
}
</style>
