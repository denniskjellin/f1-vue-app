import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriversView from '../views/DriversView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/drivers',
    name: 'drivers',
    component: DriversView
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
