import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/layouts/App.tsx";
import "./app/layouts/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 *
 * Create github alisas
 *
 * git config --global alias.adog "log --all --decorate --oneline --graph"
 */
