import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const Root = createBrowserRouter([
    {
        path: "/",
        Component: App
    }
])

export default Root;    