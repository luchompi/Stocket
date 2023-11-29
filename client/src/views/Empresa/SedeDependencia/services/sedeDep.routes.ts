import SedeDepLayout from "../SedeDepLayout.vue";
import List from '../components/List.vue'
import Details from '../components/Details.vue'
const sedeDepRoutes = [
    {
        path: '/sedes/dependencias',
        component: SedeDepLayout,
        children: [
            {
                path: '/sedes/dependencias/',
                name: 'sedeDependencia',
                component: List
            },
            {
                path: '/sedes/:id/dependencias/',
                name: 'sedeDependenciaDetails',
                component: Details
            }
        ]
    }
]

export default sedeDepRoutes