import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriversView from '../views/DriversView.vue'
import MeetingsView from '../views/MeetingsView.vue'

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
  {
    path: '/meetings',
    name: 'meetings',
    component: MeetingsView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
