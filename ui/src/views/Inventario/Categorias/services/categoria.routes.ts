import CategoriasLayout from '../CategoriasLayout.vue'
import  ListView  from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import UpdateView from '../components/UpdateView.vue'
const categoriasRoutes =[
    {
        path:'/categorias/',
        component:CategoriasLayout,
        children:[
            {
                path:'/',
                name:'categorias',
                component:ListView
            },
            {
                path:'/categorias/nuevo/',
                name:'categorias-nuevo',
                component:CreateView
            },
            {
                path:'/categorias/:id/editar/',
                name:'categorias-editar',
                component:UpdateView
            }
        ]
    }
]

export default categoriasRoutes