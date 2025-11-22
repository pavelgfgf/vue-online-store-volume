<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <i class="fas fa-volume-up"></i>
          <h1>авто<i><span>звукболезнь</span></i></h1>
        </router-link>
        
        <!-- Десктопная навигация -->
        <nav class="navigation" :class="{ 'mobile-open': isMobileMenuOpen }">
          <router-link 
            to="/" 
            class="nav-link"
            @click="closeMobileMenu"
          >
            Главная
          </router-link>
          <router-link 
            to="/catalog" 
            class="nav-link"
            @click="closeMobileMenu"
          >
            Каталог
          </router-link>
          <router-link 
            to="/cart" 
            class="nav-link cart-link"
            @click="closeMobileMenu"
          >
            Корзина
            <span v-if="cartItems.length > 0" class="cart-badge">
              {{ cartItemsCount }}
            </span>
          </router-link>
        </nav>

        <!-- Бургер-меню -->
        <button 
          class="burger-menu"
          @click="toggleMobileMenu"
          :class="{ 'active': isMobileMenuOpen }"
          aria-label="Меню"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>

        <!-- Оверлей для мобильного меню -->
        <div 
          v-if="isMobileMenuOpen" 
          class="mobile-overlay"
          @click="closeMobileMenu"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CartItem } from '../lib/products/types';

interface Props {
  cartItems: CartItem[]
}

const props = defineProps<Props>()

const isMobileMenuOpen = ref(false)

// Общее количество товаров в корзине
const cartItemsCount = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0)
})

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
})
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1a2a6c, #2a3a7c);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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


/* Десктопная навигация */
.navigation {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.cart-link {
  position: relative;
}

.cart-badge {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -8px;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Бургер-меню */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
}

.burger-line {
  display: block;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-menu.active .burger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.burger-menu.active .burger-line:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.burger-menu.active .burger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Мобильное меню */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 998;
}

/* Адаптивность */
@media (max-width: 768px) {
  .burger-menu {
    display: flex;
  }

  .navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #1a2a6c, #2a3a7c);
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 80px 2rem 2rem;
    gap: 0;
    transition: right 0.3s ease;
    z-index: 999;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .navigation.mobile-open {
    right: 0;
  }

  .nav-link {
    padding: 1.25rem 1.5rem;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    font-size: 1.1rem;
    justify-content: flex-start;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.08);
  }

  .nav-link:hover {
    transform: translateX(5px);
  }

  .logo i {
    font-size: 1.5rem;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .logo span {
    font-size: 1.5rem;
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .navigation {
    width: 100%;
    right: -100%;
  }

  .navigation.mobile-open {
    right: 0;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .logo span {
    font-size: 1.3rem;
  }

  .logo-icon {
    font-size: 1.6rem;
  }

  .nav-link {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
}

/* Плавная анимация для всех переходов */
.nav-link,
.burger-menu,
.logo {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Улучшение доступности */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .burger-menu,
  .logo,
  .navigation {
    transition: none;
  }
  
  .cart-badge {
    animation: none;
  }
}

/* Фокус для доступности */
.nav-link:focus,
.burger-menu:focus {
  outline: 2px solid #4CAF50;
  outline-offset: 2px;
}
</style>