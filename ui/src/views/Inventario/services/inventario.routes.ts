import categoriasRoutes from "../Categorias/services/categoria.routes";
import InventarioLayout from "../InventarioLayout.vue";
import marcaRoutes from "../Marcas/services/marca.routes";

const inventarioRoutes = [
    {
        path: "/inventario",
        component: InventarioLayout,
        children:[
            ...marcaRoutes,
            ...categoriasRoutes,
        ]
    }
]

export default inventarioRoutes