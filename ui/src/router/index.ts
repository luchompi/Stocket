import authRoutes from '@/views/Auth/services/auth.routes'
import empresaRoutes from '@/views/Empresa/services/empresa.routes'
import principalRoutes from '@/views/principal/services/principal.routes'
import profileRoutes from '@/views/Profile/services/profile.routes'
import NotFound from '@/components/ErrorComponents/NotFound.vue'
import Forbidden from '@/components/ErrorComponents/Forbidden.vue'
import ServerError from '@/components/ErrorComponents/ServerError.vue'
import {createRouter, createWebHistory} from 'vue-router'
import personasRouter from "@/views/Personas/services/personas.routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...principalRoutes,
        ...authRoutes,
        ...profileRoutes,
        ...empresaRoutes,
        ...personasRouter,
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/user-not-authorized',
            name: 'Forbidden',
            component: Forbidden
        },
        {
            path: '/server-error',
            name: 'ServerError',
            component: ServerError
        }
    ]
})

export default router
