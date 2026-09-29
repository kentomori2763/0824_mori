import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../views/UploadView.vue'
import Resister from '../views/ResisterView.vue'
import OrderList from '../views/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/regist',
      name: 'regist',
      component: Resister, //購入画面を追加
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList, //購入画面を追加
    },
  ],
})

export default router