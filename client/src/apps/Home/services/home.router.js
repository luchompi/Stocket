import HomeLayout from "../HomeLayout";
import Home from "../components/Home";

const homeRoutes = [
    {
        path: "/",
        Component: HomeLayout,
        children:[
            {
                path: "/",
                Component: Home
            }
        ]
    }
]

export default homeRoutes