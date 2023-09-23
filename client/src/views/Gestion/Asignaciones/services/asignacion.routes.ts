import ListView from '../components/ListView.vue';
import AsigLayout from "@/views/Gestion/Asignaciones/AsigLayout.vue";
import DetailView from '../components/DetailView.vue';
import CreateView from '../components/CreateView.vue';
import PDFView from '../components/PDFView.vue';

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
            },
            {
                path: '/asignaciones/create',
                name: 'asig-create',
                component: CreateView
            },
            {
                path:'/asignaciones/report/:id',
                name: 'asig-report',
                component: PDFView
            }
        ]
    }
]

export default asignacionRoutes