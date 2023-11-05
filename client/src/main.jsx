import ReactDOM from "react-dom/client";
import "admin-lte/dist/css/adminlte.css";
import "admin-lte/dist/js/adminlte.js";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.js";
import Root from "./routes/Root.js";
import { RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={Root} />
);
