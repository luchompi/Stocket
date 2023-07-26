import PersonasLayout from '../PersonasLayout.vue'
import FuncionariosRoutes from "../Funcionarios/services/funcionarios.routes";
import proveedorRoutes from '../Proveedores/services/proveedor.routes';

const personasRouter = [{
    path: '/personas/',
    component: PersonasLayout,
    children: [
        ...FuncionariosRoutes,
        ...proveedorRoutes
    ]
}]
export default personasRouter