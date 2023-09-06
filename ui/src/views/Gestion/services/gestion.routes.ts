import GestionLayout from "@/views/Gestion/GestionLayout.vue";
import asignacionRoutes from "@/views/Gestion/Asignaciones/services/asignacion.routes";
import traspasosRoutes from "@/views/Gestion/Traspasos/services/traspasos.routes";
import mantenimientoRoutes from "../Mantenimientos/services/mantenimiento.routes";
import bajasRoutes from "@/views/Gestion/Bajas/services/bajas.routes";

const gestionRoutes = [
    {
        path: '/gestion',
        component: GestionLayout,
        children: [
            ...asignacionRoutes,
            ...traspasosRoutes,
            ...mantenimientoRoutes,
            ...bajasRoutes,
        ]
    }
]
export default gestionRoutes