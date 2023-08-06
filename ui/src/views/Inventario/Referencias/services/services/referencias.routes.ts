import ListView from '../../components/ListView.vue'
import DetailView from '../../components/DetailView.vue'
import referenciasLayout from '../../referenciasLayout.vue'
import CreateView from '../../components/CreateView.vue'
const referenciasRoutes = [
    {
        path: '/inventario/referencias',
        name: 'referencias',
        component: referenciasLayout,
        children: [
            {
                path: '/',
                name: 'refer-list',
                component: ListView,
            },
            {
                path:'/inventario/referencias/:id/',
                name:'refer-detail',
                component:DetailView
            },
            {
                path:'/inventario/referencias/:id/create/',
                name:'refer-create',
                component:CreateView
            }
        ]
    }
]

export default referenciasRoutes