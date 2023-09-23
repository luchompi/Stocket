import MarcaLayout from '../MarcaLayout.vue'
import ListView from '../components/ListView.vue'
import CreateView from '../components/CreateView.vue'
import UpdateView from '../components/UpdateView.vue'

const marcaRoutes = [
    {
        path:'/marcas',
        component:MarcaLayout,
        children:[
            {
                path:'/',
                name:'marcas',
                component:ListView
            },
            {
                path:'/nuevo',
                name:'marcas-nuevo',
                component:CreateView
            },
            {
                path:'/editar/:id',
                name:'marcas-editar',
                component:UpdateView
            }

        ]
    }
]

export default marcaRoutes