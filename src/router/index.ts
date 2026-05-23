import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import LaneCover from '@/pages/LaneCover.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lane', component: LaneCover },
  ],
})
