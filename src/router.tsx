import { createHashRouter, createBrowserRouter } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import CheatSheetPage from "./pages/CheatSheetPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ImprintPage from "./pages/ImprintPage";
import ContactPage from "./pages/ContactPage";
import GuidelineDetailPage from "./pages/GuidelineDetailPage";
import ResultsPage from "./pages/ResultsPage";

const routes = [
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
];

const isMobileApp = !window.location.protocol.startsWith('http');

export const router = isMobileApp
  ? createHashRouter(routes)
  : createBrowserRouter(routes);
