import InventarioLayout from "../InventarioLayout.vue";
import marcaRoutes from "../Marcas/services/marca.routes";

const inventarioRoutes = [
    {
        path: "/inventario",
        component: InventarioLayout,
        children:[
            ...marcaRoutes
        ]
    }
]

export default inventarioRoutes