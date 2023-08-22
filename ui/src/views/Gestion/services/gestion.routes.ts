import GestionLayout from "@/views/Gestion/GestionLayout.vue";
import asignacionRoutes from "@/views/Gestion/Asignaciones/services/asignacion.routes";

const gestionRoutes = [
    {
        path: '/gestion',
        component: GestionLayout,
        children: [
            ...asignacionRoutes,
        ]
    }
]
export default gestionRoutes