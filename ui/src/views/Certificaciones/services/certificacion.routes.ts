import CertLayout from "../CertLayout.vue";
import CreateView from "../components/CreateView.vue";

const certificacionRoutes = [
    {
        path: "/certificaciones",
        name: "Certificaciones",
        component: CertLayout,
        children: [
            {
                path: "/certificaciones/create",
                name: "cert-create",
                component: CreateView
            }
        ]
    }
]

export default certificacionRoutes;