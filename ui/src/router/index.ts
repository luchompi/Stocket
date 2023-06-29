import authRoutes from '@/views/Auth/services/auth.routes'
import principalRoutes from '@/views/principal/services/principal.routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...principalRoutes,
    ...authRoutes,
    
  ]
})

export default router
