import OperationLayout from "@/views/Empresa/operations/OperationLayout.vue";
import ListView from "@/views/Empresa/operations/components/ListView.vue";
import DetailView from "@/views/Empresa/operations/components/DetailView.vue"

const operationsRoutes = ([
    {
        path: "/operations",
        name: "operations",
        component: OperationLayout,
        children: [
            {
                path: "/",
                name: "operations-index",
                component: ListView
            },
            {
                path: "/details/:id",
                name: "operation-details",
                component: DetailView
            }
        ]
    }
])

export default operationsRoutes;