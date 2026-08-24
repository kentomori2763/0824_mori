import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteList from '../views/FavoriteView.vue'
import OrderList from '@/components/OrderList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteList, //購入画面を追加
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList, //購入画面を追加
    },
  ],
})

export default router