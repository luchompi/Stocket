import GestionLayout from "@/views/Gestion/GestionLayout.vue";
import asignacionRoutes from "@/views/Gestion/Asignaciones/services/asignacion.routes";
import traspasosRoutes from "@/views/Gestion/Traspasos/services/traspasos.routes";
import mantenimientoRoutes from "../Mantenimientos/services/mantenimiento.routes";

const gestionRoutes = [
    {
        path: '/gestion',
        component: GestionLayout,
        children: [
            ...asignacionRoutes,
            ...traspasosRoutes,
            ...mantenimientoRoutes,
        ]
    }
]
export default gestionRoutes