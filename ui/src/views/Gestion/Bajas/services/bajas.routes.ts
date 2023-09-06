import BajaLayout from "@/views/Gestion/Bajas/BajaLayout.vue";
import ListView from '../components/ListView.vue';
import CreateView from '../components/CreateView.vue';
import DetailView from "../components/DetailView.vue";

const bajasRoutes = [
    {
        path: '/bajas',
        component: BajaLayout,
        children: [
            {
                path: '/bajas/',
                name: 'bajas-list',
                component: ListView
            },
            {
                path: '/bajas/nuevo/',
                name: 'bajas-nuevo',
                component: CreateView
            },
            {
                path: '/bajas/:id/',
                name: 'bajas-detalle',
                component: DetailView
            }
        ]
    }
]

export default bajasRoutes;