import CreateViewVue from '../components/CreateView.vue';
import UpdateViewVue from '../components/UpdateView.vue';
import ListView from '../components/ListView.vue';
import DependenciaLayout from "../DependenciaLayout.vue";

const dependenciasRoutes = [
    {
        path: '/depedencias/',
        component: DependenciaLayout,
        children: [
            {
                path: '',
                name: 'dependencias',
                component: ListView
            },
            {
                path:'nuevo/',
                name: 'dependencias-nuevo',
                component: CreateViewVue
            },
            {
                path: ':id/editar/',
                name: 'dependencias-actualizar',
                component: UpdateViewVue
            }
        ]
    }
]

export default dependenciasRoutes