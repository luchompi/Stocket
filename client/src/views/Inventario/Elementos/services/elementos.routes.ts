import ElementoLayout from '../ElementoLayout.vue'
import ListView  from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import DetailView from '../components/DetailView.vue'
import UpdateView from '../components/UpdateView.vue'


const ElementosRoutes =[
    {
        path: '/elementos',
        name: 'elementos',
        component: ElementoLayout,
        children: [
            {
                path: 'list',
                name: 'elementos-list',
                component: ListView
            },
            {
                path: 'create',
                name: 'elementos-create',
                component: CreateView
            },
            {
                path: 'details/:placa',
                name: 'elementos-details',
                component: DetailView
            },
            {
                path: 'edit/:placa',
                name: 'elementos-edit',
                component: UpdateView
            }
        ]
    }
]

export default ElementosRoutes