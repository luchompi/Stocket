import principalRoutes from '@/views/principal/services/principal.routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...principalRoutes,
    
  ]
})

export default router
