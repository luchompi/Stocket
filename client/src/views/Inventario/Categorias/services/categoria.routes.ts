import CategoriasLayout from '../CategoriasLayout.vue'
import  Listview  from '../components/Listview.vue'
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
                component:Listview
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