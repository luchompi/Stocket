import AuthLayoutVue from "../AuthLayout.vue";
import Activate from "../components/Activate.vue";
import ChangePassword from "../components/ChangePassword.vue";
import LoginVue from "../components/Login.vue";
import RegisterVue from '../components/Register.vue'
import ConfirmPassword from '../components/ConfirmPassword.vue'

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
            },
            {
                path: "/reset-password",
                name: "ResetPassword",
                component: ChangePassword
            },
            {
                path: "/password/reset/confirm/:uid/:token",
                name: "ConfirmPassword",
                component: ConfirmPassword
            }
        ]
    }
]

export default authRoutes;