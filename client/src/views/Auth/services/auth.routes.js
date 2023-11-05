import AuthLayout from "../AuthLayout";
import Activate from "../components/Activate";
import ChangePassword from "../components/ChangePassword";
import ChangePasswordConfirm from "../components/ChangePasswordConfirm";
import Login from "../components/Login";
import Register from "../components/Register";

const authRoutes = [{
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: "/login",
            Component: Login
        },
        {
            path: "/register",
            Component: Register
        },
        {
            path: "/activate/:uid/:token",
            Component: Activate
        },
        {
            path: "/forgot-password",
            Component: ChangePassword
        },
        {
            path: "/password/reset/confirm/:uid/:token",
            Component: ChangePasswordConfirm
        }
    ]
}]

export default authRoutes;