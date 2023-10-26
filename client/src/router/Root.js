import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import homeRoutes from "../apps/Home/services/home.router";
import authRoutes from "../apps/Auth/services/auth.routes";

const Root = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            ...Array.from(homeRoutes),
            ...Array.from(authRoutes),
        ]
    }
])

export default Root