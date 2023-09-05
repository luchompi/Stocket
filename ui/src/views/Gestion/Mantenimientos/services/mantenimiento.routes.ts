import MantenimientoLayout from '../MantenimientoLayout.vue';
import ListView from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import DetailView from '../components/DetailView.vue';
import UpdateView from '../components/UpdateView.vue';
const mantenimientoRoutes = [
    {
        path: '/mantenimientos',
        component: MantenimientoLayout,
        children: [
            {
                path: '/mantenimientos/',
                component: ListView,
                name: 'fix-list'
            },
            {
                path: 'mantenimientos/nuevo',
                name:'fix-new',
                component: CreateView
            },
            {
                path: 'mantenimientos/detalles/:id',
                name:'fix-details',
                component:DetailView
            },
            {
                path:'mantenimientos/editar/:id',
                name:'fix-edit',
                component:UpdateView
            }
        ]
    }
]

export default mantenimientoRoutes;