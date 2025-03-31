import { JSX, useRef, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";

export default function App(): JSX.Element {
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                document.documentElement.style.setProperty("--header-height", `${height}px`);
            }
        };

        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);


    return (
        <div className="app-wrapper">
            <HeaderComponent ref={headerRef} />
            <main id="page">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
}
