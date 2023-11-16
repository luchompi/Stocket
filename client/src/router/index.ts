import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@/views/Home/services/home.routes'
import authRoutes from '@/views/Auth/services/auth.routes'
import profileRoutes from "@/views/Profile/services/profile.routes";
import empresaRoutes from '@/views/Empresa/services/empresa.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...profileRoutes,
    ...empresaRoutes,
  ]
})

export default router
