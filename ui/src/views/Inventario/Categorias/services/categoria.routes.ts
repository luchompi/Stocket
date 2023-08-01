import CategoriasLayout from '../CategoriasLayout.vue'
import ListView from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
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
            }
        ]
    }
]

export default categoriasRoutes