import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles.css";
import "./assets/icon/S3Navigator.ico";

import { router } from "./router"; 

function renderApp() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

if ((window as any).cordova) {
  document.addEventListener('deviceready', renderApp, false);
} else {
  renderApp();
}
