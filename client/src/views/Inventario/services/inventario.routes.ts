import categoriasRoutes from "../Categorias/services/categoria.routes";
import ElementosRoutes from "../Elementos/services/elementos.routes";
import InventarioLayout from "../InventarioLayout.vue";
import marcaRoutes from "../Marcas/services/marca.routes";
import referenciasRoutes from "../Referencias/services/services/referencias.routes";

const inventarioRoutes = [
    {
        path: "/inventario",
        component: InventarioLayout,
        children:[
            ...marcaRoutes,
            ...categoriasRoutes,
            ...referenciasRoutes,
            ...ElementosRoutes,
        ]
    }
]

export default inventarioRoutes