import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Cart from '../views/Cart.vue'
import ProductDetail from '../views/ProductDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/cart', component: Cart },
  { path: '/product/:id', component: ProductDetail }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' 
    ? '/vue-autosound-shop/' 
    : '/'
  ),
  routes
})

export default router