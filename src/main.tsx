import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layouts/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/**
 *
 * Create github alisas
 *
 * git config --global alias.adog "log --all --decorate --oneline --graph"
 */
