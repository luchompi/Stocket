import AuthLayoutVue from "../AuthLayout.vue";
import Activate from "../components/Activate.vue";
import LoginVue from "../components/Login.vue";
import RegisterVue from '../components/Register.vue'

const authRoutes = [
    {
        path: "/",
        component: AuthLayoutVue,
        children: [
            {
                path: "/login",
                name: "Login",
                component: LoginVue
            },
            {
                path: "/register",
                name: "Register",
                component: RegisterVue
            },
            {
                path: "/activate/:uid/:token",
                name: "Activate",
                component: Activate
            }
        ]
    }
]

export default authRoutes;