import EmpresaLayout from "../EmpresaLayout.vue";
import Home from "../main/Home.vue";
import Create from '../main/Create.vue'
import Update from '../main/Update.vue'
import sedeRoutes from "../Sedes/services/sedes.routes";
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
            },
            ...sedeRoutes
        ]
    }
]

export default empresaRoutes