import { JSX } from "react";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import CheatSheetPage from "./pages/CheatSheetPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import 'dotenv/config';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage
    },
    {
        path: '/design-test',
        Component: CheatSheetPage
    }
], {
    basename: process.env.REACT_APP_BASE_NAME
});

export default function App(): JSX.Element {
    return (
        <>
            <HeaderComponent />

            <main id="page">
                <RouterProvider router={router} />
            </main>

            <FooterComponent />
        </>
    );
};
