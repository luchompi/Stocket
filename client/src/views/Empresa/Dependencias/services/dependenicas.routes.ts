import DependenciasLayout from "../DependenciasLayout.vue";
import ListVue from '../components/List.vue';
import CreateVue from '../components/Create.vue';
import UpdateVue from '../components/Update.vue';

const dependenicasRoutes = [
    {
        path: '/empresa/departamentos',
        component: DependenciasLayout,
        children: [
            {
                path: '/empresa/departamentos/',
                component: ListVue,
                name: 'DepartamentosList'
            },
            {
                path: '/empresa/departamentos/create',
                component: CreateVue,
                name: 'DepartamentosCreate'
            },
            {
                path: '/empresa/departamentos/:id',
                component: UpdateVue,
                name: 'DepartamentosUpdate'

            }
        ]
    }
]

export default dependenicasRoutes;