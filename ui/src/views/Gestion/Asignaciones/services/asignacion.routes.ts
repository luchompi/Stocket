import ListView from '../components/ListView.vue';
import AsigLayout from "@/views/Gestion/Asignaciones/AsigLayout.vue";
import DetailView from '../components/DetailView.vue';

const asignacionRoutes = [
    {
        path: '/asignaciones',
        component: AsigLayout,
        children: [
            {
                path: '/asignaciones/list',
                component: ListView,
                name: 'asig-list'
            },
            {
                path: '/asignaciones/details/:id',
                name: 'asig-detail',
                component: DetailView
            }
        ]
    }
]

export default asignacionRoutes