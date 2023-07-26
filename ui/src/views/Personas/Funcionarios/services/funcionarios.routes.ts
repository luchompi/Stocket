import ListView from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import UpdateView from '../components/UpdateView.vue'
import FuncionariosLayout from "../FuncionariosLayout.vue"
import DetailViewVue from '../components/DetailView.vue'

const FuncionariosRoutes = [{
    path: '/funcionarios',
    component: FuncionariosLayout,
    children: [
        {
            path: '/funcionarios',
            component: ListView,
            name: 'funcionarios'
        },
        {
            path: '/funcionarios/create',
            component: CreateView,
            name: 'funcionarios-create'
        },
        {
            path: '/funcionarios/detail/:id',
            component:DetailViewVue,
            name: 'funcionarios-detail'
        },
        {
            path: '/funcionarios/edit/:id',
            component: UpdateView,
            name: 'funcionarios-edit'
        }
    ]
}]

export default FuncionariosRoutes