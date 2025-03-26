import { JSX } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";

export default function App(): JSX.Element {
    return (
        <div className="app-wrapper">
            <HeaderComponent />
            <main id="page">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
}
