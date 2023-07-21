import PersonasLayout from '../PersonasLayout.vue'
import FuncionariosRoutes from "../Funcionarios/services/funcionarios.routes";

const personasRouter = [{
    path: '/personas/',
    component: PersonasLayout,
    children: [
        ...FuncionariosRoutes,
    ]
}]
export default personasRouter