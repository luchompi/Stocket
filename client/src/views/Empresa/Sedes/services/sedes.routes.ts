import SedesLayout from '../SedesLayout.vue';
import ListVue from '../components/List.vue';
import CreateVue from '../components/Create.vue';
import UpdateVue from '../components/Update.vue';

const sedeRoutes = [
    {
        path: '/empresa/sedes',
        component: SedesLayout,
        children: [
            {
                path: '/',
                component: ListVue,
                name: 'SedeList'
            },
            {
                path: 'create',
                component: CreateVue,
                name: 'SedeCreate'
            },
            {
                path: 'update/:id',
                component: UpdateVue,
                name: 'SedeUpdate'
            }
        ]
    }
]

export default sedeRoutes;