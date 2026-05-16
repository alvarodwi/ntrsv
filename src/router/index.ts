import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import LaneCover from '@/pages/LaneCover.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lane', component: LaneCover },
  ],
})