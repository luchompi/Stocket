import EmpresaLayout from '../EmpresaLayout.vue'
import Home from '../main/Home.vue'
import Create from '../main/Create.vue'
import Update from '../main/Update.vue'
const empresaRoutes = [
    {
        path: '/empresa',
        component: EmpresaLayout,
        children: [
            {
                path: '',
                name: 'empresa',
                component:Home
            },
            {
                path:'empresa/create',
                name:'empresa-create',
                component:Create
            },
            {
                path:'empresa/edit',
                name:'empresa-edit',
                component:Update
            }
        ]
    }
]

export default empresaRoutes