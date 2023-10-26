import AuthLayout from "../AuthLayout";
import Login from "../components/Login";

const authRoutes =[
    {
        path:'/auth',
        Component: AuthLayout,
        children:[
            {
                path:'/auth/login',
                Component: Login
            }
        ]
    }
]
export default authRoutes