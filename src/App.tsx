import { JSX } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import CheatSheet from "./pages/Cheatsheet";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Home
    },
    {
        path: '/design-test',
        Component: CheatSheet
    }
]);

export default function App(): JSX.Element {
    return (
        <>
            <Header />

            <main id="page">
                <RouterProvider router={router} />
            </main>

            <Footer />
        </>
    );
};
