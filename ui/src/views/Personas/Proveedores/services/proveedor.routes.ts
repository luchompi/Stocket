import ProveedorLayout from '../ProveedorLayout.vue'
import ListView from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import DetailView from '../components/DetailView.vue'
import UpdateView from '../components/UpdateView.vue'

const proveedorRoutes = [
    {
        path: '/proveedores',
        component: ProveedorLayout,
        children: [
            {
                path: '',
                component: ListView,
                name: 'proveedores'
            },
            {
                path: '/create',
                component: CreateView,
                name: 'proveedores-create'
            },
            {
                path: '/details/:nit',
                component: DetailView,
                name: 'proveedores-details'
            },
            {
                path:'/edit/:nit',
                component: UpdateView,
                name:'proveedores-update'
            }
        ]
    }
]

export default proveedorRoutes
