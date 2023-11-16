import EmpresaLayout from "../EmpresaLayout.vue";
import Home from "../main/Home.vue";
import Create from '../main/Create.vue'
import Update from '../main/Update.vue'
const empresaRoutes = [
    {
        path: '/empresa',
        component: EmpresaLayout,
        children: [
            {
                path: '/empresa/',
                name: 'Empresa',
                component: Home
            },
            {
                path: '/empresa/create',
                name: 'CrearEmpresa',
                component: Create
            },
            {
                path: '/empresa/update',
                name: 'ActualizarEmpresa',
                component: Update
            }
        ]
    }
]

export default empresaRoutes