import authRoutes from '@/views/Auth/services/auth.routes'
import principalRoutes from '@/views/principal/services/principal.routes'
import profileRoutes from '@/views/Profile/services/profile.routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...principalRoutes,
    ...authRoutes,
    ...profileRoutes,
  ]
})

export default router
