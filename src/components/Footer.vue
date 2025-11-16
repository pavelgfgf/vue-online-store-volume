<template>
  <footer class="footer">
    <div class="container">
      <!-- Основной контент футера -->
      <div class="footer-main">
        <!-- Информационная секция -->
        <div class="footer-section">
          <div class="footer-logo">
            <div class="logo-text"><span>#авто</span><i>звукболезнь</i></div>
          </div>
          <p class="footer-description">
            Интернет-магазин качественного автозвука. Лучшее оборудование для вашего автомобиля по доступным ценам с гарантией и
            профессиональной поддержкой.
          </p>
          <div class="footer-contacts">
            <div class="contact-item">
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <span>info@autosound.ru</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🕒</span>
              <span>Ежедневно 9:00 - 21:00</span>
            </div>
          </div>
        </div>

        <!-- Навигация -->
        <div class="footer-section">
          <h4 class="section-title">Магазин</h4>
          <ul class="footer-links">
            <li><a href="" @click="goToCatalog" class="footer-link">Каталог</a></li>
            <li><a href="" @click="goToCart" class="footer-link">Корзина</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Акции</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Новинки</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Лидеры продаж</a></li>
          </ul>
        </div>

        <!-- Категории -->
        <div class="footer-section">
          <h4 class="section-title">Категории</h4>
          <ul class="footer-links">
            <li><a href="" @click="goToCatalog" class="footer-link">Акустика</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Головные устройства</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Сабвуферы</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Усилители</a></li>
            <li><a href="" @click="goToCatalog" class="footer-link">Аксессуары</a></li>
          </ul>
        </div>

        <!-- Клиентам -->
        <div class="footer-section">
          <h4 class="section-title">Клиентам</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Доставка и оплата</a></li>
            <li><a href="#" class="footer-link">Гарантия</a></li>
            <li><a href="#" class="footer-link">Возврат</a></li>
            <li><a href="#" class="footer-link">Контакты</a></li>
            <li><a href="#" class="footer-link">Вопросы и ответы</a></li>
          </ul>
        </div>

        <!-- Подписка на рассылку -->
        <div class="footer-section newsletter-section">
          <h4 class="section-title">Подписка на новости</h4>
          <p class="newsletter-text">Узнавайте первыми о новых поступлениях и акциях</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Ваш email" class="newsletter-input" v-model="email" />
            <button class="newsletter-btn" @click="subscribe">
              <span class="btn-icon">📨</span>
              Подписаться
            </button>
          </div>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-vk" title="ВКонтакте"></i></a>
            <a href="#" class="social-link"><i class="fab fa-telegram" title="Telegram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube" title="YouTube"></i></a>
          </div>
        </div>
      </div>

      <!-- Нижняя часть футера -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; 2025 AutoSound by pavelgfgf. Все права защищены.</p>
        </div>
        <div class="footer-payments">
          <div class="payment-methods">
            <span class="payment-icon">💳</span>
            <span class="payment-icon">🔗</span>
            <span class="payment-icon">📱</span>
            <span class="payment-icon">🏦</span>
          </div>
        </div>
        <div class="footer-legal">
          <a href="#" class="legal-link">Политика конфиденциальности</a>
          <a href="#" class="legal-link">Пользовательское соглашение</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import router from '@/router/router';
import { ref } from 'vue';

const email = ref('');

const subscribe = (): void => {
  if (email.value) {
    alert(`Спасибо за подписку! На ${email.value} будут приходить наши новости.`);
    email.value = '';
  } else {
    alert('Пожалуйста, введите email для подписки.');
  }
};

const goToCatalog = (): void => {
  router.push(`/catalog`);
  window.scrollTo({ top: 0, behavior: 'instant' });
};

const goToCart = (): void => {
  router.push(`/cart`)
  window.scrollTo({ top: 0, behavior: 'instant'})
};
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Основной контент */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 2rem;
  padding: 3rem 0 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Секции футера */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
}

.logo-text span{
  color: white;
}

.footer-description {
  color: #bdc3c7;
  line-height: 1.5;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ecf0f1;
  font-size: 0.9rem;
}

.contact-icon {
  font-size: 1rem;
}

/* Заголовки секций */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ecf0f1;
  border-left: 3px solid #4caf50;
  padding-left: 0.75rem;
}

/* Ссылки */
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #4caf50;
  transform: translateX(5px);
}

/* Подписка на рассылку */
.newsletter-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-text {
  color: #bdc3c7;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: #95a5a6;
}

.newsletter-input:focus {
  outline: none;
  border-color: #4caf50;
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

/* Социальные сети */
.social-links {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.social-link:hover {
  background: #4caf50;
  transform: translateY(-3px) scale(1.1);
}

.fab {
  font-size: 2rem;
}

.fa-vk {
  color: #0077ff;
}

.fa-telegram {
  color: #27a7e7;
}
.fa-youtube {
  color: #ff0000;
}

/* Нижняя часть футера */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  color: #bdc3c7;
  font-size: 0.9rem;
}

.footer-payments {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.payment-methods {
  display: flex;
  gap: 0.5rem;
}

.payment-icon {
  font-size: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.payment-icon:hover {
  opacity: 1;
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
}

.legal-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #4caf50;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
  }

  .newsletter-section {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-section {
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .section-title {
    border-left: none;
    border-bottom: 2px solid #4caf50;
    padding-left: 0;
    padding-bottom: 0.5rem;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
