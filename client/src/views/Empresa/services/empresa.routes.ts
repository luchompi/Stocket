import EmpresaLayout from "../EmpresaLayout.vue";
import Home from "../main/Home.vue";
import Create from '../main/Create.vue'
import Update from '../main/Update.vue'
import sedeRoutes from "../Sedes/services/sedes.routes";
import dependenicasRoutes from "@/views/Empresa/Dependencias/services/dependenicas.routes";
import SedeDepRoutes from "@/views/Empresa/SedeDependencia/services/sedeDep.routes";

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
            ...sedeRoutes,
            ...dependenicasRoutes,
            ...SedeDepRoutes,
        ]
    }
]

export default empresaRoutes