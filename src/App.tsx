import { JSX } from "react";
import { Footer } from "./comp/Footer";
import { Header } from "./comp/Header";
import { Home } from "./comp/Home";

export default function App(): JSX.Element {
    return (
        <>
            <Header />

            <Home />

            <Footer />
        </>
    );
};
