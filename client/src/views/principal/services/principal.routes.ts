import HomeView from '@/views/principal/HomeView.vue';
import PrincipalLayout from '@/views/principal/PrincipalLayout.vue';
import AboutView from '@/views/principal/AboutView.vue';
const principalRoutes = [
    {
        path: '/principal',
        name: 'principal',
        component: PrincipalLayout,
        redirect: '/principal/',
        children: [
            {
                path: '/',
                name: 'home',
                component: HomeView
            },
            {
                path: '/about',
                name: 'about',
                component: AboutView
            }
        ]
    }
]

export default principalRoutes