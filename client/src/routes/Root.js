import App from "../App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Principal/Home.jsx";
import authRoutes from "../views/Auth/services/auth.routes.js";
import profileRoutes from "../views/Profile/services/profile.routes.js";
import empresaRoutes from "../views/Empresa/services/empresa.routes.js";

const Root = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/home',
                Component: Home,
            },
            {
                path: '/',
                Component: Home,
            },
            ...Array.from(authRoutes),
            ...Array.from(profileRoutes),
            ...Array.from(empresaRoutes),
        ]
    }
])

export default Root;