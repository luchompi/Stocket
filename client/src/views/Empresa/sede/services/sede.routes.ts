import sedeLayout from "../SedeLayout.vue";
import ListView from "@/views/Empresa/sede/components/ListView.vue";
import CreateView from "../components/CreateView.vue"
import DetailView from "@/views/Empresa/sede/components/DetailView.vue";
import UpdateView from "@/views/Empresa/sede/components/UpdateView.vue";

const sedeRoutes = [
    {
        path: "empresa/sedes",
        component: sedeLayout,
        children: [
            {
                path: "/:nit/sedes",
                name: "sedes",
                component: ListView
            },
            {
                path: "/:nit/sedes/nuevo/",
                name: "sedes-create",
                component: CreateView
            },
            {
                path: "/:nit/sedes/:id/",
                name: "sedes-detail",
                component: DetailView
            },
            {
                path: "/:nit/sedes/:id/editar/",
                name: "sedes-update",
                component: UpdateView
            }
        ]
    }
]

export default sedeRoutes