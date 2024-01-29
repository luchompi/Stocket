import React from "react";
import ReactDOM from "react-dom/client";
import "admin-lte/dist/css/adminlte.css";
import "admin-lte/dist/js/adminlte.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.js";
import { RouterProvider } from "react-router-dom";
import Root from "./routes/Root";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Root} />
  </React.StrictMode>
);
