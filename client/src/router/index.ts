import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@/views/Home/services/home.routes'
import authRoutes from '@/views/Auth/services/auth.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
  ]
})

export default router
