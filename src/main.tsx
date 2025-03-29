import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./assets/icon/favicon.ico";
import App from "./App.tsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CheatSheetPage from "./pages/CheatSheetPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ImprintPage from "./pages/ImprintPage";
import ContactPage from "./pages/ContactPage";
import GuidelineDetailPage from "./pages/GuidelineDetailPage";
import ResultsPage from "./pages/ResultsPage";


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "design-test", element: <CheatSheetPage /> },
      { path: "privacy", element: <PrivacyPolicyPage /> },
      { path: "imprint", element: <ImprintPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "guideline/:id", element: <GuidelineDetailPage /> },
      { path: "results", element: <ResultsPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
