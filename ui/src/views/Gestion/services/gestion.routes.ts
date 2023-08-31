import GestionLayout from "@/views/Gestion/GestionLayout.vue";
import asignacionRoutes from "@/views/Gestion/Asignaciones/services/asignacion.routes";
import traspasosRoutes from "@/views/Gestion/Traspasos/services/traspasos.routes";

const gestionRoutes = [
    {
        path: '/gestion',
        component: GestionLayout,
        children: [
            ...asignacionRoutes,
            ...traspasosRoutes,
        ]
    }
]
export default gestionRoutes