import TraspasoLayout from "../TraspasoLayout.vue";
import CreateView from '../components/CreateView.vue'

const traspasosRoutes =[
    {
        path: '/traspasos',
        name: 'traspasos',
        component: TraspasoLayout,
        children: [
            {
                path: '/traspasos/create/:id',
                name: 'traspasos-create',
                component: CreateView
            }
            ]
    }
]

export default traspasosRoutes